import PocketBase from 'pocketbase';

const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log('Authenticated with PocketBase successfully');
    
    let pedido = null;
    const pedidoId = 'bpdkc91gss1ptu8';
    try {
      pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });
    } catch (e) {
      console.log('getOne failed:', e.message);
      const search = await pb.collection('pedidos').getFullList({
        filter: `numero_pedido = "${pedidoId}" || id = "${pedidoId}"`,
        $autoCancel: false
      });
      if (search.length > 0) pedido = search[0];
    }

    console.log('Pedido encontrado:');
    console.log(JSON.stringify(pedido, null, 2));
  } catch (err) {
    console.error('Error in test:', err);
  }
}

test();

