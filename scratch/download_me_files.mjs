import axios from 'axios';
import fs from 'fs';
import pb from '../apps/api/src/utils/pocketbaseClient.js';

async function main() {
  const rec = await pb.collection('integracoes_config').getFirstListItem('servico="melhor_envio" && chave_nome="token"');
  const token = rec.chave_valor;
  const headers = { Authorization: 'Bearer ' + token, Accept: 'application/json' };

  const ordRes = await axios.get('https://api.melhorenvio.com/v2/me/orders/a32b2f30-9d62-461c-8f78-42f743ea2376', { headers });
  const fileObj = ordRes.data?.files?.['1'];
  if (fileObj) {
    if (fileObj.jpeg) {
      const imgRes = await axios.get(fileObj.jpeg, { responseType: 'arraybuffer' });
      fs.writeFileSync('scratch/official_me_label.jpeg', imgRes.data);
      console.log('Saved official_me_label.jpeg, size:', imgRes.data.length);
    }
    if (fileObj.pdf) {
      const pdfRes = await axios.get(fileObj.pdf, { responseType: 'arraybuffer' });
      fs.writeFileSync('scratch/official_me_label.pdf', pdfRes.data);
      console.log('Saved official_me_label.pdf, size:', pdfRes.data.length);
    }
    if (fileObj.zpl) {
      const zplRes = await axios.get(fileObj.zpl, { responseType: 'text' });
      fs.writeFileSync('scratch/official_me_label.zpl', zplRes.data);
      console.log('Saved official_me_label.zpl');
      console.log('ZPL sample:\n', zplRes.data.slice(0, 500));
    }
  }
}

main().catch(console.error);

