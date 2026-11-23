import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf-8'));

console.log('=== INVESTIGANDO CONJUNTOS E TODOS OS OUTROS MODELOS ===');

const conjuntoMentions = [];
const otherModelsMentions = [];

dump.forEach(conv => {
  const msgs = conv.mensagens || [];
  const userMsgs = msgs.filter(m => m.role === 'user').map(m => m.content);
  if (!userMsgs.length) return;

  const userText = userMsgs.join(' ');
  if (userText.includes('Shopee') && userText.includes('coleta da sua loja')) return;

  const fullText = msgs.map(m => `[${m.role}]: ${m.content}`).join('\n');

  if (/conjunto|conjuntos/i.test(userText) || /conjunto|conjuntos/i.test(fullText)) {
    conjuntoMentions.push({
      session: conv.session_id,
      canal: conv.canal,
      data: conv.updated,
      userQueries: userMsgs,
      context: fullText
    });
  }

  // Outros modelos específicos
  if (/tomara|cropped|body|bory|corpete|espartilho|robe|babydoll|baby doll|camisola|pijama|fitness|calçola|fio|reforçado|nadador|amamenta|strappy/i.test(userText)) {
    otherModelsMentions.push({
      session: conv.session_id,
      canal: conv.canal,
      data: conv.updated,
      userQueries: userMsgs
    });
  }
});

console.log(`Total de conversas citando CONJUNTOS: ${conjuntoMentions.length}`);
console.log(`Total de conversas citando OUTROS MODELOS ESPECÍFICOS: ${otherModelsMentions.length}`);

console.log('\n--- DETALHES DE CONJUNTOS ---');
conjuntoMentions.forEach((c, idx) => {
  console.log(`\n[CONJUNTO #${idx+1}] Canal: ${c.canal} (${c.session})`);
  c.userQueries.forEach(q => console.log(`  -> "${q}"`));
});
