import fs from 'fs';
import path from 'path';

const baseDir = 'C:\\Users\\comer\\Downloads\\Fitness tudo';

try {
    const items = fs.readdirSync(baseDir);
    const okFolders = items.filter(item => {
        const full = path.join(baseDir, item);
        return fs.statSync(full).isDirectory() && item.includes('_OK');
    });

    console.log(`Encontradas ${okFolders.length} pastas com _OK:\n`);

    for (const folder of okFolders) {
        const fullPath = path.join(baseDir, folder);
        const files = fs.readdirSync(fullPath);
        console.log(`📁 PASTA: "${folder}" (${files.length} arquivos)`);
        files.slice(0, 8).forEach(f => console.log(`   - ${f}`));
        if (files.length > 8) console.log(`   ... e mais ${files.length - 8} arquivos`);
        console.log('');
    }
} catch (e) {
    console.error('Erro:', e.message);
}

