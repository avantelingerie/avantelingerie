const dotenv = require('dotenv');
dotenv.config();

async function runAudit() {
  const { default: pb } = await import('../apps/api/src/utils/pocketbaseClient.js');

  const now = new Date();
  console.log('--- Teste de Lógica Completa do Dashboard ---');
  console.log('Data atual:', now.toISOString());

  // Fetch all orders
  const pedidos = await pb.collection('pedidos').getFullList({
    sort: '-created',
    $autoCancel: false,
  });

  console.log(`Total de pedidos encontrados: ${pedidos.length}`);

  // Date ranges (considering local Brazil time UTC-3)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  
  // Start of week: Sunday or Monday? In Brazil, Sunday is day 0.
  // Monday of current week:
  const dayOfWeek = now.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - daysToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // Start of month:
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

  console.log('Início do Mês:', startOfMonth.toISOString());
  console.log('Início da Semana:', startOfWeek.toISOString());
  console.log('Início de Hoje:', startOfToday.toISOString());

  const pedidosValidos = pedidos.filter(p => p.status !== 'cancelado');
  const pedidosHoje = pedidosValidos.filter(p => new Date(p.created) >= startOfToday);
  const pedidosSemana = pedidosValidos.filter(p => new Date(p.created) >= startOfWeek);
  const pedidosMes = pedidosValidos.filter(p => new Date(p.created) >= startOfMonth);

  const receitaHoje = pedidosHoje.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);
  const receitaSemana = pedidosSemana.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);
  const receitaMes = pedidosMes.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);
  const receitaLiquidaMes = pedidosMes.reduce((sum, p) => sum + ((Number(p.valor_total) || 0) - (Number(p.valor_frete) || 0)), 0);
  const ticketMedio = pedidosMes.length > 0 ? receitaMes / pedidosMes.length : 0;

  // Clientes novos vs recorrentes no mês
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

  const aguardandoAcao = pedidos.filter(p => ['pendente', 'processando'].includes(p.status?.toLowerCase())).length;

  console.log('\n--- KPIs CALCULADOS ---');
  console.log({
    pedidos_hoje: pedidosHoje.length,
    pedidos_semana: pedidosSemana.length,
    pedidos_mes: pedidosMes.length,
    receita_hoje: receitaHoje,
    receita_semana: receitaSemana,
    receita_mes: receitaMes,
    receita_liquida_mes: receitaLiquidaMes,
    ticket_medio: ticketMedio,
    clientes_novos: clientesNovos,
    clientes_recorrentes: clientesRecorrentes,
    aguardando_acao: aguardandoAcao,
  });

  // Test Vendas por Dia (Últimos 30 dias)
  const vendasPorDia = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    const startD = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
    const endD = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

    const pDoDia = pedidosValidos.filter(p => {
      const pDate = new Date(p.created);
      return pDate >= startD && pDate <= endD;
    });

    const valorDia = pDoDia.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);

    vendasPorDia.push({
      dia: dayStr,
      pedidos: pDoDia.length,
      quantidade: pDoDia.length,
      receita: Number(valorDia.toFixed(2)),
    });
  }

  const diasComVenda = vendasPorDia.filter(v => v.pedidos > 0);
  console.log(`\n--- VENDAS POR DIA (30 dias) ---`);
  console.log(`Total dias gerados: ${vendasPorDia.length}, Dias com venda: ${diasComVenda.length}`);
  console.log('Dias com venda:', diasComVenda);

  // Test Receita por Semana (Últimas 8 semanas)
  const receitaSemanas = [];
  for (let w = 7; w >= 0; w--) {
    const endW = new Date(now);
    endW.setDate(endW.getDate() - (w * 7));
    const startW = new Date(endW);
    startW.setDate(startW.getDate() - 6);
    startW.setHours(0, 0, 0, 0);
    endW.setHours(23, 59, 59, 999);

    const startStr = `${String(startW.getDate()).padStart(2, '0')}/${String(startW.getMonth() + 1).padStart(2, '0')}`;
    const endStr = `${String(endW.getDate()).padStart(2, '0')}/${String(endW.getMonth() + 1).padStart(2, '0')}`;
    const semanaLabel = `${startStr} a ${endStr}`;

    const pSemana = pedidosValidos.filter(p => {
      const pDate = new Date(p.created);
      return pDate >= startW && pDate <= endW;
    });

    const valSemana = pSemana.reduce((sum, p) => sum + (Number(p.valor_total) || 0), 0);

    receitaSemanas.push({
      semana: semanaLabel,
      receita: Number(valSemana.toFixed(2)),
      pedidos: pSemana.length,
    });
  }

  const semanasComReceita = receitaSemanas.filter(s => s.receita > 0);
  console.log(`\n--- RECEITA POR SEMANA (8 semanas) ---`);
  console.log(`Total semanas: ${receitaSemanas.length}, Semanas com receita: ${semanasComReceita.length}`);
  console.log('Semanas com receita:', semanasComReceita);

  // Test Top Produtos Mais Vendidos
  const produtosVendidos = {};
  pedidosValidos.forEach(p => {
    if (p.itens && Array.isArray(p.itens)) {
      p.itens.forEach(item => {
        const nome = (item.nome || 'Produto sem nome').trim();
        // Truncate name if too long for chart label
        const nomeCurto = nome.length > 25 ? nome.slice(0, 23) + '...' : nome;
        if (!produtosVendidos[nomeCurto]) {
          produtosVendidos[nomeCurto] = {
            nome: nomeCurto,
            nomeCompleto: nome,
            quantidade: 0,
            receita: 0,
          };
        }
        produtosVendidos[nomeCurto].quantidade += Number(item.quantidade) || 1;
        produtosVendidos[nomeCurto].receita += (Number(item.preco_unitario) || Number(item.preco) || 0) * (Number(item.quantidade) || 1);
      });
    }
  });

  const topProdutos = Object.values(produtosVendidos)
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 5);

  console.log(`\n--- TOP PRODUTOS MAIS VENDIDOS ---`);
  console.log(topProdutos);
}

runAudit().catch(console.error);

