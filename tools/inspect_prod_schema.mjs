import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function inspect() {
  const catCollection = await pb.collections.getOne('categorias');
  console.log('Categorias Schema:', catCollection.fields || catCollection.schema);

  const prodCollection = await pb.collections.getOne('products');
  console.log('Products Schema Fields:');
  const fields = prodCollection.fields || prodCollection.schema;
  fields.forEach(f => {
    console.log(`- ${f.name} (${f.type})`);
  });

  const products = await pb.collection('products').getList(1, 3);
  console.log('\nExemplo detalhado de produtos:');
  products.items.forEach(p => {
    console.log({
      id: p.id,
      name: p.name,
      categoria: p.categoria,
      categoria_id: p.categoria_id,
      colors: p.colors,
      sizes: p.sizes,
      cores_disponiveis: p.cores_disponiveis,
      tamanhos_disponiveis: p.tamanhos_disponiveis,
      gallery_labels: p.gallery_labels,
      stock: p.stock,
      price: p.price,
      price_wholesale: p.price_wholesale,
      status: p.status
    });
  });
}

inspect();
