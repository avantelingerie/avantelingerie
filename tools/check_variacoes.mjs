import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function checkVariacoes() {
  try {
    const varCol = await pb.collections.getOne('variacoes');
    console.log('Campos de variacoes:', (varCol.fields || varCol.schema).map(f => `${f.name} (${f.type})`));

    const sample = await pb.collection('variacoes').getList(1, 5);
    console.log('Exemplos de variacoes:', sample.items);
  } catch (err) {
    console.error('Erro ao verificar variacoes:', err.message);
  }
}

checkVariacoes();
