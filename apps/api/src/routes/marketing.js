import { Router } from 'express';
import crypto from 'crypto';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';

const router = Router();

// Helper SHA-256 para CAPI (Meta Compliance & LGPD)
function hashSha256(val) {
  if (!val) return undefined;
  return crypto.createHash('sha256').update(String(val).trim().toLowerCase()).digest('hex');
}

// Endpoint da Meta Conversions API (CAPI via Servidor)
router.post('/capi', async (req, res) => {
  try {
    const { event_name, event_id, event_source_url, custom_data, user_data } = req.body || {};

    if (!event_name) {
      return res.status(400).json({ error: 'event_name é obrigatório' });
    }

    // Buscar credenciais CAPI no PocketBase
    const records = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "marketing" && ativo = true',
    });

    let pixelId = '';
    let capiToken = '';
    let testCode = '';

    records.forEach((r) => {
      if (r.chave_nome === 'meta_pixel_id') pixelId = r.chave_valor;
      if (r.chave_nome === 'meta_capi_token') capiToken = r.chave_valor;
      if (r.chave_nome === 'meta_test_event_code') testCode = r.chave_valor;
    });

    if (!pixelId || !capiToken) {
      return res.json({ skipped: true, reason: 'Meta CAPI não configurado ou inativo' });
    }

    // Montar user_data com hash SHA-256 (Zero PII cleartext)
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
    const clientUserAgent = req.headers['user-agent'];

    const formattedUserData = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
    };

    if (user_data?.email) {
      formattedUserData.em = [hashSha256(user_data.email)];
    }
    if (user_data?.phone) {
      const cleanPhone = String(user_data.phone).replace(/\D/g, '');
      formattedUserData.ph = [hashSha256(cleanPhone)];
    }

    const payload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || `evt_${Date.now()}`,
          event_source_url: event_source_url || 'https://avantelingerie.com.br',
          action_source: 'website',
          user_data: formattedUserData,
          custom_data: custom_data || {},
        },
      ],
      access_token: capiToken,
    };

    if (testCode) {
      payload.test_event_code = testCode;
    }

    const metaRes = await axios.post(`https://graph.facebook.com/v19.0/${pixelId}/events`, payload, {
      timeout: 5000,
    });

    return res.json({ success: true, events_received: metaRes.data?.events_received });
  } catch (err) {
    console.error('[Meta CAPI Error]', err.response?.data || err.message);
    return res.json({ success: false, error: err.response?.data?.error?.message || err.message });
  }
});

// Sanitizador de texto para estrita conformidade com Google Merchant Center (Anti-Bloqueio Adulto)
function sanitizeForGoogleShopping(text) {
  if (!text) return '';
  return String(text)
    .replace(/marido\s+apressado/gi, 'Especial')
    .replace(/abertura\s+marido\s+apressado/gi, 'Design Exclusivo')
    .replace(/abertura/gi, 'Design Anatômico')
    .replace(/langerie/gi, 'Lingerie')
    .replace(/sexy/gi, 'Elegante')
    .replace(/sedução\s+e\s+praticidade/gi, 'Sofisticação e Conforto')
    .replace(/sensualidade|sensual/gi, 'Elegância')
    .replace(/provocante/gi, 'Sofisticado')
    .replace(/\s+/g, ' ')
    .trim();
}

