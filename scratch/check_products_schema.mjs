import PocketBase from 'pocketbase';

async function check() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const col = await pb.collections.getOne('products');
    console.log('Fields de products:');
    col.fields.forEach(f => console.log(f));
  } catch (err) {
    console.error(err);
  }
}

check();

