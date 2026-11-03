const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://127.0.0.1:8090');

async function check() {
  try {
    const list = await pb.collection('pedidos').getFullList({ sort: '-created' });
    console.log(`Total pedidos: ${list.length}`);
    for (const p of list) {
      console.log({
        numero: p.numero_pedido,
        cliente: p.cliente_nome,
        metodo_envio: p.metodo_envio,
        forma_envio: p.forma_envio,
        frete_valor: p.frete_valor || p.valor_frete,
        bling_pedido_id: p.bling_pedido_id,
        created: p.created
      });
    }
  } catch (err) {
    console.error('PocketBase error:', err.message);
  }
}
check();

