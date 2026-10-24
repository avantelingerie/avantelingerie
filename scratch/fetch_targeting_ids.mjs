import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function search(q) {
  const url = `https://graph.facebook.com/v21.0/${accountId}/targetingsearch`;
  const res = await axios.get(url, {
    params: {
      type: 'adinterest',
      q: q,
      access_token: token
    }
  });
  return res.data?.data?.[0];
}

async function searchBehavior(q) {
  const url = `https://graph.facebook.com/v21.0/${accountId}/targetingsearch`;
  const res = await axios.get(url, {
    params: {
      type: 'adtargetingspec',
      q: q,
      access_token: token
    }
  });
  return res.data?.data?.find(b => b.type === 'behaviors');
}

async function run() {
  const terms = [
    'sutiã', 'calcinha', 'bodysuit', 'camisola', 'vestuário',
    'revendedor', 'pequena empresa', 'microempreendedor individual',
    'marketing digital', 'dropshipping', 'shopify', 'costura', 'máquina de costura'
  ];

  const results = {};
  for (const t of terms) {
    const res = await search(t);
    results[t] = res ? { id: res.id, name: res.name } : 'Not found';
  }

  const adminPages = await searchBehavior('administradores');
  results['admin_pages'] = adminPages ? { id: adminPages.id, name: adminPages.name } : 'Not found';

  console.log(JSON.stringify(results, null, 2));
}

run().catch(console.error);
