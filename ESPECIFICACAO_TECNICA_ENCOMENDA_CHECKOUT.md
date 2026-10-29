# Especificação Técnica: Venda Sob Encomenda (Backorder) no E-commerce
**Avante Lingerie | Confecção Própria & Moda Íntima — Nova Friburgo/RJ**
*Módulo de Compra sob Encomenda no Checkout para Clientes Elegíveis & Revenda*

---

## 1. 🎯 Objetivo de Negócio

Permitir que clientes habituais, cadastrados e revendedoras autorizadas possam **comprar e pagar normalmente** por produtos e variações cujo estoque físico esteja zerado (`estoque <= 0`), aproveitando a capacidade de produção própria da fábrica em Nova Friburgo/RJ.

O sistema:
1. Elimina a fricção de direcionar clientes confiáveis para formulários de contato externos;
2. Garante o recebimento antecipado do valor (PIX à vista com 5% OFF ou Cartão de Crédito no Mercado Pago);
3. Soma de forma transparente o **prazo de confecção (5 a 7 dias úteis)** ao prazo do frete (Melhor Envio / Correios);
4. Registra o pedido com identificação clara para a equipe de corte e costura no Admin da loja e no Bling.

---

## 2. 🛡️ Matriz de Elegibilidade (Quem Pode Comprar Sob Encomenda?)

Para proteger a operação contra clientes desavisados ou de primeira viagem que possam reclamar do prazo estendido, a jornada é segmentada:

| Perfil do Cliente | Estado de Autenticação | Comportamento com Estoque Zerado | Ação no Clique |
| :--- | :--- | :--- | :--- |
| **Visitante Novo / Anônimo** | Deslogado | Botão *"📦 ENCOMENDAR DE FÁBRICA"* | Abre modal explicativo com link para WhatsApp da Lia ou formulário de `/contato` |
| **Cliente Varejo sem Histórico** | Logado (`total_compras === 0`) | Botão *"📦 ENCOMENDAR DE FÁBRICA"* | Modal com Termo de Confirmação de Prazo antes de liberar para o carrinho |
| **Cliente Habitual** | Logado (`total_compras > 0`) | Botão Dourado *"🧵 COMPRAR SOB ENCOMENDA"* | Adiciona direto à sacola com aviso de prazo |
| **Revendedora / Atacado (B2B)** | Logado (`isReseller === true`) | Botão Dourado *"🧵 COMPRAR SOB ENCOMENDA"* | Adiciona direto com preço de fábrica e aviso de lote de produção |
| **Cliente VIP Manual** | Flag `autorizado_encomenda: true` | Botão Dourado *"🧵 COMPRAR SOB ENCOMENDA"* | Totalmente liberado |

---

## 3. ⚙️ Alterações nos Componentes do Sistema

### 3.1 Hook de Carrinho (`apps/web/src/hooks/useCart.js`)
- **Bypass Seguro de Estoque:**
  ```javascript
  const isEncomenda = Boolean(product.is_encomenda);
  if (stockLimit <= 0 && !isEncomenda) {
    toast.error('Desculpe, este produto esgotou no momento!');
    return false;
  }
  ```
- **Atributos Gravados no Item:**
  - `is_encomenda: true`
  - `dias_producao: 7` (padrão 5 a 7 dias úteis)
  - `tag_encomenda: "Confecção de Fábrica"`
- **Helpers Reativos Exportados:**
  - `hasEncomendaItems`: `cart.some(item => item.is_encomenda)`
  - `maxDiasProducao`: `hasEncomendaItems ? Math.max(...cart.filter(i => i.is_encomenda).map(i => i.dias_producao || 7)) : 0`

---

### 3.2 Página do Produto e Card (`ProductPage.jsx` e `ProductCard.jsx`)
- Identificação da elegibilidade via `useAuth()`:
  - `const isEligibleForBackorder = isReseller || (currentUser && (currentUser.total_compras > 0 || currentUser.autorizado_encomenda));`
- Se `isOutOfStock && isEligibleForBackorder`:
  - Botão principal: **"🧵 COMPRAR SOB ENCOMENDA"** (ativo e clicável).
  - Modal rápido de confirmação: *"Esta peça será confeccionada sob encomenda na fábrica em até 7 dias úteis antes do despacho postal. Deseja prosseguir?"*
  - Ao confirmar: executa `addToCart({ ...product, is_encomenda: true, dias_producao: 7 })`.

---

### 3.3 Cálculo e Exibição de Frete (`SmartShipping.jsx`, `OrderSummary.jsx`, `Checkout.jsx`)
- **Regra de Unificação de Envio:**
  - Se o carrinho contiver 1 produto pronta-entrega e 1 produto sob encomenda, **o pedido é despachado em remessa única** assim que a encomenda estiver pronta (evita cobrança dupla de frete ao cliente).
  - O cálculo do prazo exibido soma:
    $$\text{Prazo Total} = \text{Prazo Frete (Melhor Envio)} + \text{maxDiasProducao (7 dias úteis)}$$
  - Exemplo Visual:
    - *PAC (Melhor Envio):* `5 dias úteis` $\rightarrow$ Exibido: `12 dias úteis`
    - Badge informativo: `[📦 Contém peça sob encomenda (+7 dias úteis de confecção)]`
  - Se Retirada na Fábrica: *"Disponível para retirada em 5 a 7 dias úteis (tempo de confecção)"*.

---

### 3.4 Persistência e Admin (`pedidos` no PocketBase & Bling)
- **Zero Risco de Migração de Banco:**
  - O array `itens` de cada pedido (que já é do tipo JSON) registra a flag `is_encomenda: true` e `dias_producao: 7` para cada item correspondente.
  - O campo `observacoes` do pedido recebe automaticamente:
    `"[PEDIDO SOB ENCOMENDA - CONFECÇÃO: 7 DIAS ÚTEIS]"`
  - Na tela de administração (`PedidosPage.jsx`), a linha do pedido recebe um badge destacado:
    `<Badge className="bg-amber-100 text-amber-800 border-amber-300">🧵 Encomenda</Badge>`
  - Isso garante que a expedição identifique na hora que a ordem de corte/costura deve ser acionada.

---

## 4. 🧪 Plano de Testes e Validação em Sandbox
1. Adicionar item com estoque zerado no carrinho sem flag `is_encomenda` $\rightarrow$ Deve barrar com toast.
2. Adicionar item com `is_encomenda: true` por usuário elegível $\rightarrow$ Deve permitir e salvar no carrinho.
3. Simular frete com e sem item sob encomenda $\rightarrow$ Verificar soma precisa dos dias úteis.
4. Fechar pedido em mock e inspecionar payload do PocketBase $\rightarrow$ Conferir integridade de `itens` e `observacoes`.
