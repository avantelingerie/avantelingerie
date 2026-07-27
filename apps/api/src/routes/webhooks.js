import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { blingService } from '../services/blingService.js';
import { getBlingToken } from '../utils/blingTokenManager.js';

const router = express.Router();

// POST /webhooks/bling - Handle Bling webhook events
router.post('/bling', async (req, res) => {
  try {
    const payload = req.body;
    logger.info(`[Webhook Bling] Recebido: ${JSON.stringify(payload)}`);

    // === BLOCO DE DIAGNÓSTICO TEMPORÁRIO (CLAUDE & LIA) ===
    try {
      await pb.collection('webhook_logs').create({
        origem: 'bling',
        payload: JSON.stringify(payload),
        headers: JSON.stringify(req.headers || {}),
      }, { $autoCancel: false });
    } catch (logErr) {
      logger.error(`[Webhook Bling] Falha ao salvar log de diagnóstico: ${logErr.message}`);
    }
    // === FIM DO BLOCO DE DIAGNÓSTICO ===

    // 1. Verifica se é um Webhook de Atualização de Status de Pedido / DANFE (Formato Antigo/Customizado)
    const { numero_pedido, danfe_url, codigo_rastreio } = payload;
    if (numero_pedido) {
      const pedidos = await pb.collection('pedidos').getFullList({ filter: `numero_pedido = "${numero_pedido}"` });
      if (pedidos.length > 0) {
        const pedido = pedidos[0];
        const updateData = {};
        if (danfe_url) updateData.danfe_url = danfe_url;
        if (codigo_rastreio) {
          updateData.codigo_rastreio = codigo_rastreio;
          updateData.status = 'enviado';
          const novoHistorico = pedido.historico_status || [];
          novoHistorico.push({ status: 'enviado', timestamp: new Date().toISOString() });
          updateData.historico_status = novoHistorico;
        }
        await pb.collection('pedidos').update(pedido.id, updateData);
        logger.info(`Webhook Bling (Pedido) processado: numero_pedido=${numero_pedido}`);
        return res.json({ sucesso: true, mensagem: 'Webhook Bling de Pedido processado' });
      }
    }

    // 1.5 Verifica se é um Webhook de Situação de Pedido Alterada (Bling V3 - Cancelamento)
    const pData = payload?.data || payload;
    let situacaoData = pData;
    if (typeof situacaoData === 'string') {
      try { situacaoData = JSON.parse(situacaoData); } catch (e) { /* ignore */ }
    }
    if (situacaoData && !Array.isArray(situacaoData) && situacaoData.situacao?.id && situacaoData.id) {
      const blingOrderId = String(situacaoData.id);
      const numeroLoja = situacaoData.numeroLoja || situacaoData.numero;
      
      // Chama a API do Bling para descobrir o status real do pedido (fallback duplo)
      let isCancelado = false;
      const sId = String(situacaoData.situacao.id);
      
      // O raio-x do webhook nos provou que o Cancelado vem com ID 12 e Valor 2.
      if (sId === '12' || sId === '15' || sId === '24') {
        isCancelado = true;
      } else {
        try {
          const token = await getBlingToken();
          const orderRes = await axios.get(`https://api.bling.com.br/Api/v3/pedidos/vendas/${blingOrderId}`, {
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
          });
          
          const situacaoObj = orderRes.data?.data?.situacao || {};
          const nomeSituacao = String(situacaoObj.valor || situacaoObj.nome || situacaoObj.descricao || '').toLowerCase();
          
          if (nomeSituacao.includes('cancelad') || nomeSituacao.includes('devolvid') || nomeSituacao.includes('estornad')) {
            isCancelado = true;
          } else {
            return res.json({ sucesso: true, mensagem: `Status ignorado: ${nomeSituacao} (ID: ${sId})` });
          }
        } catch (err) {
          logger.error(`[Webhook Bling Cancelamento] Erro API: ${err.message}`);
          return res.json({ sucesso: true, mensagem: `Ignorado: ID ${sId} não é de cancelamento padrão e API falhou` });
        }
      }

      if (isCancelado) {
        
        let records = [];
        try {
          // 1. Tenta buscar a compra pela nova coluna oficial que a Horizons criou
          records = await pb.collection('pedidos').getFullList({ filter: `bling_pedido_id = "${blingOrderId}"`, $autoCancel: false });
          
          // 2. Fallback de segurança: se não achar, busca pelo numero original da loja
          if (records.length === 0 && numeroLoja) {
             records = await pb.collection('pedidos').getFullList({ filter: `numero_pedido = "${numeroLoja}"`, $autoCancel: false });
          }
        } catch (e) {
          logger.error(`[Webhook Bling Cancelamento] Erro ao buscar pedido: ${e.message}`);
        }

        if (records.length > 0) {
          const pedidoLocal = records[0];
          
          if (pedidoLocal.status !== 'cancelado') {
            await pb.collection('pedidos').update(pedidoLocal.id, { status: 'cancelado' }, { $autoCancel: false });
            
            let itens = pedidoLocal.itens;
            if (typeof itens === 'string') {
               try { itens = JSON.parse(itens); } catch (e) {}
            }
            if (itens && Array.isArray(itens)) {
              for (const item of itens) {
                let variacao;
                try {
                  if (item.variacao_id) {
                    variacao = await pb.collection('variacoes').getOne(item.variacao_id, { $autoCancel: false });
                  } else if (item.sku) {
                    const varRecords = await pb.collection('variacoes').getFullList({ filter: `sku = "${item.sku}"`, $autoCancel: false });
                    if (varRecords.length > 0) variacao = varRecords[0];
                  }
                } catch (e) {}
                
                if (variacao) {
                  const novoEstoque = (parseInt(variacao.estoque) || 0) + (parseInt(item.quantidade) || 1);
                  await pb.collection('variacoes').update(variacao.id, { estoque: novoEstoque }, { $autoCancel: false });
                  
                  await pb.collection('movimentacoes_estoque').create({
                    variacao_id: variacao.id,
                    sku: variacao.sku,
                    tipo: 'entrada',
                    quantidade: (parseInt(item.quantidade) || 1),
                    motivo: 'Sincronização automática via Webhook do Bling (Cancelamento)',
                    origem: 'bling'
                  }, { $autoCancel: false });
                  
                  logger.info(`[Webhook Bling Cancelamento] Estoque devolvido para variação ${variacao.sku}: ${variacao.estoque} -> ${novoEstoque}`);
                }
              }
            }
            logger.info(`Webhook Bling (Cancelamento) processado para o pedido Bling #${blingOrderId} (Local: ${pedidoLocal.id})`);
          }
          return res.json({ sucesso: true, mensagem: 'Webhook Bling de Cancelamento processado' });
        } else {
          logger.warn(`[Webhook Bling Cancelamento] Pedido Bling #${blingOrderId} (Loja #${numeroLoja}) não encontrado no banco local. Ignorando.`);
          return res.json({ sucesso: true, mensagem: 'Ignorado: Pedido não encontrado no banco local' });
        }
      }
    }

    // 2. Verifica se é um Webhook de Estoque (Bling V3)
    let estoques = [];
    if (payload?.data) {
      let parsedData = payload.data;
      if (typeof payload.data === 'string') {
        try { parsedData = JSON.parse(payload.data); } catch(e) { logger.debug(`[Webhook Bling] Erro parse: ${e.message}`); }
      }
      if (Array.isArray(parsedData)) estoques = parsedData;
      else if (parsedData?.retorno?.estoques) estoques = parsedData.retorno.estoques;
      else if (parsedData?.codigo && parsedData?.saldoFisico !== undefined) estoques = [parsedData];
    } else if (payload?.retorno?.estoques) {
      estoques = payload.retorno.estoques;
    } else if (Array.isArray(payload)) {
      estoques = payload;
    } else if (payload?.codigo && payload?.saldoFisico !== undefined) {
      estoques = [payload];
    }
    if (estoques.length > 0) {
      for (const est of estoques) {
        const item = est.estoque || est;
        const blingProductId = item.produto?.id || item.idProduto;
        const sku = item.codigo || item.sku;
        const saldo = item.saldoFisico !== undefined ? item.saldoFisico : (item.saldo !== undefined ? item.saldo : item.estoqueAtual);
        logger.info(`[Webhook Bling Estoque] ProdutoID=${blingProductId}, SKU=${sku}, Saldo=${saldo}.`);
        
        if (sku && saldo !== undefined) {
          try {
            const records = await pb.collection('variacoes').getFullList({ filter: `sku = "${sku}"`, $autoCancel: false });
            if (records.length > 0) {
              const variacao = records[0];
              const qtd_anterior = variacao.estoque || 0;
              const novoSaldo = parseInt(saldo);
              
              if (qtd_anterior !== novoSaldo) {
                await pb.collection('variacoes').update(variacao.id, { estoque: novoSaldo }, { $autoCancel: false });
                
                // Registrar histórico da movimentação
                const tipoMov = novoSaldo > qtd_anterior ? 'entrada' : 'saida';
                const diff = Math.abs(novoSaldo - qtd_anterior);
                await pb.collection('movimentacoes_estoque').create({
                  variacao_id: variacao.id,
                  sku: sku,
                  tipo: tipoMov,
                  quantidade: diff,
                  motivo: 'Sincronização automática via Webhook do Bling (Espelho ERP)',
                  origem: 'bling'
                }, { $autoCancel: false });
                
                logger.info(`[Webhook Bling Estoque] Variação ${sku} espelhada com sucesso: ${qtd_anterior} -> ${novoSaldo}`);
              }
            } else {
              logger.warn(`[Webhook Bling Estoque] SKU ${sku} não encontrado na base local para espelhamento.`);
            }
          } catch (err) {
            logger.error(`[Webhook Bling Estoque] Erro ao espelhar estoque do SKU ${sku}: ${err.message}`);
          }
        }
      }
      return res.status(200).send('OK');
    }

    // 3. Verifica se é um Webhook de Produto (Bling V3)
    let produtos = payload?.data?.retorno?.produtos || payload?.retorno?.produtos || [];
    if (typeof payload?.data === 'string') {
      try {
        const parsed = JSON.parse(payload.data);
        produtos = parsed?.retorno?.produtos || [];
      } catch (parseErr) {
        logger.debug(`[Webhook Bling] Erro ao fazer parse de payload.data como JSON: ${parseErr.message}`);
      }
    }
    if (produtos.length > 0) {
      logger.info(`[Webhook Bling Produto] Detectado cadastro/atualização de produto.`);
      return res.status(200).send('OK');
    }

    // Retorno padrão caso não seja nenhum dos formatos conhecidos
    return res.status(200).send('OK');
  } catch (error) {
    logger.error(`[Webhook Bling] Erro ao processar: ${error.message}`);
    return res.status(500).send('Erro interno');
  }
});

