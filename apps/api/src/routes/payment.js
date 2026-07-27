import express from 'express';
import Stripe from 'stripe';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blingService } from '../services/blingService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// POST /payment/create-order - Create order and guest user if needed (runs with Admin privileges)
router.post('/create-order', async (req, res) => {
  try {
    // Authenticate as superuser to bypass all API rules and prevent session desync
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const {
      personalInfo,
      billingAddress,
      deliveryAddress,
      isSameAddress,
      paymentMethod,
      shippingCost,
      shippingOption,
      subtotal,
      finalDiscountAmount,
      finalTotal,
      cart,
      userId
    } = req.body;

    if (!personalInfo || !personalInfo.email || !personalInfo.nome) {
      return res.status(400).json({ error: 'Informações pessoais incompletas.' });
    }

    let targetUserId = userId || '';

    // Verify if targetUserId actually exists in the database to prevent relation integrity errors
    if (targetUserId) {
      try {
        await pb.collection('users').getOne(targetUserId, { $autoCancel: false });
        logger.info(`[CreateOrder] userId ${targetUserId} verificado e ativo.`);
      } catch (e) {
        logger.warn(`[CreateOrder] userId ${targetUserId} informado não existe no banco de dados. Resetando para obter/criar por email.`);
        targetUserId = '';
      }
    }

    // 1. Resolve or create user in 'users' collection using Superuser client
    if (!targetUserId) {
      try {
        const existingUsers = await pb.collection('users').getList(1, 1, {
          filter: `email = "${personalInfo.email.replace(/"/g, '\\"')}"`,
          $autoCancel: false
        });

        if (existingUsers.items.length > 0) {
          targetUserId = existingUsers.items[0].id;
          logger.info(`[CreateOrder] Associando pedido ao usuário existente: ${existingUsers.items[0].email}`);
          // Se o usuário já existe mas não possui CPF salvo, salvamos o CPF fornecido na compra
          if (!existingUsers.items[0].cpf && personalInfo.cpf) {
            try {
              await pb.collection('users').update(targetUserId, {
                cpf: personalInfo.cpf
              }, { $autoCancel: false });
              logger.info(`[CreateOrder] CPF do usuário existente atualizado com sucesso.`);
            } catch (errCpf) {
              logger.warn(`[CreateOrder] Erro não-bloqueante ao atualizar CPF do usuário existente: ${errCpf.message}`);
            }
          }
        } else {
          // Auto-create a guest user record
          const tempPassword = Math.random().toString(36).slice(-8) + 'Avl!' + Math.random().toString(36).slice(-4).toUpperCase();
          const newGuestUser = await pb.collection('users').create({
            email: personalInfo.email,
            name: personalInfo.nome,
            whatsapp: personalInfo.whatsapp,
            cpf: personalInfo.cpf || '',
            password: tempPassword,
            passwordConfirm: tempPassword,
            tipo_cliente: 'varejo',
            emailVisibility: true
          }, { $autoCancel: false });
          
          targetUserId = newGuestUser.id;
          logger.info(`[CreateOrder] Novo cliente convidado criado automaticamente: ${newGuestUser.email}`);
        }
      } catch (errUser) {
        logger.error(`[CreateOrder] Erro ao obter/criar usuário convidado: ${errUser.message}`);
        return res.status(500).json({ error: 'Erro ao registrar cliente no banco de dados.' });
      }
    }

    // 2. Generate sequential order number
    let numero_pedido = `PED-${Date.now().toString().slice(-6)}`;
    try {
      const result = await pb.collection('pedidos').getList(1, 1, {
        sort: '-created',
        $autoCancel: false
      });
      
      if (result.items.length > 0) {
        const lastNumber = result.items[0].numero_pedido;
        const match = lastNumber.match(/PED-(\d+)/);
        if (match) {
          const nextNum = parseInt(match[1], 10) + 1;
          numero_pedido = `PED-${nextNum.toString().padStart(3, '0')}`;
        }
      } else {
        numero_pedido = 'PED-001';
      }
    } catch (errNum) {
      logger.warn(`[CreateOrder] Erro ao gerar número sequencial: ${errNum.message}`);
    }

    // 3. Prepare sanitized payload matching production database schema
    const actualDelivery = isSameAddress ? billingAddress : deliveryAddress;
    const formattedAddress = `${actualDelivery.rua}, ${actualDelivery.numero}${actualDelivery.complemento ? ' - ' + actualDelivery.complemento : ''}, ${actualDelivery.bairro}`;

    const orderPayload = {
      numero_pedido,
      cliente_id: targetUserId,
      cliente_nome: personalInfo.nome,
      cliente_email: personalInfo.email,
      cliente_telefone: personalInfo.whatsapp || '',
      cliente_cpf: personalInfo.cpf || '',
      cpf: personalInfo.cpf || '',
      data_pedido: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'pendente',
      valor_total: Number(finalTotal) || 0,
      valor_desconto: Number(finalDiscountAmount) || 0,
      valor_frete: Number(shippingCost) || 0,
      endereco_entrega: formattedAddress,
      cidade: actualDelivery.cidade,
      estado: actualDelivery.estado || '',
      cep: actualDelivery.cep,
      observacoes: '',
      metodo_pagamento: paymentMethod === 'credit_card' ? 'credito' : (paymentMethod === 'pix' ? 'pix' : 'boleto'),
      
      // Items array (itens)
      itens: (cart || []).map(item => ({
        variacao_id: item.variacao_id || item.id,
        quantidade: Number(item.quantity) || 1,
        preco: Number(item.price || item.preco_varejo) || 0,
        preco_unitario: Number(item.price || item.preco_varejo) || 0,
        preco_atacado: Number(item.preco_atacado) || 0,
        tamanho: item.selectedSize || '',
        cor: item.selectedColor || '',
        nome: item.name || item.nome || '',
        sku: item.sku || '',
        image: item.image || item.imagem || '',
        imagem: item.image || item.imagem || ''
      }))
    };

    logger.info(`[CreateOrder] Salvando pedido ${numero_pedido} no PocketBase como superusuário.`);
    const createdOrder = await pb.collection('pedidos').create(orderPayload, { $autoCancel: false });

    // NOVO: Atualizar/reduzir o estoque das variações
    try {
      if (orderPayload.itens && orderPayload.itens.length > 0) {
        for (const item of orderPayload.itens) {
          try {
            const variacao = await pb.collection('variacoes').getOne(item.variacao_id, { $autoCancel: false });
            const novoEstoque = Math.max(0, (parseInt(variacao.estoque) || 0) - (parseInt(item.quantidade) || 1));
            await pb.collection('variacoes').update(item.variacao_id, { estoque: novoEstoque }, { $autoCancel: false });
            logger.info(`[CreateOrder] Estoque da variação ${item.variacao_id} baixado: ${variacao.estoque} -> ${novoEstoque}`);
          } catch (errVar) {
            logger.warn(`[CreateOrder] Erro ao baixar estoque da variação ${item.variacao_id}: ${errVar.message}`);
          }
        }
      }
    } catch (errEstoque) {
      logger.error(`[CreateOrder] Erro geral ao processar baixa de estoque: ${errEstoque.message}`);
    }

    // Update total purchases for the user in the backend as superuser to avoid client-side 404 permissions error
    try {
      const userOrders = await pb.collection('pedidos').getFullList({
        filter: `cliente_id = "${targetUserId}"`,
        $autoCancel: false
      });
      await pb.collection('users').update(targetUserId, {
        total_compras: userOrders.length
      }, { $autoCancel: false });
      logger.info(`[CreateOrder] Total de compras atualizado para o cliente ${targetUserId}: ${userOrders.length}`);
    } catch (errUpdate) {
      logger.warn(`[CreateOrder] Erro ao atualizar total de compras do cliente no backend: ${errUpdate.message}`);
    }
    
    // Return created order record
    res.json(createdOrder);
  } catch (error) {
    logger.error('[CreateOrder] Erro ao processar criação do pedido:', error);
    if (error.response) {
      logger.error('[CreateOrder] PocketBase error details:', JSON.stringify(error.response));
      return res.status(error.status || 400).json({
        error: error.response.message || error.message || 'Erro de validação no banco de dados.',
        details: error.response.data || {}
      });
    }
    res.status(500).json({ error: error.message || 'Erro interno ao criar pedido.' });
  }
});

