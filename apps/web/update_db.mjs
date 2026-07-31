import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

async function run() {
  try {
    await pb.collection('usuarios').authWithPassword('admin@avantelingerie.com.br', 'Admin@123456', { $autoCancel: false });
    const records = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
    const newData = {
        endereco_completo: 'Rua Odenir Pinheiro, nº 20 - 3º Andar, Loteamento Nosso Sonho - Olaria, Nova Friburgo, RJ - CEP: 28623-620',
        retirada_horario: 'Segunda à Quinta: 8h às 17h, Sexta: 8h às 13h'
    };
    if(records.length > 0) {
      await pb.collection('configuracoes_estoque').update(records[0].id, newData, { $autoCancel: false });
      console.log('Database updated successfully!');
    } else {
      await pb.collection('configuracoes_estoque').create(newData, { $autoCancel: false });
      console.log('Database record created successfully!');
    }
  } catch(e) {
    console.error(e.response || e.message);
  }
}
run();
