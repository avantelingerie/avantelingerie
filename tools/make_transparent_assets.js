const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const assetsDir = path.resolve(__dirname, '../apps/web/public/assets/mimos');

  // ==========================================
  // 1. CREATE BIGGER, MAGNIFICENT GANHOUU!! HERO
  // ==========================================
  const boxTrans = path.join(assetsDir, 'caixa-presente-transparente.png');
  
  // Resize transparent gift box to 280x250
  const boxResized = await sharp(boxTrans)
    .resize(280, 245, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const boxMeta = await sharp(boxResized).metadata();

  // Grand, bold SVG badge for GANHOUU!!
  const badgeWidth = 240;
  const badgeHeight = 46;
  const svgBadge = Buffer.from(`
    <svg width="${badgeWidth}" height="${badgeHeight}" viewBox="0 0 ${badgeWidth} ${badgeHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f87171" />
          <stop offset="30%" stop-color="#ef4444" />
          <stop offset="70%" stop-color="#dc2626" />
          <stop offset="100%" stop-color="#991b1b" />
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fffbeb" />
          <stop offset="35%" stop-color="#fef08a" />
          <stop offset="70%" stop-color="#eab308" />
          <stop offset="100%" stop-color="#a16207" />
        </linearGradient>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>
      <rect x="4" y="3" width="${badgeWidth - 8}" height="${badgeHeight - 6}" rx="${(badgeHeight - 6) / 2}" fill="url(#badgeGrad)" stroke="url(#goldBorder)" stroke-width="2.5" filter="url(#badgeShadow)" />
      <text x="${badgeWidth / 2}" y="28" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">🎁 GANHOUU!!</text>
    </svg>
  `);

  const canvasWidth = 340;
  const canvasHeight = 270;
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
    { input: svgBadge, top: 215, left: badgeLeft }
  ])
  .png()
  .toFile(ganhouuOut);
  console.log('✓ Created bigger 100% transparent caixa-presente-ganhouu.png (340x270)');

  // ==========================================
  // 2. CLIP THE 4 CORNERS OF THE 3 APPS TO TRANSPARENT
  // ==========================================
  // Each badge has rounded corners (rx: 130). We clip the sharp black corners outside the rounded badge so it is 100% transparent on white backgrounds.
  const appNames = [
    'capa-maquina-vendas-3d',
    'capa-cintura-esculpida-3d',
    'capa-espelho-secreto-3d'
  ];

  const svgRoundedMask = Buffer.from(`
    <svg width="1007" height="1024" viewBox="0 0 1007 1024" xmlns="http://www.w3.org/2000/svg">
      <rect x="18" y="14" width="971" height="986" rx="135" ry="135" fill="#ffffff" />
    </svg>
  `);

  for (const name of appNames) {
    const origJpg = path.join(assetsDir, `${name}.jpg`);
    const outPng = path.join(assetsDir, `${name}.png`);

    // Mask out the 4 dark corners outside the rounded frame
    await sharp(origJpg)
      .ensureAlpha()
      .composite([{ input: svgRoundedMask, blend: 'dest-in' }])
      .png()
      .toFile(outPng);

    console.log(`✓ Created clean corner-transparent PNG: ${name}.png`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
