import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const bizId = '1434883355105952';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${bizId}/business_users`, {
      params: {
        fields: 'id,name,email,role',
        access_token: token
      }
    });
    console.log('Business Users:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('business_users falhou:', err.response?.data?.error?.message || err.message);
  }

  try {
    const resBiz = await axios.get(`https://graph.facebook.com/v21.0/${bizId}`, {
      params: {
        fields: 'id,name,primary_page,created_by',
        access_token: token
      }
    });
    console.log('Business Details:', JSON.stringify(resBiz.data, null, 2));
  } catch (err) {
    console.log('biz details falhou:', err.response?.data?.error?.message || err.message);
  }
}
main();
