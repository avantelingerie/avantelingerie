import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /configuracoes/modo-em-breve - Fetch coming soon configuration
router.get('/modo-em-breve', async (req, res) => {
  logger.info('Fetching coming soon configuration from configuracoes_estoque collection');

  let config;
  try {
    config = await pb.collection('configuracoes_estoque').getFirstListItem('');
    logger.info(`Configuration found: ${config.id}`);
  } catch (error) {
    logger.warn(`No configuration record found in configuracoes_estoque collection: ${error.message}`);
    // Return default structure with null values if no record exists
    return res.json({
      modo_em_breve: null,
      data_lancamento: null,
      instagram_url: null,
      whatsapp_url: null,
      tiktok_url: null,
      facebook_url: null,
    });
  }

  // Return exact structure with null for missing fields
  const response = {
    modo_em_breve: config.modo_em_breve ?? null,
    data_lancamento: config.data_lancamento ?? null,
    instagram_url: config.instagram_url ?? null,
    whatsapp_url: config.whatsapp_url ?? null,
    tiktok_url: config.tiktok_url ?? null,
    facebook_url: config.facebook_url ?? null,
  };

  logger.info(`Returning configuration: ${JSON.stringify(response)}`);
  res.json(response);
});

// GET /configuracoes/loja - Fetch store configuration
router.get('/loja', async (req, res) => {
  const configs = await pb.collection('configuracoes_estoque').getFullList();

  if (configs.length === 0) {
    return res.json({
      nome_loja: '',
      email_contato: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      cnpj: '',
      inscricao_estadual: '',
    });
  }

  res.json(configs[0]);
});

// POST /configuracoes/loja - Update store configuration
router.post('/loja', async (req, res) => {
  const configData = req.body;

  if (!configData || Object.keys(configData).length === 0) {
    throw new Error('Dados de configuração não fornecidos');
  }

  const configs = await pb.collection('configuracoes_estoque').getFullList();

  let savedConfig;
  if (configs.length > 0) {
    // Update existing config
    savedConfig = await pb.collection('configuracoes_estoque').update(configs[0].id, configData);
    logger.info(`Configuração de loja atualizada: ${configs[0].id}`);
  } else {
    // Create new config
    savedConfig = await pb.collection('configuracoes_estoque').create(configData);
    logger.info(`Configuração de loja criada: ${savedConfig.id}`);
  }

  res.json({
    sucesso: true,
    mensagem: 'Configuração de loja salva com sucesso',
    config: savedConfig,
  });
});

// GET /configuracoes/frete - Fetch all free shipping rules sorted by priority
router.get('/frete', async (req, res) => {
  const regras = await pb.collection('regras_frete_gratis').getFullList({
    sort: 'prioridade',
  });

  res.json(regras);
});

// POST /configuracoes/frete - Create new free shipping rule
router.post('/frete', async (req, res) => {
  const { tipo, cep_inicio, cep_fim, cidade, estado, valor_minimo, ativo, prioridade } = req.body;

  if (!tipo) {
    throw new Error('Campo obrigatório: tipo');
  }

  const novaRegra = await pb.collection('regras_frete_gratis').create({
    tipo,
    cep_inicio: cep_inicio || null,
    cep_fim: cep_fim || null,
    cidade: cidade || null,
    estado: estado || null,
    valor_minimo: valor_minimo || 0,
    ativo: ativo !== undefined ? ativo : true,
    prioridade: prioridade || 0,
  });

  logger.info(`Regra de frete grátis criada: ${novaRegra.id}`);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Regra de frete grátis criada com sucesso',
    record_id: novaRegra.id,
  });
});

// PUT /configuracoes/frete/:id - Update free shipping rule
router.put('/frete/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new Error('ID da regra é obrigatório');
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new Error('Dados de atualização não fornecidos');
  }

  const regraAtualizada = await pb.collection('regras_frete_gratis').update(id, updateData);

  logger.info(`Regra de frete grátis atualizada: ${id}`);

  res.json({
    sucesso: true,
    mensagem: 'Regra de frete grátis atualizada com sucesso',
    record: regraAtualizada,
  });
});

// DELETE /configuracoes/frete/:id - Delete free shipping rule
router.delete('/frete/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error('ID da regra é obrigatório');
  }

  await pb.collection('regras_frete_gratis').delete(id);

  logger.info(`Regra de frete grátis deletada: ${id}`);

  res.json({
    sucesso: true,
    mensagem: 'Regra de frete grátis deletada com sucesso',
  });
});

export default router;