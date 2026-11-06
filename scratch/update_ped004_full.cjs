const PocketBase = require('pocketbase/cjs');

async function updatePed004() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  const p = await pb.collection('pedidos').getFirstListItem('numero_pedido = "PED-004"');
  console.log('Found PED-004, updating fields...');

  const updated = await pb.collection('pedidos').update(p.id, {
    chave_nfe: '33261154615037000153550010000000161206888561',
    numero_nfe: '000016',
    transportadora: 'J&T Express',
    forma_envio: 'J&T Express Standard',
    prazo_envio: '3 dias úteis',
    servico_frete_id: '33',
    etiqueta_url: 'https://melhorenvio.com.br/portal/imprimir/9Xz0KqY6vuRy',
    melhor_envio_id: 'PUR-20261169592545',
    status: 'enviado',
    rastreamento: '888031032322960'
  });

  console.log('Successfully updated PED-004:', {
    id: updated.id,
    numero: updated.numero_pedido,
    chave_nfe: updated.chave_nfe,
    numero_nfe: updated.numero_nfe,
    transportadora: updated.transportadora,
    forma_envio: updated.forma_envio,
    etiqueta_url: updated.etiqueta_url,
    melhor_envio_id: updated.melhor_envio_id
  });
}

updatePed004().catch(console.error);

