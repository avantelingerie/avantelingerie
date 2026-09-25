const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/lia.js', 'utf8');
code = code.replace(/https:\/\/avantelingerie\.com\.br\/produto\/slug \(substitua 'slug' pela URL do cat[a-z\u00E0-\u00FC]+logo abaixo\)\./g, "https://avantelingerie.com.br/produto/ID_DO_PRODUTO (CRÍTICO: Copie o ID EXATAMENTE como está no catálogo, não misture os links!).");
fs.writeFileSync('apps/api/src/routes/lia.js', code);
console.log('Fix aplicado');
