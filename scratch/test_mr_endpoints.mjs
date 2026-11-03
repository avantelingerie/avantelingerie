import axios from 'axios';

async function investigateMR() {
  const code = '888031017960740';
  const urls = [
    `https://api.melhorrastreio.com.br/graphql`,
    `https://app.melhorrastreio.com.br/graphql`,
    `https://api.melhorrastreio.com.br/v1/trackings/${code}`,
    `https://api.melhorrastreio.com.br/trackings/${code}`,
    `https://www.melhorrastreio.com.br/api/tracking/${code}`,
    `https://api.melhorenvio.com/v2/me/shipment/tracking/${code}`,
    `https://api.melhorenvio.com/v2/me/orders/a3214062-cddf-4536-a4be-02a06e9f491e`
  ];

  for (const u of urls) {
    try {
      const res = await axios.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        },
        timeout: 5000
      });
      console.log(`[SUCCESS] ${u} -> status: ${res.status}`);
      console.log('Data keys:', Object.keys(res.data));
    } catch (e) {
      console.log(`[FAILED] ${u} -> ${e.response?.status || e.message}`);
    }
  }

  // Also check GraphQL on api.melhorrastreio.com.br or app.melhorrastreio.com.br
  console.log('\n--- Checking GraphQL introspection on melhorrastreio ---');
  try {
    const gqlRes = await axios.post('https://api.melhorrastreio.com.br/graphql', {
      query: `
        query getTracking($code: String!) {
          tracking(trackingCode: $code) {
            id
            trackingCode
            status
            createdAt
            events {
              date
              status
              location
              description
            }
          }
        }
      `,
      variables: { code }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    console.log('GQL response:', JSON.stringify(gqlRes.data, null, 2));
  } catch (e) {
    console.log('GQL error:', e.response?.status, e.response?.data || e.message);
  }
}

investigateMR();

