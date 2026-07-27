const http = require('http');

const data = JSON.stringify({
  email: 'test_create_guest@example.com',
  name: 'Test Guest',
  password: 'password123',
  passwordConfirm: 'password123',
  whatsapp: '11999999999',
  cpf: '12345678901', // old code included cpf? Or new code did. Let's include it.
  tipo_cliente: 'varejo'
});

const options = {
  hostname: 'localhost',
  port: 8090,
  path: '/api/collections/users/records',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => console.log('Users HTTP Status:', res.statusCode, '\nResponse:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
