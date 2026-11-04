const dotenv = require('dotenv');
dotenv.config();

async function test() {
  const { default: pb } = await import('../apps/api/src/utils/pocketbaseClient.js');
  const now = new Date();
  console.log('Current Date in Node:', now.toISOString());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  const weekISO = monday.toISOString();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  firstDay.setHours(0, 0, 0, 0);
  const monthISO = firstDay.toISOString();

  console.log('Filters:', { todayISO, weekISO, monthISO });

  try {
    const spaceDate = monthISO.replace('T', ' ');
    console.log('Testing with spaceDate:', spaceDate);
    const pedidosMesSpace = await pb.collection('pedidos').getFullList({
      filter: `created >= "${spaceDate}"`,
    });
    console.log('pedidosMes with spaceDate count:', pedidosMesSpace.length);
  } catch (e) {
    console.error('pedidosMes spaceDate filter error:', e.message);
  }

  try {
    const pedidos = await pb.collection('pedidos').getFullList();
    console.log('Sample pedido keys:', Object.keys(pedidos[0]));
    console.log('Pedido 0:', JSON.stringify(pedidos[0], null, 2));
    if (pedidos[1]) {
      console.log('Pedido 1:', JSON.stringify(pedidos[1], null, 2));
    }
  } catch (e) {
    console.error('Error fetching pedidos:', e);
  }
}

test().catch(console.error);
