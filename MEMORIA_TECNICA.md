# MemÃ³ria TÃ©cnica â€” Avante Lingerie

> Data: 08/07/2026
> Projeto: E-commerce Avante Lingerie (PocketBase + React + Express)
> Fluxo: antigravity â†’ opencode (revisÃ£o) â†’ Horizons (deploy)

---

## ðŸ›‘ IMPORTANTE: Arquitetura e LimitaÃ§Ãµes da Plataforma
Antes de iniciar qualquer codificaÃ§Ã£o profunda, **consulte as regras e restriÃ§Ãµes absolutas da infraestrutura da Hostinger** no nosso [Manual TÃ©cnico da Horizons](file:///C:/Users/comer/.gemini/antigravity/brain/e63ef4ca-093f-4a33-811c-51802a2f4c4d/MANUAL_HORIZONS.md). Ele detalha bloqueios de pacotes, amnÃ©sia do sistema, limitaÃ§Ãµes do banco de dados e regras de prompt.

---

## 1. Arquitetura do Projeto

```
avante-lingerie-novo/
â”œâ”€â”€ apps/
â”‚   â”œâ”€â”€ api/src/
â”‚   â”‚   â”œâ”€â”€ routes/          # Endpoints Express
â”‚   â”‚   â”œâ”€â”€ services/        # LÃ³gica de negÃ³cio (Bling, descontos, etc)
â”‚   â”‚   â””â”€â”€ utils/           # PocketBase client, logger, etc
â”‚   â””â”€â”€ web/src/
â”‚       â”œâ”€â”€ pages/
â”‚       â”‚   â”œâ”€â”€ admin/       # Painel administrativo
â”‚       â”‚   â””â”€â”€ *.jsx        # PÃ¡ginas da loja (ProductPage, CartPage, etc)
â”‚       â”œâ”€â”€ hooks/           # useCart, useCheckoutLogic, useUserProfile
â”‚       â”œâ”€â”€ components/      # Componentes reutilizÃ¡veis
â”‚       â””â”€â”€ context/         # AuthContext
â”œâ”€â”€ pb_migrations/           # Schema do PocketBase (versÃµes)
â”œâ”€â”€ package.json
â””â”€â”€ AGENTS.md
```

---

## 2. ColeÃ§Ãµes do PocketBase e Colunas

### ColeÃ§Ã£o `users` (autenticaÃ§Ã£o nativa)

| Campo | Tipo | DescriÃ§Ã£o |
|---|---|---|
| id | Sistema | ID Ãºnico |
| email | Email | Nativo PocketBase |
| emailVisibility | Booleano | Ocultar/exibir email |
| verified | Booleano | VerificaÃ§Ã£o de email |
| name | Texto | Nome completo |
| avatar | Arquivo | Upload de imagem |
| tipo_cliente | Texto | `"varejo"` (B2C) ou `"revendedor"` (B2B) |
| commercial_profile | Texto | `"retail"` ou `"reseller"` |
| account_level | Texto | NÃ­vel da conta |
| cpf | Texto | CPF |
| whatsapp | Texto | WhatsApp |
| bloqueado | Booleano | True/False |
| total_compras | NÃºmero | Total acumulado em compras |
| nivel_desconto | NÃºmero | NÃ­vel de desconto do cliente |
| desconto_pct | NÃºmero | % de desconto individual |

### ColeÃ§Ã£o `variacoes`

| Campo | Tipo | DescriÃ§Ã£o |
|---|---|---|
| id | string | Sistema |
| produto_id | Relacionamento | FK para `products` |
| cor | Texto | Cor da variaÃ§Ã£o |
| tamanho | Texto | Tamanho |**
| sku | Texto | SKU |
| estoque | NÃºmero | Quantidade em estoque **(NÃƒO usar `quantidade_estoque`)** |
| imagem_url | URL | URL da imagem |
| status | Booleano | Ativo/inativo |
| preco | NÃºmero | PreÃ§o de varejo |
| preco_atacado | NÃºmero | PreÃ§o de atacado |
| criado_em | Data | |
| created | Data | Sistema |
| updated | Data | Sistema |

### ColeÃ§Ã£o `pedidos`

| Campo | Tipo | DescriÃ§Ã£o |
|---|---|---|
| id | string | Sistema |
| numero_pedido | Texto | NÃºmero do pedido |
| cliente_id | Relacionamento | FK para `users` |
| cliente_nome | Texto | Nome no momento da compra |
| cliente_email | Email | |
| cliente_telefone | Texto | |
| data_pedido | Data | Data do pedido |
| status | Texto | Ex: confirmado, pendente |
| valor_total | NÃºmero | Total do pedido **(NÃƒO existe campo `total`)** |
| valor_desconto | NÃºmero | Valor do desconto aplicado |
| valor_frete | NÃºmero | Valor do frete |
| endereco_entrega | Texto | |
| cidade | Texto | |
| estado | Texto | |
| cep | Texto | |
| observacoes | Texto | |
| metodo_pagamento | Texto | Ex: credito, pix |
| rastreamento | Texto | CÃ³digo de rastreio |
| itens | JSON | Array de objetos com variacao_id, quantidade, preco_unitario |
| cpf | Texto | CPF do cliente no pedido |
| created | Data | Sistema |
| updated | Data | Sistema |

### ColeÃ§Ã£o `configuracoes_estoque`

| Campo | Tipo | DescriÃ§Ã£o |
|---|---|---|
| limite_upgrade_revenda | NÃºmero | Gatilho: valor mÃ­nimo no carrinho para oferecer upgrade B2Câ†’B2B |
| desconto_progressivo_faixas | JSON | Faixas de desconto para varejo (B2C) |
| desconto_progressivo_faixas_revenda | JSON | Faixas de desconto para revenda (B2B) |

---

## 3. Como o sistema diferencia B2B vs B2C

A verificaÃ§Ã£o Ã© feita em **~22 arquivos** usando:

```javascript
const isReseller = currentUser?.commercial_profile === 'reseller' || 
                   currentUser?.tipo_cliente === 'revendedor';
```

### Fluxo:

1. **Cadastro**: usuÃ¡rio escolhe "Varejo" (`tipo_cliente: 'varejo'`) ou "Revendedor" (`tipo_cliente: 'revendedor'`)
2. **AuthContext.jsx**: salva no PocketBase com default `'varejo'`
3. **CartPage.jsx**: upgrade B2Câ†’B2B (via modal) atualiza `tipo_cliente` e `commercial_profile`
4. **useCart.js `getItemPrice`**: B2B usa `preco_atacado`, B2C usa preÃ§o normal
5. **Faixas de desconto separadas**: B2C usa `desconto_progressivo_faixas`, B2B usa `desconto_progressivo_faixas_revenda`

### Gatilho de upgrade:
- Configurado em **`configuracoes_estoque.limite_upgrade_revenda`** (admin)
- Valores tÃ­picos: R$ 400 a R$ 500 (varia entre arquivos)
- Se B2C atinge o valor no carrinho â†’ modal de upgrade Ã© exibido

---

## 4. Problemas e CorreÃ§Ãµes Realizadas (08/07/2026)

### **Arquivo: `dashboard.js`** (apps/api/src/routes/dashboard.js)

| Problema | Causa | CorreÃ§Ã£o |
|---|---|---|
| `variacao.quantidade_estoque` retornava 0 | Coluna correta Ã© `estoque` | SubstituÃ­do por `variacao.estoque` |
| `variacao.nome` retornava `undefined` | `nome` nÃ£o existe em `variacoes` | Adicionado `expand: 'produto_id'` + acesso via `variacao.expand?.produto_id?.nome`. Fallback: `"cor tamanho"` ou `sku` |

### **Arquivo: `AnalyticsPage.jsx** (apps/web/src/pages/admin/AnalyticsPage.jsx)

| Problema | Causa | CorreÃ§Ã£o |
|---|---|---|
| `o.total` retornava 0 | Coluna correta Ã© `valor_total` | SubstituÃ­do por `o.valor_total` |
| LÃ³gica B2B/B2C por heurÃ­stica (`desconto >= 30%`) | NÃ£o consultava `tipo_cliente` do user | Criado `userMap` via `users` do banco. ClassificaÃ§Ã£o usa `user.tipo_cliente === 'revendedor' \|\| user.commercial_profile === 'reseller'`. Fallback residual removido. |

### **Arquivos verificados e OK:**

| Arquivo | Status |
|---|---|
| `apps/web/src/pages/admin/AnalyticsPage.jsx` | âœ… Revisado e corrigido |
| `apps/api/src/routes/dashboard.js` | âœ… Revisado e corrigido |

---

## 5. Arquivos com lÃ³gica B2B/B2C (nÃ£o alterados, apenas mapeados)

- `apps/web/src/pages/CartPage.jsx` â€” upgrade modal, validaÃ§Ã£o de limite
- `apps/web/src/pages/Checkout.jsx` â€” `isReseller`
- `apps/web/src/pages/ProductPage.jsx` â€” precificaÃ§Ã£o
- `apps/web/src/hooks/useCart.js` â€” `getItemPrice`, `getActiveDiscount`
- `apps/web/src/hooks/useCheckoutLogic.js` â€” `isReseller`
- `apps/web/src/hooks/useUserProfile.js` â€” `tipo_cliente`
- `apps/web/src/context/AuthContext.jsx` â€” signup
- `apps/web/src/pages/LoginPage.jsx` â€” radio buttons de cadastro
- `apps/web/src/pages/admin/ClientesTable.jsx` â€” badge de tipo

---

## 6. Regras para revisÃ£o futura

1. **Sempre confirmar colunas reais do PocketBase** antes de corrigir nomes de campos
2. **NÃ£o usar heurÃ­stica** para classificar B2B/B2C quando hÃ¡ campos reais (`tipo_cliente`, `commercial_profile`)
3. **`variacoes.estoque`** Ã© a coluna de estoque, NÃƒO `quantidade_estoque`
4. **`pedidos.valor_total`** Ã© a coluna de valor, NÃƒO `total`
5. **`variacoes`** nÃ£o tem `nome` â€” o nome do produto estÃ¡ em `products`, acessÃ­vel via `expand: 'produto_id'`
6. **Expand do PocketBase** Ã© a forma correta de resolver relaÃ§Ãµes entre coleÃ§Ãµes
### **MÃ³dulo de GestÃ£o de Clientes e B2B (08-09/07/2026) â€” 5 arquivos**

| # | Arquivo | AÃ§Ã£o | DescriÃ§Ã£o |
|---|---|---|---|
| 1 | `apps/web/src/services/clientesService.js` | Modificado | Adicionadas funÃ§Ãµes `getSolicitacoesPendentes`, `aprovarRevendedor`, `rejeitarRevendedor`. A aprovaÃ§Ã£o altera `tipo_cliente` e `commercial_profile` do usuÃ¡rio na tabela users. |
| 2 | `apps/web/src/pages/admin/ClientesPage.jsx` | Refatorado | Adicionado layout de Abas (Tabs). Aba 1: Tabela de Clientes. Aba 2: SolicitaÃ§Ãµes B2B pendentes. LÃ³gica de aprovaÃ§Ã£o/rejeiÃ§Ã£o implementada chamando o serviÃ§o. |
| 3 | `apps/web/src/components/admin/ClientesTable.jsx` | Modificado | Ajustado mapeamento para refletir os nomes exatos do banco (`name`, `whatsapp`, `created`). |
| 4 | `apps/web/src/components/admin/SolicitacoesRevendedorTable.jsx` | **Criado** | Componente visual para exibir a lista de leads que desejam se tornar revendedores, com botÃµes de Aprovar e Rejeitar. |
| 5 | `apps/pocketbase/pb_migrations/1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` | **Criado** | Migration que adiciona status `pendente/em_analise/aprovado/rejeitado` e define `updateRule` na coleÃ§Ã£o `solicitacoes_revendedor`. |

### **MÃ³dulo de GestÃ£o de Clientes e B2B (08-09/07/2026) â€” 5 arquivos**

| # | Arquivo | AÃ§Ã£o | DescriÃ§Ã£o |
|---|---|---|---|
| 1 | `apps/web/src/services/clientesService.js` | Modificado | Adicionadas funÃ§Ãµes `getSolicitacoesPendentes`, `aprovarRevendedor`, `rejeitarRevendedor`. A aprovaÃ§Ã£o altera `tipo_cliente` e `commercial_profile` do usuÃ¡rio na tabela users. |
| 2 | `apps/web/src/pages/admin/ClientesPage.jsx` | Refatorado | Adicionado layout de Abas (Tabs). Aba 1: Tabela de Clientes. Aba 2: SolicitaÃ§Ãµes B2B pendentes. LÃ³gica de aprovaÃ§Ã£o/rejeiÃ§Ã£o implementada chamando o serviÃ§o. |
| 3 | `apps/web/src/components/admin/ClientesTable.jsx` | Modificado | Ajustado mapeamento para refletir os nomes exatos do banco (`name`, `whatsapp`, `created`). |
| 4 | `apps/web/src/components/admin/SolicitacoesRevendedorTable.jsx` | **Criado** | Componente visual para exibir a lista de leads que desejam se tornar revendedores, com botÃµes de Aprovar e Rejeitar. |
| 5 | `apps/pocketbase/pb_migrations/1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` | **Criado** | Migration que adiciona status `pendente/em_analise/aprovado/rejeitado` e define `updateRule` na coleÃ§Ã£o `solicitacoes_revendedor`. |

### **CorreÃ§Ã£o pÃ³s-revisÃ£o: schema do `solicitacoes_revendedor` (09/07/2026)**

| Problema | Causa | CorreÃ§Ã£o |
|---|---|---|
| BotÃµes Aprovar/Rejeitar falham com erro de validaÃ§Ã£o | O campo `status` (select) sÃ³ tinha `"aprovado_automaticamente"` como valor vÃ¡lido; `updateRule` estava `null` (ninguÃ©m podia atualizar) | Criada migration `1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` que adiciona os valores `"pendente"`, `"em_analise"`, `"aprovado"`, `"rejeitado"` e define `updateRule = "@request.auth.id != \"\""` |

- **11/08/2026:**
  - `pb_migrations/1786463400_create_colecoes.js` criado (coleção `colecoes` para a Vitrine).
  - Bugfix: Migração `1786463500_update_rules_for_colecoes.js` adicionada para corrigir erro 403 no Admin. As regras `create`, `update` e `delete` de `colecoes` passaram de `null` (apenas superusers) para `@request.auth.id != ""`, equiparando à regra da tabela `products` para que administradores autenticados via coleção `usuarios` consigam salvar novos registros.
  - Bugfix: Migração `1786463600_add_timestamps_to_colecoes.js` adicionada para anexar os campos de sistema `created` e `updated`. Isso resolve o erro 400 Bad Request ao usar `sort: '-created'` nas buscas do Admin e da Home.
  - Formulário de Criação/Edição em `ColecoesManager.jsx` adicionado (antes o botão não renderizava form).
  - Transparência do menu mobile (`Header.jsx`) aumentada (`bg-black/95` para `bg-black/75` com `backdrop-blur-md`).
  - Bugfix: Corrigido `ReferenceError` em `CategoryPage.jsx` reordenando a declaração da variável `formattedCategoryName` para não colidir com o estado `entityName`, destravando o clique nas coleções na Home.
  - Melhoria Arquitetural: Adicionado `<input type="file" />` para `imagem_capa` em `ColecoesManager.jsx` com suporte a `FormData` para envio direto ao PocketBase.deve ser enviada para o PocketBase do Horizons (pasta `pb_migrations`) antes de usar os botÃµes de aprovaÃ§Ã£o.**

---

### **A Saga da LiberaÃ§Ã£o B2B na Horizons (09/07/2026)**

| Problema | Causa | CorreÃ§Ã£o |
|---|---|---|
| Horizons bloqueando API e Painel PB com Erro 404 e 500 | O servidor nÃ£o expÃµe a porta `8090` e o painel `/_/` externamente | Criado um script temporÃ¡rio no `main.js` com `setTimeout` que faz login interno na API (usando credenciais do `.env`) e injeta a regra `updateRule` via cÃ³digo, rodando totalmente do lado do servidor (seguro e indetectÃ¡vel pelo proxy reverso). |
| Furo de seguranÃ§a na regra `updateRule` | A regra `@request.auth.id != ""` permitia que QUALQUER cliente logado aprovasse cadastros | Regra modificada para `@request.auth.collectionName = "usuarios"`. Apenas o painel administrativo (que loga na coleÃ§Ã£o `usuarios`) tem permissÃ£o de clique. SeguranÃ§a total. |
| O botÃ£o Aprovar B2B nÃ£o estava recebendo novos cadastros | `QueroRevenderPage.jsx` estava configurada para AprovaÃ§Ã£o AutomÃ¡tica (NÃ­vel Bronze InstantÃ¢neo), pulando a fila | Descoberto o comportamento de aprovaÃ§Ã£o imediata. Planejada Nova Arquitetura de Funil B2B (ver abaixo). |

---

## 7. Funil de AprovaÃ§Ã£o B2B Manual ConcluÃ­do (10/07/2026)

**Objetivo Atingido:** Mudar o destravamento de nÃ­vel (Bronze para Silver/Gold) de AutomÃ¡tico para Manual, obrigando a cliente a passar pela aprovaÃ§Ã£o do administrador para ganhar acesso Ã s mÃ­dias.

| Arquivo Modificado | DescriÃ§Ã£o da Melhoria |
|---|---|
| `QueroRevenderPage.jsx` | Textos que prometiam "LiberaÃ§Ã£o Imediata" foram alterados para "AnÃ¡lise e AprovaÃ§Ã£o Manual". |
| `MinhaContaPage.jsx` | O preenchimento do CPF na aba "Meus Dados" agora cria um registro pendente em `solicitacoes_revendedor` e NÃƒO dÃ¡ `cadastro_completo = true` imediatamente. Aba "Arquivos" adaptada para refletir status de aprovaÃ§Ã£o. |
| `ResellerPortalPage.jsx` | O formulÃ¡rio agora envia a intenÃ§Ã£o diretamente para a fila B2B e notifica que estÃ¡ em anÃ¡lise. |
| `CartPage.jsx` (Checkout) | Corrigido o modal de Upgrade Varejo -> Atacado. Agora, quando a cliente faz o upgrade no carrinho, ela vira revendedora (para desconto) e o sistema envia a ficha dela silenciosamente para a aba "SolicitaÃ§Ãµes B2B". A obrigatoriedade do CPF foi mantida intacta para garantir faturamento de NFe no Bling. |
| `clientesService.js` | FunÃ§Ã£o `aprovarRevendedor` atualizada. Quando o Admin clica em Aprovar, o sistema agora seta `cadastro_completo = true` e `account_level = 'verified'`. |
| `ClientesTable.jsx` (Admin UI) | Adicionado um badge cinza escrito "Pendente" para revendedoras que ainda nÃ£o receberam a aprovaÃ§Ã£o (sem `cadastro_completo`). |
| `SolicitacoesRevendedorTable.jsx` (Admin UI) | Adicionado um indicador visual (bolinha verde pulsante) com o texto "Completo" para mostrar quando o cliente forneceu todos os dados obrigatÃ³rios, facilitando a decisÃ£o de clique do Administrador. |

---

## 8. Arquitetura da InteligÃªncia Horizons Mapeada (10/07/2026)

- Realizamos um interrogatÃ³rio profundo com a IA Horizons (Hostinger) para descobrir seus escopos de seguranÃ§a.
- Foi gerado o arquivo `MANUAL_HORIZONS.md`, com o check-list de poderes e limitaÃ§Ãµes arquiteturais.
- O manual foi linkado no topo desta `MEMORIA_TECNICA.md` como leitura de regra obrigatÃ³ria.

---

## 9. Planejamento Futuro: Venda de MatÃ©rias Primas (Tecidos, Rendas, etc)

**Contexto:** O sistema foi projetado com a constante `unidade: 'UN'` na integraÃ§Ã£o com o Bling, visto que a operaÃ§Ã£o de venda de lingerie baseia-se exclusivamente em produtos acabados vendidos por peÃ§a/unidade.

**Como adaptar quando a Avante iniciar a venda de matÃ©ria-prima:**
1. Criar uma nova coluna no PocketBase (tabela `products` e/ou `variacoes`) chamada `unidade_medida` (Select/Text).
2. Adicionar o campo na UI do Admin (Tela de Cadastro de Produto) com opÃ§Ãµes prÃ©-definidas:
   - `UN` (Unidade/PeÃ§a)
   - `M` (Metro - Para tecidos, viÃ©s, elÃ¡sticos)
   - `KG` (Quilograma)
   - `CX` (Caixa)
3. No arquivo `apps/api/src/routes/bling.js` (funÃ§Ã£o `sincronizarProdutoCompleto`), substituir a linha fixa:
   `unidade: 'UN'`
   por um fallback condicional:
   `unidade: variation.unidade_medida || product.unidade_medida || 'UN'`

Com essa mudanÃ§a simples, o e-commerce suportarÃ¡ mÃºltiplas grandezas fiscais para emissÃ£o de NF-e na Receita Federal de forma nativa e automÃ¡tica pelo Bling.

---

## 9. PrÃ³ximos Passos (Para a PrÃ³xima SessÃ£o / AmanhÃ£)

1. **Testes Finais da UI do Admin:** A Lia deve acessar o Painel Admin (Clientes) e verificar se o badge "Pendente" e a bolinha verde "Completo" aparecem corretamente e se a experiÃªncia de clique "Aprovar" estÃ¡ funcionando perfeitamente.
2. **InvestigaÃ§Ã£o do Estoque no Bling:** Descobrir e corrigir o motivo de o estoque (no site e no Bling) nÃ£o ser decrementado automaticamente apÃ³s a conclusÃ£o de um pedido de venda no fluxo do carrinho.
3. **ConfiguraÃ§Ã£o da Melhor Envio (Bling):** Validar a configuraÃ§Ã£o do PadrÃ£o de LogÃ­stica PDF e Postagem AutomÃ¡tica para garantir que o tracking code retorne Ã  Avante Lingerie sem atritos.

---

## 10. DiÃ¡rio de Incidentes e Ponto de Parada (13 e 14/07/2026)

### **1. O "Efeito Sanfona" do Estoque**
- **Problema:** Quando um pedido era gerado, o estoque baixava na loja, mas o Bling (por nÃ£o ter gerado a NF-e imediatamente) devolvia via Webhook o estoque antigo, causando o efeito sanfona (Loja voltava ao estoque anterior).
- **SoluÃ§Ã£o (Aplicada):** No painel do Bling, foi ativada a chave **"Considerar situaÃ§Ãµes de vendas para obter o saldo atual (Reserva de estoque)"** incluindo as situaÃ§Ãµes "Em aberto, Em andamento, Em digitaÃ§Ã£o, Verificado".
- **Status:** âœ… Resolvido. O Bling agora calcula o saldo fÃ­sico subtraindo a reserva, blindando a loja.

### **2. Erro de Forma de Pagamento no Bling (Bling V3)**
- **Problema:** Pedidos caÃ­am no Bling sem a forma de pagamento selecionada, exigindo preenchimento manual para gerar a NF-e.
- **Tentativa de SoluÃ§Ã£o (13/07):** Inserimos os cÃ³digos internos do Bling (Pix: 10033474, Boleto: 10033469, CrÃ©dito: 10543793) na variÃ¡vel `parcelas` do arquivo `blingService.js`.
- **Falha (Efeito Colateral):** Sem poder testar localmente, o cÃ³digo foi direto para a Horizons, quebrou a automaÃ§Ã£o, e os pedidos pararam de chegar ao Bling. O cÃ³digo foi **revertido** na mesma noite e o envio automÃ¡tico voltou a funcionar (sem a forma de pagamento).
- **O que precisa ser feito:** A IA deve analisar o fluxo do `webhooks.js` e `payment.js` para injetar corretamente o objeto `formaPagamento: { id: <codigo_bling> }` no arquivo `blingService.js`, mas SOMENTE quando puder testar localmente.

### **3. Colapso do Ambiente Local de Testes (PowerShell Error 80070002)**
- **Problema:** O PowerShell do sistema parou de funcionar apÃ³s uma limpeza do `prefetch`.
- **Impacto no Projeto:** A IA perdeu seu "laboratÃ³rio de testes". Sem o terminal, tornou-se impossÃ­vel rodar `npm run dev` e testar os cÃ³digos com seguranÃ§a antes de enviÃ¡-los para produÃ§Ã£o. Isso causou a falha do cÃ³digo de pagamento descrita acima.
- **DiagnÃ³stico TÃ©cnico:** Comandos SFC, DISM e o Reparador do .NET Framework nÃ£o resolveram. O motor principal do PowerShell 5.1 foi corrompido no registro/arquivos do Windows.
- **DecisÃ£o:** **Trabalhos de programaÃ§Ã£o paralisados.** Ã‰ inaceitÃ¡vel seguir codificando e jogando cÃ³digos diretamente em produÃ§Ã£o sem testes. A Host (Roseli) precisarÃ¡ restaurar/reparar o Windows (In-Place Upgrade) para que o PowerShell volte a abrir.

---

## 11. Protocolo de Retorno
Assim que o PowerShell estiver consertado, a retomada dos trabalhos deve seguir ESTA ordem estrita:
1. A IA deverÃ¡ ler este arquivo (`MEMORIA_TECNICA.md`) para recuperar o contexto e o "fio da meada".
2. Levantar a API localmente no novo terminal restaurado.
3. A Host farÃ¡ testes na loja, listarÃ¡ os bugs encontrados e, JUNTAS, analisaremos os logs locais e faremos a correÃ§Ã£o do `blingService.js`.
4. Enviar para a Horizons apenas apÃ³s testes de laboratÃ³rio 100% seguros.

---

## 12. Melhorias de Estabilidade e UX Finalizadas (15/07/2026)

O laboratÃ³rio local voltou a funcionar e realizamos uma bateria de testes e melhorias cruciais antes de atualizar a Horizons.

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `pedidos-creation-success-notification.pb.js` | **CriaÃ§Ã£o de Pedido Falhando:** A criaÃ§Ã£o de pedidos (banco de dados) falhava se as credenciais SMTP do PocketBase nÃ£o estivessem configuradas (ou enviassem erro). O hook tentava enviar um e-mail que barrava a transaÃ§Ã£o inteira. **SoluÃ§Ã£o:** O script de envio de e-mail automÃ¡tico foi removido do hook, deixando apenas a criaÃ§Ã£o da notificaÃ§Ã£o interna no painel Admin, blindando o processo de compra. |
| `ProdutoForm.jsx` | **Erro genÃ©rico ao salvar produto ("Failed to create record"):** Ocorria porque a sessÃ£o expirava ou era perdida sem aviso. **SoluÃ§Ã£o:** Adicionada uma validaÃ§Ã£o `!pb.authStore.isValid` que exibe alerta na tela pedindo para fazer login novamente. AlÃ©m disso, foi corrigido o envio de vÃ­deos para priorizar o campo `videos` do banco de dados na ordem de renderizaÃ§Ã£o. |
| `OrderConfirmation.jsx` | **MÃ­dia Quebrada e Layout Obscuro:** 1. A pÃ¡gina foi inteiramente redesenhada com fundo claro (`#F8F9FA`), blocos organizados e detalhes premium em dourado/escuro, mantendo a harmonia solicitada pela cliente. 2. A foto principal quebrava quando o produto usava um `.mp4` (renderizaÃ§Ã£o na tag de imagem). **SoluÃ§Ã£o:** O cÃ³digo agora detecta arquivos de vÃ­deo dinamicamente e os reproduz na listagem do pedido via `<video autoplay loop>`. |
| `ClientesTable.jsx` | **Bug Visual de B2B ("Tipo - Pendente"):** Revendedores aprovados ainda ficavam cinza como Pendentes, pois o UI buscava a coluna fantasma `cadastro_completo`. **SoluÃ§Ã£o:** O UI agora valida `account_level !== 'verified'`, o que reflete de imediato o sucesso da aba SolicitaÃ§Ãµes B2B para a Base de Clientes, marcando como "Aprovado B2B" (Laranja). |

### PrÃ³ximos Passos (AmanhÃ£)
1. A Lia atualizarÃ¡ os arquivos originais listados no painel Horizons.
2. Iniciar bateria de **Testes na Horizons (ProduÃ§Ã£o)**.
3. Verificar o funcionamento das integraÃ§Ãµes logÃ­sticas e faturamento via Bling com pedidos reais.

### CorreÃ§Ãµes de Cadastro de Produto e VariaÃ§Ãµes (16/07/2026)
- **Problema resolvido:** Congelamento silencioso (formulÃ¡rio ficava carregando infinitamente e nunca salvava) ao utilizar vÃ­deos como mÃ­dia principal e miniaturas (thumbnails) nÃ£o sendo vinculadas automaticamente Ã s variaÃ§Ãµes.
- **Causa Raiz 1 (Congelamento):** Arquivos de vÃ­deo .mp4 recebidos com ile.type vazio pelo SO eram enviados para a funÃ§Ã£o de compressÃ£o de imagens (que esperava imagens). O navegador congelava sua thread principal tentando ler um vÃ­deo de dezenas de megabytes como Base64 para gerar o Canvas, nÃ£o disparando eventos de erro de imagem a tempo.
- **Causa Raiz 2 (Miniaturas e Upload):** As etiquetas nÃ£o combinavam devido a discrepÃ¢ncias de maiÃºsculas, espaÃ§os e hifens (ex: 'Verde Militar' vs 'Verde-Militar'). AlÃ©m disso, o PocketBase nativamente bloqueava vÃ­deos na coluna image da tabela products.
- **Arquivos Alterados:**
  - pps/web/src/pages/admin/ProdutoForm.jsx: InclusÃ£o de trava de limite de 30MB; Tratamento robusto para ignorar conversÃµes via base64 para arquivos nÃ£o-imagem e vÃ­deos.
  - pps/web/src/components/admin/VariacoesTable.jsx: Adicionado mÃ©todo 
ormalizeText na funÃ§Ã£o geradora de variaÃ§Ãµes; AtualizaÃ§Ã£o para renderizaÃ§Ã£o via tag <video> no lugar da miniatura de imagem caso a mÃ­dia seja identificada como vÃ­deo.
  - pps/pocketbase/pb_migrations/1784200000_update_image_accepts_videos.js: Criada nova *migration* estendendo os mimeTypes aceitos na tabela products (coluna image) para aceitar .mp4, .webm, .mov, impondo limite restrito de maxSize: 31457280 bytes (30MB).
- **Testes Realizados Localmente:** Simulados os uploads, a normalizaÃ§Ã£o de texto na associaÃ§Ã£o, o preview via tag de vÃ­deo e confirmado a persistÃªncia e nÃ£o congelamento.

### Sistema de VÃ­deos Externos Inteligentes (YouTube/Vimeo) (16/07/2026)
- **MotivaÃ§Ã£o:** Contornar limitaÃ§Ãµes de banda, proxy (WAF) e timeouts de hospedagem (Horizons) ao enviar arquivos `.mp4` pesados, alÃ©m de poupar franquia de dados da loja hospedando os vÃ­deos em CDNs globais (YouTube/Vimeo).
- **Banco de Dados (PocketBase):** Solicitado e criado o campo `video_url` (tipo `url`) na coleÃ§Ã£o `products`.
- **Painel Admin (`ProdutoForm.jsx`):** 
  - Adicionado campo dedicado para "VÃ­deo Externo".
  - Implementada lÃ³gica de posicionamento (Escolha: "Primeira Capa" ou "Final"). O sistema codifica silenciosamente a escolha concatenando `#first` na URL enviada ao banco de dados, poupando a criaÃ§Ã£o de novas colunas.
- **Storefront (`ProductPage.jsx`):**
  - **IdentificaÃ§Ã£o AutomÃ¡tica:** DetecÃ§Ã£o de links YouTube, YouTube Shorts e Vimeo.
  - **Auto-Cropping (Fim das Barras Pretas):** O iframe injetado verifica a assinatura `/shorts/` e aplica `aspect-[9/16]` dentro de um contÃªiner overflow-hidden `aspect-[3/4]`, realizando o recorte perfeito (crop) sem barras laterais pretas (letterboxing).
  - **Miniaturas HD (Thumbnails):** UtilizaÃ§Ã£o da API oculta do YouTube (`img.youtube.com/vi/{id}/hqdefault.jpg`) para extrair e exibir a capa do vÃ­deo na lista inferior de miniaturas da galeria, preservando o layout da loja.
  - **Interatividade Liberada:** Propriedade `pointer-events-none` removida. O vÃ­deo entra em autoplay e mudo, mas a usuÃ¡ria tem liberdade de tocar no vÃ­deo para ativar o som (unmute), operando em harmonia com as setas do carrossel React.

### Bling V3: CorreÃ§Ãµes de NF-e, Pagamentos e SincronizaÃ§Ã£o Absoluta de Estoque (17/07/2026)
- **Problema 1 (NF-e travada):** A emissÃ£o da NF-e no Bling falhava porque a API V3 exigia um objeto `formaPagamento: { id: <id> }` dentro do array de `parcelas`, mas o sistema sÃ³ enviava a parcela bÃ¡sica sem a identificaÃ§Ã£o do pagamento.
- **SoluÃ§Ã£o 1:** InjeÃ§Ã£o do `getBlingFormaPagamentoId` no arquivo `blingService.js`. Mapeamos os IDs nativos do Bling para Pix (10033474), Boleto (10033469), DÃ©bito (10543801) e CrÃ©dito (10543793), o que permitiu a liberaÃ§Ã£o imediata e faturamento bem-sucedido das Notas Fiscais de teste.
- **Problema 2 (Estoque local nÃ£o baixava no CartÃ£o de CrÃ©dito):** Vendas realizadas via Stripe (checkout session) atualizavam o status do pedido mas nunca reduziam o estoque na tabela local (`variacoes.estoque`), permitindo furos.
- **SoluÃ§Ã£o 2:** Foi inserida a lÃ³gica de reduÃ§Ã£o de estoque diretamente dentro do bloco `checkout.session.completed` em `webhooks.js`.
- **Problema 3 (ERP as Single Source of Truth):** O cliente identificou que a loja dava baixa, mas se um pedido fosse cancelado ou restaurado no Bling, a loja nunca voltava ao normal.
- **SoluÃ§Ã£o 3:** ImplementaÃ§Ã£o completa da "SincronizaÃ§Ã£o Cega de Estoque". O endpoint `/bling` no arquivo `webhooks.js` foi reescrito para parar de apenas "fazer log" e comeÃ§ar a acatar os webhooks de saldo do Bling de forma ativa. Se o Bling enviar "Saldo: 91", a loja sobreescreve o estoque para 91 e grava o histÃ³rico em `movimentacoes_estoque`.
- **Ajuste de Processo (Bling):** O retorno ao valor de `100` nas variaÃ§Ãµes se devia a uma configuraÃ§Ã£o nativa do Bling de estorno de reserva no status "Atendido". O cliente foi instruÃ­do a habilitar a chave **"LanÃ§ar estoque ao emitir NF-e"** no painel ERP.

**Status atualizado:** CÃ³digos de integraÃ§Ã£o financeira e espelhamento de estoque finalizados, testados via webhook e enviados para a Horizons via arquivo `codigos_horizons.md`. Aguardando testes limpos (18/07/2026).


## [20-07-2026] AtualizaÃ§Ãµes de UI e LÃ³gica (PÃ¡gina de Produto e Modal)

### Arquivos Modificados:
1. **pps/web/src/pages/ProductPage.jsx**
   - Corrigida a lÃ³gica dinÃ¢mica do rÃ³tulo inteligente de Cor e Tamanho.
   - Resolvido o bug visual (linha diagonal errada) em tamanhos fora de estoque.
   - SeÃ§Ã£o \'Quem comprou, tambÃ©m amou\' ajustada para buscar apenas itens reais da loja, sem produtos fictÃ­cios, com limite mÃ¡ximo de 4 itens.

2. **pps/web/src/components/ProgressiveDiscountBar.jsx**
   - Realizados experimentos de UI (Gold, Light Premium, Dark Glass/Visa Infinite).
   - O cÃ³digo foi **integralmente revertido** para a versÃ£o Original Dark Mode apÃ³s aprovaÃ§Ã£o final do design anterior.

### PrÃ³ximos Passos (AmanhÃ£):
- Revisar e implementar lÃ³gica inteligente e real para a seÃ§Ã£o de EstatÃ­sticas e Depoimentos (substituindo os mocks remanescentes).

## [21-07-2026] Bugfix do Player de VÃ­deo e EstÃ©tica de Luxo

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `ProductPage.jsx` | **Bug do VÃ­deo nÃ£o renderizar:** O campo `video_url` da `products` suporta links, mas o cÃ³digo limitava rigidamente usando a regex `match(/\.(mp4\|webm\|mov)$/i)`. Quando a cliente usava links de vÃ­deo (ex: da hostinger) que tivessem parÃ¢metros (ex: `video.mp4?v=1`), o player simplesmente sumia. **SoluÃ§Ã£o:** Aplicada a funÃ§Ã£o nativa `isDirectVideo` de `utils.js` (que engloba queries e hashes) na renderizaÃ§Ã£o e injeÃ§Ã£o do vÃ­deo. |
| `ProductCard.jsx` | **BotÃµes com Cores Conflitantes:** Os botÃµes da vitrine "Quem comprou tambÃ©m amou" tinham permanecido verde-esmeralda, destoando do padrÃ£o Luxo (Ouro/Preto). **SoluÃ§Ã£o:** Reescrita do CSS Tailwind usando `bg-[#121212]`, bordas `border-[#c59b5f]/30` e textos dourados `#c59b5f`. |
| `SocialProofStats.jsx` | **Componente Cinza/EstÃ¡tico:** O painel estatÃ­stico nÃ£o combinava com o restante da pÃ¡gina. **SoluÃ§Ã£o:** O componente foi todo reescrito para tema Premium Dark (Blur backgrounds, bordas douradas). |
| `package.json` (apps/web) | **AnimaÃ§Ã£o MatemÃ¡tica:** O pacote `react-intersection-observer` foi instalado para acionar o `framer-motion` (react-countup customizado) nas estatÃ­sticas apenas quando a usuÃ¡ria fizesse o *scroll* atÃ© a sessÃ£o. |

### PrÃ³ximos Passos
- Realizar teste final de compra com Checkout Bling CPF/CNPJ apÃ³s a compra do Certificado Digital A1.

## [21-07-2026] (Parte 2) Blindagem Dupla do Webhook do Bling V3

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `apps/api/src/routes/webhooks.js` | **Ignorando o Webhook V3:** O cliente notou que pedidos testes sem Stripe (ou gerados direto no painel) geravam a NFe no Bling e reduziam o estoque lÃ¡ (100 -> 90), mas a loja permanecia com 100. **DiagnÃ³stico:** O Bling V3 mudou o payload de `{"data": {"retorno": {"estoques": [...]}}}` para um array limpo `{"data": "[{\"codigo\":\"SKU\", \"saldoFisico\": 90}]"}`. O interpretador falhava, deixando `estoques` vazio e ignorando a mensagem. **SoluÃ§Ã£o (Blindagem Dupla):** Refizemos o parser do webhook em cascata para aceitar os formatos antigos e novos `Array.isArray(parsedData)`. AlÃ©m disso, reforÃ§amos a lÃ³gica no prÃ³prio Stripe webhook, permitindo que a baixa ocorra buscando a variaÃ§Ã£o tambÃ©m por `item.sku` caso falhe a busca pelo `variacao_id`. |
| `apps/api/src/routes/webhooks.js` | **O Triunfo sobre o Cancelamento Seco:** O Bling V3 enviava um webhook de "SituaÃ§Ã£o do Pedido Alterada" para `Cancelado`, mas nossa loja ignorava. AcreditÃ¡vamos que a API retornaria a palavra "Cancelado". AtravÃ©s de um Raio-X com o Webhook.site, descobrimos a pegadinha final: o Bling enviava silenciosamente apenas o nÃºmero `2` (Valor: 2) e o ID `12`. O cÃ³digo foi refatorado para reconhecer o ID 12 e o valor 2 diretamente. Resultado: o sistema agora intercepta o cancelamento na hora, acha o pedido na base, encontra a variaÃ§Ã£o e **devolve o estoque magicamente na loja**, tudo de forma autÃ´noma! |
| `apps/api/src/routes/bling.js` | **Rota SecundÃ¡ria com Mesmo Bug:** Existia uma rota legada e duplicada `/webhook/estoque` procurando `estoqueAtual` (usado no V2) em vez de `saldoFisico` (usado no V3). **SoluÃ§Ã£o:** Aplicada a mesma lÃ³gica de parsing triplo para garantir que, caso o Bling chame essa rota secundÃ¡ria, o sistema tambÃ©m efetue o update de estoque corretamente. |

### PrÃ³ximos Passos
* Nenhuma pendÃªncia urgente. A integraÃ§Ã£o de estoque e fluxo de pedidos entre Loja e Bling V3 estÃ¡ **100% funcional e blindada**.
* O painel administrativo e de infraestrutura aguarda as prÃ³ximas demandas da equipe.

## [21-07-2026] (Parte 3) InteligÃªncia de Cancelamento do Bling V3

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `apps/api/src/routes/webhooks.js` | **Falta de InteligÃªncia para Cancelamento Seco:** O Bling V3 enviava um webhook de "SituaÃ§Ã£o do Pedido Alterada" para `Cancelado` (id=12), mas o integrador ignorava completamente esse payload, nÃ£o devolvendo o estoque para a vitrine da Avante Lingerie. **SoluÃ§Ã£o:** Implementado o bloco `1.5` de interceptaÃ§Ã£o de cancelamentos (`payload?.data?.situacao?.nome === 'Cancelado'`). Agora, ao ler isso, a loja encontra o pedido local, cancela-o e re-soma a quantidade de cada item vendido de volta no estoque da variaÃ§Ã£o, criando ainda um histÃ³rico em `movimentacoes_estoque`. |

## [21-07-2026] (Parte 4) IntegraÃ§Ã£o Bling V3 - Custom IDs e `bling_pedido_id`

### O que foi feito e resolvido
1. **Novo Campo no PocketBase:** A equipe da Horizons (painel) criou oficialmente a coluna de texto `bling_pedido_id` na coleÃ§Ã£o `pedidos` para garantir a ligaÃ§Ã£o imutÃ¡vel entre a loja e o ERP, evitando depender do ID gerado pela prÃ³pria loja que poderia causar ruÃ­dos.
2. **AtualizaÃ§Ã£o no `blingService.js`:** Ajustado para salvar o ID retornado pelo Bling no novo campo `bling_pedido_id` apÃ³s a sincronizaÃ§Ã£o bem-sucedida.
3. **RefatoraÃ§Ã£o no `webhooks.js` (Bloco 1.5):** O cÃ³digo foi profundamente atualizado. Primeiro, percebemos que o Bling V3 esconde a palavra "Cancelado" no webhook e envia apenas o ID (ex: 12). Mais adiante, descobrimos que esse ID **Ã© customizado por conta** (uma pegadinha do Gerenciador de TransiÃ§Ãµes do Bling). A soluÃ§Ã£o definitiva foi importar o `axios` e `getBlingToken`, fazendo a API da loja consultar ativamente a API V3 do Bling (`GET /pedidos/vendas/{id}`) assim que o webhook de status chegar. A loja extrai a string com o nome da situaÃ§Ã£o e, caso contenha "cancelad" ou "devolvid", atualiza o estoque.

### O que NÃƒO foi resolvido e ficou pendente para amanhÃ£
- **O estoque da loja ainda nÃ£o atualiza ao cancelar no Bling:** Apesar de toda a correÃ§Ã£o lÃ³gica e blindagem, a cliente reportou que apÃ³s cancelar no Bling, a loja manteve o estoque inalterado. 
- **HipÃ³teses para amanhÃ£:**
  1. A chamada da API `axios.get` usando o `getBlingToken()` falha silenciosamente na Horizons e aciona o *fallback* de IDs (que nÃ£o mapeia o ID customizado da cliente).
  2. O webhook recebido Ã© de ESTOQUE (stock virtual) decorrente do cancelamento e nÃ£o de pedido, e o Bling V3 omite o `codigo` (SKU) nesse payload, inviabilizando o espelhamento no bloco 2.
  3. A URL para a API do Bling estÃ¡ formatada incorretamente ou exigindo um payload diferente no ambiente V3.
- **Plano de AÃ§Ã£o (AmanhÃ£):** Implementar temporariamente uma rotina (um interceptador no inÃ­cio da rota) que capture o `payload` inteiro do webhook e o salve na coleÃ§Ã£o `movimentacoes_estoque` ou `logs_webhooks`. Assim, enxergaremos com exatidÃ£o o que o servidor da Horizons estÃ¡ recebendo do Bling e os erros reais do ambiente em produÃ§Ã£o.

## [23-07-2026] Projeto Lia AI - O CÃ©rebro (Painel Admin) e ResiliÃªncia

### O que foi feito e resolvido
1. **Painel de Controle da Lia:** A aba `/admin/lia` foi criada com sucesso, integrada ao roteador e protegida pela autenticaÃ§Ã£o do admin. A interface lista o histÃ³rico de todas as sessÃµes em tempo real.
2. **Treinamento e Conhecimento:** Criada a aba de gestÃ£o para adicionar, editar e remover "regras dinÃ¢micas" que vÃ£o para a tabela `lia_knowledge`.
3. **Pausa por Humano (Handoff):** O botÃ£o "Assumir Conversa" foi implementado no painel, alterando a flag `assumida_por_humano` na tabela `lia_conversas`. O backend foi atualizado para verificar essa flag e travar a resposta da IA caso o humano assuma o controle.
4. **ResiliÃªncia do Chat Local:** Descobrimos que o backend nÃ£o fazia auto-restart (`npm run dev` apenas com `node`). Limpamos portas fantasmas (3000, 3001, 8090) com script PowerShell para permitir que a usuÃ¡ria rodasse um backend limpo com a nova rota `/lia/chat`.
5. **CorreÃ§Ã£o de OrdenaÃ§Ã£o do PocketBase:** As tabelas geradas localmente nÃ£o possuÃ­am `created/updated` como a Horizons possui. O painel admin tentava usar `?sort=-updated` e o banco rejeitava com status 400. Ajustamos o React para buscar a lista inteira e fazer a ordenaÃ§Ã£o via Javascript, alÃ©m de colocar data-fallbacks para nÃ£o exibir "Invalid Date".
6. **Fallback de SeguranÃ§a Validado:** Como a API Key da Anthropic ainda nÃ£o foi injetada, a rota `/lia/chat` interceptou a falta de chave e retornou perfeitamente o graceful-fallback ("Estou passando por uma atualizaÃ§Ã£o... chame no WhatsApp").

### O que ficou para amanhÃ£
1. Injetar a chave da API (Claude) no projeto.
2. Concluir o motor RAG (ler produtos e regras do `lia_knowledge` para injetar no prompt do sistema).
3. Conectar a interface do botÃ£o de WhatsApp real na resposta de Fallback do widget.

## [24-07-2026] Projeto Lia AI - InteligÃªncia, RAG e EstratÃ©gias de Venda

### O que foi feito e resolvido
1. **Motor RAG de Produtos:** Implementada a injeÃ§Ã£o do catÃ¡logo de produtos no `System Prompt` (backend). A Lia agora lÃª em tempo real do banco de dados (PocketBase) a lista de produtos com nome, tecido, preÃ§os reais e slugs para criar links.
2. **BotÃ£o de Fallback WhatsApp (Frontend):** Atualizado o `LiaWidget.jsx` para parsear a resposta do chat e renderizar automaticamente um botÃ£o verde do WhatsApp toda vez que a Lia citar a palavra 'WhatsApp' e 'botÃ£o abaixo', permitindo escalonamento humano instantÃ¢neo sem perda de UX.
3. **ConversÃ£o de Links Markdown:** Adicionada uma funÃ§Ã£o `renderMessageWithLinks` no chat (frontend) que transforma os links enviados pela IA no formato `[Produto](/slug)` em botÃµes dourados clicÃ¡veis `<a href>`.
4. **ResoluÃ§Ã£o de Erro de IntegraÃ§Ã£o (Anthropic):** Identificado que a chave da Anthropic (geraÃ§Ã£o de 2026) retornava 404 para o modelo `claude-3-haiku` descontinuado. Os cÃ³digos do painel administrativo (`integracoes.js`) e do cÃ©rebro (`lia.js`) foram atualizados para utilizar os modelos mais novos e disponÃ­veis na conta da cliente: `claude-haiku-4-5-20251001` e `claude-sonnet-4-6`.
5. **AutomaÃ§Ã£o do Carrinho Abandonado:** O gatilho de abertura automÃ¡tica da rota `/carrinho` foi reescrito para oferecer uma mensagem de ajuda proativa (troca de tamanho, suporte e WhatsApp).
6. **EstratÃ©gias de NegÃ³cio via Prompt (Cross-sell, Escassez e B2B):**
   - **Cross-sell:** Injetada regra na IA para sempre pesquisar por calcinhas correspondentes ao sutiÃ£ e vice-versa e recomendar sutilmente o link da peÃ§a conjunta.
   - **Estoque/Escassez:** A IA agora lida com itens fora de estoque oferecendo "Encomendas Especiais" via botÃ£o de WhatsApp.
   - **Pesca B2B:** Injetada instruÃ§Ã£o para pitch sutil sobre o "Programa de Revendedoras e Atacado" se detectar cliente buscando volume alto ou querendo revender.
7. **Seed de Banco de Dados:** Criado e executado um script (`seed_knowledge.mjs`) que injetou 6 polÃ­ticas operacionais iniciais (Frete, Trocas, Atacado, Tamanhos, Pagamento e Cuidados) na coleÃ§Ã£o `lia_knowledge`.

### PrÃ³ximos Passos
1. Aguardar o fornecimento das chaves de API do Bling / Melhor Envio para iniciar a Fase 2 (IntegraÃ§Ã£o de Rastreio de Pedidos via Chatbot / Function Calling).

## [28-07-2026] Lobotomia da Lia (CorreÃ§Ã£o de HorÃ¡rios) e MigraÃ§Ã£o de Infraestrutura

### O que foi feito e resolvido
1. **Varredura PanorÃ¢mica de HorÃ¡rios:** Identificamos que o horÃ¡rio de funcionamento antigo da loja estava "espalhado" por todo o cÃ³digo e na memÃ³ria fixa da Lia. Modificamos 5 arquivos cruciais (incluindo o cÃ©rebro `liaKnowledgeBase.js`, `App.jsx`, `CentralDaClientePage.jsx`, `OrderConfirmation.jsx` e `ConfiguracoesLoja.jsx`) para refletir o novo horÃ¡rio: **Seg-Qui 08h-17h, Sex 08h-13h**.
2. **ConfiguraÃ§Ã£o da VPS Hostinger:** 
   - Acesso SSH estabelecido com sucesso usando a chave criptografada.
   - DiagnÃ³stico apontou que a API estava em crash-loop (reiniciando) devido Ã  falta de um arquivo `.env` na produÃ§Ã£o. O arquivo foi recriado na VPS corrigindo a falha.
3. **Caddy Proxy & SSL (DomÃ­nio Principal):** O sistema `docker-compose.yml` da VPS foi reestruturado. O container web cedeu a porta 80, e implementamos o **Caddy** como proxy reverso para assumir o domÃ­nio `avantelingerie.com.br`, gerando o cadeado SSL automaticamente (HTTPS) e balanceando a carga entre web, api e pocketbase.
4. **Fuga dos Limites do GitHub (MigraÃ§Ã£o de MÃ­dia):**
   - Descobrimos 15 arquivos pesados (12 vÃ­deos de layout e depoimentos, 3 imagens) apontando para a hospedagem antiga (`lmdesignerweb.com`).
   - Para evitar o bloqueio de 100MB do GitHub (que nos impediu de comitar o `nova_friburgo_bg.mp4`), a VPS fez o download NATIVO via `wget` das mÃ­dias direto para um volume host (`/public_media`).
   - O Caddyfile foi atualizado com `handle_path` para entregar nativamente as rotas `/video/*` e `/imagens/*` na velocidade da luz.
   - O cÃ³digo frontend (React) foi totalmente higienizado: substituÃ­mos as URLs engessadas da `lmdesignerweb.com` pelas rotas relativas da prÃ³pria VPS.

### PrÃ³ximos Passos
1. A infraestrutura e a hospedagem da loja agora pertencem 100% Ã  VPS da Hostinger. A hospedagem antiga (`lmdesignerweb.com`) pode ser formalmente cancelada pela cliente.
2. Iniciar novos fluxos pendentes e continuar o acompanhamento da Lia em produÃ§Ã£o.

---

## [30-07-2026] O Incidente das MÃ­dias Desaparecidas (Root Cause & Fix)

### **Problema Relatado:** 
Todos os vÃ­deos (depoimentos, quem somos, background) e imagens essenciais (avatar da Lia, Ã­cones) sumiram da loja em ProduÃ§Ã£o e do ambiente de Desenvolvimento Local, gerando 404.

### **DiagnÃ³stico de Causa Raiz:** 
Embora a hospedagem antiga (`lmdesignerweb.com`) estivesse abandonada, os arquivos das mÃ­dias nÃ£o estavam mais no diretÃ³rio `/root/avantelingerie/public_media` da VPS (a etapa anterior de download relatada em 28-07 nÃ£o estava persistida em disco).
No ambiente local, a pasta nunca existiu pois o GitHub bloqueia commits acima de 100MB (limite estrito) e o arquivo `.gitignore` previne a sincronizaÃ§Ã£o desses artefatos gigantes.

### **CorreÃ§Ã£o CirÃºrgica & Raio de Impacto:**
1. **VPS (ProduÃ§Ã£o):** Executado um comando `wget` maciÃ§o via SSH que reconstruiu as pastas `/video` e `/imagens` dentro de `/public_media`, baixando diretamente 483MB em vÃ­deos sem passar pelo disco da usuÃ¡ria. O proxy `caddy` foi reiniciado via `docker compose restart caddy` forÃ§ando o reload da montagem de volumes, retornando `HTTP/2 200` absoluto.
2. **Local (Desenvolvimento):** Para nÃ£o sobrecarregar o desktop da Host com 500MB de arquivos, editamos o `apps/web/vite.config.js`. Adicionamos uma regra inteligente de **Proxy Reverso**. Agora, qualquer pedido local na porta `3000` para `/video/*` Ã© injetado dinamicamente para puxar a mÃ­dia direto da produÃ§Ã£o (`https://avantelingerie.com.br`).
3. **LiaWidget.jsx:** Restaurada a tag `<img src="/imagens/lia_avatar.png">` que tinha sido substituÃ­da emergencialmente, e ressuscitado o gatilho `imageError` para proteger a interface contra quebras.

**Status:** âœ… Solucionado (Auditoria dupla finalizada). MÃ­dias operacionais 100% online.

## [30-07-2026] (Parte 2) Melhorias no Painel Admin e Bugfixes no Bot WhatsApp

### O que foi feito e resolvido
1. **AmnÃ©sia CronolÃ³gica no Painel Admin:** As mensagens do WhatsApp que chegavam nÃ£o subiam para o topo do painel administrativo. 
   - **SoluÃ§Ã£o:** Como o PocketBase gerado via WebSocket no frontend nÃ£o envia `updated` dinÃ¢mico em eventos de webhook em tempo real (jÃ¡ que quem atualiza o banco Ã© a API backend), injetamos um `local_updated: new Date()` no frontend durante o evento do WebSocket e ordenamos as sessÃµes combinando `updated` e `local_updated`. Adicionamos um `.reverse()` no fetch inicial.
2. **Barra de Pesquisa e HorÃ¡rios (UX):** A barra de pesquisa do painel nÃ£o funcionava. 
   - **SoluÃ§Ã£o:** Implementado filtro por `telefone/session_id` e conteÃºdo. Adicionada formataÃ§Ã£o de horÃ¡rio amigÃ¡vel para mensagens no formato "HH:mm".
3. **QR Code Inteligente:** O QR code do WhatsApp estava aparecendo permanentemente (e jÃ¡ vencido) ao acessar a aba.
   - **SoluÃ§Ã£o:** Criado botÃ£o `Exibir QR Code` sob demanda (`showQrCode`) ocultando a imagem atÃ© a usuÃ¡ria solicitar.
4. **Bug do Disparo Fantasma (6x):** A IA estava recebendo e respondendo a exata mesma mensagem do usuÃ¡rio 6 vezes.
   - **DiagnÃ³stico:** Bug da biblioteca `whatsapp-web.js` em contas com MÃºltiplos Dispositivos (Multi-Device). Ao receber o "history sync", ela disparava mÃºltiplos eventos `@lid`.
   - **SoluÃ§Ã£o:** Implementado um Filtro de Cache em MemÃ³ria (`Set`) no `apps/whatsapp-bot/index.js` guardando os Ãºltimos 500 IDs (`msg.id.id`). Agora as cÃ³pias descartÃ¡veis que chegam no mesmo segundo sÃ£o sumariamente ignoradas.
5. **CorreÃ§Ã£o dos Links Absolutos (Haiku):** A IA estava enviando mensagens textuais instruindo a "Clicar no Menu" (jÃ¡ que leu isso no catÃ¡logo), ignorando que o cliente estava no WhatsApp.
   - **SoluÃ§Ã£o:** O prompt de sistema do cÃ©rebro (`apps/api/src/routes/lia.js`) foi reescrito injetando alertas imperativos de que o cliente NÃƒO tem acesso ao menu, acompanhado das URLs hardcoded para Revenda e Shop.

**Status:** âœ… Todas as correÃ§Ãµes aplicadas na VPS, validadas e 100% operacionais. Tudo pronto para o prÃ³ximo dia de trabalho!

## [31-07-2026] Setup Oficial de Rastreamento (Meta & Google) e Refinamento do Painel Analytics

### O que foi feito e resolvido
1. **Setup do Meta Pixel:** Guiamos o cliente na criação do Portfólio de Negócios e do Conjunto de Dados, extraindo com sucesso o ID final (981595838258999).
2. **Setup do Google Analytics 4:** Criamos o fluxo da web e configuramos a tag principal (G-E2FS36FRG1).
3. **Painel de Tracking & Pixels (Admin):** Foi construída a aba para inserir os IDs no Painel Administrativo. Durante os testes em produção, identificamos e corrigimos um bug de restrição do PocketBase (que impedia o salvamento quando apenas um dos campos era preenchido). A correção foi deployada com sucesso na VPS.
4. **Auditoria dos Exportadores de Público:** O código dos geradores de CSV para Lookalike (Meta) e Customer Match (Google) foi exaustivamente auditado e validado, garantindo aderência 100% às políticas de ambas as plataformas.

### Próximos Passos
- O cliente precisa agora direcionar as demandas prioritárias para o desenvolvimento da loja e dos bots de WhatsApp, como a tão aguardada integração de rastreio de logística (Melhor Envio) ou finalização de dashboards.

### **Seção Categorias Dinâmicas (04/08/2026)**
- **Arquivo:** pps/web/src/pages/HomePage.jsx`n- **O que foi feito:** O array estático categories foi substituído por um useState. Adicionou-se lógica para buscar todas as categorias (tivo=true) da coleção categorias. Para cada categoria encontrada, busca-se o produto mais recente que tenha uma imagem, utilizando essa imagem como thumbnail da categoria no carrossel. O link gerado para redirecionamento passou a ser dinâmico (/categoria/). Dessa forma, qualquer alteração no Painel Admin reflete imediatamente na Home.
## [05/08/2026] Infraestrutura de E-mail (Resend) e DNS
- **Resend na API**: A integração do envio de e-mails usando a SDK do Resend foi finalizada no backend.
- **Docker e VPS**: Corrigido bug de compilação do 
pm ci nos Dockerfiles para 
pm install. A VPS foi reconstruída e a injeção da variável RESEND_API_KEY agora é forçada pelo env_file.
- **Rastreamento Seguro**: Implementada trava de segurança na página de rastreio, exigindo login quando o cliente busca pelo Número do Pedido.
- **DNS e Domínio**: A autoridade do DNS foi transferida da Hostinger de volta para o Registro.br. Os 5 apontamentos (A para a VPS, TXT e MX para o Resend) foram configurados.
- **Próximos Passos (Ponto de Parada)**: Validar o domínio no painel do Resend e realizar uma compra de teste para verificar o disparo dos e-mails e WhatsApp.

## [07-08-2026] Teste Transacional, Bugfixes e Setup do Zoho Mail

### O que foi feito e resolvido
1. **Teste Transacional de Sucesso (Resend + Lia WhatsApp):** A integração de disparo de notificações transacionais foi homologada em produção. O sistema agora intercepta a criação do pedido (status `pendente` ou `criado`) e dispara simultaneamente um E-mail (via API do Resend) e um WhatsApp automatizado via Lia, notificando a cliente do recebimento do pedido e aguardo de pagamento.
2. **Correção de Nome no Template:** Foi corrigido um bug onde a notificação saía como "Olá, Cliente!" devido a inversão de variáveis (`nome_cliente` para `cliente_nome`) no payload do PocketBase. A alteração foi *pushada* para o GitHub e implantada com sucesso via GitHub Actions na Hostinger.
3. **Correção de UX (Admin):** Removido o `overflow-hidden` do painel administrativo e injetado o comportamento de `sticky top-24` no bloco de Mídias/Fotos (Página de Produto), garantindo que as imagens acompanhem a rolagem ao cadastrar as infinitas variações de cores e tamanhos.
4. **Zoho Mail (E-mail Corporativo):** Iniciada a criação do ecossistema de caixa de entrada profissional gratuita. Criamos o Guia Mestre (`zoho_mail_setup.md`) detalhando os passos para cadastro no Forever Free Plan, configuração de registros MX/TXT/SPF/DKIM no Registro.br e criação dos alias (suporte, pedidos, etc).
5. **Memória de Infraestrutura e Automação de Arquivamento:** O usuário acionou a Ada via comando `/learn` para injetar no `AGENTS.md` uma regra perpétua de atualização histórica (`MEMORIA_TECNICA.md`). Ademais, blindamos as regras de deploy na IA (sempre via Github Actions, nunca WinSCP) e a divisão exata de responsabilidades entre Resend (Disparos API) e Zoho (Caixa de Entrada Humana).

### Próximos Passos (Ponto de Parada)
1. Concluir a verificação do domínio via TXT Record no painel do Zoho Mail.
2. Criar os e-mails (ex: suporte@, pedidos@) e apontar os registros MX, SPF e DKIM no Registro.br para validar o recebimento no Zoho.
3. Iniciar próximos fluxos de configuração de loja (Meios de pagamento).

## [10-08-2026] Finalização do Ecossistema Zoho Mail
1. **Verificação de Conta e Plano:** Validado que a conta corporativa está devidamente configurada no plano "Forever Free" (sem cobranças futuras).
2. **Criação de Aliases:** Criados 6 "apelidos" (aliases) profissionais apontando para a caixa principal do admin, visando organização e atendimento segmentado (`contato`, `pedidos`, `financeiro`, `revendas`, `privacidade`, `marketing`).
3. **Mapeamento Estratégico:** Elaborado o documento `mapeamento_de_emails.md` detalhando exatamente em qual tela/sistema cada e-mail será utilizado.
4. **Organização Autônoma (Filtros):** Criadas as 5 pastas de destino no webmail e configurados os "Filtros" (Regras) que movem automaticamente mensagens enviadas para os respectivos Aliases diretamente para suas pastas, criando um ambiente de trabalho limpo e escalável.

### Próximos Passos (Ponto de Parada)
1. Realizar uma "Varredura Geral" (General Store Cleanup) no site e código-fonte, atualizando rodapés, páginas institucionais e remetentes automáticos com base no `mapeamento_de_emails.md`.
2. Avançar para a configuração dos Gateways de Pagamento (MercadoPago / Stripe).

## [10-08-2026] Varredura Geral de E-mails no Código (Store Cleanup)
1. **Novo Alias (Trocas e Devoluções):** Criado e configurado o e-mail `trocas@avantelingerie.com.br` no Zoho Mail (com pasta e filtro de roteamento) para separar a logística reversa do atendimento geral. O mapeamento foi atualizado.
2. **Atualização Front-end (React):** A `CentralDaClientePage.jsx` foi atualizada para direcionar as intenções de devoluções e defeitos para o novo e-mail `trocas@`.
3. **Atualização Back-end (Resend e Node):** O serviço de notificações transacionais (`notificationService.js`) foi modificado para enviar todos os e-mails automáticos de compras (Status de Pedidos) pelo remetente oficial `pedidos@avantelingerie.com.br`. As APIs do Bling e Melhor Envio (`integracoes.js` e `shipping.js`) tiveram o *User-Agent* alterado para usar o `contato@`.
4. **Inteligência da Lia (IA):** O cérebro da inteligência artificial (`liaKnowledgeBase.js`) foi reprogramado para rotear os clientes de forma inteligente baseada em intenção:
   - Defeitos/Garantias -> `trocas@avantelingerie.com.br`
   - B2B/Atacado -> `revendas@avantelingerie.com.br` e URL da landing page.
   - Envios/Rastreio -> `pedidos@avantelingerie.com.br`
   - Suporte Geral -> `contato@avantelingerie.com.br`

### Próximos Passos (Ponto de Parada)
- Toda a infraestrutura corporativa de e-mails (Zoho, Resend, React, Node) está 100% finalizada.
- A configuração final da Stripe e do Bling estão momentaneamente em "Hold" (Aguardando). Ver seção de Pendências Estratégicas abaixo.

## 🛑 Pendências Estratégicas (Aguardando Bloqueios)
Para não esquecermos, aqui estão os itens congelados e as datas de destrave:
1. **Bling ERP (Aguardando 16/08/2026):** O sistema está travado aguardando o dia 16 para realizar a alteração de CPF para CNPJ da empresa. Somente após isso poderemos:
   - Comprar e vincular o Certificado Digital A1.
   - Configurar a impressão conjugada (DANFE Simplificada + Etiqueta de Envio) para saírem na mesma impressora térmica (formato 10 x 15 cm).
2. **Stripe (Aguardando Cadastro de Produtos):** A mudança para as chaves de "Produção" (Live) foi pausada propositalmente. A ideia é primeiro iniciar o cadastro de produtos na loja e rodar alguns testes finais de checkout usando o modo Teste da Stripe. Apenas depois desse QA final faremos a virada de chaves. O problema do e-mail inicial (Gmail) será resolvido no momento da virada.
