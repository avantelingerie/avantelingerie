import pb from '../apps/api/src/utils/pocketbaseClient.js';
import dotenv from 'dotenv';
dotenv.config({ path: './apps/api/.env' });

async function run() {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );
    const configs = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "mercadopago"',
    });
    console.log('--- Configs Mercado Pago no PocketBase ---');
    for (const c of configs) {
      const isSecret = c.chave_nome.includes('token') || c.chave_nome.includes('secret');
      console.log(`${c.chave_nome}: ${isSecret ? '***' + c.chave_valor.slice(-4) : c.chave_valor}`);
    }
  } catch (err) {
    console.error('Erro:', err.message);
  }
}
run();
