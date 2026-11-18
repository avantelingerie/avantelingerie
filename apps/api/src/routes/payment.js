import express from 'express';
import Stripe from 'stripe';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { blingService } from '../services/blingService.js';
import { notificationService } from '../services/notificationService.js';
import { mercadoPagoService } from '../services/mercadoPagoService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Cache em memória de alta performance para entrega instantânea de dados de PIX e Boleto
const paymentDataCache = new Map();

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

    // Regra Inegociável: O pedido deve conter pelo menos 1 peça física de lingerie (mimos não podem ser comprados avulsos)
    const physicalItems = (cart || []).filter(item => !item.is_digital && !item.is_mimo && !item.is_combo_item);
    if (physicalItems.length === 0) {
      return res.status(400).json({ error: 'O pedido deve conter pelo menos 1 peça física de lingerie.' });
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

    const isAtacadoOrder = req.body.tipo_pedido === 'atacado' || (cart || []).some(i => i.is_atacado) || (Number(finalTotal) >= 69.90 && (cart || []).some(i => Number(i.preco_atacado) > 0));

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
          const userUpdates = {};
          if (!existingUsers.items[0].cpf && personalInfo.cpf) {
            userUpdates.cpf = personalInfo.cpf;
          }
          if (isAtacadoOrder) {
            userUpdates.tipo_cliente = 'revendedor';
            userUpdates.commercial_profile = 'reseller';
            userUpdates.account_level = 'verified';
          }
          if (Object.keys(userUpdates).length > 0) {
            try {
              await pb.collection('users').update(targetUserId, userUpdates, { $autoCancel: false });
              logger.info(`[CreateOrder] Usuário ${targetUserId} atualizado com sucesso (Atacado: ${isAtacadoOrder}).`);
            } catch (errUp) {
              logger.warn(`[CreateOrder] Erro não-bloqueante ao atualizar usuário existente: ${errUp.message}`);
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
            tipo_cliente: isAtacadoOrder ? 'revendedor' : 'varejo',
            commercial_profile: isAtacadoOrder ? 'reseller' : 'retail',
            account_level: isAtacadoOrder ? 'verified' : 'basic',
            emailVisibility: true
          }, { $autoCancel: false });
          
          targetUserId = newGuestUser.id;
          logger.info(`[CreateOrder] Novo cliente criado automaticamente: ${newGuestUser.email} (Atacado: ${isAtacadoOrder})`);
        }
      } catch (errUser) {
        logger.error(`[CreateOrder] Erro ao obter/criar usuário convidado: ${errUser.message}`);
        return res.status(500).json({ error: 'Erro ao registrar cliente no banco de dados.' });
      }
    } else if (isAtacadoOrder) {
      try {
        await pb.collection('users').update(targetUserId, {
          tipo_cliente: 'revendedor',
          commercial_profile: 'reseller',
          account_level: 'verified'
        }, { $autoCancel: false });
      } catch (errUp) {}
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

    const cupomDesconto = (req.body.cupom_desconto || req.body.appliedCoupon?.code || '').trim().toUpperCase();

    let verifiedDiscount = Number(finalDiscountAmount) || 0;
    let verifiedTotal = Number(finalTotal) || 0;

    // Blindagem de Servidor: Revalidação estrita do cupom AVANTELIA10
    if (cupomDesconto === 'AVANTELIA10') {
      // 1. Bloqueio de Atacado/Revenda
      let isReseller = false;
      if (targetUserId) {
        try {
          const uRec = await pb.collection('users').getOne(targetUserId, { $autoCancel: false });
          if (uRec.tipo_cliente === 'revendedor' || uRec.tipo_cliente === 'reseller') isReseller = true;
        } catch (e) {}
      }
      if (isReseller) {
        return res.status(400).json({ error: 'O cupom de boas-vindas é exclusivo para clientes do Varejo.' });
      }

      // 2. Recálculo soberano do subtotal diretamente dos itens do carrinho
      const computedSubtotal = (cart || []).reduce((acc, item) => {
        const qty = Number(item.quantity) || 1;
        const price = Number(item.price || item.preco_varejo) || 0;
        return acc + (price * qty);
      }, 0);

      if (computedSubtotal < 59.90) {
        return res.status(400).json({ error: 'O cupom AVANTELIA10 exige pedido mínimo de R$ 59,90 em produtos.' });
      }

      // 3. Verificação de unicidade por CPF no banco de dados PocketBase
      const cleanCpf = (personalInfo.cpf || '').replace(/\D/g, '');
      if (cleanCpf && cleanCpf.length >= 11) {
        let alreadyUsed = false;
        try {
          const pOrders = await pb.collection('pedidos').getList(1, 1, {
            filter: `(cpf ~ "${cleanCpf}" || cliente_cpf ~ "${cleanCpf}") && observacoes ~ "AVANTELIA10"`,
            $autoCancel: false
          });
          if (pOrders.totalItems > 0) alreadyUsed = true;
        } catch (e) {}

        if (!alreadyUsed && targetUserId) {
          try {
            const uList = await pb.collection('uso_cupons').getList(1, 1, {
              filter: `cliente_id = "${targetUserId}"`,
              $autoCancel: false
            });
            if (uList.totalItems > 0) alreadyUsed = true;
          } catch (e) {}
        }

        if (alreadyUsed) {
          return res.status(400).json({ error: 'Atenção: Este cupom de boas-vindas já foi utilizado anteriormente para este CPF.' });
        }
      }

      // 4. Regra de Ouro Anticumulação: Estritamente 10% no subtotal, NUNCA somado a PIX 5% ou progressivo
      verifiedDiscount = Math.round(computedSubtotal * 0.10 * 100) / 100;
      verifiedTotal = Math.max(0, Math.round((computedSubtotal - verifiedDiscount + Number(shippingCost || 0)) * 100) / 100);
    }

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
      valor_total: Number(verifiedTotal) || 0,
      valor_desconto: Number(verifiedDiscount) || 0,
      valor_frete: Number(shippingCost) || 0,
      transportadora: req.body.shippingOption?.company || 'Melhor Envio',
      forma_envio: req.body.shippingOption?.method || req.body.shippingOption?.name || 'Entrega Regular',
      prazo_envio: req.body.shippingOption?.deliveryTime || (req.body.shippingOption?.delivery_time ? `${req.body.shippingOption.delivery_time} dias úteis` : '5 dias úteis'),
      servico_frete_id: String(req.body.shippingOption?.id || ''),
      endereco_entrega: formattedAddress,
      cidade: actualDelivery.cidade,
      estado: actualDelivery.estado || '',
      cep: actualDelivery.cep,
      observacoes: [
        isAtacadoOrder ? '[🏷️ PEDIDO ATACADO DIRETO DA FÁBRICA - MÍNIMO R$ 69,90 ATENDIDO]' : '',
        (cart || []).some(item => Boolean(item.is_encomenda)) ? '[🧵 PEDIDO SOB ENCOMENDA - CONFECÇÃO: 5 DIAS ÚTEIS]' : '',
        cupomDesconto ? `[CUPOM: ${cupomDesconto} - DESCONTO R$ ${Number(verifiedDiscount).toFixed(2)}]` : '',
        req.body.brinde_vip ? `[🎁 BRINDE VIP: ${req.body.brinde_vip}]` : ''
      ].filter(Boolean).join(' | '),
      metodo_pagamento: paymentMethod === 'credit_card' ? 'credito' : (paymentMethod === 'pix' ? 'pix' : 'boleto'),
      
      // Items array (itens)
      itens: (cart || []).map((item, index) => {
        const itemPreco = Number(item.price || item.preco_varejo) || 0;
        const isGiftOrDigital = Boolean(item.is_mimo || item.is_digital);
        // Blindagem contra instâncias do PocketBase que ainda executam hook legado exigindo preco >= 0.01:
        // Brindes VIP gratuitos recebem preco: 0.01 para aprovação estrita no hook, enquanto preco_unitario
        // preserva 0.00 para integridade de relatórios e faturamento. O valor_total do pedido não é alterado.
        const safePreco = (isGiftOrDigital && itemPreco <= 0) ? 0.01 : itemPreco;

        return {
          variacao_id: String(item.variacao_id || item.id || `item-var-${index}`),
          quantidade: Number(item.quantity) || 1,
          preco: safePreco,
          preco_unitario: itemPreco,
          preco_atacado: Number(item.preco_atacado) || 0,
          is_atacado: Boolean(item.is_atacado || isAtacadoOrder),
          is_mimo: Boolean(item.is_mimo),
          is_digital: Boolean(item.is_digital),
          is_combo_item: Boolean(item.is_combo_item),
          tamanho: item.selectedSize || '',
          cor: item.selectedColor || '',
          nome: item.name || item.nome || '',
          sku: item.sku || '',
          image: item.image || item.imagem || '',
          imagem: item.image || item.imagem || '',
          is_encomenda: Boolean(item.is_encomenda),
          dias_producao: item.dias_producao || (item.is_encomenda ? 5 : 0)
        };
      })
    };

    logger.info(`[CreateOrder] Salvando pedido ${numero_pedido} no PocketBase como superusuário.`);
    const createdOrder = await pb.collection('pedidos').create(orderPayload, { $autoCancel: false });

    // NOVO: Registro do uso do cupom no banco de dados PocketBase (uso_cupons)
    if (cupomDesconto) {
      try {
        let cupomId = '';
        try {
          const cList = await pb.collection('cupons').getList(1, 1, { filter: `codigo = "${cupomDesconto}"`, $autoCancel: false });
          if (cList.items.length > 0) cupomId = cList.items[0].id;
        } catch (eC) {}

        await pb.collection('uso_cupons').create({
          cupom_id: cupomId || '',
          pedido_id: createdOrder.id,
          cliente_id: targetUserId || '',
          valor_desconto: Number(verifiedDiscount) || 0,
          usado_em: new Date().toISOString()
        }, { $autoCancel: false });
        logger.info(`[CreateOrder] Uso do cupom ${cupomDesconto} registrado com sucesso para o pedido ${numero_pedido}.`);
      } catch (errUso) {
        logger.warn(`[CreateOrder] Aviso ao registrar uso_cupons: ${errUso.message}`);
      }
    }

    // NOVO: Disparo de notificação de pedido criado (Pendente)
    notificationService.sendOrderStatusNotification(createdOrder, 'pendente').catch(err => {
      logger.error(`[CreateOrder] Erro ao enviar notificação de pedido criado: ${err.message}`);
    });

    // BLINDAGEM BLING: O pedido só é sincronizado com o ERP Bling após a confirmação do pagamento (status 'confirmado' ou 'pago').
    // Pedidos pendentes NÃO são enviados ao Bling para evitar pedidos de venda abertos/abandonados sem pagamento.
    logger.info(`[CreateOrder] Pedido ${numero_pedido} registrado como PENDENTE. O envio ao Bling aguardará a aprovação do pagamento.`);

    // NOVO: Atualizar/reduzir o estoque das variações (com bypass para encomendas e brindes digitais)
    try {
      if (orderPayload.itens && orderPayload.itens.length > 0) {
        for (const item of orderPayload.itens) {
          if (item.is_encomenda || item.is_mimo || item.is_digital) {
            logger.info(`[CreateOrder] Item ${item.nome} (${item.variacao_id}) é encomenda ou brinde digital. Pulando redução de estoque físico.`);
            continue;
          }
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

    // 2. Check Mercado Pago as Primary Brazilian Gateway
    const origin = req.headers.origin || process.env.PUBLIC_WEB_URL || 'http://localhost:3000';
    const mpCreds = await mercadoPagoService.getCredentials();

    if (mpCreds.isConfigured && mpCreds.isActive) {
      try {
        const preference = await mercadoPagoService.createPreference(order, origin);

        // Update order with Mercado Pago Preference ID
        try {
          await pb.collection('pedidos').update(order.id, {
            mercadopago_preference_id: preference.id,
          }, { $autoCancel: false });
        } catch {
          try {
            await pb.collection('orders').update(order.id, {
              mercadopago_preference_id: preference.id,
            }, { $autoCancel: false });
          } catch {
            // non-blocking
          }
        }

        logger.info(`[CreateCheckoutSession] Sessão criada via Mercado Pago: ID=${preference.id}`);
        return res.json({
          id: preference.id,
          url: preference.init_point,
          gateway: 'mercadopago',
        });
      } catch (mpErr) {
        logger.error(`[CreateCheckoutSession] Falha ao criar preferência no Mercado Pago: ${mpErr.message}. Executando fallback para Stripe.`);
      }
    }

    // 3. Fallback: Stripe Payment Gateway
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

    // 4. Create checkout session (Stripe)
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

// POST /payment/validate-coupon - Validação cirúrgica de cupom por CPF e regras de negócio
router.post('/validate-coupon', async (req, res) => {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const { codigo, cpf, subtotal, tipo_cliente } = req.body;

    if (!codigo || typeof codigo !== 'string') {
      return res.status(400).json({ valid: false, message: 'Por favor, informe o código do cupom.' });
    }

    const sanitizedCode = codigo.trim().toUpperCase();

    // 1. Validar nome do cupom oficial
    if (sanitizedCode !== 'AVANTELIA10') {
      return res.status(400).json({ valid: false, message: 'Cupom inválido ou não encontrado.' });
    }

    // 2. Validar tipo de cliente (exclusivo para Varejo)
    if (tipo_cliente === 'revendedor' || tipo_cliente === 'reseller') {
      return res.status(400).json({
        valid: false,
        message: 'O cupom de boas-vindas é exclusivo para compras no Varejo. Sua conta já possui Tabela de Revenda de Fábrica.'
      });
    }

    // 3. Validar piso mínimo aprovado (R$ 59,90)
    const numSubtotal = Number(subtotal) || 0;
    if (numSubtotal < 59.90) {
      return res.status(400).json({
        valid: false,
        message: 'Este cupom é exclusivo para pedidos a partir de R$ 59,90 no Varejo.'
      });
    }

    // 4. Validar se o CPF foi informado
    const cleanCpf = (cpf || '').replace(/\D/g, '');
    if (cleanCpf.length < 11) {
      return res.status(400).json({
        valid: false,
        message: 'Por favor, preencha o seu CPF nos dados pessoais para validar o cupom.'
      });
    }

    // 5. Validar unicidade de uso por CPF no banco de dados
    try {
      // Checagem em pedidos confirmados/processando ou observações
      const existingOrders = await pb.collection('pedidos').getList(1, 1, {
        filter: `(cpf = "${cleanCpf}" || cliente_cpf = "${cleanCpf}") && observacoes ~ "${sanitizedCode}" && status != "cancelado"`,
        $autoCancel: false
      });

      if (existingOrders.items.length > 0) {
        return res.status(400).json({
          valid: false,
          message: 'Atenção: Este cupom de boas-vindas já foi utilizado anteriormente para este CPF.'
        });
      }

      // Checagem adicional na coleção uso_cupons caso o cliente tenha registro lá
      const existingUsos = await pb.collection('uso_cupons').getList(1, 1, {
        filter: `pedido_id.cpf = "${cleanCpf}" || cliente_id.cpf = "${cleanCpf}"`,
        $autoCancel: false
      });

      if (existingUsos.items.length > 0) {
        return res.status(400).json({
          valid: false,
          message: 'Atenção: Este cupom de boas-vindas já foi utilizado anteriormente para este CPF.'
        });
      }
    } catch (errCheck) {
      logger.warn(`[ValidateCoupon] Aviso na consulta de unicidade: ${errCheck.message}`);
    }

    // 6. Retorno de aprovação (10% de desconto no subtotal das peças)
    const discountPercent = 10;
    const discountAmount = Number((numSubtotal * 0.10).toFixed(2));

    return res.json({
      valid: true,
      code: 'AVANTELIA10',
      discountPercent,
      discountAmount,
      message: 'Cupom AVANTELIA10 aplicado com sucesso! 10% OFF garantido.'
    });
  } catch (err) {
    logger.error(`[ValidateCoupon] Erro ao validar cupom: ${err.message}`);
    return res.status(500).json({ valid: false, message: 'Erro interno ao validar cupom. Tente novamente.' });
  }
});

// ============================================================================
// CHECKOUT TRANSPARENTE MERCADO PAGO (PIX, CARTÃO, BOLETO & STATUS)
// ============================================================================

/**
 * Helper para efeitos colaterais pós-aprovação imediata de pagamento (BFF/Síncrono).
 * Executado de forma desacoplada e segura.
 */
async function executeOrderApprovalSideEffects(pedido) {
  const correlationId = `APPROVE-${Date.now()}`;
  logger.info(`[PaymentApproved][${correlationId}] Disparando efeitos colaterais para pedido ${pedido.numero_pedido || pedido.id}`);

  // 1. Baixa de estoque físico das peças pronta-entrega
  try {
    const rawItems = pedido.itens || pedido.items || [];
    for (const item of rawItems) {
      if (item.is_digital || item.is_mimo || item.is_encomenda) continue;
      const varId = item.variacao_id;
      if (varId) {
        try {
          const variacao = await pb.collection('variacoes').getOne(varId, { $autoCancel: false });
          const novoEstoque = Math.max(0, (parseInt(variacao.estoque, 10) || 0) - (parseInt(item.quantidade, 10) || 1));
          await pb.collection('variacoes').update(varId, { estoque: novoEstoque }, { $autoCancel: false });
          logger.info(`[PaymentApproved][${correlationId}] Variação ${varId} atualizada: ${variacao.estoque} -> ${novoEstoque}`);
        } catch (errVar) {
          logger.warn(`[PaymentApproved][${correlationId}] Falha ao baixar variação ${varId}: ${errVar.message}`);
        }
      }
    }
  } catch (errEstoque) {
    logger.error(`[PaymentApproved][${correlationId}] Erro ao baixar estoque: ${errEstoque.message}`);
  }

  // 2. Notificação instantânea via WhatsApp (Lia) e e-mail transacional
  try {
    await notificationService.sendOrderStatusNotification(pedido, 'confirmado');
    logger.info(`[PaymentApproved][${correlationId}] Notificação de confirmação despachada.`);
  } catch (errNotif) {
    logger.warn(`[PaymentApproved][${correlationId}] Falha não-bloqueante na notificação: ${errNotif.message}`);
  }

  // 3. Sincronização oficial com Bling ERP
  try {
    await blingService.sincronizarPedido(pedido);
    logger.info(`[PaymentApproved][${correlationId}] Pedido sincronizado com Bling ERP com sucesso.`);
  } catch (errBling) {
    logger.warn(`[PaymentApproved][${correlationId}] Falha não-bloqueante no Bling ERP: ${errBling.message}`);
  }

  // 4. Promoção Automática B2B (Revendedora VIP - Tag Laranja) se atacado ou >= R$ 69,90
  try {
    const isAtacado = (pedido.observacoes && pedido.observacoes.includes('ATACADO')) ||
      (pedido.tipo_pedido === 'atacado') ||
      (Number(pedido.valor_total) >= 69.90 && pedido.cliente_id);

    if (isAtacado && pedido.cliente_id) {
      await pb.collection('users').update(pedido.cliente_id, {
        tipo_cliente: 'revendedor',
        commercial_profile: 'reseller',
        account_level: 'verified',
      }, { $autoCancel: false });
      logger.info(`[PaymentApproved][${correlationId}] Cliente ${pedido.cliente_id} promovido a Revendedora VIP.`);
    }
  } catch (errPromo) {
    logger.warn(`[PaymentApproved][${correlationId}] Erro na promoção B2B: ${errPromo.message}`);
  }
}

/**
 * GET /payment/public-key - Fornece com segurança a Public Key e parâmetros de parcelamento para o SDK frontend
 */
router.get('/public-key', async (req, res) => {
  try {
    const creds = await mercadoPagoService.getCredentials();
    res.json({
      publicKey: creds.publicKey || process.env.MP_PUBLIC_KEY || '',
      maxInstallments: creds.maxInstallments || 6,
      minInstallmentAmount: creds.minInstallmentAmount || 25,
      isActive: creds.isActive,
    });
  } catch (error) {
    logger.error('[API PublicKey] Erro ao obter chave pública:', error);
    res.json({
      publicKey: '',
      maxInstallments: 6,
      minInstallmentAmount: 25,
      isActive: false,
    });
  }
});

/**
 * POST /payment/pix-transparent - Cria o pagamento via PIX Transparente e retorna o QR Code e Copia e Cola
 */
router.post('/pix-transparent', async (req, res) => {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId é obrigatório' });
    }

    let order = null;
    let collectionName = 'pedidos';
    try {
      order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
    } catch {
      try {
        order = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
        collectionName = 'orders';
      } catch (errLookup) {
        logger.error(`[PixTransparent] Pedido ${orderId} não encontrado.`, errLookup);
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
    }

    // Se já estiver pago, retorna status aprovado
    if (order.status === 'confirmado' || order.status === 'pago') {
      return res.json({
        sucesso: true,
        alreadyPaid: true,
        status: 'approved',
        orderId: order.id,
        numero_pedido: order.numero_pedido,
      });
    }

    // Se já possui PIX em cache em memória e ainda válido, reutiliza imediatamente
    const cachedPix = paymentDataCache.get(String(orderId)) || paymentDataCache.get(String(order.id));
    if (cachedPix && cachedPix.qr_code && cachedPix.qr_code_base64) {
      const expDate = new Date(cachedPix.date_of_expiration).getTime();
      if (expDate > Date.now() + 60 * 1000) {
        logger.info(`[PixTransparent] Reutilizando PIX ativo do cache para pedido ${order.numero_pedido || order.id}`);
        return res.json({
          sucesso: true,
          id: cachedPix.id,
          status: cachedPix.status || 'pending',
          qr_code: cachedPix.qr_code,
          qr_code_base64: cachedPix.qr_code_base64,
          ticket_url: cachedPix.ticket_url,
          date_of_expiration: cachedPix.date_of_expiration,
          reused: true,
        });
      }
    }

    // Se já possui PIX gerado e ainda válido no registro do pedido, reutiliza para idempotência perfeita
    if (order.pix_copia_cola && order.pix_qr_code_base64 && order.pix_expiracao) {
      const expDate = new Date(order.pix_expiracao).getTime();
      if (expDate > Date.now() + 60 * 1000) {
        logger.info(`[PixTransparent] Reutilizando PIX ativo para pedido ${order.numero_pedido || order.id}`);
        return res.json({
          sucesso: true,
          id: order.mercadopago_payment_id,
          status: 'pending',
          qr_code: order.pix_copia_cola,
          qr_code_base64: order.pix_qr_code_base64,
          date_of_expiration: order.pix_expiracao,
          reused: true,
        });
      }
    }

    // Gera novo pagamento PIX oficial no Mercado Pago
    const pixResult = await mercadoPagoService.createPixPayment(order);

    // Registra imediatamente no cache de alta disponibilidade
    const pixPayloadRecord = {
      id: String(pixResult.id),
      status: pixResult.status,
      qr_code: pixResult.qr_code,
      qr_code_base64: pixResult.qr_code_base64,
      ticket_url: pixResult.ticket_url,
      date_of_expiration: pixResult.date_of_expiration,
      mercadopago_payment_id: String(pixResult.id),
      pix_copia_cola: pixResult.qr_code,
      pix_qr_code_base64: pixResult.qr_code_base64,
      pix_expiracao: pixResult.date_of_expiration,
    };
    paymentDataCache.set(String(order.id), pixPayloadRecord);
    if (order.numero_pedido) {
      paymentDataCache.set(String(order.numero_pedido), pixPayloadRecord);
    }

    // Persiste no pedido de forma resiliente
    try {
      await pb.collection(collectionName).update(order.id, {
        mercadopago_payment_id: String(pixResult.id),
        pix_copia_cola: pixResult.qr_code || '',
        pix_qr_code_base64: pixResult.qr_code_base64 || '',
        pix_expiracao: pixResult.date_of_expiration,
        forma_pagamento: 'pix',
        metodo_pagamento: 'pix',
      }, { $autoCancel: false });
    } catch (errPersist) {
      logger.warn(`[PixTransparent] Aviso ao persistir dados do PIX no pedido: ${errPersist.message}`);
    }

    return res.json({
      sucesso: true,
      id: pixResult.id,
      status: pixResult.status,
      qr_code: pixResult.qr_code,
      qr_code_base64: pixResult.qr_code_base64,
      ticket_url: pixResult.ticket_url,
      date_of_expiration: pixResult.date_of_expiration,
    });
  } catch (error) {
    logger.error('[PixTransparent] Falha ao processar PIX:', error);
    const msg = error.response?.data?.message || error.message || 'Erro ao gerar PIX transparente.';
    return res.status(500).json({ error: msg });
  }
});

/**
 * POST /payment/card-transparent - Processa pagamento com Cartão de Crédito tokenizado no frontend
 */
router.post('/card-transparent', async (req, res) => {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const {
      orderId,
      token,
      installments,
      payment_method_id,
      issuer_id,
      payerIdentification,
    } = req.body;

    if (!orderId || !token) {
      return res.status(400).json({ error: 'orderId e token do cartão são obrigatórios.' });
    }

    let order = null;
    let collectionName = 'pedidos';
    try {
      order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
    } catch {
      try {
        order = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
        collectionName = 'orders';
      } catch (errLookup) {
        logger.error(`[CardTransparent] Pedido ${orderId} não encontrado.`, errLookup);
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
    }

    // Executa cobrança via Mercado Pago
    const cardResult = await mercadoPagoService.createCardPayment(order, {
      token,
      installments,
      payment_method_id,
      issuer_id,
      payerIdentification,
    });

    const isApproved = cardResult.status === 'approved';
    const isPending = cardResult.status === 'in_process';

    // Atualiza o pedido com base no resultado da transação
    try {
      const historico = order.historico_status || [];
      if (isApproved) {
        historico.push({
          status: 'confirmado',
          timestamp: new Date().toISOString(),
          detalhes: `Pagamento aprovado via Cartão de Crédito Mercado Pago (${cardResult.installments}x) - ID ${cardResult.id}`,
        });

        const updatedOrder = await pb.collection(collectionName).update(order.id, {
          status: 'confirmado',
          mercadopago_payment_id: String(cardResult.id),
          forma_pagamento: 'credit_card',
          metodo_pagamento: 'credit_card',
          installments: Number(cardResult.installments) || 1,
          historico_status: historico,
        }, { $autoCancel: false });

        // Dispara efeitos colaterais de aprovação em background (desacoplado)
        executeOrderApprovalSideEffects(updatedOrder).catch(errSide => {
          logger.error(`[CardTransparent] Erro em side-effects de pedido aprovado: ${errSide.message}`);
        });
      } else if (isPending) {
        historico.push({
          status: 'processando',
          timestamp: new Date().toISOString(),
          detalhes: `Pagamento em análise pela operadora do cartão - ID ${cardResult.id}`,
        });

        await pb.collection(collectionName).update(order.id, {
          status: 'processando',
          mercadopago_payment_id: String(cardResult.id),
          forma_pagamento: 'credit_card',
          metodo_pagamento: 'credit_card',
          installments: Number(cardResult.installments) || 1,
          historico_status: historico,
        }, { $autoCancel: false });
      }
    } catch (errDb) {
      logger.warn(`[CardTransparent] Aviso ao atualizar pedido no PocketBase: ${errDb.message}`);
    }

    return res.json({
      sucesso: isApproved,
      status: cardResult.status,
      status_detail: cardResult.status_detail,
      message: cardResult.human_message,
      payment_id: cardResult.id,
      orderId: order.id,
    });
  } catch (error) {
    logger.error('[CardTransparent] Falha ao processar cartão:', error);
    const msg = error.response?.data?.message || error.message || 'Erro ao processar pagamento com cartão.';
    return res.status(500).json({ error: msg });
  }
});

/**
 * POST /payment/boleto-transparent - Gera boleto bancário tradicional para pedidos >= R$ 59,90
 */
router.post('/boleto-transparent', async (req, res) => {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'orderId é obrigatório' });
    }

    let order = null;
    let collectionName = 'pedidos';
    try {
      order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
    } catch {
      try {
        order = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
        collectionName = 'orders';
      } catch (errLookup) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
    }

    // Regra da Avante Lingerie: Boleto exige compra mínima de R$ 59,90
    if (Number(order.valor_total) < 59.90) {
      return res.status(400).json({
        error: 'O boleto bancário é permitido apenas para pedidos a partir de R$ 59,90. Escolha PIX com 5% OFF ou Cartão de Crédito.',
      });
    }

    const boletoResult = await mercadoPagoService.createBoletoPayment(order);

    try {
      await pb.collection(collectionName).update(order.id, {
        mercadopago_payment_id: String(boletoResult.id),
        boleto_barcode: boletoResult.barcode || '',
        boleto_url: boletoResult.ticket_url || '',
        forma_pagamento: 'boleto',
        metodo_pagamento: 'boleto',
      }, { $autoCancel: false });
    } catch (errPersist) {
      logger.warn(`[BoletoTransparent] Aviso ao persistir dados do boleto: ${errPersist.message}`);
    }

    return res.json({
      sucesso: true,
      id: boletoResult.id,
      status: boletoResult.status,
      barcode: boletoResult.barcode,
      ticket_url: boletoResult.ticket_url,
      date_of_expiration: boletoResult.date_of_expiration,
    });
  } catch (error) {
    logger.error('[BoletoTransparent] Falha ao processar boleto:', error);
    const msg = error.response?.data?.message || error.message || 'Erro ao gerar boleto transparente.';
    return res.status(500).json({ error: msg });
  }
});

