import 'dotenv/config';
import Pocketbase from 'pocketbase';

const pb = new Pocketbase('http://localhost:8090');

async function run() {
    try {
        console.log("Autenticando...");
        await pb.collection('_superusers').authWithPassword(
            process.env.PB_SUPERUSER_EMAIL,
            process.env.PB_SUPERUSER_PASSWORD
        );
        
        for (const colName of ['lia_conversas', 'lia_knowledge']) {
            console.log(`Atualizando ${colName}...`);
            const col = await pb.collections.getOne(colName);
            
            const hasCreated = col.fields.find(f => f.name === 'created');
            if (!hasCreated) {
                col.fields.push({ name: 'created', type: 'autodate', required: false, options: { onCreate: true, onUpdate: false } });
                col.fields.push({ name: 'updated', type: 'autodate', required: false, options: { onCreate: true, onUpdate: true } });
                await pb.collections.update(colName, col);
                console.log(`${colName} atualizada com os campos de data!`);
            } else {
                console.log(`${colName} já possui campos de data.`);
            }
        }
        console.log("Pronto!");
    } catch(err) {
        console.error("Erro fatal: ", err.response?.data || err.message);
    }
}
run();
