import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });

const token = process.env.META_ADS_ACCESS_TOKEN;

async function checkPages() {
  try {
    const url = `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,access_token,instagram_business_account{id,username}&access_token=${token}`;
    const res = await axios.get(url);
    console.log('Pages & Instagram accounts:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error fetching pages:', err.response?.data || err.message);
  }
}

checkPages();

