import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: 'C:/Users/comer/.gemini/config/mcp/meta-ads/.env', quiet: true });
const token = process.env.META_ADS_ACCESS_TOKEN;
const accountId = 'act_841441889539975';

// Cerco Geográfico Oficial (SP, RJ, MG + 5 Capitais)
const geoLocations = {
  regions: [
    { key: '460', name: 'São Paulo' },
    { key: '454', name: 'Rio de Janeiro' },
    { key: '449', name: 'Minas Gerais' }
  ],
  cities: [
    { key: '250457', name: 'Curitiba' },
    { key: '264859', name: 'Porto Alegre' },
    { key: '267730', name: 'Salvador' },
    { key: '266284', name: 'Recife' },
    { key: '253370', name: 'Fortaleza' }
  ],
  location_types: ['home', 'recent']
};

async function updateAdset(adsetId, updateData) {
  const url = `https://graph.facebook.com/v21.0/${adsetId}`;
  const res = await axios.post(url, {
    ...updateData,
    access_token: token
  });
  return res.data;
}

async function run() {
  console.log('--- Aplicando Arquitetura Meta Ads v21 ---');

  // 1. Atualizar ADSET 01 do Varejo (Corrigido para Cerco Ouro BR)
  console.log('1. B2C ADSET 01: Remarketing & Cerco Ouro BR...');
  const b2cAdset1Targeting = {
    age_min: 22,
    age_max: 45,
    genders: [2],
    geo_locations: geoLocations,
    device_platforms: ['mobile'],
    targeting_automation: { advantage_audience: 0 }
  };
  const res1 = await updateAdset('120251762649670751', {
    name: '[ADSET 01] Remarketing 7D & Engajamento 45D - Mulheres 22-45',
    targeting: JSON.stringify(b2cAdset1Targeting)
  });
  console.log('B2C Adset 1:', res1);

  // 2. Atualizar ADSET 02 do Varejo (Interesses Lingerie + Compradores Envolvidos)
  console.log('2. B2C ADSET 02: Interesses Lingerie + Compradores Envolvidos...');
  const b2cAdset2Targeting = {
    age_min: 22,
    age_max: 45,
    genders: [2],
    geo_locations: geoLocations,
    device_platforms: ['mobile'],
    flexible_spec: [
      {
        interests: [
          { id: '6003024627293', name: 'Lingerie' },
          { id: '6003313450363', name: 'Sutiã' },
          { id: '6003204485047', name: 'Calcinha' },
          { id: '6003456388203', name: 'Vestuário' },
          { id: '6003242077675', name: 'Camisola' }
        ]
      },
      {
        behaviors: [
          { id: '6071631541183', name: 'Compradores envolvidos' }
        ]
      }
    ],
    targeting_automation: { advantage_audience: 0 }
  };
  const res2 = await updateAdset('120251762650110751', {
    name: '[ADSET 02] Interesses Lingerie + Compradores Envolvidos - Mulheres 22-45',
    targeting: JSON.stringify(b2cAdset2Targeting)
  });
  console.log('B2C Adset 2:', res2);

  // 3. Atualizar ADSET 01 do Atacado (Revenda & Negócios 25-54)
  console.log('3. B2B ADSET 01: Revenda & Renda Extra (Mínimo R$ 69,90)...');
  const b2bAdset1Targeting = {
    age_min: 25,
    age_max: 54,
    genders: [2],
    geo_locations: geoLocations,
    device_platforms: ['mobile'],
    flexible_spec: [
      {
        interests: [
          { id: '6003107626192', name: 'Atacado' },
          { id: '6003248076467', name: 'Revendedor' },
          { id: '6002884511422', name: 'Pequena empresa' }
        ]
      }
    ],
    targeting_automation: { advantage_audience: 0 }
  };
  const res3 = await updateAdset('120251762650980751', {
    name: '[ADSET 01] Revenda & Renda Extra (Mínimo R$ 69,90) - Mulheres 25-54',
    targeting: JSON.stringify(b2bAdset1Targeting)
  });
  console.log('B2B Adset 1:', res3);

  // 4. Atualizar ADSET 02 do Atacado (Administradores de Lojas 25-54)
  console.log('4. B2B ADSET 02: Administradores de Lojas...');
  const b2bAdset2Targeting = {
    age_min: 25,
    age_max: 54,
    genders: [2],
    geo_locations: geoLocations,
    device_platforms: ['mobile'],
    flexible_spec: [
      {
        behaviors: [
          { id: '6377178995383', name: 'Administradores de lojas' }
        ]
      }
    ],
    targeting_automation: { advantage_audience: 0 }
  };
  const res4 = await updateAdset('120251762651370751', {
    name: '[ADSET 02] Sacoleiras & Lojas - Mulheres 25-54',
    targeting: JSON.stringify(b2bAdset2Targeting)
  });
  console.log('B2B Adset 2:', res4);

  // 5. Criar B2C ADSET 03 (Aberto Avançado / Broad)
  console.log('5. B2C ADSET 03: Aberto Avançado (Broad) - Mulheres 22-45...');
  const b2cAdset3Targeting = {
    age_min: 22,
    age_max: 45,
    genders: [2],
    geo_locations: geoLocations,
    device_platforms: ['mobile'],
    targeting_automation: { advantage_audience: 0 }
  };

  try {
    const resCreate = await axios.post(`https://graph.facebook.com/v21.0/${accountId}/adsets`, {
      name: '[ADSET 03] Aberto Avançado (Broad) - Mulheres 22-45',
      campaign_id: '120251762626930751',
      daily_budget: '2500',
      billing_event: 'IMPRESSIONS',
      optimization_goal: 'OFFSITE_CONVERSIONS',
      promoted_object: JSON.stringify({
        pixel_id: '981595838258999',
        custom_event_type: 'PURCHASE'
      }),
      targeting: JSON.stringify(b2cAdset3Targeting),
      status: 'PAUSED',
      access_token: token
    });
    console.log('B2C Adset 3 Criado com Sucesso ID:', resCreate.data.id);
  } catch (err) {
    console.log('Nota criação Adset 3:', err.response?.data || err.message);
  }
}

run().catch(err => console.error('Erro:', err.response?.data || err.message));
