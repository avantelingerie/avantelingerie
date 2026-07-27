/// <reference path="../pb_data/types.d.ts" />
// Pedidos payload validation hook
// Validates all required fields and constraints for order creation/updates
// Compatible with Goja (PocketBase's Go interpreter)

onRecordCreate((e) => {
  const record = e.record;

  // ============================================
  // Required field validations
  // ============================================

  // cliente_nome - required, must be non-empty string
  const clienteNome = record.get('cliente_nome');
  if (!clienteNome || typeof clienteNome !== 'string' || clienteNome.trim() === '') {
    throw new BadRequestError('cliente_nome: cannot be blank');
  }

  // cliente_email - required, must be valid email
  const clienteEmail = record.get('cliente_email');
  if (!clienteEmail || typeof clienteEmail !== 'string' || clienteEmail.trim() === '') {
    throw new BadRequestError('cliente_email: cannot be blank');
  }
  // Basic email validation
  if (!clienteEmail.includes('@') || !clienteEmail.includes('.')) {
    throw new BadRequestError('cliente_email: invalid email format');
  }

  // data_pedido - required, must be valid date
  const dataPedido = record.get('data_pedido');
  if (!dataPedido || (dataPedido.isZero && dataPedido.isZero())) {
    throw new BadRequestError('data_pedido: cannot be blank');
  }

  // status - required, must be in allowed values
  const status = record.get('status');
  const allowedStatuses = ['pendente', 'confirmado', 'processando', 'enviado', 'entregue', 'cancelado'];
  if (!status || typeof status !== 'string' || status.trim() === '') {
    throw new BadRequestError('status: cannot be blank');
  }
  let statusValid = false;
  for (let i = 0; i < allowedStatuses.length; i++) {
    if (allowedStatuses[i] === status) {
      statusValid = true;
      break;
    }
  }
  if (!statusValid) {
    throw new BadRequestError('status: invalid value. Must be one of: pendente, confirmado, processando, enviado, entregue, cancelado');
  }

  // valor_total - required, must be >= 0.01
  const valorTotal = record.get('valor_total');
  if (valorTotal === null || valorTotal === undefined || typeof valorTotal !== 'number') {
    throw new BadRequestError('valor_total: cannot be blank');
  }
  if (valorTotal < 0.01) {
    throw new BadRequestError('valor_total: must be at least 0.01');
  }

  // endereco_entrega - required, must be non-empty string
  const enderecoEntrega = record.get('endereco_entrega');
  if (!enderecoEntrega || typeof enderecoEntrega !== 'string' || enderecoEntrega.trim() === '') {
    throw new BadRequestError('endereco_entrega: cannot be blank');
  }

  // cidade - required, must be non-empty string
  const cidade = record.get('cidade');
  if (!cidade || typeof cidade !== 'string' || cidade.trim() === '') {
    throw new BadRequestError('cidade: cannot be blank');
  }

  // estado - required, must be non-empty string
  const estado = record.get('estado');
  if (!estado || typeof estado !== 'string' || estado.trim() === '') {
    throw new BadRequestError('estado: cannot be blank');
  }

  // cep - required, must be non-empty string
  const cep = record.get('cep');
  if (!cep || typeof cep !== 'string' || cep.trim() === '') {
    throw new BadRequestError('cep: cannot be blank');
  }

  // ============================================
  // Optional field validations
  // ============================================

  // metodo_pagamento - optional, but if provided must be in allowed values
  const metodoPagamento = record.get('metodo_pagamento');
  if (metodoPagamento && typeof metodoPagamento === 'string' && metodoPagamento.trim() !== '') {
    const allowedMetodos = ['credito', 'debito', 'pix', 'boleto', 'transferencia'];
    let metodoValid = false;
    for (let i = 0; i < allowedMetodos.length; i++) {
      if (allowedMetodos[i] === metodoPagamento) {
        metodoValid = true;
        break;
      }
    }
    if (!metodoValid) {
      throw new BadRequestError('metodo_pagamento: invalid value. Must be one of: credito, debito, pix, boleto, transferencia');
    }
  }

  // valor_desconto - optional, but if provided must be >= 0
  const valorDesconto = record.get('valor_desconto');
  if (valorDesconto !== null && valorDesconto !== undefined && typeof valorDesconto === 'number') {
    if (valorDesconto < 0) {
      throw new BadRequestError('valor_desconto: cannot be negative');
    }
  }

  // valor_frete - optional, but if provided must be >= 0
  const valorFrete = record.get('valor_frete');
  if (valorFrete !== null && valorFrete !== undefined && typeof valorFrete === 'number') {
    if (valorFrete < 0) {
      throw new BadRequestError('valor_frete: cannot be negative');
    }
  }

  // ============================================
  // itens field validation (Goja-compatible)
  // ============================================

  const rawItens = record.get('itens');
  let itens = null;

  if (rawItens !== null && rawItens !== undefined) {
    if (typeof rawItens === 'string') {
      try {
        itens = JSON.parse(rawItens);
      } catch (err) {
        itens = null;
      }
    } else if (Array.isArray(rawItens) || (rawItens && typeof rawItens === 'object' && typeof rawItens.length === 'number')) {
      // Check if it's a byte array (first element is a number)
      if (rawItens.length > 0 && typeof rawItens[0] === 'number') {
        try {
          let str = "";
          for (let i = 0; i < rawItens.length; i++) {
            str += String.fromCharCode(rawItens[i]);
          }
          itens = JSON.parse(str);
        } catch (err) {
          itens = null;
        }
      } else {
        itens = rawItens;
      }
    }
  }

  if (itens !== null && itens !== undefined) {
    if (!Array.isArray(itens)) {
      throw new BadRequestError('itens: must be an array');
    }

    if (itens.length === 0) {
      throw new BadRequestError('itens: array cannot be empty');
    }

    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];

      if (!item || typeof item !== 'object') {
        throw new BadRequestError('itens[' + i + ']: must be an object');
      }

      // Validate item has required fields (dot notation works on native JS objects!)
      const variacao_id = item.variacao_id || item["variacao_id"];
      const quantidade = item.quantidade !== undefined ? item.quantidade : item["quantidade"];
      const preco = item.preco !== undefined ? item.preco : item["preco"];

      if (!variacao_id || typeof variacao_id !== 'string') {
        throw new BadRequestError('itens[' + i + ']: variacao_id is required and must be a string');
      }

      if (quantidade === null || quantidade === undefined) {
        throw new BadRequestError('itens[' + i + ']: quantidade is required');
      }

      const numQuantidade = Number(quantidade);
      if (isNaN(numQuantidade) || numQuantidade <= 0) {
        throw new BadRequestError('itens[' + i + ']: quantidade must be greater than 0');
      }

      if (preco === null || preco === undefined) {
        throw new BadRequestError('itens[' + i + ']: preco is required');
      }

      const numPreco = Number(preco);
      if (isNaN(numPreco) || numPreco < 0.01) {
        throw new BadRequestError('itens[' + i + ']: preco must be at least 0.01');
      }
    }
  }

  e.next();
}, 'pedidos');

