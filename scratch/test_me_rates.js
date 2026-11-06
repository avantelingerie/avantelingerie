const axios = require('axios');
const PocketBase = require('pocketbase/cjs');

async function testMeCalc() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const records = await pb.collection('integracoes_config').getFullList({
    filter: 'servico = "melhor_envio" && chave_nome = "token" && ativo = true'
  });
  const token = records[0].chave_valor;

  const payload = {
    from: { postal_code: '28623620' },
    to: { postal_code: '13913010' },
    package: { height: 6, width: 22, length: 30, weight: 0.3 }
  };

  const res = await axios.post('https://api.melhorenvio.com/v2/me/shipment/calculate', payload, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'User-Agent': 'AvanteLingerie/1.0 (contato@avantelingerie.com.br)'
    }
  });

  console.log('Melhor Envio calculate results for 13913010:');
  res.data.forEach(s => {
    if (!s.error) {
      console.log(`- ID: ${s.id}, Carrier: ${s.company.name} (${s.name}), Price: R$ ${s.price}, Delivery: ${s.delivery_time} days`);
    } else {
      console.log(`- ID: ${s.id} (${s.name}): Error - ${s.error}`);
    }
  });
}

testMeCalc().catch(console.error);
