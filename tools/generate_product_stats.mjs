import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf-8'));

// Dicionário de produtos e desejos mapeados
const productsStats = {
  // Categorias específicas
  "Kits de Calcinhas / Calcinhas Avulsas": { count: 0, examples: [], queries: [] },
  "Calcinhas de Renda / Fio Duplo": { count: 0, examples: [], queries: [] },
  "Conjuntos de Lingerie com Renda": { count: 0, examples: [], queries: [] },
  "Bodys / Bodys Rendados": { count: 0, examples: [], queries: [] },
  "Croppeds / Tops (Gola Alta, etc.)": { count: 0, examples: [], queries: [] },
  "Pijamas & Camisolas (Adulto, Longo)": { count: 0, examples: [], queries: [] },
  "Baby Doll (Adulto e Infantil)": { count: 0, examples: [], queries: [] },
  "Linha Infantil & Juvenil / Menina Moça": { count: 0, examples: [], queries: [] },
  "Linha Plus Size (Tamanhos 48+)": { count: 0, examples: [], queries: [] },
  "Catálogo Completo de Atacado & Tabela de Preços": { count: 0, examples: [], queries: [] },
  "Confecção Sob Encomenda / Grade Personalizada": { count: 0, examples: [], queries: [] }
};

const colorsStats = {};
const sizesStats = {};
const buyingIntent = { atacado_revenda: 0, varejo_uso_proprio: 0, nao_especificado: 0 };

dump.forEach(conv => {
  const msgs = conv.mensagens || [];
  const userMsgs = msgs.filter(m => m.role === 'user').map(m => m.content);
  if (!userMsgs.length) return;

  const userText = userMsgs.join(' ');
  if (userText.includes('Shopee') && userText.includes('coleta da sua loja')) return;

  const lower = userText.toLowerCase();

  // Intenção de compra
  if (lower.includes('revend') || lower.includes('atacado') || lower.includes('lojista') || lower.includes('fornecedor')) {
    buyingIntent.atacado_revenda++;
  } else if (lower.includes('uso') || lower.includes('comprei') || lower.includes('pra mim') || lower.includes('para mim')) {
    buyingIntent.varejo_uso_proprio++;
  } else {
    buyingIntent.nao_especificado++;
  }

  // Cores
  ['rubi', 'vinho', 'preto', 'preta', 'branco', 'branca', 'vermelho', 'vermelha', 'neutra', 'neutras', 'azul', 'rosa'].forEach(cor => {
    if (new RegExp(`\\b${cor}\\b`, 'i').test(lower)) {
      colorsStats[cor] = (colorsStats[cor] || 0) + 1;
    }
  });

  // Tamanhos
  ['p', 'm', 'g', 'gg', '40', '42', '44', '46', '48', '50'].forEach(tam => {
    if (new RegExp(`\\b${tam}\\b`, 'i').test(lower)) {
      sizesStats[tam] = (sizesStats[tam] || 0) + 1;
    }
  });

  // Análise de produtos
  const addHit = (cat, query) => {
    productsStats[cat].count++;
    if (productsStats[cat].examples.length < 8) {
      productsStats[cat].examples.push(query);
    }
  };

  if (/calcinha|tanga|kit calcinha/i.test(lower)) {
    if (/renda|fio duplo|fio/i.test(lower)) {
      addHit("Calcinhas de Renda / Fio Duplo", userText);
    } else {
      addHit("Kits de Calcinhas / Calcinhas Avulsas", userText);
    }
  }

  if (/conjunto/i.test(lower)) {
    addHit("Conjuntos de Lingerie com Renda", userText);
  }

  if (/body|bory|bodys/i.test(lower)) {
    addHit("Bodys / Bodys Rendados", userText);
  }

  if (/cropped/i.test(lower)) {
    addHit("Croppeds / Tops (Gola Alta, etc.)", userText);
  }

  if (/camisola|pijama/i.test(lower)) {
    addHit("Pijamas & Camisolas (Adulto, Longo)", userText);
  }

  if (/baby doll|babydoll/i.test(lower)) {
    addHit("Baby Doll (Adulto e Infantil)", userText);
  }

  if (/infantil|juvenil|menina moça/i.test(lower)) {
    addHit("Linha Infantil & Juvenil / Menina Moça", userText);
  }

  if (/plus|48|50|52|tamanho especial/i.test(lower)) {
    addHit("Linha Plus Size (Tamanhos 48+)", userText);
  }

  if (/catálogo|catalogo|preço|precos|tabela|valores/i.test(lower)) {
    addHit("Catálogo Completo de Atacado & Tabela de Preços", userText);
  }

  if (/encomenda|sob encomenda|personalizad/i.test(lower)) {
    addHit("Confecção Sob Encomenda / Grade Personalizada", userText);
  }
});

console.log('=== RESULTADOS DETALHADOS ===');
console.log('Produtos:', JSON.stringify(productsStats, null, 2));
console.log('Cores:', colorsStats);
console.log('Tamanhos:', sizesStats);
console.log('Intenção:', buyingIntent);

fs.writeFileSync('scratch/stats_final.json', JSON.stringify({
  productsStats,
  colorsStats,
  sizesStats,
  buyingIntent
}, null, 2));
