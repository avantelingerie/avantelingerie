import fs from 'fs';
import path from 'path';

const dumpPath = path.resolve('scratch/lia_conversas_dump.json');
const conversas = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));

console.log('=== ANALISANDO TEXTOS REAIS DOS CLIENTES ===');

const dialoguesWithProducts = [];

conversas.forEach((c) => {
  const msgs = c.mensagens || [];
  const userMsgs = msgs.filter(m => m.role === 'user').map(m => m.content);
  if (userMsgs.length === 0) return;

  const combined = userMsgs.join(' | ');

  // Se tem perguntas com produtos, preços, modelos, catálogo, atacado, etc.
  dialoguesWithProducts.push({
    session: c.session_id,
    canal: c.canal,
    data: c.updated || c.created,
    userMsgs: userMsgs,
    full: msgs
  });
});

console.log(`Total com mensagens de clientes: ${dialoguesWithProducts.length}`);

// Grava arquivo de texto legível para inspeção
let textReport = '';
dialoguesWithProducts.forEach((d, i) => {
  textReport += `\n======================================================\n`;
  textReport += `CLIENTE #${i+1} [${d.canal}] Session: ${d.session}\nData: ${d.data}\n`;
  textReport += `MENSAGENS DO CLIENTE:\n`;
  d.userMsgs.forEach(m => {
    textReport += `  -> "${m}"\n`;
  });
  textReport += `DIÁLOGO COMPLETO:\n`;
  d.full.forEach(m => {
    textReport += `    [${m.role}]: ${m.content}\n`;
  });
});

fs.writeFileSync('scratch/dialogos_completos.txt', textReport, 'utf-8');
console.log('Relatório de diálogos gravado em scratch/dialogos_completos.txt');
