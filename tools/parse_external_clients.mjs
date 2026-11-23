import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf-8'));

console.log('=== SEPARANDO ATENDIMENTOS DE CLIENTES EXTERNOS ===');

const externalClients = [];

dump.forEach((c) => {
  const msgs = c.mensagens || [];
  const userMsgs = msgs.filter(m => m.role === 'user');
  if (!userMsgs.length) return;

  const userText = userMsgs.map(m => m.content).join(' ');

  // Se não for Shopee bot notification e tiver mensagem
  if (userText.includes('Shopee') && userText.includes('coleta da sua loja')) return;

  externalClients.push({
    id: c.id,
    session: c.session_id,
    canal: c.canal,
    updated: c.updated,
    userMsgs: userMsgs.map(m => m.content),
    dialogue: msgs
  });
});

console.log(`Total de conversas reais de clientes: ${externalClients.length}`);

// Gravar em arquivo
let summary = '';
externalClients.forEach((cl, i) => {
  summary += `\n=========================================\n`;
  summary += `ATENDIMENTO #${i+1} | CANAL: ${cl.canal} | ID: ${cl.session}\n`;
  summary += `MENSAGENS DO CLIENTE:\n`;
  cl.userMsgs.forEach(m => summary += `  - "${m}"\n`);
  summary += `RESUMO DO DIÁLOGO:\n`;
  cl.dialogue.forEach(d => {
    summary += `    [${d.role}]: ${d.content}\n`;
  });
});

fs.writeFileSync('scratch/atendimentos_reais.txt', summary, 'utf-8');
console.log('Gravado em scratch/atendimentos_reais.txt');
