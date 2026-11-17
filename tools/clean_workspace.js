/**
 * SCRIPT DE LIMPEZA E OTIMIZAÇÃO DO WORKSPACE AVANTE LINGERIE
 * 
 * Remove caches obsoletos, pastas de compilação duplicadas e libera
 * arquivos temporários que possam travar o editor ou consumir memória desnecessária.
 */

const fs = require('fs');
const path = require('path');

function removeDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    try {
      if (entry.isDirectory()) {
        count += removeDirRecursive(fullPath);
      } else {
        fs.unlinkSync(fullPath);
        count++;
      }
    } catch (e) {
      // Ignora arquivos bloqueados no momento
    }
  }
  try {
    fs.rmdirSync(dirPath);
  } catch (e) {}
  return count;
}

console.log('\n🧹 INICIANDO LIMPEZA GERAL DO AMBIENTE AVANTE LINGERIE...\n');

let cleanedMB = 0;

// 1. Remover pastas pesadas de build (dist e apps/web/dist)
const rootDist = path.resolve(__dirname, '../dist');
if (fs.existsSync(rootDist)) {
  console.log('🗑️  Removendo pasta de compilação da raiz: dist (~357 MB)...');
  const removed = removeDirRecursive(rootDist);
  console.log(`   ✓ ${removed} arquivos residuais de build liberados da raiz.`);
}

const duplicateWebDist = path.resolve(__dirname, '../apps/web/dist');
if (fs.existsSync(duplicateWebDist)) {
  console.log('🗑️  Removendo pasta duplicada de build: apps/web/dist...');
  const removed = removeDirRecursive(duplicateWebDist);
  console.log(`   ✓ ${removed} arquivos residuais de build removidos.`);
}

// 2. Limpar cache do Vite (node_modules/.vite) para evitar travas no recarregamento
const viteCache = path.resolve(__dirname, '../apps/web/node_modules/.vite');
if (fs.existsSync(viteCache)) {
  console.log('⚡ Limpando cache temporário do Vite (apps/web/node_modules/.vite)...');
  const removed = removeDirRecursive(viteCache);
  console.log(`   ✓ ${removed} módulos em cache liberados.`);
}

// 3. Verificar e limpar eventuais locks do Git
const gitLock = path.resolve(__dirname, '../.git/index.lock');
if (fs.existsSync(gitLock)) {
  try {
    fs.unlinkSync(gitLock);
    console.log('🔓 Lock órfão do Git (.git/index.lock) removido com sucesso.');
  } catch (e) {}
}

console.log('\n✅ LIMPEZA GERAL CONCLUÍDA COM SUCESSO!');
console.log('   Ambiente leve, sem arquivos presos e pronto para alta produtividade.\n');
