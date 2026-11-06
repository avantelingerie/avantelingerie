const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function inspectOrder() {
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const order = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-004"');
  console.log('Order keys:', Object.keys(order));
  console.log('Order data:', JSON.stringify(order, null, 2));
}

inspectOrder().catch(console.error);

