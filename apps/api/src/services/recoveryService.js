import cron from 'node-cron';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

class RecoveryService {
  constructor() {
    this.cronTask = null;
    this.isProcessing = false;
  }

  start() {
    logger.info('[RecoveryService] Motor da Lia Atiradora inicializado (rodando a cada 5 minutos).');
    
    // Executa a cada 5 minutos
    this.cronTask = cron.schedule('*/5 * * * *', async () => {
      if (this.isProcessing) return;
      this.isProcessing = true;
      
      try {
        await this.processAbandonedOrders();
      } catch (error) {
        logger.error(`[RecoveryService] Erro na rotina: ${error.message}`);
      } finally {
        this.isProcessing = false;
      }
    });
  }

  stop() {
    if (this.cronTask) {
      this.cronTask.stop();
      logger.info('[RecoveryService] Motor da Lia Atiradora parado.');
    }
  }

  async processAbandonedOrders() {
    try {
      // Calcula o momento exato de 45 minutos atrás
      const fortyFiveMinsAgo = new Date(Date.now() - 45 * 60 * 1000);
      const isoThreshold = fortyFiveMinsAgo.toISOString().replace('T', ' '); // PocketBase suporta o formato YYYY-MM-DD HH:mm:ss.SSSZ

      // Busca pedidos pendentes criados antes desse threshold que ainda não receberam recuperação
      const queryFilter = `status = 'pendente' && recuperacao_enviada = false && created <= "${isoThreshold}"`;
      
      const pedidosPendentes = await pb.collection('pedidos').getFullList({
        filter: queryFilter,
        $autoCancel: false
      });

      if (pedidosPendentes.length > 0) {
        logger.info(`[RecoveryService] ${pedidosPendentes.length} pedido(s) pendente(s) há mais de 45 min encontrados para recuperação.`);
      }

      for (const pedido of pedidosPendentes) {
        const telefone = pedido.cliente_telefone;
        const nomeCliente = pedido.cliente_nome?.split(' ')[0] || 'Cliente';

        if (!telefone) {
          logger.warn(`[RecoveryService] Pedido ${pedido.id} não possui telefone. Marcando como enviado para ignorar.`);
          await pb.collection('pedidos').update(pedido.id, { recuperacao_enviada: true }, { $autoCancel: false });
          continue;
        }

        // Monta a mensagem que a Lia vai atirar (apenas suporte/acolhimento, sem cupom por enquanto)
        const mensagemAtiradora = `Oi ${nomeCliente}! Tudo bem? Sou a Lia, da Avante Lingerie ✨. Vi que você deixou um pedido quase finalizado por aqui. Tinha ficado alguma dúvida sobre o pagamento ou frete em que eu possa te ajudar?`;

        try {
          // Injeta a conversa no Cérebro da Lia para que o histórico fique registrado e a IA consiga continuar o papo depois
          let conversaId;
          const records = await pb.collection('lia_conversas').getFullList({
            filter: `session_id = "${telefone}" && canal = "whatsapp"`,
            $autoCancel: false
          });
          
          let historico = [];
          if (records.length > 0) {
            conversaId = records[0].id;
            historico = records[0].mensagens || [];
          } else {
            const novaConversa = await pb.collection('lia_conversas').create({
              session_id: telefone,
              canal: 'whatsapp',
              mensagens: [],
              converteu: false
            }, { $autoCancel: false });
            conversaId = novaConversa.id;
          }

          // A Lia (assistant) toma a iniciativa
          historico.push({ role: 'assistant', content: mensagemAtiradora });
          await pb.collection('lia_conversas').update(conversaId, { mensagens: historico }, { $autoCancel: false });

          // Dispara para o container do WhatsApp Bot para enviar de fato a mensagem pro celular
          try {
            // Em ambiente local, precisamos de um fallback para não dar crash se o container não existir
            const botUrl = process.env.WHATSAPP_BOT_URL || 'http://whatsapp-bot:3000/send';
            await axios.post(botUrl, {
              phone: telefone,
              message: mensagemAtiradora
            });
            logger.info(`[RecoveryService] Disparo de recuperação enviado via WhatsApp para ${telefone} (Pedido: ${pedido.id}).`);
          } catch (whatsappErr) {
            logger.warn(`[RecoveryService] Falha ao enviar pro WhatsApp (bot pode estar offline): ${whatsappErr.message}`);
            // Removemos o histórico para tentar de novo
            historico.pop();
            await pb.collection('lia_conversas').update(conversaId, { mensagens: historico }, { $autoCancel: false });
            continue; 
          }

          // Se chegou até aqui, sucesso total. Marca o pedido para não receber mais disparo
          await pb.collection('pedidos').update(pedido.id, { recuperacao_enviada: true }, { $autoCancel: false });
          
          // Espera 2 segundinhos entre cada envio pra não floodar o WhatsApp
          await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (pedidoErr) {
          logger.error(`[RecoveryService] Erro ao processar o pedido ${pedido.id}: ${pedidoErr.message}`);
        }
      }

    } catch (error) {
      logger.error(`[RecoveryService] Erro geral ao buscar pedidos abandonados: ${error.message}`);
    }
  }
}

export const recoveryService = new RecoveryService();
