const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  // Log all requests
  page.on('request', req => console.log('>>', req.method(), req.url()));

  await page.goto('http://localhost:3000/admin/produtos/novo');

  console.log("Page loaded");

  // Since we are not logged in, it will redirect to /admin/login
  // We can try to evaluate code in the context to check if handleSubmit throws or hangs
  
  await browser.close();
})();
