import pbClient from '../apps/api/src/utils/pocketbaseClient.js';

async function run() {
  try {
    const testF = await pbClient.collection('pedidos').getFullList({
      filter: 'numero_pedido = "PED-003" || id = "PED-003" || rastreamento = "PED-003"',
      requestKey: null
    });
    console.log('Filtro com rastreamento funcionou! Retornou:', testF.length, testF[0]?.numero_pedido);
  } catch (err) {
    console.error('Erro:', err.message);
  }
}

run();
