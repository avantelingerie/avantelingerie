import PocketBase from 'pocketbase';
import fs from 'fs';
import path from 'path';

const POCKETBASE_URL = 'https://avantelingerie.com.br/hcgi/platform';
const PB_EMAIL = process.env.PB_SUPERUSER_EMAIL || 'admin@avantelingerie.com.br';
const PB_PASSWORD = process.env.PB_SUPERUSER_PASSWORD || 'Admin@123456';

async function fetchAndAnalyze() {
  const pb = new PocketBase(POCKETBASE_URL);
  pb.autoCancellation(false);

  try {
    await pb.collection('_superusers').authWithPassword(PB_EMAIL, PB_PASSWORD);
    console.log('Autenticado com sucesso no PocketBase.');
  } catch (err) {
    console.error('Falha na autenticação:', err.message);
    return;
  }

  try {
    const conversas = await pb.collection('lia_conversas').getFullList({
      sort: '-updated'
    });
    console.log(`Total de conversas encontradas na Lia: ${conversas.length}`);

    const outputData = [];

    conversas.forEach((c, idx) => {
      let msgs = [];
      try {
        msgs = typeof c.mensagens === 'string' ? JSON.parse(c.mensagens) : (c.mensagens || []);
      } catch (e) {
        msgs = [];
      }

      outputData.push({
        id: c.id,
        session_id: c.session_id,
        canal: c.canal,
        updated: c.updated,
        created: c.created,
        total_msgs: msgs.length,
        mensagens: msgs
      });
    });

    const outputPath = path.resolve('scratch/lia_conversas_dump.json');
    if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
    console.log(`Dump salvo em: ${outputPath}`);

  } catch (err) {
    console.error('Erro ao buscar conversas:', err.message);
  }
}

fetchAndAnalyze();
