import pb from '../apps/api/src/utils/pocketbaseClient.js';
import fs from 'fs';

async function testUpdate() {
  const prod = await pb.collection('products').getOne('1y126wty2qdkcf2');
  console.log('Produto atual:', prod.name);
  console.log('Imagens atuais (image):', prod.image);
  console.log('Galeria atual (gallery):', prod.gallery);
  console.log('gallery_labels atual:', prod.gallery_labels);
}

testUpdate().catch(console.error);
