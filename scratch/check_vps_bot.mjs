async function checkApi() {
  try {
    const res = await fetch('https://avantelingerie.com.br/hcgi/api/whatsapp/disconnect', {
      method: 'POST'
    });
    console.log('Status de /whatsapp/disconnect:', res.status);
    const data = await res.json().catch(() => null);
    console.log('Data:', data);
  } catch (e) {
    console.error('Erro:', e.message);
  }
}

checkApi();

