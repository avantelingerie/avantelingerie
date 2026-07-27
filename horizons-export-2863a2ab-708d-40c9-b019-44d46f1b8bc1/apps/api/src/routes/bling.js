import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';
import { getBlingToken } from '../utils/blingTokenManager.js';
import { blingService } from '../services/blingService.js';
const getBlingErrorMessage = (error) => {
  if (error.response?.data?.error) {
    const err = error.response.data.error;
    let msg = err.message || '';
    if (err.description) {
      msg += ` (Detalhe: ${err.description})`;
    }
    if (err.fields && Array.isArray(err.fields)) {
      const fieldErrors = err.fields.map(f => {
        const fieldName = f.element || f.field || f.name || 'Campo';
        const fieldMsg = f.message || f.msg || f.mensagem || f.error || f.description || JSON.stringify(f);
        return `${fieldName}: ${fieldMsg}`;
      }).join(', ');
      if (fieldErrors) {
        msg += ` [Campos: ${fieldErrors}]`;
      }
    }
    return msg || JSON.stringify(error.response.data);
  }
  if (error.response?.data) {
    return typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : String(error.response.data);
  }
  return error.message;
};

const router = express.Router();

const handleBlingAuth = async (req, res) => {
  const { code, error, error_description } = req.query;
  const host = req.headers.host || '';
  let redirectDest = host.includes('localhost') || host.includes('127.0.0.1')
    ? 'http://localhost:3000/admin/integracoes'
    : '/admin/integracoes';

  if (error) {
    logger.error(`Bling OAuth Error: ${error} - ${error_description}`);
    return res.redirect(`${redirectDest}?bling_auth=error&error_msg=${encodeURIComponent(error_description || error)}`);
  }

  if (!code) {
    logger.error('Bling Auth: code não fornecido na callback URL.');
    return res.redirect(`${redirectDest}?bling_auth=error&error_msg=${encodeURIComponent('Code não fornecido')}`);
  }

  try {
    const clientIdRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="client_id"').catch(() => null);
    const clientSecretRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="client_secret"').catch(() => null);
    const redirectUriRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="redirect_uri"').catch(() => null);

    const clientId = clientIdRecord?.chave_valor;
    const clientSecret = clientSecretRecord?.chave_valor;
    const redirectUri = redirectUriRecord?.chave_valor;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error('Credenciais do Bling não configuradas no banco de dados.');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios.post(
      'https://www.bling.com.br/Api/v3/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${credentials}`,
        },
      }
    );

    if (!response.data || !response.data.access_token) {
      throw new Error('Resposta inválida do Bling: access_token não encontrado');
    }

    const { access_token, refresh_token, expires_in } = response.data;

    // Limpar tokens antigos
    try {
      const existingTokens = await pb.collection('bling_tokens').getFullList();
      for (const oldToken of existingTokens) {
        await pb.collection('bling_tokens').delete(oldToken.id);
      }
    } catch (clearErr) {
      logger.warn(`Erro ao limpar tokens antigos: ${clearErr.message}`);
    }

    const savedRecord = await pb.collection('bling_tokens').create({
      access_token,
      refresh_token,
      expires_in,
    });

    // Atualizar status no integracoes_config
    const existingConfigs = await pb.collection('integracoes_config').getFullList({
      filter: 'servico = "bling"',
    });
    if (existingConfigs.length > 0) {
      await pb.collection('integracoes_config').update(existingConfigs[0].id, {
        status_conexao: 'conectado',
        ultimo_teste: new Date().toISOString(),
      });
    } else {
      await pb.collection('integracoes_config').create({
        servico: 'bling',
        chave_nome: 'client_id',
        chave_valor: clientId,
        ativo: true,
        status_conexao: 'conectado',
        ultimo_teste: new Date().toISOString(),
      });
    }

    logger.info(`Token Bling salvo com sucesso: ${savedRecord.id}`);
    return res.redirect(`${redirectDest}?bling_auth=success`);
  } catch (error) {
    const errMsg = error.response?.data?.error?.message || error.response?.data?.message || error.message;
    logger.error(`Erro ao realizar autenticação com o Bling: ${errMsg}`);
    return res.redirect(`${redirectDest}?bling_auth=error&error_msg=${encodeURIComponent(errMsg)}`);
  }
};

