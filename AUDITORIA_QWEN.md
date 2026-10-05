# AUDITORIA TÉCNICA - AVANTE LINGERIE

Olá, Qwen! Aqui está o dossiê completo para sua auditoria, organizado e sem cortes de buffer de terminal.

---

## 1. Código Completo da `guessNcm(value)` (`apps/web/src/utils/guessNcm.js`)

```javascript
/**
 * Utilitário de identificação e sugestão de NCM fiscal para produtos de moda íntima da Avante Lingerie.
 * Baseado em análise semântica e tokenização por palavras completas para evitar falsos positivos.
 */

export const guessNcm = (value) => {
  if (!value || typeof value !== 'string') return '';

  // 1. Normalização rigorosa: remove acentos e passa para minúsculas
  const clean = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  if (!clean) return '';

  // 2. Tokenização por palavras completas (impede falsos positivos como "arrenda" -> "renda")
  const tokens = clean.split(/[^a-z0-9]+/).filter(Boolean);
  const hasWord = (w) => tokens.includes(w);
  const hasAny = (list) => list.some((w) => tokens.includes(w));

  const isSuedeOuSintetico = hasAny(['suede', 'sintetico', 'poliester', 'microfibra', 'poliamida', 'renda']);
  const isAlgodao = hasAny(['algodao', 'cotton']);

  // Pijamas, Camisolas, Short Doll, Baby Doll, Robes (Sleepwear)
  const isSleepwear =
    hasAny(['pijama', 'camisola', 'robe']) ||
    (hasWord('short') && hasWord('doll')) ||
    (hasWord('baby') && hasWord('doll'));

  if (isSleepwear) {
    if (isSuedeOuSintetico) return '6108.32.00'; // De fibras sintéticas ou artificiais
    if (isAlgodao) return '6208.21.00';          // De algodão
    return '6108.32.00';                        // Padrão Avante Lingerie para sleepwear
  }

  // Sutiãs, Conjuntos com bojo, Tops, Bustiês
  if (hasAny(['sutia', 'sutias', 'conjunto', 'conjuntos', 'corpete', 'top'])) {
    return '6212.10.00'; // Sutiãs e bustiês
  }

  // Calcinhas, Cintas, Fios, Tangas
  if (hasAny(['calcinha', 'calcinhas', 'cinta', 'cintas', 'fio', 'tanga'])) {
    return '6212.20.00'; // Cintas e cintas-calcinhas / calcinhas
  }

  // Moda Praia / Biquínis / Maiôs
  if (hasAny(['biquini', 'biquinis', 'maio', 'maios', 'praia'])) {
    return '6112.41.00'; // Fatos de banho de fibras sintéticas
  }

  // Bodys
  if (hasAny(['body', 'bodys', 'bodie'])) {
    return '6114.30.00'; // De outras matérias têxteis
  }

  // Sem fallback cego: se não tiver correspondência clara, retorna vazio para preenchimento manual
  return '';
};
```

---

## 2. Testes de Unidade (`apps/web/src/utils/guessNcm.test.js`)
Executados localmente com Node.js: **14 de 14 testes passaram com 100% de sucesso**:

```javascript
[PASS] #1: "" => ""
[PASS] #2: undefined => ""
[PASS] #3: null => ""
[PASS] #4: "   " => ""
[PASS] #5: "Arrenda Lingerie" => "" (Falso positivo evitado!)
[PASS] #6: "Shortsa Algodao" => "" (Falso positivo evitado!)
[PASS] #7: "Pijama Feminino Short Doll Suede Confortável Tecido Leve e Macio Fresquinho" => "6108.32.00"
[PASS] #8: "Camisola Noite Sensual com Renda Bicolor" => "6108.32.00"
[PASS] #9: "Pijama Longo 100% Algodao Conforto" => "6208.21.00"
[PASS] #10: "Conjunto Marido Apressado Renda Premium" => "6212.10.00"
[PASS] #11: "Sutiã Rendado com Bojo Macio" => "6212.10.00"
[PASS] #12: "Calcinha Cinta Modeladora Cós Alto com Renda Avante Lingerie" => "6212.20.00"
[PASS] #13: "Body rendado com abertura marido apressado Lingerie Sexy" => "6114.30.00"
[PASS] #14: "Biquini Cortininha Moda Praia" => "6112.41.00"
```

---

## 3. Chamada e Interface no Formulário (`ProdutoForm.jsx`)

1. **Chamada no evento:**
```javascript
const handleInputChange = (field, value) => {
  setFormData(prev => {
    const updated = { ...prev, [field]: value };
    if (field === 'name') {
      const suggested = guessNcm(value);
      if (suggested) updated.ncm = suggested;
    }
    return updated;
  });
};
```

2. **Campo Editável (Sem trava fiscal):**
```jsx
<span>NCM (Fiscal)</span>
<input 
  type="text" 
  value={formData.ncm || ''} 
  onChange={(e) => handleInputChange('ncm', e.target.value)} 
/>
```
O lojista pode editar, apagar ou substituir o NCM livremente antes de salvar ou emitir a nota no Bling.

---

## 4. JSON-LD Schema.org/Product (`apps/web/src/utils/schemaProduct.js`)

```javascript
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
  return {
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
      "url": `https://avantelingerie.com.br/produto/${productId}`,
      "priceCurrency": "BRL",
      "price": parseFloat(basePrice || 0).toFixed(2),
      "itemCondition": "https://schema.org/NewCondition",
      "availability": (activeVariation?.estoque > 0 || semVariacoes)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Avante Lingerie"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (productAvaliacao || 5.0).toString(),
      "reviewCount": (productReviewsCount || 1).toString()
    }
  };
};
```
