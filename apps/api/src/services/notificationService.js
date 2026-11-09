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

const normalizePhone = (phone) => {
    let clean = (phone || '').replace(/\D/g, '');
    if (clean.length > 0 && !clean.startsWith('55')) {
        clean = '55' + clean;
    }
    return clean;
};

async function sendWhatsAppDirect(phone, message) {
    const cleanPhone = normalizePhone(phone);
    if (!cleanPhone || !message) return false;
    
    // Normalização estrita UTF-8 NFC para evitar caracteres corrompidos/mojibake
    const safeMessage = String(message).normalize('NFC');
    const hosts = getWhatsAppHosts();
    
    for (const host of hosts) {
        try {
            await axios.post(`${host}/send`, { phone: cleanPhone, message: safeMessage }, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                timeout: 4500
            });
            logger.info(`[NotificationService] WhatsApp enviado com sucesso para ${cleanPhone} via ${host}`);
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
            return await this.sendOrderDispatchedNotification({
                order,
                codigoRastreio: trackCode,
                transportadora: order.transportadora || 'J&T Express'
            });
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

        // 3. Cópia oficial persuasiva da Lia para WhatsApp (com gênero dinâmico e credenciais claras)
        const cleanDigitsPhone = cleanPhone.replace(/^55/, '');
        const messageWa = `Olá, ${firstName}! Tudo bem? Aqui é a Lia, consultora de revenda da *Avante Lingerie*, direto da nossa confecção em Nova Friburgo/RJ! 🌸✨\n\nPassando para te dar as *boas-vindas oficiais ao nosso ${genderTerms.clubeRevendedores}!* 👑\n\nSeu cadastro foi ativado com sucesso e agora você tem acesso direto de fábrica com preços de atacado!\n\n🔐 *Como destravar seus Preços de Atacado no site:*\nComo nossa loja também atende consumidor final, quem entra sem login vê os preços normais de varejo. Para o sistema te reconhecer e liberar a tabela de atacado, basta fazer seu login rápido:\n\n👉 Acesse: https://avantelingerie.com.br/login\n✉️ *Seu E-mail:* ${email || 'Seu e-mail cadastrado'}\n🔑 *Sua Senha:* O seu número de WhatsApp com DDD (apenas números, ex: ${cleanDigitsPhone || 'Seu WhatsApp'})\n_(Se quiser alterar depois, basta clicar em "Esqueceu a senha?")_\n\n🚨 *Vantagens Especiais de Fábrica:*\n• *Pedido Mínimo de apenas R$ 69,90:* Sem travas de R$ 500 ou R$ 1.000 para começar a lucrar.\n• *Margem de 100% a 150% de lucro líquido* no seu bolso.\n• *+5% OFF no PIX à vista* ou até 6x no cartão.\n\n🧵 *Catálogo em Expansão & Produção Sob Demanda:*\nNosso catálogo está em constante crescimento, recebendo novidades toda semana em conjuntos, camisolas, calcinhas e nossa linha *Fitness*.\nE o nosso grande diferencial: *como somos fabricantes próprios*, se você precisar de uma grade específica, modelo ou quantidade que não encontrou na vitrine, fale comigo! Nós podemos avaliar e fazer a *produção sob demanda* para a sua necessidade!\n\nAcesse agora e veja seus custos de fábrica liberados:\n👉 https://avantelingerie.com.br/login\n\nQualquer dúvida com tecidos ou tamanhos, é só me responder aqui! Conte comigo para abastecer sua revenda! 💖🧵\n\n🏢 *AVANTE LINGERIE LTDA - ME* • CNPJ: 54.615.037/0001-53\n📍 Rua Odenir Pinheiro, 20 - 3º Andar, Loteamento Nosso Sonho - Nova Friburgo/RJ • CEP 28623-620\n🌐 avantelingerie.com.br`;

        const waLink = cleanPhone.length >= 12 
            ? `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageWa)}`
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

                          <!-- Instruções de Login Detalhadas -->
                          <div style="background-color: #fffbeb; border-left: 4px solid #c59b5f; padding: 18px 20px; border-radius: 8px; margin: 25px 0;">
                            <h4 style="margin: 0 0 8px; color: #92400e; font-size: 15px; font-weight: 700;">
                              🔐 Como acessar seus preços de fábrica na loja:
                            </h4>
                            <p style="margin: 0 0 12px; color: #78350f; font-size: 13px; line-height: 1.5;">
                              Nossa vitrine pública exibe preços de varejo para proteger a sua margem de revenda perante o cliente final. Para o sistema liberar a sua tabela de custo de fábrica, basta conectar sua conta:
                            </p>
                            <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: #ffffff; border-radius: 6px; font-size: 13px; border: 1px solid #fde68a;">
                              <tr style="border-bottom: 1px solid #fef3c7;">
                                <td style="color: #92400e; font-weight: 600; width: 85px;">Página:</td>
                                <td><a href="https://avantelingerie.com.br/login" style="color: #b45309; font-weight: 700; text-decoration: none;">avantelingerie.com.br/login</a></td>
                              </tr>
                              <tr style="border-bottom: 1px solid #fef3c7;">
                                <td style="color: #92400e; font-weight: 600;">E-mail:</td>
                                <td style="font-family: monospace; font-weight: 700; color: #18181b;">${email}</td>
                              </tr>
                              <tr>
                                <td style="color: #92400e; font-weight: 600;">Senha:</td>
                                <td style="font-family: monospace; font-weight: 700; color: #18181b;">Seu WhatsApp com DDD (apenas números)</td>
                              </tr>
                            </table>
                            <p style="margin: 10px 0 0; color: #a16207; font-size: 11px;">
                              <em>*Você pode redefinir sua senha a qualquer momento clicando em "Esqueceu a senha?".</em>
                            </p>
                          </div>

                          <!-- Catálogo em Expansão & Confecção Sob Demanda -->
                          <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 20px; margin: 25px 0;">
                            <h4 style="margin: 0 0 8px; color: #18181b; font-size: 14px; font-weight: 700;">
                              🧵 Catálogo em Expansão & Confecção Sob Demanda
                            </h4>
                            <p style="margin: 0; color: #52525b; font-size: 13px; line-height: 1.6;">
                              Nosso catálogo está em constante crescimento, com a inclusão de novas linhas como <strong>fitness, camisolas, conjuntos e novidades semanais</strong>. E se você não encontrar exatamente o que procura, fale conosco: <strong>como fabricantes próprios, podemos estudar a produção sob demanda para atender sua necessidade!</strong>
                            </p>
                          </div>

                          <!-- Botão CTA -->
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="https://avantelingerie.com.br/login" style="background-color: #c59b5f; color: #121212; padding: 16px 36px; border-radius: 30px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(197,155,95,0.3);">
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

                      <!-- Footer Corporativo Oficial -->
                      <tr>
                        <td style="background-color: #fafafa; padding: 25px 30px; text-align: center; border-top: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 6px; color: #18181b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            AVANTE LINGERIE LTDA - ME
                          </p>
                          <p style="margin: 0 0 4px; color: #71717a; font-size: 11px; line-height: 1.5;">
                            CNPJ: 54.615.037/0001-53 • IE: 14568603<br>
                            Rua Odenir Pinheiro, 20 - 3º Andar, Loteamento Nosso Sonho<br>
                            Nova Friburgo / RJ — CEP 28623-620
                          </p>
                          <p style="margin: 6px 0 0; color: #c59b5f; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                            Direto da Capital Nacional da Moda Íntima • Todos os direitos reservados.
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

    /**
     * Dispara notificação oficial e de alto padrão quando um pedido é despachado:
     * - E-mail VIP via Resend (pedidos@avantelingerie.com.br)
     * - Notificação carinhosa no WhatsApp da Lia com normalização UTF-8 sem emojis corrompidos
     * - Idempotência por orderId + trackingCode (Portão Nemotron)
     */
    async sendOrderDispatchedNotification({ order, codigoRastreio, transportadora }) {
        if (!order) {
            logger.warn('[NotificationService] Pedido inválido para notificação de despacho.');
            return { success: false, erro: 'Pedido não fornecido' };
        }

        const numPedido = order.numero_pedido || (order.id ? order.id.slice(-6) : 'Avante');
        const trackingCode = (codigoRastreio || order.codigo_rastreio || order.rastreamento || '').trim();
        const carrier = (transportadora || order.transportadora || 'J&T Express').trim();
        const firstName = (order.cliente_nome || order.nome_cliente || 'Cliente').trim().split(' ')[0];
        const fullName = (order.cliente_nome || order.nome_cliente || firstName).trim();
        const email = (order.cliente_email || '').trim();
        const phone = order.cliente_telefone || '';

        // 1. Idempotência (Portão Nemotron): Evita disparos duplicados num intervalo de 2 minutos
        const cacheKey = `${order.id || numPedido}_${trackingCode}`;
        const lastDispatch = processedDispatches.get(cacheKey);
        const now = Date.now();
        if (lastDispatch && (now - lastDispatch.timestamp) < 120000) {
            logger.warn(`[NotificationService] Despacho ${cacheKey} já processado há menos de 2 min. Retornando cache.`);
            return lastDispatch.result;
        }

        const trackingUrl = `https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(trackingCode)}`;

        // Monta o endereço de entrega formatado
        const addressParts = [
            order.endereco_entrega,
            order.numero ? `nº ${order.numero}` : '',
            order.complemento ? `(${order.complemento})` : '',
            order.bairro,
            order.cidade && order.estado ? `${order.cidade} - ${order.estado}` : (order.cidade || order.estado || ''),
            order.cep ? `CEP: ${order.cep}` : ''
        ].filter(Boolean);
        const enderecoDestino = addressParts.length > 0 ? addressParts.join(', ') : (order.cidade && order.estado ? `${order.cidade} - ${order.estado}` : 'Endereço cadastrado');

        // 2. Cópia oficial e carinhosa da Lia para WhatsApp (Unicode Seguro)
        const destinationShort = order.cidade && order.estado ? `${order.cidade} / ${order.estado}` : 'Contagem / MG';
        const messageWa = [
            `Olá, ${firstName}! Tudo bem? Aqui é a Lia, consultora da Avante Lingerie, direto da nossa fábrica em Nova Friburgo/RJ! 🌸✨`,
            ``,
            `Passando com uma notícia maravilhosa sobre o seu pedido *#${numPedido}*! 💖`,
            ``,
            `Seu Pedido acabou de ser inspecionado no nosso controle de qualidade, carinhosamente embalado e já foi entregue à transportadora! 🚚📦`,
            ``,
            `📋 *Dados do Envio:*`,
            `• *Pedido:* #${numPedido}`,
            `• *Transportadora:* ${carrier}`,
            `• *Código de Rastreio:* ${trackingCode}`,
            `• *Destino:* ${destinationShort}`,
            ``,
            `Você pode acompanhar cada movimentação da sua entrega em tempo real direto na nossa página oficial:`,
            `👉 ${trackingUrl}`,
            ``,
            `Assim que suas lingeries chegarem, me conta o que achou! Se precisar de qualquer ajuda durante o transporte, estou aqui à disposição. 🥰`,
            ``,
            `Com carinho,`,
            `*Lia • Avante Lingerie* 💕`
        ].join('\n').normalize('NFC');

        const cleanPhone = normalizePhone(phone);
        const waLink = cleanPhone.length >= 12
            ? `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageWa)}`
            : null;

        let waSent = false;
        let emailSent = false;

        // 3. Disparo WhatsApp automatizado (via bot)
        if (cleanPhone.length >= 12) {
            waSent = await sendWhatsAppDirect(cleanPhone, messageWa);
            if (!waSent) {
                logger.warn(`[NotificationService] WhatsApp automático offline ou indisponível. Link manual gerado: ${waLink}`);
            }
        }

        // 4. Montagem da lista de itens para o e-mail
        let itemsList = Array.isArray(order.itens) ? order.itens : [];
        if (typeof order.itens === 'string') {
            try { itemsList = JSON.parse(order.itens); } catch (e) {}
        }

        let itemsRows = '';
        if (itemsList.length > 0) {
            itemsRows = itemsList.map(item => {
                const nome = item.nome_produto || item.nome || item.name || item.title || 'Lingerie Avante';
                const variacao = [item.tamanho, item.cor].filter(Boolean).join(' / ') || item.variacao || '';
                const qtd = item.quantity || item.quantidade || item.qtd || 1;
                return `
                    <tr style="border-bottom: 1px solid #f4f4f5;">
                        <td style="padding: 10px 12px; font-weight: 500; color: #18181b;">
                            ${nome}
                            ${variacao ? `<br><span style="font-size: 11px; color: #71717a;">${variacao}</span>` : ''}
                        </td>
                        <td style="padding: 10px 12px; text-align: center; color: #52525b; font-weight: 600;">${qtd}x</td>
                    </tr>
                `;
            }).join('');
        }

        // 5. Template Editorial de E-mail VIP (Resend)
        const resendClient = getResendClient();
        if (resendClient && email && email.includes('@')) {
            const subjectEmail = `✨ Seu pedido #${numPedido} foi despachado! Sua caixinha Avante está a caminho 🚚`;
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
                            Olá, ${firstName}! Suas lingeries estão a caminho! 🚚✨
                          </h2>
                          <p style="margin: 0 0 20px; color: #52525b; font-size: 15px; line-height: 1.6;">
                            Temos uma notícia maravilhosa! Suas peças foram cuidadosamente separadas, passaram pelo nosso rigoroso controle de qualidade, foram embaladas com todo carinho no nosso ateliê e <strong>já foram entregues à transportadora</strong>.
                          </p>

                          <!-- Box Destaque de Rastreio -->
                          <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border: 1px solid #c59b5f; border-radius: 12px; padding: 22px; margin: 25px 0; color: #ffffff;">
                            <span style="display: inline-block; background-color: #c59b5f; color: #121212; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                              📦 Pedido Despachado
                            </span>
                            <h3 style="margin: 0 0 10px; color: #ffffff; font-size: 18px; font-weight: 700;">
                              Código: <span style="color: #c59b5f; letter-spacing: 1px;">${trackingCode}</span>
                            </h3>
                            <p style="margin: 0 0 6px; color: #d4d4d8; font-size: 13px;">
                              <strong>Transportadora:</strong> ${carrier}
                            </p>
                            <p style="margin: 0 0 6px; color: #d4d4d8; font-size: 13px;">
                              <strong>Pedido:</strong> #${numPedido}
                            </p>
                            <p style="margin: 0; color: #d4d4d8; font-size: 13px;">
                              <strong>Destino:</strong> ${enderecoDestino}
                            </p>
                          </div>

                          <!-- Botão CTA Principal -->
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="${trackingUrl}" style="background-color: #c59b5f; color: #121212; padding: 16px 36px; border-radius: 30px; font-weight: 700; font-size: 14px; text-decoration: none; display: inline-block; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(197,155,95,0.3);">
                              RASTREAR MINHA ENCOMENDA NO SITE ➜
                            </a>
                          </div>

                          ${itemsRows ? `
                          <!-- Resumo dos Itens -->
                          <h4 style="margin: 25px 0 12px; color: #18181b; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            🛍️ Peças da sua caixinha:
                          </h4>
                          <table width="100%" border="0" cellspacing="0" cellpadding="8" style="background-color: #fafafa; border-radius: 8px; font-size: 13px; color: #3f3f46; border: 1px solid #f4f4f5; margin-bottom: 25px;">
                            <thead>
                              <tr style="border-bottom: 1px solid #e4e4e7; background-color: #f4f4f5; text-align: left; color: #71717a; font-size: 11px; text-transform: uppercase;">
                                <th style="padding: 10px 12px;">Produto</th>
                                <th style="padding: 10px 12px; text-align: center;">Quantidade</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${itemsRows}
                            </tbody>
                          </table>
                          ` : ''}

                          <!-- Dica Especial de Cuidado -->
                          <div style="background-color: #fffbeb; border-left: 4px solid #c59b5f; padding: 14px 16px; border-radius: 4px; margin: 25px 0;">
                            <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                              💡 <strong>Dica especial de cuidado Avante:</strong><br>
                              Ao receber suas lingeries, lave-as preferencialmente à mão com sabão neutro e deixe secar à sombra. Isso preserva a maciez da renda, a vivacidade das cores e a durabilidade das peças por muito mais tempo!
                            </p>
                          </div>

                          <!-- Contato da Consultora Lia -->
                          <p style="margin: 30px 0 0; color: #71717a; font-size: 13px; text-align: center; border-top: 1px solid #e4e4e7; padding-top: 20px;">
                            Dúvidas sobre o transporte ou quer falar com a nossa equipe?<br>
                            Fale com a <strong>Lia</strong> no WhatsApp: <a href="https://wa.me/5522981225010" style="color: #c59b5f; font-weight: 600; text-decoration: none;">(22) 98122-5010</a>
                          </p>
                        </td>
                      </tr>

                      <!-- Footer Corporativo Oficial -->
                      <tr>
                        <td style="background-color: #fafafa; padding: 25px 30px; text-align: center; border-top: 1px solid #e4e4e7;">
                          <p style="margin: 0 0 6px; color: #18181b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            AVANTE LINGERIE LTDA - ME
                          </p>
                          <p style="margin: 0 0 4px; color: #71717a; font-size: 11px; line-height: 1.5;">
                            CNPJ: 54.615.037/0001-53 • IE: 14568603<br>
                            Rua Odenir Pinheiro, 20 - 3º Andar, Loteamento Nosso Sonho<br>
                            Nova Friburgo / RJ — CEP 28623-620
                          </p>
                          <p style="margin: 6px 0 0; color: #c59b5f; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">
                            Direto da Capital Nacional da Moda Íntima • Todos os direitos reservados.
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
                logger.info(`[NotificationService] E-mail de despacho enviado com sucesso via Resend para ${email}`);
            } catch (err) {
                logger.error(`[NotificationService] Erro ao enviar e-mail de despacho para ${email}: ${err.message}`);
            }
        }

        const result = {
            success: true,
            emailSent,
            waSent,
            waLink,
            messageWa,
            trackingUrl
        };

        processedDispatches.set(cacheKey, {
            timestamp: Date.now(),
            result
        });

        return result;
    }

    /**
     * Envia mensagem carinhosa e oficial no WhatsApp da cliente ativando o cupom VIP AVANTELIA10
     */
    async sendVipCouponNotification({ phone, name, orderNum, cpf }) {
        if (!phone) {
            logger.warn('[NotificationService] Telefone não informado para envio de cupom VIP.');
            return false;
        }

        const firstName = (name || 'Cliente').trim().split(' ')[0];
        const cleanPhone = phone.replace(/\D/g, '');
        const targetPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

        const messageWa = `Olá, ${firstName}! 💖 Aqui é a Lia, consultora da *Avante Lingerie*!\n\nPassando para te parabenizar pelo seu primeiro pedido *#${orderNum || 'Confirmado'}* e confirmar que o seu *Presente VIP de Boas-Vindas* já está ativado com sucesso! 🎁✨\n\n🏷️ *Seu Cupom Exclusivo:* AVANTELIA10\n✨ *Benefício:* 10% OFF no seu próximo pedido (em compras acima de R$ 59,90 no Varejo)\n🔒 *Validade:* Vinculado exclusivamente ao seu CPF para uso único.\n\nO seu pedido atual já está sendo preparado com muito carinho aqui na fábrica em Nova Friburgo/RJ. Assim que for despachado, te aviso por aqui com o código de rastreamento! 🥰\n\nGuarde este contato para não perder seu cupom. Se precisar de qualquer ajuda com tamanhos ou tecidos, é só me responder por aqui!\n\nCom carinho,\n*Lia • Avante Lingerie 🌸*`;

        const sent = await sendWhatsAppDirect(targetPhone, messageWa);
        return sent;
    }
}

// Map de idempotência em memória para prevenir múltiplos cliques acidentais
const processedApprovals = new Map();
const processedDispatches = new Map();

export const notificationService = new NotificationService();

