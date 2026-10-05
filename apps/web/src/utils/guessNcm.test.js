import { guessNcm } from './guessNcm.js';

const testCases = [
  // Casos nulos e vazios (Sem crash)
  { input: '', expected: '' },
  { input: undefined, expected: '' },
  { input: null, expected: '' },
  { input: '   ', expected: '' },

  // Prevenção de Falsos Positivos
  { input: 'Arrenda Lingerie', expected: '' },
  { input: 'Shortsa Algodao', expected: '' },

  // Sleepwear Sintético (Suede, Renda, etc)
  { input: 'Pijama Feminino Short Doll Suede Confortável Tecido Leve e Macio Fresquinho', expected: '6108.32.00' },
  { input: 'Camisola Noite Sensual com Renda Bicolor', expected: '6108.32.00' },

  // Sleepwear Algodão
  { input: 'Pijama Longo 100% Algodao Conforto', expected: '6208.21.00' },

  // Sutiãs e Conjuntos
  { input: 'Conjunto Marido Apressado Renda Premium', expected: '6212.10.00' },
  { input: 'Sutiã Rendado com Bojo Macio', expected: '6212.10.00' },

  // Calcinhas e Cintas
  { input: 'Calcinha Cinta Modeladora Cós Alto com Renda Avante Lingerie', expected: '6212.20.00' },

  // Bodys
  { input: 'Body rendado com abertura marido apressado Lingerie Sexy', expected: '6114.30.00' },

  // Moda Praia
  { input: 'Biquini Cortininha Moda Praia', expected: '6112.41.00' }
];

let failed = 0;
testCases.forEach(({ input, expected }, idx) => {
  const result = guessNcm(input);
  if (result === expected) {
    console.log(`[PASS] #${idx + 1}: "${input}" => "${result}"`);
  } else {
    console.error(`[FAIL] #${idx + 1}: "${input}" => Recebeu "${result}", esperava "${expected}"`);
    failed++;
  }
});

if (failed === 0) {
  console.log('\nTodos os testes passaram com 100% de sucesso!');
} else {
  console.error(`\n${failed} testes falharam.`);
}
