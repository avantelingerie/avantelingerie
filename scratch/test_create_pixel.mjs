import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function testCreatePixel() {
  try {
    const res = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/adspixels`, {
      name: 'Pixel Oficial Avante Lingerie Web',
      access_token: token
    });
    console.log('Pixel criado com sucesso na conta:', res.data);
  } catch (err) {
    console.error('Erro ao criar pixel na conta:', err.response?.data?.error || err.message);
  }
}
testCreatePixel();
