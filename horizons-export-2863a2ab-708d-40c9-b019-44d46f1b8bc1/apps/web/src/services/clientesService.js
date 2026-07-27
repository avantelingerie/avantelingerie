import pb from '@/lib/pocketbaseClient.js';

export const clientesService = {
  async getClientes(page = 1, limit = 20, filters = {}, sort = '-criado_em') {
    let cleanSort = sort;
    if (typeof sort === 'string') {
      cleanSort = sort.replace(/:(-?1|\+?1)$/g, '');
      cleanSort = cleanSort
        .replace('criado_em', 'created')
        .replace('nome', 'name')
        .replace('telefone', 'whatsapp');
    }

    try {
      const filterConditions = [];

      if (filters.search) {
        const searchTerm = filters.search.replace(/"/g, '\\"');
        filterConditions.push(`(name ~ "${searchTerm}" || email ~ "${searchTerm}" || cpf ~ "${searchTerm}")`);
      }

      const options = {
        sort: cleanSort,
        $autoCancel: false
      };

      if (filterConditions.length > 0) {
        options.filter = filterConditions.join(' && ');
      }

      const result = await pb.collection('users').getList(page, limit, options);

      return {
        items: result.items.map(user => ({
          ...user,
          nome: user.name,
          telefone: user.whatsapp,
          criado_em: user.created
        })),
        totalPages: result.totalPages,
        totalItems: result.totalItems,
        page: result.page
      };
    } catch (error) {
      console.error('Error fetching clientes in getClientes:', error);
      if (error.data) {
        console.error('Detalhes do erro do PocketBase:', error.data);
      }
      throw error;
    }
  },

  async fetchClientes(page = 1, limit = 20, filters = {}, sort = '-criado_em') {
    return this.getClientes(page, limit, filters, sort);
  },

  async fetchClienteById(id) {
    try {
      const user = await pb.collection('users').getOne(id, { $autoCancel: false });
      return {
        ...user,
        nome: user.name,
        telefone: user.whatsapp,
        criado_em: user.created
      };
    } catch (error) {
      console.error('Error fetching cliente:', error);
      throw error;
    }
  },

  async updateCliente(id, data) {
    try {
      const mappedData = { ...data };
      if (mappedData.nome !== undefined) {
        mappedData.name = mappedData.nome;
        delete mappedData.nome;
      }
      if (mappedData.telefone !== undefined) {
        mappedData.whatsapp = mappedData.telefone;
        delete mappedData.telefone;
      }
      if (mappedData.criado_em !== undefined) {
        mappedData.created = mappedData.criado_em;
        delete mappedData.criado_em;
      }
      const user = await pb.collection('users').update(id, mappedData, { $autoCancel: false });
      return {
        ...user,
        nome: user.name,
        telefone: user.whatsapp,
        criado_em: user.created
      };
    } catch (error) {
      console.error('Error updating cliente:', error);
      throw error;
    }
  },

  async bloquearCliente(id) {
    return this.updateCliente(id, { bloqueado: true });
  },

  async desbloquearCliente(id) {
    return this.updateCliente(id, { bloqueado: false });
  },

  async fetchEnderecos(usuarioId) {
    try {
      return await pb.collection('enderecos').getFullList({
        filter: `usuario_id = "${usuarioId}"`,
        sort: '-principal,-created',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching enderecos:', error);
      throw error;
    }
  },

  async createEndereco(usuarioId, data) {
    try {
      if (data.principal) {
        await this._resetOutrosEnderecosPrincipais(usuarioId);
      }
      return await pb.collection('enderecos').create({ ...data, usuario_id: usuarioId }, { $autoCancel: false });
    } catch (error) {
      console.error('Error creating endereco:', error);
      throw error;
    }
  },

  async updateEndereco(id, data) {
    try {
      if (data.principal && data.usuario_id) {
        await this._resetOutrosEnderecosPrincipais(data.usuario_id, id);
      }
      return await pb.collection('enderecos').update(id, data, { $autoCancel: false });
    } catch (error) {
      console.error('Error updating endereco:', error);
      throw error;
    }
  },

  async deleteEndereco(id) {
    try {
      return await pb.collection('enderecos').delete(id, { $autoCancel: false });
    } catch (error) {
      console.error('Error deleting endereco:', error);
      throw error;
    }
  },

  async setEnderecoAsPrincipal(id, usuarioId) {
    try {
      await this._resetOutrosEnderecosPrincipais(usuarioId, id);
      return await pb.collection('enderecos').update(id, { principal: true }, { $autoCancel: false });
    } catch (error) {
      console.error('Error setting endereco as principal:', error);
      throw error;
    }
  },

  async _resetOutrosEnderecosPrincipais(usuarioId, excetoId = null) {
    try {
      let filter = `usuario_id = "${usuarioId}" && principal = true`;
      if (excetoId) {
        filter += ` && id != "${excetoId}"`;
      }
      const principais = await pb.collection('enderecos').getFullList({ filter, $autoCancel: false });

      for (const end of principais) {
        await pb.collection('enderecos').update(end.id, { principal: false }, { $autoCancel: false });
      }
    } catch (error) {
      console.error('Error resetting principal addresses:', error);
    }
  },

  async fetchPedidosCliente(usuarioId) {
    try {
      return await pb.collection('pedidos').getFullList({
        filter: `cliente_id = "${usuarioId}"`,
        sort: '-data_pedido',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Error fetching pedidos do cliente:', error);
      throw error;
    }
  },

  async updateTotalCompras(usuarioId) {
    try {
      const pedidos = await this.fetchPedidosCliente(usuarioId);
      const total = pedidos.length;
      return await this.updateCliente(usuarioId, { total_compras: total });
    } catch (error) {
      console.error('Error updating total compras:', error);
      throw error;
    }
  },

  async updateNivelDesconto(usuarioId, nivel) {
    try {
      const desconto_pct = nivel * 10;
      return await this.updateCliente(usuarioId, { nivel_desconto: nivel, desconto_pct });
    } catch (error) {
      console.error('Error updating nivel desconto:', error);
      throw error;
    }
  },

  exportClientesCSV(clientes) {
    if (!clientes || clientes.length === 0) return;

    const headers = ['ID', 'Nome', 'Email', 'CPF', 'Telefone', 'Total Compras', 'Nível Desconto', 'Bloqueado', 'Criado Em'];
    const csvRows = [headers.join(',')];

    clientes.forEach(c => {
      const row = [
        c.id,
        `"${c.nome || ''}"`,
        `"${c.email || ''}"`,
        `"${c.cpf || ''}"`,
        `"${c.telefone || ''}"`,
        c.total_compras || 0,
        c.nivel_desconto || 0,
        c.bloqueado ? 'Sim' : 'Não',
        c.criado_em ? new Date(c.criado_em).toLocaleDateString('pt-BR') : ''
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `clientes_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async getSolicitacoesPendentes(page = 1, limit = 20) {
    try {
      return await pb.collection('solicitacoes_revendedor').getList(page, limit, {
        filter: 'status = "pendente" || status = "em_analise" || status = ""',
        sort: '-created',
        expand: 'user_id',
        $autoCancel: false
      });
    } catch (error) {
      console.error('Erro ao buscar solicitações de revenda:', error);
      throw error;
    }
  },

  async aprovarRevendedor(solicitacaoId, userId) {
    try {
      await pb.collection('solicitacoes_revendedor').update(solicitacaoId, {
        status: 'aprovado'
      }, { $autoCancel: false });

      if (userId) {
        await pb.collection('users').update(userId, {
          tipo_cliente: 'revendedor',
          commercial_profile: 'reseller',
          cadastro_completo: true,
          account_level: 'verified'
        }, { $autoCancel: false });
      }
      return true;
    } catch (error) {
      console.error('Erro ao aprovar revendedor:', error);
      throw error;
    }
  },

  async rejeitarRevendedor(solicitacaoId) {
    try {
      await pb.collection('solicitacoes_revendedor').update(solicitacaoId, {
        status: 'rejeitado'
      }, { $autoCancel: false });
      return true;
    } catch (error) {
      console.error('Erro ao rejeitar revendedor:', error);
      throw error;
    }
  }
};