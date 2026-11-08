import express from 'express';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { notificationService } from '../services/notificationService.js';
import { getBlingToken } from '../utils/blingTokenManager.js';
import {
  AVANTE_LOGO_BASE64,
  LOGGI_LOGO_BASE64,
  MELHOR_ENVIO_LOGO_BASE64,
  CORREIOS_LOGO_SVG,
  JADLOG_LOGO_SVG,
  JT_LOGO_SVG,
  AZUL_LOGO_SVG
} from '../utils/labelLogos.js';

const router = express.Router();

// Helper to clean CEP
const cleanCepStr = (cep) => (cep || '').replace(/\D/g, '');

// Fetch Melhor Envio token from database or .env
const getMelhorEnvioToken = async () => {
  try {
    const records = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "melhor_envio" && chave_nome = "token" && ativo = true',
      $autoCancel: false
    });
    if (records.length > 0) {
      return records[0].chave_valor;
    }
  } catch (err) {
    logger.warn('[ShippingAPI] Falha ao ler token do Melhor Envio no banco de dados, usando .env:', err.message);
  }
  return process.env.MELHOR_ENVIO_TOKEN;
};

// POST /shipping/calculate
router.post('/calculate', async (req, res, next) => {
  try {
    const { toCep, items, cidade, estado } = req.body;

    if (!toCep || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ sucesso: false, erro: 'CEP de destino e itens são obrigatórios.' });
    }

    const cleanToCep = cleanCepStr(toCep);
    if (cleanToCep.length !== 8) {
      return res.status(400).json({ sucesso: false, erro: 'CEP de destino inválido.' });
    }

    // 1. Fetch token
    const token = await getMelhorEnvioToken();
    if (!token) {
      return res.status(500).json({ sucesso: false, erro: 'Melhor Envio não está configurado na loja.' });
    }

    // 2. Fetch Origin CEP
    let fromCep = '28623620'; // Fallback to Nova Friburgo
    try {
      const configRecords = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (configRecords.length > 0 && configRecords[0].cep_origem) {
        fromCep = cleanCepStr(configRecords[0].cep_origem);
      }
    } catch (err) {
      logger.warn('[ShippingAPI] Falha ao ler CEP de origem das configurações:', err.message);
    }

    // 3. Map items and calculate product dimensions & weights
    const meProducts = [];
    let subtotal = 0;

    for (const item of items) {
      try {
        const prod = await pb.collection('products').getOne(item.id, { $autoCancel: false });
        const qty = parseInt(item.quantity, 10) || 1;
        const price = parseFloat(prod.price || prod.price_wholesale || 50);
        subtotal += price * qty;

        // Fallbacks based on user input
        // Fallback: Weight 100g (0.1kg), Width 10cm, Height 5cm, Length 20cm
        const weightG = parseFloat(prod.peso_g) || 100;
        const weightKg = weightG / 1000;
        const width = parseFloat(prod.largura_cm) || 10;
        const height = parseFloat(prod.altura_cm) || 5;
        const length = parseFloat(prod.comprimento_cm) || 20;

        meProducts.push({
          id: prod.id,
          width,
          height,
          length,
          weight: weightKg,
          insurance_value: price,
          quantity: qty
        });
      } catch (err) {
        logger.error(`[ShippingAPI] Erro ao carregar produto ${item.id}:`, err.message);
        const qty = parseInt(item.quantity, 10) || 1;
        subtotal += 50 * qty;
        meProducts.push({
          id: item.id,
          width: 10,
          height: 5,
          length: 20,
          weight: 0.1,
          insurance_value: 50,
          quantity: qty
        });
      }
    }

    // 4. Check free shipping rules in PocketBase
    const rules = await pb.collection('regras_frete_gratis').getFullList({
      filter: 'ativo = true',
      sort: 'prioridade',
      $autoCancel: false
    }).catch(() => []);

    const toCepNum = parseInt(cleanToCep, 10);
    let freeShippingApplied = false;
    let freeShippingMin = null; // Só definido se houver regra ativa no banco de dados

    for (const rule of rules) {
      let matches = false;
      if (rule.tipo === 'cep' && rule.cep_inicio && rule.cep_fim) {
        const inicio = parseInt(cleanCepStr(rule.cep_inicio), 10);
        const fim = parseInt(cleanCepStr(rule.cep_fim), 10);
        matches = toCepNum >= inicio && toCepNum <= fim;
      } else if (rule.tipo === 'estado' && rule.estado && estado) {
        matches = estado.toUpperCase() === rule.estado.toUpperCase();
      } else if (rule.tipo === 'cidade' && rule.cidade && cidade) {
        matches = cidade.toLowerCase().trim() === rule.cidade.toLowerCase().trim();
      } else if (rule.tipo === 'global' || rule.tipo === 'nacional') {
        matches = true;
      }

      if (matches) {
        freeShippingMin = parseFloat(rule.valor_minimo);
        if (subtotal >= freeShippingMin) {
          freeShippingApplied = true;
          break; // Stop at highest priority rule that applies
        }
      }
    }

    // 5. Query Melhor Envio API
    const meResponse = await axios.post('https://api.melhorenvio.com/v2/me/shipment/calculate', {
      from: { postal_code: fromCep },
      to: { postal_code: cleanToCep },
      products: meProducts
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Avante Lingerie Storefront (contato@avantelingerie.com.br)'
      }
    });

    // 6. Map options and apply free shipping if qualified
    const shippingOptions = meResponse.data
      .filter(option => !option.error)
      .map(option => {
        const price = parseFloat(option.custom_price || option.price);
        return {
          id: option.id,
          name: option.name,
          company: option.company.name,
          price,
          originalPrice: price,
          delivery_time: option.delivery_time,
          isFree: false
        };
      });

    // 7. Filter options to make it clean (PAC, SEDEX, and up to 2 cheapest other options)
    let filteredOptions = [];
    
    const pacOption = shippingOptions.find(opt => 
      (opt.company.toLowerCase().includes('correios') && opt.name.toLowerCase().includes('pac')) || opt.id === 1 || opt.id === '1'
    );
    const sedexOption = shippingOptions.find(opt => 
      (opt.company.toLowerCase().includes('correios') && opt.name.toLowerCase().includes('sedex')) || opt.id === 2 || opt.id === '2'
    );

    if (pacOption) filteredOptions.push(pacOption);
    if (sedexOption) filteredOptions.push(sedexOption);

    const otherOptions = shippingOptions.filter(opt => 
      opt.id !== (pacOption?.id) && opt.id !== (sedexOption?.id)
    );

    otherOptions.sort((a, b) => a.price - b.price);
    const cheapestOthers = otherOptions.slice(0, 2);
    filteredOptions.push(...cheapestOthers);

    // Sort final list by price
    filteredOptions.sort((a, b) => a.price - b.price);

    // If free shipping rules apply, make the cheapest option free
    if (freeShippingApplied && filteredOptions.length > 0) {
      filteredOptions[0].price = 0;
      filteredOptions[0].isFree = true;
    }

    // 7.5 Check if local pickup is enabled in configuracoes_estoque AND destination is Nova Friburgo
    let localPickupConfig = null;
    try {
      const configRecords = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (configRecords.length > 0 && configRecords[0].retirada_ativo) {
        // Validação estrita: Retirada Local é permitida EXCLUSIVAMENTE para a cidade da fábrica (Nova Friburgo - RJ)
        // Faixa oficial dos Correios para Nova Friburgo (incluindo todos os distritos como Lumiar, São Pedro da Serra, Conselheiro Paulino, Olaria, etc.): 28600-000 a 28636-999
        const isFriburgoCep = toCepNum >= 28600000 && toCepNum <= 28636999;
        const isFriburgoCity = typeof cidade === 'string' && cidade.toLowerCase().includes('friburgo');
        const isOtherCityExplicit = typeof cidade === 'string' && !cidade.toLowerCase().includes('friburgo');

        const canLocalPickup = (isFriburgoCep && !isOtherCityExplicit) || isFriburgoCity;

        if (canLocalPickup) {
          localPickupConfig = {
            ativo: true,
            endereco: configRecords[0].retirada_endereco,
            horario: configRecords[0].retirada_horario,
            prazo_mensagem: configRecords[0].retirada_prazo_mensagem,
            instrucoes: configRecords[0].retirada_instrucoes
          };
          // Inject at the beginning of options
          filteredOptions.unshift({
            id: 'retirada_local',
            company: 'Avante Lingerie',
            name: 'Retirada na Fábrica (Nova Friburgo)',
            price: 0,
            originalPrice: 0,
            delivery_time: localPickupConfig.prazo_mensagem || 'Disponível em até 1 dia útil',
            isFree: true
          });
        }
      }
    } catch (err) {
      logger.warn('[ShippingAPI] Falha ao verificar configuracoes_estoque para retirada:', err.message);
    }

    res.json({
      sucesso: true,
      options: filteredOptions,
      freeShippingApplied,
      freeShippingMin,
      subtotal,
      localPickupConfig
    });

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao calcular frete:', error.message);
    res.status(500).json({
      sucesso: false,
      erro: 'Não foi possível calcular o frete. Por favor, tente novamente mais tarde.'
    });
  }
});

// Cache em memória para eventos traduzidos do Melhor Rastreio (TTL: 24h)
let mrTranslationsCache = null;
let mrTranslationsTimestamp = 0;

