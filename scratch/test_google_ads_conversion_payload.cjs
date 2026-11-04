// Teste de Verificação Automatizada da Conversão Google Ads
const assert = require('assert');

// Simular ambiente de navegador com window.gtag
const eventsDispatched = [];
global.window = {
  dataLayer: [],
  gtag: function(command, action, params) {
    eventsDispatched.push({ command, action, params });
  },
  fbq: function() {}
};

async function testConversionLogic() {
  console.log('--- TESTE AUTOMATIZADO: PAYLOAD DE CONVERSÃO GOOGLE ADS ---');
  
  // Importar dinamicamente o módulo compilado/ESM
  const marketing = await import('../apps/web/src/lib/marketingPixels.js');
  
  // 1. Testar disparo de compra com pedido real
  const testOrderId = 'PED-003';
  const testValue = 127.77;
  const testItems = [
    { id: '1', nome: 'Conjunto Lingerie Rendado Cropped Sem Bojo', price: 28.28, quantity: 4 }
  ];
  
  marketing.trackPurchase(testOrderId, testValue, testItems, 'pix');
  
  // 2. Verificar eventos enviados ao gtag
  const conversionEvent = eventsDispatched.find(e => e.action === 'conversion');
  assert(conversionEvent, 'O evento "conversion" deve ter sido disparado no window.gtag!');
  
  console.log('Evento capturado no window.gtag:');
  console.log(JSON.stringify(conversionEvent, null, 2));
  
  assert.strictEqual(conversionEvent.params.send_to, 'AW-18499593515/I3OOCNz7z6QdEKvKpfVE');
  assert.strictEqual(conversionEvent.params.value, 127.77);
  assert.strictEqual(conversionEvent.params.currency, 'BRL');
  assert.strictEqual(conversionEvent.params.transaction_id, 'PED-003');
  
  // 3. Testar função auxiliar de teste
  const testHelperResult = marketing.triggerGoogleAdsTestConversion();
  assert(testHelperResult === true, 'triggerGoogleAdsTestConversion deve retornar true');
  
  const testPingEvent = eventsDispatched.find(e => e.params.transaction_id && e.params.transaction_id.startsWith('TEST_'));
  assert(testPingEvent, 'O evento de teste deve ter sido gerado com transaction_id TEST_...');
  assert.strictEqual(testPingEvent.params.send_to, 'AW-18499593515/I3OOCNz7z6QdEKvKpfVE');
  
  console.log('\n✅ TODOS OS 6 TESTES DE CONVERSÃO DO GOOGLE ADS FORAM APROVADOS COM SUCESSO!');
}

testConversionLogic().catch(err => {
  console.error('❌ FALHA NO TESTE:', err);
  process.exit(1);
});

