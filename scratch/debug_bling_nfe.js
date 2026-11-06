const axios = require('axios');
const PocketBase = require('pocketbase/cjs');

async function checkBling() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const records = await pb.collection('bling_tokens').getFullList({ sort: '-created', limit: 1 });
  const token = records[0].access_token;
  console.log('Bling token found!');

  const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };

  // 1. Check order 27320328372
  try {
    const oRes = await axios.get('https://api.bling.com.br/Api/v3/pedidos/vendas/27320328372', { headers });
    console.log('Order 27320328372 in Bling notaFiscal:', JSON.stringify(oRes.data?.data?.notaFiscal, null, 2));
    console.log('Order full data fields:', Object.keys(oRes.data?.data || {}));
  } catch (e) {
    console.log('Error querying order 27320328372:', e.response?.data || e.message);
  }

  // 2. Check recent NF-e
  try {
    const nRes = await axios.get('https://api.bling.com.br/Api/v3/nfe?limite=10', { headers });
    console.log('Recent NFes in Bling:');
    nRes.data?.data?.forEach(n => {
      console.log(`- ID: ${n.id}, Num: ${n.numero}, Chave: ${n.chaveAcesso}, Situação: ${n.situacao}, Contato: ${n.contato?.nome}, Doc: ${n.contato?.numeroDocumento}, Valor: ${n.valorNota}, Pedido: ${n.numeroLoja}`);
    });
  } catch (e) {
    console.log('Error querying NFes:', e.response?.data || e.message);
  }
}

checkBling().catch(console.error);
