const fs = require('fs');

const envContent = fs.readFileSync('.env', 'utf8');
const match = envContent.match(/OPENROUTER_API_KEY=(.+)/);
if (!match) {
  console.log('Chave OpenRouter não encontrada no .env');
  process.exit(1);
}
const apiKey = match[1].trim();

const prompt = `Você é o Nemotron, copiloto de arquitetura e auditor lógico sênior da Avante Lingerie (AGENTS.md).
A Ada (Líder Técnica e Arquiteta) elaborou uma solução cirúrgica e estrutural para o Dashboard Administrativo da loja (Painel Admin > Dashboard / Visão Geral), em estrita observância à PRIMEIRA REGRA DE OURO da loja.

CONTEXTO E DIAGNÓSTICO:
1. O lojista realizou duas vendas de teste (PED-002 do cliente Dooner no valor de R$ 73,99 em 29/10/2026, status 'pendente'; e PED-003 da cliente Ísis Santos no valor de R$ 127,77 em 01/11/2026, status 'enviado').
2. Ambas as vendas aparecem perfeitamente na página 'Pedidos' e nas tabelas inferiores do Dashboard ('Últimos Pedidos' e 'Aguardando Ação').
3. Contudo, todos os cards de métricas no topo do Dashboard ('Pedidos Hoje', 'Pedidos Semana', 'Pedidos Mês', 'Receita Total Mês', 'Receita Líquida Mês', 'Ticket Médio Mês', 'Clientes Novos Mês', 'Clientes Recorrentes Mês', 'Pedidos Aguardando Ação') exibem 0 ou R$ 0,00!
4. Além disso, todos os gráficos ('Vendas por Dia (Últimos 30 dias)', 'Receita por Semana (Últimas 8 semanas)', 'Top 5 Produtos Mais Vendidos') exibem a mensagem "Sem dados suficientes para o período."
5. E o usuário apontou: "Não parece que estar dinâmico", pois não há atualização automática nem botão de atualizar quando novas vendas entram.

CAUSAS RAIZ CONFIRMADAS NO CÓDIGO E NO BANCO:
- Causa 1 (Bug de Comparação de String de Data no SQLite):
  O PocketBase grava o campo 'created' no SQLite como "YYYY-MM-DD HH:mm:ss.sssZ" (com espaço). O endpoint /dashboard/kpis fazia 'filter: created >= todayISO', gerando '2026-11-01T03:00:00.000Z' (com 'T'). Em comparação lexicográfica de texto, o caractere espaço (ASCII 32) é menor que 'T' (ASCII 84). Portanto, "2026-11-01 21:08:20" >= "2026-11-01T..." avaliava para FALSO no SQLite! Nenhum pedido de novembro era capturado na query!
- Causa 2 (Campos Omitidos pelo Backend em /dashboard/kpis):
  O componente frontend KPIsSection.jsx espera os campos: 'pedidos_hoje', 'pedidos_semana', 'pedidos_mes', 'receita_mes', 'receita_liquida_mes', 'ticket_medio', 'clientes_novos', 'clientes_recorrentes' e 'aguardando_acao'. O backend retornava apenas pedidos_hoje, pedidos_semana, pedidos_mes, receita_hoje, receita_semana, receita_mes, total_usuarios e total_estoque. Campos cruciais nunca eram calculados nem enviados.
- Causa 3 (Incompatibilidade de Formato nos Gráficos):
  - /vendas-por-dia: O frontend Recharts espera um array de objetos [{ dia: '01/11', pedidos: 1 }, ...]. O backend retornava um objeto associativo { segunda: 0, terca: 0, ... } e ignorava o parâmetro '?dias=30'. O frontend verificava 'Array.isArray(data)' que retornava false e caía no fallback de array vazio [].
  - /receita-por-semana: O frontend Recharts espera um array [{ semana: 'Sem 44', receita: 127.77 }, ...]. O backend retornava um objeto { semana_1: 0, ... }.
  - /produtos-mais-vendidos: O frontend espera [{ nome, quantidade, receita }, ...]. O backend retornava objetos com { variacao_id, quantidade_vendida, receita_total } sem campo 'nome' e agrupados por variação, e não por produto.
- Causa 4 (Ausência de Reatividade e Realtime no Dashboard):
  O DashboardPage.jsx e suas seções executavam fetch apenas no mount inicial. Não havia botão manual de 'Atualizar', nem polling em background, nem inscrição no PocketBase Realtime (pb.collection('pedidos').subscribe('*')).

SOLUÇÃO CIRÚRGICA PROPOSTA PELA ADA:
1. BACKEND API (apps/api/src/routes/dashboard.js):
   - /dashboard/kpis:
     - Buscar pedidos com 'sort: -created' e agrupar no JavaScript utilizando instâncias de Date nativas, eliminando 100% de qualquer risco de divergência de string ou timezone no SQLite.
     - Calcular todas as métricas esperadas pelo frontend: pedidos_hoje, pedidos_semana (considerando a semana atual no fuso brasileiro e/ou últimos 7 dias), pedidos_mes, receita_hoje, receita_semana, receita_mes, receita_liquida_mes (excluindo frete), ticket_medio (receita / pedidos), clientes_novos (clientes com 1º pedido no mês), clientes_recorrentes, aguardando_acao (pedidos com status 'pendente' ou 'processando'), total_usuarios e total_estoque.
     - Desconsiderar pedidos com status 'cancelado' nos cálculos de receita e ticket.
     - Envolver todas as rotas com try/catch e logs de auditoria.
   - /dashboard/vendas-por-dia:
     - Gerar array cronológico dos últimos N dias (padrão 30) no formato [{ dia: 'DD/MM', data: 'YYYY-MM-DD', pedidos: N, quantidade: N, receita: V }], compatível direto com Recharts.
   - /dashboard/receita-por-semana:
     - Gerar array cronológico das últimas N semanas (padrão 8) no formato [{ semana: 'DD/MM a DD/MM', receita: V, pedidos: N }].
   - /dashboard/produtos-mais-vendidos:
     - Extrair e consolidar itens dos pedidos válidos por nome de produto: [{ nome: '...', nomeCompleto: '...', quantidade: N, receita: V }], ordenado por quantidade decrescente, limitado ao top 5.
   - Manter /ultimos-pedidos, /estoque-critico e /pedidos-aguardando totalmente compatíveis com try/catch e tratamento de erros.

2. FRONTEND (apps/web/src/pages/admin/DashboardPage.jsx, KPIsSection.jsx, GraficosSection.jsx, ListasRapidasSection.jsx):
   - Adicionar botão de "Atualizar" no cabeçalho de Visão Geral com ícone giratório e feedback de carregamento.
   - Adicionar inscrição em tempo real: 'pb.collection("pedidos").subscribe("*", ...)' para atualizar os dados instantaneamente quando qualquer venda for gerada ou status for alterado.
   - Adicionar polling silencioso de contingência a cada 60s.
   - Passar 'refreshKey' para as seções filhas para orquestrar atualização simultânea de KPIs, gráficos e tabelas.

AUDITORIA SOLICITADA AO NEMOTRON:
1. A lógica matemática de agregação e a resolução do bug de data no SQLite/PocketBase são seguras, precisas e performáticas?
2. A estrutura de dados fornecida para os gráficos do Recharts resolve completamente o erro de "Sem dados suficientes para o período"?
3. A implementação do Realtime do PocketBase + Polling de Contingência de 60s traz risco de memory leak ou saturação da API? Como garantir cleanup adequado?
4. Há algum impacto adverso em checkout, pedidos existentes ou integridade do sistema?
5. Você aprova formalmente esta implementação para ser aplicada pela Ada?`;

async function main() {
  console.log('Enviando solicitação de auditoria para o Nemotron via OpenRouter...');
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://avantelingerie.com.br',
        'X-Title': 'Avante Lingerie Ada-Nemotron Audit'
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-4-340b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro na resposta do OpenRouter:', response.status, errText);
      // Fallback to another nemotron or llama model if 340b not available
      const fallbackResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://avantelingerie.com.br',
          'X-Title': 'Avante Lingerie Ada-Nemotron Audit'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2
        })
      });
      const data = await fallbackResp.json();
      console.log('\n--- PARECER DE AUDITORIA (Fallback Llama 3.3 70B) ---\n');
      console.log(data.choices[0].message.content);
      fs.writeFileSync('scratch/nemotron_audit_dashboard.txt', data.choices[0].message.content);
      return;
    }

    const data = await response.json();
    console.log('\n--- PARECER DE AUDITORIA DO NEMOTRON ---\n');
    console.log(data.choices[0].message.content);
    fs.writeFileSync('scratch/nemotron_audit_dashboard.txt', data.choices[0].message.content);
  } catch (err) {
    console.error('Falha na chamada do Nemotron:', err);
  }
}

main();

