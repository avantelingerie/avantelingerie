const PocketBase = require('pocketbase/cjs');

async function auditProducts() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  
  const prods = await pb.collection('products').getFullList({
    sort: 'name'
  });

  console.log(`Total de produtos cadastrados: ${prods.length}`);
  prods.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.reference || 'SEM-REF'}] ${p.name}`);
    console.log(`   Peso: ${p.peso_g || 'NÃO DEFINIDO'}g | Dimensões: ${p.altura_cm || '?'} x ${p.largura_cm || '?'} x ${p.comprimento_cm || '?'} cm`);
  });
}

auditProducts().catch(console.error);

