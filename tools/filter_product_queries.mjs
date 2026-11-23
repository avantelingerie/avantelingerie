import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf-8'));

const findings = [];

dump.forEach((conv, idx) => {
  const msgs = conv.mensagens || [];
  const userMsgs = msgs.filter(m => m.role === 'user');
  if (!userMsgs.length) return;

  const text = userMsgs.map(m => m.content).join(' ');

  // Busca se tem qualquer termo relevante de produto, modelo, preço, foto, catálogo, atacado, etc.
  const hasProductQuery = /(preço|preco|valor|quanto|catalogo|catálogo|foto|modelo|conjunto|calcinha|sutiã|sutia|body|bory|cropped|renda|algodao|algodão|fio|tanga|camisola|pijama|robe|short|cinta|modelador|plus|tamanho|GG|G|M|P|48|50|52|maternidade|amamenta|cueca|fitness|top|revend|atacado|grade|cor|cores|pecas|peças)/i.test(text);

  if (hasProductQuery) {
    findings.push({
      id: conv.id,
      session: conv.session_id,
      canal: conv.canal,
      data: conv.updated,
      userTexts: userMsgs.map(m => m.content),
      allMsgs: msgs
    });
  }
});

console.log(`Conversas com consultas de produtos/preços/desejos: ${findings.length}`);

findings.forEach((f, i) => {
  console.log(`\n--- CASO #${i+1} [${f.canal}] (${f.session}) ---`);
  f.userTexts.forEach(u => console.log(`  CLIENTE: "${u}"`));
});
