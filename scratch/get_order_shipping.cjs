const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const p = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-003"');
    console.log(JSON.stringify({
      numero: p.numero_pedido,
      frete_valor: p.frete_valor || p.valor_frete,
      metodo_envio: p.metodo_envio,
      forma_envio: p.forma_envio,
      transportadora: p.transportadora,
      servico_envio: p.servico_envio,
      prazo_envio: p.prazo_envio,
      observacoes: p.observacoes
    }, null, 2));
  } catch (e) {
    console.error('PB error:', e.message);
  }
}
test();

