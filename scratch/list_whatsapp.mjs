import PocketBase from 'pocketbase';

async function listWhatsApp() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const records = await pb.collection('lia_conversas').getFullList({
      filter: 'canal = "whatsapp"'
    });
    console.log(`Encontradas ${records.length} conversas de WhatsApp:`);
    records.forEach((r, idx) => {
      const msgs = r.mensagens || [];
      const lastMsg = msgs[msgs.length - 1];
      console.log(`\n--- [${idx + 1}] ID: ${r.id} | Session: ${r.session_id} | Msgs: ${msgs.length} | Assumida: ${r.assumida_por_humano}`);
      msgs.forEach((m, mIdx) => {
        console.log(`  [${mIdx}] ${m.role || m.sender}: ${m.content} (ts: ${m.timestamp || 'sem-ts'})`);
      });
    });
  } catch (err) {
    console.error('Erro:', err);
  }
}

listWhatsApp();

