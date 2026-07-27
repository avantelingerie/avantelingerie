import pb from './utils/pocketbaseClient.js';

async function check() {
  try {
    await pb.collection('_superusers').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log("Authenticated successfully");

    const collections = await pb.collections.getFullList();
    console.log("COLLECTIONS:", collections.map(c => c.name));

    // If 'integracoes_config' exists, dump its entries
    try {
      const configs = await pb.collection('integracoes_config').getFullList();
      console.log("INTEGRACOES CONFIGS:");
      for (const c of configs) {
        console.log(`  servico: ${c.servico} | chave: ${c.chave_nome} | valor: ${c.chave_valor}`);
      }
    } catch (e) {
      console.log("No config collection or error reading it");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

check();
