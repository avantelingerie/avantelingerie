import pb from '@/lib/pocketbaseClient.js';
import { pedidosService } from './pedidosService.js';

export const pedidosSeedService = {
  async seedPedidos() {
    console.log('[pedidosSeedService] Iniciando seed de pedidos de teste...');
    try {
      const sampleOrders = [
        {
          cliente_nome: 'Maria Oliveira',
          cliente_email: 'maria.oliveira@example.com',
          cliente_telefone: '(11) 98765-4321',
          status: 'pendente',
          valor_total: 150.50,
          valor_desconto: 10.00,
          valor_frete: 15.00,
          endereco_entrega: 'Rua das Flores, 123, Apto 45',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01234-567',
          metodo_pagamento: 'pix',
          observacoes: 'Entregar em horário comercial',
          itens: [
            { sku: 'PROD-001', nome: 'Camiseta Básica Branca', quantidade: 2, preco_unitario: 45.00 },
            { sku: 'PROD-002', nome: 'Caneca Preta', quantidade: 1, preco_unitario: 35.50 }
          ],
          historico_status: [
            { status: 'pendente', data: new Date().toISOString(), observacao: 'Pedido recebido' }
          ]
        },
        {
          cliente_nome: 'João Santos',
          cliente_email: 'joao.santos@example.com',
          cliente_telefone: '(21) 99999-8888',
          status: 'confirmado',
          valor_total: 320.00,
          valor_desconto: 0,
          valor_frete: 0,
          endereco_entrega: 'Av. Atlântica, 1000',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          cep: '22010-000',
          metodo_pagamento: 'credito',
          observacoes: '',
          itens: [
            { sku: 'PROD-003', nome: 'Tênis Esportivo', quantidade: 1, preco_unitario: 320.00 }
          ],
          historico_status: [
            { status: 'pendente', data: new Date(Date.now() - 86400000).toISOString(), observacao: 'Pedido recebido' },
            { status: 'confirmado', data: new Date().toISOString(), observacao: 'Pagamento aprovado' }
          ]
        },
        {
          cliente_nome: 'Ana Costa',
          cliente_email: 'ana.costa@example.com',
          cliente_telefone: '(31) 97777-6666',
          status: 'processando',
          valor_total: 85.90,
          valor_desconto: 5.00,
          valor_frete: 12.90,
          endereco_entrega: 'Rua da Bahia, 500',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          cep: '30160-011',
          metodo_pagamento: 'boleto',
          observacoes: 'Deixar na portaria',
          itens: [
            { sku: 'PROD-004', nome: 'Livro de Receitas', quantidade: 1, preco_unitario: 78.00 }
          ],
          historico_status: [
            { status: 'pendente', data: new Date(Date.now() - 172800000).toISOString(), observacao: 'Pedido recebido' },
            { status: 'confirmado', data: new Date(Date.now() - 86400000).toISOString(), observacao: 'Boleto compensado' },
            { status: 'processando', data: new Date().toISOString(), observacao: 'Em separação no estoque' }
          ]
        },
        {
          cliente_nome: 'Carlos Pereira',
          cliente_email: 'carlos.pereira@example.com',
          cliente_telefone: '(41) 96666-5555',
          status: 'enviado',
          valor_total: 450.00,
          valor_desconto: 50.00,
          valor_frete: 25.00,
          endereco_entrega: 'Rua XV de Novembro, 200',
          cidade: 'Curitiba',
          estado: 'PR',
          cep: '80020-310',
          metodo_pagamento: 'pix',
          rastreamento: 'BR123456789BR',
          observacoes: '',
          itens: [
            { sku: 'PROD-005', nome: 'Jaqueta de Couro', quantidade: 1, preco_unitario: 475.00 }
          ],
          historico_status: [
            { status: 'pendente', data: new Date(Date.now() - 259200000).toISOString(), observacao: 'Pedido recebido' },
            { status: 'confirmado', data: new Date(Date.now() - 250000000).toISOString(), observacao: 'Pagamento aprovado' },
            { status: 'processando', data: new Date(Date.now() - 172800000).toISOString(), observacao: 'Em separação' },
            { status: 'enviado', data: new Date().toISOString(), observacao: 'Objeto postado' }
          ]
        },
        {
          cliente_nome: 'Fernanda Lima',
          cliente_email: 'fernanda.lima@example.com',
          cliente_telefone: '(51) 95555-4444',
          status: 'entregue',
          valor_total: 120.00,
          valor_desconto: 0,
          valor_frete: 10.00,
          endereco_entrega: 'Av. Borges de Medeiros, 1500',
          cidade: 'Porto Alegre',
          estado: 'RS',
          cep: '90119-900',
          metodo_pagamento: 'debito',
          rastreamento: 'BR987654321BR',
          observacoes: '',
          itens: [
            { sku: 'PROD-006', nome: 'Conjunto de Copos', quantidade: 2, preco_unitario: 55.00 }
          ],
          historico_status: [
            { status: 'pendente', data: new Date(Date.now() - 432000000).toISOString(), observacao: 'Pedido recebido' },
            { status: 'confirmado', data: new Date(Date.now() - 430000000).toISOString(), observacao: 'Pagamento aprovado' },
            { status: 'processando', data: new Date(Date.now() - 345600000).toISOString(), observacao: 'Em separação' },
            { status: 'enviado', data: new Date(Date.now() - 259200000).toISOString(), observacao: 'Objeto postado' },
            { status: 'entregue', data: new Date().toISOString(), observacao: 'Objeto entregue ao destinatário' }
          ]
        }
      ];

      const createdOrders = [];
      for (const order of sampleOrders) {
        const numero_pedido = await pedidosService.generatePedidoNumber();
        const payload = {
          ...order,
          numero_pedido,
          data_pedido: new Date().toISOString()
        };
        const created = await pb.collection('pedidos').create(payload, { $autoCancel: false });
        createdOrders.push(created);
      }

      console.log(`[pedidosSeedService] ${createdOrders.length} pedidos de teste criados com sucesso!`);
      return createdOrders;
    } catch (e) {
      console.error('[pedidosSeedService] Erro ao criar pedidos de teste', e);
      throw e;
    }
  }
};