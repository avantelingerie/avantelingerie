import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      params: {
        fields: 'id,name,status,effective_status',
        access_token: token
      }
    });
    console.log('Ads:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error fetching ads:', err.response?.data || err.message);
  }
}
main();
