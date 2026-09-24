const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/HomePage.jsx', 'utf8');
code = code.replace(/\.slice\(0, 4\)/g, '.slice(0, 8)');
fs.writeFileSync('apps/web/src/pages/HomePage.jsx', code);
console.log('Patched slice to 8');