import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';
const adsetId = '120251762650110751';

async function testCreate() {
  try {
    // 1. Let's inspect the page ID
    const pagesRes = await axios.get(`https://graph.facebook.com/v21.0/me/accounts`, {
      params: { access_token: token }
    });
    console.log('Pages:', pagesRes.data.data.map(p => ({ id: p.id, name: p.name })));
    const pageId = pagesRes.data.data[0]?.id;

    // 2. Try creating a draft ad creative
    const creativeRes = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/adcreatives`, {
      name: 'Test Creative Calcinha Modeladora',
      object_story_spec: {
        page_id: pageId,
        link_data: {
          link: 'https://avantelingerie.com.br/produto/99k9uikfczop1zd',
          message: 'Calcinha Cinta Modeladora R$ 15,67',
          name: 'Calcinha Cinta com Renda — Apenas R$ 15,67',
          call_to_action: {
            type: 'SHOP_NOW',
            value: { link: 'https://avantelingerie.com.br/produto/99k9uikfczop1zd' }
          }
        }
      },
      access_token: token
    });
    console.log('Creative Created:', creativeRes.data);

    // 3. Try creating the ad
    const adRes = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      name: 'AD 01 - Calcinha Cinta Modeladora R$ 15,67',
      adset_id: adsetId,
      creative: { creative_id: creativeRes.data.id },
      status: 'PAUSED',
      access_token: token
    });
    console.log('Ad Created Successfully:', adRes.data);

  } catch (err) {
    console.error('API Error Response:', JSON.stringify(err.response?.data || err.message, null, 2));
  }
}

testCreate();
