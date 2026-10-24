import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';
const businessId = '1434883355105952';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/product_catalogs`, {
      params: { access_token: token }
    });
    console.log('Catalogs on Ad Account:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Ad account catalog error:', err.response?.data || err.message);
  }

  try {
    const res2 = await axios.get(`https://graph.facebook.com/v21.0/${businessId}/owned_product_catalogs`, {
      params: { access_token: token }
    });
    console.log('Owned Catalogs on Business:', JSON.stringify(res2.data, null, 2));
  } catch (err2) {
    console.error('Business catalog error:', err2.response?.data || err2.message);
  }

  try {
    const res3 = await axios.get(`https://graph.facebook.com/v21.0/${businessId}/client_product_catalogs`, {
      params: { access_token: token }
    });
    console.log('Client Catalogs on Business:', JSON.stringify(res3.data, null, 2));
  } catch (err3) {
    console.error('Client catalog error:', err3.response?.data || err3.message);
  }
}
main();