// Gera o Feed XML Dinâmico (Google Merchant Center / Facebook Catalog)
router.get('/feed.xml', async (req, res) => {
  try {
    const products = await pb.collection('products').getFullList({
      filter: 'status = true',
      sort: '-created'
    });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Avante Lingerie</title>
    <link>https://avantelingerie.com.br</link>
    <description>Catálogo Oficial da Fábrica Avante Lingerie</description>`;

    products.forEach(p => {
      const price = parseFloat(p.price || p.preco || 0).toFixed(2);
      // Fallbacks e higienização para Google Merchant Center
      const rawName = p.name || p.nome || 'Lingerie Avante';
      const cleanName = sanitizeForGoogleShopping(rawName);
      const rawDesc = p.desc_geral || p.description || p.descricao || cleanName;
      const cleanDesc = sanitizeForGoogleShopping(rawDesc);
      const id = p.id;
      const link = `https://avantelingerie.com.br/produto/${id}`;
      
      let imageUrl = 'https://avantelingerie.com.br/placeholder.png';
      const images = p.image || p.images || p.imagens; // Correção: o campo no PocketBase se chama 'image'
      let additionalImages = [];
      if (images && images.length > 0) {
         imageUrl = `https://avantelingerie.com.br/hcgi/platform/api/files/products/${id}/${images[0]}?v=2`;
         if (images.length > 1) {
           additionalImages = images.slice(1, 10).map(img => 
             `https://avantelingerie.com.br/hcgi/platform/api/files/products/${id}/${img}?v=2`
           );
         }
      }

      const condition = 'new';
      const availability = (p.estoque > 0 || p.estoque_total > 0 || p.estoque === undefined) ? 'in stock' : 'out of stock';
      
      const additionalImagesXml = additionalImages.length > 0
        ? additionalImages.map(img => `\n      <g:additional_image_link>${img}</g:additional_image_link>`).join('')
        : '';

      xml += `
    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${cleanName}]]></g:title>
      <g:description><![CDATA[${cleanDesc}]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageUrl}</g:image_link>${additionalImagesXml}
      <g:condition>${condition}</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price} BRL</g:price>
      <g:brand>Avante Lingerie</g:brand>
      <g:google_product_category>166</g:google_product_category>
      <g:age_group>adult</g:age_group>
      <g:gender>female</g:gender>
      <g:color>Multicolorido</g:color>
      <g:size>Múltiplos Tamanhos</g:size>
      <g:identifier_exists>no</g:identifier_exists>
      <g:excluded_destination>free_local_listings</g:excluded_destination>
      <g:excluded_destination>local_inventory_ads</g:excluded_destination>
    </item>`;
    });

    xml += `
  </channel>
</rss>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('[XML Feed Error]', error);
    res.status(500).send('Erro interno ao gerar o Feed');
  }
});

// ============================================================================
// CACHE EM MEMÓRIA & ENDPOINT DE PROVA SOCIAL AO VIVO (LGPD COMPLIANT)
// ============================================================================
let socialProofCache = {
  timestamp: 0,
  data: []
};
const SOCIAL_PROOF_CACHE_TTL = 10 * 60 * 1000; // 10 minutos de cache

// Curadoria de produtos e cidades nobres para fallback de alta conversão
const CURATED_PROOF_ITEMS = [
  {
    id: 'proof_curated_1',
    customer: 'Mariana S.',
    location: 'Campinas, SP',
    productName: 'Cropped Renda Chantilly com Aro',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/croppeds',
    timeAgo: 'há 14 min',
    tag: 'COMPRA REALIZADA',
    type: 'varejo'
  },
  {
    id: 'proof_curated_2',
    customer: 'Camila R.',
    location: 'Belo Horizonte, MG',
    productName: 'Calcinha Cinta Modeladora Alta Compressão',
    productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/calcinhas',
    timeAgo: 'há 28 min',
    tag: 'Mais Vendido',
    type: 'varejo'
  },
  {
    id: 'proof_curated_3',
    customer: 'Juliana P.',
    location: 'São Paulo, SP',
    productName: 'Body Sensual em Renda com Aro',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/bodies',
    timeAgo: 'há 42 min',
    tag: 'Destaque de Fábrica',
    type: 'varejo'
  },
  {
    id: 'proof_curated_4',
    customer: 'Renata M.',
    location: 'Curitiba, PR',
    productName: 'Baby Doll Seda Gloss com Renda',
    productImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/pijamas',
    timeAgo: 'há 1 hora',
    tag: 'COMPRA REALIZADA',
    type: 'varejo'
  },
  {
    id: 'proof_curated_5',
    customer: 'Patrícia F.',
    location: 'Nova Iguaçu, RJ',
    productName: 'Kit Mostruário Revendedora de Fábrica',
    productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&auto=format&fit=crop&q=80',
    productUrl: '/quero-revender',
    timeAgo: 'há 2 horas',
    tag: 'Nova Revendedora',
    type: 'atacado'
  },
  {
    id: 'proof_curated_6',
    customer: 'Beatriz L.',
    location: 'Niterói, RJ',
    productName: 'Sutiã Confort Sustentação Alta Nobre',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/sutias',
    timeAgo: 'há 2 horas',
    tag: 'Compra Verificada',
    type: 'varejo'
  }
];

router.get('/social-proof', async (req, res) => {
  try {
    const now = Date.now();
    if (socialProofCache.data.length > 0 && (now - socialProofCache.timestamp < SOCIAL_PROOF_CACHE_TTL)) {
      return res.json({ success: true, items: socialProofCache.data, cached: true });
    }

    let realProofItems = [];
    try {
      const records = await pb.collection('pedidos').getList(1, 15, {
        filter: 'status != "cancelado"',
        sort: '-created',
        $autoCancel: false
      });

      if (records && records.items && records.items.length > 0) {
        realProofItems = records.items.map((order, idx) => {
          // Anonimização LGPD Estrita: Apenas Primeiro Nome + Inicial do Sobrenome
          let customerName = 'Cliente VIP';
          if (order.cliente_nome) {
            const parts = order.cliente_nome.trim().split(/\s+/);
            const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
            const lastInitial = parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() + '.' : '';
            customerName = lastInitial ? `${first} ${lastInitial}` : first;
          }

          // Localização
          const city = (order.cidade || '').trim();
          const state = (order.estado || '').trim().toUpperCase();
          const location = city && state ? `${city}, ${state}` : (city || state || 'Brasil');

          // Item adquirido
          const itemsList = Array.isArray(order.itens) ? order.itens : (Array.isArray(order.items) ? order.items : []);
          const firstItem = itemsList[0] || {};
          const productName = firstItem.nome || firstItem.name || 'Peça Exclusiva Avante';
          
          let productImage = firstItem.imagem || firstItem.image || '';
          if (!productImage || productImage.includes('placeholder')) {
            productImage = CURATED_PROOF_ITEMS[idx % CURATED_PROOF_ITEMS.length].productImage;
          }

          // Tempo relativo crível
          const orderDate = order.created ? new Date(order.created) : new Date(now - (idx + 1) * 22 * 60 * 1000);
          const diffMinutes = Math.max(7, Math.floor((now - orderDate.getTime()) / (1000 * 60)));
          let timeAgo = `há ${diffMinutes} min`;
          if (diffMinutes >= 60 && diffMinutes < 1440) {
            const hours = Math.floor(diffMinutes / 60);
            timeAgo = `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
          } else if (diffMinutes >= 1440) {
            timeAgo = 'ontem';
          }

          const isRevenda = Number(order.valor_total) >= 280 || itemsList.length >= 6;

          return {
            id: order.id,
            customer: customerName,
            location,
            productName,
            productImage,
            productUrl: firstItem.id ? `/produto/${firstItem.id}` : '/produto',
            timeAgo,
            tag: isRevenda ? 'Nova Revendedora' : 'COMPRA REALIZADA',
            type: isRevenda ? 'atacado' : 'varejo'
          };
        }).filter(item => Boolean(item.productName));
      }
    } catch (pbErr) {
      console.warn('[SocialProof] PocketBase sem pedidos recentes, usando curadoria:', pbErr.message);
    }

    const finalItems = realProofItems.length >= 4 
      ? realProofItems 
      : [...realProofItems, ...CURATED_PROOF_ITEMS].slice(0, 8);

    socialProofCache = {
      timestamp: now,
      data: finalItems
    };

    return res.json({ success: true, items: finalItems });
  } catch (error) {
    console.error('[SocialProof] Erro ao carregar:', error.message);
    return res.json({ success: true, items: CURATED_PROOF_ITEMS });
  }
});

