const fs = require('fs');
let code = fs.readFileSync('apps/api/src/routes/integracoes.js', 'utf8');

const target = `   const trials = [
      { version: 'v1', model: 'gemini-2.5-flash' },
      { version: 'v1beta', model: 'gemini-2.5-flash' },
      { version: 'v1', model: 'gemini-3.5-flash' },
      { version: 'v1beta', model: 'gemini-3.5-flash' },
      { version: 'v1', model: 'gemini-2.5-flash-lite' },
      { version: 'v1', model: 'gemini-3.1-flash-lite' }
    ];`;

const replacement = `    const trials = [
      { version: 'v1', model: 'gemini-3.6-flash' },
      { version: 'v1beta', model: 'gemini-3.6-flash' },
      { version: 'v1', model: 'gemini-3.7-flash' },
      { version: 'v1beta', model: 'gemini-3.7-flash' },
      { version: 'v1', model: 'gemini-3.8-flash' },
      { version: 'v1beta', model: 'gemini-2.5-pro' }
    ];`;

code = code.replace(target, replacement);
fs.writeFileSync('apps/api/src/routes/integracoes.js', code);
console.log('API Gemini updated');
