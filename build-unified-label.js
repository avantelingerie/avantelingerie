const fs = require('fs');
const QRCode = require('qrcode');

// 1. Read clean logos
const b64Loggi = fs.readFileSync('loggi_logo_only.png').toString('base64');
const b64ME = fs.readFileSync('me_hires.png').toString('base64');

// Read existing Avante logo from preview-etiqueta-gainscha.html
const oldHtml = fs.readFileSync('preview-etiqueta-gainscha.html', 'utf8');
const logoMatch = oldHtml.match(/data:image\/png;base64,[A-Za-z0-9+/=]+/);
const b64Avante = logoMatch ? logoMatch[0] : '';

// 2. Barcode Code 128 (B and C) generator
const patterns = [
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
  const START_C = 105;
  const STOP = 106;
  const pairs = [];
  for (let i = 0; i < 44; i += 2) {
    pairs.push(parseInt(digits44.substr(i, 2), 10));
  }
  let checkSum = START_C;
  for (let i = 0; i < pairs.length; i++) {
    checkSum += pairs[i] * (i + 1);
  }
  const codes = [START_C, ...pairs, checkSum % 103, STOP];
  let modules = '';
  for (const c of codes) {
    const pat = patterns[c];
    let isBar = true;
    for (const ch of pat) {
      modules += (isBar ? '1' : '0').repeat(parseInt(ch, 10));
      isBar = !isBar;
    }
  }
  const barcodeWidth = modules.length * barWidth;
  const totalWidth = barcodeWidth + (quietZone * 2);
  let rects = '';
  let cur = 0, startX = 0;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === '1') {
      if (cur === 0) startX = quietZone + (i * barWidth);
      cur++;
    } else {
      if (cur > 0) {
        rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
        cur = 0;
      }
    }
  }
  if (cur > 0) rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" width="94mm" height="6.8mm" preserveAspectRatio="xMidYMid meet" style="display:block;margin:0 auto;"><rect width="${totalWidth.toFixed(2)}" height="${height}" fill="#fff"/>${rects}</svg>`;
}

function generateCode128BSvg(cleanText, { height = 48, barWidth = 1.45, quietZone = 24 } = {}) {
  const clean = String(cleanText).trim();
  const START_B = 104;
  const STOP = 106;
  const codes = [START_B];
  let checkSum = START_B;
  for (let i = 0; i < clean.length; i++) {
    const val = clean.charCodeAt(i) - 32;
    const safeVal = (val >= 0 && val <= 94) ? val : 0;
    codes.push(safeVal);
    checkSum += safeVal * (i + 1);
  }
  codes.push(checkSum % 103);
  codes.push(STOP);
  let modules = '';
  for (const c of codes) {
    const pat = patterns[c] || patterns[0];
    let isBar = true;
    for (const ch of pat) {
      modules += (isBar ? '1' : '0').repeat(parseInt(ch, 10));
      isBar = !isBar;
    }
  }
  const barcodeWidth = modules.length * barWidth;
  const totalWidth = barcodeWidth + (quietZone * 2);
  let rects = '';
  let cur = 0, startX = 0;
  for (let i = 0; i < modules.length; i++) {
    if (modules[i] === '1') {
      if (cur === 0) startX = quietZone + (i * barWidth);
      cur++;
    } else {
      if (cur > 0) {
        rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
        cur = 0;
      }
    }
  }
  if (cur > 0) rects += `<rect x="${startX.toFixed(2)}" y="0" width="${(cur * barWidth).toFixed(2)}" height="${height}" fill="#000"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth.toFixed(2)} ${height}" width="94mm" height="12.5mm" preserveAspectRatio="xMidYMid meet" style="display:block;margin:0 auto;"><rect width="${totalWidth.toFixed(2)}" height="${height}" fill="#fff"/>${rects}</svg>`;
}

