import fs from 'fs';

const imgBase64 = fs.readFileSync('scratch/official_me_label.jpeg').toString('base64');
console.log('Base64 length:', imgBase64.length);

const testHtml = `
<!DOCTYPE html>
<html>
<head>
<style>
  @page { size: 100mm 150mm; margin: 0; }
  body { margin: 0; padding: 0; width: 100mm; height: 150mm; font-family: sans-serif; background: #222; display: flex; justify-content: center; }
  .sheet { width: 100mm; height: 150mm; background: #fff; box-sizing: border-box; padding: 2mm 3mm; display: flex; flex-direction: column; }
  .danfe-part { height: 72mm; border-bottom: 1px dashed #000; overflow: hidden; }
  .carrier-part { height: 74mm; overflow: hidden; display: flex; align-items: flex-start; justify-content: center; }
  .carrier-img { width: 100%; max-height: 120mm; object-fit: contain; object-position: top center; margin-top: 1mm; }
</style>
</head>
<body>
<div class="sheet">
  <div class="danfe-part">
    <div style="font-weight: bold; font-size: 11px; text-align: center;">DANFE SIMPLIFICADO - AVANTE LINGERIE</div>
    <!-- DANFE content here -->
  </div>
  <div class="carrier-part">
    <img src="data:image/jpeg;base64,${imgBase64}" class="carrier-img" />
  </div>
</div>
</body>
</html>
`;

fs.writeFileSync('scratch/test_unified_with_official_img.html', testHtml);
console.log('Written scratch/test_unified_with_official_img.html');

