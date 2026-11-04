import PocketBase from 'pocketbase';

async function testQuery() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

    // Teste 1: Buscar todas ordenadas por -updated
    const paged = await pb.collection('lia_conversas').getList(1, 10, {
      sort: '-updated'
    });
    console.log('Top 10 mais recentes no geral:');
    paged.items.forEach(i => console.log(`- [${i.canal}] ${i.cliente_nome || i.session_id} (updated: ${i.updated}, msgs: ${i.mensagens?.length})`));

    // Teste 2: Buscar WhatsApp ordenadas por -updated
    const pagedWa = await pb.collection('lia_conversas').getList(1, 5, {
      filter: 'canal = "whatsapp"',
      sort: '-updated'
    });
    console.log('\nTop 5 WhatsApp mais recentes:');
    pagedWa.items.forEach(i => console.log(`- [${i.canal}] ${i.cliente_nome || i.session_id} (updated: ${i.updated}, msgs: ${i.mensagens?.length})`));

  } catch (e) {
    console.error('Erro:', e.message, e.data);
  }
}

testQuery();

