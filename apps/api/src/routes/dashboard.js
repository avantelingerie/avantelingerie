import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Helper to safely parse dates and compare in local/UTC
const getStartOfDay = (date = new Date()) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Start of current week (Domingo como dia 0 no calendário comercial brasileiro)
const getStartOfWeek = (date = new Date()) => {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay()); // Volta para o domingo mais recente
  d.setHours(0, 0, 0, 0);
  return d;
};

// Start of current month
const getStartOfMonth = (date = new Date()) => {
  const d = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  return d;
};

// GET /dashboard/kpis - Fetch key performance indicators
router.get('/kpis', async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = getStartOfDay(now);
    const startOfWeek = getStartOfWeek(now);
    const startOfMonth = getStartOfMonth(now);
    
    // Also consider 7-day rolling window for weekly resilience
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch all orders sorted by creation date
    const pedidos = await pb.collection('pedidos').getFullList({
      sort: '-created',
      $autoCancel: false,
    }).catch(err => {
      logger.error('Erro ao buscar pedidos para KPIs:', err);
      return [];
    });

    // Separate valid (non-canceled) orders for revenue and ticket calculation
    const pedidosValidos = pedidos.filter(p => p.status?.toLowerCase() !== 'cancelado');

    // Filtering by dates using native JavaScript Date timestamps (100% immune to SQLite string format divergence)
    const pedidosHoje = pedidosValidos.filter(p => new Date(p.created) >= startOfToday);
    
    // Pedidos da semana: considera a semana atual (desde domingo) ou janela de 7 dias
    const pedidosSemana = pedidosValidos.filter(p => {
      const pDate = new Date(p.created);
      return pDate >= startOfWeek || pDate >= sevenDaysAgo;
    });

    const pedidosMes = pedidosValidos.filter(p => new Date(p.created) >= startOfMonth);

    // Revenue calculations (excluding canceled orders)
    const receitaHoje = pedidosHoje.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);
    const receitaSemana = pedidosSemana.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);
    const receitaMes = pedidosMes.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);

    // Receita líquida do mês (descontando frete)
    const receitaLiquidaMes = pedidosMes.reduce((sum, p) => {
      const total = Number(p.valor_total) || 0;
      const frete = Number(p.valor_frete) || 0;
      return sum + Math.max(0, total - frete);
    }, 0);

    // Ticket Médio no Mês
    const ticketMedio = pedidosMes.length > 0 ? (receitaMes / pedidosMes.length) : 0;

    // Clientes Novos vs Recorrentes no mês
    const clientesNoMes = new Set(pedidosMes.map(p => p.cliente_id || p.cliente_email || p.cliente_nome).filter(Boolean));
    let clientesNovos = 0;
    let clientesRecorrentes = 0;

    for (const clienteKey of clientesNoMes) {
      const pedidosAnteriores = pedidosValidos.filter(p => {
        const pKey = p.cliente_id || p.cliente_email || p.cliente_nome;
        return pKey === clienteKey && new Date(p.created) < startOfMonth;
      });
      if (pedidosAnteriores.length > 0) {
        clientesRecorrentes++;
      } else {
        clientesNovos++;
      }
    }

    // Pedidos aguardando ação (pendente ou processando)
    const aguardandoAcao = pedidos.filter(p => ['pendente', 'processando'].includes(p.status?.toLowerCase())).length;

    // Total de usuários cadastrados
    const usuarios = await pb.collection('usuarios').getFullList({ $autoCancel: false }).catch(() => []);

    // Total de produtos em estoque
    const variacoes = await pb.collection('variacoes').getFullList({ $autoCancel: false }).catch(() => []);
    const totalEstoque = variacoes.reduce((sum, v) => sum + (v.estoque || 0), 0);

    res.json({
      pedidos_hoje: pedidosHoje.length,
      pedidos_semana: pedidosSemana.length,
      pedidos_mes: pedidosMes.length,
      receita_hoje: Number(receitaHoje.toFixed(2)),
      receita_semana: Number(receitaSemana.toFixed(2)),
      receita_mes: Number(receitaMes.toFixed(2)),
      receita_liquida_mes: Number(receitaLiquidaMes.toFixed(2)),
      ticket_medio: Number(ticketMedio.toFixed(2)),
      clientes_novos: clientesNovos,
      clientes_recorrentes: clientesRecorrentes,
      aguardando_acao: aguardandoAcao,
      total_usuarios: usuarios.length,
      total_estoque: totalEstoque,
    });
  } catch (error) {
    logger.error('Erro geral ao processar KPIs do dashboard:', error);
    res.status(500).json({ erro: 'Falha ao processar KPIs' });
  }
});

