import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scratch/lia_conversas_dump.json', 'utf8'));

console.log(`Analisando ${raw.length} conversas reais...`);

const results = {
  summary: {
    total: raw.length,
    atacado: 0,
    varejo: 0,
    outros: 0
  },
  products_atacado: {},
  products_varejo: {},
  clients_atacado: [],
  clients_varejo: [],
  clients_outros: []
};

function addProductCount(map, product) {
  map[product] = (map[product] || 0) + 1;
}

for (const item of raw) {
  let msgs = [];
  try {
    msgs = typeof item.mensagens === 'string' ? JSON.parse(item.mensagens) : (item.mensagens || []);
  } catch (e) {
    msgs = [];
  }

  const clientMsgs = msgs.filter(m => m.role === 'user').map(m => m.content || '').join(' ');
  const fullDialogue = msgs.map(m => `${m.role}: ${m.content || ''}`).join('\n');
  const metadata = item.metadata || {};

  // Check Phone / WhatsApp
  let phone = null;
  // Check if channel is whatsapp and user_id is a phone or lid
  let rawId = item.usuario_id || item.cliente_id || '';
  if (rawId.includes('@s.whatsapp.net')) {
    phone = rawId.replace('@s.whatsapp.net', '');
  }
  // Search phone in client messages
  const phoneMatch = clientMsgs.match(/(?:\+?55\s*)?(?:\(?([1-9]{2})\)?\s*)?(?:9\s*\d{4}[-\s]?\d{4}|\d{4,5}[-\s]?\d{4})/);
  if (phoneMatch) {
    const cleaned = phoneMatch[0].replace(/\D/g, '');
    if (cleaned.length >= 10 && !cleaned.includes('981124281') && !cleaned.includes('000000')) {
      phone = phoneMatch[0].trim();
    }
  }

  // Check Name
  let name = metadata.nome || null;
  if (!name) {
    const nameMatch = clientMsgs.match(/(?:meu nome [ée]|me chamo|sou a|sou o|Nome:\s*)([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+(?:\s+[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)?)/i);
    if (nameMatch) name = nameMatch[1];
  }

  // Detect Type: Atacado, Varejo, Outros
  const isAtacadoExplicit = /revend|atacad|lojista|sacoleira|começando|grade|fábrica|fabrica|loja online|vender|preço de fábrica|300 reais|pedido mínimo/i.test(clientMsgs) ||
    /Catálogo de Atacado/i.test(clientMsgs) ||
    (item.canal === 'whatsapp' && /Catálogo de Atacado/i.test(fullDialogue));

  const isVarejoExplicit = (/uso próprio|pessoal|pra mim|minha esposa|meu tamanho|comprei|uma peça|para sair|body rendado|cropped|presente/i.test(clientMsgs) ||
    /varejo/i.test(clientMsgs)) && !isAtacadoExplicit;

  let category = 'outros';
  if (isAtacadoExplicit) {
    category = 'atacado';
    results.summary.atacado++;
  } else if (isVarejoExplicit || (clientMsgs.length > 10 && /quero comprar|valor|preço|quanto custa|link|tamanho/i.test(clientMsgs))) {
    // If asking about buying a product or specific size without mentioning resale, it's retail (consumer)
    category = 'varejo';
    results.summary.varejo++;
  } else {
    category = 'outros';
    results.summary.outros++;
  }

  // Detect Products
  const detectedProducts = [];

  // Conjuntos
  if (/conjunto/i.test(clientMsgs)) {
    detectedProducts.push('Conjuntos de Lingerie');
    if (/renda|rendado|rubi|vinho|preto/i.test(clientMsgs)) detectedProducts.push('Conjunto Rendado (Rubi/Preto/Vinho)');
    if (/básico|basico|dia a dia|algod[ãa]o/i.test(clientMsgs)) detectedProducts.push('Conjunto Básico (Algodão/Microfibra)');
  }

  // Calcinhas
  if (/calcinha/i.test(clientMsgs)) {
    detectedProducts.push('Calcinhas (Geral/Avulsas/Kits)');
    if (/c[oó]s alto|cobre bumbum|crist[aã]/i.test(clientMsgs)) detectedProducts.push('Calcinha Cós Alto / Linha Cristã / Conforto');
    if (/algod[aã]o/i.test(clientMsgs)) detectedProducts.push('Calcinha 100% Algodão');
    if (/laser|sem costura/i.test(clientMsgs)) detectedProducts.push('Calcinha Corte a Laser / Sem Costura');
    if (/fio duplo/i.test(clientMsgs)) detectedProducts.push('Calcinha Fio Duplo');
    if (/renda|rendada/i.test(clientMsgs)) detectedProducts.push('Calcinha de Renda');
  }

  // Sutiãs
  if (/suti[aã]/i.test(clientMsgs)) {
    detectedProducts.push('Sutiãs (Avulsos/Reforçados)');
    if (/tomara que caia/i.test(clientMsgs)) detectedProducts.push('Sutiã Tomara que Caia');
    if (/menina mo[çc]a|juvenil/i.test(clientMsgs)) detectedProducts.push('Sutiã Menina Moça (Sem Aro/Juvenil)');
    if (/48|50|52|plus size|refor[çc]ado/i.test(clientMsgs)) detectedProducts.push('Sutiã Reforçado Plus Size (48 a 52)');
  }

  // Linha Noite (Baby Doll / Camisola / Pijama)
  if (/baby doll|babydoll/i.test(clientMsgs)) detectedProducts.push('Baby Doll (Adulto e Infantil)');
  if (/camisola/i.test(clientMsgs)) detectedProducts.push('Camisolas (Manga Curta e Tradicional)');
  if (/pijama/i.test(clientMsgs)) detectedProducts.push('Pijamas (Longo e Curto)');

  // Bodys e Croppeds
  if (/body|bodys/i.test(clientMsgs)) detectedProducts.push('Body Rendado (Outwear / Moda Balada/Casual)');
  if (/cropped/i.test(clientMsgs)) detectedProducts.push('Cropped Gola Alta');

  // Fitness
  if (/fitness|academia|bermuda/i.test(clientMsgs)) detectedProducts.push('Moda Fitness / Bermudas de Academia');

  // Plus Size Geral
  if (/plus size|tamanho maior|48|50|52/i.test(clientMsgs) && !detectedProducts.includes('Plus Size Geral')) {
    detectedProducts.push('Linha Plus Size (Tamanhos 48 ao 54)');
  }

  // Infantojuvenil
  if (/infantil|juvenil|menina mo[çc]a/i.test(clientMsgs)) {
    detectedProducts.push('Linha Infantojuvenil');
  }

  // Register in proper category maps
  if (category === 'atacado') {
    detectedProducts.forEach(p => addProductCount(results.products_atacado, p));
    results.clients_atacado.push({
      id: rawId,
      name,
      phone,
      channel: item.canal,
      date: item.created,
      products: detectedProducts,
      clientMsgs: clientMsgs.slice(0, 300)
    });
  } else if (category === 'varejo') {
    detectedProducts.forEach(p => addProductCount(results.products_varejo, p));
    results.clients_varejo.push({
      id: rawId,
      name,
      phone,
      channel: item.canal,
      date: item.created,
      products: detectedProducts,
      clientMsgs: clientMsgs.slice(0, 300)
    });
  } else {
    results.clients_outros.push({
      id: rawId,
      name,
      phone,
      channel: item.canal,
      date: item.created,
      clientMsgs: clientMsgs.slice(0, 200)
    });
  }
}

// Compute percentages
const total = results.summary.total;
results.summary.atacado_pct = ((results.summary.atacado / total) * 100).toFixed(1) + '%';
results.summary.varejo_pct = ((results.summary.varejo / total) * 100).toFixed(1) + '%';
results.summary.outros_pct = ((results.summary.outros / total) * 100).toFixed(1) + '%';

fs.writeFileSync('scratch/stats_desires_detailed.json', JSON.stringify(results, null, 2));

console.log('--- RESUMO GERAL ---');
console.log(`Total: ${total}`);
console.log(`Atacado: ${results.summary.atacado} (${results.summary.atacado_pct})`);
console.log(`Varejo: ${results.summary.varejo} (${results.summary.varejo_pct})`);
console.log(`Outros: ${results.summary.outros} (${results.summary.outros_pct})`);
console.log('\n--- PRODUTOS ATACADO ---');
console.log(JSON.stringify(results.products_atacado, null, 2));
console.log('\n--- PRODUTOS VAREJO ---');
console.log(JSON.stringify(results.products_varejo, null, 2));
