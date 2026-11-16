/**
 * VERIFICADOR AUTOMATIZADO DE BLINDAGEM E INTEGRIDADE DO ECOSSISTEMA AVANTE LINGERIE
 * 
 * Executa uma bateria completa de testes de não-regressão cobrindo:
 * 1. Sintaxe de todos os arquivos críticos do backend
 * 2. Invariantes de Mimos e Apps VIP (transparência, extensões .png, sem vazamentos de fundo escuro)
 * 3. Invariantes de Carrinho, Frete e Checkout (isenção de frete para produtos digitais/mimos)
 * 4. Invariantes de Rotas da API e Integrações (Google Ads, Lia, Recuperação de Vendas)
 * 5. Invariantes do Admin Analytics (Aba Google Ads ativa, suporte claro/escuro)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

function check(title, fn) {
  totalChecks++;
  try {
    const result = fn();
    if (result !== false) {
      console.log(`  ✓ [PASS] ${title}`);
      passedChecks++;
    } else {
      console.error(`  ✗ [FAIL] ${title}`);
      failedChecks.push(title);
    }
  } catch (err) {
    console.error(`  ✗ [ERROR] ${title}: ${err.message}`);
    failedChecks.push(`${title} (${err.message})`);
  }
}

console.log('\n=================================================================');
console.log('🛡️  INICIANDO AUDITORIA DE BLINDAGEM DO ECOSSISTEMA AVANTE LINGERIE');
console.log('=================================================================\n');

// -------------------------------------------------------------
// PILAR 1: SINTAXE DE ARQUIVOS CRÍTICOS DO BACKEND
// -------------------------------------------------------------
console.log('📦 PILAR 1: Sintaxe do Backend & Rotas Críticas');

const backendFiles = [
  'apps/api/src/routes/ads.js',
  'apps/api/src/routes/lia.js',
  'apps/api/src/routes/index.js',
  'apps/api/src/services/recoveryService.js',
  'apps/api/src/services/notificationService.js'
];

for (const file of backendFiles) {
  check(`Sintaxe limpa em ${file}`, () => {
    execSync(`node -c "${path.resolve(__dirname, '..', file)}"`, { stdio: 'pipe' });
    return true;
  });
}

// -------------------------------------------------------------
// PILAR 2: BLINDAGEM DE MIMOS, APPS VIP E POP-UP DE RETENÇÃO
// -------------------------------------------------------------
console.log('\n🎁 PILAR 2: Blindagem dos Apps VIP & Pop-up de Retenção');

const mimosDir = path.resolve(__dirname, '../apps/web/public/assets/mimos');

check('Imagens PNG dos 3 Apps VIP existem e são arquivos válidos', () => {
  const apps = [
    'capa-maquina-vendas-3d.png',
    'capa-cintura-esculpida-3d.png',
    'capa-espelho-secreto-3d.png',
    'caixa-presente-transparente.png',
    'caixa-presente-ganhouu.png'
  ];
  return apps.every(app => {
    const full = path.join(mimosDir, app);
    return fs.existsSync(full) && fs.statSync(full).size > 1000;
  });
});

check('UI dos Mimos e Apps nunca importa arquivos .jpg com fundo preto', () => {
  const filesToCheck = [
    'apps/web/src/components/MimoRetentionModal.jsx',
    'apps/web/src/pages/mimos/MaquinaVendasAppPage.jsx',
    'apps/web/src/pages/mimos/CinturaEsculpidaAppPage.jsx',
    'apps/web/src/pages/mimos/EspelhoSecretoAppPage.jsx'
  ];
  
  for (const f of filesToCheck) {
    const content = fs.readFileSync(path.resolve(__dirname, '..', f), 'utf8');
    if (/capa-.*\.jpg/i.test(content) || /caixa-.*\.jpg/i.test(content)) {
      throw new Error(`Referência a .jpg detectada em ${f}`);
    }
  }
  return true;
});

check('Pop-up de Retenção VIP possui a insígnia destacada "GANHOU!!"', () => {
  const modalContent = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/components/MimoRetentionModal.jsx'), 'utf8');
  return modalContent.includes('GANHOU!!') && modalContent.includes('caixa-presente-transparente.png');
});

// -------------------------------------------------------------
// PILAR 3: BLINDAGEM DE CARRINHO, FRETE E REGRAS DE ATACADO/DIGITAL
// -------------------------------------------------------------
console.log('\n🛒 PILAR 3: Blindagem de Carrinho, Checkout & Regras Comerciais');

check('useCart.js isenta itens is_mimo e is_digital de regras conflitantes', () => {
  const cartHook = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/hooks/useCart.js'), 'utf8');
  return cartHook.includes('item.is_mimo || item.is_digital');
});

check('useCheckoutLogic.js exclui itens digitais/mimos do cálculo de frete físico', () => {
  const checkoutHook = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/hooks/useCheckoutLogic.js'), 'utf8');
  return checkoutHook.includes('!item.is_digital && !item.is_mimo');
});

check('CartItem.jsx trata mimos com visual proporcional e capa transparente', () => {
  const cartItem = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/components/CartItem.jsx'), 'utf8');
  return cartItem.includes('item.is_mimo') && cartItem.includes("replace('.jpg', '.png')");
});

check('CartPage.jsx e Checkout.jsx impedem ida ao checkout sem produtos físicos', () => {
  const cartPage = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/pages/CartPage.jsx'), 'utf8');
  const checkoutPage = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/pages/Checkout.jsx'), 'utf8');
  const checkoutLogic = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/hooks/useCheckoutLogic.js'), 'utf8');

  const cartProtected = cartPage.includes('physicalItems.length === 0') && cartPage.includes('Adicione pelo menos 1 peça de lingerie');
  const checkoutProtected = checkoutPage.includes('physicalItems.length === 0') && checkoutPage.includes('Sua sacola precisa de peças de lingerie');
  const logicProtected = checkoutLogic.includes('physicalItems.length === 0');

  return cartProtected && checkoutProtected && logicProtected;
});

check('payment.js /create-order rejeita pedidos contendo apenas mimos/digitais sem peças físicas', () => {
  const paymentRoute = fs.readFileSync(path.resolve(__dirname, '../apps/api/src/routes/payment.js'), 'utf8');
  return paymentRoute.includes('physicalItems.length === 0') && paymentRoute.includes('pelo menos 1 peça física de lingerie');
});

// -------------------------------------------------------------
// PILAR 4: BLINDAGEM DO PAINEL GOOGLE ADS & ANALYTICS
// -------------------------------------------------------------
console.log('\n🎯 PILAR 4: Blindagem do Painel Google Ads & Analytics');

check('apps/api/src/routes/index.js possui a rota /ads registrada via ESM', () => {
  const routesIndex = fs.readFileSync(path.resolve(__dirname, '../apps/api/src/routes/index.js'), 'utf8');
  return routesIndex.includes("import adsRouter from './ads.js'") && routesIndex.includes("router.use('/ads', adsRouter)");
});

check('GoogleAdsTab.jsx possui controles de mutação e todas as macro-segmentações', () => {
  const tabContent = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/components/admin/GoogleAdsTab.jsx'), 'utf8');
  const requiredSegments = [
    'A. Gatilhos de Busca',
    'B & C. Demografia Básica & Renda Familiar',
    'D. Localização Geográfica, Horários & Idiomas',
    'E. Tecnologia, Redes & Dispositivos',
    'Públicos-Alvo & DSA'
  ];
  return requiredSegments.every(seg => tabContent.includes(seg));
});

check('AnalyticsPage.jsx inclui a aba Google Ads (Search)', () => {
  const analyticsPage = fs.readFileSync(path.resolve(__dirname, '../apps/web/src/pages/admin/AnalyticsPage.jsx'), 'utf8');
  return analyticsPage.includes('GoogleAdsTab') && analyticsPage.includes('google_ads');
});

// -------------------------------------------------------------
// PILAR 5: LIA & RECUPERAÇÃO DE VENDAS NO WHATSAPP
// -------------------------------------------------------------
console.log('\n🤖 PILAR 5: Blindagem da Lia & Notificações de Venda');

check('recoveryService.js possui facilidade de pagamento (PIX/Cartão 6x) e contato da fábrica', () => {
  const recContent = fs.readFileSync(path.resolve(__dirname, '../apps/api/src/services/recoveryService.js'), 'utf8');
  return recContent.includes('PIX ou Cartão') && recContent.includes('wa.me/5522981124281');
});

// -------------------------------------------------------------
// RELATÓRIO FINAL
// -------------------------------------------------------------
console.log('\n=================================================================');
console.log(`📊 RESULTADO DA AUDITORIA: ${passedChecks}/${totalChecks} VERIFICAÇÕES APROVADAS`);
if (failedChecks.length === 0) {
  console.log('✅ TODAS AS INVARIANTES E BLINDAGENS DO SISTEMA ESTÃO 100% INTACTAS!');
} else {
  console.error(`❌ FORAM DETECTADAS ${failedChecks.length} FALHAS DE REGRESSÃO:`);
  failedChecks.forEach(f => console.error(`   - ${f}`));
}
console.log('=================================================================\n');

if (failedChecks.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
