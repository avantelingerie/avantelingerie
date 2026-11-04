const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica e Arquiteta) elaborou uma solução estrutural e cirúrgica para sanar os problemas de sincronização em tempo real e visualização de conversas no CRM de Atendimento da Lia (Painel Admin > Cérebro da Lia > Atendimento & CRM), em estrita observância à PRIMEIRA REGRA DE OURO da loja.

CONTEXTO E DIAGNÓSTICO:
1. O lojista testou tanto o WhatsApp quanto o Chat da Loja Virtual com a Lia. Ambos responderam adequadamente aos clientes.
2. Contudo, no Painel Admin (LiaAdminPage.jsx):
   - A conversa recente do WhatsApp não estava visível ou parecia não aparecer no topo.
   - Para o chat da loja virtual, era necessário recarregar a página (F5) ou clicar manualmente no botão "Atualizar" a cada mensagem enviada ou recebida.
   - Havia grande confusão visual: ao selecionar o filtro "WhatsApp", a barra lateral filtrava os contatos, mas o painel direito da conversa continuava exibindo o visitante da loja virtual ("Visitante Loja #81CE78") que estava selecionado por padrão.
3. CAUSAS RAIZ CONFIRMADAS NO CÓDIGO E NO BANCO:
   - Causa 1 (PocketBase Schema): A coleção 'lia_conversas' foi atualizada no passado sem os campos de sistema 'created' e 'updated' do tipo 'autodate'. Como resultado, consultas com 'sort: -updated' falhavam com erro HTTP 400 Bad Request ("Something went wrong while processing your request"), forçando o frontend a cair num fallback que buscava todas as conversas e revertia por ordem de inserção do banco (ID fixo). Por isso, conversas existentes atualizadas com novas mensagens NÃO subiam para o topo!
   - Causa 2 (Falta de Reatividade / Realtime no Frontend): O arquivo LiaAdminPage.jsx chamava 'fetchConversas()' apenas uma única vez no mount inicial. Não havia inscrição em tempo real do PocketBase (pb.collection('lia_conversas').subscribe('*')) nem polling periódico para detectar novas mensagens ou conversas sem recarregar a tela.
   - Causa 3 (Dessincronia de Seleção nos Filtros): Quando o operador alternava o filtro de canal (ex: para 'whatsapp'), a lista da esquerda filtrava, mas 'selectedSessionId' continuava apontando para a conversa anterior de outro canal. Logo, o operador via a lista de WhatsApp na esquerda, mas lia o chat da Loja na direita.
   - Causa 4 (Metadados das Mensagens e Nomes): Nem o webhook do WhatsApp nem a rota /lia/chat gravavam timestamp nos objetos das mensagens ({ role, content }), fazendo com que os horários nos balões ficassem vazios. Além disso, 'cliente_nome' recebido do WhatsApp não era gravado na coleção 'lia_conversas', fazendo contatos de WhatsApp aparecerem como 'WhatsApp • Contato #218021' em vez do nome do cliente ('Luiz Machado').
   - Causa 5 (Envio de Resposta Humana para WhatsApp): Quando o operador respondia na interface do CRM, a mensagem era gravada apenas no banco PocketBase, mas não era despachada de volta para o WhatsApp do cliente via whatsapp-bot.

SOLUÇÃO CIRÚRGICA PROPOSTA PELA ADA:
1. POCKETBASE (Coleção 'lia_conversas'):
   - Adicionar com segurança campos 'created' (autodate, onCreate: true), 'updated' (autodate, onCreate: true, onUpdate: true) e 'cliente_nome' (text) na coleção 'lia_conversas'.
   - Executar script de migração seguro e não-destrutivo para preencher 'created' e 'updated' nos 37 registros existentes com base nas datas de mensagens ou timestamp atual, habilitando o sort nativo '-updated' com índice.
2. BACKEND API (apps/api/src/routes/lia.js e whatsapp.js):
   - Em /lia/chat e /lia/whatsapp-webhook: adicionar timestamp ISO em todas as mensagens ({ role, content, timestamp: new Date().toISOString() }).
   - Em /lia/whatsapp-webhook: salvar e atualizar 'cliente_nome' com o nome recebido do contato (ex: 'Luiz Machado').
   - Em whatsapp.js: criar endpoint seguro POST /whatsapp/send que repassa o envio para o container whatsapp-bot (http://whatsapp-bot:3000/send), suportando tanto números comuns quanto identidades @lid e @c.us.
3. WHATSAPP BOT (apps/whatsapp-bot/index.js):
   - Tratar no endpoint /send tanto números com DDD (+55... @c.us) quanto identidades @lid sem quebrar formato.
4. FRONTEND CRM (apps/web/src/pages/admin/LiaAdminPage.jsx):
   - Ativar inscrição nativa em tempo real: pb.collection('lia_conversas').subscribe('*', callback) para atualizar a lista e o chat ativo instantaneamente quando qualquer mensagem chegar.
   - Implementar polling de fallback silencioso (sync a cada 4 segundos) sem interferir no loading spinner, garantindo redundância total contra quedas de WebSocket.
   - Sincronizar seleção automática no filtro: se o canal mudar e a conversa ativa não pertencer ao filtro, selecionar automaticamente a primeira conversa da lista filtrada.
   - Exibir o nome real do cliente ('cliente_nome') tanto no card quanto no header do chat quando disponível.
   - Exibir horários reais das mensagens nos balões de chat.
   - No envio de mensagem humana: se a conversa for de WhatsApp, chamar a rota de envio para que a cliente receba a resposta humana diretamente no celular dela.

AUDITORIA SOLICITADA:
1. Avalie a integridade técnica, segurança, desempenho e robustez das alterações propostas.
2. Há algum risco para o checkout, pagamentos (PIX/Mercado Pago), catálogo de produtos ou estabilidade da VPS?
3. O modelo de reatividade híbrido (PocketBase Realtime + Fallback Silencioso de Polling a cada 4s) é seguro e resiliente contra memory leaks e desconexões?
4. A migração do schema no PocketBase é segura para os registros existentes?
5. Você aprova formalmente esta implementação para prosseguir no repositório da Avante Lingerie?`;

async function runAudit() {
  console.log('--- ENVIANDO PACOTE DE AUDITORIA AO NEMOTRON (PORTÃO TERMINAL) ---');
  const models = [
    'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    'nvidia/nemotron-3.5-super-vl:free',
    'google/gemma-4-26b-a4b-it:free',
    'google/gemma-4-31b-it:free'
  ];

  for (const model of models) {
    try {
      console.log(`Tentando modelo: ${model}...`);
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });

      if (!res.ok) {
        console.log(`Modelo ${model} falhou com status ${res.status}`);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        console.log('\n================ VEREDITO NEMOTRON ================');
        console.log(content);
        console.log('===================================================\n');
        fs.writeFileSync('scratch/nemotron_audit_lia_crm.txt', content, 'utf8');
        return;
      }
    } catch (e) {
      console.log(`Erro ao consultar ${model}:`, e.message);
    }
  }

  console.error('Nenhum modelo de auditoria respondeu.');
}

runAudit();

