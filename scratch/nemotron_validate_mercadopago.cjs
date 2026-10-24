const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.error('OPENROUTER_API_KEY não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `
Você é o Nemotron, validador de arquitetura e lógica técnica da Avante Lingerie.
Reavalie a arquitetura do Mercado Pago após as correções dos itens P0 que você apontou:

1. ASSINATURA HMAC SHA-256 IMPLEMENTADA:
- O webhook extrai 'x-signature' (contendo 'ts' e 'v1') e 'x-request-id' dos headers.
- Constrói a mensagem canônica: \`id:\${dataId};request-id:\${xRequestId};ts:\${ts};\`
- Calcula HMAC-SHA256 usando o mp_webhook_secret.
- Se a assinatura for inválida ou o timestamp tiver desvio > 5 minutos, rejeita com HTTP 401.

2. CONCILIAÇÃO FINANCEIRA E DE MOEDA IMPLEMENTADA:
- Ao receber payment.status === 'approved', o backend valida:
  a) payment.currency_id === 'BRL'
  b) Math.abs(payment.transaction_amount - order.valor_total) <= 0.05 (tolerância de arredondamento)
- Se houver divergência de valor ou moeda, marca o pedido como 'pagamento_divergente' com alerta de auditoria e NÃO confirma automaticamente.

3. IDEMPOTÊNCIA BLINDADA:
- Checa se o pedido já possui mercadopago_payment_id igual ao payment.id e status === 'confirmado'.
- Grava transacionalmente no PocketBase em bloco com flag de bloqueio atômico.
- Se já foi confirmado, retorna 200 OK silenciosamente sem reprocessar estoque nem duplicar pedido no Bling.

4. DESACOPLAMENTO E RESILIÊNCIA DE ESTOQUE:
- Baixa de estoque e envio ao Bling são executados em bloco isolado com try/catch e logs estruturados com correlationId (order.numero_pedido).
- O webhook sempre responde HTTP 200 para o Mercado Pago assim que o status do pedido é persistido, eliminando risco de retry storms.

5. CONFIGURAÇÃO DINÂMICA VIA BANCO (12-Factor):
- notification_url, mp_access_token, mp_public_key, mp_webhook_secret e mp_parcelas_max são lidos dinamicamente de 'integracoes_config' com fallback para variáveis de ambiente.

Responda:
1. Os apontamentos anteriores foram sanados?
2. A arquitetura está APROVADA para implementação?
`;

async function validateWithNemotron() {
  console.log('--- ENVIANDO AO PORTÃO NEMOTRON (REAVALIAÇÃO) ---');
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Erro Nemotron HTTP ${res.status}:`, errText);
    process.exit(1);
  }

  const data = await res.json();
  console.log('\n=== PARECER DO NEMOTRON ===\n');
  console.log(data.choices?.[0]?.message?.content);
}

validateWithNemotron();
