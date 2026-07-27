import pb from './apps/api/src/utils/pocketbaseClient.js';

setTimeout(async () => {
    try {
        const collection = await pb.collections.update('solicitacoes_revendedor', {
            updateRule: '@request.auth.id != ""'
        });
        console.log("Updated collection rule successfully");
        console.log(collection.updateRule);
        process.exit(0);
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}, 2000);
