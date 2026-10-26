import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function main() {
  try {
    console.log('=== VERIFICAÇÃO DE GASTOS (INSIGHTS) ===');
    const insightsRes = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/insights`, {
      params: {
        date_preset: 'maximum',
        fields: 'spend,impressions,clicks',
        access_token: token
      }
    });
    console.log('Gasto total histórico da conta:', insightsRes.data.data.length ? insightsRes.data.data[0] : 'R$ 0,00 (Nenhum centavo gasto)');

    console.log('\n=== STATUS DAS CAMPANHAS ===');
    const campRes = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/campaigns`, {
      params: {
        fields: 'id,name,status,effective_status',
        access_token: token
      }
    });
    for (const c of campRes.data.data) {
      console.log(`Campanha: ${c.name} | Status: ${c.status} | Efetivo: ${c.effective_status}`);
    }

    console.log('\n=== STATUS DOS CONJUNTOS DE ANÚNCIOS (ADSETS) ===');
    const adsetRes = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/adsets`, {
      params: {
        fields: 'id,name,status,effective_status',
        access_token: token
      }
    });
    for (const a of adsetRes.data.data) {
      console.log(`AdSet: ${a.name} | Status: ${a.status} | Efetivo: ${a.effective_status}`);
    }

    console.log('\n=== STATUS DOS ANÚNCIOS (ADS) ===');
    const adsRes = await axios.get(`https://graph.facebook.com/v21.0/${accountId}/ads`, {
      params: {
        fields: 'id,name,status,effective_status',
        access_token: token
      }
    });
    for (const ad of adsRes.data.data) {
      console.log(`Anúncio: ${ad.name} | Status: ${ad.status} | Efetivo: ${ad.effective_status}`);
    }
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

main();