const iniciarBlingAuth = async (req, res) => {
  try {
    const clientIdRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="client_id"').catch(() => null);
    const redirectUriRecord = await pb.collection('integracoes_config').getFirstListItem('servico="bling" && chave_nome="redirect_uri"').catch(() => null);

    const clientId = clientIdRecord?.chave_valor;
    const redirectUri = redirectUriRecord?.chave_valor;

    if (!clientId || !redirectUri) {
      return res.status(400).send('Client ID ou Redirect URI do Bling não configurados no painel.');
    }

    const state = 'bling_oauth_state';
    const authUrl = `https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

    logger.info(`Redirecionando para autenticação do Bling: ${authUrl}`);
    return res.redirect(authUrl);
  } catch (error) {
    logger.error(`Erro ao gerar URL de autorização do Bling: ${error.message}`);
    return res.status(500).send(`Erro interno ao iniciar autorização: ${error.message}`);
  }
};

const sincronizarEstoque = async (req, res) => {
  const { sku, quantidade_atual } = req.body;

  // Input validation - throw Error so errorMiddleware catches it
  if (!sku) {
    throw new Error('Campo "sku" é obrigatório');
  }

  if (quantidade_atual === undefined || quantidade_atual === null) {
    throw new Error('Campo "quantidade_atual" é obrigatório');
  }

  if (typeof quantidade_atual !== 'number' || quantidade_atual < 0) {
    throw new Error('Campo "quantidade_atual" deve ser um número não-negativo');
  }

  let blingApiToken;
  try {
    blingApiToken = await getBlingToken();
  } catch (tokenError) {
    logger.error(`Erro ao obter token do Bling para sincronizar estoque: ${tokenError.message}`);
    return res.status(200).json({
      sucesso: false,
      erro: `Erro de autenticação com o Bling: ${tokenError.message}. Recadastre suas credenciais no painel de Integrações.`,
    });
  }

  try {
    // Step 2: Fetch product from Bling to get product ID
    let blingProdutoId;
    try {
      const produtoResponse = await axios.get(
        `https://api.bling.com.br/Api/v3/produtos?codigo=${encodeURIComponent(sku)}`,
        { headers: { Authorization: `Bearer ${blingApiToken}`, Accept: 'application/json' } }
      );

      if (!produtoResponse.data || !produtoResponse.data.data || produtoResponse.data.data.length === 0) {
        return res.status(200).json({
          sucesso: false,
          erro: `Produto com SKU ${sku} não encontrado no Bling para sincronizar estoque.`,
        });
      }

      blingProdutoId = produtoResponse.data.data[0].id;
    } catch (produtoError) {
      logger.error(`Erro ao buscar produto no Bling (SKU: ${sku}): ${produtoError.message}`);
      throw new Error(`Erro ao buscar produto no Bling: ${getBlingErrorMessage(produtoError)}`);
    }

    // Step 3: Call Bling API POST /estoques to set the stock balance (Balanço)
    try {
      await axios.post(
        `https://api.bling.com.br/Api/v3/estoques`,
        { 
          produto: { id: blingProdutoId },
          operacao: 'B', // Balanço
          quantidade: quantidade_atual,
          preco: 0,
          custo: 0,
          observacoes: "Sincronizado automaticamente da Loja"
        },
        { headers: { Authorization: `Bearer ${blingApiToken}`, 'Content-Type': 'application/json' } }
      );

      logger.info(`Estoque sincronizado com sucesso no Bling para SKU: ${sku}`);
      return res.status(200).json({
        sucesso: true,
        mensagem: 'Estoque sincronizado com sucesso',
      });
    } catch (estoqueError) {
      const errorMsg = getBlingErrorMessage(estoqueError);
      logger.error(`Erro ao atualizar estoque no Bling (SKU: ${sku}): ${errorMsg}`);
      
      return res.status(200).json({
        sucesso: false,
        erro: `Erro no servidor do Bling ao atualizar estoque: ${errorMsg}`,
      });
    }
  } catch (error) {
    logger.error(`Erro inesperado em sincronizarEstoque: ${error.message}`);
    return res.status(200).json({
      sucesso: false,
      erro: `Erro inesperado: ${error.message}`,
    });
  }
};

