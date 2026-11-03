const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function updateTracking() {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const order = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-003"');
    console.log('Order found:', order.id, order.numero_pedido);
    const updated = await pb.collection('pedidos').update(order.id, {
      rastreamento: '888031017960740',
      transportadora: 'J&T Express',
      forma_envio: 'J&T Express Standard',
      status: 'enviado'
    });
    console.log('Successfully updated order PED-003:', {
      rastreamento: updated.rastreamento,
      transportadora: updated.transportadora,
      status: updated.status
    });
  } catch (err) {
    console.error('Update error:', err.message);
  }
}

updateTracking();
