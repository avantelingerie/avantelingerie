import fs from 'fs';

const entry = `
- **03/11/2026 — Expedição, Rastreamento ao Vivo (Melhor Envio/J&T), E-mail VIP e WhatsApp Lia Sem Emojis Quebrados:**
  1. **Card de Expedição & Rastreamento no Admin (/admin/pedidos/:id):**
     - Criado card de alta conversão para expedição com input de Código de Rastreio, seletor de Transportadora (J&T Express, Jadlog, Correios, Azul Cargo) e botão '[ 🚚 Despachar Pedido & Notificar Cliente ]'.
     - Ações rápidas pós-despacho: cópia com 1 clique, botão direto 'Ver Rastreio na Loja' e botão 'Conversa WhatsApp (Lia)' com link wa.me direto.
  2. **Blindagem do WhatsApp contra Caracteres Quebrados (Mojibake de Emojis):**
     - Resolvida a causa raiz dos sinais estranhos no WhatsApp: normalização estrita Unicode NFC ('String.normalize("NFC")'), garantia de prefixo DDI 55 no telefone do destinatário e cabeçalho explícito 'Content-Type: application/json; charset=utf-8' no microserviço do bot.
  3. **E-mail VIP de Despacho (Resend pedidos@avantelingerie.com.br):**
     - Template editorial em paleta Preta e Dourada (#121212 / #c59b5f) com número do pedido, transportadora, código de rastreamento em destaque, botão CTA dourado para rastreio no site, resumo das peças, dica de cuidado com a renda e contato da consultora Lia.
  4. **Página Pública de Rastreio (/rastreio?codigo=...):**
     - Rota /shipping/track atualizada para buscar pedidos tanto pelo número quanto pelo código de rastreamento físico (ex: 888031017960740), integrando em tempo real com a API do Melhor Envio.
  5. **Roadmap Futuro Documentado:**
     - Arquivado em .agents/memory/ROADMAP_MELHOR_ENVIO_ETIQUETAS.md o planejamento técnico para geração automática de etiquetas térmicas com 1 clique via API v2 do Melhor Envio.
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('Memória técnica atualizada com sucesso!');

