const qrcode = require('qrcode');
const fs = require('fs');

const url = 'https://avantelingerie.com.br/rastreio?codigo=ME262FS47I1BR';
const qr = qrcode.create(url, { margin: 1 });
const size = qr.modules.size;
const data = qr.modules.data;

// Generate SVG with <rect> elements
let rectsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="15mm" height="15mm" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff"/>`;
for (let r = 0; r < size; r++) {
  for (let c = 0; c < size; c++) {
    if (data[r * size + c]) {
      rectsSvg += `<rect x="${c}" y="${r}" width="1" height="1" fill="#000000"/>`;
    }
  }
}
rectsSvg += '</svg>';

// Generate default qrcode toString svg
qrcode.toString(url, { type: 'svg', margin: 1, width: 68 }, (err, defaultSvg) => {
  // Generate Data URL PNG (300px)
  qrcode.toDataURL(url, { margin: 1, width: 300, color: { dark: '#000000', light: '#ffffff' } }, (err2, pngUrl) => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Teste QR Code Impressao</title>
  <style>
    body { font-family: sans-serif; background: #222; color: #fff; padding: 20px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
    .row { display: flex; gap: 20px; }
    .card { background: #fff; color: #000; padding: 15px; border-radius: 8px; width: 180px; text-align: center; }
    .box { width: 15mm; height: 15mm; margin: 10px auto; border: 1px dashed #999; display: flex; align-items: center; justify-content: center; }
    .box img { width: 100%; height: 100%; display: block; image-rendering: pixelated; }
    .box svg { width: 100%; height: 100%; display: block; }
    @media print {
      body { background: #fff; color: #000; }
    }
  </style>
</head>
<body>
  <h2>Comparação do QR Code em Tela e na Impressão</h2>
  <div class="row">
    <div class="card">
      <h4>1. Atual (Default SVG com stroke)</h4>
      <div class="box">${defaultSvg}</div>
      <p style="font-size: 11px; color: red;">Problema: Traços com stroke sofrem anti-aliasing no Chrome Print</p>
    </div>
    <div class="card">
      <h4>2. SVG com Rects Puros (fill="#000")</h4>
      <div class="box">${rectsSvg}</div>
      <p style="font-size: 11px; color: green;">Sólido, idêntico aos códigos de barras</p>
    </div>
    <div class="card">
      <h4>3. PNG Alta Resolução (300px)</h4>
      <div class="box"><img src="${pngUrl}" /></div>
      <p style="font-size: 11px; color: green;">Perfeito em drivers térmicos</p>
    </div>
  </div>
</body>
</html>`;
    fs.writeFileSync('scratch/test_qr_comparison.html', html);
    console.log('Comparison HTML saved successfully!');
  });
});

