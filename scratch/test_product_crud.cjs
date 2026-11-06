const PocketBase = require('pocketbase/cjs');

async function testProductCRUD() {
  const pb = new PocketBase('https://avantelingerie.com.br/hcgi/platform');
  await pb.admins.authWithPassword('admin@avantelingerie.com.br', 'Admin@123456');

  // Fetch an existing product to get a valid categoria_id
  const existingProd = await pb.collection('products').getFirstListItem('');
  console.log('Existing product sample:', {
    id: existingProd.id,
    name: existingProd.name,
    categoria_id: existingProd.categoria_id
  });

  // Test creating product with the calcinha preset
  const testProd = await pb.collection('products').create({
    name: 'TESTE AUTOMATIZADO - CALCINHA PRESET',
    categoria_id: existingProd.categoria_id,
    reference: 'TEST-CAL-9999',
    price: 19.90,
    price_wholesale: 15.00,
    peso_g: 60,
    altura_cm: 2,
    largura_cm: 12,
    comprimento_cm: 17,
    status: false
  });
  console.log('Created test product successfully:', testProd.id, testProd.name, {
    peso: testProd.peso_g,
    dimensoes: `${testProd.altura_cm}x${testProd.largura_cm}x${testProd.comprimento_cm}`
  });

  // Cleanup: delete the test product
  await pb.collection('products').delete(testProd.id);
  console.log('Cleaned up test product.');
}

testProductCRUD().catch(console.error);