// POST /payment/create-checkout-session - Create a Stripe checkout session for an order
router.post('/create-checkout-session', async (req, res, next) => {
  try {
    // Authenticate as superuser to bypass all API rules and prevent session desync
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: 'orderId é obrigatório' });
    }

    // 1. Fetch order details from PocketBase (try both collections for safety)
    let order = null;
    try {
      order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
    } catch (err) {
      try {
        order = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
      } catch (err2) {
        logger.error(`[StripePayment] Pedido ${orderId} não encontrado nas coleções.`, err2);
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
    }

    // 2. Fetch Stripe secret key from env or pocketbase database
    let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      const configs = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "stripe" && (chave_nome = "sk_live" || chave_nome = "stripe_sk_live")',
      });
      if (configs.length > 0 && configs[0].chave_valor) {
        stripeSecretKey = configs[0].chave_valor;
      }
    }

    if (!stripeSecretKey) {
      logger.error('[StripePayment] Stripe Secret Key (sk_live) não está configurada.');
      return res.status(400).json({ error: 'Gateway de pagamento Stripe não configurado pelo administrador.' });
    }

    // 3. Initialize Stripe
    const stripe = new Stripe(stripeSecretKey);

    // 4. Determine absolute origin domain of frontend to handle redirections
    const origin = req.headers.origin || 'http://localhost:3000';

    // 5. Create checkout session
    const totalAmountCents = Math.round(order.valor_total * 100);

    // Restrict payment methods dynamically to align with storefront selection and prevent discount exploits
    const orderMethod = order.metodo_pagamento || order.forma_pagamento || 'credit_card';
    
    let paymentMethodTypes = ['card'];
    let paymentMethodOptions = undefined;

    if (orderMethod === 'pix') {
      paymentMethodTypes = ['pix'];
    } else if (orderMethod === 'boleto') {
      let boletoVencimentoDias = 3;
      try {
        const boletoConfigs = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "stripe" && chave_nome = "boleto_vencimento_dias"',
          $autoCancel: false
        });
        if (boletoConfigs.length > 0 && boletoConfigs[0].chave_valor) {
          const val = parseInt(boletoConfigs[0].chave_valor, 10);
          if (!isNaN(val) && val >= 1 && val <= 120) {
            boletoVencimentoDias = val;
          }
        }
      } catch (errBoleto) {
        logger.warn(`[StripePayment] Erro ao carregar vencimento do boleto no banco: ${errBoleto.message}`);
      }

      paymentMethodTypes = ['boleto'];
      paymentMethodOptions = {
        boleto: {
          expires_after_days: boletoVencimentoDias,
        },
      };
    }

    const sessionPayload = {
      payment_method_types: paymentMethodTypes,
      payment_method_options: paymentMethodOptions,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Pedido Avante Lingerie ${order.numero_pedido || ('#' + order.id.slice(-6).toUpperCase())}`,
              description: `Pagamento seguro do seu pedido de moda íntima.`,
            },
            unit_amount: totalAmountCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      client_reference_id: order.id,
      customer_email: order.cliente_email || undefined,
      metadata: {
        orderId: order.id,
      },
      success_url: `${origin}/order-confirmation/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    };

    logger.info(`[StripePayment] Criando sessão checkout Stripe para pedido=${order.id}, total=${order.valor_total} BRL`);
    const session = await stripe.checkout.sessions.create(sessionPayload);

    // 6. Update order with Stripe Checkout Session ID in PocketBase (pedidos or orders)
    const updatePayload = { stripe_session_id: session.id };
    try {
      await pb.collection('pedidos').update(order.id, updatePayload, { $autoCancel: false });
    } catch {
      try {
        await pb.collection('orders').update(order.id, updatePayload, { $autoCancel: false });
      } catch (err3) {
        logger.warn(`[StripePayment] Não foi possível salvar o stripe_session_id no pedido: ${err3.message}`);
      }
    }

    logger.info(`[StripePayment] Sessão checkout criada com sucesso: sessionId=${session.id}`);

    res.json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    logger.error('[StripePayment] Erro ao criar checkout session:', error);
    const errorMessage = error.message || 'Erro interno ao iniciar sessão de pagamento.';
    res.status(500).json({ error: errorMessage });
  }
});

