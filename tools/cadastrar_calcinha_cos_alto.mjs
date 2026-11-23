import fs from 'fs';
import path from 'path';
import pb from '../apps/api/src/utils/pocketbaseClient.js';

const IMAGES_DIR = 'C:\\Users\\comer\\Downloads\\calcinha-cós-alto-fio-duplo-cinta-modeladora';

async function main() {
  console.log('--- INICIANDO CADASTRO DE CALCINHA CÓS ALTO FIO DUPLO ---');

  // 1. Categoria Calcinha
  console.log('\n[Passo 1] Buscando categoria Calcinha...');
  const categoriaCalcinha = await pb.collection('categorias').getFirstListItem('slug="calcinha" || nome="Calcinha"');
  console.log(`Categoria "Calcinha" confirmada! ID: ${categoriaCalcinha.id}`);

  // 2. Mapeamento de Imagens
  console.log('\n[Passo 2] Lendo imagens da pasta:', IMAGES_DIR);
  const colorImageMap = [
    { cor: 'Bege', frente: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-bege.png', verso: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-bege-verso.png' },
    { cor: 'Cinza', frente: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-cinza.png', verso: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-cinza-verso.png' },
    { cor: 'Vinho', frente: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-vinho.png', verso: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-vinho-verso.png' },
    { cor: 'Azul Marinho', frente: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-azul-marinho.png', verso: 'calcinha-cós-alto-fio-duplo-cinta-modeladora-azul-marinho-verso.png' }
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

  const cores = ['Bege', 'Cinza', 'Vinho', 'Azul Marinho'];
  const tamanhos = [
    'M (38/40)',
    'G (40/42)',
    'GG (44/46)'
  ];

  const formData = new FormData();
  formData.append('name', 'Calcinha Cós Alto Fio Duplo Cinta Modeladora Cintura Alta Lingerie Feminina');
  formData.append('status', 'false'); // Desativada conforme solicitado
  formData.append('price', '0.01'); // Valor simbólico aguardando precificação do lojista
  formData.append('price_wholesale', '0.01');
  formData.append('stock', '0');
  formData.append('categoria_id', categoriaCalcinha.id);
  formData.append('categoria', 'Calcinha');
  formData.append('reference', 'CAL-COS-FIO-02');
  formData.append('is_novidade', 'true');
  formData.append('is_promocao', 'false');
  formData.append('is_combo', 'false');
  formData.append('peso_g', '60');
  formData.append('altura_cm', '2');
  formData.append('largura_cm', '16');
  formData.append('comprimento_cm', '20');

  const descricaoCompleta = `CONFORTO, POSTURA E MODELAGEM DA SILHUETA

A Calcinha Cós Alto Fio Duplo Cinta Modeladora foi desenvolvida para quem busca ajuste perfeito ao corpo, leve redução de medidas e postura firme com total liberdade de movimentos.

Com cós alto anatômico que modela a cintura sem apertar e acabamento traseiro em fio dental duplo sem costura na cava, ela garante segurança total e não marca em roupas justas, vestidos ou macacões.

DIFERENCIAIS DO PRODUTO:
• Ajuste perfeito e anatômico ao corpo
• Modela a silhueta com leve compressão abdominal
• Confortável, macia e prática para o dia a dia
• Versátil: ideal para usar sob vestidos, calças, saias e macacões
• Fio dental duplo sem costura que não divide o bumbum e não marca
• Indicada também para prática de esportes e ginástica
• Forro 100% algodão para máxima respirabilidade e saúde íntima
• Costura reforçada com padrão de fábrica

COMPOSIÇÃO:
• Tecido: 90% Poliéster / 10% Elastano
• Forro: 100% Algodão

CORES DISPONÍVEIS:
Bege, Cinza, Vinho e Azul Marinho

TABELA DE MEDIDAS (EM CENTÍMETROS):
• M (Veste 38 a 40)  | Cintura 70–77 cm | Quadril 95–102 cm
• G (Veste 40 a 42)  | Cintura 78–85 cm | Quadril 103–110 cm
• GG (Veste 44 a 46) | Cintura 86–93 cm | Quadril 111–118 cm

INDICAÇÃO DE USO:
Uso diário, trabalho, festas, roupas de academia e ocasiões que exigem sustentação impecável sem marcações externas.`;

  formData.append('description', descricaoCompleta);
  formData.append('desc_geral', 'Calcinha Cós Alto Fio Duplo Cinta Modeladora Cintura Alta Feminina. Modela a silhueta, disfarça medidas e não marca na roupa com efeito fio dental duplo anatômico.');
  formData.append('desc_tecido', 'Tecido com 90% Poliéster e 10% Elastano de alta elasticidade e toque macio. Forro 100% algodão hipoalergênico.');
  formData.append('desc_modelagem', 'Cós alto modelador anatômico na cintura e parte posterior em fio dental duplo que valoriza as curvas sem marcar e sem machucar.');
  formData.append('desc_diferenciais', '• Cós alto com compressão suave\n• Fio duplo que não marca na roupa\n• Ideal para uso sob vestidos, jeans e roupas de ginástica\n• Forro 100% algodão\n• Costura reforçada');
  formData.append('desc_cuidados', 'Lavar à mão ou em ciclo delicado na máquina com sabão neutro. Não usar alvejante clorado. Secar à sombra para preservar a elasticidade do tecido.');
  formData.append('desc_compra_segura', 'Garantia de fábrica Avante Lingerie Nova Friburgo. Troca facilitada e envio seguro para todo o Brasil.');

  formData.append('seo_title', 'Calcinha Cós Alto Fio Duplo Cinta Modeladora | Avante Lingerie');
  formData.append('seo_meta_description', 'Calcinha cós alto fio duplo cinta modeladora feminina. Modela a silhueta, disfarça medidas e não marca na roupa. Forro 100% algodão direto da fábrica.');

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

  const mainImage = uploadedFilenames[0] || '';
  const versoImage = uploadedFilenames[1] || '';

  await pb.collection('products').update(createdProduct.id, {
    imagem_principal: mainImage,
    imagem_verso: versoImage,
    gallery: uploadedFilenames
  });
  console.log(`Imagem principal definida: ${mainImage}`);
  console.log(`Imagem verso definida: ${versoImage}`);

  // 5. Criar Variações (4 cores x 3 tamanhos = 12 variações)
  console.log('\n[Passo 5] Criando 12 variações na coleção variacoes...');

  const colorToFileMap = {};
  colorImageMap.forEach((c, idx) => {
    const fileIdx = idx * 2;
    if (uploadedFilenames[fileIdx]) {
      colorToFileMap[c.cor] = uploadedFilenames[fileIdx];
    }
  });

  const skuSizeMap = {
    'M (38/40)': 'M',
    'G (40/42)': 'G',
    'GG (44/46)': 'GG'
  };

  const skuColorMap = {
    'Bege': 'BEGE',
    'Cinza': 'CINZA',
    'Vinho': 'VINHO',
    'Azul Marinho': 'AZMAR'
  };

  let totalVariacoesCriadas = 0;
  for (const cor of cores) {
    for (const tamanho of tamanhos) {
      const sizeCode = skuSizeMap[tamanho] || 'UN';
      const colorCode = skuColorMap[cor] || 'COR';
      const sku = `AVL-CAL-MODFIO-${colorCode}-${sizeCode}`;

      const varData = {
        produto_id: createdProduct.id,
        cor: cor,
        tamanho: tamanho,
        sku: sku,
        estoque: 0,
        preco: 0.01,
        preco_atacado: 0.01,
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
