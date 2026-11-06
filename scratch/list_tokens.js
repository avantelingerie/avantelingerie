const PocketBase = require('pocketbase/cjs');

async function listIntegracoes() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const records = await pb.collection('integracoes_config').getFullList();
  records.forEach(r => console.log(`${r.servico} -> ${r.chave_nome}: ${r.chave_valor?.slice(0, 15)}... (ativo: ${r.ativo})`));
}

listIntegracoes().catch(console.error);

