import fs from 'fs';
const content = fs.readFileSync('apps/api/src/routes/shipping.js', 'utf8');
const lines = content.split('\n');
const templateLines = lines.slice(1575, 2101).join('\n');
const regex = /\$\{([^}]+)\}/g;
let m;
const vars = [];
while ((m = regex.exec(templateLines)) !== null) {
  vars.push(m[1].trim());
}
console.log('Total expressions:', vars.length);
console.log('Expressions:');
vars.forEach(v => console.log(' - ' + v));

