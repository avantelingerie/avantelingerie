import 'dotenv/config';
import pb from './src/utils/pocketbaseClient.js';

async function check() {
    await pb.collection('_superusers').authWithPassword(process.env.PB_SUPERUSER_EMAIL, process.env.PB_SUPERUSER_PASSWORD);
    const col = await pb.collections.getOne('lia_conversas');
    console.log(JSON.stringify(col, null, 2));
}
check().catch(e => console.error(e.message));
