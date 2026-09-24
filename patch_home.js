const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/HomePage.jsx', 'utf8');

code = code.replace(/pb\.collection\('products'\)\.getList\(1, 4,/g, "pb.collection('products').getList(1, 8,");

fs.writeFileSync('apps/web/src/pages/HomePage.jsx', code);
console.log('Patched HomePage.jsx limit to 8');