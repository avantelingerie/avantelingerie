import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const catalogId = '28203576722654659';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${catalogId}`, {
      params: {
        fields: 'id,name,product_count,feed_count,da_display_settings',
        access_token: token
      }
    });
    console.log('Catalog details:', JSON.stringify(res.data, null, 2));

    const sets = await axios.get(`https://graph.facebook.com/v21.0/${catalogId}/product_sets`, {
      params: {
        fields: 'id,name,filter,product_count',
        access_token: token
      }
    });
    console.log('Product sets:', JSON.stringify(sets.data, null, 2));

    const feeds = await axios.get(`https://graph.facebook.com/v21.0/${catalogId}/product_feeds`, {
      params: {
        fields: 'id,name,schedule,latest_upload',
        access_token: token
      }
    });
    console.log('Feeds:', JSON.stringify(feeds.data, null, 2));

    const prods = await axios.get(`https://graph.facebook.com/v21.0/${catalogId}/products`, {
      params: {
        fields: 'id,name,retailer_id,price,availability,url',
        limit: 5,
        access_token: token
      }
    });
    console.log('Sample Products:', JSON.stringify(prods.data, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
main();
