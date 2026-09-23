const fs = require('fs');
let code = fs.readFileSync('apps/web/src/pages/HomePage.jsx', 'utf8');
code = code.replace(
  '<div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-all duration-500">',
  '<div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-all duration-500 z-20 pointer-events-none">'
p;
fs.writeFileSync('apps/web/src/pages/HomePage.jsx', code);
console.log('Fixed z-index');