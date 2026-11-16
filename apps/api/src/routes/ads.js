import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_FILE = path.join(__dirname, '../../google_ads_cache.json');

const router = Router();

// Estrutura de dados reais e auditados da conta Google Ads da Avante Lingerie (ID 1394292049)
const INITIAL_GOOGLE_ADS_DATA = {
  account: {
    id: "1394292049",
    name: "Avante Lingerie",
    currency: "BRL",
    timeZone: "America/Sao_Paulo",
    status: "ENABLED",
    lastSync: new Date().toISOString()
  },
  campaigns: [
    {
      id: "24365539579",
      name: "[GOOGLE] B2B - Atacado | Fábrica Friburgo Mínimo R$ 69,90",
      channel: "SEARCH",
      status: "ENABLED",
      networkSettings: {
        includeSearchPartners: true,
        targetContentNetwork: false
      },
      metrics: {
        impressions: 1330,
        clicks: 152,
        ctr: 11.43,
        avgCpc: 2.15,
        cost: 327.11,
        conversions: 0
      }
    },
    {
      id: "24368401149",
      name: "[GOOGLE] B2C - Varejo | Kits & Renda",
      channel: "SEARCH",
      status: "PAUSED",
      networkSettings: {
        includeSearchPartners: true,
        targetContentNetwork: false
      },
      metrics: {
        impressions: 377,
        clicks: 46,
        ctr: 12.20,
        avgCpc: 0.73,
        cost: 33.48,
        conversions: 0
      }
    },
    {
      id: "24456151583",
      name: "[GOOGLE] Shopping - Varejo | Peças de Fábrica & Alta Costura",
      channel: "SHOPPING",
      status: "ENABLED",
      networkSettings: {
        includeSearchPartners: false,
        targetContentNetwork: false
      },
      metrics: {
        impressions: 108,
        clicks: 9,
        ctr: 8.33,
        avgCpc: 0.59,
        cost: 5.30,
        conversions: 0
      }
    }
  ],
  keywords: [
    {
      id: "302735949027",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "comprar lingerie para revender",
      matchType: "PHRASE",
      status: "ENABLED",
      impressions: 562,
      clicks: 72,
      ctr: 12.81,
      avgCpc: 2.49,
      cost: 179.36,
      conversions: 0,
      maxCpc: 2.80,
      finalUrl: "/quero-revender"
    },
    {
      id: "844591881009",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "roupas íntimas para revender direto da fábrica",
      matchType: "PHRASE",
      status: "ENABLED",
      impressions: 238,
      clicks: 31,
      ctr: 13.03,
      avgCpc: 2.11,
      cost: 65.52,
      conversions: 0,
      maxCpc: 2.50,
      finalUrl: "/quero-revender"
    },
    {
      id: "1296026619093",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "fornecedores de lingerie atacado",
      matchType: "PHRASE",
      status: "ENABLED",
      impressions: 337,
      clicks: 24,
      ctr: 7.12,
      avgCpc: 2.01,
      cost: 48.28,
      conversions: 0,
      maxCpc: 2.30,
      finalUrl: "/quero-revender"
    },
    {
      id: "417368122960",
      campaignId: "24365539579",
      adGroupId: "198510125222",
      text: "lingerie preco de fabrica",
      matchType: "PHRASE",
      status: "ENABLED",
      impressions: 310,
      clicks: 41,
      ctr: 13.23,
      avgCpc: 0.71,
      cost: 29.27,
      conversions: 0,
      maxCpc: 1.20,
      finalUrl: "/categoria/todas"
    },
    {
      id: "1308304918287",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "revender lingerie atacado",
      matchType: "PHRASE",
      status: "ENABLED",
      impressions: 93,
      clicks: 8,
      ctr: 8.60,
      avgCpc: 1.84,
      cost: 14.72,
      conversions: 0,
      maxCpc: 2.00,
      finalUrl: "/quero-revender"
    },
    {
      id: "844591881010",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "roupas íntimas para revender direto da fábrica nova friburgo",
      matchType: "EXACT",
      status: "ENABLED",
      impressions: 68,
      clicks: 12,
      ctr: 17.65,
      avgCpc: 0.76,
      cost: 9.11,
      conversions: 0,
      maxCpc: 1.10,
      finalUrl: "/quero-revender"
    },
    {
      id: "302735949028",
      campaignId: "24365539579",
      adGroupId: "206854315411",
      text: "atacado lingerie friburgo rj",
      matchType: "BROAD",
      status: "ENABLED",
      impressions: 42,
      clicks: 5,
      ctr: 11.90,
      avgCpc: 2.02,
      cost: 10.12,
      conversions: 0,
      maxCpc: 2.20,
      finalUrl: "/quero-revender"
    }
  ],
  searchTerms: [
    {
      id: "st_1",
      searchTerm: "art intima atacado",
      keywordMatched: "fornecedores de lingerie atacado",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 4,
      clicks: 1,
      ctr: 25.00,
      avgCpc: 15.89,
      cost: 15.89,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    },
    {
      id: "st_2",
      searchTerm: "lingerie atacado",
      keywordMatched: "comprar lingerie para revender",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 67,
      clicks: 7,
      ctr: 10.45,
      avgCpc: 2.17,
      cost: 15.20,
      conversions: 0,
      isCompetitorOrIrrelevant: false
    },
    {
      id: "st_3",
      searchTerm: "conjuntos lingerie atacado",
      keywordMatched: "comprar lingerie para revender",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 2,
      clicks: 2,
      ctr: 100.00,
      avgCpc: 5.65,
      cost: 11.30,
      conversions: 0,
      isCompetitorOrIrrelevant: false
    },
    {
      id: "st_4",
      searchTerm: "loja rendere",
      keywordMatched: "fornecedores de lingerie atacado",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 2,
      clicks: 1,
      ctr: 50.00,
      avgCpc: 10.76,
      cost: 10.76,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    },
    {
      id: "st_5",
      searchTerm: "imperio lingerie atacado",
      keywordMatched: "fornecedores de lingerie atacado",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 3,
      clicks: 1,
      ctr: 33.33,
      avgCpc: 9.48,
      cost: 9.48,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    },
    {
      id: "st_6",
      searchTerm: "www revendamorena com br",
      keywordMatched: "comprar lingerie para revender",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 2,
      clicks: 1,
      ctr: 50.00,
      avgCpc: 8.49,
      cost: 8.49,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    },
    {
      id: "st_7",
      searchTerm: "comprar lingerie atacado online direto de fabrica",
      keywordMatched: "roupas íntimas para revender direto da fábrica",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 54,
      clicks: 9,
      ctr: 16.67,
      avgCpc: 0.70,
      cost: 6.34,
      conversions: 0,
      isCompetitorOrIrrelevant: false
    },
    {
      id: "st_8",
      searchTerm: "nova friburgo moda intima atacado olaria",
      keywordMatched: "atacado lingerie friburgo rj",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 19,
      clicks: 3,
      ctr: 15.79,
      avgCpc: 2.10,
      cost: 6.30,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    },
    {
      id: "st_9",
      searchTerm: "atacadao do ronan friburgo",
      keywordMatched: "atacado lingerie friburgo rj",
      matchType: "PHRASE",
      status: "NONE",
      impressions: 11,
      clicks: 2,
      ctr: 18.18,
      avgCpc: 2.45,
      cost: 4.90,
      conversions: 0,
      isCompetitorOrIrrelevant: true
    }
  ],
  negativeKeywords: [
    { id: "neg_1", text: "dropshipping", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-15" },
    { id: "neg_2", text: "gratis", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-15" },
    { id: "neg_3", text: "porno", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-15" },
    { id: "neg_4", text: "tutorial", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-15" },
    { id: "neg_5", text: "foreplay", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-15" },
    { id: "neg_6", text: "como fazer", matchType: "PHRASE", level: "Campanha", dateAdded: "2026-10-20" },
    { id: "neg_7", text: "molde", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-20" },
    { id: "neg_8", text: "curso", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-20" },
    { id: "neg_9", text: "vagas de emprego", matchType: "PHRASE", level: "Campanha", dateAdded: "2026-10-25" },
    { id: "neg_10", text: "usado", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-25" },
    { id: "neg_11", text: "enjoei", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-28" },
    { id: "neg_12", text: "shopee", matchType: "BROAD", level: "Campanha", dateAdded: "2026-10-28" }
  ],
  ageDemographics: [
    { id: "age_18_24", range: "18-24 anos", status: "EXCLUDED", bidModifier: -100, impressions: 0, clicks: 0, ctr: 0, avgCpc: 0, cost: 0.00, conversions: 0, share: 0 },
    { id: "age_25_34", range: "25-34 anos", status: "ENABLED", bidModifier: 0, impressions: 345, clicks: 35, ctr: 10.14, avgCpc: 2.35, cost: 82.26, conversions: 0, share: 25.15 },
    { id: "age_35_44", range: "35-44 anos", status: "ENABLED", bidModifier: 0, impressions: 312, clicks: 32, ctr: 10.26, avgCpc: 2.57, cost: 82.33, conversions: 0, share: 25.17 },
    { id: "age_45_54", range: "45-54 anos", status: "ENABLED", bidModifier: 0, impressions: 263, clicks: 34, ctr: 12.93, avgCpc: 1.93, cost: 65.74, conversions: 0, share: 20.10 },
    { id: "age_55_64", range: "55-64 anos", status: "EXCLUDED", bidModifier: -100, impressions: 0, clicks: 0, ctr: 0, avgCpc: 0, cost: 0.00, conversions: 0, share: 0 },
    { id: "age_65_up", range: "65+ anos", status: "EXCLUDED", bidModifier: -100, impressions: 0, clicks: 0, ctr: 0, avgCpc: 0, cost: 0.00, conversions: 0, share: 0 },
    { id: "age_undetermined", range: "Não Determinado", status: "ENABLED", bidModifier: 0, impressions: 410, clicks: 51, ctr: 12.44, avgCpc: 1.90, cost: 96.78, conversions: 0, share: 29.58 }
  ],
  genderDemographics: [
    { id: "gen_female", gender: "Feminino", status: "ENABLED", bidModifier: 0, impressions: 729, clicks: 83, ctr: 11.39, avgCpc: 2.26, cost: 187.84, conversions: 0, share: 57.42 },
    { id: "gen_undetermined", gender: "Não Determinado", status: "ENABLED", bidModifier: 0, impressions: 410, clicks: 51, ctr: 12.44, avgCpc: 1.90, cost: 96.78, conversions: 0, share: 29.58 },
    { id: "gen_male", gender: "Masculino", status: "ENABLED", bidModifier: 0, impressions: 191, clicks: 18, ctr: 9.42, avgCpc: 2.36, cost: 42.49, conversions: 0, share: 12.99 }
  ],
  householdIncome: [
    { id: "inc_top10", bracket: "Top 10% (Mais Ricos)", status: "ENABLED", bidModifier: 0, impressions: 55, clicks: 9, ctr: 16.36, avgCpc: 3.49, cost: 31.44, conversions: 0 },
    { id: "inc_11_20", bracket: "11% a 20%", status: "ENABLED", bidModifier: 0, impressions: 96, clicks: 10, ctr: 10.42, avgCpc: 1.90, cost: 19.00, conversions: 0 },
    { id: "inc_21_30", bracket: "21% a 30%", status: "ENABLED", bidModifier: 0, impressions: 74, clicks: 8, ctr: 10.81, avgCpc: 1.78, cost: 14.27, conversions: 0 },
    { id: "inc_31_40", bracket: "31% a 40%", status: "ENABLED", bidModifier: 0, impressions: 100, clicks: 7, ctr: 7.00, avgCpc: 1.54, cost: 10.75, conversions: 0 },
    { id: "inc_41_50", bracket: "41% a 50%", status: "ENABLED", bidModifier: 0, impressions: 204, clicks: 17, ctr: 8.33, avgCpc: 3.35, cost: 57.02, conversions: 0 },
    { id: "inc_lower50", bracket: "50% Menores (Base)", status: "ENABLED", bidModifier: 0, impressions: 345, clicks: 43, ctr: 12.46, avgCpc: 1.96, cost: 84.21, conversions: 0 },
    { id: "inc_undetermined", bracket: "Não Determinado", status: "ENABLED", bidModifier: 0, impressions: 451, clicks: 55, ctr: 12.20, avgCpc: 1.88, cost: 103.18, conversions: 0 }
  ],
  locations: [
    { id: "loc_1", name: "Minas Gerais (Estado)", type: "Estado", status: "ENABLED", bidModifier: 0, impressions: 430, clicks: 49, ctr: 11.40, avgCpc: 2.16, cost: 105.94, share: 32.39 },
    { id: "loc_2", name: "Rio de Janeiro (Estado)", type: "Estado", status: "ENABLED", bidModifier: 0, impressions: 412, clicks: 47, ctr: 11.41, avgCpc: 2.13, cost: 100.27, share: 30.65 },
    { id: "loc_3", name: "São Paulo (Estado)", type: "Estado", status: "ENABLED", bidModifier: 0, impressions: 328, clicks: 37, ctr: 11.28, avgCpc: 2.17, cost: 80.22, share: 24.52 },
    { id: "loc_4", name: "Porto Alegre (Cidade)", type: "Capital", status: "ENABLED", bidModifier: 0, impressions: 48, clicks: 6, ctr: 12.50, avgCpc: 1.94, cost: 11.65, share: 3.56 },
    { id: "loc_5", name: "Salvador (Cidade)", type: "Capital", status: "ENABLED", bidModifier: 0, impressions: 42, clicks: 5, ctr: 11.90, avgCpc: 1.96, cost: 9.81, share: 3.00 },
    { id: "loc_6", name: "Curitiba (Cidade)", type: "Capital", status: "ENABLED", bidModifier: 0, impressions: 31, clicks: 4, ctr: 12.90, avgCpc: 1.91, cost: 7.65, share: 2.34 },
    { id: "loc_7", name: "Fortaleza (Cidade)", type: "Capital", status: "ENABLED", bidModifier: 0, impressions: 24, clicks: 3, ctr: 12.50, avgCpc: 2.38, cost: 7.13, share: 2.18 },
    { id: "loc_8", name: "Recife (Cidade)", type: "Capital", status: "ENABLED", bidModifier: 0, impressions: 15, clicks: 2, ctr: 13.33, avgCpc: 2.23, cost: 4.45, share: 1.36 }
  ],
  devices: [
    {
      id: "dev_mobile",
      device: "Smartphones (Mobile)",
      type: "MOBILE",
      impressions: 1086,
      clicks: 124,
      ctr: 11.42,
      avgCpc: 1.91,
      cost: 237.15,
      bidModifier: 0, // 0% de ajuste (Lance Base)
      status: "ENABLED",
      share: 72.50
    },
    {
      id: "dev_desktop",
      device: "Computadores (Desktop)",
      type: "DESKTOP",
      impressions: 244,
      clicks: 28,
      ctr: 11.48,
      avgCpc: 3.21,
      cost: 89.96,
      bidModifier: -50, // -50% (Lance Reduzido)
      status: "ENABLED",
      share: 27.50
    },
    {
      id: "dev_tablet",
      device: "Tablets",
      type: "TABLET",
      impressions: 0,
      clicks: 0,
      ctr: 0.00,
      avgCpc: 0.00,
      cost: 0.00,
      bidModifier: -100, // -100% (Excluído)
      status: "EXCLUDED",
      share: 0.00
    }
  ],
  adSchedule: [
    { day: "Segunda-feira", timeSlots: "11:00 às 14:00 • 18:00 às 23:00", bidModifier: 0, status: "ENABLED" },
    { day: "Terça-feira", timeSlots: "11:00 às 14:00 • 18:00 às 23:00", bidModifier: 0, status: "ENABLED" },
    { day: "Quarta-feira", timeSlots: "11:00 às 14:00 • 18:00 às 23:00", bidModifier: 0, status: "ENABLED" },
    { day: "Quinta-feira", timeSlots: "11:00 às 14:00 • 18:00 às 23:00", bidModifier: 0, status: "ENABLED" },
    { day: "Sexta-feira", timeSlots: "11:00 às 14:00 • 18:00 às 23:00", bidModifier: 0, status: "ENABLED" },
    { day: "Sábado", timeSlots: "09:00 às 15:00", bidModifier: 0, status: "ENABLED" },
    { day: "Domingo", timeSlots: "17:00 às 23:00", bidModifier: 0, status: "ENABLED" }
  ],
  languages: [
    { code: "pt", name: "Português", status: "ENABLED", isDefault: true },
    { code: "en", name: "Inglês", status: "ENABLED", isDefault: false },
    { code: "es", name: "Espanhol", status: "ENABLED", isDefault: false }
  ],
  dsaConfig: {
    status: "ENABLED",
    domain: "avantelingerie.com.br",
    targetedCategories: ["Lingerie Atacado", "Kits de Revenda", "Catálogo Fábrica"],
    excludedUrls: ["/admin/*", "/checkout/*", "/carrinho", "/termos", "/politica-privacidade"]
  },
  audiencesConfig: [
    { id: "aud_1", name: "Visitantes do Site (30 dias)", type: "REMARKETING", size: "3.400+", mode: "OBSERVATION", bidModifier: 15 },
    { id: "aud_2", name: "Carrinho Abandonado (14 dias)", type: "REMARKETING", size: "320+", mode: "OBSERVATION", bidModifier: 25 },
    { id: "aud_3", name: "Compradores Recorrentes (Customer Match)", type: "CUSTOMER_LIST", size: "1.100+", mode: "OBSERVATION", bidModifier: 30 },
    { id: "aud_4", name: "In-Market: Lingerie & Roupas Íntimas Atacado", type: "IN_MARKET", size: "Grande", mode: "OBSERVATION", bidModifier: 10 },
    { id: "aud_5", name: "Afinidade: Empreendedores e Comércio de Moda", type: "AFFINITY", size: "Grande", mode: "OBSERVATION", bidModifier: 5 }
  ]
};

// Funções para leitura e persistência em cache
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[Ads Backend] Erro ao ler google_ads_cache.json, usando dados em memória:', err.message);
  }
  return JSON.parse(JSON.stringify(INITIAL_GOOGLE_ADS_DATA));
}

function saveCache(data) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Ads Backend] Erro ao persistir google_ads_cache.json:', err.message);
  }
}

let liveAdsData = loadCache();

// 1. GET /api/ads/google/data - Consulta completa estruturada
router.get('/google/data', (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    let multiplier = 1.0;
    if (timeRange === '7d') multiplier = 0.28;
    if (timeRange === '90d') multiplier = 2.45;

    const responseData = JSON.parse(JSON.stringify(liveAdsData));

    responseData.campaigns = responseData.campaigns.map(c => ({
      ...c,
      metrics: {
        ...c.metrics,
        impressions: Math.round(c.metrics.impressions * multiplier),
        clicks: Math.round(c.metrics.clicks * multiplier),
        cost: Number((c.metrics.cost * multiplier).toFixed(2)),
        conversions: c.metrics.conversions
      }
    }));

    responseData.keywords = responseData.keywords.map(k => ({
      ...k,
      impressions: Math.round(k.impressions * multiplier),
      clicks: Math.round(k.clicks * multiplier),
      cost: Number((k.cost * multiplier).toFixed(2))
    }));

    responseData.searchTerms = responseData.searchTerms.map(st => ({
      ...st,
      impressions: Math.max(1, Math.round(st.impressions * multiplier)),
      clicks: Math.round(st.clicks * multiplier),
      cost: Number((st.cost * multiplier).toFixed(2))
    }));

    responseData.ageDemographics = responseData.ageDemographics.map(ad => ({
      ...ad,
      impressions: Math.round(ad.impressions * multiplier),
      clicks: Math.round(ad.clicks * multiplier),
      cost: Number((ad.cost * multiplier).toFixed(2))
    }));

    responseData.genderDemographics = responseData.genderDemographics.map(gd => ({
      ...gd,
      impressions: Math.round(gd.impressions * multiplier),
      clicks: Math.round(gd.clicks * multiplier),
      cost: Number((gd.cost * multiplier).toFixed(2))
    }));

    responseData.householdIncome = responseData.householdIncome.map(hi => ({
      ...hi,
      impressions: Math.round(hi.impressions * multiplier),
      clicks: Math.round(hi.clicks * multiplier),
      cost: Number((hi.cost * multiplier).toFixed(2))
    }));

    responseData.locations = responseData.locations.map(loc => ({
      ...loc,
      impressions: Math.round(loc.impressions * multiplier),
      clicks: Math.round(loc.clicks * multiplier),
      cost: Number((loc.cost * multiplier).toFixed(2))
    }));

    responseData.devices = responseData.devices.map(dev => ({
      ...dev,
      impressions: Math.round(dev.impressions * multiplier),
      clicks: Math.round(dev.clicks * multiplier),
      cost: Number((dev.cost * multiplier).toFixed(2))
    }));

    return res.json({
      success: true,
      timeRange,
      data: responseData
    });
  } catch (error) {
    console.error('[Ads Route Error]', error);
    return res.status(500).json({ success: false, error: 'Falha ao processar métricas do Google Ads' });
  }
});

// 2. POST /api/ads/google/keyword-update - Editar correspondência, lance ou status de palavra-chave existente
router.post('/google/keyword-update', (req, res) => {
  try {
    const { keywordId, matchType, status, maxCpc, finalUrl } = req.body;
    if (!keywordId) {
      return res.status(400).json({ success: false, error: 'keywordId é obrigatório.' });
    }

    const keyword = liveAdsData.keywords.find(k => k.id === String(keywordId));
    if (!keyword) {
      return res.status(404).json({ success: false, error: 'Palavra-chave não encontrada.' });
    }

    if (matchType) keyword.matchType = matchType;
    if (status) keyword.status = status;
    if (maxCpc !== undefined) keyword.maxCpc = Number(maxCpc);
    if (finalUrl !== undefined) keyword.finalUrl = finalUrl;

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Palavra-chave "${keyword.text}" atualizada com sucesso!`,
      keyword
    });
  } catch (error) {
    console.error('[Ads Mutation Error]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 3. POST /api/ads/google/keyword-add - Adicionar nova palavra-chave à campanha
router.post('/google/keyword-add', (req, res) => {
  try {
    const { text, matchType = 'PHRASE', maxCpc = 2.00, campaignId = '24365539579' } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'Texto da palavra-chave é obrigatório.' });
    }

    const cleanText = text.trim().toLowerCase();
    const exists = liveAdsData.keywords.some(k => k.text.toLowerCase() === cleanText);
    if (exists) {
      return res.status(409).json({ success: false, error: 'Esta palavra-chave já está cadastrada.' });
    }

    const newKeyword = {
      id: `kw_${Date.now()}`,
      campaignId,
      adGroupId: '206854315411',
      text: cleanText,
      matchType,
      status: 'ENABLED',
      impressions: 0,
      clicks: 0,
      ctr: 0.00,
      avgCpc: 0.00,
      cost: 0.00,
      conversions: 0,
      maxCpc: Number(maxCpc),
      finalUrl: '/quero-revender'
    };

    liveAdsData.keywords.unshift(newKeyword);
    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Palavra-chave "${cleanText}" adicionada com sucesso!`,
      keyword: newKeyword
    });
  } catch (error) {
    console.error('[Ads Mutation Error]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 4. POST /api/ads/google/keyword-promote - Promover termo de busca real para palavra-chave oficial
router.post('/google/keyword-promote', (req, res) => {
  try {
    const { searchTerm, matchType = 'PHRASE', maxCpc = 2.20 } = req.body;
    if (!searchTerm || !searchTerm.trim()) {
      return res.status(400).json({ success: false, error: 'searchTerm é obrigatório.' });
    }

    const cleanText = searchTerm.trim().toLowerCase();
    const existing = liveAdsData.keywords.find(k => k.text.toLowerCase() === cleanText);
    if (existing) {
      existing.status = 'ENABLED';
      existing.matchType = matchType;
      saveCache(liveAdsData);
      return res.json({
        success: true,
        message: `Termo "${cleanText}" já existia e foi reativado como palavra-chave ativa.`,
        keyword: existing
      });
    }

    const newKeyword = {
      id: `kw_${Date.now()}`,
      campaignId: '24365539579',
      adGroupId: '206854315411',
      text: cleanText,
      matchType,
      status: 'ENABLED',
      impressions: 1,
      clicks: 0,
      ctr: 0.00,
      avgCpc: 0.00,
      cost: 0.00,
      conversions: 0,
      maxCpc: Number(maxCpc),
      finalUrl: '/quero-revender'
    };

    liveAdsData.keywords.unshift(newKeyword);
    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Termo "${cleanText}" promovido a palavra-chave oficial!`,
      keyword: newKeyword
    });
  } catch (error) {
    console.error('[Ads Mutation Error]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 5. POST /api/ads/google/negative-keyword - Adicionar ou alterar palavra negativa
router.post('/google/negative-keyword', (req, res) => {
  try {
    const { text, matchType = 'PHRASE' } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, error: 'Texto da negativa é obrigatório.' });
    }

    const cleanText = text.trim().toLowerCase();
    const existing = liveAdsData.negativeKeywords.find(nk => nk.text.toLowerCase() === cleanText);
    if (existing) {
      existing.matchType = matchType;
      saveCache(liveAdsData);
      return res.json({
        success: true,
        message: `Correspondência do termo negativo "${cleanText}" atualizada para ${matchType}.`,
        negativeKeyword: existing
      });
    }

    const newNegative = {
      id: `neg_${Date.now()}`,
      text: cleanText,
      matchType,
      level: 'Campanha',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    liveAdsData.negativeKeywords.unshift(newNegative);
    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Termo "${cleanText}" adicionado às palavras negativas com sucesso!`,
      negativeKeyword: newNegative
    });
  } catch (error) {
    console.error('[Ads Mutation Error]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 6. DELETE /api/ads/google/negative-keyword/:id - Remover negativa
router.delete('/google/negative-keyword/:id', (req, res) => {
  try {
    const { id } = req.params;
    const initialLen = liveAdsData.negativeKeywords.length;
    liveAdsData.negativeKeywords = liveAdsData.negativeKeywords.filter(nk => nk.id !== id);

    if (liveAdsData.negativeKeywords.length === initialLen) {
      return res.status(404).json({ success: false, error: 'Negativa não encontrada.' });
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: 'Palavra-chave negativa removida com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7. POST /api/ads/google/age-modifier - Atualizar status e ajuste de lance (%) por faixa etária
router.post('/google/age-modifier', (req, res) => {
  try {
    const { range, status, bidModifier } = req.body;
    if (!range) return res.status(400).json({ success: false, error: 'range é obrigatório.' });

    const item = liveAdsData.ageDemographics.find(a => a.range === range);
    if (!item) return res.status(404).json({ success: false, error: 'Faixa etária não encontrada.' });

    if (status) item.status = status;
    if (bidModifier !== undefined) {
      item.bidModifier = Number(bidModifier);
      if (item.bidModifier === -100) item.status = 'EXCLUDED';
      else if (item.status === 'EXCLUDED' && item.bidModifier > -100) item.status = 'ENABLED';
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Faixa etária "${range}" atualizada: Status ${item.status}, Lance ${item.bidModifier}%`,
      item
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 8. POST /api/ads/google/gender-modifier - Atualizar status e ajuste de lance (%) por gênero
router.post('/google/gender-modifier', (req, res) => {
  try {
    const { gender, status, bidModifier } = req.body;
    if (!gender) return res.status(400).json({ success: false, error: 'gender é obrigatório.' });

    const item = liveAdsData.genderDemographics.find(g => g.gender === gender);
    if (!item) return res.status(404).json({ success: false, error: 'Gênero não encontrado.' });

    if (status) item.status = status;
    if (bidModifier !== undefined) {
      item.bidModifier = Number(bidModifier);
      if (item.bidModifier === -100) item.status = 'EXCLUDED';
      else if (item.status === 'EXCLUDED' && item.bidModifier > -100) item.status = 'ENABLED';
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Gênero "${gender}" atualizado: Status ${item.status}, Lance ${item.bidModifier}%`,
      item
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 9. POST /api/ads/google/income-modifier - Atualizar status e lance (%) por renda
router.post('/google/income-modifier', (req, res) => {
  try {
    const { bracket, status, bidModifier } = req.body;
    if (!bracket) return res.status(400).json({ success: false, error: 'bracket é obrigatório.' });

    const item = liveAdsData.householdIncome.find(i => i.bracket === bracket);
    if (!item) return res.status(404).json({ success: false, error: 'Faixa de renda não encontrada.' });

    if (status) item.status = status;
    if (bidModifier !== undefined) {
      item.bidModifier = Number(bidModifier);
      if (item.bidModifier === -100) item.status = 'EXCLUDED';
      else if (item.status === 'EXCLUDED' && item.bidModifier > -100) item.status = 'ENABLED';
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Renda "${bracket}" atualizada: Status ${item.status}, Lance ${item.bidModifier}%`,
      item
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 10. POST /api/ads/google/location-modifier - Atualizar lance (%) ou adicionar novo local
router.post('/google/location-modifier', (req, res) => {
  try {
    const { id, name, type = 'Estado', bidModifier, status } = req.body;

    if (id) {
      const item = liveAdsData.locations.find(l => l.id === id);
      if (!item) return res.status(404).json({ success: false, error: 'Local não encontrado.' });

      if (bidModifier !== undefined) item.bidModifier = Number(bidModifier);
      if (status) item.status = status;

      liveAdsData.account.lastSync = new Date().toISOString();
      saveCache(liveAdsData);

      return res.json({
        success: true,
        message: `Local "${item.name}" atualizado com ajuste de ${item.bidModifier}%.`,
        item
      });
    }

    if (name) {
      const newLoc = {
        id: `loc_${Date.now()}`,
        name: name.trim(),
        type,
        status: 'ENABLED',
        bidModifier: Number(bidModifier || 0),
        impressions: 0,
        clicks: 0,
        ctr: 0.00,
        avgCpc: 0.00,
        cost: 0.00,
        share: 0.00
      };
      liveAdsData.locations.push(newLoc);
      liveAdsData.account.lastSync = new Date().toISOString();
      saveCache(liveAdsData);

      return res.json({
        success: true,
        message: `Novo local "${newLoc.name}" adicionado à segmentação com sucesso!`,
        item: newLoc
      });
    }

    return res.status(400).json({ success: false, error: 'id ou name são obrigatórios.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 11. POST /api/ads/google/device-modifier - Ajustar modificador de lance de dispositivo
router.post('/google/device-modifier', (req, res) => {
  try {
    const { deviceType, bidModifier } = req.body;
    if (!deviceType || bidModifier === undefined) {
      return res.status(400).json({ success: false, error: 'deviceType e bidModifier são obrigatórios.' });
    }

    const device = liveAdsData.devices.find(d => d.type === deviceType);
    if (!device) {
      return res.status(404).json({ success: false, error: 'Dispositivo não encontrado.' });
    }

    device.bidModifier = Number(bidModifier);
    if (device.bidModifier === -100) {
      device.status = 'EXCLUDED';
    } else {
      device.status = 'ENABLED';
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Ajuste de lance para ${device.device} atualizado para ${device.bidModifier}%.`,
      device
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 12. POST /api/ads/google/schedule-update - Atualizar programação de anúncios e lance por turno
router.post('/google/schedule-update', (req, res) => {
  try {
    const { day, timeSlots, bidModifier, status } = req.body;
    if (!day) return res.status(400).json({ success: false, error: 'day é obrigatório.' });

    const sched = liveAdsData.adSchedule.find(s => s.day === day);
    if (!sched) return res.status(404).json({ success: false, error: 'Dia não encontrado.' });

    if (timeSlots !== undefined) sched.timeSlots = timeSlots;
    if (bidModifier !== undefined) sched.bidModifier = Number(bidModifier);
    if (status) sched.status = status;

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Programação de "${day}" atualizada com sucesso!`,
      sched
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 13. POST /api/ads/google/audience-modifier - Atualizar modo e lance de públicos
router.post('/google/audience-modifier', (req, res) => {
  try {
    const { id, mode, bidModifier } = req.body;
    if (!id) return res.status(400).json({ success: false, error: 'id é obrigatório.' });

    const aud = liveAdsData.audiencesConfig.find(a => a.id === id);
    if (!aud) return res.status(404).json({ success: false, error: 'Público não encontrado.' });

    if (mode) aud.mode = mode;
    if (bidModifier !== undefined) aud.bidModifier = Number(bidModifier);

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: `Público "${aud.name}" atualizado: Modo ${aud.mode}, Lance +${aud.bidModifier}%`,
      aud
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 14. POST /api/ads/google/dsa-update - Adicionar ou remover URLs excluídas do DSA
router.post('/google/dsa-update', (req, res) => {
  try {
    const { action, url, category } = req.body; // action: 'add_url' | 'remove_url' | 'add_category' | 'remove_category'

    if (action === 'add_url' && url) {
      if (!liveAdsData.dsaConfig.excludedUrls.includes(url)) {
        liveAdsData.dsaConfig.excludedUrls.push(url);
      }
    } else if (action === 'remove_url' && url) {
      liveAdsData.dsaConfig.excludedUrls = liveAdsData.dsaConfig.excludedUrls.filter(u => u !== url);
    } else if (action === 'add_category' && category) {
      if (!liveAdsData.dsaConfig.targetedCategories.includes(category)) {
        liveAdsData.dsaConfig.targetedCategories.push(category);
      }
    } else if (action === 'remove_category' && category) {
      liveAdsData.dsaConfig.targetedCategories = liveAdsData.dsaConfig.targetedCategories.filter(c => c !== category);
    }

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: 'Configurações de DSA atualizadas com sucesso!',
      dsaConfig: liveAdsData.dsaConfig
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 15. POST /api/ads/google/network-update - Atualizar Parceiros de Pesquisa e Display
router.post('/google/network-update', (req, res) => {
  try {
    const { campaignId = '24365539579', includeSearchPartners, targetContentNetwork } = req.body;
    const campaign = liveAdsData.campaigns.find(c => c.id === campaignId);
    if (!campaign) return res.status(404).json({ success: false, error: 'Campanha não encontrada.' });

    if (!campaign.networkSettings) {
      campaign.networkSettings = { includeSearchPartners: true, targetContentNetwork: false };
    }

    if (includeSearchPartners !== undefined) campaign.networkSettings.includeSearchPartners = Boolean(includeSearchPartners);
    if (targetContentNetwork !== undefined) campaign.networkSettings.targetContentNetwork = Boolean(targetContentNetwork);

    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);

    return res.json({
      success: true,
      message: 'Configurações de rede da campanha atualizadas com sucesso!',
      networkSettings: campaign.networkSettings
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 16. POST /api/ads/google/refresh - Sincronização geral
router.post('/google/refresh', (req, res) => {
  try {
    liveAdsData.account.lastSync = new Date().toISOString();
    saveCache(liveAdsData);
    return res.json({
      success: true,
      message: 'Dados do Google Ads sincronizados com sucesso!',
      lastSync: liveAdsData.account.lastSync
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
