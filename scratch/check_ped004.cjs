const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function check() {
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const order = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-004"');
  console.log('PED-004 status in PB:', {
    id: order.id,
    numero_pedido: order.numero_pedido,
    status: order.status,
    rastreamento: order.rastreamento,
    codigo_rastreio: order.codigo_rastreio,
    chave_nfe: order.chave_nfe,
    etiqueta_url: order.etiqueta_url,
    transportadora: order.transportadora,
    forma_envio: order.forma_envio
  });
}

check().catch(console.error);

