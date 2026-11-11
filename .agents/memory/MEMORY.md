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
