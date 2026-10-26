import pb from '../apps/api/src/utils/pocketbaseClient.js';
import dotenv from 'dotenv';
dotenv.config({ path: './apps/api/.env' });

async function run() {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );
    const configs = await pb.collection('integracoes_config').getFullList();
    console.log('--- Todos os Registros em integracoes_config ---');
    for (const c of configs) {
      console.log(`[${c.servico}] ${c.chave_nome} = ${c.chave_nome.includes('token') || c.chave_nome.includes('secret') || c.chave_nome.includes('sk_') ? '***' : c.chave_valor}`);
    }
  } catch (err) {
    console.error('Erro:', err.message);
  }
}
run();
