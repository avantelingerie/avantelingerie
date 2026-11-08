import fs from 'fs';
import {
  AVANTE_LOGO_BASE64,
  LOGGI_LOGO_BASE64,
  MELHOR_ENVIO_LOGO_BASE64,
  CORREIOS_LOGO_SVG,
  JADLOG_LOGO_SVG,
  JT_LOGO_SVG,
  AZUL_LOGO_SVG
} from '../apps/api/src/utils/labelLogos.js';

// Code128 generators extracted from shipping.js
const CODE128_PATTERNS = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141',
  '114131', '311141', '411131', '211412', '211214', '211232', '2331112'
];

function generateCode128CSvg(digits44, { height = 30, barWidth = 1.05, quietZone = 22 } = {}) {
  const cleanDigits = (digits44 || '').replace(/\D/g, '');
  if (cleanDigits.length % 2 !== 0) return '';
  const pairs = [];
  for (let i = 0; i < cleanDigits.length; i += 2) {
    pairs.push(parseInt(cleanDigits.substring(i, i + 2), 10));
  }
  const codes = [105];
  let checkSum = 105;
  pairs.forEach((val, idx) => {
    codes.push(val);
    checkSum += val * (idx + 1);
  });
  codes.push(checkSum % 103);
  codes.push(106);

  let patternStr = '';
  codes.forEach(c => {
    patternStr += CODE128_PATTERNS[c] || '';
  });

  let totalModules = 0;
  for (let i = 0; i < patternStr.length; i++) {
    totalModules += parseInt(patternStr[i], 10);
  }
  const totalWidth = (totalModules * barWidth) + (quietZone * 2);

  let x = quietZone;
  let rects = '';
  for (let i = 0; i < patternStr.length; i++) {
    const width = parseInt(patternStr[i], 10) * barWidth;
    if (i % 2 === 0) {
      rects += `<rect x="${x.toFixed(2)}" y="0" width="${width.toFixed(2)}" height="${height}" fill="#000000"/>`;
    }
    x += width;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" preserveAspectRatio="none" style="width: 100%; height: ${height}px; display: block; shape-rendering: crispEdges;">${rects}</svg>`;
}

function generateCode128BSvg(cleanText, { height = 48, barWidth = 1.45, quietZone = 24 } = {}) {
  const text = (cleanText || '').trim();
  if (!text) return '';
  const codes = [104];
  let checkSum = 104;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const code128Val = charCode - 32;
    if (code128Val >= 0 && code128Val <= 95) {
      codes.push(code128Val);
      checkSum += code128Val * (i + 1);
    }
  }
  codes.push(checkSum % 103);
  codes.push(106);

  let patternStr = '';
  codes.forEach(c => {
    patternStr += CODE128_PATTERNS[c] || '';
  });

  let totalModules = 0;
  for (let i = 0; i < patternStr.length; i++) {
    totalModules += parseInt(patternStr[i], 10);
  }
  const totalWidth = (totalModules * barWidth) + (quietZone * 2);

  let x = quietZone;
  let rects = '';
  for (let i = 0; i < patternStr.length; i++) {
    const width = parseInt(patternStr[i], 10) * barWidth;
    if (i % 2 === 0) {
      rects += `<rect x="${x.toFixed(2)}" y="0" width="${width.toFixed(2)}" height="${height}" fill="#000000"/>`;
    }
    x += width;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" preserveAspectRatio="none" style="width: 100%; height: ${height}px; display: block; shape-rendering: crispEdges;">${rects}</svg>`;
}

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

async function simulate() {
  try {
    const autoprint = true;

    // 1. Dados Fiscais da NF-e
    let chaveNfe = (pedido.chave_nfe || '').replace(/\D/g, '');
    let numeroNfe = pedido.numero_nfe || '';
    let serieNfe = '1';
    let dataEmissao = new Date(pedido.created || Date.now()).toLocaleDateString('pt-BR');
    let protocoloUso = '233260528832869 ' + dataEmissao + ' 21:25';

    if (chaveNfe && chaveNfe.length === 44) {
      if (!numeroNfe) {
        const numExtraido = String(parseInt(chaveNfe.substring(25, 34), 10) || 1).padStart(6, '0');
        numeroNfe = numExtraido;
      }
      serieNfe = String(parseInt(chaveNfe.substring(22, 25), 10) || 1);
    } else {
      if (!numeroNfe) numeroNfe = '000015';
      chaveNfe = '33261154615037000153550010000000151801150819';
    }

    const chaveFormatada = chaveNfe.match(/.{1,4}/g)?.join(' ') || chaveNfe;

    // 2. Dados de Transporte e Rastreio
    const trackingCode = (pedido.codigo_rastreio || pedido.rastreamento || '').trim().toUpperCase();
    const carrier = pedido.transportadora || 'Loggi';
    const numPedido = pedido.numero_pedido || pedido.id || '';
    const totalVal = parseFloat(pedido.valor_total || pedido.total || 0).toFixed(2).replace('.', ',');

    // 3. Endereço do Destinatário
    const destName = (pedido.cliente_nome || '').toUpperCase();
    const destDoc = (pedido.cliente_cpf || pedido.cpf || '');
    const destCity = (pedido.cidade || '').toUpperCase();
    const destState = (pedido.estado || '').toUpperCase();
    const destCep = (pedido.cep || '');

    let destStreet = '';
    let destNumber = 'S/N';
    let destDistrict = '';
    let destComp = '';

    if (pedido.endereco_entrega) {
      const p = pedido.endereco_entrega.split(', ');
      destStreet = p[0] || '';
      if (p.length > 1) {
        const sub = p[1].split(' - ');
        destNumber = sub[0] || 'S/N';
        if (sub.length > 1) {
          destComp = sub.slice(1).join(' - ');
        }
        destDistrict = p[2] || '';
      }
    }

    // 4. Códigos de Barras
    const rawTracking = (pedido.codigo_rastreio || pedido.rastreamento || '').trim();
    let cleanTracking = rawTracking.replace(/\s+/g, '').toUpperCase();
    if (cleanTracking.startsWith('LGI-')) {
      cleanTracking = cleanTracking.substring(4);
    }
    if (!cleanTracking) {
      cleanTracking = 'ME262FS47I1BR';
    }
    const sefazBarcodeSvg = generateCode128CSvg(chaveNfe);
    const carrierBarcodeSvg = generateCode128BSvg(cleanTracking);

    // 5. QR Code
    const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(cleanTracking)}`;
    let qrDataUrl = '';
    try {
      const QRCode = (await import('qrcode')).default;
      qrDataUrl = await QRCode.toDataURL(trackingUrl, {
        margin: 1,
        width: 320,
        errorCorrectionLevel: 'M',
        color: { dark: '#000000', light: '#ffffff' }
      });
    } catch (e) {
      console.warn('QR Code warn:', e.message);
    }

    // 6. Carrier
    const carrierRaw = String(pedido.transportadora || pedido.forma_envio || pedido.metodo_envio || 'Loggi').trim();
    const carrierCombined = `${pedido.transportadora || ''} ${pedido.forma_envio || ''} ${pedido.metodo_envio || ''}`.toLowerCase();
    let carrierLogoHtml = '';
    let serviceTxt = 'Padrão';
    let serviceClass = '';

    if (carrierCombined.includes('loggi')) {
      carrierLogoHtml = `<img src="data:image/png;base64,${LOGGI_LOGO_BASE64}" class="carrier-logo-img" alt="Loggi" />`;
      if (carrierCombined.includes('ponto')) serviceTxt = 'Ponto';
      else if (carrierCombined.includes('express')) serviceTxt = 'Express';
      else serviceTxt = 'Padrão';
      serviceClass = 'loggi';
    } else if (carrierCombined.includes('jadlog')) {
      serviceTxt = carrierCombined.includes('.com') || carrierCombined.includes('com') ? '.Com' : '.Package';
      carrierLogoHtml = JADLOG_LOGO_SVG;
      serviceClass = 'jadlog';
    } else if (carrierCombined.includes('j&t') || carrierCombined.includes('jet')) {
      serviceTxt = 'Standard';
      carrierLogoHtml = JT_LOGO_SVG;
      serviceClass = 'jt';
    } else if (carrierCombined.includes('correios') || carrierCombined.includes('sedex') || /\bpac\b/.test(carrierCombined)) {
      serviceTxt = carrierCombined.includes('sedex') ? 'SEDEX' : 'PAC';
      carrierLogoHtml = CORREIOS_LOGO_SVG;
      serviceClass = 'correios';
    } else if (carrierCombined.includes('azul')) {
      serviceTxt = carrierCombined.includes('expresso') ? 'Expresso' : 'Cargo';
      carrierLogoHtml = AZUL_LOGO_SVG;
      serviceClass = 'azul';
    } else {
      serviceTxt = 'Padrão';
      carrierLogoHtml = `<div style="font-size: 11pt; font-weight: 900; letter-spacing: 0.5px; height: 6.5mm; display: flex; align-items: center; color: #000;">${carrierRaw.toUpperCase()}</div>`;
      serviceClass = 'generic';
    }

    const pesoGramas = pedido.peso_g || pedido.peso || 350;
    const destPhone = pedido.cliente_telefone || pedido.telefone || pedido.whatsapp || '';

    const valorFrete = parseFloat(pedido.valor_frete || pedido.frete || 0).toFixed(2).replace('.', ',');
    const valorTotalNum = parseFloat(pedido.valor_total || pedido.total || 0);
    const freteNum = parseFloat(pedido.valor_frete || pedido.frete || 0);
    const valorProdNum = parseFloat(pedido.valor_subtotal) || (valorTotalNum - freteNum > 0 ? valorTotalNum - freteNum : valorTotalNum);
    const valorProdutos = valorProdNum.toFixed(2).replace('.', ',');

    let itemsList = [];
    if (Array.isArray(pedido.itens)) {
      itemsList = pedido.itens;
    } else if (typeof pedido.itens === 'string') {
      try { itemsList = JSON.parse(pedido.itens); } catch (e) { itemsList = []; }
    }

    let totalPecas = 0;
    let itemsRowsHtml = '';
    if (itemsList.length > 0) {
      const maxDisplay = 3;
      const displayItems = itemsList.slice(0, maxDisplay);
      itemsRowsHtml = displayItems.map(it => {
        const qty = parseInt(it.quantidade || it.qty || 1, 10);
        totalPecas += qty;
        const nome = (it.nome || it.titulo || it.produto_nome || it.name || 'Produto Avante').trim();
        const cor = it.cor ? ` • ${it.cor}` : '';
        const tam = it.tamanho ? ` (${it.tamanho})` : '';
        const preco = parseFloat(it.preco_unitario || it.preco || it.valor_unitario || it.price || 0).toFixed(2).replace('.', ',');
        return `
          <div class="item-row">
            <span>${qty}x ${nome}${cor}${tam}</span>
            <strong>R$ ${preco}</strong>
          </div>`;
      }).join('');

      if (itemsList.length > maxDisplay) {
        const remaining = itemsList.slice(maxDisplay);
        const remQty = remaining.reduce((acc, it) => acc + (parseInt(it.quantidade || it.qty || 1, 10)), 0);
        totalPecas += remQty;
        itemsRowsHtml += `
          <div class="item-row" style="color: #444; font-style: italic;">
            <span>+ ${remaining.length} outros itens (${remQty} peças)</span>
            <span>Ver no pedido</span>
          </div>`;
      }
    } else {
      totalPecas = 1;
      itemsRowsHtml = `
        <div class="item-row">
          <span>1x Produtos Avante Lingerie Diversos</span>
          <strong>R$ ${totalVal}</strong>
        </div>`;
    }

    // Now test building the EXACT HTML from shipping.js
    const shippingJs = fs.readFileSync('apps/api/src/routes/shipping.js', 'utf8');
    const templateMatch = shippingJs.match(/const html = `([\s\S]*?)`;\s*res\.setHeader/);
    if (!templateMatch) {
      throw new Error('Could not find HTML template in shipping.js');
    }
    console.log('Template found in shipping.js');

    // Replace variables test in actual runtime
    const html = eval('`' + templateMatch[1] + '`');
    console.log('SUCCESS! Rendered full HTML length:', html.length);
    fs.writeFileSync('scratch/rendered_label_out.html', html, 'utf8');
  } catch (err) {
    console.error('SIMULATION ERROR:', err);
  }
}

simulate();
