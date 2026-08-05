import 'dotenv/config';
import Pocketbase from 'pocketbase';
const pb = new Pocketbase('http://localhost:8090');

async function run() {
  try {
    await pb.collection('_superusers').authWithPassword(process.env.PB_SUPERUSER_EMAIL || 'admin@avantelingerie.com.br', process.env.PB_SUPERUSER_PASSWORD || 'Avante@2024Lingerie');
    
    const record = await pb.collection('pedidos').create({
      status: 'pendente',
      recuperacao_enviada: false,
      cliente_telefone: '5511999999999',
      cliente_nome: 'Teste de Recuperacao'
    });
    console.log('Mock order created:', record.id, record.created);
  } catch(e) { console.error(e.response?.data || e.message); }
}
run();
