import PocketBase from 'pocketbase';
import fs from 'fs';

async function testVideoUpload() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  console.log('Authenticating...');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Avante@2024');
  
  console.log('Creating dummy video...');
  fs.writeFileSync('dummy.mp4', Buffer.alloc(1024 * 1024)); // 1MB dummy video
  
  const blob = new Blob([fs.readFileSync('dummy.mp4')], { type: 'video/mp4' });
  const form = new FormData();
  form.append('name', 'Test Video Product');
  form.append('price', '99.90');
  form.append('image', blob, 'dummy.mp4');
  
  try {
    console.log('Uploading to PocketBase...');
    const result = await pb.collection('products').create(form);
    console.log('Success:', result.id);
  } catch (error) {
    console.error('Error:', error.message);
    if (error.data) console.error(JSON.stringify(error.data, null, 2));
  }
}
testVideoUpload();
