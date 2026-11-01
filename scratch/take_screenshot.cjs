const path = require('path');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const filePath = path.resolve(__dirname, '../preview-crm-lia.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
  
  const outputPath = path.resolve(__dirname, '../preview-crm-lia.png');
  await page.screenshot({ path: outputPath });
  console.log('Screenshot gravado com sucesso em:', outputPath);
  await browser.close();
}

run().catch(console.error);
