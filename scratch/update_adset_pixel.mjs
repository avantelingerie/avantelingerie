import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const adsetId = '120251762650110751';
const newPixelId = '1586501669344280';

async function updateAdset() {
  try {
    const res = await axios.post(`https://graph.facebook.com/v21.0/${adsetId}`, {
      promoted_object: JSON.stringify({
        pixel_id: newPixelId,
        custom_event_type: 'PURCHASE'
      }),
      access_token: token
    });
    console.log('AdSet atualizado com novo Pixel com sucesso:', res.data);
  } catch (err) {
    console.error('Erro ao atualizar adset com novo pixel:', err.response?.data || err.message);
  }
}
updateAdset();