// GET /dashboard/vendas-por-dia - Fetch sales count and revenue by day for the last N days (default 30)
router.get('/vendas-por-dia', async (req, res) => {
  try {
    const dias = parseInt(req.query.dias) || 30;
    const now = new Date();

    const pedidos = await pb.collection('pedidos').getFullList({
      sort: '-created',
      $autoCancel: false,
    }).catch(err => {
      logger.error('Erro ao buscar pedidos para vendas por dia:', err);
      return [];
    });

    const pedidosValidos = pedidos.filter(p => p.status?.toLowerCase() !== 'cancelado');

    const vendasPorDia = [];
    for (let i = dias - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayStr = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      const startD = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
      const endD = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

      const pedidosDoDia = pedidosValidos.filter(p => {
        const pDate = new Date(p.created);
        return pDate >= startD && pDate <= endD;
      });

      const receitaDia = pedidosDoDia.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);

      vendasPorDia.push({
        dia: dayStr,
        data: d.toISOString().split('T')[0],
        pedidos: pedidosDoDia.length,
        quantidade: pedidosDoDia.length,
        receita: Number(receitaDia.toFixed(2)),
      });
    }

    res.json(vendasPorDia);
  } catch (error) {
    logger.error('Erro ao gerar vendas por dia:', error);
    res.status(500).json({ erro: 'Falha ao gerar vendas por dia' });
  }
});

// GET /dashboard/receita-por-semana - Fetch revenue by week for the last N weeks (default 8)
router.get('/receita-por-semana', async (req, res) => {
  try {
    const semanas = parseInt(req.query.semanas) || 8;
    const now = new Date();

    const pedidos = await pb.collection('pedidos').getFullList({
      sort: '-created',
      $autoCancel: false,
    }).catch(err => {
      logger.error('Erro ao buscar pedidos para receita por semana:', err);
      return [];
    });

    const pedidosValidos = pedidos.filter(p => p.status?.toLowerCase() !== 'cancelado');

    const receitaSemanas = [];
    for (let w = semanas - 1; w >= 0; w--) {
      const endW = new Date(now);
      endW.setDate(endW.getDate() - (w * 7));
      const startW = new Date(endW);
      startW.setDate(startW.getDate() - 6);
      startW.setHours(0, 0, 0, 0);
      endW.setHours(23, 59, 59, 999);

      const startStr = `${String(startW.getDate()).padStart(2, '0')}/${String(startW.getMonth() + 1).padStart(2, '0')}`;
      const endStr = `${String(endW.getDate()).padStart(2, '0')}/${String(endW.getMonth() + 1).padStart(2, '0')}`;
      const semanaLabel = `${startStr} a ${endStr}`;

      const pedidosSemana = pedidosValidos.filter(p => {
        const pDate = new Date(p.created);
        return pDate >= startW && pDate <= endW;
      });

      const receitaSemana = pedidosSemana.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);

      receitaSemanas.push({
        semana: semanaLabel,
        receita: Number(receitaSemana.toFixed(2)),
        pedidos: pedidosSemana.length,
      });
    }

    res.json(receitaSemanas);
  } catch (error) {
    logger.error('Erro ao gerar receita por semana:', error);
    res.status(500).json({ erro: 'Falha ao gerar receita por semana' });
  }
});

