import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';
const bizId = '1434883355105952';

async function main() {
  try {
    // 1. Check users of the ad account
    const resUsers = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/users`, {
      params: { fields: 'id,name,role,permissions', access_token: token }
    });
    console.log('Ad Account Users:', JSON.stringify(resUsers.data, null, 2));

    // 2. Check me (the current token user)
    const resMe = await axios.get(`https://graph.facebook.com/v21.0/me`, {
      params: { fields: 'id,name', access_token: token }
    });
    console.log('Token User:', JSON.stringify(resMe.data, null, 2));

    // 3. Check if there are other pixels or datasets on the account or owned by the account
    const resPixels = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/customconversions`, {
      params: { access_token: token }
    });
    console.log('Custom conversions:', JSON.stringify(resPixels.data, null, 2));

  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
main();
