import pbClient from '../apps/api/src/utils/pocketbaseClient.js';

async function testTrackLogic(cleanCode) {
  try {
    const orderSearch = await pbClient.collection('pedidos').getFullList({
      filter: `numero_pedido = "${cleanCode}" || id = "${cleanCode}" || rastreamento = "${cleanCode}"`,
      requestKey: null
    });
    console.log('Resultados encontrados no banco:', orderSearch.length);
    if (orderSearch.length > 0) {
      const orderRecord = orderSearch[0];
      console.log('Pedido encontrado:', {
        numero_pedido: orderRecord.numero_pedido,
        status: orderRecord.status,
        rastreamento: orderRecord.rastreamento,
        cidade: orderRecord.cidade,
        estado: orderRecord.estado
      });
    }
  } catch (err) {
    console.error('Erro na query de rastreio:', err.message, err.data);
  }
}

testTrackLogic('888031017960740');
testTrackLogic('PED-003');

