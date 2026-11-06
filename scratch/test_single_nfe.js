const axios = require('axios');
const PocketBase = require('pocketbase/cjs');

async function testSingleNfe() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const records = await pb.collection('bling_tokens').getFullList({ sort: '-created', limit: 1 });
  const token = records[0].access_token;

  const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };
  try {
    const res = await axios.get('https://api.bling.com.br/Api/v3/nfe/27320688856', { headers });
    console.log('NFe 27320688856 data:', JSON.stringify(res.data?.data, null, 2));
  } catch (e) {
    console.log('Error getting single NFe:', e.response?.data || e.message);
  }
}

testSingleNfe().catch(console.error);

