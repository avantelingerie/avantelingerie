const PocketBase = require('pocketbase/cjs');

async function testThermalView() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  const pedido = await pb.collection('pedidos').getOne('k4ql7tfcmh52t0r');
  console.log('Pedido k4ql7tfcmh52t0r record in PocketBase:');
  console.log({
    id: pedido.id,
    numero_pedido: pedido.numero_pedido,
    cliente_nome: pedido.cliente_nome,
    chave_nfe: pedido.chave_nfe,
    numero_nfe: pedido.numero_nfe,
    transportadora: pedido.transportadora,
    forma_envio: pedido.forma_envio,
    etiqueta_url: pedido.etiqueta_url,
    melhor_envio_id: pedido.melhor_envio_id,
    rastreamento: pedido.rastreamento
  });

  // Verify extraction of NF-e from chave if needed
  let chaveNfe = (pedido.chave_nfe || '').replace(/\D/g, '');
  let numeroNfe = pedido.numero_nfe || '';
  if (chaveNfe && chaveNfe.length === 44) {
    if (!numeroNfe) {
      numeroNfe = String(parseInt(chaveNfe.substring(25, 34), 10) || 1).padStart(6, '0');
    }
    const serieNfe = String(parseInt(chaveNfe.substring(22, 25), 10) || 1);
    console.log('Extracted successfully:', { numeroNfe, serieNfe, chave: chaveNfe });
  }
}

testThermalView().catch(console.error);

