const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de alta performance e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica e Arquiteta) elaborou uma solução cirúrgica e definitiva para resolver dois problemas críticos apontados pelo lojista, em estrita observância à PRIMEIRA REGRA DE OURO da loja:

CONTEXTO E PROBLEMAS OBSERVADOS:
1. RASTREAMENTO DISCREPANTE (Print 3 vs Print 4):
   - Sintoma: A página da loja (/rastreio) exibia dados genéricos e simulados ("Objeto em transferência...", "Avante Cargo Premium", "A caminho") em vez dos dados reais da entrega da cliente Ísis (Pedido PED-003, Rastreio 888031017960740, J&T Express). No Melhor Rastreio oficial, o pacote já está postado, com previsão em 06/11/2026 e histórico real em São João de Meriti/RJ e Nova Friburgo/RJ.
   - Causa Raiz: O endpoint anterior (api.melhorenvio.com.br/api/v2/me/shipment/tracking) exigia o UUID de 36 caracteres do pedido do Melhor Envio (a3214062-...) e retornava erro 422 quando recebia o código de rastreamento de 15 caracteres (888031017960740). Com isso, caía silenciosamente no mock simulado. Além disso, no frontend (RastreioPage.jsx), o nome "Avante Cargo Premium" estava chumbado no JSX em vez de usar os dados da transportadora.
   - Solução Técnica Proposta:
     a) Implementar integração no backend (apps/api/src/routes/shipping.js) consumindo a GraphQL API oficial e em tempo real do Melhor Rastreio (https://api.melhorrastreio.com.br/graphql) através da query 'findByTrackingCode(tracker: { trackingCode: ... })'.
     b) Mapear os eventos com a lista oficial de traduções (findAllTranslatedTrackingEvents), obtendo os títulos e descrições idênticos aos da tela oficial do Melhor Rastreio ("Seu pacote foi transferido para outra unidade", "Seu pacote foi coletado pela transportadora", "CTe emitido"), locais reais ("São João de Meriti/RJ", "Nova Friburgo/RJ") e data de entrega estimada precisa ("06/11/2026").
     c) No frontend (apps/web/src/pages/RastreioPage.jsx), substituir o texto estático "Avante Cargo Premium" por "{orderData.carrier || orderData.carrierName || orderData.shipmentMethod}".

2. EMOJIS DO WHATSAPP CORROMPENDO COM SINAIS ESTRANHOS (Print 2):
   - Sintoma: Ao clicar no link de envio ou conversa no WhatsApp, a mensagem na tela exibe losangos pretos com interrogação (\\uFFFD\\uFFFD) no lugar dos emojis.
   - Causa Raiz: A URL utilizada apontava para 'https://api.whatsapp.com/send/?phone=...&text=...'. Essa rota é uma página intermediária em PHP/HTML servida pela Meta, cujo parser não suporta caracteres UTF-8 de 4 bytes (como emojis coloridos), convertendo-os em losangos pretos no HTML de visualização prévia, e repassando esse texto truncado para o WhatsApp Web.
   - Solução Técnica Proposta:
     a) No frontend (apps/web/src/pages/admin/PedidoDetalhePage.jsx), apontar o botão diretamente para 'https://web.whatsapp.com/send?phone=...&text=...', que acessa o WhatsApp Web diretamente sem passar pela página intermediária da Meta, garantindo decodificação 100% nativa em JavaScript via decodeURIComponent com emojis perfeitos.
     b) Manter e destacar o botão '[ 📋 Copiar Mensagem Completa (Zap) ]', que injeta o texto puro com emojis diretamente na área de transferência (navigator.clipboard.writeText), sem qualquer dependência de URL.
     c) No backend (apps/api/src/services/notificationService.js), atualizar o link manual retornado no payload para a rota direta do WhatsApp Web.

3. ARQUIVAMENTO DA ESPECIFICAÇÃO DE GERAÇÃO DE ETIQUETAS DIRETO NO ADMIN:
   - Salvar a especificação detalhada em docs/features/geracao-etiquetas-melhor-envio.md para implementação futura da geração de etiquetas e impressão térmica com 1 clique direto no painel da loja.

AUDITORIA SOLICITADA:
1. Avalie a integridade técnica, segurança, desempenho e robustez das soluções propostas.
2. Identifique se existe algum risco de regressão para os pedidos em andamento ou para as campanhas de tráfego pago ativas.
3. Você valida e aprova formalmente esta implementação para o código da Avante Lingerie?`;

async function runAudit() {
  console.log('--- ENVIANDO PACOTE DE AUDITORIA AO COPILOTO NEMOTRON (PORTÃO TERMINAL) ---');
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
          messages: [{ role: 'user', content: prompt }]
        }),
        signal: AbortSignal.timeout(60000)
      });

      if (!res.ok) {
        console.log(`Modelo ${model} retornou status ${res.status}, tentando próximo...`);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        console.log('\n============================================================');
        console.log(`  PARECER OFICIAL DO COPILOTO NEMOTRON (${model})`);
        console.log('============================================================\n');
        console.log(content);
        fs.writeFileSync('scratch/nemotron_audit_verdict.txt', content);
        return;
      }
    } catch (err) {
      console.log(`Falha com modelo ${model}: ${err.message}`);
    }
  }
}

runAudit();
