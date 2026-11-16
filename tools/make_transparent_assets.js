const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Function to flood-fill and remove black background cleanly from edges
async function removeExteriorBlack(inputPath, outputPath, tolerance = 25) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  
  const isExterior = new Uint8Array(w * h);
  const queue = [];
  
  function isBlack(x, y) {
    const idx = (y * w + x) * ch;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    return r < tolerance && g < tolerance && b < tolerance;
  }
  
  // Seed all borders
  for (let x = 0; x < w; x++) {
    if (isBlack(x, 0)) { isExterior[x] = 1; queue.push(x, 0); }
    if (isBlack(x, h - 1)) { isExterior[(h - 1) * w + x] = 1; queue.push(x, h - 1); }
  }
  for (let y = 0; y < h; y++) {
    if (isBlack(0, y) && !isExterior[y * w]) { isExterior[y * w] = 1; queue.push(0, y); }
    if (isBlack(w - 1, y) && !isExterior[y * w + (w - 1)]) { isExterior[y * w + (w - 1)] = 1; queue.push(w - 1, y); }
  }
  
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];
    
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!isExterior[nIdx] && isBlack(nx, ny)) {
          isExterior[nIdx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }
  
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const r = data[i * ch];
    const g = data[i * ch + 1];
    const b = data[i * ch + 2];
    
    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = isExterior[i] ? 0 : 255;
  }
  
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outputPath);
}

async function run() {
  const assetsDir = path.resolve(__dirname, '../apps/web/public/assets/mimos');

  // Step 1: Make transparent version of caixa-presente-laco-vermelho
  const boxJpg = path.join(assetsDir, 'caixa-presente-laco-vermelho.jpg');
  const boxTrans = path.join(assetsDir, 'caixa-presente-transparente.png');
  await removeExteriorBlack(boxJpg, boxTrans, 32);
  console.log('✓ Created transparent gift box');

  // Step 2: Make 100% transparent composite for caixa-presente-ganhouu.png
  const boxResized = await sharp(boxTrans)
    .resize(170, 145, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const boxMeta = await sharp(boxResized).metadata();

  const svgBadge = Buffer.from(`
    <svg width="190" height="36" viewBox="0 0 190 36" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="50%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#991b1b" />
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <rect x="3" y="3" width="184" height="30" rx="15" fill="url(#badgeGrad)" stroke="url(#goldBorder)" stroke-width="2" filter="url(#badgeShadow)" />
      <text x="95" y="23" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">🎁 GANHOUU!!</text>
    </svg>
  `);

  const canvasWidth = 260;
  const canvasHeight = 165;
  const boxLeft = Math.round((canvasWidth - boxMeta.width) / 2);
  const badgeLeft = Math.round((canvasWidth - 190) / 2);

  const ganhouuOut = path.join(assetsDir, 'caixa-presente-ganhouu.png');
  await sharp({
    create: {
      width: canvasWidth,
      height: canvasHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: boxResized, top: 0, left: boxLeft },
    { input: svgBadge, top: 125, left: badgeLeft }
  ])
  .png()
  .toFile(ganhouuOut);
  console.log('✓ Created 100% transparent caixa-presente-ganhouu.png');

  // Step 3: Remove exterior black from the 3 app covers so they have transparent PNG versions!
  const apps = [
    { in: 'capa-maquina-vendas-3d.jpg', out: 'capa-maquina-vendas-3d.png' },
    { in: 'capa-cintura-esculpida-3d.jpg', out: 'capa-cintura-esculpida-3d.png' },
    { in: 'capa-espelho-secreto-3d.jpg', out: 'capa-espelho-secreto-3d.png' }
  ];

  for (const app of apps) {
    const inputP = path.join(assetsDir, app.in);
    const outputP = path.join(assetsDir, app.out);
    await removeExteriorBlack(inputP, outputP, 30);
    console.log(`✓ Created transparent ${app.out}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
