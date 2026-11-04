import express from 'express';
import logger from '../utils/logger.js';
import axios from 'axios';

const router = express.Router();

/**
 * Webhook genérico para receber mensagens do WhatsApp (preparado para Z-API, Evolution API, etc.)
 */
router.post('/webhook', async (req, res) => {
  try {
    // 1. O Provedor (ex: Z-API) envia o payload para cá.
    const body = req.body;
    
    // Filtro básico para ignorar status de mensagens e focar só em texto
    if (body.isStatus) {
      return res.status(200).send('OK');
    }

    const telefoneCliente = body.phone || body.sender || body.from;
    const textoMensagem = body.text?.message || body.message || body.text;

    if (!telefoneCliente || !textoMensagem) {
      return res.status(200).send('Ignored');
    }

    logger.info(`[WhatsApp] Mensagem recebida de ${telefoneCliente}: ${textoMensagem}`);

    // 2. Encaminhar para o Cérebro Centralizado da Lia
    const baseUrl = req.protocol + '://' + req.get('host');
    
    const liaResponse = await axios.post(`${baseUrl}/lia/chat`, {
      session_id: `wa_${telefoneCliente}`,
      mensagem: textoMensagem,
      canal: 'whatsapp',
      contexto: {} // Sem contexto de página no WhatsApp
    });

    const respostaDaLia = liaResponse.data.resposta;

    if (respostaDaLia) {
      // 3. Devolver a resposta para a API do WhatsApp (Ex: Z-API /send-text)
      /*
      await axios.post('URL_DO_PROVEDOR/send-text', {
        phone: telefoneCliente,
        message: respostaDaLia
      }, {
        headers: { 'Authorization': 'Bearer SEU_TOKEN_AQUI' }
      });
      */
      logger.info(`[WhatsApp] Resposta da Lia preparada para envio a ${telefoneCliente}`);
    }

    return res.status(200).json({ status: 'Processado pela Lia com sucesso' });

  } catch (error) {
    logger.error(`Erro no Webhook do WhatsApp: ${error.message}`);
    return res.status(500).json({ erro: 'Erro interno' });
  }
});

/**
 * Endpoint para forçar a desconexão do WhatsApp e gerar um novo QR Code.
 */
router.post('/disconnect', async (req, res) => {
  try {
    logger.info(`[WhatsApp] Recebida solicitação de desconexão pelo painel de controle.`);
    
    // Dispara a requisição para o container do bot na porta 3000
    // Usamos 'whatsapp-bot' porque esse é o nome do container no docker-compose
    const botResponse = await axios.post('http://whatsapp-bot:3000/disconnect');
    
    return res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Sinal de desconexão enviado com sucesso.',
      detalhes: botResponse.data 
    });
  } catch (error) {
    logger.error(`Erro ao enviar comando de desconexão para o bot: ${error.message}`);
    return res.status(500).json({ erro: 'Falha ao contatar o bot de WhatsApp.' });
  }
});

/**
 * Endpoint para envio de mensagem do operador humano ou notificação via bot do WhatsApp
 */
router.post('/send', async (req, res) => {
  try {
    const { phone, message } = req.body;
    if (!phone || !message) {
      return res.status(400).json({ erro: 'Telefone e mensagem são obrigatórios' });
    }

    logger.info(`[WhatsApp API] Encaminhando mensagem humana para ${phone}...`);

    const botResponse = await axios.post('http://whatsapp-bot:3000/send', {
      phone,
      message
    }, { timeout: 10000 });

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Mensagem enviada com sucesso ao WhatsApp',
      detalhes: botResponse.data
    });
  } catch (error) {
    logger.warn(`[WhatsApp API] Aviso ao despachar mensagem pelo bot: ${error.message}`);
    return res.status(502).json({
      sucesso: false,
      erro: 'Bot de WhatsApp temporariamente inacessível. O registro foi gravado no CRM.',
      detalhe: error.message
    });
  }
});

export default router;
