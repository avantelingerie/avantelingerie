const fs = require('fs');

const envContent = fs.readFileSync('apps/api/.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de alta performance e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica) e o lojista definiram o módulo de "Compra sob Encomenda no Checkout" (Backorder Inteligente) com as seguintes diretrizes:

1. DIRETRIZES AUTORIZADAS PELO LOJISTA:
   - Cor do botão de encomenda: Dourado Champagne (#c59b5f com hover #b0874c e texto preto #121212 em negrito).
   - Texto do botão: "🧵 COMPRAR SOB ENCOMENDA".
   - Prazo de confecção da fábrica: 5 dias úteis (fixos).
   - Cálculo de frete: O prazo de confecção (5 dias úteis) é somado ao prazo de transporte (Correios / Melhor Envio).
   - Consentimento rápido: Modal explicativo antes da inclusão na sacola para zero reclamações no pós-venda.

2. ARQUITETURA TÉCNICA PROPOSTA:
   A) Frontend - useCart.js:
      - addToCart(product): se product.is_encomenda === true, faz bypass da trava de estoque zerado (stockLimit <= 0).
      - updateQuantity(cartItemId, qty): se item.is_encomenda === true, permite alterar a quantidade sem travar em stockLimit.
      - Novos helpers exportados:
        - hasEncomendaItems: cart.some(i => i.is_encomenda)
        - maxDiasProducao: hasEncomendaItems ? 5 : 0
   B) Frontend - ProductPage.jsx & ProductCard.jsx:
      - Quando isOutOfStock: exibe o botão Dourado Champagne "🧵 COMPRAR SOB ENCOMENDA".
      - Ao clicar, abre modal de confirmação rápida: "Esta peça exclusiva será produzida sob encomenda para você em nossa fábrica em até 5 dias úteis antes do envio postal. Deseja adicionar à sua sacola?".
      - Ao confirmar, executa addToCart({ ...product, is_encomenda: true, dias_producao: 5, tag_encomenda: 'Confecção de Fábrica (5 dias úteis)' }).
   C) Frontend - Frete & Checkout (SmartShipping.jsx, CartItem.jsx, Checkout.jsx):
      - CartItem: Exibe badge sutil "🧵 Sob Encomenda (5 dias úteis)".
      - SmartShipping / Checkout: Se hasEncomendaItems === true, soma 5 dias úteis ao delivery_time de cada opção e exibe aviso informativo transparente: "📦 Prazo inclui +5 dias úteis de confecção na fábrica".
      - Remessa única: o cliente paga frete único mesmo com carrinho misto.
   D) Backend - payment.js & estoque:
      - Na gravação de itens do pedido, persiste is_encomenda: true e dias_producao: 5.
      - Se hasEncomenda, adiciona observações: "[🧵 PEDIDO SOB ENCOMENDA - CONFECÇÃO: 5 DIAS ÚTEIS]".
      - Na rotina de baixa de estoque: itens com is_encomenda: true pulam a redução de estoque físico, preservando o estoque em 0 sem criar saldos negativos.
   E) Backend - blingService.js & Pedidos Admin:
      - Bling: envia observacoes para a API v3 de pedidos de venda do Bling.
      - Admin (PedidosTable.jsx): exibe badge destacado "🧵 ENCOMENDA (5 DIAS)" na linha do pedido.

AUDITORIA SOLICITADA AO NEMOTRON:
1. Avalie a integridade do fluxo de ponta a ponta (Produto -> Carrinho -> Frete -> Pagamento -> Bling/Estoque).
2. Valide se a proteção contra estoque negativo no PocketBase e a sincronização com o Bling são robustas.
3. Avalie a experiência de transparência no frete (soma dos prazos e remessa única).
4. Emita seu veredito: se a arquitetura está APROVADA PARA IMPLEMENTAÇÃO e aponte quaisquer ressalvas ou recomendações refinadas.`;

async function runAudit() {
  console.log('--- ENVIANDO PROPOSTA DE BACKORDER AO NEMOTRON (PORTÃO DO TERMINAL) ---');
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

    const data = await res.json();
    if (data.choices && data.choices[0]) {
      console.log('\n=== PARECER TÉCNICO DO NEMOTRON ===\n');
      console.log(data.choices[0].message.content);
      console.log('\n====================================\n');
    } else {
      console.error('Resposta inesperada da API:', data);
    }
  } catch (err) {
    console.error('Erro na auditoria do Nemotron:', err.message);
  }
}

runAudit();
