import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Helper function to get today's date at 00:00:00 in ISO format
const getTodayISO = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
};

// Helper function to get Monday of current week at 00:00:00 in ISO format
const getMondayOfWeekISO = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
};

// Helper function to get first day of current month at 00:00:00 in ISO format
const getFirstDayOfMonthISO = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  firstDay.setHours(0, 0, 0, 0);
  return firstDay.toISOString();
};

// GET /dashboard/kpis - Fetch key performance indicators
router.get('/kpis', async (req, res) => {
  const todayISO = getTodayISO();
  const weekISO = getMondayOfWeekISO();
  const monthISO = getFirstDayOfMonthISO();

  // Total orders today
  const pedidosHoje = await pb.collection('pedidos').getFullList({
    filter: `created >= "${todayISO}"`,
  });

  // Total orders this week
  const pedidosSemana = await pb.collection('pedidos').getFullList({
    filter: `created >= "${weekISO}"`,
  });

  // Total orders this month
  const pedidosMes = await pb.collection('pedidos').getFullList({
    filter: `created >= "${monthISO}"`,
  });

  // Calculate total revenue today
  const receitaHoje = pedidosHoje.reduce((sum, pedido) => sum + (pedido.valor_total || 0), 0);

  // Calculate total revenue this week
  const receitaSemana = pedidosSemana.reduce((sum, pedido) => sum + (pedido.valor_total || 0), 0);

  // Calculate total revenue this month
  const receitaMes = pedidosMes.reduce((sum, pedido) => sum + (pedido.valor_total || 0), 0);

  // Total users
  const usuarios = await pb.collection('usuarios').getFullList();

  // Total products in stock
  const variacoes = await pb.collection('variacoes').getFullList();
  const totalEstoque = variacoes.reduce((sum, variacao) => sum + (variacao.estoque || 0), 0);

  res.json({
    pedidos_hoje: pedidosHoje.length,
    pedidos_semana: pedidosSemana.length,
    pedidos_mes: pedidosMes.length,
    receita_hoje: receitaHoje,
    receita_semana: receitaSemana,
    receita_mes: receitaMes,
    total_usuarios: usuarios.length,
    total_estoque: totalEstoque,
  });
});

// GET /dashboard/vendas-por-dia - Fetch sales count by day for the current week
router.get('/vendas-por-dia', async (req, res) => {
  const weekISO = getMondayOfWeekISO();

  const pedidosSemana = await pb.collection('pedidos').getFullList({
    filter: `created >= "${weekISO}"`,
  });

  // Group by day of week
  const vendidosPorDia = {
    segunda: 0,
    terca: 0,
    quarta: 0,
    quinta: 0,
    sexta: 0,
    sabado: 0,
    domingo: 0,
  };

  const diasMap = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

  pedidosSemana.forEach((pedido) => {
    const date = new Date(pedido.created);
    const dayOfWeek = date.getDay();
    const diaName = diasMap[dayOfWeek];
    vendidosPorDia[diaName]++;
  });

  res.json(vendidosPorDia);
});

// GET /dashboard/receita-por-semana - Fetch revenue by week for the current month
router.get('/receita-por-semana', async (req, res) => {
  const monthISO = getFirstDayOfMonthISO();

  const pedidosMes = await pb.collection('pedidos').getFullList({
    filter: `created >= "${monthISO}"`,
  });

  // Group by week number
  const receitaPorSemana = {};

  pedidosMes.forEach((pedido) => {
    const date = new Date(pedido.created);
    const weekNumber = Math.ceil((date.getDate() + new Date(date.getFullYear(), date.getMonth(), 1).getDay()) / 7);
    const semanaKey = `semana_${weekNumber}`;

    if (!receitaPorSemana[semanaKey]) {
      receitaPorSemana[semanaKey] = 0;
    }
    receitaPorSemana[semanaKey] += pedido.valor_total || 0;
  });

  res.json(receitaPorSemana);
});

// GET /dashboard/produtos-mais-vendidos - Fetch top 10 best-selling products
router.get('/produtos-mais-vendidos', async (req, res) => {
  const pedidos = await pb.collection('pedidos').getFullList();

  // Aggregate product sales
  const produtosVendidos = {};

  pedidos.forEach((pedido) => {
    if (pedido.itens && Array.isArray(pedido.itens)) {
      pedido.itens.forEach((item) => {
        const variacaoId = item.variacao_id;
        if (!produtosVendidos[variacaoId]) {
          produtosVendidos[variacaoId] = {
            variacao_id: variacaoId,
            quantidade_vendida: 0,
            receita_total: 0,
          };
        }
        produtosVendidos[variacaoId].quantidade_vendida += item.quantidade || 0;
        produtosVendidos[variacaoId].receita_total += (item.preco_unitario || 0) * (item.quantidade || 0);
      });
    }
  });

  // Sort by quantity sold and get top 10
  const topProdutos = Object.values(produtosVendidos)
    .sort((a, b) => b.quantidade_vendida - a.quantidade_vendida)
    .slice(0, 10);

  res.json(topProdutos);
});

// GET /dashboard/ultimos-pedidos - Fetch last 10 orders
router.get('/ultimos-pedidos', async (req, res) => {
  const pedidos = await pb.collection('pedidos').getFullList({
    sort: '-created',
    limit: 10,
  });

  const pedidosFormatados = pedidos.map((pedido) => ({
    id: pedido.id,
    numero_pedido: pedido.numero_pedido,
    cliente_nome: pedido.cliente_nome,
    valor_total: pedido.valor_total,
    status: pedido.status,
    created: pedido.created,
  }));

  res.json(pedidosFormatados);
});

// GET /dashboard/estoque-critico - Fetch products with critical stock levels (< 5 units)
router.get('/estoque-critico', async (req, res) => {
  const variacoes = await pb.collection('variacoes').getFullList({
    expand: 'produto_id',
  });

  const estoqueCritico = variacoes
    .filter((variacao) => (variacao.estoque || 0) < 5)
    .map((variacao) => ({
      id: variacao.id,
      sku: variacao.sku,
      nome: variacao.expand?.produto_id?.nome || `${variacao.cor || ''} ${variacao.tamanho || ''}`.trim() || variacao.sku,
      estoque: variacao.estoque,
      produto_id: variacao.produto_id,
    }));

  res.json(estoqueCritico);
});

// GET /dashboard/pedidos-aguardando - Fetch orders awaiting processing (status: pendente or processando)
router.get('/pedidos-aguardando', async (req, res) => {
  const pedidosPendentes = await pb.collection('pedidos').getFullList({
    filter: 'status = "pendente" || status = "processando"',
    sort: 'created',
  });

  const pedidosFormatados = pedidosPendentes.map((pedido) => ({
    id: pedido.id,
    numero_pedido: pedido.numero_pedido,
    cliente_nome: pedido.cliente_nome,
    valor_total: pedido.valor_total,
    status: pedido.status,
    created: pedido.created,
    itens_count: pedido.itens ? pedido.itens.length : 0,
  }));

  res.json(pedidosFormatados);
});

export default router;