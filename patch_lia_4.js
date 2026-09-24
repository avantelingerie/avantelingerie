const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');
code = code.replace(/\\N+'CATÁLOGO DA LOJA (USAR PARA GERAR LINKS CLICÁVEIS CORRETOS):\\n\\n';', "'CATÅLOGO DA LOJA (USAR PARA GERAR LINKS CLICÁVEIS CORRETOS):\\n\\n';");
code = code.replace(/\\n\\n'CATEGORIAS:\\n';/g, "'CATEGORIAS:\\n';");
code = code.replace(/\\n\\n'PRODUTOS:\\n';/g, "'PRODUTOS:\\n';");
fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Fixed syntax');