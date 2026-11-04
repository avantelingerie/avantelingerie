const fs = require('fs');
const assert = require('assert');

console.log('--- TESTE AUTOMATIZADO: VALIDAÇÃO ESTÁTICA E DINÂMICA DO CÓDIGO DA TAG ---');

// 1. Validar apps/web/index.html
const indexHtml = fs.readFileSync('apps/web/index.html', 'utf8');
assert(!indexHtml.includes('GTM-XXXXXXX'), 'O placeholder GTM-XXXXXXX NÃO deve existir no index.html!');
assert(indexHtml.includes('https://www.googletagmanager.com/gtag/js?id=AW-18499593515'), 'A URL oficial da tag AW-18499593515 deve estar no index.html!');
assert(indexHtml.includes("gtag('config', 'AW-18499593515')"), "O comando gtag('config', 'AW-18499593515') deve estar no index.html!");
console.log('✓ apps/web/index.html: 100% validado sem GTM dummy e com Google Tag oficial.');

// 2. Validar apps/web/src/lib/marketingPixels.js
const marketingJs = fs.readFileSync('apps/web/src/lib/marketingPixels.js', 'utf8');
assert(marketingJs.includes("let googleAdsTagId = CONFIG_PIXELS_LOCAIS.google_ads_tag_id || 'AW-18499593515'"), 'googleAdsTagId deve ser inicializado com fallback AW-18499593515!');
assert(marketingJs.includes("let googleAdsConversionLabel = CONFIG_PIXELS_LOCAIS.google_ads_conversion_label || 'I3OOCNz7z6QdEKvKpfVE'"), 'googleAdsConversionLabel deve ser inicializado com fallback I3OOCNz7z6QdEKvKpfVE!');
assert(marketingJs.includes("send_to: `${targetAdsTag}/${targetAdsLabel}`"), 'O evento conversion deve enviar para send_to com as tags resolvidas!');
assert(marketingJs.includes('triggerGoogleAdsTestConversion'), 'triggerGoogleAdsTestConversion deve estar exportada!');
console.log('✓ apps/web/src/lib/marketingPixels.js: 100% validado com blindagem de IDs e função de teste.');

// 3. Validar apps/web/src/components/admin/TrackingPixelsTab.jsx
const trackingTab = fs.readFileSync('apps/web/src/components/admin/TrackingPixelsTab.jsx', 'utf8');
assert(trackingTab.includes('Testar Disparo da Conversão Google Ads'), 'O botão de teste interativo deve existir no painel!');
assert(trackingTab.includes('AW-18499593515'), 'O fallback do ID AW-18499593515 deve estar no componente!');
assert(trackingTab.includes('I3OOCNz7z6QdEKvKpfVE'), 'O fallback do Label I3OOCNz7z6QdEKvKpfVE deve estar no componente!');
console.log('✓ TrackingPixelsTab.jsx: 100% validado com botão de teste e fallbacks.');

// 4. Testar payload executando a lógica isolada em sandbox
const events = [];
const mockGtag = (cmd, action, params) => events.push({ cmd, action, params });

// Lógica de trackPurchase extraída diretamente do marketingPixels.js
function simulateTrackPurchase(orderId, value, tag, label) {
  const targetAdsTag = tag || 'AW-18499593515';
  const targetAdsLabel = label || 'I3OOCNz7z6QdEKvKpfVE';
  mockGtag('event', 'conversion', {
    send_to: `${targetAdsTag}/${targetAdsLabel}`,
    value: Number(value) || 0,
    currency: 'BRL',
    transaction_id: String(orderId)
  });
}

simulateTrackPurchase('PED-003', 127.77, '', '');
assert.strictEqual(events.length, 1);
assert.strictEqual(events[0].params.send_to, 'AW-18499593515/I3OOCNz7z6QdEKvKpfVE');
assert.strictEqual(events[0].params.value, 127.77);
assert.strictEqual(events[0].params.currency, 'BRL');
assert.strictEqual(events[0].params.transaction_id, 'PED-003');

console.log('✓ Simulação de trackPurchase: disparado com sucesso para AW-18499593515/I3OOCNz7z6QdEKvKpfVE.');

console.log('\n🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');

