import cron from 'node-cron';
import axios from 'axios';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const normalizePhone = (phone) => {
  let clean = (phone || '').replace(/\D/g, '');
  if (clean.length > 0 && !clean.startsWith('55')) {
    clean = '55' + clean;
  }
  return clean;
};

const getWhatsAppHosts = () => {
  const list = [];
  if (process.env.WHATSAPP_API_URL) list.push(process.env.WHATSAPP_API_URL.replace(/\/$/, ''));
  if (process.env.WHATSAPP_BOT_URL) list.push(process.env.WHATSAPP_BOT_URL.replace(/\/send$/, '').replace(/\/$/, ''));
  list.push('http://whatsapp-bot:3000');
  list.push('http://localhost:3000');
  return [...new Set(list)];
};

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
        const rawPhone = pedido.cliente_telefone;
        const cleanPhone = normalizePhone(rawPhone);
        const nomeCliente = pedido.cliente_nome?.split(' ')[0] || 'Cliente';

        if (!cleanPhone || cleanPhone.length < 10) {
          logger.warn(`[RecoveryService] Pedido ${pedido.id} não possui telefone válido (${rawPhone}). Marcando como enviado para ignorar.`);
          await pb.collection('pedidos').update(pedido.id, { recuperacao_enviada: true }, { $autoCancel: false });
          continue;
        }

        const numPedido = pedido.numero_pedido || 'PED';
        const valorFormatado = Number(pedido.valor_total || 0).toFixed(2).replace('.', ',');
        const paymentUrl = `https://avantelingerie.com.br/checkout?order_id=${pedido.id}`;

        // Monta a mensagem que o Administrativo/Lia vai enviar (alta credibilidade, facilidade de pagamento e link da diretoria)
        const mensagemAtiradora = `Olá, ${nomeCliente}! Tudo bem? 

Aqui é do Administrativo da Avante Lingerie — Confecção Própria em Nova Friburgo/RJ ✨

Notamos que você selecionou algumas peças no nosso site (Pedido #${numPedido} no valor de R$ ${valorFormatado}), mas não chegou a finalizar o seu pagamento. Como prezamos pelo atendimento transparente de cada cliente da nossa fábrica, entramos em contato para que você tenha total segurança e tranquilidade com a nossa marca! ❤️

💳 Como concluir seu pagamento com facilidade:
Para facilitar para você finalizar seu pedido com total praticidade, preparamos o link seguro abaixo onde você pode pagar via PIX ou Cartão em até 6x:
👉 ${paymentUrl}

Alguns pontos importantes sobre a nossa confecção:

🏭 1. Fábrica Real em Nova Friburgo/RJ:
Nossa confecção própria fica na Rua Odenir Pinheiro, nº 20 - Olaria. Você pode conferir nosso endereço e localização oficial direto no Google Maps:
📍 https://maps.google.com/?q=Rua+Odenir+Pinheiro+20+Nova+Friburgo+RJ

⭐ 2. Nossas Lojas Oficiais na Shopee:
Além de abastecer lojistas pelo Brasil, nós operamos marcas consagradas com milhares de avaliações 5 estrelas na Shopee. Você pode conferir diretamente nos links oficiais:
🛍️ Bella Íntima: https://shopee.com.br/bella_int#product_list
🛍️ Jeito Feminino: https://shopee.com.br/search?keyword=jeitofeminino
🛍️ Versátil Moda Íntima e Fitness: https://shopee.com.br/search?keyword=versatilmodaintimaefitness

💡 3. Por que no nosso site oficial o valor é mais barato que na Shopee?
Porque na Shopee as taxas e comissões da plataforma passam de 20%. No nosso site oficial (avantelingerie.com.br), você compra direto da nossa mesa de corte, sem intermediários e sem taxas embutidas!

✂️ 4. Fabricação Sob Encomenda para Lojistas:
Além do nosso catálogo à pronta-entrega, também fabricamos coleções personalizadas sob encomenda conforme o desejo de revenda para lojistas e revendedoras!

📦 5. Garantia Total de Fábrica:
Seu pedido sai com Nota Fiscal direto da linha de produção e garantia incondicional: se qualquer peça não vestir perfeitamente, realizamos a troca para você sem burocracia.

Se você ficou com alguma dúvida sobre tecidos, tamanhos, cálculo de frete ou condições de fábrica, você pode falar diretamente com o nosso gestor, Luiz Machado, pelo WhatsApp exclusivo:
👉 https://wa.me/5522981124281

O que faltou para liberarmos o seu primeiro pacotinho direto da fábrica hoje? Estamos à disposição para te atender!`;

        try {
          // Injeta a conversa no Cérebro da Lia para que o histórico fique registrado e a IA consiga continuar o papo depois
          let conversaId;
          const records = await pb.collection('lia_conversas').getFullList({
            filter: `session_id = "${cleanPhone}" || session_id = "${rawPhone}"`,
            $autoCancel: false
          });
          
          let historico = [];
          if (records.length > 0) {
            conversaId = records[0].id;
            historico = records[0].mensagens || [];
          } else {
            const novaConversa = await pb.collection('lia_conversas').create({
              session_id: cleanPhone,
              canal: 'whatsapp',
              mensagens: [],
              converteu: false
            }, { $autoCancel: false });
            conversaId = novaConversa.id;
          }

          // A Lia (assistant) toma a iniciativa
          historico.push({ role: 'assistant', content: mensagemAtiradora });
          await pb.collection('lia_conversas').update(conversaId, { mensagens: historico }, { $autoCancel: false });

          // Dispara para o container do WhatsApp Bot testando hosts disponíveis
          const safeMessage = String(mensagemAtiradora).normalize('NFC');
          const hosts = getWhatsAppHosts();
          let sent = false;

          for (const host of hosts) {
            try {
              await axios.post(`${host}/send`, {
                phone: cleanPhone,
                message: safeMessage
              }, { timeout: 10000 });
              logger.info(`[RecoveryService] Disparo de recuperação enviado via WhatsApp para ${cleanPhone} via ${host} (Pedido: ${pedido.id}).`);
              sent = true;
              break;
            } catch (errHost) {
              logger.warn(`[RecoveryService] Falha ao enviar para ${cleanPhone} via ${host}: ${errHost.message}`);
            }
          }

          if (!sent) {
            logger.warn(`[RecoveryService] Todos os hosts falharam para ${cleanPhone}. Mantendo para próxima tentativa.`);
            // Removemos o histórico para tentar de novo
            historico.pop();
            await pb.collection('lia_conversas').update(conversaId, { mensagens: historico }, { $autoCancel: false });
            continue;
          }

          // Se chegou até aqui, sucesso total. Marca o pedido para não receber mais disparo
          await pb.collection('pedidos').update(pedido.id, {
            recuperacao_enviada: true,
            observacoes: (pedido.observacoes ? pedido.observacoes + '\n' : '') + `[LIA] Recuperação automática enviada via WhatsApp em ${new Date().toLocaleString('pt-BR')}`
          }, { $autoCancel: false });
          
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
