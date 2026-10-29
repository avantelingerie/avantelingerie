import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;

async function check() {
  try {
    const resDebug = await axios.get(`https://graph.facebook.com/debug_token`, {
      params: {
        input_token: token,
        access_token: token
      }
    });
    console.log('DEBUG TOKEN:', JSON.stringify(resDebug.data, null, 2));
  } catch (e) {
    console.log('debug_token err:', e.response?.data || e.message);
  }

  try {
    const resBiz = await axios.get(`https://graph.facebook.com/v21.0/me/businesses`, {
      params: { access_token: token }
    });
    console.log('MY BUSINESSES:', JSON.stringify(resBiz.data, null, 2));
  } catch (e) {
    console.log('me/businesses err:', e.response?.data || e.message);
  }

  try {
    const resMe = await axios.get(`https://graph.facebook.com/v21.0/me`, {
      params: { fields: 'id,name,email', access_token: token }
    });
    console.log('ME:', JSON.stringify(resMe.data, null, 2));
  } catch (e) {
    console.log('me err:', e.response?.data || e.message);
  }
}
check();
