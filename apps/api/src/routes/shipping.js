import express from 'express';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

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
      sort: '-prioridade',
      $autoCancel: false
    }).catch(() => []);

    const toCepNum = parseInt(cleanToCep, 10);
    let freeShippingApplied = false;
    let freeShippingMin = 299; // Default threshold fallback

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
      } else if (rule.tipo === 'global') {
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

    // 7.5 Check if local pickup is enabled in configuracoes_loja
    let localPickupConfig = null;
    try {
      const configRecords = await pb.collection('configuracoes_loja').getFullList({ $autoCancel: false });
      if (configRecords.length > 0 && configRecords[0].retirada_ativo) {
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
          name: 'Retirada no Local',
          price: 0,
          originalPrice: 0,
          delivery_time: localPickupConfig.prazo_mensagem || '1 dia',
          isFree: true
        });
      }
    } catch (err) {
      logger.warn('[ShippingAPI] Falha ao verificar configuracoes_loja para retirada:', err.message);
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
        filter: `numero_pedido = "${cleanCode}" || id = "${cleanCode}"`,
        $autoCancel: false
      });
      if (orderSearch.length > 0) {
        orderRecord = orderSearch[0];
        trackingCode = orderRecord.rastreamento || '';
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

    // 3. If there is a tracking code, call Melhor Envio API to fetch real-time carrier status
    if (trackingCode) {
      const token = await getMelhorEnvioToken();
      if (token) {
        try {
          const meResponse = await axios.post('https://api.melhorenvio.com.br/api/v2/me/shipment/tracking', {
            orders: [trackingCode]
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          const trackData = meResponse.data?.[trackingCode];
          if (trackData && !trackData.error && trackData.tracking && trackData.tracking.length > 0) {
            // Map status from Melhor Envio
            const latestTrack = trackData.tracking[trackData.tracking.length - 1];
            const meStatus = trackData.status || ''; // pending, released, posted, delivered, canceled
            
            let statusText = 'Em Separação';
            let activeStep = 2;
            let completedSteps = [1];
            let progressPercent = 25;

            if (meStatus === 'delivered') {
              statusText = 'Entregue';
              activeStep = 5;
              completedSteps = [1, 2, 3, 4];
              progressPercent = 100;
            } else if (meStatus === 'posted') {
              statusText = 'Em Trânsito';
              activeStep = 3;
              completedSteps = [1, 2];
              progressPercent = 50;
            } else if (meStatus === 'released') {
              statusText = 'Na Rota de Entrega';
              activeStep = 4;
              completedSteps = [1, 2, 3];
              progressPercent = 75;
            }

            const meHistory = [...trackData.tracking].reverse().map((event, idx) => ({
              time: new Date(event.date).toLocaleString('pt-BR'),
              desc: event.message || event.status || '',
              location: event.location || 'Em Trânsito',
              isLatest: idx === 0
            }));

            // Merge order number and destiny if available in DB
            const orderNumber = orderRecord ? `Pedido #${orderRecord.numero_pedido || orderRecord.id.slice(-6)}` : `Código: ${trackingCode}`;
            const destiny = orderRecord ? (orderRecord.cidade && orderRecord.estado ? `${orderRecord.cidade} - ${orderRecord.estado}` : orderRecord.endereco_entrega || '') : 'Destinatária';

            return res.json({
              sucesso: true,
              data: {
                orderNumber,
                status: statusText,
                etaDate: trackData.estimated_delivery ? new Date(trackData.estimated_delivery).toLocaleDateString('pt-BR') : 'Consultar histórico',
                destiny,
                shipmentMethod: trackData.service_name || 'Transportadora Parceira',
                progressPercent,
                stepsConfig: { activeStep, completedSteps },
                history: meHistory
              }
            });
          }
        } catch (meError) {
          logger.warn('[ShippingAPI] Falha ao rastrear código no Melhor Envio:', meError.message);
        }
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

export default router;