import fetch from 'node-fetch';

async function verify() {
  try {
    const url = 'https://avantelingerie.com.br/hcgi/api/shipping/etiqueta-unificada/bpdkc91gss1ptu8?autoprint=0';
    const res = await fetch(url);
    console.log('Status HTTP:', res.status, res.statusText);
    const text = await res.text();
    console.log('Length:', text.length);
    console.log('Has sefaz barcode:', text.includes('viewBox='));
    console.log('Has tracking code ME262FS47I1BR:', text.includes('ME262FS47I1BR'));
    console.log('Has customer name INES DOS SANTOS DE PAULO:', text.includes('INES DOS SANTOS DE PAULO'));
    console.log('Has QR Code base64:', text.includes('data:image/png;base64'));
    console.log('Has 500 error:', text.includes('Erro ao gerar'));
  } catch (err) {
    console.error('Error in verify:', err);
  }
}

verify();

