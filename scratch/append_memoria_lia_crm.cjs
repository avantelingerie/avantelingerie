const fs = require('fs');

const entry = `
---

### [2026-11-04 18:15] SINCRONIZAÇÃO EM TEMPO REAL E REATIVIDADE DINÂMICA DO CRM LIA (WHATSAPP & CHAT DA LOJA VIRTUAL)
- **Agentes:** Ada (Líder/Arquiteta), Atlas (Diagnóstico), Forge (Backend/Dados/PocketBase), Lumi (Frontend/UX), Sentinel (Auditoria QA)
- **Portão Nemotron (Terminal):** Submetida arquitetura ao Nemotron (nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) com veredito formal de **APROVADO** em todos os quesitos (segurança, integridade, ausência de efeitos colaterais ao checkout e pagamentos, resiliência do modelo híbrido de reatividade e migração segura do schema).
- **Diagnóstico e Causas Raiz Identificadas:**
  1. **Schema do PocketBase desprovido de autodates:** A coleção \`lia_conversas\` não possuía os campos de sistema \`created\` e \`updated\` do tipo \`autodate\`. Em decorrência disso, requisições com ordenação \`sort: '-updated'\` falhavam com erro HTTP 400 Bad Request, forçando o frontend a cair em fallback de \`getFullList()\` revertido por ID de inserção no SQLite. Conversas existentes que recebiam novas falas (como os testes no WhatsApp de Luiz Machado) ficavam presas em posições inferiores e não subiam para o topo.
  2. **Ausência de Reatividade no Frontend:** O arquivo \`LiaAdminPage.jsx\` realizava a busca de conversas exclusivamente no \`useEffect\` inicial de montagem da tela. Não existia inscrição em tempo real via WebSocket (\`pb.collection('lia_conversas').subscribe('*')\`) nem rotina de polling, obrigando o operador a teclar F5 ou clicar em "Atualizar" a cada fala trocada.
  3. **Dessincronia de Seleção ao Filtrar Canais:** Ao clicar no filtro "WhatsApp", a lista à esquerda filtrava os contatos, porém o estado \`selectedSessionId\` permanecia vinculado ao visitante da loja virtual selecionado no boot (\`Visitante Loja #81CE78\`), gerando grave confusão visual onde o painel direito exibia o chat do site mesmo com a aba de WhatsApp ativa.
  4. **Metadados Ausentes:** As rotas \`/lia/chat\` e \`/lia/whatsapp-webhook\` não gravavam timestamp nos objetos das mensagens e não persistiam o campo \`cliente_nome\`, ocultando horários nos balões e gerando rótulos genéricos como \`WhatsApp • Contato #218021\`.
- **Implementações e Soluções Aplicadas:**
  1. **Migração Não-Destrutiva do Schema no PocketBase:**
     - Realizado backup prévio completo dos 37 registros (\`scratch/backup_lia_conversas.json\`).
     - Adicionados os campos \`created\` (\`autodate\`, onCreate: true), \`updated\` (\`autodate\`, onCreate: true, onUpdate: true) e \`cliente_nome\` (\`text\`).
     - Executado backfill de timestamps e normalização para garantir que \`sort: '-updated'\` funcione nativamente no banco.
  2. **Backend API (\`apps/api/src/routes/lia.js\` e \`whatsapp.js\`):**
     - Injetado timestamp ISO em todas as mensagens (\`new Date().toISOString()\`) nas rotas \`/lia/chat\` e \`/lia/whatsapp-webhook\`.
     - Atualização automática de \`cliente_nome\` a partir do identificador (\`notifyName\`) recebido pelo WhatsApp.
     - Criado endpoint \`POST /whatsapp/send\` em \`whatsapp.js\` que faz a ponte com o container do bot na porta 3000.
  3. **WhatsApp Bot (\`apps/whatsapp-bot/index.js\`):**
     - Blindado o endpoint \`/send\` para tratar identidades \`@lid\`, \`@c.us\` e números com DDD sem corromper o identificador.
  4. **Frontend CRM (\`apps/web/src/pages/admin/LiaAdminPage.jsx\`):**
     - **Reatividade Híbrida Dupla:** Inscrição em tempo real com \`pb.collection('lia_conversas').subscribe('*')\` + Polling silencioso de contingência a cada 4 segundos com cleanup no \`useEffect\` para evitar memory leaks.
     - **Sincronização Automática de Filtros:** Se o operador mudar o filtro (ex: clicar em "WhatsApp") e a conversa ativa pertencer a outro canal, o sistema seleciona automaticamente a conversa mais recente daquele filtro.
     - **Exibição do Nome Real:** Priorização do \`cliente_nome\` no card e no cabeçalho do chat quando disponível.
     - **Horários Reais nos Balões:** Renderização do horário exato de cada fala (\`msg.timestamp\`).
     - **Despacho Humano para WhatsApp:** Ao responder uma conversa de WhatsApp no formulário do CRM, a mensagem é salva no banco e enviada diretamente para o celular do cliente.
     - **Badge de Status:** Adicionado indicador visual "Tempo Real Ativo" no topo da página.
- **Validação e Comprovação Prática (Testes Automatizados):**
  - \`npm --prefix apps/web run build\`: Compilado com sucesso absoluto em 1m 17s (0 erros de TypeScript/JSX/Vite).
  - \`node --check\` no backend: Verificação de sintaxe aprovada com código 0.
  - Script E2E (\`scratch/test_crm_e2e_realtime.mjs\`):
    - Consulta \`sort: '-updated'\` retornou com status 200 OK sem erro 400.
    - Teste de recência comprovou que nova mensagem faz a conversa saltar instantaneamente para a posição #1 do CRM.
    - Teste de lógica de filtro comprovou alternância de seleção automática sem travamentos.
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('Successfully appended Lia CRM entry to MEMORIA_TECNICA.md');

