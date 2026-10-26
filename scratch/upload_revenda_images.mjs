import dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function uploadImage(filePath, filename) {
  const form = new FormData();
  form.append('filename', fs.createReadStream(filePath));
  form.append('access_token', token);

  const res = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/adimages`, form, {
    headers: form.getHeaders()
  });

  console.log(`Uploaded ${filename}:`, res.data);
  return res.data.images[filename] || Object.values(res.data.images)[0];
}

async function main() {
  try {
    console.log('Uploading revenda_feed_4x5.jpg...');
    const feedImg = await uploadImage('scratch/revenda_feed_4x5.jpg', 'revenda_feed_4x5.jpg');
    console.log('Feed Image Hash:', feedImg.hash);

    console.log('Uploading revenda_stories_9x16.jpg...');
    const storiesImg = await uploadImage('scratch/revenda_stories_9x16.jpg', 'revenda_stories_9x16.jpg');
    console.log('Stories Image Hash:', storiesImg.hash);
  } catch (err) {
    console.error('Upload failed:', err.response?.data || err.message);
  }
}

main();
