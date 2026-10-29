import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const bizId = '1434883355105952';

async function checkLimit() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${bizId}`, {
      params: {
        fields: 'id,name,primary_page,extended_credit_info,sharing_eligibility_status',
        access_token: token
      }
    });
    console.log('BIZ LIMIT INFO:', JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.log('checkLimit err:', e.response?.data || e.message);
  }

  try {
    const resAccounts = await axios.get(`https://graph.facebook.com/v21.0/${bizId}/owned_ad_accounts`, {
      params: { access_token: token }
    });
    console.log('OWNED AD ACCOUNTS:', JSON.stringify(resAccounts.data, null, 2));
  } catch (e) {
    console.log('owned accounts err:', e.response?.data || e.message);
  }

  try {
    const resClientAccounts = await axios.get(`https://graph.facebook.com/v21.0/${bizId}/client_ad_accounts`, {
      params: { access_token: token }
    });
    console.log('CLIENT AD ACCOUNTS:', JSON.stringify(resClientAccounts.data, null, 2));
  } catch (e) {
    console.log('client accounts err:', e.response?.data || e.message);
  }
}
checkLimit();