const reenviarPedido = async (req, res) => {
  const { pedido_id } = req.body;
  if (!pedido_id) return res.status(400).json({ error: 'pedido_id é obrigatório' });
  
  try {
    const result = await blingService.processarEnvioPedidoBling(pedido_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message || 'Erro ao reenviar pedido' });
  }
};

const sincronizarProdutoCompleto = async (req, res) => {
  const { produto_id } = req.body;

  if (!produto_id) {
    return res.status(400).json({ sucesso: false, erro: 'Campo "produto_id" é obrigatório' });
  }

  let blingApiToken;
  try {
    blingApiToken = await getBlingToken();
  } catch (tokenError) {
    logger.error(`Erro ao obter token do Bling para cadastrar produto: ${tokenError.message}`);
    return res.status(400).json({
      sucesso: false,
      erro: `Erro de autenticação com o Bling: ${tokenError.message}. Recadastre suas credenciais.`,
    });
  }

  try {
    // 1. Fetch parent product from PocketBase
    const product = await pb.collection('products').getOne(produto_id);

    // Buscar a categoria para obter o NCM inteligente
    let categoryNcm = '';
    if (product.categoria_id) {
      try {
        const category = await pb.collection('categorias').getOne(product.categoria_id);
        if (category.ncm) {
          categoryNcm = category.ncm.replace(/\D/g, ''); // Bling prefere apenas números
        }
      } catch (err) {
        logger.warn(`Aviso: não foi possível obter o NCM da categoria: ${err.message}`);
      }
    }

    // 2. Fetch variations from PocketBase
    const variations = await pb.collection('variacoes').getFullList({
      filter: `produto_id = "${produto_id}"`,
    });

    if (variations.length === 0) {
      return res.status(200).json({
        sucesso: false,
        erro: 'O produto não possui variações cadastradas.',
      });
    }

    // 3. Montar a estrutura de variações esperada pelo Bling V3
    const blingVariacoes = variations.map(variation => {
      const atributos = [];
      if (variation.cor) atributos.push(`Cor:${variation.cor}`);
      if (variation.tamanho) atributos.push(`Tamanho:${variation.tamanho}`);
      const variacaoNome = atributos.length > 0 ? atributos.join(';') : 'Variação:Padrão';

      return {
        nome: `${product.name} - ${variation.cor || ''} ${variation.tamanho || ''}`.trim(),
        codigo: variation.sku,
        preco: variation.preco || product.price || 0,
        tipo: 'P',
        formato: 'S',
        condicao: 1, // 1 = Novo
        marca: 'Avante Lingerie',
        situacao: product.status === false ? 'I' : 'A',
        unidade: 'UN', // Fix: Obrigatório para emissão de NFe
        pesoLiquido: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2, // Convertendo de g para Kg (padrão 200g)
        pesoBruto: product.peso_g ? parseFloat(product.peso_g) / 1000 : 0.2,
        volumes: 1,
        dimensoes: {
          largura: parseFloat(product.largura_cm) || 20,
          altura: parseFloat(product.altura_cm) || 5,
          profundidade: parseFloat(product.comprimento_cm) || 15,
          unidadeMedida: 1 // 1 = Centímetros
        },
        tributacao: categoryNcm ? { ncm: categoryNcm } : undefined,
        estoque: {
          quantidade: variation.estoque || 0
        },
        variacao: {
          nome: variacaoNome
        }
      };
    });

    // 4. Register Parent Product on Bling (with check if already exists)
    const parentSku = product.reference || `REF-${product.id.substring(0, 8).toUpperCase()}`;
    let blingParentId;

    logger.info(`Verificando se produto pai já existe no Bling com SKU: ${parentSku}`);
    const checkParentResponse = await axios.get(
      `https://api.bling.com.br/Api/v3/produtos?codigo=${encodeURIComponent(parentSku)}`,
      {
        headers: {
          'Authorization': `Bearer ${blingApiToken}`,
          'Accept': 'application/json',
        }
      }
    );

    if (checkParentResponse.data && checkParentResponse.data.data && checkParentResponse.data.data.length > 0) {
      blingParentId = checkParentResponse.data.data[0].id;
      logger.info(`Produto pai já existe no Bling com ID: ${blingParentId}. Atualização não implementada para não sobrescrever.`);
    } else {
      logger.info(`Cadastrando produto pai no Bling: ${product.name}`);
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
          unidadeMedida: 1 // 1 = Centímetros
        },
        tributacao: categoryNcm ? { ncm: categoryNcm } : undefined,
        descricaoCurta: product.description || '',
        variacoes: blingVariacoes
      };

      const parentResponse = await axios.post(
        'https://api.bling.com.br/Api/v3/produtos',
        parentPayload,
        {
          headers: {
            'Authorization': `Bearer ${blingApiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      if (!parentResponse.data || !parentResponse.data.data) {
        throw new Error('Falha ao obter resposta de cadastro do produto pai no Bling');
      }

      blingParentId = parentResponse.data.data.id;
      logger.info(`Produto pai e variações cadastrados no Bling com ID: ${blingParentId}`);

      // ATUALIZAR ESTOQUES DAS VARIAÇÕES
      logger.info(`Iniciando lançamento de estoque (Balanço) das variações no Bling...`);
      
      // Delay de 2 segundos para dar tempo ao Bling de persistir a criação no banco de dados deles
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Buscar o ID do depósito padrão do Bling, exigido pela API v3
      let depositoId = null;
      try {
        const depRes = await axios.get(
          'https://api.bling.com.br/Api/v3/depositos', 
          { headers: { 'Authorization': `Bearer ${blingApiToken}` } }
        );
        if (depRes.data?.data?.length > 0) {
          depositoId = depRes.data.data[0].id;
          logger.info(`Depósito padrão encontrado: ${depositoId}`);
        }
      } catch (depErr) {
        logger.warn(`Não foi possível obter a lista de depósitos (/depositos): ${depErr.message}`);
      }

      for (const variation of variations) {
        if (variation.estoque > 0) {
          try {
            // Buscar o ID do produto filho pelo SKU
            const childRes = await axios.get(
              `https://api.bling.com.br/Api/v3/produtos?codigo=${encodeURIComponent(variation.sku)}`,
              { headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Accept': 'application/json' } }
            );
            if (childRes.data?.data?.length > 0) {
              const childId = childRes.data.data[0].id;
              
              const payloadEstoque = { 
                produto: { id: childId },
                operacao: 'B', // B = Balanço (sobrepõe quantidade existente)
                quantidade: variation.estoque,
                preco: variation.preco || product.price || 0,
                custo: 0,
                observacoes: "Sincronizado automaticamente da Loja"
              };
              
              if (depositoId) {
                payloadEstoque.deposito = { id: depositoId };
              }

              // Lançar Balanço (B) de Estoque via endpoint oficial /estoques
              await axios.post(
                `https://api.bling.com.br/Api/v3/estoques`,
                payloadEstoque,
                { headers: { 'Authorization': `Bearer ${blingApiToken}`, 'Content-Type': 'application/json' } }
              );
              logger.info(`Balanço de Estoque lançado no Bling para SKU ${variation.sku}: ${variation.estoque}`);
            }
          } catch (estoqueErr) {
            const errorMsg = estoqueErr.response?.data?.error?.message || estoqueErr.message;
            const fullError = estoqueErr.response?.data ? JSON.stringify(estoqueErr.response.data) : estoqueErr.message;
            logger.warn(`Erro não impeditivo ao lançar estoque da variação ${variation.sku}: ${errorMsg}`);
            
            // Gravar o erro exato do Bling em um arquivo de log para depuração
            try {
              const fs = require('fs');
              const path = require('path');
              const logPath = path.join(process.cwd(), 'bling_estoque_error.log');
              fs.appendFileSync(logPath, `[${new Date().toISOString()}] SKU ${variation.sku} - Payload: ${JSON.stringify(payloadEstoque || {})} - Erro: ${fullError}\n`);
            } catch(e) {}
          }
        }
      }
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: `Sincronização de produto com variações concluída.`,
      bling_parent_id: blingParentId,
      erros: null,
    });
  } catch (error) {
    const errMsg = getBlingErrorMessage(error);
    logger.error(`Erro ao cadastrar produto completo no Bling: ${errMsg}`);
    return res.status(500).json({
      sucesso: false,
      erro: `Erro no servidor ao sincronizar com Bling: ${errMsg}`,
    });
  }
};

