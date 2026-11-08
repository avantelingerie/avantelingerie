import axios from 'axios';
import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function main() {
  const rec = await pb.collection('integracoes_config').getFirstListItem('servico="melhor_envio" && chave_nome="token"');
  const token = rec.chave_valor;
  const headers = { Authorization: 'Bearer ' + token, Accept: 'application/json' };

  const ordRes = await axios.get('https://api.melhorenvio.com/v2/me/orders/a32b2f30-9d62-461c-8f78-42f743ea2376', { headers });
  console.log('files:', ordRes.data?.files);
  console.log('tags:', ordRes.data?.tags);
  console.log('t_printer:', ordRes.data?.t_printer);
  console.log('service:', ordRes.data?.service);
  console.log('agency:', ordRes.data?.agency);
  console.log('authorization_code:', ordRes.data?.authorization_code);
  console.log('protocol:', ordRes.data?.protocol);
}

main().catch(console.error);
