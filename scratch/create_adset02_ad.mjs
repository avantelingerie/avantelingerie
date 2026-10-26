import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';
const adset02Id = '120251762651370751'; // [ADSET 02] Sacoleiras & Lojas
const creativeId = '1136697495366051'; // Creative do AD B2B 01 já aprovado e blindado

async function main() {
  try {
    console.log('Creating Ad in ADSET 02 with Creative 1136697495366051...');
    const res = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      name: 'AD B2B 01 - Comece a Revender com R$ 69,90',
      adset_id: adset02Id,
      creative: { creative_id: creativeId },
      status: 'PAUSED',
      access_token: token
    });
    console.log('AD CREATED IN ADSET 02 SUCCESSFULLY!', res.data);
  } catch (err) {
    console.error('Error creating ad in ADSET 02:', err.response?.data || err.message);
  }
}

main();
