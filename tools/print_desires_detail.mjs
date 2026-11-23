import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/stats_desires_detailed.json', 'utf8'));

console.log('=== CLIENTES DE ATACADO COM PRODUTOS ===');
data.clients_atacado.forEach((c, i) => {
  if (c.products && c.products.length > 0 || c.phone || c.name) {
    console.log(`\n[${i+1}] Nome: ${c.name || 'Não identificado'} | Tel/WhatsApp: ${c.phone || c.id} | Canal: ${c.channel}`);
    console.log(`    Produtos: ${c.products.join(', ')}`);
    console.log(`    Mensagem: ${c.clientMsgs}`);
  }
});

console.log('\n=== CLIENTES DE VAREJO COM PRODUTOS ===');
data.clients_varejo.forEach((c, i) => {
  if (c.products && c.products.length > 0 || c.phone || c.name) {
    console.log(`\n[${i+1}] Nome: ${c.name || 'Não identificado'} | Tel/WhatsApp: ${c.phone || c.id} | Canal: ${c.channel}`);
    console.log(`    Produtos: ${c.products.join(', ')}`);
    console.log(`    Mensagem: ${c.clientMsgs}`);
  }
});
