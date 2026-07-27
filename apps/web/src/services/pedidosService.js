import pb from '@/lib/pocketbaseClient.js';
import { clientesService } from './clientesService.js';

export const pedidosService = {
  async getPedidos(filters = {}, page = 1, limit = 20) {
    try {
      const filterQuery = [];
      
      if (filters.search) {
        const cleanSearch = filters.search.replace(/#/g, '').trim();
        filterQuery.push(`(numero_pedido ~ "${cleanSearch}" || cliente_nome ~ "${cleanSearch}" || id ~ "${cleanSearch}")`);
      }
      if (filters.status && filters.status !== 'all') {
        filterQuery.push(`status = "${filters.status}"`);
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
        $autoCancel: false
      };

      if (filterQuery.length > 0) {
        options.filter = filterQuery.join(' && ');
      }

      return await pb.collection('pedidos').getList(page, limit, options);
    } catch (e) {
      console.error('[pedidosService] Erro ao buscar pedidos', e);
      throw e;
    }
  },

  async getPedidoById(id) {
    try {
      return await pb.collection('pedidos').getOne(id, { $autoCancel: false });
    } catch (e) {
      console.error('[pedidosService] Erro ao buscar pedido', e);
      throw e;
    }
  },

  async createPedido(data) {
    try {
      const numero_pedido = await this.generatePedidoNumber();
      const historico = [{
        status: data.status || 'pendente',
        data: new Date().toISOString(),
        observacao: 'Pedido criado manualmente'
      }];

      let cliente_id = data.cliente_id || data.usuario_id || data.user_id || '';
      if (!cliente_id && data.cliente_email) {
        try {
          const users = await pb.collection('users').getList(1, 1, {
            filter: `email = "${data.cliente_email.replace(/"/g, '\\"')}"`,
            $autoCancel: false
          });
          if (users.items.length > 0) {
            cliente_id = users.items[0].id;
          }
        } catch (errUser) {
          console.warn('[pedidosService] Erro ao buscar usuário por e-mail:', errUser);
        }
      }

      const payload = {
        ...data,
        cliente_id,
        user_id: cliente_id,
        usuario_id: cliente_id,
        numero_pedido,
        historico_status: historico
      };

      const created = await pb.collection('pedidos').create(payload, { $autoCancel: false });

      if (cliente_id) {
        try {
          await clientesService.updateTotalCompras(cliente_id);
        } catch (errUpdate) {
          console.warn('[pedidosService] Erro ao atualizar total de compras do cliente:', errUpdate);
        }
      }

      return created;
    } catch (e) {
      console.error('[pedidosService] Erro ao criar pedido', e);
      throw e;
    }
  },

  async updatePedidoStatus(id, newStatus, observacao = '') {
    try {
      const pedido = await this.getPedidoById(id);
      const historico = pedido.historico_status || [];
      
      historico.push({
        status: newStatus,
        data: new Date().toISOString(),
        observacao
      });

      const updated = await pb.collection('pedidos').update(id, { 
        status: newStatus,
        historico_status: historico
      }, { $autoCancel: false });

      const cliente_id = pedido.cliente_id || pedido.usuario_id || pedido.user_id;
      if (cliente_id) {
        try {
          await clientesService.updateTotalCompras(cliente_id);
        } catch (errUpdate) {
          console.warn('[pedidosService] Erro ao atualizar total de compras do cliente:', errUpdate);
        }
      }

      return updated;
    } catch (e) {
      console.error('[pedidosService] Erro ao atualizar status', e);
      throw e;
    }
  },

  async generatePedidoNumber() {
    try {
      const result = await pb.collection('pedidos').getList(1, 1, {
        sort: '-created',
        $autoCancel: false
      });
      
      if (result.items.length === 0) return 'PED-001';
      
      const lastNumber = result.items[0].numero_pedido;
      const match = lastNumber.match(/PED-(\d+)/);
      if (match) {
        const nextNum = parseInt(match[1], 10) + 1;
        return `PED-${nextNum.toString().padStart(3, '0')}`;
      }
      return `PED-${Date.now().toString().slice(-6)}`;
    } catch (e) {
      console.error('[pedidosService] Erro ao gerar número', e);
      return `PED-${Date.now().toString().slice(-6)}`;
    }
  },

  exportToCSV(pedidos) {
    if (!pedidos || pedidos.length === 0) return;
    
    const headers = ['Número', 'Cliente', 'Data', 'Status', 'Pagamento', 'Total (R$)'];
    const rows = pedidos.map(p => [
      p.numero_pedido,
      p.cliente_nome || 'N/A',
      new Date(p.created).toLocaleDateString('pt-BR'),
      p.status,
      p.metodo_pagamento || p.forma_pagamento || 'N/A',
      p.valor_total || p.total || 0
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  async getClienteById(id) {
    try {
      return await pb.collection('usuarios').getOne(id, { $autoCancel: false });
    } catch (e) {
      console.error('[pedidosService] Erro ao buscar cliente', e);
      return null;
    }
  },

  async getProdutoBySku(sku) {
    try {
      const result = await pb.collection('produtos').getList(1, 1, {
        filter: `sku = "${sku}"`,
        $autoCancel: false
      });
      return result.items[0] || null;
    } catch (e) {
      console.error('[pedidosService] Erro ao buscar produto por SKU', e);
      return null;
    }
  }
};