onRecordUpdate((e) => {
  const record = e.record;

  // ============================================
  // Conditional validations on update
  // ============================================

  // If status is being updated, validate it
  if (record.get('status') !== undefined && record.get('status') !== null) {
    const status = record.get('status');
    const allowedStatuses = ['pendente', 'confirmado', 'processando', 'enviado', 'entregue', 'cancelado'];
    if (typeof status === 'string' && status.trim() !== '') {
      let statusValid = false;
      for (let i = 0; i < allowedStatuses.length; i++) {
        if (allowedStatuses[i] === status) {
          statusValid = true;
          break;
        }
      }
      if (!statusValid) {
        throw new BadRequestError('status: invalid value. Must be one of: pendente, confirmado, processando, enviado, entregue, cancelado');
      }
    }
  }

  // If valor_total is being updated, validate it
  if (record.get('valor_total') !== undefined && record.get('valor_total') !== null) {
    const valorTotal = record.get('valor_total');
    if (typeof valorTotal === 'number' && valorTotal < 0.01) {
      throw new BadRequestError('valor_total: must be at least 0.01');
    }
  }

  // If metodo_pagamento is being updated, validate it
  if (record.get('metodo_pagamento') !== undefined && record.get('metodo_pagamento') !== null) {
    const metodoPagamento = record.get('metodo_pagamento');
    if (typeof metodoPagamento === 'string' && metodoPagamento.trim() !== '') {
      const allowedMetodos = ['credito', 'debito', 'pix', 'boleto', 'transferencia'];
      let metodoValid = false;
      for (let i = 0; i < allowedMetodos.length; i++) {
        if (allowedMetodos[i] === metodoPagamento) {
          metodoValid = true;
          break;
        }
      }
      if (!metodoValid) {
        throw new BadRequestError('metodo_pagamento: invalid value. Must be one of: credito, debito, pix, boleto, transferencia');
      }
    }
  }

  e.next();
}, 'pedidos');