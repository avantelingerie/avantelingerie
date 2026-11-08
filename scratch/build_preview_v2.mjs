import fs from 'fs';

const imgBase64 = fs.readFileSync('scratch/official_me_label.jpeg').toString('base64');

// In official_me_label.jpeg, the height is 1084px, and the content is in the top 660px (60.8%)
// In CSS, we can show just the top content by using an overflow: hidden container with height: 75mm
// and an image with width: 94mm, height: auto!
const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Etiqueta Unificada Avante Lingerie - PED-005 (Oficial Loggi)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #18181b;
      font-family: Arial, Helvetica, sans-serif;
      color: #000;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    @page { size: 100mm 150mm; margin: 0; }
    @media print {
      body { background: #fff; padding: 0; }
      .no-print { display: none !important; }
      .sheet-wrapper { box-shadow: none !important; margin: 0 !important; width: 100mm !important; height: 150mm !important; padding: 2mm !important; }
    }
    .sheet-wrapper {
      width: 100mm;
      height: 150mm;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      padding: 2mm 3mm;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .danfe-section {
      height: 68mm;
      border-bottom: 1.5px dashed #000;
      padding-bottom: 2mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .carrier-section {
      height: 78mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 1mm;
    }
    .official-carrier-img {
      width: 94mm;
      height: auto;
      object-fit: contain;
      object-position: top center;
    }
  </style>
</head>
<body>
  <div class="sheet-wrapper">
    <div class="danfe-section">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #000; padding-bottom: 1mm;">
        <div>
          <strong style="font-size: 11px;">AVANTE LINGERIE LTDA</strong><br>
          <span style="font-size: 8px; color: #333;">Direto da Fábrica • Nova Friburgo/RJ</span>
        </div>
        <div style="text-align: right;">
          <strong style="font-size: 9px; border: 1px solid #000; padding: 1px 4px;">DANFE SIMPLIFICADO</strong><br>
          <span style="font-size: 8px;">Nº 000017 • Série 1</span>
        </div>
      </div>
      
      <!-- Chave de Acesso e Código de Barras SEFAZ -->
      <div style="text-align: center; margin: 1mm 0;">
        <div style="font-family: monospace; font-size: 7.5pt; font-weight: bold; letter-spacing: 1px;">
          3326 1154 6150 3700 0153 5500 1000 0000 1712 9298 0031
        </div>
      </div>

      <div style="font-size: 7pt; line-height: 1.2; border: 1px solid #000; padding: 1.5mm; border-radius: 2px;">
        <strong>DESTINATÁRIO:</strong> INES DOS SANTOS DE PAULO<br>
        <strong>CPF:</strong> 044.947.199-35 &bull; <strong>TOTAL:</strong> R$ 74,54<br>
        <strong>ENDEREÇO:</strong> Rua Carlos Vicente Zapxon, 1224, Costeira, Araucária/PR - CEP: 83709-150
      </div>
      <div style="text-align: center; font-size: 6.5pt; color: #666;">
        --- CORTE OU DOBRE AQUI (70mm) ---
      </div>
    </div>

    <!-- METADE INFERIOR: ETIQUETA OFICIAL NATIVA DA TRANSPORTADORA -->
    <div class="carrier-section">
      <img src="data:image/jpeg;base64,${imgBase64}" class="official-carrier-img" alt="Etiqueta Oficial Loggi" />
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('scratch/preview_unified_v2.html', html);
console.log('Saved scratch/preview_unified_v2.html');

