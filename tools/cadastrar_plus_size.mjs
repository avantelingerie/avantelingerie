import fs from 'fs';
import path from 'path';
import pb from '../apps/api/src/utils/pocketbaseClient.js';

const IMAGES_DIR = 'C:\\Users\\comer\\Downloads\\calcinha-cintura-alta-modeladora-pluz-size-microfibra-gestante-hot-pants-pós-parto-calçola';

async function main() {
  console.log('--- INICIANDO CADASTRO DE CATEGORIA E PRODUTO PLUS SIZE ---');

  // 1. Categoria Plus Size
  console.log('\n[Passo 1] Verificando / Criando categoria Plus Size...');
  let categoriaPlus = null;
  try {
    categoriaPlus = await pb.collection('categorias').getFirstListItem('slug="plus-size"');
    console.log(`Categoria "Plus Size" já existia! ID: ${categoriaPlus.id}`);
  } catch (err) {
    console.log('Categoria não encontrada pelo slug. Buscando por nome...');
    try {
      categoriaPlus = await pb.collection('categorias').getFirstListItem('nome="Plus Size"');
      console.log(`Categoria "Plus Size" encontrada por nome! ID: ${categoriaPlus.id}`);
    } catch (e) {
      console.log('Criando nova categoria "Plus Size"...');
      categoriaPlus = await pb.collection('categorias').create({
        nome: 'Plus Size',
        slug: 'plus-size',
        ativo: true
      });
      console.log(`Categoria "Plus Size" criada com sucesso! ID: ${categoriaPlus.id}`);
    }
  }

  // 2. Mapeamento de Imagens
  console.log('\n[Passo 2] Lendo imagens da pasta:', IMAGES_DIR);
  const colorImageMap = [
    { cor: 'Bege', frente: 'calçola-senhora-pluz-size-bege.png', verso: 'calçola-senhora-pluz-size-bege-verso.png' },
    { cor: 'Branca', frente: 'calçola-senhora-pluz-size-branca.png', verso: 'calçola-senhora-pluz-size-branca-verso.png' },
    { cor: 'Marrom', frente: 'calçola-senhora-pluz-size-marrom.png', verso: 'calçola-senhora-pluz-size-marrom-verso.png' },
    { cor: 'Bordô', frente: 'calçola-senhora-pluz-size-bordô.png', verso: 'calçola-senhora-pluz-size-bordô-verso.png' },
    { cor: 'Azul Marinho', frente: 'calçola-senhora-pluz-size-azul-marinho.png', verso: 'calçola-senhora-pluz-size-azul-marinho-verso.png' },
    { cor: 'Azul Claro', frente: 'calçola-senhora-pluz-size-azul-claro.png', verso: 'calçola-senhora-pluz-size-azul-claro-verso.png' }
  ];

  const filesToUpload = [];
  const galleryLabels = [];

  for (const item of colorImageMap) {
    const frentePath = path.join(IMAGES_DIR, item.frente);
    const versoPath = path.join(IMAGES_DIR, item.verso);

    if (fs.existsSync(frentePath)) {
      filesToUpload.push({ filePath: frentePath, filename: item.frente, cor: item.cor, tipo: 'frente' });
      galleryLabels.push(item.cor);
    } else {
      console.warn(`Aviso: Arquivo ${frentePath} não encontrado!`);
    }

    if (fs.existsSync(versoPath)) {
      filesToUpload.push({ filePath: versoPath, filename: item.verso, cor: item.cor, tipo: 'verso' });
      galleryLabels.push(item.cor);
    } else {
      console.warn(`Aviso: Arquivo ${versoPath} não encontrado!`);
    }
  }

  console.log(`Total de imagens encontradas para upload: ${filesToUpload.length}`);

  // 3. Montar FormData para o Produto
  console.log('\n[Passo 3] Preparando criação do produto na coleção products...');

  const cores = ['Bege', 'Branca', 'Marrom', 'Bordô', 'Azul Marinho', 'Azul Claro'];
  const tamanhos = [
    'XG (46/48) / G1',
    'EG (50) / G2',
    'EG (52) / G3',
    'EG (54) / G4'
  ];

  const formData = new FormData();
  formData.append('name', 'Calcinha Cintura Alta Modeladora Plus Size Feminina Microfibra Gestante Hot Pants Pós-Parto Calçola Básica');
  formData.append('status', 'false'); // Usuário pediu expressamente para deixar desativada
  formData.append('price', '0.01'); // Valor simbólico mínimo exigido pelo banco (produto desativado)
  formData.append('price_wholesale', '0.01');
  formData.append('stock', '0');
  formData.append('categoria_id', categoriaPlus.id);
  formData.append('categoria', 'Plus Size');
  formData.append('reference', 'CAL-PLUS-MOD-01');
  formData.append('is_novidade', 'true');
  formData.append('is_promocao', 'false');
  formData.append('is_combo', 'false');
  formData.append('peso_g', '85');
  formData.append('altura_cm', '3');
  formData.append('largura_cm', '18');
  formData.append('comprimento_cm', '22');

  const descricaoCompleta = `CONFORTO, SUSTENTAÇÃO E MODELAGEM PARA O DIA A DIA

A calcinha cintura alta modeladora feminina ideal para quem busca conforto, sustentação abdominal e ajuste firme sem abrir mão da leveza.

Produzida em microfibra premium, ela modela suavemente a região abdominal, ajuda a valorizar a silhueta e garante segurança total com tecido sem transparência.

Ideal para quem procura calcinha feminina cintura alta confortável, que não enrola e não marca.

ESPECIFICAÇÕES TÉCNICAS:
• Modelo: Calcinha Alta Modeladora
• Material: Microfibra Premium
• Elasticidade: Alta
• Forro: 100% Algodão

DIFERENCIAIS DO PRODUTO:
• Laterais duplas
• Efeito modelador suave
• Não enrola
• Não sobe
• Sem transparência
• Forro 100% algodão

CORES:
Bege, Branca, Marrom, Bordô, Azul Marinho e Azul Claro

INDICAÇÃO DE USO:
Ideal para uso diário, vestidos, jeans, calças ajustadas e rotina. Recomendada também para gestantes e pós-parto. A calcinha modeladora feminina entrega sustentação com conforto real.

TABELA DE MEDIDAS:
• XG (46/48) / G1 | Cintura 94–101 cm | Quadril 119–126 cm
• EG (50) / G2   | Cintura 102–109 cm | Quadril 127–134 cm
• EG (52) / G3   | Cintura 110–117 cm | Quadril 135–142 cm
• EG (54) / G4   | Cintura 118–125 cm | Quadril 143–150 cm

FAQ:
• Não enrola? Não. Possui estrutura firme e laterais duplas.
• Marca na roupa? Não facilmente.
• É transparente? Não. Produto com tecido encorpado sem transparência.
• Modela mesmo? Sim, com compressão confortável sem sufocar.`;

  formData.append('description', descricaoCompleta);
  formData.append('desc_geral', 'Calcinha Cintura Alta Modeladora Feminina Microfibra Sem Transparência Não Enrola Plus Size. Conforto, sustentação abdominal e ajuste firme sem abrir mão da leveza.');
  formData.append('desc_tecido', 'Microfibra Premium de alta elasticidade com toque aveludado e suave. Forro 100% algodão para máxima respirabilidade e proteção da saúde íntima.');
  formData.append('desc_modelagem', 'Cintura alta hot pants / calçola com cós anatômico e laterais duplas que não enrolam e não sobem. Modela o abdômen com compressão suave e ajuste perfeito.');
  formData.append('desc_diferenciais', '• Laterais duplas estruturadas\n• Efeito modelador suave\n• Não enrola e não sobe\n• Sem transparência\n• Forro 100% algodão\n• Ideal para uso diário, gestante, pós-parto e sob vestidos ou calças ajustadas');
  formData.append('desc_cuidados', 'Lavar à mão ou em ciclo delicado com sabão neutro. Não usar alvejantes com cloro. Secar à sombra para preservar a elasticidade do tecido. Não passar a ferro.');
  formData.append('desc_compra_segura', 'Garantia de fábrica Avante Lingerie Nova Friburgo. Troca facilitada e envio seguro para todo o Brasil.');

  formData.append('seo_title', 'Calcinha Cintura Alta Modeladora Plus Size Microfibra | Avante Lingerie');
  formData.append('seo_meta_description', 'Calcinha cintura alta modeladora plus size feminina em microfibra. Não enrola, laterais duplas, sem transparência e forro 100% algodão. Direto da fábrica.');

  // Arrays JSON
  formData.append('colors', JSON.stringify(cores));
  formData.append('cores_disponiveis', JSON.stringify(cores));
  formData.append('sizes', JSON.stringify(tamanhos));
  formData.append('tamanhos_disponiveis', JSON.stringify(tamanhos));
  formData.append('gallery_labels', JSON.stringify(galleryLabels));

  // Anexar os arquivos
  console.log('Anexando arquivos de imagem ao FormData...');
  for (const item of filesToUpload) {
    const buffer = fs.readFileSync(item.filePath);
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('image', blob, item.filename);
  }

  console.log('Enviando criação para o PocketBase...');
  const createdProduct = await pb.collection('products').create(formData);
  console.log(`✅ PRODUTO CRIADO COM SUCESSO! ID: ${createdProduct.id}`);

  // 4. Configurar imagem principal, verso e galeria no produto
  console.log('\n[Passo 4] Ajustando imagens de capa e verso...');
  const uploadedFilenames = createdProduct.image || [];
  console.log(`Imagens gravadas no PocketBase (${uploadedFilenames.length}):`, uploadedFilenames);

  // A primeira imagem é Bege frente, a segunda Bege verso
  const mainImage = uploadedFilenames[0] || '';
  const versoImage = uploadedFilenames[1] || '';

  await pb.collection('products').update(createdProduct.id, {
    imagem_principal: mainImage,
    imagem_verso: versoImage,
    gallery: uploadedFilenames
  });
  console.log(`Imagem principal definida: ${mainImage}`);
  console.log(`Imagem verso definida: ${versoImage}`);

  // 5. Criar Variações (6 cores x 4 tamanhos = 24 variações)
  console.log('\n[Passo 5] Criando 24 variações na coleção variacoes...');

  // Mapear filename da frente para cada cor
  const colorToFileMap = {};
  colorImageMap.forEach((c, idx) => {
    // uploadedFilenames tem 2 imagens por cor: 0=BegeFrente, 1=BegeVerso, 2=BrancaFrente, 3=BrancaVerso, etc.
    const fileIdx = idx * 2;
    if (uploadedFilenames[fileIdx]) {
      colorToFileMap[c.cor] = uploadedFilenames[fileIdx];
    }
  });

  const skuSizeMap = {
    'XG (46/48) / G1': 'G1',
    'EG (50) / G2': 'G2',
    'EG (52) / G3': 'G3',
    'EG (54) / G4': 'G4'
  };

  const skuColorMap = {
    'Bege': 'BEGE',
    'Branca': 'BRANCA',
    'Marrom': 'MARROM',
    'Bordô': 'BORDO',
    'Azul Marinho': 'AZMAR',
    'Azul Claro': 'AZCLA'
  };

  let totalVariacoesCriadas = 0;
  for (const cor of cores) {
    for (const tamanho of tamanhos) {
      const sizeCode = skuSizeMap[tamanho] || 'UN';
      const colorCode = skuColorMap[cor] || 'COR';
      const sku = `AVL-CAL-PLUS-${colorCode}-${sizeCode}`;

      const varData = {
        produto_id: createdProduct.id,
        cor: cor,
        tamanho: tamanho,
        sku: sku,
        estoque: 0,
        preco: 0.00,
        preco_atacado: 0.00,
        imagem_url: colorToFileMap[cor] || mainImage,
        status: false // Desativado conforme solicitado
      };

      await pb.collection('variacoes').create(varData);
      totalVariacoesCriadas++;
    }
  }
  console.log(`✅ ${totalVariacoesCriadas} VARIAÇÕES CRIADAS COM SUCESSO!`);

  // 6. Verificação Final (Garantia de Qualidade / Regra de Ouro)
  console.log('\n[Passo 6] Validação Final no Banco de Dados...');
  const verifiedProduct = await pb.collection('products').getOne(createdProduct.id, {
    expand: 'categoria_id'
  });
  const verifiedVariacoes = await pb.collection('variacoes').getFullList({
    filter: `produto_id = "${createdProduct.id}"`
  });

  console.log('--- RESUMO DA VERIFICAÇÃO ---');
  console.log('ID do Produto:', verifiedProduct.id);
  console.log('Nome:', verifiedProduct.name);
  console.log('Categoria:', verifiedProduct.categoria, `(ID: ${verifiedProduct.categoria_id})`);
  console.log('Status:', verifiedProduct.status, '(Desativado conforme solicitado)');
  console.log('Preço:', verifiedProduct.price, '(Aguardando precificação)');
  console.log('Cores cadastradas:', verifiedProduct.colors);
  console.log('Tamanhos cadastrados:', verifiedProduct.sizes);
  console.log('Total de fotos na galeria:', verifiedProduct.image?.length);
  console.log('Total de variações registradas:', verifiedVariacoes.length);
  console.log('Link direto na loja (quando for ativado):', `https://avantelingerie.com.br/produto/${verifiedProduct.id}`);
  console.log('---------------------------------------------------------');
}

main().catch(err => {
  console.error('❌ ERRO NO CADASTRO:', err);
  if (err.data) console.error(JSON.stringify(err.data, null, 2));
  process.exit(1);
});
