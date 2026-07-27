import pb from '@/lib/pocketbaseClient.js';

export const descontosService = {
  // Busca as configurações de faixas e estoques do banco de dados
  async getConfiguracoes() {
    try {
      const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        return records[0];
      }
      return null;
    } catch (e) {
      console.error('[descontosService] Erro ao buscar configurações de descontos', e);
      throw e;
    }
  },

  // Salva ou atualiza a linha de configuração única das faixas
  async updateConfiguracoes(data) {
    try {
      const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        return await pb.collection('configuracoes_estoque').update(records[0].id, data, { $autoCancel: false });
      } else {
        const createData = {
          limite_alerta_global: 10, // Default value for required database field
          desconto_pix_ativo: false,
          desconto_pix_pct: 0,
          desconto_pix_valor_minimo: 0,
          ...data
        };
        return await pb.collection('configuracoes_estoque').create(createData, { $autoCancel: false });
      }
    } catch (e) {
      console.error('[descontosService] Erro ao atualizar configurações de descontos', e);
      throw e;
    }
  },

  // Gera dados iniciais estáveis de teste para validações de descontos na Avante
  async seedTestData() {
    try {
      const defaultData = {
        limite_alerta_global: 10,
        limite_upgrade_revenda: 400.00,
        desconto_progressivo_faixas: [
          { id: 'v1', valor_minimo: 300, valor_maximo: 899.99, percentual: 15 },
          { id: 'v2', valor_minimo: 900, valor_maximo: null, percentual: 20 }
        ],
        desconto_progressivo_faixas_revenda: [
          { id: 'r1', valor_minimo: 1500, valor_maximo: 2999.99, percentual: 10 },
          { id: 'r2', valor_minimo: 3000, valor_maximo: null, percentual: 15 }
        ],
        desconto_pix_ativo: true,
        desconto_pix_pct: 5 // Correct property name mapped to schema
      };

      const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
      if (records.length > 0) {
        return await pb.collection('configuracoes_estoque').update(records[0].id, defaultData, { $autoCancel: false });
      } else {
        return await pb.collection('configuracoes_estoque').create(defaultData, { $autoCancel: false });
      }
    } catch (e) {
      console.error('[descontosService] Erro ao seedar dados de teste', e);
      throw e;
    }
  },

  // Retorna as faixas corretas baseadas no perfil do usuário
  getFaixasPorPerfil(configuracoes, perfil) {
    if (!configuracoes) return [];
    if (perfil === 'reseller') {
      return configuracoes.desconto_progressivo_faixas_revenda || [];
    }
    return configuracoes.desconto_progressivo_faixas || [];
  },

  // Retorna o valor limite para se tornar revendedora padrão (R$ 500,00)
  getLimiteUpgrade(configuracoes) {
    if (!configuracoes || configuracoes.limite_upgrade_revenda == null) {
      return 500.00; // Sensible default minimum for wholesale
    }
    return parseFloat(configuracoes.limite_upgrade_revenda);
  },

  // Gerencia buscas e paginações de cupons ativos cadastrados
  async getCupons(filters = {}, page = 1, limit = 20) {
    try {
      const filterQuery = [];

      if (filters.search) {
        filterQuery.push(`codigo ~ "${filters.search}"`);
      }
      if (filters.status && filters.status !== 'all') {
        filterQuery.push(`ativo = ${filters.status === 'ativo'}`);
      }
      if (filters.tipo && filters.tipo !== 'all') {
        filterQuery.push(`tipo = "${filters.tipo}"`);
      }

      const options = {
        sort: '-created',
        $autoCancel: false
      };

      if (filterQuery.length > 0) {
        options.filter = filterQuery.join(' && ');
      }

      return await pb.collection('cupons').getList(page, limit, options);
    } catch (e) {
      console.error('[descontosService] Erro ao buscar cupons', e);
      throw e;
    }
  },

  async validateCodigoUnique(codigo, excludeId = null) {
    try {
      const filter = `codigo = "${codigo}"${excludeId ? ` && id != "${excludeId}"` : ''}`;
      const existing = await pb.collection('cupons').getList(1, 1, { filter, $autoCancel: false });
      return existing.totalItems === 0;
    } catch (e) {
      console.error('[descontosService] Erro ao validar código único', e);
      throw e;
    }
  },

  async createCupom(data) {
    try {
      return await pb.collection('cupons').create(data, { $autoCancel: false });
    } catch (e) {
      console.error('[descontosService] Erro ao criar cupom', e);
      throw e;
    }
  },

  async updateCupom(id, data) {
    try {
      return await pb.collection('cupons').update(id, data, { $autoCancel: false });
    } catch (e) {
      console.error('[descontosService] Erro ao atualizar cupom', e);
      throw e;
    }
  },

  async deleteCupom(id) {
    try {
      return await pb.collection('cupons').delete(id, { $autoCancel: false });
    } catch (e) {
      console.error('[descontosService] Erro ao deletar cupom', e);
      throw e;
    }
  },

  async toggleCupomStatus(id, currentStatus) {
    try {
      return await pb.collection('cupons').update(id, { ativo: !currentStatus }, { $autoCancel: false });
    } catch (e) {
      console.error('[descontosService] Erro ao alternar status do cupom', e);
      throw e;
    }
  },

  async getUsosCupons(cupomId = null, filters = {}) {
    try {
      const filterQuery = [];

      if (cupomId) {
        filterQuery.push(`cupom_id = "${cupomId}"`);
      }

      if (filters.data_inicial) {
        filterQuery.push(`created >= "${filters.data_inicial} 00:00:00"`);
      }
      if (filters.data_final) {
        const nextDay = new Date(filters.data_final);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextDayStr = nextDay.toISOString().split('T')[0];
        filterQuery.push(`created < "${nextDayStr} 00:00:00"`);
      }

      const options = {
        sort: '-created',
        expand: 'cupom_id',
        $autoCancel: false
      };

      if (filterQuery.length > 0) {
        options.filter = filterQuery.join(' && ');
      }

      return await pb.collection('uso_cupons').getFullList(options);
    } catch (e) {
      console.error('[descontosService] Erro ao buscar usos de cupons', e);
      throw e;
    }
  },

  // Exportação CSV do histórico de uso de cupons nas vendas da loja
  exportCuponsCSV(data) {
    try {
      if (!data || data.length === 0) return;

      const headers = ['Código', 'Tipo', 'Valor', 'Usos Realizados', 'Limite Usos', 'Economia Gerada (R$)', 'Status'];
      const rows = data.map(item => [
        item.codigo,
        item.tipo,
        item.valor,
        item.usos_realizados || 0,
        item.limite_usos || 'Ilimitado',
        item.economia_gerada_total || 0,
        item.ativo ? 'Ativo' : 'Inativo'
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(e => e.join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `relatorio_cupons_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('[descontosService] Erro ao exportar CSV', e);
    }
  }
};