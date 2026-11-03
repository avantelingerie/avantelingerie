import axios from 'axios';
import fs from 'fs';

async function inspectHtml() {
  const code = '888031017960740';
  const url = `https://www.melhorrastreio.com.br/rastreio/${code}`;
  const res = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  fs.writeFileSync('scratch/mr_page.html', res.data);
  console.log('Saved scratch/mr_page.html');
  const scripts = res.data.match(/<script[^>]*src="([^"]+)"/g);
  console.log('Script tags:', scripts);
}

inspectHtml();
