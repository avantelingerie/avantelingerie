import webhooksRouter from '../apps/api/src/routes/webhooks.js';

function createMockReqRes({ method, url, query = {}, body = {} }) {
  const req = {
    method,
    url,
    query,
    body,
    protocol: 'http',
    get: (header) => (header === 'host' ? '127.0.0.1:3001' : null)
  };

  let statusCode = 200;
  let sentData = null;

  const res = {
    status(code) {
      statusCode = code;
      return res;
    },
    send(data) {
      sentData = data;
      return res;
    },
    json(data) {
      sentData = data;
      return res;
    }
  };

  return { req, res, getResult: () => ({ status: statusCode, data: sentData }) };
}

async function runMockTests() {
  console.log('--- TEST 1: Meta Handshake Verification (GET) ---');
  const getRoute = webhooksRouter.stack.find(s => s.route && s.route.path === '/instagram' && s.route.methods.get);
  if (!getRoute) {
    throw new Error('GET /instagram route not found in webhooksRouter');
  }

  const challengeCode = '1158201444';
  const { req: req1, res: res1, getResult: getRes1 } = createMockReqRes({
    method: 'GET',
    url: '/instagram',
    query: {
      'hub.mode': 'subscribe',
      'hub.challenge': challengeCode,
      'hub.verify_token': 'avante_lia_instagram_webhook_2026'
    }
  });

  getRoute.route.stack[0].handle(req1, res1);
  const result1 = getRes1();

  if (result1.status === 200 && result1.data === challengeCode) {
    console.log('✅ TEST 1 PASSED: Handshake returned 200 and challenge string!');
  } else {
    console.error('❌ TEST 1 FAILED:', result1);
    process.exit(1);
  }

  console.log('--- TEST 2: Handshake Security Rejection (GET with wrong token) ---');
  const { req: req2, res: res2, getResult: getRes2 } = createMockReqRes({
    method: 'GET',
    url: '/instagram',
    query: {
      'hub.mode': 'subscribe',
      'hub.challenge': challengeCode,
      'hub.verify_token': 'wrong_secret_token'
    }
  });

  getRoute.route.stack[0].handle(req2, res2);
  const result2 = getRes2();

  if (result2.status === 403 && result2.data === 'Forbidden') {
    console.log('✅ TEST 2 PASSED: Wrong verify token blocked with 403 Forbidden!');
  } else {
    console.error('❌ TEST 2 FAILED:', result2);
    process.exit(1);
  }

  console.log('--- TEST 3: Incoming Event Acknowledgment (POST) ---');
  const postRoute = webhooksRouter.stack.find(s => s.route && s.route.path === '/instagram' && s.route.methods.post);
  if (!postRoute) {
    throw new Error('POST /instagram route not found in webhooksRouter');
  }

  const { req: req3, res: res3, getResult: getRes3 } = createMockReqRes({
    method: 'POST',
    url: '/instagram',
    body: {
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
    }
  });

  await postRoute.route.stack[0].handle(req3, res3);
  const result3 = getRes3();

  if (result3.status === 200 && result3.data === 'EVENT_RECEIVED') {
    console.log('✅ TEST 3 PASSED: POST immediately acknowledged with 200 EVENT_RECEIVED!');
  } else {
    console.error('❌ TEST 3 FAILED:', result3);
    process.exit(1);
  }

  console.log('🎉 TODOS OS TESTES MOCK DO WEBHOOK FORAM APROVADOS COM 100% DE SUCESSO!');
  process.exit(0);
}

runMockTests().catch(err => {
  console.error('Falha nos testes mock:', err);
  process.exit(1);
});
