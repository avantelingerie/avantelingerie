const PocketBase = require('pocketbase/cjs');

async function checkProduct() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');
  const prods = await pb.collection('products').getFullList({
    filter: 'reference ~ "8949" || name ~ "8949" || name ~ "Cropped"'
  });
  console.log('Found products:', prods.length);
  prods.forEach(p => {
    console.log({
      id: p.id,
      name: p.name,
      reference: p.reference,
      peso_g: p.peso_g,
      altura_cm: p.altura_cm,
      largura_cm: p.largura_cm,
      comprimento_cm: p.comprimento_cm
    });
  });
}

checkProduct().catch(console.error);

