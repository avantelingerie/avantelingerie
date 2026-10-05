/**
 * Gerador de JSON-LD Schema.org/Product para Rich Snippets no Google Search & Shopping
 * Homologado em auditoria técnica conjunta (Ada + Qwen).
 * Previne fake reviews e sanitiza preços e disponibilidade de estoque.
 */
export const generateProductJsonLd = ({
  productName,
  productMetaDesc,
  productReferencia,
  basePrice,
  resolvedImages,
  activeVariation,
  semVariacoes,
  productAvaliacao,
  productReviewsCount,
  productId
}) => {
  // Sanitização de preço: suporta "100.50" ou "100,50" vindo do back
  const cleanPriceStr = String(basePrice || 0).replace(',', '.');
  const price = (parseFloat(cleanPriceStr) || 0).toFixed(2);

  // Lógica de disponibilidade robusta
  const estoqueOk = semVariacoes 
    ? (!activeVariation || activeVariation.estoque > 0) 
    : (activeVariation?.estoque > 0);

  const availability = estoqueOk
    ? "https://schema.org/InStock" 
    : "https://schema.org/OutOfStock";

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "image": resolvedImages && resolvedImages.length > 0 ? resolvedImages : undefined,
    "description": productMetaDesc,
    "sku": productReferencia,
    "mpn": productReferencia,
    "brand": {
      "@type": "Brand",
      "name": "Avante Lingerie"
    },
    "offers": {
      "@type": "Offer",
      "url": productId ? `https://avantelingerie.com.br/produto/${productId}` : undefined,
      "priceCurrency": "BRL",
      "price": price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": "Avante Lingerie"
      }
    }
  };

  // Injeta aggregateRating APENAS se houver reviews reais (evita penalidade do Google por fake data)
  if (productReviewsCount && Number(productReviewsCount) > 0 && productAvaliacao) {
    jsonLd["aggregateRating"] = {
      "@type": "AggregateRating",
      "ratingValue": productAvaliacao.toString(),
      "reviewCount": productReviewsCount.toString()
    };
  }

  return jsonLd;
};
