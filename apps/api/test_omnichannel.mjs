import pb from './src/utils/pocketbaseClient.js';
import axios from 'axios';

// 1. Teste das funções de formatação
function formatResponseForMeta(text) {
  if (!text) return text;
  let formatted = text.replace(/\[([^\]]+)\]\(\/([^\)]+)\)/g, '$1: https://avantelingerie.com.br/$2');
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '$1: $2');
  return formatted;
}

const processedMetaMessageIds = new Set();
function isMetaMessageDuplicated(mid) {
  if (!mid) return false;
  if (processedMetaMessageIds.has(mid)) return true;
  processedMetaMessageIds.add(mid);
  return false;
}

async function runOmnichannelTests() {
  console.log('====================================================');
  console.log('🧪 BATERIA DE TESTES EMPÍRICOS: LIA OMNICHANNEL (META)');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // Teste 1: Formatação de Links para Redes Sociais
  console.log('--- TESTE 1: Formatação de links Markdown para Meta ---');
  const sample1 = 'Olá! Acesse [Entrar na Conta](/login) para ver os preços de atacado.';
  const res1 = formatResponseForMeta(sample1);
  const expected1 = 'Olá! Acesse Entrar na Conta: https://avantelingerie.com.br/login para ver os preços de atacado.';
  if (res1 === expected1) {
    console.log('✅ Teste 1.1 (Link Relativo): Passou!');
    passed++;
  } else {
    console.error('❌ Teste 1.1 Falhou. Obtido:', res1);
    failed++;
  }

  const sample2 = 'Conheça o [Conjunto Romântico](https://avantelingerie.com.br/produto/novidade-4-0).';
  const res2 = formatResponseForMeta(sample2);
  const expected2 = 'Conheça o Conjunto Romântico: https://avantelingerie.com.br/produto/novidade-4-0.';
  if (res2 === expected2) {
    console.log('✅ Teste 1.2 (Link Absoluto): Passou!');
    passed++;
  } else {
    console.error('❌ Teste 1.2 Falhou. Obtido:', res2);
    failed++;
  }

  // Teste 2: Deduplicação de Mensagens (Prevenção de Loops e Retries da Meta)
  console.log('\n--- TESTE 2: Deduplicação de Mensagens (isMetaMessageDuplicated) ---');
  const midTest = 'mid.test.123456789';
  const firstCheck = isMetaMessageDuplicated(midTest);
  const secondCheck = isMetaMessageDuplicated(midTest);
  if (!firstCheck && secondCheck) {
    console.log('✅ Teste 2 (Deduplicação): Primeira passada permitida, segunda duplicata bloqueada!');
    passed++;
  } else {
    console.error('❌ Teste 2 Falhou:', { firstCheck, secondCheck });
    failed++;
  }

  // Teste 3: Handshake em Produção (Live Endpoint Test)
  console.log('\n--- TESTE 3: Verificação de Handshake Meta (Live Endpoint) ---');
  try {
    const handshakeRes = await axios.get('https://avantelingerie.com.br/hcgi/api/webhooks/instagram', {
      params: {
        'hub.mode': 'subscribe',
        'hub.verify_token': 'avante_lia_instagram_webhook_2026',
        'hub.challenge': 'challenge_token_empirico_777'
      },
      timeout: 10000
    });
    if (handshakeRes.status === 200 && handshakeRes.data === 'challenge_token_empirico_777') {
      console.log('✅ Teste 3 (Handshake): Resposta 200 OK com challenge correto retornado!');
      passed++;
    } else {
      console.error('❌ Teste 3 Falhou. Status:', handshakeRes.status, 'Data:', handshakeRes.data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Teste 3 Erro de Rede:', err.message);
    failed++;
  }

  // Teste 4: Consulta de Token Meta no PocketBase
  console.log('\n--- TESTE 4: Validação do Token de Acesso da Meta no PB ---');
  try {
    const configs = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "instagram" && chave_nome = "access_token" && ativo = true'
    });
    if (configs.length > 0 && configs[0].chave_valor.startsWith('EAA')) {
      console.log('✅ Teste 4 (Token PB): Token Meta presente e ativo! Prefixo:', configs[0].chave_valor.substring(0, 8));
      passed++;
    } else {
      console.error('❌ Teste 4 Falhou: Token não encontrado ou inativo.');
      failed++;
    }
  } catch (err) {
    console.error('❌ Teste 4 Erro:', err.message);
    failed++;
  }

  // Teste 5: Chamada Real ao Cérebro da Lia para Canal Instagram Direct
  console.log('\n--- TESTE 5: Teste Real da Lia via Anthropic (Canal Instagram) ---');
  try {
    const testSessionId = `ig_test_${Date.now()}`;
    const liaApiRes = await axios.post('https://avantelingerie.com.br/hcgi/api/lia/chat', {
      session_id: testSessionId,
      mensagem: 'Olá, sou revendedora de lingerie e quero saber como funciona o atacado de vocês!',
      canal: 'instagram',
      contexto: {
        canal: 'instagram',
        meta_user_id: 'test_user_ig_999'
      }
    }, { timeout: 20000 });

    if (liaApiRes.data && liaApiRes.data.sucesso && liaApiRes.data.resposta) {
      console.log('✅ Teste 5 (Lia Instagram): Resposta gerada com sucesso!');
      console.log('   💬 Resposta da Lia:', liaApiRes.data.resposta);
      const formatted = formatResponseForMeta(liaApiRes.data.resposta);
      console.log('   📱 Formatada para o Direct:', formatted);
      passed++;

      // Limpar conversa de teste do PB
      try {
        const testRecords = await pb.collection('lia_conversas').getFullList({
          filter: `session_id = "${testSessionId}"`
        });
        for (const rec of testRecords) {
          await pb.collection('lia_conversas').delete(rec.id);
        }
        console.log('   🧹 Sessão de teste limpa no banco com sucesso.');
      } catch (e) {}
    } else {
      console.error('❌ Teste 5 Falhou:', liaApiRes.data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Teste 5 Erro:', err.response?.data || err.message);
    failed++;
  }

  // Teste 6: Chamada Real ao Cérebro da Lia para Canal Facebook Messenger
  console.log('\n--- TESTE 6: Teste Real da Lia via Anthropic (Canal Messenger) ---');
  try {
    const testSessionId = `fb_test_${Date.now()}`;
    const liaApiRes = await axios.post('https://avantelingerie.com.br/hcgi/api/lia/chat', {
      session_id: testSessionId,
      mensagem: 'Boa tarde, qual é o valor mínimo de compra na fábrica?',
      canal: 'messenger',
      contexto: {
        canal: 'messenger',
        meta_user_id: 'test_user_fb_888'
      }
    }, { timeout: 20000 });

    if (liaApiRes.data && liaApiRes.data.sucesso && liaApiRes.data.resposta) {
      console.log('✅ Teste 6 (Lia Messenger): Resposta gerada com sucesso!');
      console.log('   💬 Resposta da Lia:', liaApiRes.data.resposta);
      const formatted = formatResponseForMeta(liaApiRes.data.resposta);
      console.log('   📱 Formatada para o Messenger:', formatted);
      passed++;

      // Limpar conversa de teste do PB
      try {
        const testRecords = await pb.collection('lia_conversas').getFullList({
          filter: `session_id = "${testSessionId}"`
        });
        for (const rec of testRecords) {
          await pb.collection('lia_conversas').delete(rec.id);
        }
        console.log('   🧹 Sessão de teste limpa no banco com sucesso.');
      } catch (e) {}
    } else {
      console.error('❌ Teste 6 Falhou:', liaApiRes.data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Teste 6 Erro:', err.response?.data || err.message);
    failed++;
  }

  // Teste 7: Parser de Payload Unificado (Instagram entry.changes vs Facebook entry.messaging)
  console.log('\n--- TESTE 7: Parser de Payloads Híbridos (entry.messaging + entry.changes) ---');
  function extractEventsFromEntry(entry) {
    let messagingEvents = [];
    if (Array.isArray(entry.messaging) && entry.messaging.length > 0) {
      messagingEvents = entry.messaging;
    } else if (Array.isArray(entry.changes) && entry.changes.length > 0) {
      for (const change of entry.changes) {
        if (change.value) {
          messagingEvents.push(change.value);
        }
      }
    }
    return messagingEvents;
  }

  // Simulação Facebook
  const fbEntry = { id: 'fb_page_123', messaging: [{ sender: { id: 'user_fb_1' }, message: { text: 'Oi pelo Messenger' } }] };
  const fbEvents = extractEventsFromEntry(fbEntry);
  if (fbEvents.length === 1 && fbEvents[0].message.text === 'Oi pelo Messenger') {
    console.log('✅ Teste 7.1 (Formato Facebook messaging): Extraído com sucesso!');
    passed++;
  } else {
    console.error('❌ Teste 7.1 Falhou:', fbEvents);
    failed++;
  }

  // Simulação Instagram Graph API
  const igEntry = {
    id: '17841421480843011',
    changes: [
      {
        field: 'messages',
        value: {
          sender: { id: 'user_ig_esposa_1' },
          recipient: { id: '17841421480843011' },
          message: { mid: 'mid.ig.esposa.1', text: 'Boa tarde Lia!' }
        }
      }
    ]
  };
  const igEvents = extractEventsFromEntry(igEntry);
  if (igEvents.length === 1 && igEvents[0].message.text === 'Boa tarde Lia!') {
    console.log('✅ Teste 7.2 (Formato Instagram changes): Extraído com sucesso!');
    passed++;
  } else {
    console.error('❌ Teste 7.2 Falhou:', igEvents);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`📊 RESUMO DOS TESTES: ${passed} PASSARAM / ${failed} FALHARAM`);
  console.log('====================================================');
}

runOmnichannelTests();
