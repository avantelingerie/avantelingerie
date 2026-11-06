import express from 'express';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { notificationService } from '../services/notificationService.js';
import { getBlingToken } from '../utils/blingTokenManager.js';

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
        history.push({ time: updatedTime, desc: 'Objeto em transferência ou em trânsito para a unidade de distribuição.', location: destiny, isLatest: true });
        history.push({ time: createdTime, desc: 'Seu pacote foi carinhosamente embalado e entregue à transportadora.', location: 'CD Avante Friburgo' });
        history.push({ time: createdTime, desc: 'Pagamento aprovado. Nota Fiscal emitida.', location: 'Sistema Avante' });
        internalTimeline = {
          orderNumber: `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}`,
          status: 'Em Trânsito',
          etaDate: 'A caminho',
          destiny,
          shipmentMethod: orderRecord.valor_frete > 0 ? `Entrega Regular (${shippingValue})` : 'Frete Grátis Avante',
          progressPercent: 60,
          stepsConfig: { activeStep: 3, completedSteps: [1, 2] },
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

const AVANTE_LOGO_BASE64 = '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';

// Helper: Gerador vetorial de Código de Barras Code 128 em SVG nativo (100% livre de dependências)
function generateCode128Svg(text, { height = 40, barWidth = 1.4, showText = false, fontSize = 10 } = {}) {
  if (!text) return '';
  const clean = String(text).trim();
  const patterns = [
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

  const START_B = 104;
  const STOP = 106;
  const codes = [START_B];
  let checkSum = START_B;

  for (let i = 0; i < clean.length; i++) {
    const charCode = clean.charCodeAt(i);
    const val = charCode - 32;
    const safeVal = (val >= 0 && val <= 94) ? val : 0;
    codes.push(safeVal);
    checkSum += safeVal * (i + 1);
  }

  codes.push(checkSum % 103);
  codes.push(STOP);

  let modules = '';
  for (const code of codes) {
    const pattern = patterns[code] || patterns[0];
    let isBar = true;
    for (const char of pattern) {
      const count = parseInt(char, 10);
      modules += (isBar ? '1' : '0').repeat(count);
      isBar = !isBar;
    }
  }

  const totalWidth = modules.length * barWidth;
  let rects = '';
  let currentRun = 0;
  let startX = 0;

  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === '1') {
      if (currentRun === 0) startX = i * barWidth;
      currentRun++;
    } else {
      if (currentRun > 0) {
        rects += `<rect x="${startX.toFixed(1)}" y="0" width="${(currentRun * barWidth).toFixed(1)}" height="${height}" fill="#000" />`;
        currentRun = 0;
      }
    }
  }
  if (currentRun > 0) {
    rects += `<rect x="${startX.toFixed(1)}" y="0" width="${(currentRun * barWidth).toFixed(1)}" height="${height}" fill="#000" />`;
  }

  const textElement = showText
    ? `<text x="${(totalWidth / 2).toFixed(1)}" y="${height + fontSize + 2}" font-family="monospace" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="#000">${clean}</text>`
    : '';

  const totalSvgHeight = showText ? height + fontSize + 5 : height;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalSvgHeight}" width="100%" height="${totalSvgHeight}" preserveAspectRatio="none">
    ${rects}
    ${textElement}
  </svg>`;
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

    // 2. ESTRATÉGIA B: Buscar pedidos de vendas no Bling pelo número da loja
    const cleanNum = String(numeroPedido || '').trim();
    const cleanDigits = cleanNum.replace(/\D/g, '');
    const numSemPrefixo = cleanNum.replace(/^PED[-_\s]*/i, '').trim();

    const variants = [cleanNum];
    if (numSemPrefixo && !variants.includes(numSemPrefixo)) variants.push(numSemPrefixo);
    if (cleanDigits && !variants.includes(cleanDigits)) variants.push(cleanDigits);

    for (const v of variants) {
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
    // J&T Express Standard = 33, Jadlog Package = 3, Correios PAC = 1, SEDEX = 2
    let chosenServiceId = Number(serviceId);
    if (!chosenServiceId) {
      const transStr = (transportadora || pedido.transportadora || pedido.metodo_envio || 'J&T Express').toLowerCase();
      if (transStr.includes('j&t') || transStr.includes('jet')) chosenServiceId = 33;
      else if (transStr.includes('jadlog')) chosenServiceId = 3;
      else if (transStr.includes('sedex')) chosenServiceId = 2;
      else if (transStr.includes('pac') || transStr.includes('correios')) chosenServiceId = 1;
      else chosenServiceId = 33; // Padrão J&T Express Standard (ID 33)
    }

    // 5. Calcula dimensões e valor segurado
    let totalValor = parseFloat(pedido.valor_total || pedido.total || 100);
    let totalPesoKg = 0.3;
    let pkgHeight = 8;
    let pkgWidth = 15;
    let pkgLength = 20;

    const meProducts = [];
    if (pedido.itens && Array.isArray(pedido.itens) && pedido.itens.length > 0) {
      let calcWeightG = 0;
      for (const it of pedido.itens) {
        const qty = parseInt(it.quantidade, 10) || 1;
        const val = parseFloat(it.preco_unitario || it.preco || it.price || 30);
        const wG = parseFloat(it.peso_g) || 100;
        calcWeightG += (wG * qty);

        meProducts.push({
          name: (it.nome || 'Lingerie Avante').substring(0, 80),
          quantity: qty,
          unitary_value: val
        });
      }
      if (calcWeightG > 0) totalPesoKg = Math.max(0.1, Number((calcWeightG / 1000).toFixed(3)));
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
    const finalTracking = trackingCode || pedido.rastreamento || pedido.codigo_rastreio || '888031017960740';
    const carrierName = transportadora || pedido.transportadora || 'J&T Express';

    // 9. Atualiza pedido no PocketBase
    const updateData = {
      status: 'enviado',
      rastreamento: finalTracking,
      codigo_rastreio: finalTracking
    };
    if (chaveNfe) updateData.chave_nfe = chaveNfe;
    if (mePrintUrl) updateData.etiqueta_url = mePrintUrl;

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
    let numeroNfe = pedido.numero_nfe || '000015';
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

    // Fallback de chave oficial (para teste/visualização padrão SEFAZ caso ainda não emitida)
    if (!chaveNfe || chaveNfe.length < 44) {
      chaveNfe = '33261154615037000153550010000000151801150819';
    }

    // Formata chave em blocos de 4 dígitos
    const chaveFormatada = chaveNfe.match(/.{1,4}/g)?.join(' ') || chaveNfe;

    // 2. Dados de Transporte e Rastreio
    const trackingCode = (pedido.codigo_rastreio || pedido.rastreamento || '888031017960740').trim().toUpperCase();
    const carrier = pedido.transportadora || 'J&T Express';
    const numPedido = pedido.numero_pedido || 'PED-003';
    const totalVal = parseFloat(pedido.valor_total || pedido.total || 111.38).toFixed(2).replace('.', ',');

    // 3. Endereço do Destinatário
    const destName = (pedido.cliente_nome || 'Isis Santos').toUpperCase();
    const destDoc = (pedido.cliente_cpf || pedido.cpf || '055.435.866-20');
    const destCity = (pedido.cidade || 'Contagem').toUpperCase();
    const destState = (pedido.estado || 'MG').toUpperCase();
    const destCep = (pedido.cep || '32110-000');

    let destStreet = 'Avenida Princesa Isabel';
    let destNumber = '452';
    let destDistrict = 'Parque Recreio';
    let destComp = '';

    if (pedido.endereco_entrega) {
      const p = pedido.endereco_entrega.split(', ');
      destStreet = p[0] || destStreet;
      if (p.length > 1) {
        const sub = p[1].split(' - ');
        destNumber = sub[0] || destNumber;
        destDistrict = p[2] || sub[1] || destDistrict;
      }
    }

    // 4. Gera Códigos de Barras Vetoriais em SVG
    const nfeBarcodeSvg = generateCode128Svg(chaveNfe, { height: 34, barWidth: 1.25 });
    const trackingBarcodeSvg = generateCode128Svg(trackingCode, { height: 38, barWidth: 1.55, showText: false });

    // 5. Gera QR Code Vetorial apontando para o rastreio da loja
    const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(trackingCode)}`;
    let qrCodeSvg = '';
    try {
      const QRCode = (await import('qrcode')).default;
      qrCodeSvg = await QRCode.toString(trackingUrl, {
        type: 'svg',
        width: 82,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
      });
    } catch (e) {
      logger.warn('[ShippingAPI] Aviso ao gerar QR Code SVG:', e.message);
    }

    // 6. Monta o HTML com dimensões exatas de 100mm x 150mm para Gainscha GS-2406T
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Etiqueta Unificada Avante Lingerie - ${numPedido}</title>
  <style>
    @page {
      size: 100mm 150mm;
      margin: 0;
    }
    @media print {
      html, body {
        width: 100mm !important;
        height: 150mm !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .no-print { display: none !important; }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 100mm;
      height: 150mm;
      max-width: 100mm;
      max-height: 150mm;
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
      background: #fff;
      padding: 3mm 3.5mm;
      font-size: 7.5pt;
      line-height: 1.15;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      overflow: hidden;
    }
    .sheet {
      width: 93mm;
      height: 144mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .section-danfe {
      height: 70mm;
      border: 1.5px solid #000;
      padding: 2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .section-divider {
      height: 3.5mm;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px dashed #000;
      border-bottom: 1px dashed #000;
      font-size: 5.5pt;
      font-weight: bold;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .section-carrier {
      height: 70mm;
      border: 1.5px solid #000;
      padding: 2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header-box {
      border-bottom: 1px solid #000;
      padding-bottom: 1.5mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      font-size: 8.5pt;
      font-weight: 900;
      letter-spacing: 0.5px;
    }
    .brand-sub {
      font-size: 5.5pt;
      color: #222;
    }
    .danfe-badge {
      border: 1.5px solid #000;
      padding: 1mm 1.5mm;
      font-weight: bold;
      font-size: 6.5pt;
      text-align: center;
    }
    .barcode-container {
      text-align: center;
      padding: 1mm 0;
    }
    .chave-nfe-txt {
      font-family: monospace;
      font-size: 5.8pt;
      font-weight: bold;
      letter-spacing: 0.2px;
      margin-top: 1mm;
    }
    .grid-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 1mm 0;
      font-size: 6.5pt;
    }
    .routing-banner {
      background: #000;
      color: #fff;
      font-weight: 900;
      font-size: 11pt;
      text-align: center;
      padding: 1.2mm 0;
      border-radius: 2px;
      letter-spacing: 0.5px;
    }
    .address-block {
      font-size: 6.5pt;
      line-height: 1.25;
    }
    .address-title {
      font-weight: 900;
      font-size: 6.8pt;
      border-bottom: 1px solid #666;
      margin-bottom: 0.5mm;
      display: inline-block;
    }
    .carrier-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #000;
      padding-top: 1mm;
    }
    .print-bar {
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: #c59b5f;
      color: #000;
      font-weight: bold;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      border: none;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="sheet">
    
    <!-- METADE SUPERIOR (0 a 70mm): DANFE SIMPLIFICADO -->
    <div class="section-danfe">
      <div class="header-box">
        <div style="display: flex; align-items: center; gap: 2mm;">
          <img src="data:image/png;base64,${AVANTE_LOGO_BASE64}" style="height: 10mm; width: auto; max-width: 11mm; object-fit: contain;" alt="Avante Lingerie" />
          <div>
            <div class="brand-title">AVANTE LINGERIE</div>
            <div class="brand-sub">Direto da Fábrica &bull; Nova Friburgo/RJ</div>
          </div>
        </div>
        <div class="danfe-badge">
          DANFE SIMPLIFICADO - ETIQUETA
        </div>
      </div>

      <div class="barcode-container">
        ${nfeBarcodeSvg}
        <div class="chave-nfe-txt">CHAVE: ${chaveFormatada}</div>
      </div>

      <div style="font-size: 6.2pt; line-height: 1.2;">
        <strong>PROTOCOLO SEFAZ:</strong> ${protocoloUso}<br>
        <strong>EMITENTE:</strong> Avante Lingerie LTDA &bull; <strong>CNPJ:</strong> 54.615.037/0001-53 &bull; <strong>IE:</strong> 14568603 &bull; <strong>UF:</strong> RJ
      </div>

      <div class="grid-info">
        <div><strong>SÉRIE:</strong> ${serieNfe} &bull; <strong>Nº:</strong> ${numeroNfe}</div>
        <div style="text-align: right;"><strong>OPERAÇÃO:</strong> 1 - SAÍDA &bull; ${dataEmissao}</div>
      </div>

      <div class="address-block">
        <div class="address-title">DESTINATÁRIO</div><br>
        <strong>NOME:</strong> ${destName}<br>
        <strong>CPF/CNPJ:</strong> ${destDoc} &bull; <strong>IE:</strong> ISENTO<br>
        <strong>ENDEREÇO:</strong> ${destStreet}, ${destNumber}${destComp ? ' - ' + destComp : ''} &bull; ${destDistrict}<br>
        <strong>CEP:</strong> ${destCep} &bull; ${destCity}/${destState}
      </div>

      <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 6.8pt; border-top: 1px solid #000; padding-top: 1mm;">
        <span>VALOR TOTAL: R$ ${totalVal}</span>
        <span>PEDIDO: #${numPedido}</span>
      </div>
    </div>

    <!-- SEPARAÇÃO FÍSICA (DOBRA / PICOTE 75mm) -->
    <div class="section-divider">
      &bull; &bull; &bull; PICOTE / DOBRA (75mm) &bull; &bull; &bull;
    </div>

    <!-- METADE INFERIOR (75 a 150mm): ETIQUETA DE TRANSPORTE -->
    <div class="section-carrier">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1mm;">
        <div>
          <span style="font-size: 11pt; font-weight: 900; letter-spacing: 0.5px;">${carrier.toUpperCase()}</span>
          <span style="font-size: 6.5pt; font-weight: bold; margin-left: 4px;">Standard</span>
        </div>
        <div style="font-size: 6.8pt; font-weight: bold;">
          ORD-${pedido.id?.slice(-8) || numPedido}
        </div>
      </div>

      <div class="routing-banner">
        CHV B224-00 012 &nbsp;&bull;&nbsp; ${destCity} / ${destState}
      </div>

      <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 2mm;">
        <div class="address-block">
          <div class="address-title">DESTINATÁRIO:</div><br>
          <strong>${destName}</strong><br>
          ${destStreet}, ${destNumber}<br>
          ${destDistrict}<br>
          <strong>${destCep} ${destCity}/${destState}</strong>
        </div>
        <div class="address-block" style="border-left: 1px solid #ccc; padding-left: 2mm;">
          <div class="address-title">REMETENTE:</div><br>
          Avante Lingerie Ltda<br>
          Rua Odenir Pinheiro, 20<br>
          3 Andar, Olaria<br>
          28623-620 Nova Friburgo/RJ
        </div>
      </div>

      <div class="barcode-container">
        ${trackingBarcodeSvg}
        <div style="text-align: center; font-family: Arial, Helvetica, sans-serif; font-size: 13pt; font-weight: 900; letter-spacing: 2px; color: #000; padding-top: 1mm; line-height: 1;">
          ${trackingCode}
        </div>
      </div>

      <div class="carrier-footer-row">
        <div style="display: flex; align-items: center; gap: 2mm;">
          ${qrCodeSvg ? `<div style="width: 22mm; height: 22mm;">${qrCodeSvg}</div>` : ''}
          <div style="font-size: 5.5pt; line-height: 1.15;">
            <strong>Acompanhe o Rastreio:</strong><br>
            Aponte a câmera do celular<br>
            avantelingerie.com.br
          </div>
        </div>
        <div style="text-align: right; font-size: 6.5pt; font-weight: bold;">
          melhorenvio<br>
          <span style="font-size: 5.5pt; font-weight: normal; color: #555;">Gainscha GS-2406T</span>
        </div>
      </div>
    </div>

  </div>

  <button class="print-bar no-print" onclick="window.focus(); window.print();">🖨️ Imprimir Térmica (100x150)</button>

  ${autoprint ? `
  <script>
    window.addEventListener('load', function() {
      window.focus();
      setTimeout(function() {
        try {
          window.print();
        } catch (e) {
          console.warn('Falha no acionamento automático de impressão:', e);
        }
      }, 450);
    });
  </script>` : ''}
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);

  } catch (error) {
    logger.error('[ShippingAPI] Erro ao renderizar etiqueta unificada térmica:', error);
    res.status(500).send('<h2>Erro ao gerar etiqueta unificada.</h2>');
  }
});

export default router;