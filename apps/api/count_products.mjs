import 'dotenv/config';
import pb from './src/utils/pocketbaseClient.js';

async function count() {
    await pb.collection('_superusers').authWithPassword(process.env.PB_SUPERUSER_EMAIL, process.env.PB_SUPERUSER_PASSWORD);
    const records = await pb.collection('produtos').getList(1, 10, { filter: 'ativo = true' });
    console.log("Total de produtos ativos:", records.totalItems);
}
count().catch(console.error);
