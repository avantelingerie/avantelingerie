async function checkHeader() {
  try {
    const res = await fetch(`https://avantelingerie.com.br/imagens/qr.png?t=${Date.now()}`);
    console.log('Status:', res.status);
    console.log('Last-Modified:', res.headers.get('last-modified'));
    console.log('Date:', res.headers.get('date'));
    console.log('ETag:', res.headers.get('etag'));
  } catch (e) {
    console.error(e);
  }
}

checkHeader();

