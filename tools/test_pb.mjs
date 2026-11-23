import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function main() {
  try {
    console.log('Testando conexão com PocketBase em:', pb.baseUrl);
    const collections = await pb.collections.getFullList();
    console.log('Coleções disponíveis:', collections.map(c => c.name));

    // Verificar se existe a coleção 'categories' ou 'categorias'
    const catCol = collections.find(c => c.name === 'categories' || c.name === 'categorias');
    if (catCol) {
      console.log(`Coleção de categorias encontrada: ${catCol.name}`);
      const cats = await pb.collection(catCol.name).getFullList();
      console.log('Categorias existentes:', cats.map(c => ({ id: c.id, nome: c.name || c.nome, slug: c.slug })));
    }

    // Verificar coleção de produtos
    const prodCol = collections.find(c => c.name === 'products' || c.name === 'produtos');
    if (prodCol) {
      console.log(`Coleção de produtos encontrada: ${prodCol.name}`);
      const fields = prodCol.fields || prodCol.schema;
      console.log('Campos do produto:', fields.map(f => f.name));
      const sample = await pb.collection(prodCol.name).getFirstListItem('');
      console.log('Exemplo de produto:', {
        id: sample.id,
        name: sample.name || sample.nome,
        price: sample.price,
        status: sample.status,
        cores: sample.cores,
        tamanhos: sample.tamanhos,
        images: sample.image || sample.images,
        categoria: sample.categoria || sample.category || sample.categorias
      });
    }
  } catch (err) {
    console.error('Erro na conexão:', err);
  }
}

main();
