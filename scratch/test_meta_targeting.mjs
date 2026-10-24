import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });

const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

async function searchTargeting(type, q) {
  const url = `https://graph.facebook.com/v21.0/${accountId}/targetingsearch`;
  const res = await axios.get(url, {
    params: {
      type: type,
      q: q,
      access_token: token
    }
  });
  return res.data;
}

async function searchGeo(q) {
  const url = `https://graph.facebook.com/v21.0/search`;
  const res = await axios.get(url, {
    params: {
      type: 'adgeolocation',
      q: q,
      country_code: 'BR',
      access_token: token
    }
  });
  return res.data;
}

async function main() {
  console.log('--- 1. Buscando Estados BR (SP, RJ, MG) ---');
  const sp = await searchGeo('São Paulo');
  const rj = await searchGeo('Rio de Janeiro');
  const mg = await searchGeo('Minas Gerais');
  console.log('SP:', sp.data?.slice(0, 2));
  console.log('RJ:', rj.data?.slice(0, 2));
  console.log('MG:', mg.data?.slice(0, 2));

  console.log('--- 2. Buscando Capitais (Curitiba, Porto Alegre, Salvador, Recife, Fortaleza) ---');
  const curitiba = await searchGeo('Curitiba');
  const poa = await searchGeo('Porto Alegre');
  const ssa = await searchGeo('Salvador');
  const rec = await searchGeo('Recife');
  const forta = await searchGeo('Fortaleza');
  console.log('Curitiba:', curitiba.data?.[0]);
  console.log('Porto Alegre:', poa.data?.[0]);
  console.log('Salvador:', ssa.data?.[0]);
  console.log('Recife:', rec.data?.[0]);
  console.log('Fortaleza:', forta.data?.[0]);

  console.log('--- 3. Buscando Comportamento "Compradores Envolvidos" ---');
  const engaged = await searchTargeting('adtargetingspec', 'compradores');
  console.log('Comportamento Compradores:', JSON.stringify(engaged.data?.slice(0, 3), null, 2));

  console.log('--- 4. Buscando Interesses Lingerie & Atacado ---');
  const lingerie = await searchTargeting('adinterest', 'lingerie');
  const atacado = await searchTargeting('adinterest', 'atacado');
  console.log('Lingerie:', lingerie.data?.slice(0, 3));
  console.log('Atacado:', atacado.data?.slice(0, 3));
}

main().catch(err => console.error(err.response?.data || err.message));
