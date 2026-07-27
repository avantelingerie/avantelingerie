import PocketBase from 'pocketbase';

async function check() {
  try {
    const pb = new PocketBase('http://127.0.0.1:8090');
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const collection = await pb.collections.getOne('variacoes');
    console.log("VARIACOES FIELDS:", collection.fields.map(f => f.name));
  } catch (err) {
    console.error("Error:", err);
  }
}

check();