async function main() {
  const defaultTracking = 'ME262FS47I1BR';
  const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${defaultTracking}`;
  const qrDataUrl = await QRCode.toDataURL(trackingUrl, {
    margin: 1,
    width: 320,
    errorCorrectionLevel: 'M',
    color: { dark: '#000000', light: '#ffffff' }
  });

  const sefazBarcodeSvg = generateCode128CSvg('33261154615037000153550010000000171292980031');
  const carrierBarcodeSvg = generateCode128BSvg(defaultTracking);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Etiqueta Unificada Avante Lingerie - DANFE + Melhor Envio</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #18181b;
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 10px;
    }
    @page {
      size: 100mm 150mm;
      margin: 0;
    }
    @media print {
      body { background: #fff !important; padding: 0 !important; }
      .no-print { display: none !important; }
      .sheet-wrapper { box-shadow: none !important; margin: 0 !important; width: 100mm !important; height: 150mm !important; }
    }
    
    .controls-panel {
      max-width: 480px;
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .btn-print {
      background: linear-gradient(135deg, #c59b5f, #dfb775);
      color: #000;
      font-weight: 900;
      font-size: 14px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      box-shadow: 0 4px 18px rgba(197, 155, 95, 0.4);
      width: 100%;
    }
    .btn-print:hover {
      background: linear-gradient(135deg, #dfb775, #f3cb8b);
    }
    .guide-box {
      background: #27272a;
      border: 1px solid #c59b5f;
      border-radius: 6px;
      padding: 10px 14px;
      color: #fafafa;
      font-size: 11px;
      line-height: 1.4;
      width: 100%;
    }

    /* FOLHA ADESIVA TÉRMICA: 100mm x 150mm */
    .sheet-wrapper {
      width: 100mm;
      height: 150mm;
      background: #fff;
      padding: 1.2mm 1.5mm;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 30px rgba(0,0,0,0.6);
      border-radius: 2px;
      overflow: hidden;
    }

    .unified-border {
      border: 1.5px solid #000;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    /* ========================================================
       1. METADE SUPERIOR (DANFE SIMPLIFICADO FISCAL)
       Aumentado suavemente para 62.5mm p/ máxima legibilidade
       Preto puro e traços nítidos de alta densidade
       ======================================================== */
    .danfe-section {
      height: 62.5mm;
      padding: 1.1mm 1.6mm 0.8mm 1.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .danfe-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .danfe-brand-group {
      display: flex;
      align-items: center;
      gap: 2mm;
    }
    .danfe-logo {
      height: 8.8mm;
      width: auto;
      max-width: 9.8mm;
      object-fit: contain;
    }
    .danfe-brand {
      font-size: 8.8pt;
      font-weight: 900;
      letter-spacing: 0.2px;
      line-height: 1.15;
      color: #000;
    }
    .danfe-sub {
      font-size: 5.6pt;
      font-weight: 700;
      color: #000;
      margin-top: 0.3mm;
    }
    .danfe-badge-box {
      border: 1.5px solid #000;
      border-radius: 4px;
      padding: 1mm 3mm;
      text-align: center;
      font-weight: 900;
      font-size: 6.6pt;
      line-height: 1.15;
      color: #000;
    }
    .danfe-serie-text {
      font-size: 5.8pt;
      font-weight: 900;
      text-align: right;
      margin-top: 0.6mm;
      color: #000;
    }
    .divider-line {
      border-bottom: 1px solid #000;
      width: 100%;
      margin: 0.1mm 0;
    }
    .nfe-barcode-wrap {
      text-align: center;
      margin: 0;
    }
    .nfe-key-text {
      font-family: 'Courier New', Courier, monospace;
      font-size: 7.0pt;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-align: center;
      margin-top: 0.2mm;
      color: #000;
    }
    .fiscal-meta {
      font-size: 5.7pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .dest-box-danfe {
      border: 1.2px solid #000;
      border-radius: 3px;
      padding: 0.8mm 1.4mm;
      font-size: 5.9pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .items-box-danfe {
      border: 1.2px solid #000;
      border-radius: 3px;
      padding: 0.8mm 1.4mm;
      font-size: 5.8pt;
      font-weight: 600;
      line-height: 1.30;
      color: #000;
    }
    .items-title {
      font-weight: 900;
      font-size: 6.2pt;
      border-bottom: 1px solid #000;
      padding-bottom: 0.2mm;
      margin-bottom: 0.3mm;
      display: flex;
      justify-content: space-between;
      color: #000;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
    }
    .item-row strong {
      font-size: 6.0pt;
      font-weight: 900;
      color: #000;
    }

    /* LINHA DE DOBRA / SEPARAÇÃO CENTRAL */
    .center-divider {
      border-bottom: 1.5px solid #000;
      width: 100%;
    }

    /* ========================================================
       2. METADE INFERIOR (ETIQUETA DA TRANSPORTADORA PADRÃO MELHOR ENVIO)
       Ajustada para 84.5mm mantendo proporções perfeitas e código de barras intacto
       ======================================================== */
    .carrier-section {
      height: 84.5mm;
      padding: 1.2mm 1.6mm 1.0mm 1.6mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .carrier-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.6mm;
    }
    .carrier-header-left {
      display: flex;
      flex-direction: column;
    }
    .carrier-logo-img {
      height: 6.5mm;
      width: auto;
      object-fit: contain;
      object-position: left top;
    }
    .carrier-service-txt {
      font-size: 6.6pt;
      font-weight: 900;
      margin-top: 0.3mm;
      color: #000;
    }
    .carrier-service-txt.loggi {
      margin-left: 8.5mm; /* Alinhado sob a palavra Loggi na logo da Loggi */
    }
    .carrier-meta-txt {
      font-size: 6.3pt;
      font-weight: 900;
      line-height: 1.25;
      margin-top: 0.4mm;
      color: #000;
    }
    .carrier-header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .me-logo-img {
      height: 8.5mm;
      width: auto;
      object-fit: contain;
      object-position: right top;
    }
    .me-site-txt {
      font-size: 5.8pt;
      font-weight: 700;
      color: #000;
      margin-top: 0.2mm;
    }
    .carrier-weight-txt {
      font-size: 6.6pt;
      font-weight: 900;
      margin-top: 0.3mm;
      color: #000;
    }
    .carrier-tracking-code {
      font-size: 13.5pt;
      font-weight: 900;
      letter-spacing: 1.2px;
      text-align: center;
      margin: 0.6mm 0 0.3mm 0;
      color: #000;
    }
    .carrier-barcode-wrap {
      text-align: center;
      margin: 0.3mm 0 0.9mm 0; /* Margem de respiro para não grudar no destinatário */
    }
    .carrier-dest-box {
      border: 1.2px solid #000;
      border-radius: 4px;
      padding: 1.1mm 1.8mm;
      font-size: 6.4pt;
      font-weight: 600;
      line-height: 1.28;
      margin-bottom: 0.8mm; /* Espaço reduzido com perfeição conforme solicitado */
      color: #000;
    }
    .carrier-dest-box .title {
      font-weight: 900;
      font-size: 7.2pt;
      margin-bottom: 0.3mm;
      display: block;
      color: #000;
    }
    .carrier-bottom-row {
      display: flex;
      align-items: center;
      gap: 1.8mm;
      height: 16mm;
      margin-bottom: 0.3mm; /* Garante que fique longe da borda final */
    }
    .qr-block {
      display: flex;
      align-items: center;
      gap: 1.5mm;
      flex-shrink: 0;
      max-width: 48mm;
    }
    .qr-container {
      width: 15mm;
      height: 15mm;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-code-img, .qr-container svg {
      width: 100%;
      height: 100%;
      display: block;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }
    .qr-guide-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1.2;
    }
    .qr-guide-title {
      font-size: 6.4pt;
      font-weight: 900;
      color: #000;
      letter-spacing: 0.2px;
      margin-bottom: 0.3mm;
    }
    .qr-guide-desc {
      font-size: 5.3pt;
      font-weight: 600;
      color: #000;
      line-height: 1.22;
    }
    .vertical-sep {
      width: 1.2px;
      height: 14.5mm;
      background: #000;
      flex-shrink: 0;
    }
    .remetente-box {
      font-size: 6.1pt;
      font-weight: 600;
      line-height: 1.26;
      flex-grow: 1;
      color: #000;
    }
    .remetente-box .title {
      font-weight: 900;
      font-size: 7.2pt;
      display: block;
      margin-bottom: 0.2mm;
      color: #000;
    }
  </style>
</head>
<body>

  <div class="controls-panel no-print">
    <button type="button" class="btn-print" onclick="window.print();">
      🖨️ TESTAR IMPRESSÃO NA GAINSCHA GS-2406T (100x150mm)
    </button>
    <div class="guide-box">
      <strong style="color: #dfb775; display: block; margin-bottom: 3px;">⚙️ Configurações Recomendadas no Driver:</strong>
      • <strong>Destino:</strong> Gainscha GS-2406T | • <strong>Tamanho:</strong> 100x150mm (4x6")<br>
      • <strong>Margens:</strong> Nenhuma | • <strong>Escala:</strong> 100% (ou Ajustar à área imprimível)
    </div>
  </div>

  <div class="sheet-wrapper">
    <div class="unified-border">

      <!-- ========================================================
           1. METADE SUPERIOR: DANFE SIMPLIFICADO FISCAL
           ======================================================== -->
      <div class="danfe-section">
        <div class="danfe-header">
          <div class="danfe-brand-group">
            <img src="${b64Avante}" class="danfe-logo" alt="Avante Lingerie" />
            <div>
              <div class="danfe-brand">AVANTE LINGERIE<br>LTDA</div>
              <div class="danfe-sub">Direto da Fábrica - Nova Friburgo/RJ</div>
            </div>
          </div>
          <div>
            <div class="danfe-badge-box">
              DANFE SIMPLIFICADO -<br>ETIQUETA
            </div>
            <div class="danfe-serie-text">SÉRIE: 1 - Nº 000017</div>
          </div>
        </div>

        <div class="divider-line"></div>

        <!-- Código de Barras Oficial SEFAZ CODE 128C -->
        <div class="nfe-barcode-wrap">
          ${sefazBarcodeSvg}
          <div class="nfe-key-text">
            3326 1154 6150 3700 0153 5500 1000 0000 1712 9298 0031
          </div>
        </div>

        <div class="divider-line"></div>

        <div class="fiscal-meta">
          <strong>PROTOCOLO SEFAZ:</strong> 233260528832869 06/11/2026 21:25 - <strong>OPERAÇÃO:</strong> 1 - SAÍDA<br>
          <strong>EMITENTE:</strong> AVANTE LINGERIE LTDA - <strong>CNPJ:</strong> 54.615.037/0001-53 - <strong>IE:</strong> 14568603 - <strong>UF:</strong> RJ<br>
          <strong>VALOR PRODUTOS:</strong> R$ 59,62 - <strong>FRETE:</strong> R$ 17,90 - <strong>VALOR TOTAL DA NOTA: R$ 74,54</strong>
        </div>

        <div class="dest-box-danfe">
          <strong>DESTINATÁRIO:</strong> INES DOS SANTOS DE PAULO - <strong>CPF:</strong> 044.947.199-35 - <strong>IE:</strong> ISENTO<br>
          <strong>ENDEREÇO:</strong> Rua Carlos Vicente Zapxon, 1224 - Costeira - Araucária/PR - <strong>CEP:</strong> 83709-150
        </div>

        <!-- ITENS DO PEDIDO / SEPARAÇÃO DA FÁBRICA -->
        <div class="items-box-danfe">
          <div class="items-title">
            <span>ITENS DA NOTA / SEPARAÇÃO DE ESTOQUE:</span>
            <span>QTD: 3 PEÇAS</span>
          </div>
          <div class="item-row">
            <span>1x Calcinha Cinta Modeladora Cós Alto Rendada • Preta (G)</span>
            <strong>R$ 15,67</strong>
          </div>
          <div class="item-row">
            <span>1x Calcinha Cinta Modeladora Cós Alto Rendada • Bege (G)</span>
            <strong>R$ 15,67</strong>
          </div>
          <div class="item-row">
            <span>1x Conjunto Lingerie Rendado Cropped Sem Bojo • Rubi (G)</span>
            <strong>R$ 28,28</strong>
          </div>
        </div>
      </div>

      <!-- LINHA CENTRAL DE DOBRA / PICOTE -->
      <div class="center-divider"></div>

      <!-- ========================================================
           2. METADE INFERIOR: ETIQUETA DA TRANSPORTADORA PADRONIZADA
           ======================================================== -->
      <div class="carrier-section">
        <div class="carrier-header">
          <div class="carrier-header-left">
            <img src="data:image/png;base64,${b64Loggi}" class="carrier-logo-img" alt="Loggi" />
            <div class="carrier-service-txt loggi">Padrão</div>
            <div class="carrier-meta-txt">
              NF: 17<br>
              ORD-82261147458414
            </div>
          </div>
          <div class="carrier-header-right">
            <img src="data:image/png;base64,${b64ME}" class="me-logo-img" alt="Melhor Envio" />
            <div class="me-site-txt">melhorenvio.com</div>
            <div class="carrier-weight-txt">Peso (g): 350</div>
          </div>
        </div>

        <div class="carrier-tracking-code">ME262FS47I1BR</div>

        <div class="carrier-barcode-wrap">
          ${carrierBarcodeSvg}
        </div>

        <div class="carrier-dest-box">
          <span class="title">DESTINATÁRIO</span>
          Ines Dos Santos De Paulo, Tel: (41) 99532-3120<br>
          Rua Carlos Vicente Zapxon, 1224<br>
          Costeira<br>
          <strong>83709-150</strong> Araucária/PR
        </div>

        <div class="carrier-bottom-row">
          <div class="qr-block">
            <div class="qr-container">
              <img src="${qrDataUrl}" alt="QR Code Rastreio" class="qr-code-img" />
            </div>
            <div class="qr-guide-box">
              <div class="qr-guide-title">RASTREIE SEU PEDIDO</div>
              <div class="qr-guide-desc">Aponte a câmera do celular p/ ver a entrega em tempo real</div>
            </div>
          </div>
          <div class="vertical-sep"></div>
          <div class="remetente-box">
            <span class="title">REMETENTE</span>
            Avante Lingerie Ltda<br>
            Rua Odenir Pinheiro, 20<br>
            3 Andar, Loteamento Nosso Sonho<br>
            <strong>28623-620</strong> Nova Friburgo/RJ
          </div>
        </div>
      </div>

    </div>
  </div>

</body>
</html>
`;

  fs.writeFileSync('preview-etiqueta-gainscha.html', html, 'utf8');
  console.log('SUCCESS: preview-etiqueta-gainscha.html updated clean! Length:', html.length);
}

main().catch(console.error);
