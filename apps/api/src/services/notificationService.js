import axios from 'axios';
import logger from '../utils/logger.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

class NotificationService {
    async sendOrderStatusNotification(order, novoStatus, rastreio = null) {
        if (!order || !order.cliente_telefone) {
            logger.warn('[NotificationService] Pedido sem telefone cadastrado, disparo ignorado.');
            return;
        }

        const firstName = (order.cliente_nome || order.nome_cliente || 'Cliente').split(' ')[0];
        const numPedido = order.numero_pedido || order.id;
        
        let messageWa = '';
        let subjectEmail = '';
        let htmlEmail = '';

        if (novoStatus === 'pendente' || novoStatus === 'criado') {
            messageWa = `Olá, ${firstName}! 💖\n\nRecebemos o seu pedido *#${numPedido}* aqui na Avante Lingerie!\n\nEle está aguardando a confirmação do pagamento para podermos separar tudo com muito carinho para você. Assim que aprovar, eu te aviso!\n\nQualquer dúvida, é só me chamar!\n\n*Lia, Consultora Avante*`;
            subjectEmail = `[Avante Lingerie] Recebemos seu pedido #${numPedido}`;
            htmlEmail = `<h2>Olá, ${firstName}! 💖</h2><p>Recebemos o seu pedido <strong>#${numPedido}</strong> com sucesso!</p><p>Ele está aguardando a confirmação do pagamento. Assim que for aprovado, te avisaremos e iniciaremos a separação.</p>`;
        }
        else if (novoStatus === 'pago') {
            messageWa = `Olá, ${firstName}! 💖\n\nBoas notícias! O pagamento do seu pedido *#${numPedido}* foi aprovado com sucesso! 🎉\n\nEm breve ele será embalado com muito carinho e despachado. Assim que ele sair daqui, eu te aviso! 🥰\n\n*Lia, Consultora Avante*`;
            subjectEmail = `[Avante Lingerie] Pagamento Aprovado! Pedido #${numPedido}`;
            htmlEmail = `<h2>Olá, ${firstName}! 💖</h2><p>O pagamento do seu pedido <strong>#${numPedido}</strong> foi aprovado com sucesso!</p><p>Em breve ele será embalado e despachado.</p>`;
        } 
        else if (novoStatus === 'despachado' || (rastreio && !order.rastreio_enviado)) {
            const trackCode = rastreio || order.codigo_rastreio;
            messageWa = `Oie, ${firstName}! 🚚✨\n\nSeu pedido *#${numPedido}* acabou de sair do nosso ateliê!\n\nVocê pode rastrear a sua caixinha usando o código: *${trackCode}*\n\nBasta ir na página de rastreio no nosso site ou me perguntar por aqui mesmo! 🥰`;
            subjectEmail = `[Avante Lingerie] O seu pedido foi despachado! (#${numPedido})`;
            htmlEmail = `<h2>Oie, ${firstName}! 🚚✨</h2><p>Seu pedido <strong>#${numPedido}</strong> acabou de sair do nosso ateliê!</p><p>Seu código de rastreio é: <strong>${trackCode}</strong></p>`;
        }
        else {
            return; // Status irrelevante
        }

        // 1. Disparo de WhatsApp
        try {
            const waHost = process.env.WHATSAPP_API_URL || 'http://localhost:3000';
            await axios.post(`${waHost}/send`, {
                phone: order.cliente_telefone,
                message: messageWa
            });
            logger.info(`[NotificationService] WhatsApp enviado para ${order.cliente_telefone} (Pedido #${numPedido})`);
        } catch (err) {
            logger.error(`[NotificationService] Falha ao enviar WhatsApp para ${order.cliente_telefone}: ${err.message}`);
        }

        // 2. Disparo de E-mail (Se Resend configurado)
        if (process.env.RESEND_API_KEY && order.cliente_email) {
            try {
                await resend.emails.send({
                    from: 'Avante Lingerie <suporte@avantelingerie.com.br>',
                    to: order.cliente_email,
                    subject: subjectEmail,
                    html: htmlEmail
                });
                logger.info(`[NotificationService] E-mail enviado para ${order.cliente_email}`);
            } catch (err) {
                logger.error(`[NotificationService] Falha ao enviar E-mail: ${err.message}`);
            }
        }
    }
}

export const notificationService = new NotificationService();
