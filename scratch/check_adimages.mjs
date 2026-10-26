import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/adimages`, {
      params: {
        fields: 'hash,name,status,url,permalink_url,created_time',
        limit: 20,
        access_token: token
      }
    });
    console.log('--- AD IMAGES ---');
    for (const img of res.data.data) {
      console.log(`Image: ${img.name || 'unnamed'} | Hash: ${img.hash} | Created: ${img.created_time}`);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
main();
