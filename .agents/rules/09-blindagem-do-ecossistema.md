---
description: Protocolo de Blindagem e Preservação de Invariantes do Ecossistema Avante Lingerie.
trigger: always_on
---

# 09 - Blindagem e Preservação do Ecossistema (Não-Regressão)

Este documento estabelece as **invariantes inegociáveis** do ecossistema da Avante Lingerie. Qualquer futura alteração, melhoria, refatoração ou adição DEVE obrigatoriamente respeitar estas regras e passar no teste automatizado de blindagem (`npm run test:shield`) antes de ser submetida.

---

## 1. Os 5 Pilares de Blindagem do Ecossistema

### Pilar 1: Mimos & Aplicativos VIP Digitais
- **Extensão e Transparência Estritas:** Todo e qualquer asset dos aplicativos VIP (`capa-maquina-vendas-3d.png`, `capa-cintura-esculpida-3d.png`, `capa-espelho-secreto-3d.png`, `caixa-presente-transparente.png`, `caixa-presente-ganhouu.png`) DEVE ser PNG com 100% de canal alfa transparente no exterior. É expressamente proibido importar arquivos `.jpg` para esses itens nos componentes de interface.
- **Harmonia em Telas Claras e Escuras:** Os contêineres dos apps na sacola (`CartItem.jsx`), checkout (`CheckoutOrderSummary.jsx`), resumo (`OrderSummary.jsx`), modal (`MimoRetentionModal.jsx`) e confirmação (`OrderConfirmation.jsx`) devem garantir que as capas flutuem diretamente sobre o painel sem caixas pretas, bordas escuras artificiais ou recortes deformados.
- **Destaque do Modal Pop-up:** A badge "GANHOU!!" da caixa de presente do pop-up de retenção deve sempre manter visual grandioso, chamativo e em destaque máximo.

### Pilar 2: Regras Comerciais de Carrinho e Frete
- **Isenção Total de Frete:** Itens marcados com `is_mimo: true` ou `is_digital: true` NUNCA devem entrar no cálculo de peso, volume e frete do Melhor Envio ou Correios (`useCheckoutLogic.js`).
- **Isenção de Regras de Atacado Físico:** Aplicativos digitais não entram no cômputo de regras de quantidade mínima de peças físicas de lingerie.
- **Micro-oferta Combo (+R$ 9,90):** O combo dos 3 apps adiciona R$ 9,90 ao total do pedido e salva os 3 apps no pedido de forma estruturada.

### Pilar 3: Checkout, Pedidos e Pagamentos
- **Gateway Mercado Pago:** Preservar a criação de preferências e links diretos com suporte a PIX (QR Code e Copia e Cola) e Cartão de Crédito em até 6x.
- **Idempotência de Pedidos:** As rotas de criação de pedido e webhooks de pagamento devem manter integridade referencial com as coleções `pedidos`, `itens_pedido` e `transacoes`.

### Pilar 4: Painel Executivo Google Ads & Analytics
- **Espelhamento Bidirecional Completo:** Todas as 5 macro-segmentações (Gatilhos de Busca, Demografia Básica & Renda Familiar, Localização & Horários, Tecnologia & Dispositivos, Públicos & DSA) devem manter endpoints de mutação ativos em `apps/api/src/routes/ads.js`.
- **Suporte Claro / Escuro:** O componente `GoogleAdsTab.jsx` e a página `AnalyticsPage.jsx` devem obrigatoriamente suportar o Modo Claro (`bg-white`, `border-zinc-200`, `text-zinc-900`) e o Modo Escuro (`dark:bg-zinc-900`, `dark:border-zinc-800`), sem renderizar caixas pretas rígidas no fundo creme.

### Pilar 5: Lia, WhatsApp & Notificações de Venda
- **Resolução de JID com e sem 9º Dígito:** O serviço de envio de WhatsApp deve sempre manter o fallback inteligente entre 8 e 9 dígitos para evitar falhas de entrega.
- **Sem Payloads Binários Pesados:** O cérebro da Lia (`routes/lia.js`) não deve receber arquivos PDF binários pesados diretamente no prompt para não estourar o contexto ou corromper a comunicação.
- **Canal Direto da Fábrica:** Mensagens de recuperação e atendimento transacional devem sempre manter os links seguros e o contato oficial de apoio ao cliente.

---

## 2. Portão de Teste Obrigatório Antes de Qualquer Entrega

Antes de submeter qualquer commit ou anunciar uma tarefa como concluída, execute obrigatoriamente:

```bash
# 1. Validação de Blindagem e Invariantes
npm run test:shield

# 2. Linter do Monorepo
npm run lint

# 3. Build de Produção do Frontend
cd apps/web && npx vite build
```

Nenhuma alteração é aprovada pelo Sentinel se `npm run test:shield` falhar.
