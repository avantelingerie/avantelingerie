import assert from 'node:assert';

function checkCanLocalPickup(toCep, cidade) {
  const cleanToCep = (toCep || '').replace(/\D/g, '');
  const toCepNum = parseInt(cleanToCep, 10);
  const isFriburgoCep = toCepNum >= 28600000 && toCepNum <= 28636999;
  const isFriburgoCity = typeof cidade === 'string' && cidade.toLowerCase().includes('friburgo');
  const isOtherCityExplicit = typeof cidade === 'string' && !cidade.toLowerCase().includes('friburgo');

  return (isFriburgoCep && !isOtherCityExplicit) || isFriburgoCity;
}

console.log('🧪 Iniciando testes de validação de elegibilidade para Retirada no Local...');

// 1. Rio de Janeiro (CEP do usuário no chamado: 21921-110)
const resRio = checkCanLocalPickup('21921-110');
assert.strictEqual(resRio, false, 'CEP 21921-110 (Rio de Janeiro) NÃO pode ter opção de Retirada no Local');
console.log('✅ Teste 1 Aprovado: CEP 21921-110 (Rio de Janeiro) bloqueado para Retirada no Local.');

// 2. Nova Friburgo - Fábrica (28623-620)
const resFriburgoFabrica = checkCanLocalPickup('28623-620');
assert.strictEqual(resFriburgoFabrica, true, 'CEP 28623-620 (Nova Friburgo) DEVE ter opção de Retirada no Local');
console.log('✅ Teste 2 Aprovado: CEP 28623-620 (Nova Friburgo - Fábrica) liberado para Retirada no Local.');

// 3. Nova Friburgo - Centro (28610-000)
const resFriburgoCentro = checkCanLocalPickup('28610-000');
assert.strictEqual(resFriburgoCentro, true, 'CEP 28610-000 (Nova Friburgo) DEVE ter opção de Retirada no Local');
console.log('✅ Teste 3 Aprovado: CEP 28610-000 (Nova Friburgo - Centro) liberado para Retirada no Local.');

// 4. Nova Friburgo - Distrito de Lumiar (28616-972)
const resFriburgoLumiar = checkCanLocalPickup('28616-972');
assert.strictEqual(resFriburgoLumiar, true, 'CEP 28616-972 (Lumiar / Nova Friburgo) DEVE ter opção de Retirada no Local');
console.log('✅ Teste 4 Aprovado: CEP 28616-972 (Nova Friburgo - Lumiar) liberado para Retirada no Local.');

// 5. Bom Jardim - Cidade vizinha (28660-000)
const resBomJardim = checkCanLocalPickup('28660-000');
assert.strictEqual(resBomJardim, false, 'CEP 28660-000 (Bom Jardim) NÃO pode ter opção de Retirada no Local');
console.log('✅ Teste 5 Aprovado: CEP 28660-000 (Bom Jardim) bloqueado para Retirada no Local.');

// 6. São Paulo (01310-100)
const resSP = checkCanLocalPickup('01310-100');
assert.strictEqual(resSP, false, 'CEP 01310-100 (São Paulo) NÃO pode ter opção de Retirada no Local');
console.log('✅ Teste 6 Aprovado: CEP 01310-100 (São Paulo) bloqueado para Retirada no Local.');

// 7. Checkout com cidade explícita Rio de Janeiro
const resCheckoutRio = checkCanLocalPickup('21921-110', 'Rio de Janeiro');
assert.strictEqual(resCheckoutRio, false, 'Cidade explícita Rio de Janeiro NÃO pode ter Retirada no Local');
console.log('✅ Teste 7 Aprovado: Cidade explícita Rio de Janeiro bloqueada com sucesso.');

// 8. Checkout com cidade explícita Nova Friburgo
const resCheckoutFriburgo = checkCanLocalPickup('28623-620', 'Nova Friburgo');
assert.strictEqual(resCheckoutFriburgo, true, 'Cidade explícita Nova Friburgo DEVE ter Retirada no Local');
console.log('✅ Teste 8 Aprovado: Cidade explícita Nova Friburgo liberada com sucesso.');

console.log('\n🎉 TODOS OS 8 TESTES DE FRETE E RETIRADA PASSARAM COM 100% DE SUCESSO!');
