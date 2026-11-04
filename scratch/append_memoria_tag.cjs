const fs = require('fs');
const entry = `
---

### [2026-11-04 09:30] BLINDAGEM DA TAG DE CONVERSÃO DO GOOGLE ADS (AW-18499593515 / I3OOCNz7z6QdEKvKpfVE)
- **Agentes:** Ada (Líder), Forge (Backend/Tracking), Lumi (Frontend/UX), Sentinel (Auditoria QA & Segurança)
- **Portão Prévio Nemotron:** APROVADO via OpenRouter (\`nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free\`). Veredito: Risco zero ao checkout, pagamentos (PIX/Mercado Pago), frete ou Meta Pixel/CAPI.
- **Problema Resolvido:**
  - O painel do Google Ads exibia alerta de 'etiqueta ainda não validada' para a ação 'Compra no Site - Tag Direta'.
  - No código, o index.html continha container antigo 'GTM-XXXXXXX' gerando erros 404 de container.
  - Em \`marketingPixels.js\`, as variáveis \`googleAdsTagId\` e \`googleAdsConversionLabel\` inicializavam vazias, fazendo com que o disparo de conversão do Google Ads pulasse caso o carregamento assíncrono atrasasse.
- **Implementações Realizadas:**
  1. \`apps/web/index.html\`: Substituído o dummy GTM pela tag oficial global \`AW-18499593515\` diretamente no \`<head>\`, capturando o parâmetro \`gclid\` no carregamento imediato da página e eliminando erros 404 no console.
  2. \`apps/web/src/lib/marketingPixels.js\`: Blindagem das variáveis com fallback permanente (\`AW-18499593515\` e \`I3OOCNz7z6QdEKvKpfVE\`). Garantido o disparo estrito de \`gtag('event', 'conversion', { send_to: 'AW-18499593515/I3OOCNz7z6QdEKvKpfVE', value, currency: 'BRL', transaction_id })\` na função \`trackPurchase()\`.
  3. \`apps/web/src/components/admin/TrackingPixelsTab.jsx\`: Adicionado botão interativo '[ Testar Disparo da Conversão Google Ads ]' diretamente dentro do card de Google Ads no painel administrativo.
  4. Adicionada função de diagnóstico \`triggerGoogleAdsTestConversion()\` para validações imediatas.
- **Validações Automatizadas:**
  - Build de Produção Vite: 3.115 módulos transformados com 0 erros.
  - Suíte de Testes Automatizada (\`test_google_ads_tag_suite.cjs\`): 4 testes aprovados (index.html, marketingPixels.js, TrackingPixelsTab.jsx e simulação de payload de compra).
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('MEMORIA_TECNICA.md atualizada com sucesso!');

