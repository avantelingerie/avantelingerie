import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;

async function checkAdset(id) {
  try {
    const res = await axios.get(`https://graph.facebook.com/v21.0/${id}`, {
      params: {
        fields: 'id,name,destination_type,optimization_goal,promoted_object,targeting',
        access_token: token
      }
    });
    console.log(`Adset ${id}:`, JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

async function main() {
  console.log('--- ADSET 01 B2B ---');
  await checkAdset('120251762650980751');
  console.log('--- ADSET 02 B2B ---');
  await checkAdset('120251762651370751');
}

main();
