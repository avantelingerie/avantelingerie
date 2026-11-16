const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function removeExteriorBlackAndCenter(inputPath, outputPath, tolerance = 28) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, ch = info.channels;
  const isExterior = new Uint8Array(w * h);
  const queue = [];
  
  function isBlack(x, y) {
    const idx = (y * w + x) * ch;
    return data[idx] < tolerance && data[idx+1] < tolerance && data[idx+2] < tolerance;
  }
  
  // Seed all 4 borders
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
    const neighbors = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
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

  // Create transparent buffer with soft antialiased edge
  const out = Buffer.alloc(w * h * 4);
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const idx = i * ch;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      
      out[i * 4] = r;
      out[i * 4 + 1] = g;
      out[i * 4 + 2] = b;
      
      if (isExterior[i]) {
        out[i * 4 + 3] = 0;
      } else {
        let hasExtNeighbor = false;
        if (x > 0 && isExterior[i - 1]) hasExtNeighbor = true;
        else if (x < w - 1 && isExterior[i + 1]) hasExtNeighbor = true;
        else if (y > 0 && isExterior[i - w]) hasExtNeighbor = true;
        else if (y < h - 1 && isExterior[i + w]) hasExtNeighbor = true;
        
        if (hasExtNeighbor) {
          const lum = (r + g + b) / 3;
          out[i * 4 + 3] = Math.min(255, Math.max(70, Math.round(lum * 3.5)));
        } else {
          out[i * 4 + 3] = 255;
        }

        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const croppedW = maxX - minX + 1;
  const croppedH = maxY - minY + 1;
  console.log(`Cropping ${path.basename(inputPath)}: ${croppedW}x${croppedH} from (${minX},${minY})`);

  // Extract non-transparent bounding box
  const croppedBuffer = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: croppedW, height: croppedH })
    .png()
    .toBuffer();

  // Resize and center inside a clean 1024x1024 transparent square canvas with ~4% breathing room
  const targetCanvas = 1024;
  const maxContentDim = 970; // 970px inside 1024px gives ~27px margin on all sides
  
  const resizedBuffer = await sharp(croppedBuffer)
    .resize(maxContentDim, maxContentDim, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  const resizedMeta = await sharp(resizedBuffer).metadata();
  const left = Math.round((targetCanvas - resizedMeta.width) / 2);
  const top = Math.round((targetCanvas - resizedMeta.height) / 2);

  await sharp({
    create: {
      width: targetCanvas,
      height: targetCanvas,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: resizedBuffer, top, left }])
  .png({ quality: 95, compressionLevel: 8 })
  .toFile(outputPath);

  console.log(`✓ Generated 100% transparent centered PNG (1024x1024): ${path.basename(outputPath)}`);
}

async function run() {
  const assetsDir = path.resolve(__dirname, '../apps/web/public/assets/mimos');

  // 1. Rebuild bigger, prominent GANHOU!! hero box
  const boxTrans = path.join(assetsDir, 'caixa-presente-transparente.png');
  const boxResized = await sharp(boxTrans)
    .resize(320, 280, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const boxMeta = await sharp(boxResized).metadata();

  const badgeWidth = 280;
  const badgeHeight = 56;
  const svgBadge = Buffer.from(`
    <svg width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f87171" />
          <stop offset="25%" stop-color="#ef4444" />
          <stop offset="75%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#991b1b" />
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="30%" stop-color="#fef08a" />
          <stop offset="70%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.7"/>
        </filter>
      </defs>
      <rect x="4" y="4" width="${badgeWidth - 8}" height="${badgeHeight - 8}" rx="${(badgeHeight - 8) / 2}" fill="url(#badgeGrad)" stroke="url(#goldBorder)" stroke-width="3" filter="url(#badgeShadow)" />
      <text x="${badgeWidth / 2}" y="36" font-family="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2.5">🎁 GANHOU!!</text>
    </svg>
  `);

  const canvasWidth = 380;
  const canvasHeight = 315;
  const boxLeft = Math.round((canvasWidth - boxMeta.width) / 2);
  const badgeLeft = Math.round((canvasWidth - badgeWidth) / 2);

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
    { input: svgBadge, top: 250, left: badgeLeft }
  ])
  .png()
  .toFile(ganhouuOut);
  console.log('✓ Created prominent caixa-presente-ganhouu.png (380x315)');

  // 2. Generate 100% transparent PNGs for the 3 apps
  const appNames = [
    'capa-maquina-vendas-3d',
    'capa-cintura-esculpida-3d',
    'capa-espelho-secreto-3d'
  ];

  for (const name of appNames) {
    const origJpg = path.join(assetsDir, `${name}.jpg`);
    const outPng = path.join(assetsDir, `${name}.png`);
    await removeExteriorBlackAndCenter(origJpg, outPng, 28);
  }

  // Also copy to dist if dist exists
  const distDir = path.resolve(__dirname, '../apps/web/dist/assets/mimos');
  if (fs.existsSync(distDir)) {
    for (const name of [...appNames, 'caixa-presente-ganhouu']) {
      const src = path.join(assetsDir, `${name}.png`);
      const dest = path.join(distDir, `${name}.png`);
      fs.copyFileSync(src, dest);
      console.log(`✓ Copied ${name}.png to dist`);
    }
  }
}

run().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
