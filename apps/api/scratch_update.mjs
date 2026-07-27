import PocketBase from 'pocketbase';
const client = new PocketBase('http://127.0.0.1:8090');

async function updateSchema() {
  await client.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const collection = await client.collections.getOne('pedidos');
  
  const exists = collection.fields.some(f => f.name === 'bling_pedido_id');
  if (!exists) {
    collection.fields.push({
      name: 'bling_pedido_id',
      type: 'text',
      required: false,
      options: { max: 255 }
    });
    await client.collections.update('pedidos', collection);
    console.log('Campo bling_pedido_id adicionado com sucesso!');
  } else {
    console.log('Campo já existe.');
  }
}

updateSchema().catch(console.error);
