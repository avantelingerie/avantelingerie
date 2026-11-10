import http from 'http';
import express from 'express';
import webhooksRouter from '../apps/api/src/routes/webhooks.js';

const app = express();
app.use(express.json());
app.use('/webhooks', webhooksRouter);

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    console.log('--- TEST 1: Meta Handshake Verification (GET) ---');
    const challengeCode = '1158201444';
    const getRes = await fetch(`${baseUrl}/webhooks/instagram?hub.mode=subscribe&hub.challenge=${challengeCode}&hub.verify_token=avante_lia_instagram_webhook_2026`);
    const getText = await getRes.text();

    if (getRes.status === 200 && getText === challengeCode) {
      console.log('✅ TEST 1 PASSED: Meta Handshake responded with 200 and exact challenge code!');
    } else {
      console.error('❌ TEST 1 FAILED:', getRes.status, getText);
      server.close();
      process.exit(1);
    }

    console.log('--- TEST 2: Handshake Security Rejection on Invalid Token ---');
    const badRes = await fetch(`${baseUrl}/webhooks/instagram?hub.mode=subscribe&hub.challenge=${challengeCode}&hub.verify_token=wrong_token`);

    if (badRes.status === 403) {
      console.log('✅ TEST 2 PASSED: Invalid verify token was properly rejected with 403 Forbidden!');
    } else {
      console.error('❌ TEST 2 FAILED:', badRes.status);
      server.close();
      process.exit(1);
    }

    console.log('--- TEST 3: Incoming Message Event (POST) ---');
    const postRes = await fetch(`${baseUrl}/webhooks/instagram`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        object: 'instagram',
        entry: [
          {
            id: '17841421480843011',
            time: Date.now(),
            messaging: [
              {
                sender: { id: '999888777' },
                recipient: { id: '17841421480843011' },
                message: {
                  mid: 'm_test_123',
                  text: 'Olá, tem conjunto de renda tamanho G?'
                }
              }
            ]
          }
        ]
      })
    });
    const postText = await postRes.text();

    if (postRes.status === 200 && postText === 'EVENT_RECEIVED') {
      console.log('✅ TEST 3 PASSED: Event received acknowledged immediately with 200 EVENT_RECEIVED!');
    } else {
      console.error('❌ TEST 3 FAILED:', postRes.status, postText);
      server.close();
      process.exit(1);
    }

    console.log('🎉 TODOS OS TESTES UNITÁRIOS DO WEBHOOK PASSARAM COM SUCESSO!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Erro nos testes:', err);
    server.close();
    process.exit(1);
  }
});
