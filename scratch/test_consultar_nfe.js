const axios = require('axios');

async function testConsultarNfe() {
  const res = await axios.get('https://avantelingerie.com.br/hcgi/api/shipping/consultar-nfe-bling/PED-004');
  console.log('Consultar NFe response:', JSON.stringify(res.data, null, 2));
}

testConsultarNfe().catch(console.error);

