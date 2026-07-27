import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';

export const estoqueService = {
  async buscarVariacoesComEstoque(page = 1, perPage = 50, filters = {}) {
    let filterQuery = [];
    
    if (filters.search) {
      filterQuery.push(`(sku ~ "${filters.search}" || produto_id.name ~ "${filters.search}")`);
    }
    
    if (filters.categoria_id && filters.categoria_id !== 'all') {
      filterQuery.push(`produto_id.categoria_id = "${filters.categoria_id}"`);
    }

    const options = {
      expand: 'produto_id,produto_id.categoria_id',
      sort: '-created',
      $autoCancel: false
    };

    if (filterQuery.length > 0) {
      options.filter = filterQuery.join(' && ');
    }

    const result = await pb.collection('variacoes').getList(page, perPage, options);
    
    return result;
  },

  async buscarTodasVariacoesSemPaginacao() {
    return await pb.collection('variacoes').getFullList({
      expand: 'produto_id',
      $autoCancel: false
    });
  },

  async criarMovimentacao(variacao_id, sku, tipo, quantidade, motivo, motivo_livre, admin_id) {
    const variacao = await pb.collection('variacoes').getOne(variacao_id, { $autoCancel: false });
    const qtd_anterior = variacao.estoque || 0;
    const qtd_atual = tipo === 'entrada' ? qtd_anterior + quantidade : qtd_anterior - quantidade;

    if (qtd_atual < 0) {
      throw new Error('A quantidade de saída não pode ser maior que o estoque atual.');
    }

    const movimentacao = await pb.collection('movimentacoes_estoque').create({
      variacao_id,
      sku,
      tipo,
      quantidade,
      motivo,
      motivo_livre: motivo === 'outros' ? motivo_livre : '',
      qtd_anterior,
      qtd_atual,
      admin_id,
      bling_sincronizado: false,
      bling_erro: ''
    }, { $autoCancel: false });

    await pb.collection('variacoes').update(variacao_id, {
      estoque: qtd_atual
    }, { $autoCancel: false });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('inventory_updated'));
    }

    const syncResult = await this.sincronizarComBling(sku, qtd_atual);

    await pb.collection('movimentacoes_estoque').update(movimentacao.id, {
      bling_sincronizado: syncResult.sucesso,
      bling_erro: syncResult.sucesso ? '' : syncResult.erro || 'Erro desconhecido ao sincronizar.'
    }, { $autoCancel: false });

    return { movimentacao, syncResult };
  },

  async buscarHistoricoEstoque(sku, dataInicio, dataFim) {
    let filterQuery = [`sku = "${sku}"`];

    if (dataInicio) {
      filterQuery.push(`created >= "${dataInicio} 00:00:00"`);
    }
    
    if (dataFim) {
      const nextDay = new Date(dataFim);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().split('T')[0];
      filterQuery.push(`created < "${nextDayStr} 00:00:00"`);
    }

    const records = await pb.collection('movimentacoes_estoque').getFullList({
      filter: filterQuery.join(' && '),
      sort: '-created',
      expand: 'admin_id',
      $autoCancel: false
    });

    return records;
  },

  async buscarConfiguracoes() {
    try {
      const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        return records[0];
      }
      return { id: null, limite_alerta_global: 10 };
    } catch (e) {
      console.error('Error fetching settings', e);
      return { id: null, limite_alerta_global: 10 };
    }
  },

  async atualizarConfiguracoes(limite_alerta_global) {
    const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
    if (records.length > 0) {
      return await pb.collection('configuracoes_estoque').update(records[0].id, {
        limite_alerta_global
      }, { $autoCancel: false });
    } else {
      return await pb.collection('configuracoes_estoque').create({
        limite_alerta_global
      }, { $autoCancel: false });
    }
  },

  async sincronizarComBling(sku, quantidade_atual) {
    try {
      const response = await apiServerClient.fetch('/bling/sincronizar-estoque', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, quantidade_atual })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling Bling sync API', error);
      return { sucesso: false, erro: error.message || 'Falha na comunicação com o servidor' };
    }
  }
};