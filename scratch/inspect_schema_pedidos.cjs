const PocketBase = require('pocketbase/cjs');

async function inspectSchema() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const col = await pb.collections.getOne('pedidos');
  const fields = col.fields || col.schema || [];
  console.log('Fields in pedidos:');
  fields.forEach(f => console.log(`- ${f.name} (${f.type})`));
}

inspectSchema().catch(console.error);
