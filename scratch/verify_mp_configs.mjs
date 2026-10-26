import PocketBase from 'pocketbase';

const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

async function test() {
  try {
    const configs = await pb.collection('integracoes_config').getFullList({ filter: 'servico = "mercadopago"' });
    console.log('Configs gravadas no PocketBase:');
    for (const c of configs) {
      const masked = c.chave_valor ? c.chave_valor.slice(0, 8) + '...' + c.chave_valor.slice(-4) : '(vazio)';
      console.log(`- ${c.chave_nome}: ${masked}`);
    }
  } catch (err) {
    console.error('Erro ao ler configs:', err.message);
  }
}

test();
