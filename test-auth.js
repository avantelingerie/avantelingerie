const http = require('http');

const data = JSON.stringify({
  identity: 'admin@avantelingerie.com.br',
  password: 'Admin@123456'
});

const req = http.request({
  hostname: '127.0.0.1',
  port: 8090,
  path: '/api/collections/usuarios/auth-with-password',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(`Status: ${res.statusCode}, Body: ${body}`));
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
