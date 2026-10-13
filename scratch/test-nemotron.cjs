const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave não encontrada');
  process.exit(1);
}
const apiKey = match[1].trim();

const models = [
  'nvidia/nemotron-3-super-120b-a12b:free',
  'nvidia/nemotron-3.5-lightning:free',
  'nvidia/nemotron-3-ultra-550b-a55b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free'
];

async function testModels() {
  for (const model of models) {
    const start = Date.now();
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: 'Diga apenas: OK' }]
        }),
        signal: AbortSignal.timeout(10000)
      });
      const duration = Date.now() - start;
      if (!res.ok) {
        const text = await res.text();
        console.log(`[${model}] ERRO HTTP ${res.status} (${duration}ms):`, text.slice(0, 150));
      } else {
        const data = await res.json();
        console.log(`[${model}] SUCESSO (${duration}ms):`, data.choices?.[0]?.message?.content);
      }
    } catch (err) {
      console.log(`[${model}] FALHA (${Date.now() - start}ms):`, err.message);
    }
  }
}

testModels();