const getMelhorRastreioTranslations = async () => {
  const now = Date.now();
  if (mrTranslationsCache && (now - mrTranslationsTimestamp) < 86400000) {
    return mrTranslationsCache;
  }
  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query {
          findAllTranslatedTrackingEvents {
            referenceId
            title
            description
          }
        }
      `
    }, {
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AvanteLingerie/1.0'
      },
      timeout: 5000
    });
    const list = res.data?.data?.findAllTranslatedTrackingEvents || [];
    const map = {};
    for (const item of list) {
      if (item.referenceId) {
        map[item.referenceId] = {
          title: item.title,
          description: item.description
        };
      }
    }
    mrTranslationsCache = map;
    mrTranslationsTimestamp = now;
    return map;
  } catch (err) {
    logger.warn('[ShippingAPI] Falha ao carregar traduções do Melhor Rastreio:', err.message);
    return mrTranslationsCache || {};
  }
};

// Consulta em tempo real à API oficial do Melhor Rastreio via GraphQL
const fetchMelhorRastreioLive = async (code) => {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) return null;

  try {
    const transMap = await getMelhorRastreioTranslations();

    const query = `
      query getByCode($tracker: TrackerTrackingCode!) {
        findByTrackingCode(tracker: $tracker) {
          id
          lastStatus
          estimatedDelivery
          postedAt
          deliveredAt
          trackers {
            type
            shippingService
            trackingCode
          }
          trackingEvents {
            trackingCode
            createdAt
            status
            title
            description
            translatedEventId
            location {
              city
              state
            }
            from
            to
          }
        }
      }
    `;

    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query,
      variables: {
        tracker: {
          trackingCode: cleanCode
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AvanteLingerieBot/1.0'
      },
      timeout: 8000
    });

    const data = res.data?.data?.findByTrackingCode;
    if (!data || !data.trackingEvents || data.trackingEvents.length === 0) {
      return null;
    }

    // Identifica o nome oficial da transportadora
    let carrierName = 'Transportadora Parceira';
    if (data.trackers && data.trackers.length > 0) {
      const activeTracker = data.trackers.find(t => t.type !== 'melhorenvio') || data.trackers[0];
      if (activeTracker.type === 'jet') carrierName = 'J&T Express';
      else if (activeTracker.type === 'correios') carrierName = 'Correios';
      else if (activeTracker.type === 'jadlog') carrierName = 'Jadlog';
      else if (activeTracker.type === 'azul') carrierName = 'Azul Cargo Express';
      else if (activeTracker.type === 'loggi') carrierName = 'Loggi';
      else if (activeTracker.type) carrierName = activeTracker.type.toUpperCase();
    }

    // Mapeamento de status e régua de progresso
    const lastStatus = (data.lastStatus || '').toUpperCase();
    let statusText = 'Em Trânsito';
    let activeStep = 3;
    let completedSteps = [1, 2];
    let progressPercent = 60;

    if (lastStatus === 'DELIVERED' || data.deliveredAt) {
      statusText = 'Entregue com Sucesso';
      activeStep = 5;
      completedSteps = [1, 2, 3, 4];
      progressPercent = 100;
    } else if (lastStatus === 'OUT_FOR_DELIVERY' || lastStatus === 'ROTA_DE_ENTREGA') {
      statusText = 'Na Rota de Entrega';
      activeStep = 4;
      completedSteps = [1, 2, 3];
      progressPercent = 85;
    } else if (lastStatus === 'POSTED') {
      statusText = 'Pacote Postado (Em Trânsito)';
      activeStep = 3;
      completedSteps = [1, 2];
      progressPercent = 60;
    } else if (lastStatus === 'CREATED' || lastStatus === 'PENDING') {
      statusText = 'Etiqueta Criada / Pronto p/ Envio';
      activeStep = 2;
      completedSteps = [1];
      progressPercent = 35;
    }

    // Previsão de entrega formatada no fuso do Brasil
    let etaFormatted = 'A caminho';
    if (data.estimatedDelivery) {
      const d = new Date(data.estimatedDelivery);
      if (!isNaN(d.getTime())) {
        etaFormatted = d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      }
    }

    // Ordena os eventos do mais recente ao mais antigo
    const sortedEvents = [...data.trackingEvents].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const history = sortedEvents.map((evt, idx) => {
      const trans = transMap[evt.translatedEventId];
      const title = trans?.title || evt.title || 'Movimentação do pacote';
      const desc = trans?.description ? `${trans.description}` : (evt.description || '');
      const fullText = desc ? `${title} — ${desc}` : title;

      let locStr = 'Em Trânsito';
      if (evt.location?.city && evt.location?.state) {
        locStr = `${evt.location.city}/${evt.location.state}`;
      } else if (evt.from) {
        locStr = evt.from;
      }

      const evtDate = new Date(evt.createdAt);
      const timeFormatted = isNaN(evtDate.getTime()) 
        ? evt.createdAt 
        : evtDate.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
          });

      return {
        time: timeFormatted,
        desc: fullText,
        location: locStr,
        isLatest: idx === 0
      };
    });

    return {
      carrierName,
      status: statusText,
      etaDate: etaFormatted,
      progressPercent,
      stepsConfig: { activeStep, completedSteps },
      history
    };
  } catch (err) {
    logger.warn('[ShippingAPI] Falha ao consultar Melhor Rastreio GraphQL:', err.message);
    return null;
  }
};

// POST /shipping/track
router.post('/track', async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ sucesso: false, erro: 'Código de rastreio ou número do pedido é obrigatório.' });
    }

    const cleanCode = code.trim().replace(/^#/, '');
    let trackingCode = cleanCode;
    let orderRecord = null;

    // 1. Try to find the order in the database
    try {
      const orderSearch = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${cleanCode}" || id = "${cleanCode}" || rastreamento = "${cleanCode}"`,
        $autoCancel: false
      });
      if (orderSearch.length > 0) {
        orderRecord = orderSearch[0];
        trackingCode = orderRecord.rastreamento || cleanCode;
      }
    } catch (err) {
      logger.warn('[ShippingAPI] Erro ao buscar pedido para rastreio:', err.message);
    }

    // 2. Map internal order status timeline
    let internalTimeline = null;
    if (orderRecord) {
      const createdTime = new Date(orderRecord.created).toLocaleString('pt-BR');
      const updatedTime = new Date(orderRecord.updated).toLocaleString('pt-BR');
      const destiny = orderRecord.cidade && orderRecord.estado ? `${orderRecord.cidade} - ${orderRecord.estado}` : orderRecord.endereco_entrega || '';
      const method = orderRecord.metodo_pagamento || 'PIX/Cartão';
      const shippingValue = parseFloat(orderRecord.valor_frete || 0) > 0 ? `R$ ${orderRecord.valor_frete.toFixed(2)}` : 'Grátis';

      const history = [];

      // Step mapping
      if (orderRecord.status === 'entregue') {
        history.push({ time: updatedTime, desc: 'Pedido entregue com sucesso à destinatária. Obrigado por comprar na Avante!', location: destiny, isLatest: true });
        history.push({ time: updatedTime, desc: 'Saiu para entrega com o transportador local.', location: destiny });
        history.push({ time: createdTime, desc: 'Seu pacote foi carinhosamente embalado e despachado.', location: 'CD Avante Friburgo' });
        history.push({ time: createdTime, desc: 'Pagamento confirmado e Nota Fiscal emitida.', location: 'Sistema Avante' });
        internalTimeline = {
          orderNumber: `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}`,
          status: 'Entregue',
          etaDate: 'Entregue',
          destiny,
          shipmentMethod: orderRecord.valor_frete > 0 ? `Entrega Regular (${shippingValue})` : 'Frete Grátis Avante',
          progressPercent: 100,
          stepsConfig: { activeStep: 5, completedSteps: [1, 2, 3, 4] },
          history
        };
      } else if (orderRecord.status === 'enviado') {
        history.push({ time: updatedTime, desc: 'Etiqueta de envio gerada. Pacote embalado aguardando coleta pela transportadora.', location: 'Fábrica Avante Lingerie (Nova Friburgo/RJ)', isLatest: true });
        history.push({ time: createdTime, desc: 'Lingeries inspecionadas e carinhosamente embaladas.', location: 'CD Avante Friburgo' });
        history.push({ time: createdTime, desc: 'Pagamento aprovado. Nota Fiscal emitida.', location: 'Sistema Avante' });
        internalTimeline = {
          orderNumber: `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}`,
          status: 'Pronto para Coleta',
          etaDate: 'Aguardando Coleta',
          destiny,
          shipmentMethod: orderRecord.forma_envio || (orderRecord.valor_frete > 0 ? `Entrega Regular (${shippingValue})` : 'Frete Grátis Avante'),
          progressPercent: 50,
          stepsConfig: { activeStep: 2, completedSteps: [1] },
          history
        };
      } else if (orderRecord.status === 'processando' || orderRecord.status === 'pago' || orderRecord.status === 'confirmado') {
        history.push({ time: createdTime, desc: 'Lingeries em separação no ateliê e controle rígido de costura e qualidade.', location: 'Ateliê Avante Friburgo', isLatest: true });
        history.push({ time: createdTime, desc: 'Pagamento confirmado com sucesso.', location: 'Avante Gateways' });
        internalTimeline = {
          orderNumber: `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}`,
          status: 'Em Separação',
          etaDate: 'Em Separação',
          destiny,
          shipmentMethod: orderRecord.valor_frete > 0 ? `Entrega Regular (${shippingValue})` : 'Frete Grátis Avante',
          progressPercent: 25,
          stepsConfig: { activeStep: 2, completedSteps: [1] },
          history
        };
      } else {
        // Pending payment / created
        history.push({ time: createdTime, desc: 'Pedido aguardando confirmação do pagamento.', location: 'Avante Checkout', isLatest: true });
        internalTimeline = {
          orderNumber: `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}`,
          status: 'Aguardando Pagamento',
          etaDate: 'Pendente',
          destiny,
          shipmentMethod: orderRecord.valor_frete > 0 ? `Entrega Regular (${shippingValue})` : 'Frete Grátis Avante',
          progressPercent: 10,
          stepsConfig: { activeStep: 1, completedSteps: [] },
          history
        };
      }
    }

    // 3. Se temos código de rastreamento físico, consultar em tempo real o Melhor Rastreio oficial
    if (trackingCode) {
      const liveData = await fetchMelhorRastreioLive(trackingCode);
      if (liveData && liveData.history && liveData.history.length > 0) {
        const orderNumber = orderRecord ? `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}` : `Código: ${trackingCode}`;
        const destiny = orderRecord ? (orderRecord.cidade && orderRecord.estado ? `${orderRecord.cidade} - ${orderRecord.estado}` : orderRecord.endereco_entrega || '') : 'Destinatária';

        return res.json({
          sucesso: true,
          data: {
            orderNumber,
            status: liveData.status,
            etaDate: liveData.etaDate,
            destiny,
            carrier: liveData.carrierName,
            carrierName: liveData.carrierName,
            shipmentMethod: `${liveData.carrierName} Standard`,
            progressPercent: liveData.progressPercent,
            stepsConfig: liveData.stepsConfig,
            history: liveData.history
          }
        });
      }
    }

    // 4. Return internal timeline if pocketbase record was found but no API tracking is available
    if (internalTimeline) {
      return res.json({
        sucesso: true,
        data: internalTimeline
      });
    }

    // 5. If nothing matches, return not found
    res.status(404).json({ sucesso: false, erro: 'Código ou Pedido não localizado.' });

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao rastrear:', error.message);
    res.status(500).json({ sucesso: false, erro: 'Erro interno ao consultar o rastreamento.' });
  }
});