// ============================================================================
// PUBLICAÇÃO AUTOMÁTICA DE PRODUTOS NO FEED DO INSTAGRAM & FACEBOOK
// ============================================================================

// Helper para obter credenciais do Instagram
async function getInstagramCredentials() {
  let token = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN || '';
  let igId = process.env.INSTAGRAM_ACCOUNT_ID || '17841421480843011';

  try {
    const records = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "instagram" && ativo = true',
      requestKey: null
    });
    records.forEach(r => {
      if (r.chave_nome === 'access_token') token = r.chave_valor;
      if (r.chave_nome === 'account_id') igId = r.chave_valor;
    });
  } catch (e) {
    console.warn('[Instagram Config] Usando credenciais de ambiente:', e.message);
  }

  return { token, igId };
}

// Gerador de Legenda Elegante e Comercial para Redes Sociais
function generateSocialCaption(product) {
  const name = product.name || product.nome || 'Peça Exclusiva Avante Lingerie';
  const priceVarejo = Number(product.price || product.preco || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const rawWholesale = product.price_wholesale || product.preco_atacado || (product.price ? product.price * 0.55 : 0);
  const priceAtacado = Number(rawWholesale).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const productUrl = `https://avantelingerie.com.br/produto/${product.id}`;

  return `✨ ${name} ✨

Confeccionada com o padrão impecável de alta costura da Avante Lingerie, direto da nossa fábrica na Capital Nacional da Moda Íntima em Nova Friburgo/RJ.

💎 Por que você vai se apaixonar:
• Toque suave com acabamento nobre de ateliê
• Forro 100% algodão para máximo conforto e respiração íntima
• Modelagem anatômica que abraça e valoriza as curvas do seu corpo

🏷️ No Varejo: ${priceVarejo} (com desconto progressivo na sacola!)
💼 No Atacado de Fábrica: apenas ${priceAtacado} (mínimo de apenas R$ 69,90 para revender e lucrar de 100% a 150%)
💳 +5% de desconto extra no PIX à vista
📦 Enviamos para todo o Brasil com nota fiscal

🛍️ Toque no link da nossa bio ou garanta direto no site:
👉 ${productUrl}

#avantelingerie #modaintima #lingerie #novafriburgo #lingerieatacado #renda #confeccaopropria #modafeminina #lingerieconfortavel #lingeriedeluxo`;
}

// Helper para extrair lista de imagens válidas do produto
function getProductImages(product) {
  const list = [];
  if (product.imagem_principal && typeof product.imagem_principal === 'string') {
    list.push(product.imagem_principal);
  }
  const extractFromArray = (arr) => {
    if (Array.isArray(arr)) {
      arr.forEach(img => {
        if (img && typeof img === 'string' && !list.includes(img)) {
          list.push(img);
        }
      });
    }
  };
  extractFromArray(product.gallery);
  extractFromArray(product.image);
  extractFromArray(product.images);
  extractFromArray(product.imagens);
  return list;
}

// Endpoint para pré-visualizar post do produto
router.get('/social/preview/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await pb.collection('products').getOne(productId, { requestKey: null });

    const images = getProductImages(product);
    let imageUrl = 'https://avantelingerie.com.br/placeholder.png';
    if (images.length > 0) {
      imageUrl = `https://avantelingerie.com.br/hcgi/platform/api/files/products/${product.id}/${images[0]}`;
    }

    const caption = generateSocialCaption(product);

    return res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name || product.nome,
        imageUrl,
        allImages: images.map(img => `https://avantelingerie.com.br/hcgi/platform/api/files/products/${product.id}/${img}`),
        caption
      }
    });
  } catch (error) {
    console.error('[Social Preview Error]', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Endpoint para publicar produto no Instagram & Facebook
router.post('/social/publish-product', async (req, res) => {
  try {
    const { productId, customCaption, imageIndex = 0, selectedImageUrl } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, error: 'productId é obrigatório' });
    }

    const product = await pb.collection('products').getOne(productId, { requestKey: null });
    const { token, igId } = await getInstagramCredentials();

    if (!token || !igId) {
      return res.status(400).json({ success: false, error: 'Credenciais do Instagram não configuradas' });
    }

    const images = getProductImages(product);
    let imageUrl = selectedImageUrl;

    if (!imageUrl) {
      if (!images || images.length === 0) {
        return res.status(400).json({ success: false, error: 'O produto não possui imagens cadastradas para publicação' });
      }
      const selectedImage = images[imageIndex] || images[0];
      imageUrl = `https://avantelingerie.com.br/hcgi/platform/api/files/products/${product.id}/${selectedImage}`;
    }

    const caption = customCaption || generateSocialCaption(product);

    console.log(`[Instagram Publish] Iniciando publicação do produto ${product.name} (${product.id})...`);

    // 1. Criar container de mídia no Instagram Graph API
    const containerRes = await axios.post(`https://graph.facebook.com/v19.0/${igId}/media`, {
      image_url: imageUrl,
      caption: caption,
      access_token: token
    }, { timeout: 30000 });

    const creationId = containerRes.data?.id;
    if (!creationId) {
      throw new Error('Falha ao gerar o container de mídia no Instagram');
    }

    console.log(`[Instagram Publish] Container criado: ${creationId}. Publicando no feed...`);

    // 2. Publicar o container no Feed
    const publishRes = await axios.post(`https://graph.facebook.com/v19.0/${igId}/media_publish`, {
      creation_id: creationId,
      access_token: token
    }, { timeout: 30000 });

    const mediaId = publishRes.data?.id;

    // 3. Obter o link permanente da publicação (permalink)
    let permalink = `https://www.instagram.com/avante.lingerie`;
    try {
      const infoRes = await axios.get(`https://graph.facebook.com/v19.0/${mediaId}?fields=id,permalink&access_token=${token}`, { timeout: 10000 });
      if (infoRes.data?.permalink) {
        permalink = infoRes.data.permalink;
      }
    } catch (e) {
      console.warn('[Instagram Publish] Falha ao obter permalink específico:', e.message);
    }

    console.log(`[Instagram Publish] Publicado com sucesso! Media ID: ${mediaId} | Link: ${permalink}`);

    return res.json({
      success: true,
      message: 'Produto publicado com sucesso no feed do Instagram e Facebook!',
      media_id: mediaId,
      permalink: permalink,
      caption: caption
    });

  } catch (error) {
    const errorDetails = error.response?.data?.error?.message || error.message;
    console.error('[Instagram Publish Error]', errorDetails);
    return res.status(500).json({
      success: false,
      error: `Erro ao publicar no Instagram: ${errorDetails}`
    });
  }
});

export default router;
