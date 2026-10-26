import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;

async function checkCreative(id) {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${id}`, {
      params: {
        fields: 'id,name,degrees_of_freedom_spec,contextual_multi_ads',
        access_token: token
      }
    });
    console.log(`Creative ${id}:`, JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

async function testUpdateCreative(id) {
  try {
    const payload = {
      contextual_multi_ads: { enroll_status: 'OPT_OUT' },
      degrees_of_freedom_spec: {
        creative_features_spec: {
          advantage_plus_creative: { enroll_status: 'OPT_OUT' },
          enhance_cta: { enroll_status: 'OPT_OUT' },
          product_browsing: { enroll_status: 'OPT_OUT' },
          inline_comment: { enroll_status: 'OPT_OUT' },
          standard_enhancements: { enroll_status: 'OPT_OUT' }
        }
      }
    };
    const res = await axios.post(`https://graph.facebook.com/v21.0/${id}`, payload, {
      params: { access_token: token }
    });
    console.log(`Update response for ${id}:`, res.data);
  } catch (err) {
    console.error(`Update failed for ${id}:`, err.response?.data || err.message);
  }
}

async function main() {
  console.log('Testing update on AD 01 creative (1660909655385211)...');
  await testUpdateCreative('1660909655385211');
  await checkCreative('1660909655385211');
}

main();
