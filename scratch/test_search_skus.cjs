const PocketBase = require('pocketbase/cjs');
const axios = require('axios');

async function testSearchProducts() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  const tokenRecord = await pb.collection('bling_tokens').getFirstListItem('', { sort: '-created' });
  const blingApiToken = tokenRecord.access_token;

  const skus = ['AVL-CAL-8588-PRETA-G', 'AVL-CAL-8588-BEGE-G', 'AVL-CON-8949-RUBI-G'];
  for (const sku of skus) {
    try {
      const res = await axios.get(`https://api.bling.com.br/Api/v3/produtos?codigo=${encodeURIComponent(sku)}`, {
        headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' }
      });
      console.log(`SKU ${sku}:`, res.data?.data);
    } catch (e) {
      console.log(`SKU ${sku} erro:`, e.response?.data || e.message);
    }
  }
}

testSearchProducts().catch(console.error);
