import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /coming-soon/configuracoes/modo-em-breve - Fetch coming soon configuration
router.get('/configuracoes/modo-em-breve', async (req, res) => {
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

// POST /coming-soon/leads-prelancamento - Create new pre-launch lead
router.post('/leads-prelancamento', async (req, res) => {
  const { email } = req.body;

  // Validate email is provided
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email é obrigatório' });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Formato de email inválido' });
  }

  // Check if email already exists
  const existingLeads = await pb.collection('leads_prelancamento').getFullList({
    filter: `email = "${email}"`,
  });

  if (existingLeads.length > 0) {
    throw new Error('Email já cadastrado');
  }

  // Create new lead record
  const novoLead = await pb.collection('leads_prelancamento').create({
    email,
    origem: 'pagina_em_breve',
  });

  logger.info(`Lead pré-lançamento criado: email=${email}, id=${novoLead.id}`);

  res.status(201).json({
    success: true,
    message: 'Email cadastrado com sucesso',
  });
});

// GET /coming-soon/leads-prelancamento - Fetch all pre-launch leads (admin only)
router.get('/leads-prelancamento', async (req, res) => {
  // Check admin authentication
  if (!req.auth || !req.auth.id) {
    return res.status(401).json({ error: 'Autenticação necessária' });
  }

  // Fetch all leads ordered by created DESC
  const leads = await pb.collection('leads_prelancamento').getFullList({
    sort: '-created',
  });

  // Format response
  const leadsFormatados = leads.map((lead) => ({
    id: lead.id,
    email: lead.email,
    origem: lead.origem,
    created: lead.created,
  }));

  res.json(leadsFormatados);
});

export default router;