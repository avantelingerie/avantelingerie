import crypto from 'crypto';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

class MercadoPagoService {
  /**
   * Obtém as credenciais ativas do Mercado Pago do banco de dados (integracoes_config)
   * com fallback transparente para variáveis de ambiente (12-Factor).
   */
  async getCredentials() {
    let accessToken = process.env.MP_ACCESS_TOKEN || '';
    let publicKey = process.env.MP_PUBLIC_KEY || '';
    let webhookSecret = process.env.MP_WEBHOOK_SECRET || '';
    let maxInstallments = 12;
    let minInstallmentAmount = 25;
    let isActive = true;

    try {
      const configs = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "mercadopago"',
        $autoCancel: false,
      });

      for (const config of configs) {
        if (config.chave_nome === 'mp_access_token' && config.chave_valor) {
          accessToken = config.chave_valor;
        } else if (config.chave_nome === 'mp_public_key' && config.chave_valor) {
          publicKey = config.chave_valor;
        } else if (config.chave_nome === 'mp_webhook_secret' && config.chave_valor) {
          webhookSecret = config.chave_valor;
        } else if (config.chave_nome === 'mp_parcelas_max' && config.chave_valor) {
          const parsed = parseInt(config.chave_valor, 10);
          if (!isNaN(parsed) && parsed >= 1 && parsed <= 12) {
            maxInstallments = parsed;
          }
        } else if (config.chave_nome === 'mp_parcela_minima' && config.chave_valor) {
          const parsed = parseFloat(config.chave_valor);
          if (!isNaN(parsed) && parsed > 0) {
            minInstallmentAmount = parsed;
          }
        } else if (config.chave_nome === 'mp_ativo') {
          isActive = config.chave_valor === 'true' || config.chave_valor === true;
        }
      }
    } catch (err) {
      logger.warn(`[MercadoPagoService] Erro ao buscar configurações no PocketBase: ${err.message}`);
    }

    return {
      accessToken,
      publicKey,
      webhookSecret,
      maxInstallments,
      minInstallmentAmount,
      isActive,
      isConfigured: !!accessToken,
    };
  }

  /**
   * Valida as credenciais chamando a API oficial do Mercado Pago (/users/me)
   */
  async testConnection(customAccessToken) {
    let token = customAccessToken;
    if (!token) {
      const creds = await this.getCredentials();
      token = creds.accessToken;
    }

    if (!token) {
      throw new Error('Access Token do Mercado Pago não configurado.');
    }

    try {
      const response = await axios.get('https://api.mercadopago.com/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        timeout: 10000,
      });

      if (response.status === 200) {
        const userData = response.data;
        return {
          sucesso: true,
          usuario: userData.nickname || userData.first_name || 'Lojista',
          email: userData.email,
          pais: userData.site_id,
          mensagem: `Conexão validada com sucesso! Conta: ${userData.nickname || userData.email}`,
        };
      }

      throw new Error(`Status inesperado da API do Mercado Pago: ${response.status}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      logger.error(`[MercadoPagoService] Erro no teste de conexão: ${msg}`);
      throw new Error(`Falha na autenticação do Mercado Pago: ${msg}`);
    }
  }

  /**
   * Cria uma preferência de pagamento no Mercado Pago Checkout Pro
   * com suporte completo a parcelamento nacional (1x a 12x), PIX e Boleto.
   */
  async createPreference(order, origin) {
    const creds = await this.getCredentials();
    if (!creds.accessToken) {
      throw new Error('Gateway Mercado Pago não configurado. Adicione o Access Token no Admin.');
    }

    // 1. Determina URLs de retorno dinâmicas baseadas na origem da requisição
    const baseUrl = origin || process.env.PUBLIC_WEB_URL || 'https://avantelingerie.com.br';
    const apiUrl = process.env.PUBLIC_API_URL || 'https://avantelingerie.com.br/hcgi/api';

    // 2. Mapeia itens do pedido
    const rawItems = order.itens || [];
    const items = rawItems.map((item, index) => ({
      id: String(item.variacao_id || item.id || `item-${index}`),
      title: `${item.nome || 'Produto Avante Lingerie'} ${item.cor ? '- ' + item.cor : ''} ${item.tamanho ? '(' + item.tamanho + ')' : ''}`.trim(),
      description: item.sku ? `SKU: ${item.sku}` : 'Moda Íntima de Fábrica',
      picture_url: item.image || item.imagem || undefined,
      category_id: 'fashion',
      quantity: Number(item.quantidade) || 1,
      currency_id: 'BRL',
      unit_price: Number(Number(item.preco_unitario || item.preco || 0).toFixed(2)),
    }));

    // Se o valor do frete for maior que zero, adiciona como item de custo de envio
    if (Number(order.valor_frete) > 0) {
      items.push({
        id: 'envio-frete',
        title: 'Frete Seguro de Fábrica (Melhor Envio / Correios)',
        description: 'Envio para o endereço de entrega cadastrado',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: Number(Number(order.valor_frete).toFixed(2)),
      });
    }

    // Se houver desconto geral aplicado, adicionamos um item de desconto ou ajustamos proporção
    // Nota: A API do Mercado Pago exige unit_price > 0. Se a soma dos itens for diferente do valor_total:
    const calculatedSum = items.reduce((acc, curr) => acc + (curr.unit_price * curr.quantity), 0);
    const finalTotal = Number(order.valor_total);

    // Se a soma calculada diferir do total do pedido (devido a cupom/desconto progressivo),
    // normalizamos criando uma lista consolidada fiel ao total aprovado da loja.
    let preferenceItems = items;
    if (Math.abs(calculatedSum - finalTotal) > 0.05) {
      preferenceItems = [
        {
          id: `pedido-${order.numero_pedido || order.id}`,
          title: `Pedido Avante Lingerie ${order.numero_pedido || ('#' + order.id.slice(-6).toUpperCase())}`,
          description: `Total de ${rawItems.length} item(ns) com descontos aplicados.`,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(finalTotal.toFixed(2)),
        }
      ];
    }

    // 3. Monta dados do pagador
    const cleanCpf = (order.cpf || order.cliente_cpf || '').replace(/\D/g, '');
    const cleanPhone = (order.cliente_telefone || '').replace(/\D/g, '');
    let phoneArea = '22';
    let phoneNumber = cleanPhone;
    if (cleanPhone.length >= 10) {
      phoneArea = cleanPhone.slice(0, 2);
      phoneNumber = cleanPhone.slice(2);
    }

    const payer = {
      name: order.cliente_nome || 'Cliente',
      email: order.cliente_email,
      phone: {
        area_code: phoneArea,
        number: phoneNumber || '981225010',
      },
      identification: cleanCpf.length === 11 ? {
        type: 'CPF',
        number: cleanCpf,
      } : (cleanCpf.length === 14 ? {
        type: 'CNPJ',
        number: cleanCpf,
      } : undefined),
      address: {
        street_name: order.endereco_entrega || 'Endereço',
        zip_code: (order.cep || '').replace(/\D/g, ''),
      },
    };

    // 4. Configura métodos de pagamento e parcelamento conforme regras da Avante Lingerie
    const excludedTypes = [];

    // Regra 5: Mercado Crédito só aparece se o carrinho tiver no mínimo R$ 29,90
    if (finalTotal < 29.90) {
      excludedTypes.push({ id: 'consumer_credits' });
    }

    // Regra 2: Boleto Bancário tradicional só é permitido com compra mínima de R$ 59,90
    if (finalTotal < 59.90) {
      excludedTypes.push({ id: 'ticket' });
    }

    // Se o pedido for explicitamente PIX na loja, isola para recebimento via PIX
    if (order.metodo_pagamento === 'pix') {
      excludedTypes.push({ id: 'ticket' });
      excludedTypes.push({ id: 'credit_card' });
      excludedTypes.push({ id: 'debit_card' });
      excludedTypes.push({ id: 'consumer_credits' });
    } else if (order.metodo_pagamento === 'boleto') {
      // Se selecionou boleto no checkout da loja
      excludedTypes.push({ id: 'credit_card' });
      excludedTypes.push({ id: 'debit_card' });
      excludedTypes.push({ id: 'consumer_credits' });
    }

    // Remove duplicatas de excludedTypes se houver
    const uniqueExcludedTypes = Array.from(
      new Map(excludedTypes.map(item => [item.id, item])).values()
    );

    const paymentMethods = {
      installments: creds.maxInstallments || 6,
      excluded_payment_methods: [],
      excluded_payment_types: uniqueExcludedTypes,
    };

    // 5. Payload canônico da Preferência
    const preferencePayload = {
      items: preferenceItems,
      payer,
      payment_methods: paymentMethods,
      back_urls: {
        success: `${baseUrl}/order-confirmation/${order.id}?status=approved`,
        pending: `${baseUrl}/order-confirmation/${order.id}?status=pending`,
        failure: `${baseUrl}/checkout?status=failure&order_id=${order.id}`,
      },
      auto_return: 'approved',
      notification_url: `${apiUrl}/webhooks/mercadopago`,
      external_reference: String(order.id),
      statement_descriptor: 'AVANTE LINGERIE',
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias de validade
      metadata: {
        order_id: String(order.id),
        numero_pedido: order.numero_pedido || '',
        cliente_id: order.cliente_id || '',
      },
    };

    logger.info(`[MercadoPagoService] Criando preferência para pedido ${order.numero_pedido || order.id} (Total: R$ ${finalTotal})`);

    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preferencePayload,
      {
        headers: {
          Authorization: `Bearer ${creds.accessToken}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );

    const preferenceData = response.data;
    logger.info(`[MercadoPagoService] Preferência criada com sucesso: ID=${preferenceData.id}`);

    return {
      id: preferenceData.id,
      init_point: preferenceData.init_point,
      sandbox_init_point: preferenceData.sandbox_init_point,
    };
  }

  /**
   * Consulta os dados detalhados de um pagamento na API oficial
   */
  async getPayment(paymentId) {
    const creds = await this.getCredentials();
    if (!creds.accessToken) {
      throw new Error('Access Token do Mercado Pago não configurado.');
    }

    const response = await axios.get(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${creds.accessToken}`,
          Accept: 'application/json',
        },
        timeout: 10000,
      }
    );

    return response.data;
  }

  /**
   * Valida a assinatura HMAC SHA-256 do webhook do Mercado Pago (Segurança P0).
   * Headers: x-signature (ts=...,v1=...), x-request-id
   */
  verifyWebhookSignature(headers, dataId, secret) {
    if (!secret) {
      logger.warn('[MercadoPagoWebhook] mp_webhook_secret não configurado. Verificação de assinatura em modo permissivo com alerta.');
      return true;
    }

    const xSignature = headers['x-signature'] || headers['X-Signature'];
    const xRequestId = headers['x-request-id'] || headers['X-Request-Id'];

    if (!xSignature || !xRequestId) {
      logger.error('[MercadoPagoWebhook] Headers de assinatura ausentes (x-signature ou x-request-id).');
      return false;
    }

    // Extrai 'ts' e 'v1' do header x-signature
    const parts = xSignature.split(',');
    let ts = null;
    let v1 = null;

    for (const part of parts) {
      const [key, value] = part.trim().split('=');
      if (key === 'ts') ts = value;
      if (key === 'v1') v1 = value;
    }

    if (!ts || !v1) {
      logger.error('[MercadoPagoWebhook] Formato inválido no header x-signature.');
      return false;
    }

    // Valida desvio temporal (tolerância de até 5 minutos contra replay attacks)
    const timestampMs = parseInt(ts, 10) * 1000;
    const nowMs = Date.now();
    if (Math.abs(nowMs - timestampMs) > 5 * 60 * 1000) {
      logger.error(`[MercadoPagoWebhook] Desvio temporal do webhook excedeu 5 minutos (ts: ${ts}, now: ${Math.floor(nowMs / 1000)})`);
      return false;
    }

    // Constrói a mensagem canônica exigida pelo Mercado Pago
    // Manifest: "id:{data.id};request-id:{x-request-id};ts:{ts};"
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
    const computedHash = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

    const isValid = computedHash === v1;
    if (!isValid) {
      logger.error(`[MercadoPagoWebhook] Falha de assinatura HMAC. Esperado: ${v1}, Calculado: ${computedHash}`);
    }

    return isValid;
  }
}

export const mercadoPagoService = new MercadoPagoService();
export default mercadoPagoService;
