import pb from '../apps/api/src/utils/pocketbaseClient.js';
import dotenv from 'dotenv';
dotenv.config({ path: './apps/api/.env' });

async function seed() {
  try {
    await pb.collection('_superusers').authWithPassword(
      process.env.PB_SUPERUSER_EMAIL,
      process.env.PB_SUPERUSER_PASSWORD
    );
    console.log('Autenticado com sucesso no PocketBase.');

    const existing = await pb.collection('integracoes_config').getFullList({
      filter: 'chave_nome = "boleto_ativo" || chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_valor_minimo"',
      $autoCancel: false,
    });

    const activeRec = existing.find(r => r.chave_nome === 'boleto_ativo');
    const daysRec = existing.find(r => r.chave_nome === 'boleto_vencimento_dias');
    const minRec = existing.find(r => r.chave_nome === 'boleto_valor_minimo');

    if (!activeRec) {
      await pb.collection('integracoes_config').create({
        servico: 'mercadopago',
        chave_nome: 'boleto_ativo',
        chave_valor: 'true',
        ambiente: 'producao',
      });
      console.log('Criado: boleto_ativo = true');
    } else {
      console.log('Já existe: boleto_ativo =', activeRec.chave_valor);
    }

    if (!daysRec) {
      await pb.collection('integracoes_config').create({
        servico: 'mercadopago',
        chave_nome: 'boleto_vencimento_dias',
        chave_valor: '3',
        ambiente: 'producao',
      });
      console.log('Criado: boleto_vencimento_dias = 3');
    } else {
      console.log('Já existe: boleto_vencimento_dias =', daysRec.chave_valor);
    }

    if (!minRec) {
      await pb.collection('integracoes_config').create({
        servico: 'mercadopago',
        chave_nome: 'boleto_valor_minimo',
        chave_valor: '59.90',
        ambiente: 'producao',
      });
      console.log('Criado: boleto_valor_minimo = 59.90');
    } else {
      console.log('Já existe: boleto_valor_minimo =', minRec.chave_valor);
    }

    console.log('Seed do boleto concluído com sucesso!');
  } catch (err) {
    console.error('Erro no seed:', err);
  }
}

seed();
