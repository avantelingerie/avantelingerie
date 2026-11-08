import fs from 'fs';
import QRCode from 'qrcode';

// Barcode patterns Code 128
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

// Carrier Logo SVGs (6.5mm height bounded)
const CORREIOS_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 28" class="carrier-logo-img" style="height:6.5mm;width:auto;display:block;">
  <g fill="#000">
    <path d="M16 2 L2 14 L16 26 L21 22 L11 14 L21 6 Z"/>
    <path d="M12 2 L26 14 L12 26 L7 22 L17 14 L7 6 Z"/>
  </g>
  <text x="34" y="22" font-family="'Arial Black', Arial, Helvetica, sans-serif" font-size="19" font-weight="900" letter-spacing="1.2" fill="#000">CORREIOS</text>
</svg>`;

const JADLOG_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 28" class="carrier-logo-img" style="height:6.5mm;width:auto;display:block;">
  <text x="2" y="23" font-family="'Arial Black', Arial, sans-serif" font-size="24" font-weight="900" font-style="italic" letter-spacing="0.2" fill="#000">jadlog</text>
</svg>`;

const JT_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 28" class="carrier-logo-img" style="height:6.5mm;width:auto;display:block;">
  <text x="0" y="23" font-family="'Arial Black', Arial, sans-serif" font-size="24" font-weight="900" letter-spacing="0.5" fill="#000">J&amp;T</text>
  <text x="56" y="21" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="900" letter-spacing="1.5" fill="#000">EXPRESS</text>
</svg>`;

console.log('Carrier SVGs defined successfully. Testing barcode generation for multiple carriers...');

const carriersToTest = [
  { name: 'Loggi Padrão', tracking: 'ME262FS47I1BR', service: 'Padrão' },
  { name: 'Correios SEDEX', tracking: 'SL123456789BR', service: 'SEDEX' },
  { name: 'Correios PAC', tracking: 'QC987654321BR', service: 'PAC' },
  { name: 'Jadlog .Package', tracking: '10081234567890', service: '.Package' },
  { name: 'J&T Express Standard', tracking: '88803101796074', service: 'Standard' }
];

for (const c of carriersToTest) {
  const svg = generateCode128BSvg(c.tracking);
  console.log(`Carrier: ${c.name} | Tracking: ${c.tracking} | Barcode SVG length: ${svg.length} chars | OK`);
}

