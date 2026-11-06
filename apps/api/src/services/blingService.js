import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { getBlingToken } from '../utils/blingTokenManager.js';

function isValidCPF(cpf) {
  cpf = (cpf || '').replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10), 10)) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11), 10)) return false;
  return true;
}

function isValidCNPJ(cnpj) {
  cnpj = (cnpj || '').replace(/\D/g, '');
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0, pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) return false;
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0; pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i), 10) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) return false;
  return true;
}

const getBlingErrorMessage = (error) => {
  if (error.response?.data?.error) {
    const err = error.response.data.error;
    let msg = err.message || '';
    if (err.description) msg += ` (Detalhe: ${err.description})`;
    if (err.fields && Array.isArray(err.fields) && err.fields.length > 0) {
      const fieldErrors = err.fields.map(f => `${f.element || ''}: ${f.msg || ''}`).join(' | ');
      msg += ` [Campos inválidos: ${fieldErrors}]`;
    }
    return msg;
  }
  return error.message;
};

const getBlingFormaPagamentoId = (metodo) => {
  if (!metodo) return null;
  const m = metodo.toLowerCase();
  if (m === 'pix') return 10033474;
  if (m === 'boleto') return 10033469;
  if (m.includes('debit') || m === 'debito' || m === 'débito') return 10543801;
  if (m.includes('credit') || m === 'cartao' || m === 'cartão') return 10543793;
  return null;
};

// Formata a data garantindo o fuso horário oficial de Brasília (evita que compras após as 21h fiquem com data de amanhã no Bling)
const getBrazilDateString = (dateInput) => {
  const d = dateInput ? new Date(dateInput) : new Date();
  return d.toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });
};

const formatPedidoForBling = (pedido, userCpf = '') => {
  const itens = (pedido.itens || []).map(item => ({
    codigo: item.sku,
    descricao: item.nome,
    quantidade: item.quantidade,
    valor: item.preco_unitario || item.preco || item.price || 0,
    variacao_id: item.variacao_id || item.id || ''
  }));

  const freteVal = pedido.valor_frete || pedido.frete_valor || 0;
  const descontoVal = pedido.valor_desconto || pedido.desconto_valor || 0;
  const totalFromItems = itens.reduce((sum, item) => sum + (item.quantidade * item.valor), 0);
  const totalParaParcelas = Math.max(0, Math.round((totalFromItems + freteVal - descontoVal) * 100) / 100);

  const enderecoStr = pedido.endereco_entrega || '';
  let rua = 'Não informado';
  let numero = 'S/N';
  let bairro = 'Não informado';

  if (enderecoStr) {
    const partes = enderecoStr.split(', ');
    rua = partes[0] || 'Não informado';
    if (partes.length > 1) {
      const numCompBairro = partes[1].split(' - ');
      numero = numCompBairro[0] || 'S/N';
      bairro = partes[2] || (numCompBairro[1] ? numCompBairro[1] : 'Não informado');
    }
  }

  const cep = (pedido.cep || '').replace(/\D/g, '');

  let calcPeso = 0;
  if (pedido.itens && Array.isArray(pedido.itens)) {
    calcPeso = pedido.itens.reduce((sum, item) => {
      const w = parseFloat(item.peso_g || item.weight) || 100;
      return sum + ((w / 1000) * (item.quantidade || item.quantity || 1));
    }, 0);
  }
  const finalPeso = calcPeso > 0 ? calcPeso : 0.3;
  const transportName = pedido.metodo_envio || pedido.forma_envio || 'Envios por Melhor Envio';

  const dataPedidoBR = getBrazilDateString(pedido.created);

  return {
    numeroLoja: pedido.numero_pedido,
    data: dataPedidoBR,
    contato: {
      nome: pedido.cliente_nome || 'Cliente Consumidor',
      numeroDocumento: pedido.cpf || userCpf || pedido.cliente_cpf || '',
      telefone: pedido.cliente_telefone || '',
      email: pedido.cliente_email || ''
    },
    desconto: {
      valor: Number(descontoVal)
    },
    itens: itens.map(item => ({
      codigo: item.codigo,
      descricao: item.descricao,
      quantidade: item.quantidade,
      valor: item.valor
    })),
    parcelas: (() => {
      const formaPagamentoId = getBlingFormaPagamentoId(pedido.metodo_pagamento);
      const obj = {
        valor: totalParaParcelas,
        dataVencimento: dataPedidoBR
      };
      if (formaPagamentoId) {
        obj.formaPagamento = { id: formaPagamentoId };
      }
      return [obj];
    })(),
    transporte: {
      fretePorConta: 0,
      frete: freteVal,
      volumes: [
        {
          servico: transportName,
          peso: {
            bruto: Number(finalPeso.toFixed(3)),
            liquido: Number(finalPeso.toFixed(3))
          }
        }
      ],
      enderecoEntrega: {
        nome: pedido.cliente_nome || 'Cliente Consumidor',
        endereco: rua.substring(0, 120),
        numero: numero.substring(0, 20),
        bairro: bairro.substring(0, 120),
        municipio: (pedido.cidade || 'Não informado').substring(0, 120),
        uf: (pedido.estado || 'SP').substring(0, 2),
        cep: cep
      }
    },
    observacoes: pedido.observacoes || ''
  };
};

