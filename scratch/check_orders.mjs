import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function main() {
  try {
    const orders = await pb.collection('pedidos').getList(1, 20, { sort: '-created' });
    console.log('Total orders:', orders.totalItems);
    for (const o of orders.items) {
      console.log(`[${o.created}] ID: ${o.id} | Total: R$ ${o.total || o.valor_total} | Status: ${o.status} | Metodo: ${o.metodo_pagamento || o.forma_pagamento} | Cliente: ${o.nome_cliente || o.cliente_nome || o.expand?.usuario?.nome || 'N/A'}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
