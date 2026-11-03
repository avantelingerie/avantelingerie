import pb from '../apps/api/src/utils/pocketbaseClient.js';
import axios from 'axios';

async function main() {
  try {
    const records = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "melhor_envio" && chave_nome = "token" && ativo = true',
      $autoCancel: false
    });
    console.log('Integracoes config records:', records.length);
    if (records.length === 0) {
      console.log('No token found in PB.');
      return;
    }
    const token = records[0].chave_valor;
    console.log('Token length:', token.length, 'starts with:', token.slice(0, 10));

    const trackingCode = '888031017960740';

    // 1. Try Melhor Envio shipment/tracking endpoint with tracking code
    console.log('\n--- 1. Testing POST https://api.melhorenvio.com/v2/me/shipment/tracking with code ---');
    try {
      const res1 = await axios.post('https://api.melhorenvio.com/v2/me/shipment/tracking', {
        orders: [trackingCode]
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Res1 data:', JSON.stringify(res1.data, null, 2));
    } catch (err) {
      console.log('Res1 error:', err.response?.status, err.response?.data || err.message);
    }

    // 2. Try querying orders to find the shipment matching trackingCode
    console.log('\n--- 2. Testing GET https://api.melhorenvio.com/v2/me/orders?search=... ---');
    try {
      const res2 = await axios.get(`https://api.melhorenvio.com/v2/me/orders?search=${trackingCode}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      console.log('Res2 data:', JSON.stringify(res2.data, null, 2));
    } catch (err) {
      console.log('Res2 error:', err.response?.status, err.response?.data || err.message);
    }

    // 3. Try listing recent orders in Melhor Envio
    console.log('\n--- 3. Testing GET https://api.melhorenvio.com/v2/me/orders (recent) ---');
    try {
      const res3 = await axios.get('https://api.melhorenvio.com/v2/me/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        params: {
          per_page: 5
        }
      });
      console.log('Res3 count:', res3.data?.data?.length);
      if (res3.data?.data) {
        for (const order of res3.data.data) {
          console.log(`Order ID: ${order.id}, Status: ${order.status}, Tracking: ${order.tracking}, Service: ${order.service?.name}`);
        }
      }
    } catch (err) {
      console.log('Res3 error:', err.response?.status, err.response?.data || err.message);
    }

    // 4. Test Melhor Rastreio public / API endpoint
    console.log('\n--- 4. Testing Melhor Rastreio API / Public ---');
    try {
      // Melhor Rastreio has an API or public endpoint: https://api.melhorrastreio.com.br/graphql or https://app.melhorrastreio.com.br
      const mrRes = await axios.get(`https://api.melhorrastreio.com.br/v1/trackings/${trackingCode}`);
      console.log('Melhor Rastreio v1:', JSON.stringify(mrRes.data, null, 2));
    } catch (err) {
      console.log('MR error:', err.response?.status, err.response?.data || err.message);
    }

  } catch (e) {
    console.error('Fatal error:', e);
  }
}

main();

