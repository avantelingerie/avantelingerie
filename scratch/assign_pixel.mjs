import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = '841441889539975'; // without act_
const pixelId = '981595838258999';
const bizId = '1434883355105952';

async function assignPixel() {
  console.log('Tentando vincular Pixel à Conta de Anúncios...');
  
  // Method 1: POST to /pixel_id/shared_accounts
  try {
    const res1 = await axios.post(`https://graph.facebook.com/v21.0/${pixelId}/shared_accounts`, {
      account_id: accountId,
      business: bizId,
      access_token: token
    });
    console.log('Metodo 1 (shared_accounts):', res1.data);
  } catch (err1) {
    console.log('Metodo 1 falhou:', err1.response?.data?.error?.message || err1.message);
  }

  // Method 2: POST to /pixel_id/assigned_users / adaccounts
  try {
    const res2 = await axios.post(`https://graph.facebook.com/v21.0/${pixelId}/adaccounts`, {
      adaccount_id: `act_${accountId}`,
      access_token: token
    });
    console.log('Metodo 2 (adaccounts):', res2.data);
  } catch (err2) {
    console.log('Metodo 2 falhou:', err2.response?.data?.error?.message || err2.message);
  }
}

assignPixel();
