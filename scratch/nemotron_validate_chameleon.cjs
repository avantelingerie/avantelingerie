const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura de código e validador prévio da Avante Lingerie (conforme AGENTS.md).
Avalie a seguinte proposta técnica da Ada para implementação da funcionalidade "Botão Camaleão de Encomenda de Fábrica" e "Banner de Lançamento Fitness" na loja Avante Lingerie:

PROPOSTA TÉCNICA:
1. ProductCard.jsx:
   - Detecção precisa de estoque esgotado:
     const isOutOfStock = (data.stock !== undefined && data.stock !== null && Number(data.stock) <= 0) ||
                          (data.estoque !== undefined && data.estoque !== null && Number(data.estoque) <= 0) ||
                          (data.estoque_restante !== undefined && data.estoque_restante !== null && Number(data.estoque_restante) <= 0);
   - Quando isOutOfStock === true:
     - O botão principal não adiciona à sacola (evitando erro de checkout de item sem estoque físico).
     - O texto muda para: "📦 ENCOMENDAR DE FÁBRICA"
     - Ao clicar, redireciona para o formulário pré-preenchido em /contato?assunto=Encomendas%20Especiais%20%2F%20Produção&produto=\${encodeURIComponent(name)}&ref=\${encodeURIComponent(reference)}
     - O badge de estoque no topo do card informa "📦 Sob encomenda de fábrica" com estilo sofisticado em vez de "Apenas X peças".
   - Quando isOutOfStock === false (ou estoque reabastecido no PocketBase > 0):
     - O botão e comportamento voltam 100% ao normal ("ADICIONAR À SACOLA" / "ADICIONAR AO PEDIDO").
     - Nenhuma alteração destrutiva no carrinho ou nas regras de B2B/Varejo.

2. ProductPage.jsx:
   - Se o produto tiver variações:
     const isOutOfStock = !semVariacoes && activeVariation ? Number(activeVariation.estoque) <= 0 : (semVariacoes ? (Number(product?.stock) <= 0 || Number(product?.estoque) <= 0) : false);
   - Quando isOutOfStock:
     - O botão Desktop e o Sticky CTA Mobile deixam de ser "Desabilitados / Esgotado" cinza e tornam-se botões ativos com estilo nobre: "📦 ENCOMENDAR DE FÁBRICA".
     - Ao clicar, invoca handleEncomendaClick() que envia o produto, a referência, a cor selecionada e o tamanho selecionado no formulário de contato:
       /contato?assunto=Encomendas%20Especiais%20%2F%20Produção&produto=\${encodeURIComponent(productName + (selectedSize ? ' (Tam: ' + selectedSize + ')' : '') + (activeColorName ? ' (Cor: ' + activeColorName + ')' : ''))}&ref=\${encodeURIComponent(productReferencia)}
     - O botão secundário "COMPRAR AGORA" é substituído por um aviso elegante de fabricação sob demanda: "🏭 Peça disponível sob encomenda direto da fábrica. Prazo estimado de confecção: 5 a 7 dias úteis."
   - Quando estoque > 0:
     - Tudo funciona exatamente como antes: adicionar ao carrinho, abrir drawer, calcular totais, regras de revendedora e desconto progressivo.

3. Banner de Lançamento Fitness (HomePage.jsx / FitnessLaunchBanner.jsx):
   - Criar um componente de alta conversão, responsivo e estético de luxo.
   - Apresentar os diferenciais da confecção de Nova Friburgo (alta compressão, zero transparência, poliamida premium).
   - Botão direto para encomenda/reserva com rota pré-preenchida para /contato.

REGRAS DE VALIDAÇÃO NEMOTRON:
- Há algum risco de quebra no carrinho existente?
- Há risco de regressão nas compras de produtos normais com estoque?
- A experiência de reabastecimento é 100% reativa?
- Dê o seu parecer: [APROVADO] ou [REPROVADO COM RESSALVAS] e aponte eventuais refinos.`;

async function validateWithNemotron() {
  console.log('--- ENVIANDO AO PORTÃO NEMOTRON ---');
  const candidates = [
    'nvidia/nemotron-3.5-super-vl:free',
    'nvidia/nemotron-3.5-lightning:free',
    'nvidia/nemotron-3-ultra-550b-a55b:free',
    'google/gemini-2.0-flash-exp:free'
  ];

  for (const model of candidates) {
    try {
      console.log(`Tentando validação com modelo: ${model}...`);
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
        signal: AbortSignal.timeout(40000)
      });

      if (!res.ok) {
        console.log(`Erro HTTP ${res.status} no modelo ${model}. Tentando próximo...`);
        continue;
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      console.log('\n=== PARECER DO NEMOTRON ===\n');
      console.log(reply);
      return;
    } catch (err) {
      console.log(`Falha com ${model}: ${err.message}. Tentando próximo...`);
    }
  }
  console.error('Não foi possível obter resposta dos modelos gratuitos no timeout.');
}

validateWithNemotron();
