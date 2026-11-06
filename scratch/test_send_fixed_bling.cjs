const PocketBase = require('pocketbase/cjs');
const axios = require('axios');

function isValidCPF(cpf) {
  cpf = (cpf || '').replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0, rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
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
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0; pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;
  return true;
}

async function testSimulateBling() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  const tokenRecord = await pb.collection('bling_tokens').getFirstListItem('', { sort: '-created' });
  const blingApiToken = tokenRecord.access_token;

  const pedido = await pb.collection('pedidos').getFirstListItem('numero_pedido="PED-005"');
  console.log('Cliente:', pedido.cliente_nome, 'CPF:', pedido.cpf);
  console.log('CPF é válido?', isValidCPF(pedido.cpf));

  // Search contact in Bling by name or email
  let blingClienteId = null;
  const searchName = await axios.get(`https://api.bling.com.br/Api/v3/contatos?pesquisa=${encodeURIComponent(pedido.cliente_nome)}`, {
    headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' }
  });
  if (searchName.data?.data?.length > 0) {
    blingClienteId = searchName.data.data[0].id;
    console.log('Encontrou contato existente no Bling:', blingClienteId);
  }

  // Format order payload for Bling
  const dataPedidoBR = '2026-11-06';
  const formattedPedido = {
    numeroLoja: pedido.numero_pedido,
    data: dataPedidoBR,
    contato: {
      id: blingClienteId
    },
    desconto: {
      valor: Number(pedido.valor_desconto || 0)
    },
    itens: [
      {
        produto: { id: 16705050367 },
        quantidade: 1,
        valor: 15.67
      },
      {
        produto: { id: 16705050382 },
        quantidade: 1,
        valor: 15.67
      },
      {
        produto: { id: 16718478031 },
        quantidade: 1,
        valor: 28.28
      }
    ],
    parcelas: [
      {
        valor: pedido.valor_total,
        dataVencimento: dataPedidoBR,
        formaPagamento: { id: 10033474 } // PIX
      }
    ],
    transporte: {
      fretePorConta: 0,
      frete: pedido.valor_frete || 0,
      volumes: [
        {
          servico: pedido.forma_envio || 'Loggi Loggi Ponto',
          peso: { bruto: 0.3, liquido: 0.3 }
        }
      ],
      enderecoEntrega: {
        nome: pedido.cliente_nome,
        endereco: 'Rua Carlos Vicente Zapxon',
        numero: '1224',
        bairro: 'Costeira',
        municipio: 'Araucária',
        uf: 'PR',
        cep: '83709150'
      }
    },
    observacoes: `[ATENÇÃO: CPF informado no checkout (${pedido.cpf}) continha erro de digitação nos dígitos verificadores. Confirmar com a cliente antes de emitir a NF-e.]`
  };

  console.log('Enviando pedido de venda para o Bling...');
  try {
    const res = await axios.post('https://api.bling.com.br/Api/v3/pedidos/vendas', formattedPedido, {
      headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Content-Type': 'application/json' }
    });
    console.log('Sucesso Bling Venda:', res.data);
  } catch (err) {
    console.log('Erro Bling:', JSON.stringify(err.response?.data || err.message, null, 2));
  }
}

testSimulateBling().catch(console.error);
