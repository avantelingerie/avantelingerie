import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

async function updateSchema() {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const collection = await pb.collections.getOne('categorias');
    let updated = false;

    if (!collection.fields.find(f => f.name === 'video_capa')) {
      collection.fields.push({
        system: false,
        name: 'video_capa',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: { min: null, max: null, pattern: '' }
      });
      updated = true;
      console.log('Added video_capa to fields');
    }

    if (updated) {
      await pb.collections.update('categorias', collection);
      console.log('Collection categorias successfully updated in PocketBase!');
    } else {
      console.log('Field already exists, nothing to update.');
    }
    
    // Now let's auto-fill the URL for the "cropped" category to save the user time!
    const records = await pb.collection('categorias').getFullList();
    const croppedCat = records.find(r => r.nome.toLowerCase().includes('cropped') || r.slug.includes('cropped'));
    if (croppedCat) {
      await pb.collection('categorias').update(croppedCat.id, {
        video_capa: 'https://avantelingerie.com.br/video/cropped_Fundo_branco.mp4'
      });
      console.log('Successfully set video_capa for cropped category!');
    }
  } catch (err) {
    console.error('Error updating schema:', err.response || err);
  }
}

updateSchema();
