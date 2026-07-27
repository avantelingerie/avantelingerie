const https = require('https');

const data = JSON.stringify({
  email: 'test_error_diag@example.com',
  name: 'Test Diagnostico',
  password: 'password123',
  passwordConfirm: 'password123',
  cpf: '12345678901'
});

const options = {
  hostname: 'avante-lingerie.pockethost.io',
  path: '/api/collections/users/records',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
