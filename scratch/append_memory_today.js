const fs = require('fs');

const entry = `

---

## [06/11/2026] - Blindagem de Frete, Tabela Padrão de Dimensões no Admin e Alinhamento Checkout-Melhor Envio

### Contexto e Objetivo
Garantir que as dimensões e pesos cadastrados na loja e calculados no checkout reflitam com exatidão as regras físicas e tarifárias das transportadoras parceiras do Melhor Envio (Loggi, J&T Express, Jadlog, Correios, Azul, Total Express), eliminando discrepâncias de valor, perda de margem de lucro ou erros de cobrança duplicada.

### Implementações Realizadas e Testadas

1. **Tabela Padrão de Dimensões e Pesos da Avante Lingerie (\`apps/web/src/pages/admin/ProdutoForm.jsx\`):**
   - Criada a matriz oficial com as 12 categorias de produtos da fábrica:
     * 🩲 Calcinhas: 60g | 2 x 12 x 17 cm
     * 👙 Sutiã sem bojo: 80g | 3 x 15 x 20 cm
     * 🎀 Sutiã com bojo estruturado: 120g | 8 x 15 x 20 cm
     * 👙 Conjunto s/ bojo: 150g | 4 x 15 x 20 cm
     * 🎀 Conjunto c/ bojo tradicional: 180g | 8 x 16 x 22 cm
     * 👚 Cropped regata: 150g | 3 x 15 x 20 cm
     * 👗 Pijama / Camisola / Short Doll / Baby Doll: 200g | 4 x 16 x 22 cm
     * 🧥 Pijama Suede Aveludado: 320g | 5 x 20 x 25 cm
     * 🏋️‍♀️ Conjunto Fitness top e short: 250g | 4 x 18 x 22 cm
     * 🏃‍♀️ Conjunto Fitness top e calça legging: 420g | 6 x 20 x 25 cm
     * 🩳 Short fitness avulso: 140g | 3 x 15 x 20 cm
     * ⏳ Calcinha cinta Fitness / Modeladora: 150g | 3 x 15 x 20 cm
   - Implementados 4 botões de atalho rápido com 1 clique (Calcinha, Conjunto s/ bojo, Sutiã c/ bojo, Pijama leve) logo acima dos campos.
   - Implementado seletor dropdown completo com as 12 categorias.
   - Implementada heurística inteligente que sugere os padrões automaticamente ao digitar o nome do produto ou selecionar a categoria (sem sobrescrever dados manuais).

2. **Captura Fiel da Opção Escolhida pelo Cliente no Checkout:**
   - \`apps/web/src/hooks/useCheckoutLogic.js\`: Enriquecido o objeto \`shippingOption\` para carregar \`company\`, \`serviceName\`, \`deliveryTime\` e \`id\` do frete selecionado.
   - \`apps/api/src/routes/payment.js\`: Persistência desses dados nos novos campos da collection \`pedidos\` no PocketBase ao criar o pedido: \`transportadora\`, \`forma_envio\`, \`prazo_envio\`, \`servico_frete_id\`.

3. **Blindagem do Melhor Envio e Idempotência de Etiqueta (\`apps/api/src/routes/shipping.js\`):**
   - **Prevenção de Cobrança Dupla:** Se o pedido já possui \`etiqueta_url\` e \`melhor_envio_id\`, o endpoint \`POST /gerar-etiqueta-unificada\` não gera nova compra nem debita saldo; retorna a etiqueta existente.
   - **Piso Mínimo das Transportadoras:** Aplicação automática do piso de 2x12x17cm e peso mínimo de 300g nas cotações para evitar erros de cubagem ou recusa nas esteiras automatizadas da Loggi, J&T e Correios.
   - **Extração Inteligente de NF-e:** A partir da chave de 44 dígitos da SEFAZ, o sistema extrai o número exato da NF-e (dígitos 25 a 34) e a série (dígitos 22 a 25), eliminando fallbacks incorretos.
   - **Instruções Gainscha GS-2406T:** O visualizador de impressão térmica (\`GET /etiqueta-unificada/:pedidoId\`) conta agora com card de instruções fixo (papel 100x150mm, margens nenhuma, escala 100%) e botão direto para abrir o PDF oficial do Melhor Envio.
   - **Rastreio Calibrado:** O texto do fallback em \`POST /shipping/track\` foi ajustado para *"Etiqueta de envio gerada. Pacote embalado aguardando coleta pela transportadora"* com status *"Pronto para Coleta"*.

4. **Painel do Administrador (\`apps/web/src/pages/admin/PedidoDetalhePage.jsx\`):**
   - Banner de destaque exibindo qual transportadora a cliente escolheu (ex: Loggi Express), o prazo e o valor pago de frete.
   - Botão verde dinâmico *"PDF Oficial Melhor Envio"* quando a etiqueta já estiver contratada.
   - Salvamento automático no PocketBase da chave da NF-e colada via \`onBlur\`.

### Validações Executadas
- Teste prático de CRUD no PocketBase com produto utilizando medidas padrão (criação e exclusão confirmadas com sucesso).
- Verificação do registro oficial PED-004 (\`k4ql7tfcmh52t0r\`) com NF-e 000016, chave SEFAZ e rastreio J&T Express.
- Build de produção do Vite (\`apps/web\`) executado sem erros (3115 módulos compilados).
- Verificação sintática (\`node -c\`) de todas as rotas de backend alteradas.
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('Successfully appended 06/11/2026 entry to MEMORIA_TECNICA.md');

