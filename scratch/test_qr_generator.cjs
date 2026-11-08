const QRCode = require('qrcode');
const fs = require('fs');

function generateQrCodeSvg(text, { margin = 1 } = {}) {
  const qr = QRCode.create(text, { margin, errorCorrectionLevel: 'M' });
  const size = qr.modules.size;
  const data = qr.modules.data;
  
  let rects = '';
  let count = 0;
  for (let r = 0; r < size; r++) {
    let startC = -1;
    for (let c = 0; c < size; c++) {
      const isBlack = data[r * size + c];
      if (isBlack) {
        if (startC === -1) startC = c;
      } else {
        if (startC !== -1) {
          rects += `<rect x="${startC}" y="${r}" width="${c - startC}" height="1"/>`;
          count++;
          startC = -1;
        }
      }
    }
    if (startC !== -1) {
      rects += `<rect x="${startC}" y="${r}" width="${size - startC}" height="1"/>`;
      count++;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="15mm" height="15mm" fill="#000000" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/>${rects}</svg>`;
}

const url = 'https://avantelingerie.com.br/rastreio?codigo=ME262FS47I1BR';
const svg = generateQrCodeSvg(url);
console.log('Total rects generated:', svg.match(/<rect/g).length);
console.log('SVG length in bytes:', Buffer.byteLength(svg, 'utf8'));

// Test if it works with toDataURL too
QRCode.toDataURL(url, { margin: 1, width: 300, errorCorrectionLevel: 'M', color: { dark: '#000000', light: '#ffffff' } }, (err, pngUrl) => {
  console.log('PNG Data URL length:', pngUrl.length);
  fs.writeFileSync('scratch/qr_test_output.svg', svg);
  fs.writeFileSync('scratch/qr_test_output_png.txt', pngUrl);
  console.log('Written to scratch/');
});