const webhookEstoque = async (req, res) => {
  // O Bling exige que retornemos 200 OK rapidamente para não travar o webhook deles.
  res.status(200).send('OK');

  try {
    let payload = req.body;
    
    // O Bling às vezes envia os dados dentro de um campo 'data' em formato string JSON (application/x-www-form-urlencoded)
    if (payload.data && typeof payload.data === 'string') {
      try {
        payload = JSON.parse(payload.data);
      } catch (e) {
        logger.error(`Erro ao fazer parse do JSON do webhook do Bling: ${e.message}`);
        return;
      }
    }

    // Estrutura padrão de retorno de webhook de estoque no Bling V2/V3
    const estoques = payload?.retorno?.estoques || payload?.data?.retorno?.estoques || payload?.data;
    
    if (!estoques || !Array.isArray(estoques)) {
      logger.warn('Webhook de estoque do Bling recebido sem array de estoques válido:', JSON.stringify(payload));
      return;
    }

    for (const item of estoques) {
      const estoqueInfo = item.estoque || item;
      const sku = estoqueInfo.codigo || estoqueInfo.sku;
      const saldoAtual = estoqueInfo.estoqueAtual !== undefined ? parseInt(estoqueInfo.estoqueAtual) : null;

      if (!sku || saldoAtual === null) continue;

      // Buscar a variação no PocketBase pelo SKU
      try {
        const records = await pb.collection('variacoes').getFullList({
          filter: `sku = "${sku}"`,
          $autoCancel: false
        });

        if (records.length > 0) {
          const variacao = records[0];
          const qtd_anterior = variacao.estoque || 0;

          if (qtd_anterior !== saldoAtual) {
            // Atualizar o estoque na variação
            await pb.collection('variacoes').update(variacao.id, {
              estoque: saldoAtual
            }, { $autoCancel: false });

            // Registrar a movimentação no histórico
            const tipoMovimentacao = saldoAtual > qtd_anterior ? 'entrada' : 'saida';
            const diferenca = Math.abs(saldoAtual - qtd_anterior);

            await pb.collection('movimentacoes_estoque').create({
              variacao_id: variacao.id,
              sku: sku,
              tipo: tipoMovimentacao,
              quantidade: diferenca,
              motivo: 'outros',
              motivo_livre: 'Sincronização Automática via Bling',
              qtd_anterior: qtd_anterior,
              qtd_atual: saldoAtual,
              bling_sincronizado: true, // Já veio do Bling
              bling_erro: ''
            }, { $autoCancel: false });

            logger.info(`Webhook Bling: Estoque do SKU ${sku} atualizado de ${qtd_anterior} para ${saldoAtual}.`);
          }
        } else {
          logger.warn(`Webhook Bling: SKU ${sku} não encontrado na loja.`);
        }
      } catch (pbError) {
        logger.error(`Webhook Bling: Erro ao atualizar SKU ${sku} no PocketBase: ${pbError.message}`);
      }
    }

  } catch (error) {
    logger.error(`Erro inesperado no processamento do webhook de estoque: ${error.message}`);
  }
};

router.get('/auth', handleBlingAuth);
router.post('/auth', handleBlingAuth);
router.get('/callback', handleBlingAuth);
router.get('/autorizar', iniciarBlingAuth);
router.post('/sincronizar-estoque', sincronizarEstoque);
router.post('/pedidos/reenviar', reenviarPedido);
router.post('/produtos/sincronizar', sincronizarProdutoCompleto);
router.post('/webhook/estoque', express.json(), express.urlencoded({ extended: true }), webhookEstoque);

export default router;