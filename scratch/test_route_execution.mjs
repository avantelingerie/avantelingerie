import fs from 'fs';
import path from 'path';

// Let's import the barcode functions from shipping.js or copy them
// Wait, can we test importing shipping.js or running the exact logic?

const pedido = {
  "bling_pedido_id": "27327761131",
  "cep": "83709-150",
  "chave_nfe": "33261154615037000153550010000000171292980031",
  "cidade": "Araucária",
  "cliente_email": "analauraines@hotmail.com",
  "cliente_id": "rckus13c1ycdwxu",
  "cliente_nome": "Ines dos santos de paulo",
  "cliente_telefone": "41 99532-3120 ",
  "collectionId": "pbc_3849271720",
  "collectionName": "pedidos",
  "cpf": "044.947.199-35",
  "created": "2026-11-06 15:21:43.481Z",
  "data_pedido": "2026-11-06 15:21:43.000Z",
  "endereco_entrega": "Rua Carlos Vicente Zapxon, 1224 - Casa 28 codominio  porto madri, Costeira",
  "estado": "PR",
  "etiqueta_url": "https://melhorenvio.com.br/portal/imprimir/rPyjUL8r80dR",
  "forma_envio": "Loggi Loggi Ponto",
  "id": "bpdkc91gss1ptu8",
  "itens": [
    {
      "cor": "Preta",
      "dias_producao": 0,
      "image": "https://avantelingerie.com.br/hcgi/platform/api/files/pbc_4094466480/99k9uikfczop1zd/change_underwear_color_to_black_2_k_20260911102631_0usc00s24l.jpeg",
      "imagem": "https://avantelingerie.com.br/hcgi/platform/api/files/pbc_4094466480/99k9uikfczop1zd/change_underwear_color_to_black_2_k_20260911102631_0usc00s24l.jpeg",
      "is_encomenda": false,
      "nome": "Calcinha Cinta Modeladora Cós Alto com Renda ",
      "preco": 15.67,
      "preco_atacado": 12.93,
      "preco_unitario": 15.67,
      "quantidade": 1,
      "sku": "AVL-CAL-8588-PRETA-G",
      "tamanho": "G",
      "variacao_id": "wuqhqlpjtvs3v2a"
    }
  ],
  "melhor_envio_id": "a32b2f30-9d62-461c-8f78-42f743ea2376",
  "metodo_pagamento": "pix",
  "numero_nfe": "000017",
  "numero_pedido": "PED-005",
  "observacoes": "[EXPEDIÇÃO 07/11/2026] Enviado via Loggi. Rastreio: 888031017960740\n[EXPEDIÇÃO 07/11/2026] Enviado via Loggi. Rastreio: LGI-ME262FS47I1BR\n[EXPEDIÇÃO 07/11/2026] Enviado via Loggi. Rastreio: LGI-ME262FS47I1BR",
  "prazo_envio": "9 dias úteis",
  "rastreamento": "LGI-ME262FS47I1BR",
  "recuperacao_enviada": false,
  "servico_frete_id": "34",
  "status": "enviado",
  "transportadora": "Loggi",
  "updated": "2026-11-07 14:39:55.293Z",
  "valor_desconto": 2.9810000000000003,
  "valor_frete": 17.9,
  "valor_total": 74.539
};

// Let's test the functions from apps/api/src/routes/shipping.js
async function run() {
  console.log('Testing route logic step-by-step...');

  let chaveNfe = (pedido.chave_nfe || '').replace(/\D/g, '');
  let numeroNfe = pedido.numero_nfe || '';
  let serieNfe = '1';
  let dataEmissao = new Date(pedido.created || Date.now()).toLocaleDateString('pt-BR');
  let protocoloUso = '233260528832869 ' + dataEmissao + ' 21:25';

  console.log('Step 1: chaveNfe =', chaveNfe, 'len =', chaveNfe.length);

  if (chaveNfe && chaveNfe.length === 44) {
    if (!numeroNfe) {
      const numExtraido = String(parseInt(chaveNfe.substring(25, 34), 10) || 1).padStart(6, '0');
      numeroNfe = numExtraido;
    }
    serieNfe = String(parseInt(chaveNfe.substring(22, 25), 10) || 1);
  }

  const chaveFormatada = chaveNfe.match(/.{1,4}/g)?.join(' ') || chaveNfe;
  console.log('Step 2: chaveFormatada =', chaveFormatada);

  const rawTracking = (pedido.codigo_rastreio || pedido.rastreamento || '').trim();
  let cleanTracking = rawTracking.replace(/\s+/g, '').toUpperCase();
  if (cleanTracking.startsWith('LGI-')) {
    cleanTracking = cleanTracking.substring(4);
  }
  console.log('Step 3: cleanTracking =', cleanTracking);

  // Check QRCode import
  try {
    const QRCode = (await import('qrcode')).default;
    console.log('Step 4: QRCode imported:', typeof QRCode?.toDataURL);
    const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(cleanTracking)}`;
    const qrDataUrl = await QRCode.toDataURL(trackingUrl, {
      margin: 1,
      width: 320,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' }
    });
    console.log('Step 4.1: qrDataUrl generated length =', qrDataUrl.length);
  } catch (err) {
    console.error('Step 4 ERROR:', err);
  }
}

run();

