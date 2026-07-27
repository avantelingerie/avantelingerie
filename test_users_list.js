const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8090,
  path: '/api/collections/users/records?filter=email="test_create_guest@example.com"',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => console.log('HTTP Status:', res.statusCode, '\nResponse:', body));
});

req.on('error', (e) => console.error(e));
req.end();
