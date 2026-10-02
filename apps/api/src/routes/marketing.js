import { Router } from 'express';
import pb from '../utils/pocketbaseClient.js';

const router = Router();

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
      if (images && images.length > 0) {
         imageUrl = `https://avantelingerie.com.br/hcgi/platform/api/files/products/${id}/${images[0]}`;
      }

      const condition = 'new';
      const availability = (p.estoque > 0 || p.estoque_total > 0 || p.estoque === undefined) ? 'in stock' : 'out of stock';
      
      xml += `
    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${name}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageUrl}</g:image_link>
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
