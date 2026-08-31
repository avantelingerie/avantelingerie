import pb from './apps/web/src/lib/pocketbaseClient.js';
(async () => {
  try {
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'admin123456');
    const collection = await pb.collections.getOne('products');
    
    // Add seo_title
    if (!collection.schema.find(f => f.name === 'seo_title')) {
      collection.schema.push({
        system: false,
        id: 'seo_title_id',
        name: 'seo_title',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: { min: null, max: 200, pattern: '' }
      });
    }

    // Add seo_meta_description
    if (!collection.schema.find(f => f.name === 'seo_meta_description')) {
      collection.schema.push({
        system: false,
        id: 'seo_meta_desc_id',
        name: 'seo_meta_description',
        type: 'text',
        required: false,
        presentable: false,
        unique: false,
        options: { min: null, max: 500, pattern: '' }
      });
    }

    await pb.collections.update('products', collection);
    console.log('Schema updated with SEO fields!');
  } catch (err) {
    console.error(err.response || err);
  }
})();
