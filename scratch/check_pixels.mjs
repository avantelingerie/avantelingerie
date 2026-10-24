import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/adspixels`, {
      params: {
        fields: 'id,name,is_unavailable,can_proxy',
        access_token: token
      }
    });
    console.log('Pixels directly on account:', JSON.stringify(res.data, null, 2));

    // Also check business pixels if any
    const businessRes = await axios.get(`https://graph.facebook.com/v21.0/${accountId}?fields=business,owner`, {
      params: { access_token: token }
    });
    console.log('Business/Owner:', JSON.stringify(businessRes.data, null, 2));

    const bizId = businessRes.data.business?.id;
    if (bizId) {
      const bizPixels = await axios.get(`https://graph.facebook.com/v21.0/${bizId}/adspixels`, {
        params: { access_token: token }
      });
      console.log('Pixels on Business:', JSON.stringify(bizPixels.data, null, 2));
    }
  } catch (err) {
    console.error('Error fetching pixels:', err.response?.data || err.message);
  }
}
main();