// GET /payment/next-order-number - Generate a unique sequential order number
router.get('/next-order-number', async (req, res) => {
  try {
    // Authenticate as superuser to bypass all API rules and prevent session desync
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const result = await pb.collection('pedidos').getList(1, 1, {
      sort: '-created',
      $autoCancel: false
    });
    
    if (result.items.length === 0) {
      return res.json({ numero_pedido: 'PED-001' });
    }
    
    const lastNumber = result.items[0].numero_pedido;
    const match = lastNumber.match(/PED-(\d+)/);
    if (match) {
      const nextNum = parseInt(match[1], 10) + 1;
      return res.json({ numero_pedido: `PED-${nextNum.toString().padStart(3, '0')}` });
    }
    
    return res.json({ numero_pedido: `PED-${Date.now().toString().slice(-6)}` });
  } catch (error) {
    logger.error('[API NextOrderNumber] Erro ao gerar número:', error);
    return res.json({ numero_pedido: `PED-${Date.now().toString().slice(-6)}` });
  }
});

// GET /payment/debug-info - Diagnose production server rules, logs, and files
router.get('/debug-info', async (req, res) => {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    env: {
      PB_SUPERUSER_EMAIL: process.env.PB_SUPERUSER_EMAIL ? 'configured' : 'missing',
      PB_SUPERUSER_PASSWORD: process.env.PB_SUPERUSER_PASSWORD ? 'configured' : 'missing',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? 'configured' : 'missing',
      NODE_ENV: process.env.NODE_ENV || 'not set',
    },
    hooks_files: [],
    rules: {},
    recent_logs: null,
    error: null
  };

  try {
    // Force superuser authentication to ensure credentials are valid and session is active
    try {
      await pb.collection('_superusers').authWithPassword(
        process.env.PB_SUPERUSER_EMAIL,
        process.env.PB_SUPERUSER_PASSWORD
      );
    } catch (authErr) {
      diagnostics.error = `Authentication failed: ${authErr.message}`;
    }

    // 1. List files in pb_hooks directory
    try {
      const hooksPath = path.resolve(__dirname, '../../../../pocketbase/pb_hooks');
      if (fs.existsSync(hooksPath)) {
        diagnostics.hooks_files = fs.readdirSync(hooksPath);
      } else {
        const altHooksPath = path.resolve(__dirname, '../../../pocketbase/pb_hooks');
        if (fs.existsSync(altHooksPath)) {
          diagnostics.hooks_files = fs.readdirSync(altHooksPath);
        } else {
          diagnostics.hooks_files = [`Directory not found at ${hooksPath} or ${altHooksPath}`];
        }
      }
    } catch (fsErr) {
      diagnostics.hooks_files = [`Error reading hooks: ${fsErr.message}`];
    }

    // 2. Fetch rules for critical collections
    const collectionsToTest = ['pedidos', 'users', 'usuarios'];
    for (const colName of collectionsToTest) {
      try {
        const col = await pb.collections.getOne(colName, { $autoCancel: false });
        diagnostics.rules[colName] = {
          listRule: col.listRule,
          viewRule: col.viewRule,
          createRule: col.createRule,
          updateRule: col.updateRule,
          deleteRule: col.deleteRule,
        };
      } catch (colErr) {
        diagnostics.rules[colName] = { error: colErr.message };
      }
    }

    // 3. Try to fetch PocketBase logs (sorted by newest first)
    try {
      const token = pb.authStore.token;
      const url = `${pb.baseUrl}/api/logs?sort=-created&limit=25`;
      const logRes = await fetch(url, {
        headers: { 'Authorization': token }
      });
      if (logRes.status === 200) {
        const logData = await logRes.json();
        diagnostics.recent_logs = logData.items.map(item => ({
          created: item.created,
          method: item.method,
          url: item.url,
          status: item.status,
          execTime: item.execTime,
          data: item.data
        }));
      } else {
        diagnostics.recent_logs = `HTTP status ${logRes.status}: ${await logRes.text()}`;
      }
    } catch (logErr) {
      diagnostics.recent_logs = `Error fetching logs: ${logErr.message}`;
    }

  } catch (globalErr) {
    diagnostics.error = globalErr.message;
  }

  res.json(diagnostics);
});