// GET /dashboard/produtos-mais-vendidos - Fetch top N best-selling products (default 5)
router.get('/produtos-mais-vendidos', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 5;

    const pedidos = await pb.collection('pedidos').getFullList({
      sort: '-created',
      $autoCancel: false,
    }).catch(err => {
      logger.error('Erro ao buscar produtos mais vendidos:', err);
      return [];
    });

    const pedidosValidos = pedidos.filter(p => p.status?.toLowerCase() !== 'cancelado');

    const produtosVendidos = {};
    pedidosValidos.forEach(p => {
      if (p.itens && Array.isArray(p.itens)) {
        p.itens.forEach(item => {
          const nomeCompleto = (item.nome || 'Produto').trim();
          const nomeExibicao = nomeCompleto.length > 25 ? nomeCompleto.slice(0, 23) + '...' : nomeCompleto;

          if (!produtosVendidos[nomeExibicao]) {
            produtosVendidos[nomeExibicao] = {
              nome: nomeExibicao,
              nomeCompleto,
              quantidade: 0,
              receita: 0,
            };
          }
          produtosVendidos[nomeExibicao].quantidade += Number(item.quantidade) || 1;
          produtosVendidos[nomeExibicao].receita += (Number(item.preco_unitario) || Number(item.preco) || 0) * (Number(item.quantidade) || 1);
        });
      }
    });

    const topProdutos = Object.values(produtosVendidos)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, limite);

    res.json(topProdutos);
  } catch (error) {
    logger.error('Erro ao gerar produtos mais vendidos:', error);
    res.status(500).json({ erro: 'Falha ao gerar produtos mais vendidos' });
  }
});

// GET /dashboard/ultimos-pedidos - Fetch last orders
router.get('/ultimos-pedidos', async (req, res) => {
  try {
    const limite = parseInt(req.query.limite) || 5;
    const pedidos = await pb.collection('pedidos').getFullList({
      sort: '-created',
      limit: limite,
      $autoCancel: false,
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
  } catch (error) {
    logger.error('Erro ao buscar últimos pedidos:', error);
    res.status(500).json({ erro: 'Falha ao buscar últimos pedidos' });
  }
});

// GET /dashboard/estoque-critico - Fetch products with critical stock levels (<= limite_alerta_global)
router.get('/estoque-critico', async (req, res) => {
  try {
    const configs = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
    const limiteAlerta = (configs.length > 0 && configs[0].limite_alerta_global != null)
      ? Number(configs[0].limite_alerta_global)
      : 10;

    const variacoes = await pb.collection('variacoes').getFullList({
      expand: 'produto_id',
      $autoCancel: false,
    });

    const estoqueCritico = variacoes
      .filter((variacao) => (variacao.estoque ?? 0) <= limiteAlerta)
      .map((variacao) => {
        const prod = variacao.expand?.produto_id;
        const prodNome = prod?.nome_produto || prod?.nome || prod?.name || 'Produto';
        return {
          id: variacao.id,
          sku: variacao.sku,
          nome: prodNome,
          produto_nome: prodNome,
          cor: variacao.cor || '',
          tamanho: variacao.tamanho || '',
          estoque: variacao.estoque ?? 0,
          produto_id: variacao.produto_id,
        };
      });

    res.json(estoqueCritico);
  } catch (error) {
    logger.error('Erro ao buscar estoque crítico para o dashboard:', error);
    res.status(500).json({ erro: 'Falha ao buscar estoque crítico' });
  }
});

// GET /dashboard/pedidos-aguardando - Fetch orders awaiting processing (status: pendente or processando)
router.get('/pedidos-aguardando', async (req, res) => {
  try {
    const pedidosPendentes = await pb.collection('pedidos').getFullList({
      filter: 'status = "pendente" || status = "processando"',
      sort: 'created',
      $autoCancel: false,
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
  } catch (error) {
    logger.error('Erro ao buscar pedidos aguardando ação:', error);
    res.status(500).json({ erro: 'Falha ao buscar pedidos aguardando ação' });
  }
});

export default router;
