const http = require('http');

const orderPayload = {
  // Try sending the payload that the frontend actually sends currently
  cliente_id: "", // Empty ID since guest user creation might fail if API rule is strict
  cliente_nome: "Test Diagnostico",
  cliente_email: "test_error_diag@example.com",
  cliente_telefone: "11999999999",
  cpf: "12345678901",
  data_pedido: new Date().toISOString(),
  numero_pedido: `PED-${Date.now().toString().slice(-6)}`,
  valor_total: 100,
  valor_desconto: 0,
  valor_frete: 0,
  subtotal: 100,
  endereco_entrega: "Rua Teste, 123 - Bairro",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01001000",
  endereco_faturamento: "Rua Teste, 123 - Bairro",
  metodo_pagamento: "credito",
  itens: [{ id: 'abc', variacao_id: 'def', nome: 'Test', quantidade: 1, preco: 100 }],
  status: "pendente"
};

const data = JSON.stringify(orderPayload);

const options = {
  hostname: 'localhost',
  port: 8090,
  path: '/api/collections/pedidos/records',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => console.log('HTTP Status:', res.statusCode, '\nResponse:', body));
});

req.on('error', (e) => console.error('Request Error:', e));
req.write(data);
req.end();
