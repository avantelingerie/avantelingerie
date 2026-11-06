const PocketBase = require('pocketbase/cjs');
const axios = require('axios');

async function testSendBling() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  // We can call the backend API endpoint /bling/pedidos/reenviar directly to see the response
  const response = await fetch('https://avantelingerie.com.br/hcgi/api/bling/pedidos/reenviar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pedido_id: 'bpdkc91gss1ptu8' })
  });

  const resJson = await response.json();
  console.log('Status HTTP:', response.status);
  console.log('Resultado:', resJson);
}

testSendBling().catch(console.error);
