const axios = require('axios');

async function testCalc() {
  const res = await axios.post('https://avantelingerie.com.br/hcgi/api/shipping/calculate', {
    toCep: '13913010',
    items: [
      { id: 'ep5fg7iobvjvrnc', quantity: 1 },
      { id: 'du502wvn4334wv8', quantity: 1 }
    ],
    cidade: 'Jaguariúna',
    estado: 'SP'
  });
  console.log('Shipping options for Tatiane (13913-010):');
  console.log(JSON.stringify(res.data.options, null, 2));
}

testCalc().catch(console.error);

