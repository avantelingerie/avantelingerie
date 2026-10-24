import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      params: {
        fields: 'id,name,creative{id,name,asset_feed_spec}',
        access_token: token
      }
    });
    for (const ad of res.data.data) {
      console.log('==============================');
      console.log('NAME:', ad.name);
      console.log('BODIES:', JSON.stringify(ad.creative?.asset_feed_spec?.bodies, null, 2));
      console.log('TITLES:', JSON.stringify(ad.creative?.asset_feed_spec?.titles, null, 2));
      console.log('DESCRIPTIONS:', JSON.stringify(ad.creative?.asset_feed_spec?.descriptions, null, 2));
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
main();
