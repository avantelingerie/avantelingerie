async function checkQr() {
  try {
    const res = await fetch('https://avantelingerie.com.br/imagens/qr.png');
    console.log('Status de qr.png:', res.status, res.statusText);
    const text = await res.text();
    console.log('Tamanho da resposta:', text.length);
  } catch (e) {
    console.error('Erro:', e.message);
  }
}

checkQr();

