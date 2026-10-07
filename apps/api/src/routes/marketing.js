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
      // Fallbacks
      const name = p.name || p.nome || 'Lingerie Avante';
      const description = p.description || p.descricao || name;
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
      <g:title><![CDATA[${name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
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

export default router;
