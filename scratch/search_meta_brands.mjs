import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });

const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  const url = `https://graph.facebook.com/v21.0/${accountId}/targetingsearch?type=adinterest&q=Natura&access_token=${token}`;
  const res = await axios.get(url);
  console.log('Result for Natura:', res.data);
}

main().catch(err => console.error(err.response?.data || err.message));
