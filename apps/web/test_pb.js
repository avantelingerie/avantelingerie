const PocketBase = require('pocketbase/cjs');
const pb = new PocketBase('http://localhost:8090');

async function test() {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'AvanteLingerie123!');
    const data = {
      name: 'Teste Local',
      categoria: 'Cropped',
      reference: 'TESTE-123',
      stock: 0,
      price: 0
    };
    await pb.collection('products').create(data);
    console.log('Criado com sucesso');
  } catch (err) {
    console.error('ERRO:', JSON.stringify(err.response, null, 2));
  }
}
test();
