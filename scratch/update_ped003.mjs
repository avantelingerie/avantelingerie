import pbClient from '../apps/api/src/utils/pocketbaseClient.js';

async function run() {
  try {
    const list = await pbClient.collection('pedidos').getFullList({
      filter: 'numero_pedido = "PED-003"',
      requestKey: null
    });
    if (!list.length) {
      console.log('PED-003 não encontrado');
      return;
    }
    const ped = list[0];
    console.log('PED-003 atual:', { id: ped.id, status: ped.status, rastreamento: ped.rastreamento });

    // Atualiza rastreamento para o código da J&T
    const updated = await pbClient.collection('pedidos').update(ped.id, {
      status: 'enviado',
      rastreamento: '888031017960740'
    }, { requestKey: null });

    console.log('PED-003 atualizado com sucesso:', {
      id: updated.id,
      status: updated.status,
      rastreamento: updated.rastreamento
    });
  } catch (err) {
    console.error('Erro ao atualizar:', err.message, err.data);
  }
}

run();

