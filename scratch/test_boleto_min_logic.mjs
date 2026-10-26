import pb from '../apps/api/src/utils/pocketbaseClient.js';
import dotenv from 'dotenv';
dotenv.config({ path: './apps/api/.env' });

async function runTest() {
  console.log('--- TESTE AUTOMATIZADO DA REGRA DE BOLETO E VALOR MÍNIMO ---');
  await pb.collection('_superusers').authWithPassword(
    process.env.PB_SUPERUSER_EMAIL,
    process.env.PB_SUPERUSER_PASSWORD
  );

  const records = await pb.collection('integracoes_config').getFullList({
    filter: 'chave_nome = "boleto_ativo" || chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_valor_minimo"',
    $autoCancel: false,
  });

  const activeRec = records.find(r => r.chave_nome === 'boleto_ativo');
  const daysRec = records.find(r => r.chave_nome === 'boleto_vencimento_dias');
  const minRec = records.find(r => r.chave_nome === 'boleto_valor_minimo');

  const isBoletoActive = activeRec ? activeRec.chave_valor === 'true' : true;
  const boletoVencimentoDias = daysRec ? parseInt(daysRec.chave_valor, 10) : 3;
  const boletoValorMinimo = minRec ? parseFloat(minRec.chave_valor) : 59.90;

  console.log(`Configurações Ativas no PocketBase:`);
  console.log(`- Boleto Ativo: ${isBoletoActive}`);
  console.log(`- Vencimento: ${boletoVencimentoDias} dias`);
  console.log(`- Valor Mínimo: R$ ${boletoValorMinimo.toFixed(2)}`);

  // Simulação Cenário 1: Camisola Bicolor avulsa (R$ 38,88)
  const cartSubtotal1 = 38.88;
  const isAvailableCenario1 = isBoletoActive && (cartSubtotal1 >= boletoValorMinimo);
  console.log(`\nCenário 1 (Carrinho: R$ ${cartSubtotal1.toFixed(2)}):`);
  console.log(`- Boleto liberado no Checkout? ${isAvailableCenario1 ? 'SIM (FALHA)' : 'NÃO (CORRETO - Abaixo do mínimo de R$ ' + boletoValorMinimo.toFixed(2) + ')'}`);

  // Simulação Cenário 2: 2 Peças no carrinho (R$ 77,76)
  const cartSubtotal2 = 77.76;
  const isAvailableCenario2 = isBoletoActive && (cartSubtotal2 >= boletoValorMinimo);
  console.log(`\nCenário 2 (Carrinho: R$ ${cartSubtotal2.toFixed(2)}):`);
  console.log(`- Boleto liberado no Checkout? ${isAvailableCenario2 ? 'SIM (CORRETO - Atingiu o mínimo de R$ ' + boletoValorMinimo.toFixed(2) + ')' : 'NÃO (FALHA)'}`);

  if (!isAvailableCenario1 && isAvailableCenario2) {
    console.log('\n>>> SUCESSO: Todos os testes lógicos de corte e validação foram aprovados com louvor! <<<');
  } else {
    console.error('\n>>> FALHA nos testes lógicos. <<<');
    process.exit(1);
  }
}

runTest();
