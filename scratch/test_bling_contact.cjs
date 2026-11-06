const PocketBase = require('pocketbase/cjs');
const axios = require('axios');

async function testBlingContact() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  // get token
  const tokenRecord = await pb.collection('bling_tokens').getFirstListItem('', { sort: '-created' });
  const blingApiToken = tokenRecord.access_token;

  console.log('Testing contact creation in Bling without invalid CPF...');
  try {
    const res = await axios.post('https://api.bling.com.br/Api/v3/contatos', {
      nome: 'Ines dos santos de paulo',
      tipo: 'F',
      situacao: 'A',
      contribuinte: 9,
      email: 'analauraines@hotmail.com',
      telefone: '41995323120'
    }, {
      headers: {
        'Authorization': `Bearer ${blingApiToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Sucesso ao criar contato sem documento:', res.data);
  } catch (err) {
    console.log('Erro Bling:', err.response?.data || err.message);
  }
}

testBlingContact().catch(console.error);
