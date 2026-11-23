import fs from 'fs';
import path from 'path';
import pb from '../apps/api/src/utils/pocketbaseClient.js';

const IMAGES_DIR = 'C:\\Users\\comer\\Downloads\\Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras';

async function main() {
  console.log('--- INICIANDO CADASTRO DA CALCINHA TAILANDESA COM PÉROLAS ---');

  // 1. Categoria Calcinha
  console.log('\n[Passo 1] Buscando categoria Calcinha...');
  const categoriaCalcinha = await pb.collection('categorias').getFirstListItem('slug="calcinha" || nome="Calcinha"');
  console.log(`Categoria "Calcinha" confirmada! ID: ${categoriaCalcinha.id}`);

  // 2. Mapeamento de Imagens
  console.log('\n[Passo 2] Lendo imagens da pasta:', IMAGES_DIR);
  const colorImageMap = [
    { 
      cor: 'Preta', 
      frente: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-preta.png', 
      verso: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-preta-verso.png' 
    },
    { 
      cor: 'Vermelha', 
      frente: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-vermelha.png', 
      verso: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-vermelha-verso.png' 
    },
    { 
      cor: 'Branca', 
      frente: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-branca.png', 
      verso: 'Calcinha-Tailandesa-Pérolas-Fio-Dental-Sensual-Rendada-Espera-marido-assageadoras-branca-verso.png' 
    }
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

  const cores = ['Preta', 'Vermelha', 'Branca'];
  const tamanhos = [
    'M (38/40)',
    'G (40/42)',
    'GG (44/46)'
  ];

  const formData = new FormData();
  formData.append('name', 'Calcinha Tailandesa Pérolas Fio Dental Sensual Rendada Lingerie Espera Marido Massageadora');
  formData.append('status', 'false'); // Desativada conforme solicitado (aguardando precificação)
  formData.append('price', '0.01'); // Valor simbólico
  formData.append('price_wholesale', '0.01');
  formData.append('stock', '0');
  formData.append('categoria_id', categoriaCalcinha.id);
  formData.append('categoria', 'Calcinha');
  formData.append('reference', 'CAL-TAILAN-PERL-03');
  formData.append('is_novidade', 'true');
  formData.append('is_promocao', 'false');
  formData.append('is_combo', 'false');
  formData.append('peso_g', '50');
  formData.append('altura_cm', '2');
  formData.append('largura_cm', '12');
  formData.append('comprimento_cm', '17');

  const descricaoCompleta = `CALCINHA TAILANDESA COM PÉROLAS MASSAGEADORAS EM RENDA SENSUAL

A Calcinha Tailandesa com Pérolas Fio Dental Sensual foi criada para momentos especiais, noites românticas e para elevar a autoestima e a cumplicidade do casal. Confeccionada em renda floral ultra macia com toque aveludado e delicado, possui cordão de pérolas massageadoras na região íntima, proporcionando sensações únicas e prazerosas.

FICHA TÉCNICA E DIFERENCIAIS:
• Tecido: Renda floral ultra macia – toque extremamente delicado e suave que não pinica
• Modelo: Calcinha tailandesa fio dental com pérolas massageadoras na região íntima
• Detalhes: Pérolas polidas confortáveis e delicadas
• Cores: Preta, Vermelha e Branca
• Tamanhos: M, G e GG
• Forma: Padrão
• Elasticidade: Média com ajuste anatômico
• Transparência: Renda vazada sensual
• Indicação de uso: Momentos especiais, ocasiões íntimas, presente romântico e elevação da autoestima

TABELA DE MEDIDAS (EM CENTÍMETROS):
• M (Veste 38 a 40)  | Cintura 70–77 cm | Quadril 95–102 cm
• G (Veste 40 a 42)  | Cintura 78–85 cm | Quadril 103–110 cm
• GG (Veste 44 a 46) | Cintura 86–93 cm | Quadril 111–118 cm

DÚVIDAS FREQUENTES (FAQ):
• A renda pinica? Não. Confeccionada com renda premium ultra macia e agradável à pele.
• As pérolas incomodam? Não. São pérolas lisas e polidas, desenvolvidas com foco no conforto e na estimulação prazerosa durante o uso a dois.
• Como escolher o tamanho ideal? Utilize a tabela de medidas como referência; em caso de dúvida entre duas numerações, opte pelo tamanho maior.

SEGURANÇA NA COMPRA E GARANTIA:
• Todos os produtos possuem garantia de fábrica e suporte completo da Avante Lingerie Nova Friburgo.
• Embalagem 100% discreta e segura. Envio rápido para todo o Brasil.`;

  formData.append('description', descricaoCompleta);
  formData.append('desc_geral', 'Calcinha Tailandesa Pérolas Fio Dental Sensual Rendada. Renda ultra macia com pérolas massageadoras na região íntima para momentos especiais e sensações inesquecíveis.');
  formData.append('desc_tecido', 'Renda floral premium ultra macia com elastano (90% Poliamida, 10% Elastano) e cordão de pérolas lisas e polidas.');
  formData.append('desc_modelagem', 'Modelagem tailandesa fio dental sensual com laterais delicadas e cordão central de pérolas massageadoras com encaixe anatômico.');
  formData.append('desc_diferenciais', '• Pérolas massageadoras lisas e polidas\n• Renda ultra macia que não pinica\n• Fio dental sensual\n• Acabamento delicado de alta costura\n• Embalagem 100% discreta');
  formData.append('desc_cuidados', 'Lavar delicadamente à mão com sabão neutro. Não torcer as pérolas. Secar à sombra. Não usar máquina de lavar ou secadora.');
  formData.append('desc_compra_segura', 'Garantia de fábrica Avante Lingerie Nova Friburgo. Envio 100% discreto em embalagem opaca e segura para todo o Brasil.');

  formData.append('seo_title', 'Calcinha Tailandesa com Pérolas Fio Dental Rendada | Avante Lingerie');
  formData.append('seo_meta_description', 'Calcinha tailandesa com pérolas massageadoras fio dental em renda ultra macia. Sensualidade e conforto para momentos especiais. Direto de fábrica.');

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

  // 5. Criar Variações (3 cores x 3 tamanhos = 9 variações)
  console.log('\n[Passo 5] Criando 9 variações na coleção variacoes...');

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
    'Preta': 'PRETA',
    'Vermelha': 'VERM',
    'Branca': 'BRANCA'
  };

  let totalVariacoesCriadas = 0;
  for (const cor of cores) {
    for (const tamanho of tamanhos) {
      const sizeCode = skuSizeMap[tamanho] || 'UN';
      const colorCode = skuColorMap[cor] || 'COR';
      const sku = `AVL-CAL-TAILAN-${colorCode}-${sizeCode}`;

      const varData = {
        produto_id: createdProduct.id,
        cor: cor,
        tamanho: tamanho,
        sku: sku,
        estoque: 0,
        preco: 0.01,
        preco_atacado: 0.01,
        imagem_url: colorToFileMap[cor] || mainImage,
        status: false // Desativada conforme solicitado
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
