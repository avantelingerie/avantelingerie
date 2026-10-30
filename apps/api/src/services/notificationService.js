import 'dotenv/config';
import axios from 'axios';
import logger from '../utils/logger.js';
import { Resend } from 'resend';
import { getGenderTerms } from '../utils/genderHelper.js';

function getResendClient() {
    const key = process.env.RESEND_API_KEY;
    if (!key || key.trim() === '') return null;
    return new Resend(key.trim());
}

const getWhatsAppHosts = () => {
    const list = [];
    if (process.env.WHATSAPP_API_URL) list.push(process.env.WHATSAPP_API_URL.replace(/\/$/, ''));
    list.push('http://whatsapp-bot:3000');
    list.push('http://localhost:3000');
    return [...new Set(list)];
};

async function sendWhatsAppDirect(phone, message) {
    if (!phone || !message) return false;
    const hosts = getWhatsAppHosts();
    for (const host of hosts) {
        try {
            await axios.post(`${host}/send`, { phone, message }, { timeout: 3500 });
            logger.info(`[NotificationService] WhatsApp enviado com sucesso para ${phone} via ${host}`);
            return true;
        } catch (err) {
            logger.warn(`[NotificationService] Falha ao tentar enviar via ${host} (${err.message}). Tentando próximo host...`);
        }
    }
    return false;
}

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

        const isEncomendaOrder = (order.observacoes || '').includes('ENCOMENDA') || (Array.isArray(order.itens) && order.itens.some(i => i.is_encomenda));

        if (novoStatus === 'pendente' || novoStatus === 'criado') {
            messageWa = `Olá, ${firstName}! 💖\n\nRecebemos o seu pedido *#${numPedido}* aqui na Avante Lingerie!\n\nEle está aguardando a confirmação do pagamento para podermos separar tudo com muito carinho para você. Assim que aprovar, eu te aviso!\n\nQualquer dúvida, é só me chamar!\n\n*Lia, Consultora Avante*`;
            subjectEmail = `[Avante Lingerie] Recebemos seu pedido #${numPedido}`;
            htmlEmail = `<h2>Olá, ${firstName}! 💖</h2><p>Recebemos o seu pedido <strong>#${numPedido}</strong> com sucesso!</p><p>Ele está aguardando a confirmação do pagamento. Assim que for aprovado, te avisaremos e iniciaremos a separação.</p>`;
        }
        else if (novoStatus === 'pago') {
            if (isEncomendaOrder) {
                messageWa = `Olá, ${firstName}! 💖\n\nBoas notícias! O pagamento do seu pedido *#${numPedido}* foi aprovado com sucesso! 🎉\n\n🧵 *Sua peça sob encomenda já entrou para a nossa esteira de corte e confecção* aqui em Nova Friburgo/RJ! O prazo de produção é de até 5 dias úteis. Assim que ela estiver pronta, embalada e sair para entrega, eu te aviso por aqui com o código de rastreamento! 🥰\n\n*Lia, Consultora Avante*`;
                subjectEmail = `[Avante Lingerie] Pagamento Aprovado! Peça em Confecção (#${numPedido})`;
                htmlEmail = `<h2>Olá, ${firstName}! 💖</h2><p>O pagamento do seu pedido <strong>#${numPedido}</strong> foi aprovado com sucesso!</p><p>🧵 <strong>Sua peça sob encomenda já entrou para a nossa esteira de confecção em Nova Friburgo/RJ!</strong></p><p>O prazo de produção é de até 5 dias úteis. Assim que a peça for finalizada e despachada, você receberá a confirmação com o código de rastreio.</p>`;
            } else {
                messageWa = `Olá, ${firstName}! 💖\n\nBoas notícias! O pagamento do seu pedido *#${numPedido}* foi aprovado com sucesso! 🎉\n\nEm breve ele será embalado com muito carinho e despachado. Assim que ele sair daqui, eu te aviso! 🥰\n\n*Lia, Consultora Avante*`;
                subjectEmail = `[Avante Lingerie] Pagamento Aprovado! Pedido #${numPedido}`;
                htmlEmail = `<h2>Olá, ${firstName}! 💖</h2><p>O pagamento do seu pedido <strong>#${numPedido}</strong> foi aprovado com sucesso!</p><p>Em breve ele será embalado e despachado.</p>`;
            }
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
        await sendWhatsAppDirect(order.cliente_telefone, messageWa);

        // 2. Disparo de E-mail (Se Resend configurado)
        const resend = getResendClient();
        if (resend && order.cliente_email) {
            try {
                await resend.emails.send({
                    from: 'Avante Lingerie <pedidos@avantelingerie.com.br>',
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

    /**
     * Dispara as boas-vindas oficiais e VIP para revendedoras aprovadas
     * no painel B2B (E-mail via Resend + Mensagem WhatsApp da Lia)
     */
    async sendResellerWelcomeNotification({ name, email, phone, solicitacaoId }) {
        // 1. Idempotência (Portão Nemotron): Evita disparos duplicados por duplo clique
        if (solicitacaoId) {
            const lastProcessed = processedApprovals.get(solicitacaoId);
            const now = Date.now();
            if (lastProcessed && (now - lastProcessed.timestamp) < 300000) { // 5 minutos
                logger.warn(`[NotificationService] Solicitação ${solicitacaoId} já processada recentemente. Retornando cache de idempotência.`);
                return lastProcessed.result;
            }
        }

        const genderTerms = getGenderTerms(name);
        const firstName = (name || genderTerms.revendedor).trim().split(' ')[0];
        
        // 2. Sanitização estrita de telefone (Portão Nemotron: DDI 55)
        let cleanPhone = (phone || '').replace(/\D/g, '');
        if (cleanPhone.length > 0 && !cleanPhone.startsWith('55')) {
            cleanPhone = '55' + cleanPhone;
        }

        // 3. Cópia oficial persuasiva da Lia para WhatsApp (com gênero dinâmico)
        const messageWa = `Olá, ${firstName}! Tudo bem? Aqui é a Lia, consultora de revenda da *Avante Lingerie*, direto da nossa fábrica em Nova Friburgo/RJ! 🌸✨\n\nPassando para te dar as *boas-vindas oficiais ao nosso ${genderTerms.clubeRevendedores}!* 👑\n\nSeu cadastro foi ativado com sucesso e eu tenho uma notícia espetacular para te dar:\n\n🚨 *ESPECIAL BLACK FRIDAY & FIM DE ANO:*\nPara você já começar lucrando alto na melhor época de vendas do ano, nossa confecção liberou o *Acesso Direto de Fábrica com Pedido Mínimo de apenas R$ 69,90!*\n\n❌ Nada de pedidos de R$ 500 ou R$ 1.000 para começar.\n✅ Com apenas *R$ 69,90* no carrinho, toda a nossa tabela de atacado destrava automaticamente para você!\n\n💎 *Por que lucrar com a Avante neste fim de ano?*\n- *Margem de 100% a 150% de lucro líquido* no seu bolso.\n- *Preço de fábrica imbatível* (você compete de igual para igual e supera qualquer Shopee em qualidade e acabamento).\n- *+5% OFF no PIX à vista* ou parcelamento em *até 6x no cartão*.\n- Peças com forro 100% algodão e modelagem que não enrola — cliente que compra, fideliza na hora!\n\nO movimento de Natal e festas de fim de ano já começou! Quer que eu te envie a seleção das *5 peças mais vendidas da fábrica* para você montar seu primeiro kit de R$ 69,90?\n\nOu se preferir, já pode acessar direto o nosso site oficial e ver seus preços de custo destravados:\n👉 https://avantelingerie.com.br/\n\nQualquer dúvida com tamanhos ou tecidos, estou aqui para te ajudar a montar o pedido perfeito! Conte comigo! 💖🧵`;

        const waLink = cleanPhone.length >= 12 
            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageWa)}`
            : null;

        let waSent = false;
        let emailSent = false;

        // 4. Disparo WhatsApp automatizado (se bot disponível)
        if (cleanPhone.length >= 12) {
            waSent = await sendWhatsAppDirect(cleanPhone, messageWa);
            if (!waSent) {
                logger.warn(`[NotificationService] WhatsApp automático indisponível em todos os hosts testados. Link manual pronto: ${waLink}`);
            }
        }

        // 5. Template Editorial de E-mail VIP (Resend)
        const resendClient = getResendClient();
        if (resendClient && email && email.includes('@')) {
            const subjectEmail = '👑 Seu acesso de fábrica foi liberado! (Mínimo de R$ 69,90 na Black Friday Avante)';
            const htmlEmail = `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${subjectEmail}</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #18181b;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 30px 15px;">
                <tr>
                  <td align="center">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e4e4e7;">
                      
                      <!-- Header Luxo Preto & Dourado -->
                      <tr>
                        <td style="background-color: #121212; padding: 35px 30px; text-align: center; border-bottom: 3px solid #c59b5f;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">
                            AVANTE LINGERIE
                          </h1>
                          <p style="margin: 6px 0 0; color: #c59b5f; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                            Confecção Própria • Nova Friburgo / RJ
                          </p>
                        </td>
                      </tr>

                      <!-- Conteúdo Principal -->
                      <tr>
                        <td style="padding: 35px 30px;">
                          <h2 style="margin: 0 0 15px; color: #18181b; font-size: 20px; font-weight: 700;">
                            Parabéns, ${firstName}! Seu acesso de fábrica foi ativado! 👑✨
                          </h2>
                          <p style="margin: 0 0 20px; color: #52525b; font-size: 15px; line-height: 1.6;">
                            É um grande privilégio ter você como ${genderTerms.nossoRevendedor}. A partir de agora, você tem um canal direto com a nossa fábrica aqui na <strong>Capital da Moda Íntima</strong> para abastecer seu negócio com máxima lucratividade.
                          </p>

                          <!-- Box Destaque Black Friday -->
                          <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border: 1px solid #c59b5f; border-radius: 12px; padding: 22px; text-align: center; margin: 25px 0;">
                            <span style="display: inline-block; background-color: #c59b5f; color: #121212; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                              Especial Black Friday & Fim de Ano
                            </span>
                            <h3 style="margin: 5px 0 8px; color: #ffffff; font-size: 18px; font-weight: 700;">
                              Pedido Mínimo de Atacado: <span style="color: #c59b5f;">Apenas R$ 69,90</span>
                            </h3>
                            <p style="margin: 0; color: #d4d4d8; font-size: 13px; line-height: 1.5;">
                              Chega de travas de R$ 500 ou R$ 1.000 para começar. Com apenas R$ 69,90 no carrinho, toda a nossa tabela de atacado destrava automaticamente para você!
                            </p>
                          </div>

                          <!-- Tabela de Vantagens -->
                          <h4 style="margin: 25px 0 12px; color: #18181b; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            📊 O seu raio-x de lucratividade:
                          </h4>
                          <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: #fafafa; border-radius: 8px; font-size: 13px; color: #3f3f46; border: 1px solid #f4f4f5; margin-bottom: 25px;">
                            <tr style="border-bottom: 1px solid #e4e4e7;">
                              <td style="font-weight: 600;">💎 Sua Margem Líquida:</td>
                              <td style="color: #16a34a; font-weight: 700; text-align: right;">100% a 150% de lucro real</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e4e4e7;">
                              <td style="font-weight: 600;">🏷️ Peças a partir de:</td>
                              <td style="color: #18181b; font-weight: 600; text-align: right;">R$ 9,90 a R$ 28,28 (Preço de Custo)</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e4e4e7;">
                              <td style="font-weight: 600;">⚡ Condições Especiais:</td>
                              <td style="color: #18181b; font-weight: 600; text-align: right;">+5% no PIX ou até 6x no Cartão</td>
                            </tr>
                            <tr>
                              <td style="font-weight: 600;">🧵 Padrão de Fábrica:</td>
                              <td style="color: #18181b; font-weight: 600; text-align: right;">Forro 100% Algodão e Costura Reforçada</td>
                            </tr>
                          </table>

                          <!-- Instruções de Login -->
                          <div style="background-color: #fffbeb; border-left: 4px solid #c59b5f; padding: 14px 16px; border-radius: 4px; margin-bottom: 30px;">
                            <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                              <strong>Como acessar seus preços de fábrica:</strong><br>
                              Basta entrar em <a href="https://avantelingerie.com.br" style="color: #b45309; font-weight: 700;">avantelingerie.com.br</a> e fazer login com seu e-mail: <strong>${email}</strong>. A vitrine inteira exibirá na hora a badge <em>"Seu Custo de Fábrica"</em>!
                            </p>
                          </div>

                          <!-- Botão CTA -->
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="https://avantelingerie.com.br" style="background-color: #c59b5f; color: #121212; padding: 16px 36px; border-radius: 30px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(197,155,95,0.3);">
                              ACESSAR CATÁLOGO DE ATACADO ➜
                            </a>
                          </div>

                          <!-- Contato da Consultora Lia -->
                          <p style="margin: 30px 0 0; color: #71717a; font-size: 13px; text-align: center; border-top: 1px solid #e4e4e7; padding-top: 20px;">
                            Precisa de ajuda com tamanhos ou quer o catálogo em PDF?<br>
                            Fale diretamente com a <strong>Lia</strong> no WhatsApp: <a href="https://wa.me/5522981225010" style="color: #c59b5f; font-weight: 600; text-decoration: none;">(22) 98122-5010</a>
                          </p>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #fafafa; padding: 20px 30px; text-align: center; border-top: 1px solid #e4e4e7;">
                          <p style="margin: 0; color: #a1a1aa; font-size: 11px;">
                            Avante Lingerie • Nova Friburgo / RJ • Todos os direitos reservados.
                          </p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `;

            try {
                await resendClient.emails.send({
                    from: 'Avante Lingerie <pedidos@avantelingerie.com.br>',
                    to: email,
                    subject: subjectEmail,
                    html: htmlEmail
                });
                emailSent = true;
                logger.info(`[NotificationService] E-mail de boas-vindas B2B enviado com sucesso via Resend para ${email}`);
            } catch (err) {
                logger.error(`[NotificationService] Erro ao enviar e-mail de boas-vindas para ${email}: ${err.message}`);
            }
        }

        const result = {
            success: true,
            emailSent,
            waSent,
            waLink,
            messageWa
        };

        if (solicitacaoId) {
            processedApprovals.set(solicitacaoId, {
                timestamp: Date.now(),
                result
            });
        }

        return result;
    }
}

// Map de idempotência em memória para prevenir múltiplos cliques acidentais
const processedApprovals = new Map();

export const notificationService = new NotificationService();

