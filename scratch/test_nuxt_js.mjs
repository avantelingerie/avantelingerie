import axios from 'axios';

async function checkNuxtJs() {
  const jsUrl = 'https://static-web-melhor-rastreio-web.melhorrastreio.com.br/_nuxt/Cso9ZjsC.js';
  const res = await axios.get(jsUrl);
  const text = res.data;
  console.log('JS length:', text.length);

  // Search for Authorization or bearer or token or api or graphql
  const matches = text.match(/.{0,50}(?:findParcel|Bearer|graphql|api\.melhorrastreio|Authorization).{0,50}/g) || [];
  console.log('Matches found:', matches.length);
  matches.slice(0, 15).forEach((m, idx) => console.log(`${idx}: ${m}`));
}

checkNuxtJs();