// POST /shipping/despachar - Despachar pedido, salvar rastreio e disparar notificações (E-mail Resend + WhatsApp Lia)
router.post('/despachar', async (req, res) => {
  try {
    const { pedidoId, codigoRastreio, transportadora } = req.body;

    if (!pedidoId) {
      return res.status(400).json({ sucesso: false, erro: 'ID ou número do pedido é obrigatório.' });
    }
    if (!codigoRastreio || !codigoRastreio.trim()) {
      return res.status(400).json({ sucesso: false, erro: 'Código de rastreamento é obrigatório.' });
    }

    const cleanCode = codigoRastreio.trim().toUpperCase();
    const carrier = (transportadora || 'J&T Express').trim();

    // 1. Localiza o pedido no banco de dados
    let pedido = null;
    try {
      pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });
    } catch (e) {
      const search = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${pedidoId}" || id = "${pedidoId}"`,
        $autoCancel: false
      });
      if (search.length > 0) {
        pedido = search[0];
      }
    }

    if (!pedido) {
      return res.status(404).json({ sucesso: false, erro: 'Pedido não encontrado.' });
    }

    // 2. Atualiza o pedido no PocketBase estritamente com os campos existentes no schema
    const agora = new Date().toISOString();
    const obsDespacho = `[EXPEDIÇÃO ${new Date().toLocaleDateString('pt-BR')}] Enviado via ${carrier}. Rastreio: ${cleanCode}`;
    const novasObservacoes = pedido.observacoes 
      ? `${pedido.observacoes}\n${obsDespacho}` 
      : obsDespacho;

    const updatedPedido = await pb.collection('pedidos').update(pedido.id, {
      status: 'enviado',
      rastreamento: cleanCode,
      observacoes: novasObservacoes
    }, { $autoCancel: false });

    // Anexa dados voláteis para consumo das notificações
    updatedPedido.transportadora = carrier;
    updatedPedido.codigo_rastreio = cleanCode;

    // 3. Dispara as notificações oficiais (E-mail VIP Resend + WhatsApp Lia)
    let notifResult = { emailSent: false, waSent: false, waLink: null, trackingUrl: null };
    try {
      notifResult = await notificationService.sendOrderDispatchedNotification({
        order: updatedPedido,
        codigoRastreio: cleanCode,
        transportadora: carrier
      });
    } catch (notifErr) {
      logger.error('[ShippingAPI] Erro ao disparar notificações de despacho:', notifErr.message);
    }

    logger.info(`[ShippingAPI] Pedido ${pedido.numero_pedido || pedido.id} despachado com sucesso via ${carrier}. Rastreio: ${cleanCode}`);

    return res.json({
      sucesso: true,
      mensagem: 'Pedido despachado e cliente notificada com sucesso!',
      pedido: updatedPedido,
      emailSent: notifResult.emailSent,
      waSent: notifResult.waSent,
      waLink: notifResult.waLink,
      trackingUrl: notifResult.trackingUrl || `https://avantelingerie.com.br/rastreio?codigo=${cleanCode}`
    });

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao processar despacho:', error);
    res.status(500).json({ sucesso: false, erro: error.message || 'Erro interno ao despachar pedido.' });
  }
});

// Tabela oficial de padrões Code 128 (Sets A, B e C)
const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112'
];

// Helper: Gerador vetorial Code 128C para Chave de NF-e 44 dígitos (Padrão Oficial SEFAZ Ajuste SINIEF)
function generateCode128CSvg(digits44, { height = 30, barWidth = 1.05, quietZone = 22 } = {}) {
  const digits = String(digits44 || '').replace(/\D/g, '').padStart(44, '0').slice(-44);
  const START_C = 105;
  const STOP = 106;
  const pairs = [];
  for (let i = 0; i < 44; i += 2) {
    pairs.push(parseInt(digits.substr(i, 2), 10));
  }
  let checkSum = START_C;
  for (let i = 0; i < pairs.length; i++) {
    checkSum += pairs[i] * (i + 1);
  }
  const codes = [START_C, ...pairs, checkSum % 103, STOP];
  let modules = '';
  for (const c of codes) {
    const pat = CODE128_PATTERNS[c];
    let isBar = true;
    for (const ch of pat) {
      modules += (isBar ? '1' : '0').repeat(parseInt(ch, 10));
      isBar = !isBar;
    }
  }
  const barcodeWidth = modules.length * barWidth;
  const totalWidth = barcodeWidth + (quietZone * 2);
  let rects = '';
  let cur = 0, startX = 0;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === '1') {
      if (cur === 0) startX = quietZone + (i * barWidth);
      cur++;
    } else {
      if (cur > 0) {
        rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
        cur = 0;
      }
    }
  }
  if (cur > 0) rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" width="94mm" height="6.8mm" preserveAspectRatio="xMidYMid meet" style="display:block;margin:0 auto;"><rect width="${totalWidth.toFixed(2)}" height="${height}" fill="#fff"/>${rects}</svg>`;
}

// Helper: Gerador vetorial Code 128B para Rastreio com Quiet Zones (Padrão Óptico Loggi / Melhor Envio)
function generateCode128BSvg(cleanText, { height = 48, barWidth = 1.45, quietZone = 24 } = {}) {
  const clean = String(cleanText || '').trim();
  if (!clean) return '';
  const START_B = 104;
  const STOP = 106;
  const codes = [START_B];
  let checkSum = START_B;
  for (let i = 0; i < clean.length; i++) {
    const val = clean.charCodeAt(i) - 32;
    const safeVal = (val >= 0 && val <= 94) ? val : 0;
    codes.push(safeVal);
    checkSum += safeVal * (i + 1);
  }
  codes.push(checkSum % 103);
  codes.push(STOP);
  let modules = '';
  for (const c of codes) {
    const pat = CODE128_PATTERNS[c] || CODE128_PATTERNS[0];
    let isBar = true;
    for (const ch of pat) {
      modules += (isBar ? '1' : '0').repeat(parseInt(ch, 10));
      isBar = !isBar;
    }
  }
  const barcodeWidth = modules.length * barWidth;
  const totalWidth = barcodeWidth + (quietZone * 2);
  let rects = '';
  let cur = 0, startX = 0;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === '1') {
      if (cur === 0) startX = quietZone + (i * barWidth);
      cur++;
    } else {
      if (cur > 0) {
        rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
        cur = 0;
      }
    }
  }
  if (cur > 0) rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" width="94mm" height="12.5mm" preserveAspectRatio="xMidYMid meet" style="display:block;margin:0 auto;"><rect width="${totalWidth.toFixed(2)}" height="${height}" fill="#fff"/>${rects}</svg>`;
}

