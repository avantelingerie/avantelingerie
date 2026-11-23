import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function checkMetaIntegration() {
  console.log('--- VERIFICANDO CONFIGURAÇÃO DE INSTAGRAM E MESSENGER ---');

  // 1. Verificar registros em integracoes_config
  try {
    const configs = await pb.collection('integracoes_config').getFullList();
    console.log('\nConfigurações de integrações encontradas:');
    configs.forEach(c => {
      // Ocultar valor real por segurança, apenas mostrar se está preenchido
      const hasValue = !!c.chave_valor;
      console.log(`- Serviço: ${c.servico} | Chave: ${c.chave_nome} | Ativo: ${c.ativo} | Preenchido: ${hasValue}`);
    });
  } catch (err) {
    console.error('Erro ao buscar integracoes_config:', err.message);
  }

  // 2. Verificar canais registrados em lia_conversas
  try {
    const conversas = await pb.collection('lia_conversas').getFullList();
    const canaisCount = {};
    conversas.forEach(c => {
      const canal = c.canal || 'indefinido';
      canaisCount[canal] = (canaisCount[canal] || 0) + 1;
    });
    console.log('\nCanais registrados em lia_conversas:', canaisCount);

    const igOrFb = conversas.filter(c => c.canal === 'instagram' || c.canal === 'messenger' || c.canal === 'facebook');
    console.log(`Total de conversas no Instagram/Messenger: ${igOrFb.length}`);
    if (igOrFb.length > 0) {
      console.log('Exemplos:', igOrFb.slice(0, 3));
    }
  } catch (err) {
    console.error('Erro ao buscar lia_conversas:', err.message);
  }
}

checkMetaIntegration().catch(console.error);
