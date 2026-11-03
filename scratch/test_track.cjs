const axios = require('axios');

async function testTrack() {
  try {
    console.log('Testing production API with ORD-202611146955301...');
    const prodRes = await axios.post('https://avantelingerie.com.br/hcgi/api/shipping/track', {
      code: 'ORD-202611146955301'
    }, { timeout: 10000 });
    console.log('Production API response for ORD-202611146955301:', JSON.stringify(prodRes.data, null, 2));
  } catch (err) {
    console.log('Production API error:', err.message, err.response?.status, err.response?.data);
  }
}

testTrack();