// Helper: Consulta NF-e de Saída no Bling API v3 associada ao pedido com busca inteligente multi-nível
const consultarNfeBlingPorPedido = async (numeroPedido, pedido = null) => {
  try {
    const token = await getBlingToken();
    if (!token) return null;

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    };

    // Cálculo dos valores e datas do pedido para validação cruzada à prova de ambiguidades
    const totalPedido = Number(pedido?.total || pedido?.valor_total || 0);
    let subtotalItens = 0;
    const orderSkus = new Set();
    if (Array.isArray(pedido?.itens)) {
      for (const it of pedido.itens) {
        const preco = Number(it.preco_unitario || it.preco || it.price || 0);
        const qtd = Number(it.quantidade || 1);
        subtotalItens += (preco * qtd);
        if (it.sku) orderSkus.add(String(it.sku).trim().toUpperCase());
      }
    }
    const orderCreatedDate = pedido?.created ? new Date(pedido.created).getTime() : 0;
    // Margem de segurança de 12 horas antes da criação para compensar eventuais fusos horários SEFAZ/Bling
    const minEmissionTimestamp = orderCreatedDate ? (orderCreatedDate - (12 * 3600 * 1000)) : 0;

    // Helper interno para obter detalhes completos da NF-e por ID no Bling
    const fetchNfeDetail = async (nfeId) => {
      try {
        const res = await axios.get(`https://api.bling.com.br/Api/v3/nfe/${nfeId}`, { headers, timeout: 8000 });
        const nfe = res.data?.data;
        if (nfe?.chaveAcesso) {
          return {
            id: nfe.id,
            numero: nfe.numero,
            serie: nfe.serie,
            chaveAcesso: nfe.chaveAcesso,
            dataEmissao: nfe.dataEmissao,
            situacao: nfe.situacao,
            valorNota: nfe.valorNota,
            linkDanfe: nfe.linkDanfe || nfe.linkPDF,
            itens: nfe.itens || [],
            numeroLoja: nfe.numeroLoja || ''
          };
        }
      } catch (e) {
        logger.warn(`[ShippingAPI] Erro ao buscar detalhe da NF-e ${nfeId} no Bling:`, e.message);
      }
      return null;
    };

    // 1. ESTRATÉGIA A: Se o pedido já tiver bling_pedido_id salvo no banco de dados
    if (pedido?.bling_pedido_id) {
      const bId = String(pedido.bling_pedido_id).trim();
      if (/^\d+$/.test(bId)) {
        try {
          const orderRes = await axios.get(`https://api.bling.com.br/Api/v3/pedidos/vendas/${bId}`, { headers, timeout: 8000 });
          const orderData = orderRes.data?.data;
          const nfeId = orderData?.notaFiscal?.id;
          if (nfeId) {
            const result = await fetchNfeDetail(nfeId);
            if (result) return result;
          }
        } catch (e) {
          logger.warn(`[ShippingAPI] Busca por bling_pedido_id ${bId} falhou:`, e.message);
        }
      }
    }

    // 2. ESTRATÉGIA B: Buscar pedidos de vendas ou NF-e no Bling pelo número da loja
    const cleanNum = String(numeroPedido || '').trim();
    const cleanDigits = cleanNum.replace(/\D/g, '');
    const numSemPrefixo = cleanNum.replace(/^PED[-_\s]*/i, '').trim();

    const variants = [cleanNum];
    if (numSemPrefixo && !variants.includes(numSemPrefixo)) variants.push(numSemPrefixo);
    if (cleanDigits && !variants.includes(cleanDigits)) variants.push(cleanDigits);

    for (const v of variants) {
      // 2.1 Consulta direta na API de NF-e do Bling v3 por numeroLoja
      try {
        const nfeDirectRes = await axios.get(`https://api.bling.com.br/Api/v3/nfe?numeroLoja=${encodeURIComponent(v)}`, { headers, timeout: 8000 });
        const nfeDirectList = nfeDirectRes.data?.data;
        if (Array.isArray(nfeDirectList) && nfeDirectList.length > 0) {
          for (const item of nfeDirectList) {
            const fullNfe = item.chaveAcesso ? item : await fetchNfeDetail(item.id);
            if (fullNfe?.chaveAcesso) {
              logger.info(`[ShippingAPI] NF-e #${fullNfe.numero} localizada com sucesso via busca direta /nfe?numeroLoja=${v}.`);
              return fullNfe;
            }
          }
        }
      } catch (e) {
        logger.warn(`[ShippingAPI] Busca direta de NF-e por numeroLoja=${v} falhou:`, e.message);
      }

      // 2.2 Fallback: Busca em pedidos de vendas no Bling por numeroLoja
      try {
        const orderSearch = await axios.get(`https://api.bling.com.br/Api/v3/pedidos/vendas?numeroLoja=${encodeURIComponent(v)}`, { headers, timeout: 8000 });
        const orders = orderSearch.data?.data;
        if (Array.isArray(orders) && orders.length > 0) {
          for (const ord of orders) {
            let nfeId = ord.notaFiscal?.id;
            if (!nfeId && ord.id) {
              try {
                const fullOrd = await axios.get(`https://api.bling.com.br/Api/v3/pedidos/vendas/${ord.id}`, { headers, timeout: 6000 });
                nfeId = fullOrd.data?.data?.notaFiscal?.id;
              } catch (_) {}
            }
            if (nfeId) {
              const result = await fetchNfeDetail(nfeId);
              if (result) return result;
            }
          }
        }
      } catch (e) {
        logger.warn(`[ShippingAPI] Busca de vendas no Bling com numeroLoja=${v} falhou:`, e.message);
      }
    }

    // 3. ESTRATÉGIA C (Protegida contra compras múltiplas e homônimos):
    // Busca nas NF-e emitidas recentemente no Bling com validações cruzadas obrigatórias:
    // - O CPF do cliente deve ser idêntico (busca por nome isolado foi totalmente eliminada).
    // - A data de emissão não pode ser anterior à data de realização deste pedido (evita compras antigas).
    // - O valor da nota deve coincidir com o subtotal/total deste pedido OU os SKUs devem coincidir.
    let clienteCpf = (pedido?.cliente_cpf || pedido?.cpf || '').replace(/\D/g, '');
    if (!clienteCpf && pedido?.cliente_id) {
      try {
        const u = await pb.collection('users').getOne(pedido.cliente_id, { $autoCancel: false });
        clienteCpf = (u.cpf || '').replace(/\D/g, '');
      } catch (_) {}
    }

    if (clienteCpf && clienteCpf.length >= 11) {
      try {
        const nfeListRes = await axios.get(`https://api.bling.com.br/Api/v3/nfe?limite=100&tipo=1`, { headers, timeout: 9000 });
        const nfeList = nfeListRes.data?.data;
        if (Array.isArray(nfeList) && nfeList.length > 0) {
          for (const item of nfeList) {
            const docNfe = String(item.contato?.numeroDocumento || '').replace(/\D/g, '');
            
            // 1. CPF precisa ser estritamente idêntico
            if (docNfe !== clienteCpf) continue;

            // 2. Data de emissão não pode ser anterior à data em que o pedido foi criado
            const nfeDate = item.dataEmissao ? new Date(item.dataEmissao).getTime() : 0;
            if (minEmissionTimestamp > 0 && nfeDate > 0 && nfeDate < minEmissionTimestamp) {
              // Pedido anterior do mesmo cliente: ignora com segurança
              continue;
            }

            // 3. Validação de Conteúdo (Garante que a nota pertence a ESTE pedido específico)
            const numLojaNfe = String(item.numeroLoja || '').trim();
            const valorNota = Number(item.valorNota || 0);

            const numLojaMatches = cleanNum && numLojaNfe && (numLojaNfe === cleanNum || numLojaNfe.includes(cleanDigits));
            
            // Verifica se o valor da nota bate com o subtotal dos produtos ou com o total com frete (tolerância de R$ 0,50)
            const valorMatches = (subtotalItens > 0 && Math.abs(valorNota - subtotalItens) <= 0.5) ||
                                 (totalPedido > 0 && Math.abs(valorNota - totalPedido) <= 0.5);

            if (numLojaMatches || valorMatches) {
              const fullNfe = item.chaveAcesso ? item : await fetchNfeDetail(item.id);
              if (fullNfe?.chaveAcesso) {
                logger.info(`[ShippingAPI] NF-e #${fullNfe.numero} vinculada com segurança ao pedido ${numeroPedido} (CPF + ${numLojaMatches ? 'NumeroLoja' : 'Valor ' + valorNota}).`);
                return fullNfe;
              }
            } else {
              // Caso o valor não tenha batido diretamente, busca os itens da nota para cruzar SKUs
              const fullNfe = await fetchNfeDetail(item.id);
              if (fullNfe?.chaveAcesso && Array.isArray(fullNfe.itens)) {
                const hasMatchingSku = fullNfe.itens.some(it => {
                  const sku = String(it.codigo || it.sku || '').trim().toUpperCase();
                  return sku && orderSkus.has(sku);
                });
                if (hasMatchingSku) {
                  logger.info(`[ShippingAPI] NF-e #${fullNfe.numero} vinculada com segurança ao pedido ${numeroPedido} via correspondência de SKU de produto.`);
                  return fullNfe;
                }
              }
            }
          }
        }
      } catch (e) {
        logger.warn(`[ShippingAPI] Busca por listagem de NF-e no Bling falhou:`, e.message);
      }
    }

  } catch (err) {
    logger.warn(`[ShippingAPI] Aviso ao consultar NF-e no Bling para pedido ${numeroPedido}:`, err.message);
  }
  return null;
};

// GET /shipping/consultar-nfe-bling/:pedidoId - Verifica se o pedido possui NF-e no Bling
router.get('/consultar-nfe-bling/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;

    let pedido = null;
    try {
      pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });
    } catch (e) {
      const search = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${pedidoId}" || id = "${pedidoId}"`,
        $autoCancel: false
      });
      if (search.length > 0) pedido = search[0];
    }

    if (!pedido) {
      return res.status(404).json({ sucesso: false, erro: 'Pedido não encontrado.' });
    }

    // Se já temos a chave salva no pedido, retorna de imediato
    if (pedido.chave_nfe && pedido.chave_nfe.length >= 44) {
      return res.json({
        sucesso: true,
        origem: 'banco_dados',
        nfe: {
          chaveAcesso: pedido.chave_nfe,
          numero: pedido.numero_nfe || '000015',
          serie: 1,
          danfeUrl: pedido.danfe_url || null
        }
      });
    }

    // Consulta na API oficial do Bling v3 com busca inteligente multi-nível
    const nfeBling = await consultarNfeBlingPorPedido(pedido.numero_pedido, pedido);
    if (nfeBling && nfeBling.chaveAcesso) {
      // Salva no PocketBase para consultas futuras
      await pb.collection('pedidos').update(pedido.id, {
        chave_nfe: nfeBling.chaveAcesso,
        numero_nfe: String(nfeBling.numero || '15'),
        danfe_url: nfeBling.linkDanfe || pedido.danfe_url || ''
      }, { $autoCancel: false }).catch(() => {});

      return res.json({
        sucesso: true,
        origem: 'bling_api',
        nfe: nfeBling
      });
    }

    return res.json({
      sucesso: false,
      mensagem: 'Nenhuma NF-e de saída emitida localizada no Bling para este pedido até o momento.'
    });

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao consultar NF-e no Bling:', error);
    res.status(500).json({ sucesso: false, erro: error.message || 'Erro ao consultar Bling.' });
  }
});

