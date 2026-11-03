import pb from '../apps/api/src/utils/pocketbaseClient.js';
import axios from 'axios';

async function testUuid() {
  const records = await pb.collection('integracoes_config').getFullList({
    filter: 'servico = "melhor_envio" && chave_nome = "token" && ativo = true',
    $autoCancel: false
  });
  const token = records[0].chave_valor;
  const uuid = 'a3214062-cddf-4536-a4be-02a06e9f491e';

  console.log('Testing tracking with UUID:', uuid);
  try {
    const res = await axios.post('https://api.melhorenvio.com/v2/me/shipment/tracking', {
      orders: [uuid]
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log('Result for UUID:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.status, err.response?.data || err.message);
  }
}

testUuid();

