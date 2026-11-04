async function pollQr() {
  console.log('Aguardando geração do QR Code pelo bot na VPS...');
  for (let i = 1; i <= 10; i++) {
    await new Promise(r => setTimeout(r, 3000));
    try {
      const res = await fetch(`https://avantelingerie.com.br/imagens/qr.png?t=${Date.now()}`);
      console.log(`[Tentativa ${i}] Status qr.png: ${res.status}`);
      if (res.status === 200) {
        console.log('🎉 QR CODE GERADO COM SUCESSO NA VPS!');
        return;
      }
    } catch (e) {
      console.log(`[Tentativa ${i}] Erro:`, e.message);
    }
  }
  console.log('Fim do polling.');
}

pollQr();

