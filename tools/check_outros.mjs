import fs from 'fs';
const data = JSON.parse(fs.readFileSync('scratch/stats_desires_detailed.json', 'utf8'));

console.log('--- AMOSTRA DE OUTROS (58 registros) ---');
const subcategories = {
  saudacao_apenas: 0,
  duvida_rastreio_ou_frete: 0,
  curiosidade_preco_sem_especificar: 0,
  teste_interno: 0,
  abandono_inicio: 0
};

data.clients_outros.forEach((c) => {
  const msg = (c.clientMsgs || '').trim().toLowerCase();
  if (!msg || msg === 'oi' || msg === 'olá' || msg === 'ola' || msg === 'boa tarde' || msg === 'bom dia') {
    subcategories.saudacao_apenas++;
  } else if (/frete|entrega|correio|endereço|localizaç/i.test(msg)) {
    subcategories.duvida_rastreio_ou_frete++;
  } else if (/preço|quanto|tabela|catálogo|catalogo|valor/i.test(msg)) {
    subcategories.curiosidade_preco_sem_especificar++;
  } else if (/teste|admin|luiz/i.test(msg)) {
    subcategories.teste_interno++;
  } else {
    subcategories.abandono_inicio++;
  }
});

console.log('Subdivisão da categoria OUTROS:');
console.log(JSON.stringify(subcategories, null, 2));

console.log('\nPrimeiros 10 de OUTROS:');
data.clients_outros.slice(0, 10).forEach((c, idx) => {
  console.log(`${idx+1}. [${c.channel}] "${c.clientMsgs}"`);
});
