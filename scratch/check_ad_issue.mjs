import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const adId = '120251917851160751';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${adId}`, {
      params: {
        fields: 'id,name,status,effective_status,issues_info,recommendations',
        access_token: token
      }
    });
    console.log('AD INFO:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

main();
