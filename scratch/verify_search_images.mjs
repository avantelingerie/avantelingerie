import PocketBase from 'pocketbase';

const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');

function getProductImage(record) {
  if (!record) return null;
  let filename = record.imagem_principal;
  if (!filename && Array.isArray(record.gallery) && record.gallery.length > 0) {
    filename = record.gallery[0];
  }
  if (!filename && record.image) {
    filename = Array.isArray(record.image) ? record.image[0] : record.image;
  }
  if (!filename && record.imagem_produto) {
    filename = Array.isArray(record.imagem_produto) ? record.imagem_produto[0] : record.imagem_produto;
  }
  if (!filename) return null;
  if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
    return filename;
  }
  try {
    const target = typeof filename === 'string' ? filename.trim() : null;
    if (!target) return null;
    return pb.files.getURL(record, target);
  } catch (err) {
    return null;
  }
}

async function run() {
  const res = await pb.collection('products').getList(1, 6, {
    filter: 'name ~ "Calcinha" || categoria ~ "Calcinha"'
  });
  console.log('Result count:', res.items.length);
  for (const item of res.items) {
    const url = getProductImage(item);
    const resp = await fetch(url, { method: 'HEAD' });
    console.log(`[HTTP ${resp.status}] ${item.name.slice(0, 45)}...`);
    console.log(`  -> URL: ${url}`);
  }
}

run();
