import axios from 'axios';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    const configs = await pb.collection('integracoes_config').getFullList({ filter: 'servico = "mercadopago"' });
    let accessToken = '';
    for (const c of configs) {
      if (c.chave_nome === 'mp_access_token') accessToken = c.chave_valor;
    }

    if (!accessToken) {
      console.error('Sem accessToken');
      return;
    }

    console.log('Testando criação de preferência na API do Mercado Pago...');
    const response = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [
          {
            id: 'teste-01',
            title: 'Teste de Validação Avante Lingerie',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 15.67,
          }
        ],
        back_urls: {
          success: 'https://avantelingerie.com.br/order-confirmation/test?status=approved',
          pending: 'https://avantelingerie.com.br/order-confirmation/test?status=pending',
          failure: 'https://avantelingerie.com.br/checkout?status=failure',
        },
        auto_return: 'approved',
        notification_url: 'https://avantelingerie.com.br/hcgi/api/webhooks/mercadopago',
        statement_descriptor: 'AVANTE LINGERIE',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ PREFERÊNCIA GERADA COM SUCESSO ABSOLUTO!');
    console.log('Preference ID:', response.data.id);
    console.log('Init Point (Link de Pagamento Real):', response.data.init_point);
    console.log('Sandbox Init Point:', response.data.sandbox_init_point);
  } catch (err) {
    console.error('Erro:', err.response?.data || err.message);
  }
}

test();
