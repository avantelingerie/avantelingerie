const PocketBase = require('pocketbase/cjs');

async function checkPed005() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  const records = await pb.collection('pedidos').getFullList({
    filter: 'numero_pedido = "PED-005" || cliente_nome ~ "Ines"',
    sort: '-created'
  });

  console.log('Encontrados:', records.length);
  if (records.length > 0) {
    const p = records[0];
    console.log(JSON.stringify(p, null, 2));
  }
}

checkPed005().catch(console.error);
