import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function verify() {
  const prod = await pb.collection('products').getOne('1y126wty2qdkcf2');
  const vars = await pb.collection('variacoes').getFullList({ filter: `produto_id = "${prod.id}"` });
  console.log('--- AUDITORIA DE VERIFICAÇÃO ---');
  console.log('Produto:', prod.name);
  console.log('Total de imagens:', prod.image.length);
  console.log('Galeria (gallery):', prod.gallery?.length, 'itens');
  console.log('Gallery labels:', prod.gallery_labels);
  console.log('Total de variações:', vars.length, 'variações');
  console.log('Status do produto:', prod.status ? 'Ativo' : 'Desativado');
  console.log('Preço:', prod.price);
  console.log('URL da nova imagem:', `https://avantelingerie.com.br/hcgi/platform/api/files/products/${prod.id}/${prod.image[6]}`);
}

verify().catch(console.error);
