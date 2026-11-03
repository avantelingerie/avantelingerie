const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
const apiKey = match[1].trim();

async function checkOpenRouterModels() {
  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  const data = await res.json();
  const freeModels = data.data.filter(m => m.id.includes(':free') || m.id.includes('nemotron'));
  console.log('Available matching models:');
  freeModels.forEach(m => console.log(m.id));
}

checkOpenRouterModels();

