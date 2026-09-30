const fs = require('fs');
let c = fs.readFileSync('apps/api/src/routes/bling.js', 'utf8');

const search = /if\s*\(checkParentResponse\.data\s*&&\s*checkParentResponse\.data\.data\s*&&\s*checkParentResponse\.data\.data\.length\s*>\s*0\)\s*\{[\s\S]*?\/\/\s*ATUALIZAR ESTOQUES DAS/g;

const rep = `    const parentPayload = {
      nome: product.name,
      codigo: parentSku,
      formato: 'V',
      tipo: 'P',
      condicao: 1,
      marca: 'Avante Lingerie',
      situacao: product.status === false ? 'I' : 'A',
      preco: product.price || 0,
      unidade: 'UN',
      pesoLiquido: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2,
      pesoBruto: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2,
      volumes: 1,
      dimensoes: { largura: parseFloat(product.largura_cm) || 20, altura: parseFloat(product.altura_cm) || 5, profundidade: parseFloat(product.comprimento_cm) || 15, unidadeMedida: 1 },
      tributacao: produtoNcm ? { ncm: produtoNcm } : undefined,
      descricaoCurta: product.description || '',
      variacoes: blingVariacoes
    };

    if (checkParentResponse.data && checkParentResponse.data.data && checkParentResponse.data.data.length > 0) {
      blingParentId = checkParentResponse.data.data[0].id;
      logger.info('Produto pai ja existe no Bling com ID: ' + blingParentId + '. Atualizando via PUT...');
      
      await axios.put(
        'https://api.bling.com.br/Api/v3/produtos/' + blingParentId,
        parentPayload,
        {
          headers: {
            'Authorization': 'Bearer ' + blingApiToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      logger.info('Produto e variacoes atualizados no Bling.');
    } else {
      logger.info('Cadastrando produto pai no Bling: ' + product.name);
      const parentResponse = await axios.post(
        'https://api.bling.com.br/Api/v3/produtos',
        parentPayload,
        {
          headers: {
            'Authorization': 'Bearer ' + blingApiToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (!parentResponse.data || !parentResponse.data.data) {
        throw new Error('Falha ao cadastrar');
      }
      blingParentId = parentResponse.data.data.id;
    }

    // ATUALIZAR ESTOQUES DAS`;

const newContent = c.replace(search, rep);
if(newContent === c) {
    console.error("No match found!");
    process.exit(1);
}
fs.writeFileSync('apps/api/src/routes/bling.js', newContent, 'utf8');
console.log("Success");
