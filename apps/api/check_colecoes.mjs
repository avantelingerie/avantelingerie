import pb from './src/utils/pocketbaseClient.js';

async function checkCollections() {
  try {
    const cols = await pb.collection('colecoes').getFullList();
    console.log('Coleções:', cols.map(c => ({ id: c.id, nome: c.nome, slug: c.slug })));
  } catch (err) {
    console.error('Erro ao consultar coleções:', err.message);
  }
}

checkCollections();
