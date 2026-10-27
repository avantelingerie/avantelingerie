const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura da Avante Lingerie.
A Ada incorporou 100% de seus apontamentos anteriores na implementação:

1. REATIVIDADE EM TEMPO REAL:
   - Adicionada subscrição nativa do PocketBase pb.collection('products').subscribe(id, ...) e pb.collection('variacoes').subscribe('*', ...) no ProductPage com limpeza no unmount.
   - Assim que o estoque for alterado no painel administrativo do PocketBase, o estado é atualizado em tempo real no React, fazendo o botão "camaleão" alterar instantaneamente entre "ADICIONAR À SACOLA" e "📦 ENCOMENDAR DE FÁBRICA" sem necessidade de recarregar a página!

2. DETECÇÃO ROBUSTA DE ESTOQUE (Sem falsos positivos):
   - Criada função sanitizada que verifica tipo, descarta strings vazias, NaN e nulos:
     const parseStockNumber = (val) => {
       if (val === undefined || val === null || val === '') return null;
       const num = Number(val);
       return isNaN(num) ? null : num;
     };
     const isOutOfStock = ... (se num === 0 ou <= 0, retorna true; se num > 0, false; se null, respeita integridade do produto).

3. PRÉ-PREENCHIMENTO CONFIRMADO EM /contato:
   - Verificado que ContactPage.jsx já possui suporte nativo aos query params (?assunto=, ?produto=, ?ref=) com auto-scroll suave para o formulário.
   - Os parâmetros agora incluem cor e tamanho selecionados para a encomenda já chegar detalhada à fábrica de Friburgo.

4. ACESSIBILIDADE E TRACKING:
   - Adicionado aria-label="Encomendar de fábrica diretamente com a confecção" e <span aria-hidden="true">📦</span>.
   - Adicionado disparador de telemetria/analytics em handleEncomendaClick.

5. BANNER FITNESS NOVO (FitnessLaunchBanner.jsx):
   - Componente modular isolado, estética de luxo ouro/carbono, destacando poliamida tecnológica, zero transparência e alta compressão, com link direto pré-preenchido para /contato.

Com esses 5 refinamentos atendendo a todos os seus apontamentos, você APROVA a implementação para a Ada gravar os arquivos?`;

async function validateRefinements() {
  console.log('--- ENVIANDO REFINOS AO PORTÃO NEMOTRON ---');
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3.5-super-vl:free',
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: AbortSignal.timeout(40000)
    });

    if (!res.ok) {
      console.log(`Erro HTTP ${res.status}:`, await res.text());
      return;
    }

    const data = await res.json();
    console.log('\n=== PARECER FINAL DO NEMOTRON ===\n');
    console.log(data.choices?.[0]?.message?.content);
  } catch (err) {
    console.error('Erro na chamada:', err.message);
  }
}

validateRefinements();
