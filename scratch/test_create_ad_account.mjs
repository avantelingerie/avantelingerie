import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const bizId = '1434883355105952';

async function testCreate() {
  try {
    console.log('Tentando criar ad account via Graph API...');
    const res = await axios.post(`https://graph.facebook.com/v21.0/${bizId}/adaccount`, {
      name: 'Avante Lingerie - Oficial',
      currency: 'BRL',
      timezone_id: 58, // America/Sao_Paulo
      end_advertiser: bizId,
      media_agency: 'NONE',
      partner: 'NONE',
      access_token: token
    });
    console.log('CONTA CRIADA COM SUCESSO:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.log('Falha ao criar ad account:', JSON.stringify(err.response?.data || err.message, null, 2));
  }
}

testCreate();
