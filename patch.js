const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');
const startIdx = code.indexOf('async function getLiaProducts() {');
const endIdx = code.indexOf('// Helper para buscar as', startIdx);
const newFunc = `async function getLiaProducts() {
  try {
    let catalogText = 'CATÁLOGO DA LOJA (USE PARA GERAR LINKS EXATOS NO MARKDOWN):\\n\\n';
    try {
      const cats = await pb.collection('categorias').getFullList({ filter: 'ativo = true' });
      catalogText += 'CATEGORIAS:\\n';
      cats.forEach(c => { catalogText += '- ' + c.nome + ' | URL: /categoria/' + c.slug + '\\n'; });
    } catch(e) {}
    try {
      const prods = await pb.collection('products').getFullList({ filter: 'status = true' });
      catalogText += '\\nPRODUTOS:\\n';
      prods.forEach(p => { catalogText += '- ' + (p.name || p.nome) + ' | URL: /produto/' + p.slug + '\\n'; });
    } catch(e) {}
    return catalogText;
  } catch (err) { return ''; }
}

`;
code = code.substring(0, startIdx) + newFunc + code.substring(endIdx);
fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Patched');
