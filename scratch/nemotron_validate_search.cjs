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
Analise a seguinte situação técnica e valide a solução proposta pela Ada para o problema das imagens na busca (SearchModal).

SITUAÇÃO OBSERVADA:
- Na barra de pesquisa rápida (SearchModal.jsx), ao digitar o nome de um produto (ex: "Calcinha"), o produto é encontrado mas a imagem aparece quebrada (ícone de broken image).
- Diagnóstico com evidência:
  1. No PocketBase da Avante Lingerie, o campo 'image' é um array de nomes de arquivos (ex: ['foto1.jpeg', 'foto2.jpg']).
  2. A imagem principal unitária fica em 'imagem_principal' (string, ex: 'foto1.jpeg').
  3. No SearchModal.jsx, o código anterior fazia:
     src={product.imagem_produto || pb.files.getUrl(product, product.image)}
     Como 'product.image' é um array, o SDK gerava uma URL com nomes concatenados por vírgula (%2C), retornando HTTP 404.
  4. 'imagem_principal' e 'gallery' eram ignorados.
  5. Não havia tratamento de 'onError' nem fallback se a URL falhasse.

SOLUÇÃO PROPOSTA PELA ADA PARA O SearchModal.jsx:

1. Função de Resolução Robusta de Imagem:
\`\`\`javascript
const getSearchProductImage = (record) => {
  if (!record) return null;

  // Prioridade de campos: imagem_principal > gallery[0] > image[0]/image > imagem_produto
  let filename = record.imagem_principal;
  if (!filename && Array.isArray(record.gallery) && record.gallery.length > 0) {
    filename = record.gallery[0];
  }
  if (!filename && record.image) {
    filename = Array.isArray(record.image) ? record.image[0] : record.image;
  }
  if (!filename && record.imagem_produto) {
    filename = Array.isArray(record.imagem_produto) ? record.imagem_produto[0] : record.imagem_produto;
  }

  if (!filename) return null;

  // Se já for URL absoluta (http, https, data:)
  if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
    return filename;
  }

  try {
    const target = typeof filename === 'string' ? filename.trim() : null;
    if (!target) return null;
    const getUrlFn = pb.files.getURL ? pb.files.getURL.bind(pb.files) : pb.files.getUrl.bind(pb.files);
    const rawUrl = getUrlFn(record, target);
    if (typeof window !== 'undefined' && rawUrl && !rawUrl.startsWith('http')) {
      return \`\${window.location.origin}\${rawUrl.startsWith('/') ? '' : '/'}\${rawUrl}\`;
    }
    return rawUrl;
  } catch (err) {
    console.error('[SearchModal] Erro ao obter URL da imagem:', err);
    return null;
  }
};
\`\`\`

2. Renderização no JSX do SearchModal:
\`\`\`jsx
<div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0 flex items-center justify-center">
  {imgUrl ? (
    <img 
      src={imgUrl} 
      alt={product.name || product.nome_produto || 'Produto Avante Lingerie'}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = 'https://placehold.co/100x100/1a1a1a/c59b5f?text=Avante';
      }}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
      <Tag className="w-6 h-6" />
    </div>
  )}
</div>
\`\`\`

3. Sanitização da query na busca do PocketBase:
Evitar que aspas duplas na digitação quebrem a string de filtro do PocketBase:
\`filter: \`name ~ "\${cleanQuery}" || categoria ~ "\${cleanQuery}"\`

Responda objetivamente:
1. A solução resolve a causa raiz e previne todas as falhas observadas?
2. Há risco de comprometer o sistema, backend, banco ou outras partes do site?
3. O código está APROVADO para implementação pela Ada?
`;

async function validateWithNemotron() {
  console.log('--- ENVIANDO AO PORTÃO NEMOTRON (VALIDAÇÃO DE CÓDIGO) ---');
  try {
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
  } catch (err) {
    console.error('Falha de rede ao conectar com Nemotron:', err.message);
  }
}

validateWithNemotron();