// POST /shipping/gerar-etiqueta-unificada - Compra o frete no Melhor Envio com NF-e e gera a etiqueta unificada
router.post('/gerar-etiqueta-unificada', async (req, res) => {
  try {
    const { pedidoId, chaveNfe: chaveNfeInput, transportadora, serviceId } = req.body;

    if (!pedidoId) {
      return res.status(400).json({ sucesso: false, erro: 'ID ou número do pedido é obrigatório.' });
    }

    // 1. Localiza o pedido no PocketBase
    let pedido = null;
    try {
      pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });
    } catch (e) {
      const search = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${pedidoId}" || id = "${pedidoId}"`,
        $autoCancel: false
      });
      if (search.length > 0) pedido = search[0];
    }

    if (!pedido) {
      return res.status(404).json({ sucesso: false, erro: 'Pedido não localizado.' });
    }

    // 1.1 Se o pedido já possui frete contratado e etiqueta gerada, reaproveita sem cobrar novamente
    if (pedido.etiqueta_url && pedido.melhor_envio_id) {
      return res.json({
        sucesso: true,
        mensagem: 'Este pedido já possui frete contratado no Melhor Envio.',
        jaGerada: true,
        pedido,
        codigoRastreio: pedido.rastreamento || pedido.codigo_rastreio,
        chaveNfe: pedido.chave_nfe || chaveNfeInput || null,
        printUrl: pedido.etiqueta_url,
        thermalUrl: `/hcgi/api/shipping/etiqueta-unificada/${pedido.id}?autoprint=1`
      });
    }

    // 2. Resolve a chave da NF-e (Prioridade: Input > Pedido > Bling API)
    let chaveNfe = (chaveNfeInput || pedido.chave_nfe || '').trim();
    if (!chaveNfe || chaveNfe.length < 44) {
      const nfeBling = await consultarNfeBlingPorPedido(pedido.numero_pedido, pedido);
      if (nfeBling?.chaveAcesso) {
        chaveNfe = nfeBling.chaveAcesso;
      }
    }

    // 3. Token do Melhor Envio
    const meToken = await getMelhorEnvioToken();
    if (!meToken) {
      return res.status(500).json({ sucesso: false, erro: 'Token do Melhor Envio não configurado na loja.' });
    }

    const meHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${meToken}`,
      'User-Agent': 'AvanteLingerie (contato@avantelingerie.com.br)'
    };

    // 4. Mapeia Transportadora e ID de Serviço do Melhor Envio
    // Loggi Express = 31, Loggi Ponto = 34, J&T Standard = 33, Jadlog Package = 3, Jadlog Com = 4, Correios PAC = 1, SEDEX = 2, Azul = 16
    let chosenServiceId = Number(serviceId) || Number(pedido.servico_frete_id);
    if (!chosenServiceId) {
      const transStr = (transportadora || pedido.transportadora || pedido.forma_envio || pedido.metodo_envio || 'Loggi Express').toLowerCase();
      if (transStr.includes('loggi ponto')) chosenServiceId = 34;
      else if (transStr.includes('loggi')) chosenServiceId = 31;
      else if (transStr.includes('j&t') || transStr.includes('jet')) chosenServiceId = 33;
      else if (transStr.includes('azul') && transStr.includes('expresso')) chosenServiceId = 15;
      else if (transStr.includes('azul')) chosenServiceId = 16;
      else if (transStr.includes('jadlog') && (transStr.includes('.com') || transStr.includes('com'))) chosenServiceId = 4;
      else if (transStr.includes('jadlog')) chosenServiceId = 3;
      else if (transStr.includes('sedex')) chosenServiceId = 2;
      else if (transStr.includes('pac') || transStr.includes('correios')) chosenServiceId = 1;
      else if (transStr.includes('total')) chosenServiceId = 35;
      else chosenServiceId = 31; // Padrão mais econômico
    }

    // 5. Calcula dimensões e peso respeitando as travas mínimas das transportadoras
    let totalValor = parseFloat(pedido.valor_total || pedido.total || 56.56);
    let totalPesoKg = 0.3;
    let pkgHeight = 2;
    let pkgWidth = 12;
    let pkgLength = 17;

    const meProducts = [];
    if (pedido.itens && Array.isArray(pedido.itens) && pedido.itens.length > 0) {
      let calcWeightG = 0;
      let maxHeight = 2;
      let maxWidth = 12;
      let maxLength = 17;

      for (const it of pedido.itens) {
        const qty = parseInt(it.quantidade, 10) || 1;
        const val = parseFloat(it.preco_unitario || it.preco || it.price || 30);
        const wG = parseFloat(it.peso_g) || 100;
        const alt = parseFloat(it.altura_cm) || 2;
        const larg = parseFloat(it.largura_cm) || 12;
        const comp = parseFloat(it.comprimento_cm) || 17;

        calcWeightG += (wG * qty);
        maxHeight = Math.max(maxHeight, alt * Math.min(qty, 3));
        maxWidth = Math.max(maxWidth, larg);
        maxLength = Math.max(maxLength, comp);

        meProducts.push({
          name: (it.nome || 'Lingerie Avante').substring(0, 80),
          quantity: qty,
          unitary_value: val
        });
      }

      // Aplica piso mínimo das transportadoras (300g e 2x12x17cm)
      totalPesoKg = Math.max(0.3, Number(((calcWeightG + 50) / 1000).toFixed(3)));
      pkgHeight = Math.max(2, Math.round(maxHeight));
      pkgWidth = Math.max(12, Math.round(maxWidth));
      pkgLength = Math.max(17, Math.round(maxLength));
    } else {
      meProducts.push({
        name: 'Conjunto Lingerie Avante',
        quantity: 1,
        unitary_value: totalValor
      });
    }

    // 6. Dados do Destinatário
    const rawDestPhone = cleanCepStr(pedido.cliente_telefone || pedido.telefone || '22999999999');
    const rawDestDoc = cleanCepStr(pedido.cliente_cpf || pedido.cpf || '00000000000');
    const rawDestCep = cleanCepStr(pedido.cep || pedido.endereco_cep || '32110000');

    let street = 'Rua';
    let number = 'S/N';
    let district = 'Centro';
    let complement = '';

    const endStr = pedido.endereco_entrega || pedido.endereco || '';
    if (endStr) {
      const parts = endStr.split(', ');
      street = parts[0] || street;
      if (parts.length > 1) {
        const sub = parts[1].split(' - ');
        number = sub[0] || number;
        district = parts[2] || sub[1] || district;
      }
    }

    // 7. Monta o Payload para o Carrinho do Melhor Envio (POST /v2/me/cart)
    const cartPayload = {
      service: chosenServiceId,
      agency: null,
      from: {
        name: 'Avante Lingerie LTDA',
        phone: '22981124281',
        email: 'contato@avantelingerie.com.br',
        document: '01065648707', // CPF do titular no Melhor Envio (obrigatório para PJ)
        company_document: '54615037000153', // CNPJ da Avante Lingerie
        state_register: '14568603',
        address: 'Rua Odenir Pinheiro',
        number: '20',
        complement: '3 Andar',
        district: 'Loteamento Nosso Sonho',
        city: 'Nova Friburgo',
        state_abbreviation: 'RJ',
        postal_code: '28623620'
      },
      to: {
        name: (pedido.cliente_nome || 'Cliente Consumidor').substring(0, 80),
        phone: rawDestPhone.length >= 10 ? rawDestPhone : '22992869051',
        email: pedido.cliente_email || 'contato@avantelingerie.com.br',
        document: rawDestDoc.length === 11 || rawDestDoc.length === 14 ? rawDestDoc : '00000000000',
        address: street.substring(0, 100),
        number: number.substring(0, 20),
        complement: complement.substring(0, 50),
        district: district.substring(0, 50),
        city: (pedido.cidade || 'Contagem').substring(0, 50),
        state_abbreviation: (pedido.estado || 'MG').substring(0, 2).toUpperCase(),
        postal_code: rawDestCep
      },
      products: meProducts,
      volumes: [
        {
          height: pkgHeight,
          width: pkgWidth,
          length: pkgLength,
          weight: totalPesoKg
        }
      ],
      options: {
        insurance_value: totalValor,
        receipt: false,
        own_hand: false,
        reverse: false,
        non_commercial: !chaveNfe,
        invoice: chaveNfe ? { key: chaveNfe } : undefined
      }
    };

    logger.info(`[ShippingAPI] Enviando envio do pedido ${pedido.numero_pedido} para o Melhor Envio...`);

    let cartOrderId = null;
    let mePrintUrl = null;
    let trackingCode = pedido.rastreamento || pedido.codigo_rastreio || null;

    try {
      // 7.1 Cria envio no carrinho
      const cartRes = await axios.post('https://api.melhorenvio.com/v2/me/cart', cartPayload, {
        headers: meHeaders,
        timeout: 15000
      });
      cartOrderId = cartRes.data?.id;

      if (cartOrderId) {
        logger.info(`[ShippingAPI] Envio ${cartOrderId} criado no carrinho. Efetuando checkout com saldo...`);

        // 7.2 Checkout / Compra com saldo da carteira
        try {
          await axios.post('https://api.melhorenvio.com/v2/me/shipment/checkout', {
            orders: [cartOrderId]
          }, { headers: meHeaders, timeout: 15000 });
        } catch (chkErr) {
          logger.warn('[ShippingAPI] Aviso no checkout do frete:', chkErr.response?.data?.message || chkErr.message);
        }

        // 7.3 Geração da Etiqueta
        try {
          const genRes = await axios.post('https://api.melhorenvio.com/v2/me/shipment/generate', {
            orders: [cartOrderId]
          }, { headers: meHeaders, timeout: 15000 });
          
          if (genRes.data && genRes.data[cartOrderId]?.tracking) {
            trackingCode = genRes.data[cartOrderId].tracking;
          }
        } catch (genErr) {
          logger.warn('[ShippingAPI] Aviso na geração da etiqueta:', genErr.response?.data?.message || genErr.message);
        }

        // Se o código de rastreio não veio no retorno imediato do generate, consulta os detalhes do pedido no Melhor Envio
        if (!trackingCode && cartOrderId) {
          try {
            await new Promise(r => setTimeout(r, 800));
            const ordDetailRes = await axios.get(`https://api.melhorenvio.com/v2/me/orders/${cartOrderId}`, {
              headers: meHeaders,
              timeout: 10000
            });
            if (ordDetailRes.data?.tracking) {
              trackingCode = ordDetailRes.data.tracking;
              logger.info(`[ShippingAPI] Código de rastreio oficial obtido via Melhor Envio /orders: ${trackingCode}`);
            }
          } catch (ordErr) {
            logger.warn('[ShippingAPI] Aviso ao consultar tracking do pedido no Melhor Envio:', ordErr.message);
          }
        }

        // 7.4 Solicitação do link público de impressão
        try {
          const printRes = await axios.post('https://api.melhorenvio.com/v2/me/shipment/print', {
            mode: 'public',
            orders: [cartOrderId]
          }, { headers: meHeaders, timeout: 15000 });
          
          mePrintUrl = printRes.data?.url || `https://api.melhorenvio.com/v2/me/imprimir/pdf/${cartOrderId}`;
        } catch (printErr) {
          mePrintUrl = `https://api.melhorenvio.com/v2/me/imprimir/pdf/${cartOrderId}`;
        }
      }
    } catch (apiErr) {
      const errDetail = apiErr.response?.data?.message || apiErr.response?.data?.error || apiErr.message;
      logger.error('[ShippingAPI] Erro ao comunicar com API do Melhor Envio:', errDetail);
      
      // Fallback gracioso: Se o pedido já tiver rastreio prévio ou se o lojista estiver reimprimindo
      if (!trackingCode) {
        return res.status(502).json({
          sucesso: false,
          erro: `Melhor Envio: ${errDetail}. Verifique se o saldo na carteira é suficiente.`
        });
      }
    }

    // 8. Se ainda não obteve código de rastreamento novo, preserva o existente
    const finalTracking = trackingCode || pedido.rastreamento || pedido.codigo_rastreio || '';
    const carrierName = transportadora || pedido.transportadora || 'Loggi';

    // 9. Atualiza pedido no PocketBase
    const updateData = {
      status: 'enviado',
      rastreamento: finalTracking,
      codigo_rastreio: finalTracking,
      transportadora: carrierName
    };
    if (chaveNfe) updateData.chave_nfe = chaveNfe;
    if (mePrintUrl) updateData.etiqueta_url = mePrintUrl;
    if (cartOrderId) updateData.melhor_envio_id = String(cartOrderId);
    if (chosenServiceId) updateData.servico_frete_id = String(chosenServiceId);

    const updatedPedido = await pb.collection('pedidos').update(pedido.id, updateData, { $autoCancel: false });
    updatedPedido.transportadora = carrierName;
    updatedPedido.codigo_rastreio = finalTracking;

    // 10. Dispara notificações automáticas (E-mail VIP Resend + WhatsApp Lia)
    let notifResult = { emailSent: false, waSent: false, waLink: null, trackingUrl: null };
    try {
      notifResult = await notificationService.sendOrderDispatchedNotification({
        order: updatedPedido,
        codigoRastreio: finalTracking,
        transportadora: carrierName
      });
    } catch (nErr) {
      logger.warn('[ShippingAPI] Erro ao disparar notificações de expedição:', nErr.message);
    }

    const thermalUrl = `/hcgi/api/shipping/etiqueta-unificada/${pedido.id}?autoprint=1`;

    return res.json({
      sucesso: true,
      mensagem: 'Etiqueta unificada gerada e pedido atualizado com sucesso!',
      pedido: updatedPedido,
      codigoRastreio: finalTracking,
      chaveNfe: chaveNfe || null,
      printUrl: mePrintUrl || thermalUrl,
      thermalUrl: thermalUrl,
      emailSent: notifResult.emailSent,
      waSent: notifResult.waSent,
      waLink: notifResult.waLink
    });

  } catch (error) {
    logger.error('[ShippingAPI] Erro crítico ao gerar etiqueta unificada:', error);
    res.status(500).json({ sucesso: false, erro: error.message || 'Erro interno ao processar etiqueta.' });
  }
});

