import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/campaigns`, {
      params: {
        fields: 'id,name,status,objective,daily_budget,lifetime_budget,buying_type',
        access_token: token
      }
    });
    console.log('--- CAMPAIGNS ---');
    for (const c of res.data.data) {
      console.log(`Campaign: ${c.name} (ID: ${c.id}) | Status: ${c.status} | Objective: ${c.objective} | Budget: ${c.daily_budget || c.lifetime_budget}`);
      
      const adsetsRes = await axios.get(`https://graph.facebook.com/v21.0/${c.id}/adsets`, {
        params: {
          fields: 'id,name,status,daily_budget,targeting{age_min,age_max,genders,geo_locations}',
          access_token: token
        }
      });
      for (const as of adsetsRes.data.data) {
        console.log(`  -> AdSet: ${as.name} (ID: ${as.id}) | Status: ${as.status}`);
        const adsRes = await axios.get(`https://graph.facebook.com/v21.0/${as.id}/ads`, {
          params: {
            fields: 'id,name,status,effective_status',
            access_token: token
          }
        });
        for (const ad of adsRes.data.data) {
          console.log(`     * Ad: ${ad.name} (ID: ${ad.id}) | Status: ${ad.status} | Effective: ${ad.effective_status}`);
        }
      }
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
main();