export const blingService = {
  async sendPedidoToBling(pedidoOrId) {
    const pedidoId = typeof pedidoOrId === 'string' ? pedidoOrId : pedidoOrId?.id;
    return this.processarEnvioPedidoBling(pedidoId);
  },

  async processarEnvioPedidoBling(pedidoId) {
    try {
      const pedido = await pb.collection('pedidos').getOne(pedidoId, { $autoCancel: false });

      let userCpf = '';
      if (pedido.cliente_id) {
        try {
          const user = await pb.collection('users').getOne(pedido.cliente_id, { $autoCancel: false });
          userCpf = user.cpf || '';
        } catch (errUser) {
          logger.warn(`[BlingService] Não foi possível carregar o CPF do usuário ${pedido.cliente_id}: ${errUser.message}`);
        }
      }

      const blingApiToken = await getBlingToken();
      const formattedPedido = formatPedidoForBling(pedido, userCpf);
      const contatoInfo = formattedPedido.contato;

      const rawCpfCnpj = (contatoInfo.numeroDocumento || '').replace(/[^\d]/g, '');
      const isCpfCnpjValid = (rawCpfCnpj.length === 11 && isValidCPF(rawCpfCnpj)) ||
                             (rawCpfCnpj.length === 14 && isValidCNPJ(rawCpfCnpj));
      const cpfCnpj = isCpfCnpjValid ? rawCpfCnpj : null;

      if (!isCpfCnpjValid && rawCpfCnpj) {
        logger.warn(`[BlingService] Documento '${rawCpfCnpj}' no pedido ${pedido.numero_pedido} possui erro de digitação/dígitos verificadores. Criando contato no Bling sem documento para não travar a venda.`);
        formattedPedido.observacoes = (formattedPedido.observacoes || '') + ` [ATENÇÃO: CPF informado no checkout (${rawCpfCnpj}) continha erro de dígitos verificadores. Confirmar com o cliente antes de emitir a NF-e.]`;
      }

      let blingClienteId;

      if (cpfCnpj) {
        try {
          const searchContact = await axios.get(`https://api.bling.com.br/Api/v3/contatos?numeroDocumento=${cpfCnpj}`, {
            headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' },
          });
          if (searchContact.data?.data?.length > 0) blingClienteId = searchContact.data.data[0].id;
        } catch (errDocSearch) {
          logger.warn(`[BlingService] Erro ao pesquisar contato por documento: ${errDocSearch.message}`);
        }
      } else if (contatoInfo.nome) {
        try {
          const searchContact = await axios.get(`https://api.bling.com.br/Api/v3/contatos?pesquisa=${encodeURIComponent(contatoInfo.nome)}`, {
            headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' },
          });
          if (searchContact.data?.data?.length > 0) blingClienteId = searchContact.data.data[0].id;
        } catch (errNameSearch) {
          logger.warn(`[BlingService] Erro ao pesquisar contato por nome: ${errNameSearch.message}`);
        }
      }

      if (!blingClienteId) {
        const createContact = await axios.post('https://api.bling.com.br/Api/v3/contatos', {
          nome: contatoInfo.nome,
          tipo: (cpfCnpj && cpfCnpj.length === 14) ? 'J' : 'F',
          situacao: 'A',
          contribuinte: 9,
          numeroDocumento: cpfCnpj || undefined,
          email: contatoInfo.email || undefined,
          telefone: contatoInfo.telefone || undefined,
          endereco: {
            geral: {
              endereco: formattedPedido.transporte.enderecoEntrega.endereco,
              numero: formattedPedido.transporte.enderecoEntrega.numero,
              bairro: formattedPedido.transporte.enderecoEntrega.bairro,
              cep: formattedPedido.transporte.enderecoEntrega.cep,
              municipio: formattedPedido.transporte.enderecoEntrega.municipio,
              uf: formattedPedido.transporte.enderecoEntrega.uf
            }
          }
        }, {
          headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Content-Type': 'application/json' },
        });
        if (createContact.data?.data) blingClienteId = createContact.data.data.id;
      }

      if (!blingClienteId) throw new Error('Falha ao identificar ou cadastrar cliente no Bling');

      formattedPedido.contato = { 
        id: blingClienteId
      };
      if (cpfCnpj) {
        formattedPedido.contato.numeroDocumento = cpfCnpj;
      }

      for (const item of formattedPedido.itens) {
        item.valor = Number(item.valor || 0);
        
        if (!item.codigo && item.variacao_id) {
          try {
            const variation = await pb.collection('variacoes').getOne(item.variacao_id);
            item.codigo = variation.sku;
          } catch (err) {
            logger.warn(`Não foi possível resolver SKU no processamento automático: ${err.message}`);
          }
        }

        if (item.codigo) {
          try {
            const searchProd = await axios.get(`https://api.bling.com.br/Api/v3/produtos?codigo=${encodeURIComponent(item.codigo)}`, {
              headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' }
            });
            if (searchProd.data?.data?.length > 0) {
              item.produto = { id: searchProd.data.data[0].id };
              delete item.codigo;
              delete item.descricao;
            }
          } catch(err) {
            logger.warn(`Não achou o SKU ${item.codigo} no Bling ao montar o pedido. Vai tentar enviar sem ID interno.`);
          }
        }
      }

      const response = await axios.post('https://api.bling.com.br/Api/v3/pedidos/vendas', formattedPedido, {
        headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Content-Type': 'application/json' },
      });

      const blingPedidoId = response.data?.data?.id;
      
      if (blingPedidoId) {
        await pb.collection('pedidos').update(pedido.id, { bling_pedido_id: String(blingPedidoId) });
        logger.info(`[BlingService] Pedido ${pedido.numero_pedido} enviado automaticamente via serviço.`);
      }

      return { sucesso: true, bling_pedido_id: blingPedidoId };

    } catch (error) {
      const errMsg = getBlingErrorMessage(error);
      if (errMsg.includes('Informações idênticas') || errMsg.includes('já cadastrado')) {
        logger.info(`[BlingService] Pedido já existia no Bling (duplicado): ${errMsg}. Tratando como sucesso.`);
        await pb.collection('pedidos').update(pedidoId, { bling_pedido_id: 'sincronizado' }).catch(() => {});
        return { sucesso: true, mensagem: 'Este pedido já foi integrado ao Bling com sucesso!', duplicado: true };
      }
      logger.error(`[BlingService] Erro ao enviar pedido ao Bling: ${errMsg}`);
      throw new Error(errMsg);
    }
  }
};