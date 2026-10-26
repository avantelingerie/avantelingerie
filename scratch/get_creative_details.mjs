import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;

async function getFullCreative(id) {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${id}`, {
      params: {
        fields: 'id,name,object_story_spec,asset_feed_spec,degrees_of_freedom_spec,contextual_multi_ads',
        access_token: token
      }
    });
    console.log(`FULL CREATIVE ${id}:`, JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

getFullCreative('1660909655385211');
