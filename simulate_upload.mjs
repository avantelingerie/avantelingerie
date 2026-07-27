import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('http://127.0.0.1:8090');

async function testUpload() {
  try {
    console.log("Authenticating as superuser...");
    // Local dev superuser credentials from the migration files
    await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
    console.log("Authenticated!");

    // Create a 25MB dummy video file
    fs.writeFileSync('dummy_video_25mb.mp4', Buffer.alloc(25 * 1024 * 1024));

    const formData = new FormData();
    formData.append('name', 'Test 25MB Video Product');
    formData.append('price', 99.99);
    
    // Fetch a valid category
    const categorias = await pb.collection('categorias').getFullList();
    if (categorias.length > 0) {
      formData.append('categoria_id', categorias[0].id);
    } else {
      const novaCat = await pb.collection('categorias').create({ name: 'Test Cat' });
      formData.append('categoria_id', novaCat.id);
    }

    const fileData = new Blob([fs.readFileSync('dummy_video_25mb.mp4')], { type: 'video/mp4' });
    formData.append('image', fileData, 'dummy_video_25mb.mp4');

    console.log("Sending create request to PocketBase with 25MB file...");
    const product = await pb.collection('products').create(formData);
    console.log("Product created successfully:", product.id);

  } catch (error) {
    console.error("Error creating product:", error);
    if (error.response) {
      console.error(JSON.stringify(error.response, null, 2));
    }
  }
}

testUpload();
