import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      params: {
        fields: 'id,name,creative{id,name,asset_feed_spec,degrees_of_freedom_spec,contextual_multi_ads}',
        access_token: token
      }
    });
    for (const ad of res.data.data) {
      console.log('====================================');
      console.log('NAME:', ad.name);
      console.log('CREATIVE ID:', ad.creative?.id);
      console.log('CONTEXTUAL MULTI ADS:', ad.creative?.contextual_multi_ads);
      console.log('DEGREES OF FREEDOM SPEC:', JSON.stringify(ad.creative?.degrees_of_freedom_spec, null, 2));
      console.log('ASSET FEED SPEC OPTIMIZATION:', ad.creative?.asset_feed_spec?.optimization_type);
      console.log('ADDITIONAL DATA:', JSON.stringify(ad.creative?.asset_feed_spec?.additional_data, null, 2));
      console.log('REASONS TO SHOP:', ad.creative?.asset_feed_spec?.reasons_to_shop);
      console.log('SHOPS BUNDLE:', ad.creative?.asset_feed_spec?.shops_bundle);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
main();
