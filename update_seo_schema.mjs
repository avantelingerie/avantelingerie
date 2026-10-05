import PocketBase from 'pocketbase';
const pbUrl = process.env.POCKETBASE_URL || 'https://avantelingerie.com.br/hcgi/platform';
const pb = new PocketBase(pbUrl);

async function updateSchema() {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    const collection = await pb.collections.getOne('products');
    let updated = false;

    if (!collection.fields.find(f => f.name === 'seo_title')) {
      collection.fields.push({
        system: false,
        name: 'seo_title',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: { min: null, max: 200, pattern: '' }
      });
      updated = true;
      console.log('Added seo_title to fields');
    }

    if (!collection.fields.find(f => f.name === 'seo_meta_description')) {
      collection.fields.push({
        system: false,
        name: 'seo_meta_description',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: { min: null, max: 500, pattern: '' }
      });
      updated = true;
      console.log('Added seo_meta_description to fields');
    }

    if (updated) {
      await pb.collections.update('products', collection);
      console.log('Collection products successfully updated in PocketBase!');
    } else {
      console.log('Fields already exist, nothing to update.');
    }
  } catch (err) {
    console.error('Error updating schema:', err.response || err);
  }
}

updateSchema();
