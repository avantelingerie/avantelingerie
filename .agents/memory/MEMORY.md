# MEMORY.md — Memória de Longo Prazo do Ecossistema Avante Lingerie

Este documento consolida os identificadores definitivos, credenciais, configurações e decisões arquiteturais permanentes do projeto.

---

## 1. Identificadores Oficiais de Tráfego & Contas (NUNCA ESQUECER)

### Google Ads & Google Shopping
* **Google Ads Account ID:** `139-429-2049` (Customer ID numérico: `1394292049`)
* **Google Merchant Center ID:** `5860101191` (Nome da Conta: `Avante Lingerie 5860101191`)
* **E-mail Oficial das Contas Google:** `avantelingerie@gmail.com`
* **Feed XML de Produtos da Loja:** `https://avantelingerie.com.br/hcgi/api/marketing/feed.xml` (especificação RSS 2.0 / Google Base, 14 produtos ativos higienizados e livres de termos adultos restritos)
* **MCP Server na IDE:** `google-ads` localizado em `C:\Users\comer\.gemini\config\mcp\google-ads\server.js` (conector unificado 2-em-1 para Google Ads API v25 e Google Content API for Shopping)
* **Arquivo .env do MCP:** `C:\Users\comer\.gemini\config\mcp\google-ads\.env`
* **Escopos OAuth 2.0 Ativos:**
  * `https://www.googleapis.com/auth/adwords` (Google Ads)
  * `https://www.googleapis.com/auth/content` (Google Merchant Center / Content API)
* **Campanhas Google Ads Ativas:**
  * `[GOOGLE] B2C - Varejo | Kits & Renda` (ID: `24368401149`) — R$ 20,00/dia
  * `[GOOGLE] B2B - Atacado | Fábrica Friburgo Mínimo R$ 69,90` (ID: `24365539579`) — R$ 20,00/dia

### Meta Ads & Instagram (@avante.lingerie)
* **Meta App ID:** `1987006575274084` ("Avante Ads Hub")
* **Catalog ID:** `28203576722654659` ("Catálogo Oficial Avante Lingerie")
* **Instagram Business Account ID:** `17841421480843011` (@avante.lingerie)
* **Facebook Page ID:** Conectada via `entry.messaging` e `entry.changes`
* **Webhook URL:** `https://avantelingerie.com.br/hcgi/api/webhooks/instagram`

---

## 2. Infraestrutura, Deploy e Banco de Dados

* **Hospedagem:** VPS Hostinger (Ubuntu / Docker / Nginx / Node.js).
* **Deploy de Código:** NUNCA usar WinSCP para código. Deploy 100% automatizado via GitHub Actions ao fazer push na branch `main`.
* **Upload de Mídias Pesadas:** Vídeos > 5MB enviados via WinSCP para `/root/avantelingerie/public_media/video` na VPS.
* **Banco de Dados:** PocketBase local/produção com coleções `products`, `variacoes`, `categories`, `orders`, `integracoes_config`.
* **E-mail Transacional:** Resend via API exclusivamente para e-mails automáticos do sistema. (Equipe humana usa Zoho Mail).

---

## 3. Diretrizes de Tráfego e Conversão (Auditadas em 11/11/2026)

* **Varejo (B2C):** Necessita de formato visual (Google Shopping / PMax) para converter compras individuais (1-2.5% CR).
* **Atacado (B2B):** Buscas por *"atacado"*, *"revenda"* e *"fábrica"* não devem cair na Home de varejo; devem cair em página de revenda ou direto no WhatsApp da Lia com oferta de pedido mínimo (R$ 69,90 direto de Friburgo).
* **Políticas de Conteúdo:** O gerador do Feed XML (`apps/api/src/routes/marketing.js`) possui a função permanente `sanitizeForGoogleShopping` para filtrar palavras que geram falsos positivos de "conteúdo adulto" no Google.

---

## 4. Arquitetura da Vitrine de Atacado da Fábrica & Promoção Automática B2B (Implementada em 11/11/2026)

* **URL Oficial de Atacado:** `https://avantelingerie.com.br/categoria/todas?modo=atacado`
* **Mídia Hero:** Vídeo de alta costura da fábrica `https://avantelingerie.com.br/video/hero_2.mp4` (loop, muted).
* **Copywriting:** *"Confeccionamos nossas próprias peças com padrão de alta costura em Nova Friburgo. Venda direta da fábrica no Varejo e Atacado."*
* **Atendimento Humano no Atacado:** Botão direto para o WhatsApp pessoal e administrativo do Sr. Luiz Machado (`https://wa.me/5522981124281` - `(22) 98112-4281`).
* **Regra de Exibição:** Quando em `?modo=atacado`, os cards exibem o preço de atacado como custo principal (`Seu Custo de Fábrica`), com preço de varejo riscado e margem de lucro. A ordenação padrão é pelo Menor Preço (`price`).
* **Trava no Carrinho / Checkout:** Pedidos no modo atacado exigem o valor mínimo de **R$ 69,90** em produtos para liberar a finalização.
* **Promoção Automática B2B no Banco:**
  * Ao criar o pedido e confirmar o pagamento, o cliente é atualizado para `tipo_cliente: 'revendedor'`, `commercial_profile: 'reseller'` e `account_level: 'verified'`.
  * Isso faz a cliente aparecer imediatamente com a **Tag Laranja [Aprovado B2B]** no painel administrativo (`Base de Clientes`).
  * Se houver solicitação pendente em `solicitacoes_revendedor`, ela é aprovada automaticamente.
  * O sistema despacha o e-mail VIP de boas-vindas com o acesso ao Portal de Fotos/Vídeos para revenda.

## 5. Protocolo de Transbordo e Atendimento Humano (Sr. Luiz Machado) (11/11/2026)

* **Princípio:** A Lia AI continua atendendo 100% no automático como consultora virtual da loja e no WhatsApp oficial (`(22) 98122-5010`).
* **Condição de Transbordo (MANDATÓRIA):** SE E SOMENTE SE o cliente pedir explicitamente para falar com uma pessoa, um atendente humano, gerência ou administrativo (ex: "quero falar com um humano", "falar com atendente", "falar com o Luiz"):
  * A Lia responde: *"Vou passar para o administrativo Sr. Luiz Machado."*
  * Contato direto: WhatsApp `(22) 98112-4281` (`https://wa.me/5522981124281`).
* **Botão na Vitrine de Atacado (`/categoria/todas?modo=atacado`):** Aponta diretamente para o WhatsApp do Sr. Luiz Machado (`https://wa.me/5522981124281`) para fechar vendas de grandes revendedoras e lojistas.


