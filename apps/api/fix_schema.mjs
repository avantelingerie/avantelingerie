import 'dotenv/config';
import pb from './src/utils/pocketbaseClient.js';

async function fixSchema() {
    await pb.collection('_superusers').authWithPassword(process.env.PB_SUPERUSER_EMAIL, process.env.PB_SUPERUSER_PASSWORD);
    
    // Fix lia_conversas
    try {
        const col = await pb.collections.getOne('lia_conversas');
        col.fields = [
            ...col.fields,
            { name: "session_id", type: "text", required: true },
            { name: "canal", type: "text" },
            { name: "mensagens", type: "json" },
            { name: "converteu", type: "bool" },
            { name: "assumida_por_humano", type: "bool" }
        ];
        // Remove duplicates if any
        const uniqueFields = [];
        const seen = new Set();
        for (const f of col.fields) {
            if (!seen.has(f.name)) {
                seen.add(f.name);
                uniqueFields.push(f);
            }
        }
        col.fields = uniqueFields;
        await pb.collections.update('lia_conversas', col);
        console.log("lia_conversas atualizada com sucesso!");
    } catch (e) {
        console.error("Erro lia_conversas:", e.message);
    }

    // Fix lia_knowledge
    try {
        const col2 = await pb.collections.getOne('lia_knowledge');
        col2.fields = [
            ...col2.fields,
            { name: "titulo", type: "text", required: true },
            { name: "conteudo", type: "text" },
            { name: "ativo", type: "bool" },
            { name: "data_expiracao", type: "date" }
        ];
        const uniqueFields2 = [];
        const seen2 = new Set();
        for (const f of col2.fields) {
            if (!seen2.has(f.name)) {
                seen2.add(f.name);
                uniqueFields2.push(f);
            }
        }
        col2.fields = uniqueFields2;
        await pb.collections.update('lia_knowledge', col2);
        console.log("lia_knowledge atualizada com sucesso!");
    } catch (e) {
        console.error("Erro lia_knowledge:", e.message);
    }
}

fixSchema();
