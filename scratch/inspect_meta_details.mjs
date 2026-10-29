import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;

async function check() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/act_841441889539975`, {
      params: {
        fields: 'id,account_id,name,owner,business,business_name,created_time,currency,timezone_name,users{id,name,role,tasks}',
        access_token: token
      }
    });
    console.log('ACT DETAILS:', JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.log('act err:', e.response?.data || e.message);
  }

  try {
    const res2 = await axios.get(`https://graph.facebook.com/v21.0/1434883355105952`, {
      params: {
        fields: 'id,name,primary_page{id,name},created_by',
        access_token: token
      }
    });
    console.log('BIZ DETAILS:', JSON.stringify(res2.data, null, 2));
  } catch (e) {
    console.log('biz err:', e.response?.data || e.message);
  }
}
check();
