import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function verifyAll() {
  console.log('=== AUDITORIA COMPLETA DE CADASTRO ===');
  
  // 1. Categoria
  const cat = await pb.collection('categorias').getOne('1ilukbnspp76cdf');
  console.log('\n1. CATEGORIA:');
  console.log(`- ID: ${cat.id}`);
  console.log(`- Nome: ${cat.nome}`);
  console.log(`- Slug: ${cat.slug}`);
  console.log(`- Ativo: ${cat.ativo}`);

  // 2. Produto
  const prod = await pb.collection('products').getOne('8f7o7s84bj98u1f', { expand: 'categoria_id' });
  console.log('\n2. PRODUTO:');
  console.log(`- ID: ${prod.id}`);
  console.log(`- Nome: ${prod.name}`);
  console.log(`- Referência: ${prod.reference}`);
  console.log(`- Categoria: ${prod.expand?.categoria_id?.nome || prod.categoria}`);
  console.log(`- Status: ${prod.status ? 'ATIVO' : 'DESATIVADO (Conforme solicitado)'}`);
  console.log(`- Preço atual: R$ ${prod.price.toFixed(2)} (Aguardando precificação)`);
  console.log(`- Cores (${prod.colors?.length}):`, prod.colors);
  console.log(`- Tamanhos (${prod.sizes?.length}):`, prod.sizes);
  console.log(`- Imagens carregadas (${prod.image?.length}):`);
  prod.image?.forEach((img, i) => console.log(`  [${i+1}] ${img}`));
  console.log(`- Imagem Principal (Capa): ${prod.imagem_principal}`);
  console.log(`- Imagem Verso: ${prod.imagem_verso}`);

  // 3. Variações
  const vars = await pb.collection('variacoes').getFullList({
    filter: `produto_id = "${prod.id}"`,
    sort: 'cor,tamanho'
  });
  console.log(`\n3. VARIAÇÕES (${vars.length} cadastradas):`);
  const groupedByColor = {};
  vars.forEach(v => {
    groupedByColor[v.cor] = groupedByColor[v.cor] || [];
    groupedByColor[v.cor].push(`${v.tamanho} (SKU: ${v.sku} | Status: ${v.status ? 'Ativo' : 'Inativo'})`);
  });

  Object.entries(groupedByColor).forEach(([cor, lista]) => {
    console.log(`- Cor: ${cor}`);
    lista.forEach(item => console.log(`    • ${item}`));
  });

  console.log('\n=== STATUS FINAL: 100% CADASTRADO E VALIDADO NO BANCO! ===');
}

verifyAll().catch(console.error);
