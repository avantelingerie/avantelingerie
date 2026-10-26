import PocketBase from 'pocketbase';

const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    const res = await pb.collection('products').getList(1, 3, { filter: 'name ~ "Calcinha"' });
    console.log('Total items:', res.items.length);
    for (const p of res.items) {
      console.log('--- PRODUCT ---');
      console.log('id:', p.id);
      console.log('name:', p.name);
      console.log('nome_produto:', p.nome_produto);
      console.log('image:', p.image);
      console.log('imagem_principal:', p.imagem_principal);
      console.log('imagem_produto:', p.imagem_produto);
      console.log('gallery:', p.gallery);
      console.log('collectionId:', p.collectionId);
      if (p.image) console.log('pb.files.getUrl(p, p.image):', pb.files.getUrl(p, p.image));
      if (p.imagem_principal) console.log('pb.files.getUrl(p, p.imagem_principal):', pb.files.getUrl(p, p.imagem_principal));
      if (p.gallery && p.gallery.length > 0) console.log('pb.files.getUrl(p, p.gallery[0]):', pb.files.getUrl(p, p.gallery[0]));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
