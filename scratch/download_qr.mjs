import fs from 'fs';

async function downloadQr() {
  try {
    const res = await fetch(`https://avantelingerie.com.br/imagens/qr.png?t=${Date.now()}`);
    console.log('Status:', res.status, 'Content-Type:', res.headers.get('content-type'));
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync('scratch/current_qr.png', buffer);
    console.log('QR Code salvo em scratch/current_qr.png com tamanho:', buffer.length, 'bytes');
  } catch (e) {
    console.error(e);
  }
}

downloadQr();

