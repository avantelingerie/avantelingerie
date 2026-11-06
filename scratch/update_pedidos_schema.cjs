const PocketBase = require('pocketbase/cjs');

async function updatePedidosSchema() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  
  const col = await pb.collections.getOne('pedidos');
  console.log('Current collection:', col.name, 'fields count:', col.fields.length);

  const newFields = [
    { name: 'transportadora', type: 'text', required: false },
    { name: 'forma_envio', type: 'text', required: false },
    { name: 'prazo_envio', type: 'text', required: false },
    { name: 'servico_frete_id', type: 'text', required: false },
    { name: 'chave_nfe', type: 'text', required: false },
    { name: 'numero_nfe', type: 'text', required: false },
    { name: 'etiqueta_url', type: 'text', required: false },
    { name: 'melhor_envio_id', type: 'text', required: false }
  ];

  let added = 0;
  for (const nf of newFields) {
    const exists = col.fields.some(f => f.name === nf.name);
    if (!exists) {
      col.fields.push(nf);
      console.log(`Adding field: ${nf.name} (${nf.type})`);
      added++;
    } else {
      console.log(`Field already exists: ${nf.name}`);
    }
  }

  if (added > 0) {
    await pb.collections.update('pedidos', col);
    console.log(`Successfully updated pedidos schema! Added ${added} fields.`);
  } else {
    console.log('No new fields needed to be added.');
  }

  // Verify
  const verifiedCol = await pb.collections.getOne('pedidos');
  console.log('Verified fields in pedidos:');
  verifiedCol.fields.forEach(f => console.log(`- ${f.name} (${f.type})`));
}

updatePedidosSchema().catch(console.error);

