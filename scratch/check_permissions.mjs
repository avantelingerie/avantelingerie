import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });

const token = process.env.META_ADS_ACCESS_TOKEN;

async function checkPermissions() {
  try {
    const url = `https://graph.facebook.com/v21.0/me/permissions?access_token=${token}`;
    const res = await axios.get(url);
    console.log('Permissions:', res.data.data.filter(p => p.status === 'granted').map(p => p.permission));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

checkPermissions();

