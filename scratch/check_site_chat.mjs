import PocketBase from 'pocketbase';

async function checkSite() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const r = await pb.collection('lia_conversas').getOne('mv3vxhjzicrhn54');
    console.log('Sessão 81ce7868:', r.session_id, 'Mensagens:');
    console.log(r.mensagens);
  } catch (err) {
    console.error(err);
  }
}

checkSite();

