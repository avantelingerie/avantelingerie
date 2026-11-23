import fs from 'fs';
import path from 'path';

const dumpPath = path.resolve('scratch/lia_conversas_dump.json');
const conversas = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));

console.log(`Analisando ${conversas.length} atendimentos da Lia...`);

const productMentions = [];
const customerIntents = [];
const categoryStats = {
  conjuntos: 0,
  sutias: 0,
  calcinhas: 0,
  bodies: 0,
  camisolas_pijamas: 0,
  plus_size: 0,
  sem_bojo: 0,
  com_bojo: 0,
  renda: 0,
  fio_duplo: 0,
  linha_noiva_branco: 0,
  outros: 0
};

const keywordsMap = [
  { term: 'conjunto', cat: 'conjuntos' },
  { term: 'sutiã', cat: 'sutias' },
  { term: 'sutia', cat: 'sutias' },
  { term: 'calcinha', cat: 'calcinhas' },
  { term: 'tanga', cat: 'calcinhas' },
  { term: 'fio', cat: 'fio_duplo' },
  { term: 'body', cat: 'bodies' },
  { term: 'bory', cat: 'bodies' },
  { term: 'camisola', cat: 'camisolas_pijamas' },
  { term: 'pijama', cat: 'camisolas_pijamas' },
  { term: 'baby doll', cat: 'camisolas_pijamas' },
  { term: 'plus', cat: 'plus_size' },
  { term: 'tamanho especial', cat: 'plus_size' },
  { term: '48', cat: 'plus_size' },
  { term: '50', cat: 'plus_size' },
  { term: '52', cat: 'plus_size' },
  { term: 'sem bojo', cat: 'sem_bojo' },
  { term: 'com bojo', cat: 'com_bojo' },
  { term: 'bojo', cat: 'com_bojo' },
  { term: 'renda', cat: 'renda' },
  { term: 'rendado', cat: 'renda' },
  { term: 'noiva', cat: 'linha_noiva_branco' },
  { term: 'branco', cat: 'linha_noiva_branco' }
];

conversas.forEach((conv, idx) => {
  const msgs = conv.mensagens || [];
  if (msgs.length === 0) return;

  const userMsgs = msgs.filter(m => m.role === 'user');
  if (userMsgs.length === 0) return;

  const allUserText = userMsgs.map(m => m.content).join(' ');
  const allConvText = msgs.map(m => `${m.role}: ${m.content}`).join('\n');

  // Rastrear menções de produtos e desejos
  const mentionsInThisConv = [];

  keywordsMap.forEach(kw => {
    const regex = new RegExp(`\\b${kw.term}\\b`, 'i');
    if (regex.test(allUserText)) {
      categoryStats[kw.cat]++;
      mentionsInThisConv.push(kw.term);
    }
  });

  customerIntents.push({
    id: conv.id,
    session_id: conv.session_id,
    canal: conv.canal,
    updated: conv.updated,
    total_user_msgs: userMsgs.length,
    user_queries: userMsgs.map(m => m.content),
    mentions: [...new Set(mentionsInThisConv)],
    full_dialogue: msgs
  });
});

console.log('Conversas com mensagens de usuários:', customerIntents.length);
console.log('Estatísticas brutas de categorias:', categoryStats);

const outputPath = path.resolve('scratch/lia_analysis_summary.json');
fs.writeFileSync(outputPath, JSON.stringify({
  total_conversas: conversas.length,
  com_interacao_usuario: customerIntents.length,
  estatisticas_categorias: categoryStats,
  atendimentos_com_desejos: customerIntents
}, null, 2), 'utf-8');

console.log(`Resumo salvo em: ${outputPath}`);
