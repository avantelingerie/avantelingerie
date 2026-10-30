import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImage = 'C:/Users/comer/.gemini/antigravity/brain/71d8d533-a528-4e32-8f7a-a35a59ca3c50/.user_uploaded/media_1793366458274_a445c10c.png';
const publicDir = path.resolve('apps/web/public');
const imagensDir = path.resolve('apps/web/public/imagens');

async function generate() {
  console.log('--- Iniciando Geração dos Favicons Transparentes ---');
  
  if (!fs.existsSync(sourceImage)) {
    throw new Error('Arquivo de origem não encontrado: ' + sourceImage);
  }

  // Obter bounding box da arte recortada (sem sobras vazias excessivas)
  const trimmed = await sharp(sourceImage).trim().toBuffer();
  
  // 1. favicon-32x32.png (32x32 com 2px de padding e nitidez reforçada para abas)
  const fav32 = await sharp(trimmed)
    .resize(28, 28, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .sharpen({ sigma: 0.8, m1: 1.0, m2: 2.0 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);
  console.log('✓ favicon-32x32.png gerado com sucesso (' + fav32.length + ' bytes)');

  // 2. favicon.png (64x64 de alta resolução para telas Retina/HiDPI)
  const fav64 = await sharp(trimmed)
    .resize(56, 56, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 4, bottom: 4, left: 4, right: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), fav64);
  console.log('✓ favicon.png (64x64) gerado com sucesso (' + fav64.length + ' bytes)');

  // 3. favicon.ico (duplicado do 32x32 com suporte total a navegadores modernos)
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav32);
  console.log('✓ favicon.ico gerado com sucesso');

  // 4. apple-touch-icon.png (180x180 para dispositivos iOS / atalhos móveis)
  const appleTouch = await sharp(trimmed)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);
  console.log('✓ apple-touch-icon.png (180x180) gerado com sucesso');

  // 5. logo-512.png (512x512 para PWA e manifestos)
  const logo512 = await sharp(trimmed)
    .resize(460, 460, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'logo-512.png'), logo512);
  console.log('✓ logo-512.png (512x512) gerado com sucesso');

  // 6. imagens/logo_avante_fav_icon.png (128x128)
  if (!fs.existsSync(imagensDir)) {
    fs.mkdirSync(imagensDir, { recursive: true });
  }
  const fav128 = await sharp(trimmed)
    .resize(116, 116, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 6, bottom: 6, left: 6, right: 6, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(imagensDir, 'logo_avante_fav_icon.png'), fav128);
  console.log('✓ imagens/logo_avante_fav_icon.png gerado com sucesso');

  console.log('--- Todos os ícones foram atualizados com transparência total! ---');
}

generate().catch(err => {
  console.error('Erro na geração:', err);
  process.exit(1);
});

