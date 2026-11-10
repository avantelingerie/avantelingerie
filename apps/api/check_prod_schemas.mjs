import pb from './src/utils/pocketbaseClient.js';

async function checkProductSchemas() {
  try {
    const productsCol = await pb.collections.getOne('products');
    console.log('--- CAMPOS DE PRODUCTS ---');
    console.log(productsCol.fields.map(f => ({ name: f.name, type: f.type, required: f.required })));

    const variacoesCol = await pb.collections.getOne('variacoes');
    console.log('\n--- CAMPOS DE VARIACOES ---');
    console.log(variacoesCol.fields.map(f => ({ name: f.name, type: f.type, required: f.required })));

    // Categorias existentes
    const categorias = await pb.collection('categorias').getFullList();
    console.log('\n--- CATEGORIAS EXISTENTES ---');
    console.log(categorias.map(c => ({ id: c.id, nome: c.nome, slug: c.slug })));

    // Um produto de exemplo para vermos como estão cadastrados os atuais
    const sampleProduct = await pb.collection('products').getList(1, 1);
    console.log('\n--- PRODUTO DE EXEMPLO ---');
    console.log(sampleProduct.items[0]);

  } catch (err) {
    console.error('Erro:', err.message);
  }
}

checkProductSchemas();
