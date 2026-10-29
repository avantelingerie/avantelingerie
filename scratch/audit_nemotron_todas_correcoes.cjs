const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de alta performance e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica) implementou um pacote cirúrgico de 6 correções e melhorias antes do deploy de produção para a abertura das campanhas de tráfego pago da Avante Lingerie.

AUDITE DETALHADAMENTE CADA UMA DAS 6 ALTERAÇÕES E EMITA SEU CRIVO E VEREDITO TÉCNICO FORMAL:

1. BLINDAGEM CONTRA TRADUÇÃO DESTRUTIVA DO GOOGLE CHROME:
   - Problema anterior: Chrome detectava lang="en" por padrão, traduzia termos do e-commerce gerando bizarrices textuais ("mete clientes") e disparava erro fatal no React (NotFoundError: removeChild on Node) ao modificar o DOM manipulado pelo React.
   - Solução implementada: Em apps/web/index.html, configurado lang="pt-BR", adicionada tag <meta name="google" content="notranslate" /> e no body/html a classe "notranslate" com atributo translate="no".

2. CAPTURA E PERSISTÊNCIA DO WHATSAPP DO CLIENTE LOGADO NO CHECKOUT:
   - Problema anterior: Cliente logado cujo cadastro ainda não tinha telefone/WhatsApp ficava com o checkout travado ("Por favor, informe seu celular ou WhatsApp"), pois o campo ficava oculto por presumir que estava completo.
   - Solução implementada: Em apps/web/src/pages/Checkout.jsx, se o usuário logado não possuir telefone no perfil, renderiza um campo destacado com borda âmbar solicitando o WhatsApp para rastreamento. No useCheckoutLogic.js, ao submeter o pedido com sucesso, atualiza automaticamente o registro do usuário na coleção 'users' do PocketBase com whatsapp e cpf.

3. MODAIS E RÉGUAS DE DESCONTO 100% DINÂMICOS COM O ADMIN (R$ 69,90):
   - Problema anterior: Hardcoded fallbacks antigos (R$ 500, R$ 300, R$ 200) espalhados em componentes enquanto o limite de atacado real no PocketBase (configuracoes_estoque -> limite_upgrade_revenda) é R$ 69,90.
   - Solução implementada: Atualizado descontosService.js para fallback padrão R$ 69,90 e sincronização dinâmica com configuracoes_estoque. Em ProductPage.jsx, substituído texto estático do toast pelo getNextTierInfo(). Em CartPage, QueroRevenderPage, ProductCard e DescontoProgressivoTab, removidos hardcodes antigos.

4. AUTOPREENCHIMENTO SEGURO DE LOGIN:
   - Problema anterior: Preenchimento indevido de credenciais e risco de vazamento do e-mail administrativo.
   - Solução implementada: Em apps/web/src/pages/LoginPage.jsx, mantido o suporte nativo padrão da web (autoComplete="username" e autoComplete="current-password") para que clientes que retornam à loja tenham suas credenciais reconhecidas e preenchidas pelo navegador com comodidade. Em apps/web/src/pages/admin/AdminLogin.jsx, removido o placeholder visual estático "admin@avantelingerie.com.br".

5. GATEWAY MERCADO PAGO: MODO BINÁRIO E GUEST CHECKOUT:
   - Problema anterior: Pedidos ficando em status intermediário "em análise" e confusão na interface do Checkout Pro.
   - Solução implementada: Em apps/api/src/services/mercadoPagoService.js, adicionado binary_mode: true na criação da preferência. O fluxo opera em Guest Checkout (o cliente pode pagar via Cartão ou PIX com 5% OFF sem necessidade de criar conta no Mercado Pago).

6. CÁLCULO DINÂMICO E TRAVA DE PARCELAMENTO NO CHECKOUT E NA API:
   - Problema anterior: O checkout exibia texto estático "Em até 6x no cartão" para qualquer valor (mesmo compras de R$ 36,42) e a API enviava installments: 6, desrespeitando a configuração de parcela mínima (mp_parcela_minima, ex: R$ 10,00) definida no Painel Admin.
   - Solução implementada:
     a) No frontend (useCheckoutLogic.js e Checkout.jsx): Lê mp_parcelas_max e mp_parcela_minima do PocketBase (integracoes_config). Calcula maxCardInstallments = min(mp_parcelas_max, floor(finalTotal / mp_parcela_minima)). Para compra de R$ 36,42 com parcela mínima de R$ 10,00, calcula 3 parcelas e exibe: "Em até 3x de R$ 12,14 no cartão".
     b) No backend (mercadoPagoService.js): Na criação da preferência, calcula effectiveInstallments = Math.min(creds.maxInstallments, Math.max(1, Math.floor(finalTotal / minInstallmentAmount))) e envia para payment_methods.installments. O Mercado Pago fisicamente trava e não permite parcelamento acima do autorizado.

AUDITORIA SOLICITADA AO NEMOTRON:
1. Avalie a robustez técnica, integridade e coerência arquitetural dessas 6 soluções.
2. Identifique se existe algum efeito colateral, risco de regressão ou furo de regra de negócio.
3. Você valida e aprova formalmente a entrada dessas alterações para deploy de produção na Avante Lingerie?`;

async function runAudit() {
  console.log('--- ENVIANDO PACOTE DE 6 CORREÇÕES AO NEMOTRON (TERMINAL GATE) ---');
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3.5-lightning:free',
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: AbortSignal.timeout(60000)
    });

    if (!res.ok) {
      const errTxt = await res.text();
      console.error(`Erro HTTP ${res.status}:`, errTxt);
      process.exit(1);
    }

    const data = await res.json();
    console.log('\n============================================================');
    console.log('  PARECER OFICIAL DO COPILOTO NEMOTRON (TERMINAL AUDIT)');
    console.log('============================================================\n');
    console.log(data.choices?.[0]?.message?.content);
  } catch (err) {
    console.error('Falha na comunicação com o Nemotron:', err.message);
    process.exit(1);
  }
}

runAudit();
