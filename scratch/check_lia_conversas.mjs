import PocketBase from 'pocketbase';

async function check() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log('Autenticado com sucesso no PocketBase!');

    try {
      const records = await pb.collection('lia_conversas').getList(1, 10, {
        sort: '-updated'
      });
      console.log('Com sort -updated:', records.items.length);
    } catch (e1) {
      console.log('Falha sort -updated:', e1.message, e1.data);
    }

    try {
      const records2 = await pb.collection('lia_conversas').getList(1, 10);
      console.log('Sem sort:', records2.items.length);
      records2.items.forEach(r => {
        console.log(`ID: ${r.id}, Session: ${r.session_id}, Canal: ${r.canal}, Msgs: ${r.mensagens?.length}, Updated: ${r.updated}`);
      });
    } catch (e2) {
      console.log('Falha sem sort:', e2.message, e2.data);
    }

  } catch (err) {
    console.error('Erro de auth:', err.message, err.data);
  }
}

check();
