import pb from '../apps/api/src/utils/pocketbaseClient.js';
import axios from 'axios';

async function testWithMeToken() {
  const records = await pb.collection('integracoes_config').getFullList({
    filter: 'servico = "melhor_envio" && chave_nome = "token" && ativo = true',
    $autoCancel: false
  });
  const token = records[0].chave_valor;
  console.log('Got token from PB:', token.slice(0, 15) + '...');

  const query = `
    query getParcel($tracker: TrackerSearchInput!) {
      findParcel(tracker: $tracker) {
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
          location {
            city
            state
          }
        }
      }
    }
  `;

  try {
    const res = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query,
      variables: {
        tracker: {
          type: 'jet',
          trackingCode: '888031017960740'
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    console.log('Response with ME token:');
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error with ME token:', err.response?.data || err.message);
  }
}

testWithMeToken();

