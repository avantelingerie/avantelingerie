const fs = require('fs');

const entry = `

---

## [04/11/2026] - Reestruturação e Reatividade do Dashboard Admin (Visão Geral)

### Contexto e Diagnóstico
O lojista identificou que os cards de indicadores de topo e gráficos do Dashboard Admin não refletiam as vendas realizadas de teste (Ísis Santos - PED-003, R$ 127,77 e Dooner - PED-002, R$ 73,99), apresentando valores zerados (0 e R$ 0,00) e mensagem "Sem dados suficientes para o período" nos gráficos.

### Causas Raiz Confirmadas
1. **Bug Lexicográfico no SQLite/PocketBase:** PocketBase grava campos de timestamp como \`YYYY-MM-DD HH:mm:ss.sssZ\` (com espaço). O endpoint original utilizava \`.toISOString()\` (\`YYYY-MM-DDTHH:mm:ss.sssZ\`). Em comparação ASCII no SQLite, espaço (ASCII 32) é menor que 'T' (ASCII 84), fazendo com que pedidos criados no início do mês fossem descartados.
2. **Campos Omitidos no Endpoint /dashboard/kpis:** \`receita_liquida_mes\`, \`ticket_medio\`, \`clientes_novos\`, \`clientes_recorrentes\` e \`aguardando_acao\` não eram calculados nem enviados pelo backend.
3. **Incompatibilidade de Formato para Recharts:** Endpoints \`/dashboard/vendas-por-dia\`, \`/dashboard/receita-por-semana\` e \`/dashboard/produtos-mais-vendidos\` retornavam dicionários de objetos ou dados sem campos \`nome\` e \`quantidade\`, falhando a validação de array do frontend.
4. **Ausência de Reatividade:** Dashboard só carregava dados no mount inicial, sem escuta em tempo real, sem polling e sem botão de atualizar.

### Soluções Implementadas
1. **Backend (\`apps/api/src/routes/dashboard.js\`):**
   - Agregação e filtragem de pedidos em memória via \`Date\` nativo em JavaScript, 100% imune a divergências de string ou fuso.
   - Cálculo preciso de todas as métricas financeiras e operacionais (\`pedidos_hoje\`, \`pedidos_semana\`, \`pedidos_mes\`, \`receita_hoje\`, \`receita_semana\`, \`receita_mes\`, \`receita_liquida_mes\`, \`ticket_medio\`, \`clientes_novos\`, \`clientes_recorrentes\`, \`aguardando_acao\`), desconsiderando pedidos cancelados.
   - Geração de arrays cronológicos ordenados para os últimos 30 dias (\`/vendas-por-dia\`) e últimas 8 semanas (\`/receita-por-semana\`).
   - Consolidação de itens por nome de produto para o Top 5 mais vendidos (\`/produtos-mais-vendidos\`).
   - Tratamento completo de erros e try/catch em todos os endpoints.
2. **Frontend (\`DashboardPage.jsx\`, \`KPIsSection.jsx\`, \`GraficosSection.jsx\`, \`ListasRapidasSection.jsx\`):**
   - Adicionado botão manual "Atualizar" com spinner no cabeçalho.
   - Adicionada inscrição em tempo real nativa (\`pb.collection('pedidos').subscribe('*')\`) com auto-refresh instantâneo em qualquer venda ou alteração de pedido.
   - Polling silencioso de contingência a cada 60s com cleanup garantido na desmontagem do componente.
   - Formatação e tooltips informativos em todos os gráficos do Recharts.

### Auditoria e Validação
- **Portão Nemotron (OpenRouter):** Parecer formal emitido e aprovado (recomendações de cleanup e ordenação cronológica estrita aplicadas).
- **Testes de Integração de Rotas:** Validados com dados reais do PocketBase (Ísis R$ 127,77 capturada com sucesso no mês; 30 dias e 8 semanas gerados; top produtos consolidados).
- **Compilação do Frontend:** \`npm --prefix apps/web run build\` executado com sucesso (3115 módulos transformados, 0 erros).
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('MEMORIA_TECNICA.md atualizada com sucesso!');