/**
 * GET /payment/order-status/:orderId - Consulta leve para polling em tempo real na tela de confirmação
 */
router.get('/order-status/:orderId', async (req, res) => {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );

    const { orderId } = req.params;
    let order = null;
    try {
      order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
    } catch {
      try {
        order = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
      } catch {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
    }

    const cached = paymentDataCache.get(String(order.id)) || paymentDataCache.get(String(order.numero_pedido)) || {};

    return res.json({
      id: order.id,
      numero_pedido: order.numero_pedido,
      status: order.status,
      isApproved: order.status === 'confirmado' || order.status === 'pago',
      forma_pagamento: order.forma_pagamento || order.metodo_pagamento,
      payment_id: order.mercadopago_payment_id || cached.mercadopago_payment_id || '',
      pix_copia_cola: order.pix_copia_cola || cached.pix_copia_cola || cached.qr_code || '',
      pix_qr_code_base64: order.pix_qr_code_base64 || cached.pix_qr_code_base64 || cached.qr_code_base64 || '',
      pix_expiracao: order.pix_expiracao || cached.pix_expiracao || cached.date_of_expiration || '',
      boleto_barcode: order.boleto_barcode || cached.boleto_barcode || cached.barcode || '',
      boleto_url: order.boleto_url || cached.boleto_url || cached.ticket_url || '',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;