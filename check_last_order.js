import pb from './apps/api/src/utils/pocketbaseClient.js';

async function checkLatestOrder() {
  try {
    const orders = await pb.collection('pedidos').getList(1, 1, {
      sort: '-created',
    });
    console.log("=== ÚLTIMO PEDIDO ===");
    console.log(JSON.stringify(orders.items[0], null, 2));
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
  }
}

checkLatestOrder();
