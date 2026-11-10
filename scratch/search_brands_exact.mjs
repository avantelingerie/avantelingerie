import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });

const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function search(q) {
  const url = `https://graph.facebook.com/v21.0/${accountId}/targetingsearch?type=adinterest&q=${encodeURIComponent(q)}&access_token=${token}`;
  const res = await axios.get(url);
  const data = res.data.data || [];
  return data.filter(d => d.type === 'interests').slice(0, 3).map(d => ({ id: d.id, name: d.name, size: d.audience_size_upper_bound }));
}

async function main() {
  const brands = ['Avon', 'Boticário', 'Mary Kay', 'Tupperware', 'Eudora', 'Lupo', 'Hope', 'Lingerie', 'Atacado', 'Revendedor', 'Boutique', 'Varejo'];
  for (const b of brands) {
    const r = await search(b);
    console.log(`${b}:`, r);
  }
}

main().catch(console.error);

