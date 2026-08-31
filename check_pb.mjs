import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');
(async () => {
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const collection = await pb.collections.getOne('products');
  console.log(Object.keys(collection));
  if (collection.schema) {
      console.log('Has schema');
  } else if (collection.fields) {
      console.log('Has fields');
  }
})();
