import PocketBase from 'pocketbase';

async function checkSchema() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const col = await pb.collections.getOne('lia_conversas');
    console.log('Coleção lia_conversas:');
    console.log('Type:', col.type);
    console.log('Fields:', col.fields ? col.fields.map(f => ({ name: f.name, type: f.type })) : col.schema?.map(f => ({ name: f.name, type: f.type })));
    console.log('Indexes:', col.indexes);
    
    // Let's get full list and inspect raw object
    const all = await pb.collection('lia_conversas').getFullList();
    console.log(`Total de registros no banco: ${all.length}`);
    const last5 = all.slice(-5);
    console.log('Últimos 5 registros:');
    last5.forEach(r => {
      console.log('ID:', r.id, 'Session:', r.session_id, 'Canal:', r.canal, 'Created:', r.created, 'Updated:', r.updated);
    });
  } catch (err) {
    console.error('Erro:', err.message, err.data);
  }
}

checkSchema();

