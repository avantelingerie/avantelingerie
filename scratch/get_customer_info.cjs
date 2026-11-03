const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const p = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-003"');
    console.log(JSON.stringify({
      numero: p.numero_pedido,
      cliente: p.cliente_nome,
      cpf: p.cliente_cpf,
      telefone: p.cliente_telefone,
      endereco: p.endereco_entrega,
      cidade: p.cidade,
      estado: p.estado,
      cep: p.cep,
      frete_valor: p.valor_frete || p.frete_valor,
      metodo_envio: p.metodo_envio
    }, null, 2));
  } catch (e) {
    console.error('PB error:', e.message);
  }
}
test();

