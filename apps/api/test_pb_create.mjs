import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

async function testCreate() {
  try {
    await pb.admins.authWithPassword('admin@pocketbase.local', 'Admin123!');
    const data = {
      name: 'Teste Local',
      categoria_id: '',
      price: 10,
      status: true
    };
    const record = await pb.collection('products').create(data);
    console.log('Created!', record.id);
  } catch (err) {
    console.error('ERRO:', JSON.stringify(err.response, null, 2));
  }
}
testCreate();
