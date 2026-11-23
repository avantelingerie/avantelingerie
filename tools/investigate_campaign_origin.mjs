import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf8'));

console.log('--- INVESTIGANDO ORIGEM DAS CONVERSAS ---');
const whatsappFirstMsgs = {};
const siteFirstMsgs = {};
const metadataList = [];

for (const c of raw) {
  let msgs = [];
  try {
    msgs = typeof c.mensagens === 'string' ? JSON.parse(c.mensagens) : (c.mensagens || []);
  } catch(e) {}

  const firstUserMsg = msgs.find(m => m.role === 'user');
  const text = firstUserMsg ? firstUserMsg.content : '';

  if (c.canal === 'whatsapp') {
    whatsappFirstMsgs[text] = (whatsappFirstMsgs[text] || 0) + 1;
  } else {
    siteFirstMsgs[text] = (siteFirstMsgs[text] || 0) + 1;
  }

  if (c.metadata && Object.keys(c.metadata).length > 0) {
    metadataList.push({ id: c.id, canal: c.canal, metadata: c.metadata });
  }
}

console.log('\nTop Primeiras Mensagens no WhatsApp:');
console.log(JSON.stringify(whatsappFirstMsgs, null, 2));

console.log('\nTop Primeiras Mensagens no Site (Web Chat):');
console.log(JSON.stringify(siteFirstMsgs, null, 2));

console.log('\nExemplos de Metadados salvos:', metadataList.slice(0, 5));