// (Rotas antigas removidas pois foram unificadas na rota /bling principal acima)

// POST /webhooks/stripe - Handle Stripe webhook events
router.post('/stripe', async (req, res) => {
  let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    try {
      const configs = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "stripe" && (chave_nome = "webhook_secret" || chave_nome = "stripe_webhook_secret")',
        $autoCancel: false
      });
      if (configs.length > 0 && configs[0].chave_valor) {
        endpointSecret = configs[0].chave_valor;
      }
    } catch (err) {
      logger.error('[StripeWebhook] Erro ao buscar webhook_secret no PocketBase:', err.message);
    }
  }

  let event = req.body;

  if (endpointSecret) {
    const sig = req.headers['stripe-signature'];
    try {
      let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeSecretKey) {
        const configs = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "stripe" && (chave_nome = "sk_live" || chave_nome = "stripe_sk_live")',
          $autoCancel: false
        });
        if (configs.length > 0 && configs[0].chave_valor) {
          stripeSecretKey = configs[0].chave_valor;
        }
      }
      if (stripeSecretKey) {
        const stripe = new Stripe(stripeSecretKey);
        event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      }
    } catch (err) {
      logger.error(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    logger.warn('Stripe webhook received but webhook_secret is not configured. Signature verification bypassed.');
  }

  // Handle Stripe events
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId || session.client_reference_id;

    if (orderId) {
      logger.info(`[StripeWebhook] Processando pagamento aprovado para pedidoId=${orderId}`);

      let pedido = null;
      let collectionName = 'pedidos';

      try {
        pedido = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
      } catch (err1) {
        try {
          pedido = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
          collectionName = 'orders';
        } catch (err2) {
          logger.error(`[StripeWebhook] Pedido ${orderId} não encontrado em pedidos ou orders.`);
        }
      }

      if (pedido) {
        const updateData = {
          status: 'confirmado',
        };

        const novoHistorico = pedido.historico_status || [];
        if (!novoHistorico.some(h => h.status === 'confirmado')) {
          novoHistorico.push({
            status: 'confirmado',
            timestamp: new Date().toISOString(),
            detalhes: 'Pagamento aprovado via Stripe (Checkout)',
          });
          updateData.historico_status = novoHistorico;
        }

        await pb.collection(collectionName).update(pedido.id, updateData, { $autoCancel: false });
        logger.info(`[StripeWebhook] Status do pedido #${pedido.id} atualizado para 'confirmado' com sucesso.`);

        // NOVO: Baixar estoque das variações no PocketBase
        try {
          let itens = pedido.itens;
          if (typeof itens === 'string') {
            itens = JSON.parse(itens);
          }
          if (itens && Array.isArray(itens)) {
            for (const item of itens) {
              let variacao;
              try {
                if (item.variacao_id) {
                  variacao = await pb.collection('variacoes').getOne(item.variacao_id, { $autoCancel: false });
                } else if (item.sku) {
                  const records = await pb.collection('variacoes').getFullList({ filter: `sku = "${item.sku}"`, $autoCancel: false });
                  if (records.length > 0) variacao = records[0];
                }
              } catch (e) {
                // Ignora erro e cai na validação abaixo
              }
              if (!variacao) {
                logger.warn(`[StripeWebhook] Variação ${item.variacao_id || item.sku || 'Desconhecida'} não encontrada. Ignorando baixa.`);
                continue;
              }
              const novoEstoque = Math.max(0, (parseInt(variacao.estoque) || 0) - (parseInt(item.quantidade) || 1));
              await pb.collection('variacoes').update(variacao.id, { estoque: novoEstoque }, { $autoCancel: false });
              logger.info(`[StripeWebhook] Estoque baixado para variação ${variacao.id}: ${variacao.estoque} -> ${novoEstoque}`);
            }
          }
        } catch (errEstoque) {
          logger.error(`[StripeWebhook] Erro geral ao processar baixa de estoque no Stripe: ${errEstoque.message}`);
        }

        // Envia automaticamente para o Bling
        try {
          // O blingService.sendPedidoToBling vai lidar com o mapeamento e tratamento de erros internamente
          await blingService.sendPedidoToBling(pedido);
          logger.info(`[StripeWebhook] Pedido #${pedido.id} enviado para o Bling com sucesso automaticamente.`);
        } catch (blingErr) {
          logger.error(`[StripeWebhook] Erro ao enviar pedido #${pedido.id} para o Bling: ${blingErr.message}`);
        }
      }
    } else {
      logger.warn('[StripeWebhook] Nenhuma orderId encontrada nos metadados do session.');
    }
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId || session.client_reference_id;

    if (orderId) {
      logger.info(`[StripeWebhook] Processando expiração da sessão de checkout para pedidoId=${orderId}`);

      let pedido = null;
      let collectionName = 'pedidos';

      try {
        pedido = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
      } catch (err1) {
        try {
          pedido = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
          collectionName = 'orders';
        } catch (err2) {
          logger.error(`[StripeWebhook] Pedido ${orderId} não encontrado em pedidos ou orders.`);
        }
      }

      if (pedido) {
        const updateData = {
          status: 'cancelado',
        };

        const novoHistorico = pedido.historico_status || [];
        if (!novoHistorico.some(h => h.status === 'cancelado')) {
          novoHistorico.push({
            status: 'cancelado',
            timestamp: new Date().toISOString(),
            detalhes: 'Pedido cancelado por expiração da sessão de pagamento na Stripe.',
          });
          updateData.historico_status = novoHistorico;
        }

        await pb.collection(collectionName).update(pedido.id, updateData, { $autoCancel: false });
        logger.info(`[StripeWebhook] Status do pedido #${pedido.id} atualizado para 'cancelado' por expiração com sucesso.`);

        // NOVO: Devolver estoque das variações
        try {
          let itens = pedido.itens;
          if (typeof itens === 'string') {
            try { itens = JSON.parse(itens); } catch (e) { itens = []; }
          }
          if (itens && Array.isArray(itens)) {
            for (const item of itens) {
              if (!item.variacao_id) continue;
              try {
                const variacao = await pb.collection('variacoes').getOne(item.variacao_id, { $autoCancel: false });
                const novoEstoque = (parseInt(variacao.estoque) || 0) + (parseInt(item.quantidade) || 1);
                await pb.collection('variacoes').update(item.variacao_id, { estoque: novoEstoque }, { $autoCancel: false });
                logger.info(`[StripeWebhook] Estoque devolvido para variação ${item.variacao_id}: ${variacao.estoque} -> ${novoEstoque}`);
              } catch (errVar) {
                logger.warn(`[StripeWebhook] Erro ao devolver estoque da variação ${item.variacao_id}: ${errVar.message}`);
              }
            }
          }
        } catch (errEstoque) {
          logger.error(`[StripeWebhook] Erro geral ao processar retorno de estoque: ${errEstoque.message}`);
        }
      }
    } else {
      logger.warn('[StripeWebhook] Nenhuma orderId encontrada nos metadados do session de expiração.');
    }
  }

  res.json({
    message: 'Stripe webhook processed',
  });
});

// POST /webhooks/melhorenvio - Handle Melhor Envio webhook events
router.post('/melhorenvio', async (req, res) => {
  // Placeholder for Melhor Envio webhook implementation
  logger.info('Webhook Melhor Envio recebido');

  res.json({
    message: 'Melhor Envio webhook received',
  });
});

export default router;