const fs = require('fs');

const envContent = fs.readFileSync('apps/api/.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de alta performance e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica) e o lojista definiram o fluxo oficial de Onboarding & Boas-Vindas VIP para Cadastros B2B/Revenda, acionado quando o administrador clica no botão verde "Aprovar" na Central de Clientes e B2B (aba Solicitações B2B).

CONTEXTO E DADOS EXISTENTES OBSERVADOS:
Existem 4 solicitações pendentes no banco (incluindo Raiza Bella Elias da Silva e Ariane Muniz Ribeiro Rodrigues). Cada solicitação possui nome, whatsapp, cpf e user_id vinculado na tabela 'users' (onde o e-mail oficial do cliente reside).

PROPOSTA ARQUITETURAL PARA AUDITORIA DO NEMOTRON:

1. FLUXO NO CLIQUE DO BOTÃO VERDE "APROVAR" (Admin UI -> ClientesPage.jsx / SolicitacoesRevendedorTable.jsx):
   - O admin clica em "Aprovar(id, userId)".
   - O método 'aprovarRevendedor' em clientesService.js:
     a) Atualiza a solicitação para status: 'aprovado'.
     b) Atualiza a tabela 'users' com: tipo_cliente: 'revendedor', commercial_profile: 'reseller', cadastro_completo: true, account_level: 'verified'.
     c) Faz fetch do usuário para obter { name, email, whatsapp }.
     d) Dispara chamada POST para o endpoint backend: '/notificacoes/boas-vindas-revendedor' via apiServerClient.
     e) Retorna { success: true, emailSent, waLink, messageWa }.
   - Na UI do Admin: exibe toast de sucesso e modal/botão de 1 clique para abrir o WhatsApp Web da Lia com a mensagem personalizada pronta para envio humano de contingência.

2. FLUXO NO BACKEND (apps/api/src/routes/notificacoes.js e apps/api/src/services/notificationService.js):
   - Endpoint: POST /notificacoes/boas-vindas-revendedor
   - Recebe { name, email, whatsapp, userId, solicitacaoId }.
   - Valida parâmetros essenciais.
   - Dispara e-mail via Resend SDK:
     - Remetente: 'Avante Lingerie <pedidos@avantelingerie.com.br>'
     - Assunto: '👑 Seu acesso de fábrica foi liberado! (Mínimo de R$ 69,90 na Black Friday Avante)'
     - HTML: Template responsivo e editorial luxuoso da Avante Lingerie (paleta #c59b5f, #121212 e #ffffff), destacando: confecção própria em Nova Friburgo, pedido mínimo especial de Black Friday e Fim de Ano de apenas R$ 69,90, tabela comparativa de margem líquida de 100% a 150%, 5% OFF no PIX, até 6x no cartão, instruções de login e CTA dourado.
   - Dispara WhatsApp via webhook/bot se ativo.
   - Sanitiza o número de telefone (limpeza de caracteres, garantia do DDI 55) e gera o link direto 'https://wa.me/55...'.
   - Retorna resposta estruturada sem travar a requisição caso o serviço de e-mail ou WhatsApp oscile.

3. RECONHECIMENTO E RECORRÊNCIA NA LOJA:
   - Uma vez aprovado, o PocketBase possui commercial_profile: 'reseller'.
   - O cliente ao logar tem isReseller = true em todos os 22 arquivos mapeados.
   - A loja inteira exibe "Seu Custo de Fábrica", margens de boutique e preços de atacado.
   - Regra do Gatilho: pedidos com subtotal >= R$ 69,90 avançam no atacado. Pedidos < R$ 69,90 disparam modal/toast educativo informando o valor faltante para atingir o mínimo de revenda.

AUDITORIA SOLICITADA AO NEMOTRON:
1. Avalie a integridade técnica, resiliência e desacoplamento assíncrono (ex: tratamento se Resend falhar sem quebrar a aprovação no banco).
2. Valide se há riscos com os cadastros que já estão no sistema (solicitações pendentes legadas).
3. Avalie a segurança e aderência às regras do AGENTS.md.
4. Emita seu veredito formal: se está APROVADO PARA PRODUÇÃO (Production-Ready) ou aponte ressalvas.`;

async function runAudit() {
  console.log('--- ENVIANDO PROPOSTA DE ONBOARDING B2B AO NEMOTRON (PORTÃO DO TERMINAL) ---');
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
      const errText = await res.text();
      console.error('Erro na resposta do Nemotron:', res.status, errText);
      return;
    }

    const data = await res.json();
    console.log('\n================ RESPOSTA E CRIVO DO NEMOTRON ================');
    console.log(data.choices?.[0]?.message?.content || JSON.stringify(data));
    console.log('================================================================\n');
  } catch (err) {
    console.error('Falha ao consultar Nemotron:', err.message);
  }
}

runAudit();
