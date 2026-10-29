const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de alta performance e auditor lógico da Avante Lingerie.
A Ada (Líder Técnica) elaborou a especificação técnica para a nova feature solicitada pelo lojista:
"COMPRA SOB ENCOMENDA DIRETO NO CHECKOUT (BACKORDER INTELIGENTE DE FÁBRICA)"

CONTEXTO DE NEGÓCIO:
A Avante Lingerie é confecção própria em Nova Friburgo/RJ. Quando o estoque de uma variação (tamanho/cor) está zerado, hoje o botão "camaleão" exibe "ENCOMENDAR DE FÁBRICA" e direciona para o formulário /contato.
O lojista quer permitir que clientes habituais, cadastrados e revendedoras (que já conhecem a fábrica e confiam na marca) possam COMPRAR E PAGAR NORMALMENTE pelo produto mesmo com estoque zerado, com o sistema somando automaticamente o prazo de confecção (5 a 7 dias úteis) ao prazo do frete no checkout, gerando pedido e recibo regular.

ARQUITETURA PROPOSTA PELA ADA:

1. ELEGIBILIDADE E RECONHECIMENTO DO CLIENTE:
   - Critério de Segurança: Clientes deslogados ou sem histórico mantêm o fluxo seguro (formulário / WhatsApp) para evitar cancelamentos por falta de ciência do prazo.
   - Elegíveis automáticos:
     a) isReseller (perfil atacado/revendedor: commercial_profile === 'reseller' || tipo_cliente === 'revendedor')
     b) Clientes logados com total_compras > 0 ou histórico de pedidos confirmados
     c) Flag opcional no usuário: autorizado_encomenda: true
   - Na página do produto (ProductPage & ProductCard):
     Se o produto/variação tem estoque 0 e o usuário é elegível:
     O botão fica ativo: "COMPRAR SOB ENCOMENDA".
     Ao clicar, abre um Modal de Confirmação Rápida de Fábrica (com checkbox de ciência: "Entendo que esta peça será confeccionada sob encomenda em até 7 dias úteis antes do despacho").

2. BYPASS SEGURO NO MOTOR DO CARRINHO (useCart.js):
   - Modificação cirúrgica em addToCart:
     const isEncomenda = Boolean(product.is_encomenda);
     if (stockLimit <= 0 && !isEncomenda) {
       toast.error('Desculpe, este produto esgotou no momento!');
       return false;
     }
   - O item no carrinho ganha { ..., is_encomenda: true, dias_producao: 7 }.
   - Exporta helpers reativos:
     hasEncomendaItems: cart.some(i => i.is_encomenda)
     maxDiasProducao: hasEncomendaItems ? Math.max(...cart.filter(i => i.is_encomenda).map(i => i.dias_producao || 7)) : 0

3. SOMA AUTOMÁTICA DE PRAZOS (SmartShipping.jsx, OrderSummary.jsx, Checkout.jsx):
   - Na consulta de frete (Melhor Envio / Correios):
     Se hasEncomendaItems for true:
     delivery_time_exibido = delivery_time_original + maxDiasProducao
     Exemplo: Frete PAC 4 dias úteis + 7 dias confecção = 11 dias úteis.
     Exibe badge transparente: "📦 Contém peça sob encomenda (+7 dias úteis de confecção no ateliê)".
   - Para retirada na fábrica: "Pronto em 5 a 7 dias úteis (após confecção)".

4. PERSISTÊNCIA E ADMIN (Zero Risco de Migração Destrutiva):
   - O array 'itens' do PocketBase armazena cada item com is_encomenda: true.
   - O campo 'observacoes' do pedido recebe prefixo: "[ENCOMENDA DE FÁBRICA - CONFECÇÃO: 7 DIAS ÚTEIS]".
   - Na listagem de pedidos do admin (PedidosPage.jsx), destaca com badge ouro/âmbar: "[🧵 Encomenda]".

DESAFIO LÓGICO E CRIVO DO NEMOTRON:
1. Você identifica alguma falha lógica, furo de estoque ou risco de regressão nesta arquitetura?
2. O que acontece se o cliente colocar no carrinho 1 produto que tem estoque pronta-entrega E 1 produto sob encomenda? A soma do prazo no pedido todo é a decisão correta para não faturar frete duplicado?
3. Como deve se comportar a reserva de estoque no Bling ou PocketBase para não negativar estoque?
4. Você aprova a arquitetura e recomenda a preparação dos arquivos em sandbox?

Responda com análise técnica cirúrgica e seu veredito formal de aprovação.`;

const candidateModels = [
  'nvidia/nemotron-3.5-lightning:free',
  'nvidia/nemotron-3.5-super-vl:free'
];

async function runNemotron() {
  console.log('--- ENVIANDO ESPECIFICAÇÃO DE CHECKOUT SOB ENCOMENDA AO NEMOTRON ---');
  for (const model of candidateModels) {
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
        console.log(`Erro HTTP ${res.status} no modelo ${model}`);
        continue;
      }

      const data = await res.json();
      console.log(`\n--- PARECER OFICIAL DO NEMOTRON (${model}) ---\n`);
      console.log(data.choices?.[0]?.message?.content);
      return;
    } catch (err) {
      console.error(`Falha no modelo ${model}:`, err.message);
    }
  }
}

runNemotron();
