const PocketBase = require('pocketbase');
const pb = new PocketBase('http://pocketbase:8090');

pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456')
  .then(() => console.log('Success'))
  .catch(e => {
    console.error('Error Status:', e.status);
    console.error('Validation Errors:', JSON.stringify(e.response.data, null, 2));
  });
