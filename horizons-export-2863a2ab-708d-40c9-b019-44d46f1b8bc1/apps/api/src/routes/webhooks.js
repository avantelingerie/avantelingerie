import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { blingService } from '../services/blingService.js';

const router = express.Router();

// POST /webhooks/bling - Handle Bling webhook events
router.post('/bling', async (req, res) => {
  try {
    const payload = req.body;
    logger.info(`[Webhook Bling] Recebido: ${JSON.stringify(payload)}`);

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

    // 2. Verifica se é um Webhook de Estoque (Bling V3)
    let estoques = payload?.data?.retorno?.estoques || payload?.retorno?.estoques || [];
    if (typeof payload?.data === 'string') {
      try {
        const parsed = JSON.parse(payload.data);
        estoques = parsed?.retorno?.estoques || [];
      } catch (parseErr) {
        logger.debug(`[Webhook Bling] Erro ao fazer parse de payload.data como JSON: ${parseErr.message}`);
      }
    }
    if (estoques.length > 0) {
      for (const est of estoques) {
        const item = est.estoque || est;
        const blingProductId = item.produto?.id || item.idProduto;
        const saldo = item.saldoFisico || item.saldo || item.estoqueAtual;
        logger.info(`[Webhook Bling Estoque] ProdutoID=${blingProductId}, Saldo=${saldo}.`);
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