const dotenv = require('dotenv');
dotenv.config();

async function testRoutes() {
  const { default: router } = await import('../apps/api/src/routes/dashboard.js');
  console.log('Router imported successfully!');

  // Mock req and res helper
  const callRoute = (path, query = {}) => new Promise((resolve, reject) => {
    const route = router.stack.find(s => s.route && s.route.path === path && s.route.methods.get);
    if (!route) return reject(new Error(`Route ${path} not found`));

    const req = { query };
    const res = {
      json: (data) => resolve({ status: 200, data }),
      status: (code) => ({
        json: (data) => resolve({ status: code, data }),
      }),
    };

    route.route.stack[0].handle(req, res).catch(reject);
  });

  console.log('\n--- Testando GET /kpis ---');
  const kpis = await callRoute('/kpis');
  console.log(kpis.data);

  console.log('\n--- Testando GET /vendas-por-dia ---');
  const vendas = await callRoute('/vendas-por-dia', { dias: 30 });
  console.log(`Recebidos ${vendas.data.length} dias.`);
  console.log('Dias com venda:', vendas.data.filter(d => d.pedidos > 0));

  console.log('\n--- Testando GET /receita-por-semana ---');
  const receita = await callRoute('/receita-por-semana', { semanas: 8 });
  console.log(`Recebidas ${receita.data.length} semanas.`);
  console.log('Semanas com receita:', receita.data.filter(s => s.receita > 0));

  console.log('\n--- Testando GET /produtos-mais-vendidos ---');
  const produtos = await callRoute('/produtos-mais-vendidos', { limite: 5 });
  console.log(produtos.data);

  console.log('\n--- Testando GET /ultimos-pedidos ---');
  const ultimos = await callRoute('/ultimos-pedidos', { limite: 5 });
  console.log(ultimos.data);

  console.log('\n--- Testando GET /pedidos-aguardando ---');
  const aguardando = await callRoute('/pedidos-aguardando');
  console.log(aguardando.data);
}

testRoutes().catch(console.error);

