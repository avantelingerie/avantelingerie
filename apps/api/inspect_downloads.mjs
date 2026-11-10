import fs from 'fs';
import path from 'path';

function inspectDir(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  console.log(`\n📁 Diretório: ${dir}`);
  for (const item of items) {
    if (item.isDirectory()) {
      const subPath = path.join(dir, item.name);
      const files = fs.readdirSync(subPath);
      console.log(`\n  📂 Subpasta: [${item.name}] (${files.length} arquivos)`);
      files.forEach(f => console.log(`     - ${f}`));
    } else {
      console.log(`  📄 Arquivo: ${item.name}`);
    }
  }
}

console.log('=== INSPEÇÃO FITNESS TUDO ===');
inspectDir('C:\\Users\\comer\\Downloads\\Fitness tudo');

console.log('\n=== INSPEÇÃO CAMISOLA RENDA ===');
inspectDir('C:\\Users\\comer\\Downloads\\camisola_renda');