// GET /payment/read-hook - Read a hook file from pb_hooks (diagnostics)
router.get('/read-hook', (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const safeName = path.basename(name);
  
  try {
    const hooksPath = path.resolve(__dirname, '../../../../pocketbase/pb_hooks');
    const filePath = path.join(hooksPath, safeName);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return res.type('text/plain').send(content);
    }

    const altHooksPath = path.resolve(__dirname, '../../../pocketbase/pb_hooks');
    const altFilePath = path.join(altHooksPath, safeName);
    if (fs.existsSync(altFilePath)) {
      const content = fs.readFileSync(altFilePath, 'utf8');
      return res.type('text/plain').send(content);
    }

    return res.status(404).json({ error: `File ${safeName} not found` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /payment/test-admin-auth - Test superuser authentication
router.get('/test-admin-auth', async (req, res) => {
  try {
    const authData = await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );
    res.json({
      success: true,
      token: authData.token ? 'acquired' : 'missing',
      identity: authData.record?.email || authData.model?.email || 'unknown'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      status: err.status,
      response: err.response
    });
  }
});

// GET /payment/inspect-pedidos - Inspect real pedidos record fields and collection schema
router.get('/inspect-pedidos', async (req, res) => {
  try {
    // Authenticate as superuser first
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const collections = await pb.collections.getList(1, 1, {
      filter: 'name = "pedidos"',
      $autoCancel: false
    });
    
    if (collections.items.length === 0) {
      return res.status(404).json({ error: "Collection pedidos not found" });
    }
    
    const col = collections.items[0];
    const result = await pb.collection('pedidos').getList(1, 1, { $autoCancel: false });
    
    res.json({
      collection: {
        id: col.id,
        name: col.name,
        fields: col.fields
      },
      result: result.items.length > 0 ? {
        fields: Object.keys(result.items[0]),
        sample: result.items[0]
      } : "No records found"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;