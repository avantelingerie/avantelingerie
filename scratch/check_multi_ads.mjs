import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      params: {
        fields: 'id,name,creative{id,name,contextual_multi_ads,asset_feed_spec}',
        access_token: token
      }
    });
    for (const ad of res.data.data) {
      console.log('--- ' + ad.name + ' ---');
      console.log('contextual_multi_ads:', ad.creative?.contextual_multi_ads);
      console.log('additional_data:', ad.creative?.asset_feed_spec?.additional_data);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
main();
