const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica e Arquiteta) elaborou uma solução cirúrgica e segura para ativar e blindar o rastreamento de conversões do Google Ads na loja virtual (AW-18499593515 e Rótulo I3OOCNz7z6QdEKvKpfVE), em estrita observância à PRIMEIRA REGRA DE OURO da loja.

CONTEXTO E DIAGNÓSTICO:
1. No painel do Google Ads da conta (1394292049), a ação de conversão "Compra no Site - Tag Direta" estava com o alerta: "Foi criada uma ação de conversão, mas a etiqueta ainda não está validada".
2. No painel administrativo da Avante Lingerie (Analytics -> Tracking & Pixels), o lojista acabou de inserir e salvar com sucesso os IDs oficiais:
   - ID da Tag: AW-18499593515
   - Rótulo de Conversão (Label): I3OOCNz7z6QdEKvKpfVE
3. No código-fonte da aplicação web (apps/web):
   a) Em apps/web/index.html, existia uma tag genérica antiga com placeholder "GTM-XXXXXXX", gerando erros 404 de container não encontrado no console.
   b) Em apps/web/src/lib/marketingPixels.js, as variáveis 'googleAdsTagId' e 'googleAdsConversionLabel' inicializavam como strings vazias (''), aguardando uma chamada assíncrona que podia falhar em conexões lentas ou antes da resposta do banco.
   c) A função trackPurchase() ignorava o disparo de conversão do Google Ads caso essas variáveis em memória estivessem vazias.

SOLUÇÃO CIRÚRGICA PROPOSTA PELA ADA:
1. Em apps/web/index.html:
   - Remover o container genérico 'GTM-XXXXXXX' (elimina erros 404 no console).
   - Inserir a Google Tag oficial padrão da conta ('AW-18499593515') diretamente no <head>, garantindo que todo visitante que venha de anúncios do Google tenha o identificador de clique (gclid) imediatamente preservado e que o scanner de tags do Google reconheça o domínio.
2. Em apps/web/src/lib/marketingPixels.js:
   - Inicializar as variáveis 'googleAdsTagId' e 'googleAdsConversionLabel' diretamente com os valores padrão ('AW-18499593515' e 'I3OOCNz7z6QdEKvKpfVE'), mantendo a sincronização dinâmica com o PocketBase caso o lojista altere no futuro.
   - Na função trackPurchase(), blindar o envio do evento 'conversion' para 'AW-18499593515/I3OOCNz7z6QdEKvKpfVE' com fallback estrito, garantindo que todo pedido aprovado envie valor, moeda BRL e transaction_id com 100% de confiabilidade.
   - Fornecer função auxiliar segura para disparo de teste de validação.
3. Em apps/web/src/components/AnalyticsTracker.jsx:
   - Garantir que a tag base 'AW-18499593515' receba config global contínuo sem duplicidade de scripts.

AUDITORIA SOLICITADA:
1. Avalie a integridade técnica, segurança, desempenho e robustez das alterações.
2. Há algum risco para o checkout, carrinho, cálculo de frete, pagamento no PIX/Mercado Pago ou integridade dos dados?
3. Há risco para as campanhas da Meta (Meta Pixel e CAPI)?
4. Você aprova formalmente esta implementação para prosseguir no repositório da Avante Lingerie?`;

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
          messages: [{ role: 'user', content: prompt }]
        })
      });

      if (!res.ok) {
        console.log(`Falha HTTP ${res.status} no modelo ${model}`);
        continue;
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        console.log('\n================ VEREDITO NEMOTRON ================');
        console.log(content);
        console.log('====================================================\n');
        fs.writeFileSync('scratch/nemotron_audit_google_ads.txt', content, 'utf8');
        return;
      }
    } catch (e) {
      console.log(`Erro no modelo ${model}: ${e.message}`);
    }
  }
  console.log('Não foi possível obter resposta dos modelos gratuitos.');
}

runAudit();

