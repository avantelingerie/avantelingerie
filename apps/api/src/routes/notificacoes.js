import 'dotenv/config';
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Helper function to sync critical stock notifications based on configuracoes_estoque
async function syncStockNotifications() {
  try {
    const configs = await pb.collection('configuracoes_estoque').getFullList({ $autoCancel: false });
    const limiteAlerta = (configs.length > 0 && configs[0].limite_alerta_global != null)
      ? Number(configs[0].limite_alerta_global)
      : 10;

    const variacoes = await pb.collection('variacoes').getFullList({
      expand: 'produto_id',
      $autoCancel: false,
    });

    const unreadStockNotifs = await pb.collection('notificacoes').getFullList({
      filter: 'tipo = "estoque_baixo" && lida = false',
      $autoCancel: false,
    });

    const unreadMap = new Map();
    unreadStockNotifs.forEach((n) => {
      if (n.referencia_id) unreadMap.set(n.referencia_id, n);
    });

    for (const v of variacoes) {
      const qtd = v.estoque ?? 0;
      const isCritical = qtd <= limiteAlerta;
      const existingNotif = unreadMap.get(v.id);

      if (isCritical && !existingNotif) {
        const prod = v.expand?.produto_id;
        const prodNome = prod?.nome_produto || prod?.nome || prod?.name || 'Produto';
        const varDesc = [v.cor, v.tamanho].filter(Boolean).join(' ') || v.sku || 'Variação';
        const isZerado = qtd === 0;

        await pb.collection('notificacoes').create({
          tipo: 'estoque_baixo',
          titulo: isZerado ? `Estoque Zerado: ${prodNome}` : `Estoque Baixo: ${prodNome}`,
          mensagem: `${varDesc} está com ${qtd} un (limite de alerta: ${limiteAlerta} un). Providencie reposição.`,
          lida: false,
          referencia_id: v.id,
        });
      } else if (!isCritical && existingNotif) {
        // Se a variação foi reabastecida acima do limite, marca a notificação como lida automaticamente
        await pb.collection('notificacoes').update(existingNotif.id, {
          lida: true,
        });
      }
    }
  } catch (err) {
    logger.warn(`[notificacoes] Aviso ao sincronizar alertas de estoque: ${err?.message || err}`);
  }
}

// GET /notificacoes - Fetch all notifications sorted by lida (unread first) then by created (newest first)
router.get('/', async (req, res) => {
  try {
    await syncStockNotifications();

    const notificacoes = await pb.collection('notificacoes').getFullList({
      sort: 'lida,-created',
      $autoCancel: false,
    });

    res.json(notificacoes);
  } catch (err) {
    logger.error('Erro ao buscar notificações:', err);
    res.status(500).json({ erro: 'Falha ao buscar notificações' });
  }
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