import pb from './apps/api/src/utils/pocketbaseClient.js';

setTimeout(async () => {
    try {
        const collection = await pb.collections.getOne('solicitacoes_revendedor');
        console.log(JSON.stringify(collection.fields, null, 2));
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}, 2000);
