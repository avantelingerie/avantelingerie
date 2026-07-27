import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// GET /notificacoes - Fetch all notifications sorted by lida (unread first) then by created (newest first)
router.get('/', async (req, res) => {
  const notificacoes = await pb.collection('notificacoes').getFullList({
    sort: 'lida,created',
  });

  res.json(notificacoes);
});

// POST /notificacoes/:id/marcar-lida - Mark a specific notification as read
router.post('/:id/marcar-lida', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new Error('ID da notificação é obrigatório');
  }

  const notificacaoAtualizada = await pb.collection('notificacoes').update(id, {
    lida: true,
  });

  logger.info(`Notificação marcada como lida: ${id}`);

  res.json({
    sucesso: true,
    mensagem: 'Notificação marcada como lida',
    record: notificacaoAtualizada,
  });
});

// POST /notificacoes/marcar-todas-lidas - Mark all notifications as read
router.post('/marcar-todas-lidas', async (req, res) => {
  const notificacoes = await pb.collection('notificacoes').getFullList();

  // Update each notification to mark as read
  const updatePromises = notificacoes.map((notificacao) =>
    pb.collection('notificacoes').update(notificacao.id, {
      lida: true,
    })
  );

  await Promise.all(updatePromises);

  logger.info(`Todas as notificações foram marcadas como lidas: ${notificacoes.length} registros atualizados`);

  res.json({
    sucesso: true,
    mensagem: 'Todas as notificações foram marcadas como lidas',
    total_atualizadas: notificacoes.length,
  });
});

export default router;