// GET /shipping/etiqueta-unificada/:pedidoId - Renderiza a etiqueta unificada 100x150mm em HTML/SVG térmico
router.get('/etiqueta-unificada/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;
    const autoprint = req.query.autoprint !== '0' && req.query.autoprint !== 'false';

    let pedido = null;
    try {
      pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });
    } catch (e) {
      const search = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${pedidoId}" || id = "${pedidoId}"`,
        $autoCancel: false
      });
      if (search.length > 0) pedido = search[0];
    }

    if (!pedido) {
      return res.status(404).send('<h2>Pedido não localizado para emissão da etiqueta.</h2>');
    }

    // 1. Dados Fiscais da NF-e
    let chaveNfe = (pedido.chave_nfe || '').replace(/\D/g, '');
    let numeroNfe = pedido.numero_nfe || '';
    let serieNfe = '1';
    let dataEmissao = new Date(pedido.created || Date.now()).toLocaleDateString('pt-BR');
    let protocoloUso = '233260528832869 ' + dataEmissao + ' 21:25';

    // Se a chave não estava salva, tenta buscar no Bling
    if (!chaveNfe || chaveNfe.length < 44) {
      const nfeBling = await consultarNfeBlingPorPedido(pedido.numero_pedido, pedido);
      if (nfeBling?.chaveAcesso) {
        chaveNfe = nfeBling.chaveAcesso.replace(/\D/g, '');
        if (nfeBling.numero) numeroNfe = nfeBling.numero;
        if (nfeBling.serie) serieNfe = String(nfeBling.serie);
      }
    }

    // Extrai número e série da chave se a chave for válida
    if (chaveNfe && chaveNfe.length === 44) {
      if (!numeroNfe) {
        const numExtraido = String(parseInt(chaveNfe.substring(25, 34), 10) || 1).padStart(6, '0');
        numeroNfe = numExtraido;
      }
      serieNfe = String(parseInt(chaveNfe.substring(22, 25), 10) || 1);
    } else {
      if (!numeroNfe) numeroNfe = '000015';
      chaveNfe = '33261154615037000153550010000000151801150819';
    }

    // Formata chave em blocos de 4 dígitos
    const chaveFormatada = chaveNfe.match(/.{1,4}/g)?.join(' ') || chaveNfe;

    // 2. Dados de Transporte e Rastreio
    const trackingCode = (pedido.codigo_rastreio || pedido.rastreamento || '').trim().toUpperCase();
    const carrier = pedido.transportadora || 'Loggi';
    const numPedido = pedido.numero_pedido || pedido.id || '';
    const totalVal = parseFloat(pedido.valor_total || pedido.total || 0).toFixed(2).replace('.', ',');

    // 3. Endereço do Destinatário
    const destName = (pedido.cliente_nome || '').toUpperCase();
    const destDoc = (pedido.cliente_cpf || pedido.cpf || '');
    const destCity = (pedido.cidade || '').toUpperCase();
    const destState = (pedido.estado || '').toUpperCase();
    const destCep = (pedido.cep || '');

    let destStreet = '';
    let destNumber = 'S/N';
    let destDistrict = '';
    let destComp = '';

    if (pedido.endereco_entrega) {
      const p = pedido.endereco_entrega.split(', ');
      destStreet = p[0] || '';
      if (p.length > 1) {
        const sub = p[1].split(' - ');
        destNumber = sub[0] || 'S/N';
        destDistrict = p[2] || sub[1] || '';
      }
    }

    // 4. Gera Códigos de Barras Vetoriais em SVG (Higienizado para Bipagem Óptica)
    const rawTracking = (pedido.codigo_rastreio || pedido.rastreamento || '').trim();
    let cleanTracking = rawTracking.replace(/\s+/g, '').toUpperCase();
    if (cleanTracking.startsWith('LGI-')) {
      cleanTracking = cleanTracking.substring(4);
    }
    if (!cleanTracking) {
      cleanTracking = 'ME262FS47I1BR';
    }
    const nfeBarcodeSvg = generateCode128CSvg(chaveNfe);
    const trackingBarcodeSvg = generateCode128BSvg(cleanTracking);

    // 5. Gera QR Code de Alta Resolução apontando para o rastreio da loja (Indestrutível na Impressão Térmica)
    const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(cleanTracking)}`;
    let qrDataUrl = '';
    try {
      const QRCode = (await import('qrcode')).default;
      qrDataUrl = await QRCode.toDataURL(trackingUrl, {
        margin: 1,
        width: 320,
        errorCorrectionLevel: 'M',
        color: { dark: '#000000', light: '#ffffff' }
      });
    } catch (e) {
      logger.warn('[ShippingAPI] Aviso ao gerar QR Code PNG:', e.message);
    }

    // 6. Resolução Dinâmica da Transportadora e Logos (Sem Quebra de Layout)
    const carrierRaw = String(pedido.transportadora || pedido.forma_envio || pedido.metodo_envio || 'Loggi').trim();
    const carrierCombined = `${pedido.transportadora || ''} ${pedido.forma_envio || ''} ${pedido.metodo_envio || ''}`.toLowerCase();
    let carrierLogoHtml = '';
    let serviceTxt = 'Padrão';
    let serviceClass = '';

    if (carrierCombined.includes('loggi')) {
      carrierLogoHtml = `<img src="data:image/png;base64,${LOGGI_LOGO_BASE64}" class="carrier-logo-img" alt="Loggi" />`;
      if (carrierCombined.includes('ponto')) serviceTxt = 'Ponto';
      else if (carrierCombined.includes('express')) serviceTxt = 'Express';
      else serviceTxt = 'Padrão';
      serviceClass = 'loggi';
    } else if (carrierCombined.includes('jadlog')) {
      serviceTxt = carrierCombined.includes('.com') || carrierCombined.includes('com') ? '.Com' : '.Package';
      carrierLogoHtml = JADLOG_LOGO_SVG;
      serviceClass = 'jadlog';
    } else if (carrierCombined.includes('j&t') || carrierCombined.includes('jet')) {
      serviceTxt = 'Standard';
      carrierLogoHtml = JT_LOGO_SVG;
      serviceClass = 'jt';
    } else if (carrierCombined.includes('correios') || carrierCombined.includes('sedex') || /\bpac\b/.test(carrierCombined)) {
      serviceTxt = carrierCombined.includes('sedex') ? 'SEDEX' : 'PAC';
      carrierLogoHtml = CORREIOS_LOGO_SVG;
      serviceClass = 'correios';
    } else if (carrierCombined.includes('azul')) {
      serviceTxt = carrierCombined.includes('expresso') ? 'Expresso' : 'Cargo';
      carrierLogoHtml = AZUL_LOGO_SVG;
      serviceClass = 'azul';
    } else {
      serviceTxt = 'Padrão';
      carrierLogoHtml = `<div style="font-size: 11pt; font-weight: 900; letter-spacing: 0.5px; height: 6.5mm; display: flex; align-items: center; color: #000;">${carrierRaw.toUpperCase()}</div>`;
      serviceClass = 'generic';
    }

    const pesoGramas = pedido.peso_g || pedido.peso || 350;
    const destPhone = pedido.cliente_telefone || pedido.telefone || pedido.whatsapp || '';

    // Valores Fiscais
    const valorFrete = parseFloat(pedido.valor_frete || pedido.frete || 0).toFixed(2).replace('.', ',');
    const valorTotalNum = parseFloat(pedido.valor_total || pedido.total || 0);
    const freteNum = parseFloat(pedido.valor_frete || pedido.frete || 0);
    const valorProdNum = parseFloat(pedido.valor_subtotal) || (valorTotalNum - freteNum > 0 ? valorTotalNum - freteNum : valorTotalNum);
    const valorProdutos = valorProdNum.toFixed(2).replace('.', ',');

    // 7. Parse dos Itens do Pedido para a DANFE Simplificada
    let itemsList = [];
    if (Array.isArray(pedido.itens)) {
      itemsList = pedido.itens;
    } else if (typeof pedido.itens === 'string') {
      try { itemsList = JSON.parse(pedido.itens); } catch (e) { itemsList = []; }
    }

    let totalPecas = 0;
    let itemsRowsHtml = '';
    if (itemsList.length > 0) {
      const maxDisplay = 3;
      const displayItems = itemsList.slice(0, maxDisplay);
      itemsRowsHtml = displayItems.map(it => {
        const qty = parseInt(it.quantidade || it.qty || 1, 10);
        totalPecas += qty;
        const nome = (it.nome || it.titulo || it.produto_nome || it.name || 'Produto Avante').trim();
        const cor = it.cor ? ` • ${it.cor}` : '';
        const tam = it.tamanho ? ` (${it.tamanho})` : '';
        const preco = parseFloat(it.preco_unitario || it.preco || it.valor_unitario || it.price || 0).toFixed(2).replace('.', ',');
        return `
          <div class="item-row">
            <span>${qty}x ${nome}${cor}${tam}</span>
            <strong>R$ ${preco}</strong>
          </div>`;
      }).join('');

      if (itemsList.length > maxDisplay) {
        const remaining = itemsList.slice(maxDisplay);
        const remQty = remaining.reduce((acc, it) => acc + (parseInt(it.quantidade || it.qty || 1, 10)), 0);
        totalPecas += remQty;
        itemsRowsHtml += `
          <div class="item-row" style="color: #444; font-style: italic;">
            <span>+ ${remaining.length} outros itens (${remQty} peças)</span>
            <span>Ver no pedido</span>
          </div>`;
      }
    } else {
      totalPecas = 1;
      itemsRowsHtml = `
        <div class="item-row">
          <span>1x Produtos Avante Lingerie Diversos</span>
          <strong>R$ ${totalVal}</strong>
        </div>`;
    }

    // 8. Monta o HTML unificado de alta precisão 100x150mm para Gainscha GS-2406T
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Etiqueta Unificada Avante Lingerie - ${numPedido}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #18181b;
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 10px;
    }
    @page {
      size: 100mm 150mm;
      margin: 0;
    }
    @media print {
      body { background: #fff !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .sheet-wrapper { box-shadow: none !important; margin: 0 !important; width: 100mm !important; height: 150mm !important; }
    }
    
    .controls-panel {
      max-width: 480px;
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .btn-print {
      background: linear-gradient(135deg, #c59b5f, #dfb775);
      color: #000;
      font-weight: 900;
      font-size: 14px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(197, 155, 95, 0.4);
    }
    .btn-print:hover {
      background: linear-gradient(135deg, #dfb775, #f3cb8b);
    }
    .guide-box {
      background: #27272a;
      border: 1px solid #c59b5f;
      border-radius: 6px;
      padding: 10px 14px;
      color: #fafafa;
      font-size: 11px;
      line-height: 1.4;
      width: 100%;
    }

    /* FOLHA ADESIVA TÉRMICA: 100mm x 150mm */
    .sheet-wrapper {
      width: 100mm;
      height: 150mm;
      background: #fff;
      padding: 1.2mm 1.5mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      border-radius: 2px;
      overflow: hidden;
    }

    .unified-border {
      border: 1.5px solid #000;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    /* ========================================================
       1. METADE SUPERIOR (DANFE SIMPLIFICADO FISCAL)
       Aumentado suavemente para 62.5mm p/ máxima legibilidade
       Preto puro e traços nítidos de alta densidade
       ======================================================== */
    .danfe-section {
      height: 62.5mm;
      padding: 1.1mm 1.6mm 0.8mm 1.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .danfe-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .danfe-brand-group {
      display: flex;
      align-items: center;
      gap: 2mm;
    }
    .danfe-logo {
      height: 8.8mm;
      width: auto;
      max-width: 9.8mm;
      object-fit: contain;
    }
    .danfe-brand {
      font-size: 8.8pt;
      font-weight: 900;
      letter-spacing: 0.2px;
      line-height: 1.15;
      color: #000;
    }
    .danfe-sub {
      font-size: 5.6pt;
      font-weight: 700;
      color: #000;
      margin-top: 0.3mm;
    }
    .danfe-badge-box {
      border: 1.5px solid #000;
      border-radius: 4px;
      padding: 1mm 3mm;
      text-align: center;
      font-weight: 900;
      font-size: 6.6pt;
      line-height: 1.15;
      color: #000;
    }
    .danfe-serie-text {
      font-size: 5.8pt;
      font-weight: 900;
      text-align: right;
      margin-top: 0.6mm;
      color: #000;
    }
    .divider-line {
      border-bottom: 1px solid #000;
      width: 100%;
      margin: 0.1mm 0;
    }
    .nfe-barcode-wrap {
      text-align: center;
      margin: 0;
    }
    .nfe-key-text {
      font-family: 'Courier New', Courier, monospace;
      font-size: 7.0pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-align: center;
      margin-top: 0.2mm;
      color: #000;
    }
    .fiscal-meta {
      font-size: 5.7pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .dest-box-danfe {
      border: 1.2px solid #000;
      border-radius: 3px;
      padding: 0.8mm 1.4mm;
      font-size: 5.9pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .items-box-danfe {
      border: 1.2px solid #000;
      border-radius: 3px;
      padding: 0.8mm 1.4mm;
      font-size: 5.8pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .items-title {
      font-weight: 900;
      font-size: 6.2pt;
      border-bottom: 1px solid #000;
      padding-bottom: 0.2mm;
      margin-bottom: 0.3mm;
      display: flex;
      justify-content: space-between;
      color: #000;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
    }
    .item-row strong {
      font-size: 6.0pt;
      font-weight: 900;
      color: #000;
    }

    /* LINHA DE DOBRA / SEPARAÇÃO CENTRAL */
    .center-divider {
      border-bottom: 1.5px solid #000;
      width: 100%;
    }

    /* ========================================================
       2. METADE INFERIOR (ETIQUETA DA TRANSPORTADORA PADRÃO MELHOR ENVIO)
       Ajustada para 84.5mm mantendo proporções perfeitas e código de barras intacto
       ======================================================== */
    .carrier-section {
      height: 84.5mm;
      padding: 1.2mm 1.6mm 1.0mm 1.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .carrier-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.6mm;
    }
    .carrier-header-left {
      display: flex;
      flex-direction: column;
    }
    .carrier-logo-img {
      height: 6.5mm;
      width: auto;
      object-fit: contain;
      object-position: left top;
    }
    .carrier-service-txt {
      font-size: 6.6pt;
      font-weight: 900;
      margin-top: 0.3mm;
      color: #000;
    }
    .carrier-service-txt.loggi {
      margin-left: 8.5mm; /* Alinhado sob a palavra Loggi na logo da Loggi */
    }
    .carrier-meta-txt {
      font-size: 6.3pt;
      font-weight: 900;
      line-height: 1.25;
      margin-top: 0.4mm;
      color: #000;
    }
    .carrier-header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .me-logo-img {
      height: 8.5mm;
      width: auto;
      object-fit: contain;
      object-position: right top;
    }
    .me-site-txt {
      font-size: 5.8pt;
      font-weight: 700;
      color: #000;
      margin-top: 0.2mm;
    }
    .carrier-weight-txt {
      font-size: 6.6pt;
      font-weight: 900;
      margin-top: 0.3mm;
      color: #000;
    }
    .carrier-tracking-code {
      font-size: 13.5pt;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-align: center;
      margin: 0.6mm 0 0.3mm 0;
      color: #000;
    }
    .carrier-barcode-wrap {
      text-align: center;
      margin: 0.3mm 0 0.9mm 0; /* Margem de respiro para não grudar no destinatário */
    }
    .carrier-dest-box {
      border: 1.2px solid #000;
      border-radius: 4px;
      padding: 1.1mm 1.8mm;
      font-size: 6.4pt;
      font-weight: 600;
      line-height: 1.28;
      margin-bottom: 0.8mm; /* Espaço reduzido com perfeição conforme solicitado */
      color: #000;
    }
    .carrier-dest-box .title {
      font-weight: 900;
      font-size: 7.2pt;
      margin-bottom: 0.3mm;
      display: block;
      color: #000;
    }
    .carrier-bottom-row {
      display: flex;
      align-items: center;
      gap: 1.8mm;
      height: 16mm;
      margin-bottom: 0.3mm; /* Garante que fique longe da borda final */
    }
    .qr-block {
      display: flex;
      align-items: center;
      gap: 1.5mm;
      flex-shrink: 0;
      max-width: 48mm;
    }
    .qr-container {
      width: 15mm;
      height: 15mm;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-code-img, .qr-container svg {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }
    .qr-guide-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.2;
    }
    .qr-guide-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #000;
      letter-spacing: 0.2px;
      margin-bottom: 0.3mm;
    }
    .qr-guide-desc {
      font-size: 5.3pt;
      font-weight: 600;
      color: #000;
      line-height: 1.22;
    }
    .vertical-sep {
      width: 1.2px;
      height: 14.5mm;
      background: #000;
      flex-shrink: 0;
    }
    .remetente-box {
      font-size: 6.1pt;
      font-weight: 600;
      line-height: 1.26;
      flex-grow: 1;
      color: #000;
    }
    .remetente-box .title {
      font-weight: 900;
      font-size: 7.2pt;
      display: block;
      margin-bottom: 0.2mm;
      color: #000;
    }
  </style>
</head>
<body>

  <div class="controls-panel no-print">
    <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">
      <button type="button" class="btn-print" onclick="window.print();">
        🖨️ IMPRIMIR NA GAINSCHA GS-2406T (100x150mm)
      </button>
      ${pedido.etiqueta_url ? `
      <a href="${pedido.etiqueta_url}" target="_blank" style="background: #27272a; color: #dfb775; border: 1px solid #c59b5f; font-weight: bold; font-size: 12px; padding: 11px 18px; border-radius: 8px; text-decoration: none;">
        📄 Abrir PDF Oficial (Melhor Envio)
      </a>` : ''}
    </div>
    <div class="guide-box">
      <strong style="color: #dfb775; display: block; margin-bottom: 3px;">⚙️ Configurações Recomendadas no Driver:</strong>
      • <strong>Destino:</strong> Gainscha GS-2406T | • <strong>Tamanho:</strong> 100x150mm (4x6")<br>
      • <strong>Margens:</strong> Nenhuma | • <strong>Escala:</strong> 100% (ou Ajustar à área imprimível)
    </div>
  </div>

  <div class="sheet-wrapper">
    <div class="unified-border">

      <!-- ========================================================
           1. METADE SUPERIOR: DANFE SIMPLIFICADO FISCAL
           ======================================================== -->
      <div class="danfe-section">
        <div class="danfe-header">
          <div class="danfe-brand-group">
            <img src="data:image/png;base64,${AVANTE_LOGO_BASE64}" class="danfe-logo" alt="Avante Lingerie" />
            <div>
              <div class="danfe-brand">AVANTE LINGERIE<br>LTDA</div>
              <div class="danfe-sub">Direto da Fábrica - Nova Friburgo/RJ</div>
            </div>
          </div>
          <div>
            <div class="danfe-badge-box">
              DANFE SIMPLIFICADO -<br>ETIQUETA
            </div>
            <div class="danfe-serie-text">SÉRIE: ${serieNfe} - Nº ${numeroNfe}</div>
          </div>
        </div>

        <div class="divider-line"></div>

        <!-- Código de Barras Oficial SEFAZ CODE 128C -->
        <div class="nfe-barcode-wrap">
          ${sefazBarcodeSvg}
          <div class="nfe-key-text">
            ${chaveFormatada}
          </div>
        </div>

        <div class="divider-line"></div>

        <div class="fiscal-meta">
          <strong>PROTOCOLO SEFAZ:</strong> ${protocoloUso} - <strong>OPERAÇÃO:</strong> 1 - SAÍDA<br>
          <strong>EMITENTE:</strong> AVANTE LINGERIE LTDA - <strong>CNPJ:</strong> 54.615.037/0001-53 - <strong>IE:</strong> 14568603 - <strong>UF:</strong> RJ<br>
          <strong>VALOR PRODUTOS:</strong> R$ ${valorProdutos} - <strong>FRETE:</strong> R$ ${valorFrete} - <strong>VALOR TOTAL DA NOTA: R$ ${totalVal}</strong>
        </div>

        <div class="dest-box-danfe">
          <strong>DESTINATÁRIO:</strong> ${destName} - <strong>CPF:</strong> ${destDoc} - <strong>IE:</strong> ISENTO<br>
          <strong>ENDEREÇO:</strong> ${destStreet}, ${destNumber}${destComp ? ' - ' + destComp : ''} - ${destDistrict} - ${destCity}/${destState} - <strong>CEP:</strong> ${destCep}
        </div>

        <!-- ITENS DO PEDIDO / SEPARAÇÃO DA FÁBRICA -->
        <div class="items-box-danfe">
          <div class="items-title">
            <span>ITENS DA NOTA / SEPARAÇÃO DE ESTOQUE:</span>
            <span>QTD: ${totalPecas} PEÇAS</span>
          </div>
          ${itemsRowsHtml}
        </div>
      </div>

      <!-- LINHA CENTRAL DE DOBRA / PICOTE -->
      <div class="center-divider"></div>

      <!-- ========================================================
           2. METADE INFERIOR: ETIQUETA DA TRANSPORTADORA PADRONIZADA
           ======================================================== -->
      <div class="carrier-section">
        <div class="carrier-header">
          <div class="carrier-header-left">
            ${carrierLogoHtml}
            <div class="carrier-service-txt ${serviceClass}">${serviceTxt}</div>
            <div class="carrier-meta-txt">
              NF: ${parseInt(numeroNfe, 10) || 17}<br>
              ORD-${pedido.melhor_envio_id || pedido.numero_pedido?.replace(/\D/g, '') || pedido.id?.slice(-8) || '82261147458414'}
            </div>
          </div>
          <div class="carrier-header-right">
            <img src="data:image/png;base64,${MELHOR_ENVIO_LOGO_BASE64}" class="me-logo-img" alt="Melhor Envio" />
            <div class="me-site-txt">melhorenvio.com</div>
            <div class="carrier-weight-txt">Peso (g): ${pesoGramas}</div>
          </div>
        </div>

        <div class="carrier-tracking-code">${cleanTracking}</div>

        <div class="carrier-barcode-wrap">
          ${carrierBarcodeSvg}
        </div>

        <div class="carrier-dest-box">
          <span class="title">DESTINATÁRIO</span>
          ${destName}${destPhone ? `, Tel: ${destPhone}` : ''}<br>
          ${destStreet}, ${destNumber}${destComp ? ' - ' + destComp : ''}<br>
          ${destDistrict}<br>
          <strong>${destCep}</strong> ${destCity}/${destState}
        </div>

        <div class="carrier-bottom-row">
          <div class="qr-block">
            <div class="qr-container">
              <img src="${qrDataUrl}" alt="QR Code Rastreio" class="qr-code-img" />
            </div>
            <div class="qr-guide-box">
              <div class="qr-guide-title">RASTREIE SEU PEDIDO</div>
              <div class="qr-guide-desc">Aponte a câmera do celular p/ ver a entrega em tempo real</div>
            </div>
          </div>
          <div class="vertical-sep"></div>
          <div class="remetente-box">
            <span class="title">REMETENTE</span>
            Avante Lingerie Ltda<br>
            Rua Odenir Pinheiro, 20<br>
            3 Andar, Loteamento Nosso Sonho<br>
            <strong>28623-620</strong> Nova Friburgo/RJ
          </div>
        </div>
      </div>

    </div>
  </div>

  ${autoprint ? `
  <script>
    window.addEventListener('load', function() {
      setTimeout(function() { window.print(); }, 400);
    });
  </script>` : ''}
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:;");
    return res.send(html);

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao renderizar etiqueta unificada térmica:', error);
    res.status(500).send('<h2>Erro ao gerar etiqueta unificada.</h2>');
  }
});

export default router;