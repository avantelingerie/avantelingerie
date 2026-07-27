import apiServerClient from '@/lib/apiServerClient.js';

export const blingService = {
  async getBlingToken() {
    // In a real scenario, this might fetch from a secure endpoint or PocketBase
    // For now, we assume the backend handles the actual token injection via the /bling routes
    return 'backend_managed_token';
  },

  formatPedidoForBling(pedido) {
    // Transform PocketBase pedido format to Bling API v3 format
    return {
      numero: pedido.numero_pedido,
      data: new Date(pedido.created).toISOString().split('T')[0],
      desconto: pedido.valor_desconto || pedido.desconto || 0,
      contato: {
        nome: pedido.cliente_nome || 'Cliente Consumidor',
        numeroDocumento: pedido.cliente_cpf || '',
        telefone: pedido.cliente_telefone || '',
        email: pedido.cliente_email || ''
      },
      itens: (pedido.itens || []).map(item => ({
        codigo: item.sku,
        descricao: item.nome,
        quantidade: item.quantidade,
        valor: item.preco_unitario || item.preco || item.price || 0,
        variacao_id: item.variacao_id || item.id || ''
      })),
      parcelas: [{
        formaPagamento: {
          id: this.mapFormaPagamento(pedido.metodo_pagamento || pedido.forma_pagamento)
        },
        valor: pedido.valor_total || pedido.total,
        dataVencimento: new Date(pedido.created || Date.now()).toISOString().split('T')[0]
      }],
      transporte: {
        fretePorConta: 0,
        frete: pedido.valor_frete || pedido.frete_valor || 0
      }
    };
  },

  mapFormaPagamento(forma) {
    const map = {
      'pix': 17,
      'boleto': 15,
      'credito': 3,
      'debito': 4,
      'transferencia': 18
    };
    return map[forma?.toLowerCase()] || 99; // 99 = Outros
  },

  async sendPedidoToBling(pedido) {
    try {
      // O backend agora cuida de toda a formatação e validação,
      // enviamos apenas o ID do pedido para reenvio manual
      const response = await apiServerClient.fetch('/bling/pedidos/reenviar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pedido_id: pedido.id })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar para o Bling');
      }

      return await response.json();
    } catch (error) {
      console.error('[blingService] Erro ao enviar pedido:', error);
      throw error;
    }
  }
};