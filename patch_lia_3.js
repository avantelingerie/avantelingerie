const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');

const regex = /async function getLiaProducts\(\) \{[\S\s]*?\n}\n/;
const newFunction = `async function getLiaProducts() {
  try {
    let catalogText = 'CATÁLOGO DA LOJA (USAR PARA GERAR LINKS CLICÁVEIS CORRETOS):\n\n';
    
    // Categorias
    try {
      const cats = await pb.collection('categorias').getFullList({ filter: 'ativo = true' });
      if (cats.length > 0) {
        catalogText += 'CATEGORIAS:\n';
        cats.forEach(c => {
          catalogText += \"- \" + c.nome + \" | URL: /categoria/\" + c.slug + \"\\n\";
        });
        catalogText += '\\n';
      }
    } catch(e) {}

    // Produtos
    try {
      const prods = await pb.collection('products').getFullList({ filter: 'status = true' });
      if (prods.length > 0) {
        catalogText += 'PRODUTOS:\n';
        prods.forEach(p => {
          catalogText += \"- \" + (p.name || p.nome) + \" | Pre\\u00e7o: R$ \" + Number(p.preco).toFixed(2) + \" | URL: /produto/\" + p.slug + \"\\n\";
        });
      }
    } catch(e) {}
    
    return catalogText;
  } catch (err) {
    logger.error('Aviso RAG de Produtos: ' + err.message);
    return ''; 
  }
}\n`;

code = code.replace(regex, newFunction);
fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Fixed Lia products');