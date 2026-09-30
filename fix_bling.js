const fs = require('fs');
const path = 'apps/api/src/routes/bling.js';
let content = fs.readFileSync(path, 'utf8');

const regex = /if \(checkParentResponse\.data && checkParentResponse\.data\.data && checkParentResponse\.data\.data\.length > 0\) \{[\s\S]*?\/\/ ATUALIZAR ESTOQUES DAS/g;

const replacement = \
    const parentPayload = {
      nome: product.name,
      codigo: parentSku,
      formato: 'V',
      tipo: 'P',
      condicao: 1, // 1 = Novo
      marca: 'Avante Lingerie',
      situacao: product.status === false ? 'I' : 'A',
      preco: product.price || 0,
      unidade: 'UN',
      pesoLiquido: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2,
      pesoBruto: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2,
      volumes: 1,
      dimensoes: {
        largura: parseFloat(product.largura_cm) || 20,
        altura: parseFloat(product.altura_cm) || 5,
        profundidade: parseFloat(product.comprimento_cm) || 15,
        unidadeMedida: 1 // 1 = Centimetros
      },
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
      logger.info('Produto pai e variacoes atualizados no Bling.');
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
        throw new Error('Falha ao obter resposta de cadastro do produto pai no Bling');
      }

      blingParentId = parentResponse.data.data.id;
      logger.info('Produto pai e variacoes cadastrados no Bling com ID: ' + blingParentId);
    }

    // ATUALIZAR ESTOQUES DAS\;

content = content.replace(regex, replacement);
fs.writeFileSync(path, content, 'utf8');
