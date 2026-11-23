import pb from '../apps/api/src/utils/pocketbaseClient.js';
import fs from 'fs';

const imagePath = 'C:/Users/comer/.gemini/antigravity/brain/b05540c7-8f43-47a4-9c0b-1cdb3a4da001/.user_uploaded/media_1795461810798_9ceaec1e.jpg';

async function addPromoImage() {
  console.log('--- ADICIONANDO FOTO PROMOCIONAL À CALCINHA TAILANDESA ---');
  
  const buffer = fs.readFileSync(imagePath);
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  const filename = 'calcinha-tailandesa-perolas-modelo-todas-cores.jpg';

  const formData = new FormData();
  // No PocketBase, o modificador '+' em campos de arquivos múltiplos anexa novos arquivos sem apagar os anteriores
  formData.append('image+', blob, filename);

  console.log('Enviando com modificador image+...');
  try {
    const res = await pb.collection('products').update('1y126wty2qdkcf2', formData);
    console.log('Atualizado com image+ com sucesso!');
    console.log('Total de imagens no produto:', res.image.length);
    console.log('Imagens atuais:', res.image);

    // Atualizar gallery e gallery_labels
    const allImages = res.image;
    // O último item é o recém-adicionado
    const newLabels = [
      'Preta', 'Preta', 
      'Vermelha', 'Vermelha', 
      'Branca', 'Branca',
      'Todas as Cores'
    ];

    await pb.collection('products').update('1y126wty2qdkcf2', {
      gallery: allImages,
      gallery_labels: JSON.stringify(newLabels)
    });
    console.log('Galeria e labels atualizadas com sucesso!');
  } catch (err) {
    console.error('Erro com image+:', err.message);
    if (err.data) console.error(JSON.stringify(err.data, null, 2));

    // Se o modificador '+' não for suportado nesta versão, podemos enviar todos os arquivos novamente ou verificar a documentação
    console.log('Tentando com image padrão...');
  }
}

addPromoImage().catch(console.error);
