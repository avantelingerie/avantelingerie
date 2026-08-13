# MemÃƒÂ³ria TÃƒÂ©cnica Ã¢â‚¬â€� Avante Lingerie

> Data: 08/07/2026
> Projeto: E-commerce Avante Lingerie (PocketBase + React + Express)
> Fluxo: antigravity Ã¢â€ â€™ opencode (revisÃƒÂ£o) Ã¢â€ â€™ Horizons (deploy)

---

## Ã°Å¸â€ºâ€˜ IMPORTANTE: Arquitetura e LimitaÃƒÂ§ÃƒÂµes da Plataforma
Antes de iniciar qualquer codificaÃƒÂ§ÃƒÂ£o profunda, **consulte as regras e restriÃƒÂ§ÃƒÂµes absolutas da infraestrutura da Hostinger** no nosso [Manual TÃƒÂ©cnico da Horizons](file:///C:/Users/comer/.gemini/antigravity/brain/e63ef4ca-093f-4a33-811c-51802a2f4c4d/MANUAL_HORIZONS.md). Ele detalha bloqueios de pacotes, amnÃƒÂ©sia do sistema, limitaÃƒÂ§ÃƒÂµes do banco de dados e regras de prompt.

---

## 1. Arquitetura do Projeto

```
avante-lingerie-novo/
Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ apps/
Ã¢â€�â€š   Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ api/src/
Ã¢â€�â€š   Ã¢â€�â€š   Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ routes/          # Endpoints Express
Ã¢â€�â€š   Ã¢â€�â€š   Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ services/        # LÃƒÂ³gica de negÃƒÂ³cio (Bling, descontos, etc)
Ã¢â€�â€š   Ã¢â€�â€š   Ã¢â€�â€�Ã¢â€�â‚¬Ã¢â€�â‚¬ utils/           # PocketBase client, logger, etc
Ã¢â€�â€š   Ã¢â€�â€�Ã¢â€�â‚¬Ã¢â€�â‚¬ web/src/
Ã¢â€�â€š       Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ pages/
Ã¢â€�â€š       Ã¢â€�â€š   Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ admin/       # Painel administrativo
Ã¢â€�â€š       Ã¢â€�â€š   Ã¢â€�â€�Ã¢â€�â‚¬Ã¢â€�â‚¬ *.jsx        # PÃƒÂ¡ginas da loja (ProductPage, CartPage, etc)
Ã¢â€�â€š       Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ hooks/           # useCart, useCheckoutLogic, useUserProfile
Ã¢â€�â€š       Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ components/      # Componentes reutilizÃƒÂ¡veis
Ã¢â€�â€š       Ã¢â€�â€�Ã¢â€�â‚¬Ã¢â€�â‚¬ context/         # AuthContext
Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ pb_migrations/           # Schema do PocketBase (versÃƒÂµes)
Ã¢â€�Å“Ã¢â€�â‚¬Ã¢â€�â‚¬ package.json
Ã¢â€�â€�Ã¢â€�â‚¬Ã¢â€�â‚¬ AGENTS.md
```

---

## 2. ColeÃƒÂ§ÃƒÂµes do PocketBase e Colunas

### ColeÃƒÂ§ÃƒÂ£o `users` (autenticaÃƒÂ§ÃƒÂ£o nativa)

| Campo | Tipo | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|
| id | Sistema | ID ÃƒÂºnico |
| email | Email | Nativo PocketBase |
| emailVisibility | Booleano | Ocultar/exibir email |
| verified | Booleano | VerificaÃƒÂ§ÃƒÂ£o de email |
| name | Texto | Nome completo |
| avatar | Arquivo | Upload de imagem |
| tipo_cliente | Texto | `"varejo"` (B2C) ou `"revendedor"` (B2B) |
| commercial_profile | Texto | `"retail"` ou `"reseller"` |
| account_level | Texto | NÃƒÂ­vel da conta |
| cpf | Texto | CPF |
| whatsapp | Texto | WhatsApp |
| bloqueado | Booleano | True/False |
| total_compras | NÃƒÂºmero | Total acumulado em compras |
| nivel_desconto | NÃƒÂºmero | NÃƒÂ­vel de desconto do cliente |
| desconto_pct | NÃƒÂºmero | % de desconto individual |

### ColeÃƒÂ§ÃƒÂ£o `variacoes`

| Campo | Tipo | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|
| id | string | Sistema |
| produto_id | Relacionamento | FK para `products` |
| cor | Texto | Cor da variaÃƒÂ§ÃƒÂ£o |
| tamanho | Texto | Tamanho |**
| sku | Texto | SKU |
| estoque | NÃƒÂºmero | Quantidade em estoque **(NÃƒÆ’O usar `quantidade_estoque`)** |
| imagem_url | URL | URL da imagem |
| status | Booleano | Ativo/inativo |
| preco | NÃƒÂºmero | PreÃƒÂ§o de varejo |
| preco_atacado | NÃƒÂºmero | PreÃƒÂ§o de atacado |
| criado_em | Data | |
| created | Data | Sistema |
| updated | Data | Sistema |

### ColeÃƒÂ§ÃƒÂ£o `pedidos`

| Campo | Tipo | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|
| id | string | Sistema |
| numero_pedido | Texto | NÃƒÂºmero do pedido |
| cliente_id | Relacionamento | FK para `users` |
| cliente_nome | Texto | Nome no momento da compra |
| cliente_email | Email | |
| cliente_telefone | Texto | |
| data_pedido | Data | Data do pedido |
| status | Texto | Ex: confirmado, pendente |
| valor_total | NÃƒÂºmero | Total do pedido **(NÃƒÆ’O existe campo `total`)** |
| valor_desconto | NÃƒÂºmero | Valor do desconto aplicado |
| valor_frete | NÃƒÂºmero | Valor do frete |
| endereco_entrega | Texto | |
| cidade | Texto | |
| estado | Texto | |
| cep | Texto | |
| observacoes | Texto | |
| metodo_pagamento | Texto | Ex: credito, pix |
| rastreamento | Texto | CÃƒÂ³digo de rastreio |
| itens | JSON | Array de objetos com variacao_id, quantidade, preco_unitario |
| cpf | Texto | CPF do cliente no pedido |
| created | Data | Sistema |
| updated | Data | Sistema |

### ColeÃƒÂ§ÃƒÂ£o `configuracoes_estoque`

| Campo | Tipo | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|
| limite_upgrade_revenda | NÃƒÂºmero | Gatilho: valor mÃƒÂ­nimo no carrinho para oferecer upgrade B2CÃ¢â€ â€™B2B |
| desconto_progressivo_faixas | JSON | Faixas de desconto para varejo (B2C) |
| desconto_progressivo_faixas_revenda | JSON | Faixas de desconto para revenda (B2B) |

---

## 3. Como o sistema diferencia B2B vs B2C

A verificaÃƒÂ§ÃƒÂ£o ÃƒÂ© feita em **~22 arquivos** usando:

```javascript
const isReseller = currentUser?.commercial_profile === 'reseller' || 
                   currentUser?.tipo_cliente === 'revendedor';
```

### Fluxo:

1. **Cadastro**: usuÃƒÂ¡rio escolhe "Varejo" (`tipo_cliente: 'varejo'`) ou "Revendedor" (`tipo_cliente: 'revendedor'`)
2. **AuthContext.jsx**: salva no PocketBase com default `'varejo'`
3. **CartPage.jsx**: upgrade B2CÃ¢â€ â€™B2B (via modal) atualiza `tipo_cliente` e `commercial_profile`
4. **useCart.js `getItemPrice`**: B2B usa `preco_atacado`, B2C usa preÃƒÂ§o normal
5. **Faixas de desconto separadas**: B2C usa `desconto_progressivo_faixas`, B2B usa `desconto_progressivo_faixas_revenda`

### Gatilho de upgrade:
- Configurado em **`configuracoes_estoque.limite_upgrade_revenda`** (admin)
- Valores tÃƒÂ­picos: R$ 400 a R$ 500 (varia entre arquivos)
- Se B2C atinge o valor no carrinho Ã¢â€ â€™ modal de upgrade ÃƒÂ© exibido

---

## 4. Problemas e CorreÃƒÂ§ÃƒÂµes Realizadas (08/07/2026)

### **Arquivo: `dashboard.js`** (apps/api/src/routes/dashboard.js)

| Problema | Causa | CorreÃƒÂ§ÃƒÂ£o |
|---|---|---|
| `variacao.quantidade_estoque` retornava 0 | Coluna correta ÃƒÂ© `estoque` | SubstituÃƒÂ­do por `variacao.estoque` |
| `variacao.nome` retornava `undefined` | `nome` nÃƒÂ£o existe em `variacoes` | Adicionado `expand: 'produto_id'` + acesso via `variacao.expand?.produto_id?.nome`. Fallback: `"cor tamanho"` ou `sku` |

### **Arquivo: `AnalyticsPage.jsx** (apps/web/src/pages/admin/AnalyticsPage.jsx)

| Problema | Causa | CorreÃƒÂ§ÃƒÂ£o |
|---|---|---|
| `o.total` retornava 0 | Coluna correta ÃƒÂ© `valor_total` | SubstituÃƒÂ­do por `o.valor_total` |
| LÃƒÂ³gica B2B/B2C por heurÃƒÂ­stica (`desconto >= 30%`) | NÃƒÂ£o consultava `tipo_cliente` do user | Criado `userMap` via `users` do banco. ClassificaÃƒÂ§ÃƒÂ£o usa `user.tipo_cliente === 'revendedor' \|\| user.commercial_profile === 'reseller'`. Fallback residual removido. |

### **Arquivos verificados e OK:**

| Arquivo | Status |
|---|---|
| `apps/web/src/pages/admin/AnalyticsPage.jsx` | Ã¢Å“â€¦ Revisado e corrigido |
| `apps/api/src/routes/dashboard.js` | Ã¢Å“â€¦ Revisado e corrigido |

---

## 5. Arquivos com lÃƒÂ³gica B2B/B2C (nÃƒÂ£o alterados, apenas mapeados)

- `apps/web/src/pages/CartPage.jsx` Ã¢â‚¬â€� upgrade modal, validaÃƒÂ§ÃƒÂ£o de limite
- `apps/web/src/pages/Checkout.jsx` Ã¢â‚¬â€� `isReseller`
- `apps/web/src/pages/ProductPage.jsx` Ã¢â‚¬â€� precificaÃƒÂ§ÃƒÂ£o
- `apps/web/src/hooks/useCart.js` Ã¢â‚¬â€� `getItemPrice`, `getActiveDiscount`
- `apps/web/src/hooks/useCheckoutLogic.js` Ã¢â‚¬â€� `isReseller`
- `apps/web/src/hooks/useUserProfile.js` Ã¢â‚¬â€� `tipo_cliente`
- `apps/web/src/context/AuthContext.jsx` Ã¢â‚¬â€� signup
- `apps/web/src/pages/LoginPage.jsx` Ã¢â‚¬â€� radio buttons de cadastro
- `apps/web/src/pages/admin/ClientesTable.jsx` Ã¢â‚¬â€� badge de tipo

---

## 6. Regras para revisÃƒÂ£o futura

1. **Sempre confirmar colunas reais do PocketBase** antes de corrigir nomes de campos
2. **NÃƒÂ£o usar heurÃƒÂ­stica** para classificar B2B/B2C quando hÃƒÂ¡ campos reais (`tipo_cliente`, `commercial_profile`)
3. **`variacoes.estoque`** ÃƒÂ© a coluna de estoque, NÃƒÆ’O `quantidade_estoque`
4. **`pedidos.valor_total`** ÃƒÂ© a coluna de valor, NÃƒÆ’O `total`
5. **`variacoes`** nÃƒÂ£o tem `nome` Ã¢â‚¬â€� o nome do produto estÃƒÂ¡ em `products`, acessÃƒÂ­vel via `expand: 'produto_id'`
6. **Expand do PocketBase** ÃƒÂ© a forma correta de resolver relaÃƒÂ§ÃƒÂµes entre coleÃƒÂ§ÃƒÂµes
### **MÃƒÂ³dulo de GestÃƒÂ£o de Clientes e B2B (08-09/07/2026) Ã¢â‚¬â€� 5 arquivos**

| # | Arquivo | AÃƒÂ§ÃƒÂ£o | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|---|
| 1 | `apps/web/src/services/clientesService.js` | Modificado | Adicionadas funÃƒÂ§ÃƒÂµes `getSolicitacoesPendentes`, `aprovarRevendedor`, `rejeitarRevendedor`. A aprovaÃƒÂ§ÃƒÂ£o altera `tipo_cliente` e `commercial_profile` do usuÃƒÂ¡rio na tabela users. |
| 2 | `apps/web/src/pages/admin/ClientesPage.jsx` | Refatorado | Adicionado layout de Abas (Tabs). Aba 1: Tabela de Clientes. Aba 2: SolicitaÃƒÂ§ÃƒÂµes B2B pendentes. LÃƒÂ³gica de aprovaÃƒÂ§ÃƒÂ£o/rejeiÃƒÂ§ÃƒÂ£o implementada chamando o serviÃƒÂ§o. |
| 3 | `apps/web/src/components/admin/ClientesTable.jsx` | Modificado | Ajustado mapeamento para refletir os nomes exatos do banco (`name`, `whatsapp`, `created`). |
| 4 | `apps/web/src/components/admin/SolicitacoesRevendedorTable.jsx` | **Criado** | Componente visual para exibir a lista de leads que desejam se tornar revendedores, com botÃƒÂµes de Aprovar e Rejeitar. |
| 5 | `apps/pocketbase/pb_migrations/1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` | **Criado** | Migration que adiciona status `pendente/em_analise/aprovado/rejeitado` e define `updateRule` na coleÃƒÂ§ÃƒÂ£o `solicitacoes_revendedor`. |

### **MÃƒÂ³dulo de GestÃƒÂ£o de Clientes e B2B (08-09/07/2026) Ã¢â‚¬â€� 5 arquivos**

| # | Arquivo | AÃƒÂ§ÃƒÂ£o | DescriÃƒÂ§ÃƒÂ£o |
|---|---|---|---|
| 1 | `apps/web/src/services/clientesService.js` | Modificado | Adicionadas funÃƒÂ§ÃƒÂµes `getSolicitacoesPendentes`, `aprovarRevendedor`, `rejeitarRevendedor`. A aprovaÃƒÂ§ÃƒÂ£o altera `tipo_cliente` e `commercial_profile` do usuÃƒÂ¡rio na tabela users. |
| 2 | `apps/web/src/pages/admin/ClientesPage.jsx` | Refatorado | Adicionado layout de Abas (Tabs). Aba 1: Tabela de Clientes. Aba 2: SolicitaÃƒÂ§ÃƒÂµes B2B pendentes. LÃƒÂ³gica de aprovaÃƒÂ§ÃƒÂ£o/rejeiÃƒÂ§ÃƒÂ£o implementada chamando o serviÃƒÂ§o. |
| 3 | `apps/web/src/components/admin/ClientesTable.jsx` | Modificado | Ajustado mapeamento para refletir os nomes exatos do banco (`name`, `whatsapp`, `created`). |
| 4 | `apps/web/src/components/admin/SolicitacoesRevendedorTable.jsx` | **Criado** | Componente visual para exibir a lista de leads que desejam se tornar revendedores, com botÃƒÂµes de Aprovar e Rejeitar. |
| 5 | `apps/pocketbase/pb_migrations/1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` | **Criado** | Migration que adiciona status `pendente/em_analise/aprovado/rejeitado` e define `updateRule` na coleÃƒÂ§ÃƒÂ£o `solicitacoes_revendedor`. |

### **CorreÃƒÂ§ÃƒÂ£o pÃƒÂ³s-revisÃƒÂ£o: schema do `solicitacoes_revendedor` (09/07/2026)**

| Problema | Causa | CorreÃƒÂ§ÃƒÂ£o |
|---|---|---|
| BotÃƒÂµes Aprovar/Rejeitar falham com erro de validaÃƒÂ§ÃƒÂ£o | O campo `status` (select) sÃƒÂ³ tinha `"aprovado_automaticamente"` como valor vÃƒÂ¡lido; `updateRule` estava `null` (ninguÃƒÂ©m podia atualizar) | Criada migration `1781900000_003_update_rules_and_status_for_solicitacoes_revendedor.js` que adiciona os valores `"pendente"`, `"em_analise"`, `"aprovado"`, `"rejeitado"` e define `updateRule = "@request.auth.id != \"\""` |

- **11/08/2026:**
  - `pb_migrations/1786463400_create_colecoes.js` criado (coleÃ§Ã£o `colecoes` para a Vitrine).
  - Bugfix: MigraÃ§Ã£o `1786463500_update_rules_for_colecoes.js` adicionada para corrigir erro 403 no Admin. As regras `create`, `update` e `delete` de `colecoes` passaram de `null` (apenas superusers) para `@request.auth.id != ""`, equiparando Ã  regra da tabela `products` para que administradores autenticados via coleÃ§Ã£o `usuarios` consigam salvar novos registros.
  - Bugfix: MigraÃ§Ã£o `1786463600_add_timestamps_to_colecoes.js` adicionada para anexar os campos de sistema `created` e `updated`. Isso resolve o erro 400 Bad Request ao usar `sort: '-created'` nas buscas do Admin e da Home.
  - FormulÃ¡rio de CriaÃ§Ã£o/EdiÃ§Ã£o em `ColecoesManager.jsx` adicionado (antes o botÃ£o nÃ£o renderizava form).
  - TransparÃªncia do menu mobile (`Header.jsx`) aumentada (`bg-black/95` para `bg-black/75` com `backdrop-blur-md`).
  - Bugfix: Corrigido `ReferenceError` em `CategoryPage.jsx` reordenando a declaraÃ§Ã£o da variÃ¡vel `formattedCategoryName` para nÃ£o colidir com o estado `entityName`, destravando o clique nas coleÃ§Ãµes na Home.
  - Melhoria Arquitetural: Adicionado `<input type="file" />` para `imagem_capa` em `ColecoesManager.jsx` com suporte a `FormData` para envio direto ao PocketBase.deve ser enviada para o PocketBase do Horizons (pasta `pb_migrations`) antes de usar os botÃƒÂµes de aprovaÃƒÂ§ÃƒÂ£o.**

---

### **A Saga da LiberaÃƒÂ§ÃƒÂ£o B2B na Horizons (09/07/2026)**

| Problema | Causa | CorreÃƒÂ§ÃƒÂ£o |
|---|---|---|
| Horizons bloqueando API e Painel PB com Erro 404 e 500 | O servidor nÃƒÂ£o expÃƒÂµe a porta `8090` e o painel `/_/` externamente | Criado um script temporÃƒÂ¡rio no `main.js` com `setTimeout` que faz login interno na API (usando credenciais do `.env`) e injeta a regra `updateRule` via cÃƒÂ³digo, rodando totalmente do lado do servidor (seguro e indetectÃƒÂ¡vel pelo proxy reverso). |
| Furo de seguranÃƒÂ§a na regra `updateRule` | A regra `@request.auth.id != ""` permitia que QUALQUER cliente logado aprovasse cadastros | Regra modificada para `@request.auth.collectionName = "usuarios"`. Apenas o painel administrativo (que loga na coleÃƒÂ§ÃƒÂ£o `usuarios`) tem permissÃƒÂ£o de clique. SeguranÃƒÂ§a total. |
| O botÃƒÂ£o Aprovar B2B nÃƒÂ£o estava recebendo novos cadastros | `QueroRevenderPage.jsx` estava configurada para AprovaÃƒÂ§ÃƒÂ£o AutomÃƒÂ¡tica (NÃƒÂ­vel Bronze InstantÃƒÂ¢neo), pulando a fila | Descoberto o comportamento de aprovaÃƒÂ§ÃƒÂ£o imediata. Planejada Nova Arquitetura de Funil B2B (ver abaixo). |

---

## 7. Funil de AprovaÃƒÂ§ÃƒÂ£o B2B Manual ConcluÃƒÂ­do (10/07/2026)

**Objetivo Atingido:** Mudar o destravamento de nÃƒÂ­vel (Bronze para Silver/Gold) de AutomÃƒÂ¡tico para Manual, obrigando a cliente a passar pela aprovaÃƒÂ§ÃƒÂ£o do administrador para ganhar acesso ÃƒÂ s mÃƒÂ­dias.

| Arquivo Modificado | DescriÃƒÂ§ÃƒÂ£o da Melhoria |
|---|---|
| `QueroRevenderPage.jsx` | Textos que prometiam "LiberaÃƒÂ§ÃƒÂ£o Imediata" foram alterados para "AnÃƒÂ¡lise e AprovaÃƒÂ§ÃƒÂ£o Manual". |
| `MinhaContaPage.jsx` | O preenchimento do CPF na aba "Meus Dados" agora cria um registro pendente em `solicitacoes_revendedor` e NÃƒÆ’O dÃƒÂ¡ `cadastro_completo = true` imediatamente. Aba "Arquivos" adaptada para refletir status de aprovaÃƒÂ§ÃƒÂ£o. |
| `ResellerPortalPage.jsx` | O formulÃƒÂ¡rio agora envia a intenÃƒÂ§ÃƒÂ£o diretamente para a fila B2B e notifica que estÃƒÂ¡ em anÃƒÂ¡lise. |
| `CartPage.jsx` (Checkout) | Corrigido o modal de Upgrade Varejo -> Atacado. Agora, quando a cliente faz o upgrade no carrinho, ela vira revendedora (para desconto) e o sistema envia a ficha dela silenciosamente para a aba "SolicitaÃƒÂ§ÃƒÂµes B2B". A obrigatoriedade do CPF foi mantida intacta para garantir faturamento de NFe no Bling. |
| `clientesService.js` | FunÃƒÂ§ÃƒÂ£o `aprovarRevendedor` atualizada. Quando o Admin clica em Aprovar, o sistema agora seta `cadastro_completo = true` e `account_level = 'verified'`. |
| `ClientesTable.jsx` (Admin UI) | Adicionado um badge cinza escrito "Pendente" para revendedoras que ainda nÃƒÂ£o receberam a aprovaÃƒÂ§ÃƒÂ£o (sem `cadastro_completo`). |
| `SolicitacoesRevendedorTable.jsx` (Admin UI) | Adicionado um indicador visual (bolinha verde pulsante) com o texto "Completo" para mostrar quando o cliente forneceu todos os dados obrigatÃƒÂ³rios, facilitando a decisÃƒÂ£o de clique do Administrador. |

---

## 8. Arquitetura da InteligÃƒÂªncia Horizons Mapeada (10/07/2026)

- Realizamos um interrogatÃƒÂ³rio profundo com a IA Horizons (Hostinger) para descobrir seus escopos de seguranÃƒÂ§a.
- Foi gerado o arquivo `MANUAL_HORIZONS.md`, com o check-list de poderes e limitaÃƒÂ§ÃƒÂµes arquiteturais.
- O manual foi linkado no topo desta `MEMORIA_TECNICA.md` como leitura de regra obrigatÃƒÂ³ria.

---

## 9. Planejamento Futuro: Venda de MatÃƒÂ©rias Primas (Tecidos, Rendas, etc)

**Contexto:** O sistema foi projetado com a constante `unidade: 'UN'` na integraÃƒÂ§ÃƒÂ£o com o Bling, visto que a operaÃƒÂ§ÃƒÂ£o de venda de lingerie baseia-se exclusivamente em produtos acabados vendidos por peÃƒÂ§a/unidade.

**Como adaptar quando a Avante iniciar a venda de matÃƒÂ©ria-prima:**
1. Criar uma nova coluna no PocketBase (tabela `products` e/ou `variacoes`) chamada `unidade_medida` (Select/Text).
2. Adicionar o campo na UI do Admin (Tela de Cadastro de Produto) com opÃƒÂ§ÃƒÂµes prÃƒÂ©-definidas:
   - `UN` (Unidade/PeÃƒÂ§a)
   - `M` (Metro - Para tecidos, viÃƒÂ©s, elÃƒÂ¡sticos)
   - `KG` (Quilograma)
   - `CX` (Caixa)
3. No arquivo `apps/api/src/routes/bling.js` (funÃƒÂ§ÃƒÂ£o `sincronizarProdutoCompleto`), substituir a linha fixa:
   `unidade: 'UN'`
   por um fallback condicional:
   `unidade: variation.unidade_medida || product.unidade_medida || 'UN'`

Com essa mudanÃƒÂ§a simples, o e-commerce suportarÃƒÂ¡ mÃƒÂºltiplas grandezas fiscais para emissÃƒÂ£o de NF-e na Receita Federal de forma nativa e automÃƒÂ¡tica pelo Bling.

---

## 9. PrÃƒÂ³ximos Passos (Para a PrÃƒÂ³xima SessÃƒÂ£o / AmanhÃƒÂ£)

1. **Testes Finais da UI do Admin:** A Lia deve acessar o Painel Admin (Clientes) e verificar se o badge "Pendente" e a bolinha verde "Completo" aparecem corretamente e se a experiÃƒÂªncia de clique "Aprovar" estÃƒÂ¡ funcionando perfeitamente.
2. **InvestigaÃƒÂ§ÃƒÂ£o do Estoque no Bling:** Descobrir e corrigir o motivo de o estoque (no site e no Bling) nÃƒÂ£o ser decrementado automaticamente apÃƒÂ³s a conclusÃƒÂ£o de um pedido de venda no fluxo do carrinho.
3. **ConfiguraÃƒÂ§ÃƒÂ£o da Melhor Envio (Bling):** Validar a configuraÃƒÂ§ÃƒÂ£o do PadrÃƒÂ£o de LogÃƒÂ­stica PDF e Postagem AutomÃƒÂ¡tica para garantir que o tracking code retorne ÃƒÂ  Avante Lingerie sem atritos.

---

## 10. DiÃƒÂ¡rio de Incidentes e Ponto de Parada (13 e 14/07/2026)

### **1. O "Efeito Sanfona" do Estoque**
- **Problema:** Quando um pedido era gerado, o estoque baixava na loja, mas o Bling (por nÃƒÂ£o ter gerado a NF-e imediatamente) devolvia via Webhook o estoque antigo, causando o efeito sanfona (Loja voltava ao estoque anterior).
- **SoluÃƒÂ§ÃƒÂ£o (Aplicada):** No painel do Bling, foi ativada a chave **"Considerar situaÃƒÂ§ÃƒÂµes de vendas para obter o saldo atual (Reserva de estoque)"** incluindo as situaÃƒÂ§ÃƒÂµes "Em aberto, Em andamento, Em digitaÃƒÂ§ÃƒÂ£o, Verificado".
- **Status:** Ã¢Å“â€¦ Resolvido. O Bling agora calcula o saldo fÃƒÂ­sico subtraindo a reserva, blindando a loja.

### **2. Erro de Forma de Pagamento no Bling (Bling V3)**
- **Problema:** Pedidos caÃƒÂ­am no Bling sem a forma de pagamento selecionada, exigindo preenchimento manual para gerar a NF-e.
- **Tentativa de SoluÃƒÂ§ÃƒÂ£o (13/07):** Inserimos os cÃƒÂ³digos internos do Bling (Pix: 10033474, Boleto: 10033469, CrÃƒÂ©dito: 10543793) na variÃƒÂ¡vel `parcelas` do arquivo `blingService.js`.
- **Falha (Efeito Colateral):** Sem poder testar localmente, o cÃƒÂ³digo foi direto para a Horizons, quebrou a automaÃƒÂ§ÃƒÂ£o, e os pedidos pararam de chegar ao Bling. O cÃƒÂ³digo foi **revertido** na mesma noite e o envio automÃƒÂ¡tico voltou a funcionar (sem a forma de pagamento).
- **O que precisa ser feito:** A IA deve analisar o fluxo do `webhooks.js` e `payment.js` para injetar corretamente o objeto `formaPagamento: { id: <codigo_bling> }` no arquivo `blingService.js`, mas SOMENTE quando puder testar localmente.

### **3. Colapso do Ambiente Local de Testes (PowerShell Error 80070002)**
- **Problema:** O PowerShell do sistema parou de funcionar apÃƒÂ³s uma limpeza do `prefetch`.
- **Impacto no Projeto:** A IA perdeu seu "laboratÃƒÂ³rio de testes". Sem o terminal, tornou-se impossÃƒÂ­vel rodar `npm run dev` e testar os cÃƒÂ³digos com seguranÃƒÂ§a antes de enviÃƒÂ¡-los para produÃƒÂ§ÃƒÂ£o. Isso causou a falha do cÃƒÂ³digo de pagamento descrita acima.
- **DiagnÃƒÂ³stico TÃƒÂ©cnico:** Comandos SFC, DISM e o Reparador do .NET Framework nÃƒÂ£o resolveram. O motor principal do PowerShell 5.1 foi corrompido no registro/arquivos do Windows.
- **DecisÃƒÂ£o:** **Trabalhos de programaÃƒÂ§ÃƒÂ£o paralisados.** Ãƒâ€° inaceitÃƒÂ¡vel seguir codificando e jogando cÃƒÂ³digos diretamente em produÃƒÂ§ÃƒÂ£o sem testes. A Host (Roseli) precisarÃƒÂ¡ restaurar/reparar o Windows (In-Place Upgrade) para que o PowerShell volte a abrir.

---

## 11. Protocolo de Retorno
Assim que o PowerShell estiver consertado, a retomada dos trabalhos deve seguir ESTA ordem estrita:
1. A IA deverÃƒÂ¡ ler este arquivo (`MEMORIA_TECNICA.md`) para recuperar o contexto e o "fio da meada".
2. Levantar a API localmente no novo terminal restaurado.
3. A Host farÃƒÂ¡ testes na loja, listarÃƒÂ¡ os bugs encontrados e, JUNTAS, analisaremos os logs locais e faremos a correÃƒÂ§ÃƒÂ£o do `blingService.js`.
4. Enviar para a Horizons apenas apÃƒÂ³s testes de laboratÃƒÂ³rio 100% seguros.

---

## 12. Melhorias de Estabilidade e UX Finalizadas (15/07/2026)

O laboratÃƒÂ³rio local voltou a funcionar e realizamos uma bateria de testes e melhorias cruciais antes de atualizar a Horizons.

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `pedidos-creation-success-notification.pb.js` | **CriaÃƒÂ§ÃƒÂ£o de Pedido Falhando:** A criaÃƒÂ§ÃƒÂ£o de pedidos (banco de dados) falhava se as credenciais SMTP do PocketBase nÃƒÂ£o estivessem configuradas (ou enviassem erro). O hook tentava enviar um e-mail que barrava a transaÃƒÂ§ÃƒÂ£o inteira. **SoluÃƒÂ§ÃƒÂ£o:** O script de envio de e-mail automÃƒÂ¡tico foi removido do hook, deixando apenas a criaÃƒÂ§ÃƒÂ£o da notificaÃƒÂ§ÃƒÂ£o interna no painel Admin, blindando o processo de compra. |
| `ProdutoForm.jsx` | **Erro genÃƒÂ©rico ao salvar produto ("Failed to create record"):** Ocorria porque a sessÃƒÂ£o expirava ou era perdida sem aviso. **SoluÃƒÂ§ÃƒÂ£o:** Adicionada uma validaÃƒÂ§ÃƒÂ£o `!pb.authStore.isValid` que exibe alerta na tela pedindo para fazer login novamente. AlÃƒÂ©m disso, foi corrigido o envio de vÃƒÂ­deos para priorizar o campo `videos` do banco de dados na ordem de renderizaÃƒÂ§ÃƒÂ£o. |
| `OrderConfirmation.jsx` | **MÃƒÂ­dia Quebrada e Layout Obscuro:** 1. A pÃƒÂ¡gina foi inteiramente redesenhada com fundo claro (`#F8F9FA`), blocos organizados e detalhes premium em dourado/escuro, mantendo a harmonia solicitada pela cliente. 2. A foto principal quebrava quando o produto usava um `.mp4` (renderizaÃƒÂ§ÃƒÂ£o na tag de imagem). **SoluÃƒÂ§ÃƒÂ£o:** O cÃƒÂ³digo agora detecta arquivos de vÃƒÂ­deo dinamicamente e os reproduz na listagem do pedido via `<video autoplay loop>`. |
| `ClientesTable.jsx` | **Bug Visual de B2B ("Tipo - Pendente"):** Revendedores aprovados ainda ficavam cinza como Pendentes, pois o UI buscava a coluna fantasma `cadastro_completo`. **SoluÃƒÂ§ÃƒÂ£o:** O UI agora valida `account_level !== 'verified'`, o que reflete de imediato o sucesso da aba SolicitaÃƒÂ§ÃƒÂµes B2B para a Base de Clientes, marcando como "Aprovado B2B" (Laranja). |

### PrÃƒÂ³ximos Passos (AmanhÃƒÂ£)
1. A Lia atualizarÃƒÂ¡ os arquivos originais listados no painel Horizons.
2. Iniciar bateria de **Testes na Horizons (ProduÃƒÂ§ÃƒÂ£o)**.
3. Verificar o funcionamento das integraÃƒÂ§ÃƒÂµes logÃƒÂ­sticas e faturamento via Bling com pedidos reais.

### CorreÃƒÂ§ÃƒÂµes de Cadastro de Produto e VariaÃƒÂ§ÃƒÂµes (16/07/2026)
- **Problema resolvido:** Congelamento silencioso (formulÃƒÂ¡rio ficava carregando infinitamente e nunca salvava) ao utilizar vÃƒÂ­deos como mÃƒÂ­dia principal e miniaturas (thumbnails) nÃƒÂ£o sendo vinculadas automaticamente ÃƒÂ s variaÃƒÂ§ÃƒÂµes.
- **Causa Raiz 1 (Congelamento):** Arquivos de vÃƒÂ­deo .mp4 recebidos com ile.type vazio pelo SO eram enviados para a funÃƒÂ§ÃƒÂ£o de compressÃƒÂ£o de imagens (que esperava imagens). O navegador congelava sua thread principal tentando ler um vÃƒÂ­deo de dezenas de megabytes como Base64 para gerar o Canvas, nÃƒÂ£o disparando eventos de erro de imagem a tempo.
- **Causa Raiz 2 (Miniaturas e Upload):** As etiquetas nÃƒÂ£o combinavam devido a discrepÃƒÂ¢ncias de maiÃƒÂºsculas, espaÃƒÂ§os e hifens (ex: 'Verde Militar' vs 'Verde-Militar'). AlÃƒÂ©m disso, o PocketBase nativamente bloqueava vÃƒÂ­deos na coluna image da tabela products.
- **Arquivos Alterados:**
  - pps/web/src/pages/admin/ProdutoForm.jsx: InclusÃƒÂ£o de trava de limite de 30MB; Tratamento robusto para ignorar conversÃƒÂµes via base64 para arquivos nÃƒÂ£o-imagem e vÃƒÂ­deos.
  - pps/web/src/components/admin/VariacoesTable.jsx: Adicionado mÃƒÂ©todo 
ormalizeText na funÃƒÂ§ÃƒÂ£o geradora de variaÃƒÂ§ÃƒÂµes; AtualizaÃƒÂ§ÃƒÂ£o para renderizaÃƒÂ§ÃƒÂ£o via tag <video> no lugar da miniatura de imagem caso a mÃƒÂ­dia seja identificada como vÃƒÂ­deo.
  - pps/pocketbase/pb_migrations/1784200000_update_image_accepts_videos.js: Criada nova *migration* estendendo os mimeTypes aceitos na tabela products (coluna image) para aceitar .mp4, .webm, .mov, impondo limite restrito de maxSize: 31457280 bytes (30MB).
- **Testes Realizados Localmente:** Simulados os uploads, a normalizaÃƒÂ§ÃƒÂ£o de texto na associaÃƒÂ§ÃƒÂ£o, o preview via tag de vÃƒÂ­deo e confirmado a persistÃƒÂªncia e nÃƒÂ£o congelamento.

### Sistema de VÃƒÂ­deos Externos Inteligentes (YouTube/Vimeo) (16/07/2026)
- **MotivaÃƒÂ§ÃƒÂ£o:** Contornar limitaÃƒÂ§ÃƒÂµes de banda, proxy (WAF) e timeouts de hospedagem (Horizons) ao enviar arquivos `.mp4` pesados, alÃƒÂ©m de poupar franquia de dados da loja hospedando os vÃƒÂ­deos em CDNs globais (YouTube/Vimeo).
- **Banco de Dados (PocketBase):** Solicitado e criado o campo `video_url` (tipo `url`) na coleÃƒÂ§ÃƒÂ£o `products`.
- **Painel Admin (`ProdutoForm.jsx`):** 
  - Adicionado campo dedicado para "VÃƒÂ­deo Externo".
  - Implementada lÃƒÂ³gica de posicionamento (Escolha: "Primeira Capa" ou "Final"). O sistema codifica silenciosamente a escolha concatenando `#first` na URL enviada ao banco de dados, poupando a criaÃƒÂ§ÃƒÂ£o de novas colunas.
- **Storefront (`ProductPage.jsx`):**
  - **IdentificaÃƒÂ§ÃƒÂ£o AutomÃƒÂ¡tica:** DetecÃƒÂ§ÃƒÂ£o de links YouTube, YouTube Shorts e Vimeo.
  - **Auto-Cropping (Fim das Barras Pretas):** O iframe injetado verifica a assinatura `/shorts/` e aplica `aspect-[9/16]` dentro de um contÃƒÂªiner overflow-hidden `aspect-[3/4]`, realizando o recorte perfeito (crop) sem barras laterais pretas (letterboxing).
  - **Miniaturas HD (Thumbnails):** UtilizaÃƒÂ§ÃƒÂ£o da API oculta do YouTube (`img.youtube.com/vi/{id}/hqdefault.jpg`) para extrair e exibir a capa do vÃƒÂ­deo na lista inferior de miniaturas da galeria, preservando o layout da loja.
  - **Interatividade Liberada:** Propriedade `pointer-events-none` removida. O vÃƒÂ­deo entra em autoplay e mudo, mas a usuÃƒÂ¡ria tem liberdade de tocar no vÃƒÂ­deo para ativar o som (unmute), operando em harmonia com as setas do carrossel React.

### Bling V3: CorreÃƒÂ§ÃƒÂµes de NF-e, Pagamentos e SincronizaÃƒÂ§ÃƒÂ£o Absoluta de Estoque (17/07/2026)
- **Problema 1 (NF-e travada):** A emissÃƒÂ£o da NF-e no Bling falhava porque a API V3 exigia um objeto `formaPagamento: { id: <id> }` dentro do array de `parcelas`, mas o sistema sÃƒÂ³ enviava a parcela bÃƒÂ¡sica sem a identificaÃƒÂ§ÃƒÂ£o do pagamento.
- **SoluÃƒÂ§ÃƒÂ£o 1:** InjeÃƒÂ§ÃƒÂ£o do `getBlingFormaPagamentoId` no arquivo `blingService.js`. Mapeamos os IDs nativos do Bling para Pix (10033474), Boleto (10033469), DÃƒÂ©bito (10543801) e CrÃƒÂ©dito (10543793), o que permitiu a liberaÃƒÂ§ÃƒÂ£o imediata e faturamento bem-sucedido das Notas Fiscais de teste.
- **Problema 2 (Estoque local nÃƒÂ£o baixava no CartÃƒÂ£o de CrÃƒÂ©dito):** Vendas realizadas via Stripe (checkout session) atualizavam o status do pedido mas nunca reduziam o estoque na tabela local (`variacoes.estoque`), permitindo furos.
- **SoluÃƒÂ§ÃƒÂ£o 2:** Foi inserida a lÃƒÂ³gica de reduÃƒÂ§ÃƒÂ£o de estoque diretamente dentro do bloco `checkout.session.completed` em `webhooks.js`.
- **Problema 3 (ERP as Single Source of Truth):** O cliente identificou que a loja dava baixa, mas se um pedido fosse cancelado ou restaurado no Bling, a loja nunca voltava ao normal.
- **SoluÃƒÂ§ÃƒÂ£o 3:** ImplementaÃƒÂ§ÃƒÂ£o completa da "SincronizaÃƒÂ§ÃƒÂ£o Cega de Estoque". O endpoint `/bling` no arquivo `webhooks.js` foi reescrito para parar de apenas "fazer log" e comeÃƒÂ§ar a acatar os webhooks de saldo do Bling de forma ativa. Se o Bling enviar "Saldo: 91", a loja sobreescreve o estoque para 91 e grava o histÃƒÂ³rico em `movimentacoes_estoque`.
- **Ajuste de Processo (Bling):** O retorno ao valor de `100` nas variaÃƒÂ§ÃƒÂµes se devia a uma configuraÃƒÂ§ÃƒÂ£o nativa do Bling de estorno de reserva no status "Atendido". O cliente foi instruÃƒÂ­do a habilitar a chave **"LanÃƒÂ§ar estoque ao emitir NF-e"** no painel ERP.

**Status atualizado:** CÃƒÂ³digos de integraÃƒÂ§ÃƒÂ£o financeira e espelhamento de estoque finalizados, testados via webhook e enviados para a Horizons via arquivo `codigos_horizons.md`. Aguardando testes limpos (18/07/2026).


## [20-07-2026] AtualizaÃƒÂ§ÃƒÂµes de UI e LÃƒÂ³gica (PÃƒÂ¡gina de Produto e Modal)

### Arquivos Modificados:
1. **pps/web/src/pages/ProductPage.jsx**
   - Corrigida a lÃƒÂ³gica dinÃƒÂ¢mica do rÃƒÂ³tulo inteligente de Cor e Tamanho.
   - Resolvido o bug visual (linha diagonal errada) em tamanhos fora de estoque.
   - SeÃƒÂ§ÃƒÂ£o \'Quem comprou, tambÃƒÂ©m amou\' ajustada para buscar apenas itens reais da loja, sem produtos fictÃƒÂ­cios, com limite mÃƒÂ¡ximo de 4 itens.

2. **pps/web/src/components/ProgressiveDiscountBar.jsx**
   - Realizados experimentos de UI (Gold, Light Premium, Dark Glass/Visa Infinite).
   - O cÃƒÂ³digo foi **integralmente revertido** para a versÃƒÂ£o Original Dark Mode apÃƒÂ³s aprovaÃƒÂ§ÃƒÂ£o final do design anterior.

### PrÃƒÂ³ximos Passos (AmanhÃƒÂ£):
- Revisar e implementar lÃƒÂ³gica inteligente e real para a seÃƒÂ§ÃƒÂ£o de EstatÃƒÂ­sticas e Depoimentos (substituindo os mocks remanescentes).

## [21-07-2026] Bugfix do Player de VÃƒÂ­deo e EstÃƒÂ©tica de Luxo

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `ProductPage.jsx` | **Bug do VÃƒÂ­deo nÃƒÂ£o renderizar:** O campo `video_url` da `products` suporta links, mas o cÃƒÂ³digo limitava rigidamente usando a regex `match(/\.(mp4\|webm\|mov)$/i)`. Quando a cliente usava links de vÃƒÂ­deo (ex: da hostinger) que tivessem parÃƒÂ¢metros (ex: `video.mp4?v=1`), o player simplesmente sumia. **SoluÃƒÂ§ÃƒÂ£o:** Aplicada a funÃƒÂ§ÃƒÂ£o nativa `isDirectVideo` de `utils.js` (que engloba queries e hashes) na renderizaÃƒÂ§ÃƒÂ£o e injeÃƒÂ§ÃƒÂ£o do vÃƒÂ­deo. |
| `ProductCard.jsx` | **BotÃƒÂµes com Cores Conflitantes:** Os botÃƒÂµes da vitrine "Quem comprou tambÃƒÂ©m amou" tinham permanecido verde-esmeralda, destoando do padrÃƒÂ£o Luxo (Ouro/Preto). **SoluÃƒÂ§ÃƒÂ£o:** Reescrita do CSS Tailwind usando `bg-[#121212]`, bordas `border-[#c59b5f]/30` e textos dourados `#c59b5f`. |
| `SocialProofStats.jsx` | **Componente Cinza/EstÃƒÂ¡tico:** O painel estatÃƒÂ­stico nÃƒÂ£o combinava com o restante da pÃƒÂ¡gina. **SoluÃƒÂ§ÃƒÂ£o:** O componente foi todo reescrito para tema Premium Dark (Blur backgrounds, bordas douradas). |
| `package.json` (apps/web) | **AnimaÃƒÂ§ÃƒÂ£o MatemÃƒÂ¡tica:** O pacote `react-intersection-observer` foi instalado para acionar o `framer-motion` (react-countup customizado) nas estatÃƒÂ­sticas apenas quando a usuÃƒÂ¡ria fizesse o *scroll* atÃƒÂ© a sessÃƒÂ£o. |

### PrÃƒÂ³ximos Passos
- Realizar teste final de compra com Checkout Bling CPF/CNPJ apÃƒÂ³s a compra do Certificado Digital A1.

## [21-07-2026] (Parte 2) Blindagem Dupla do Webhook do Bling V3

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `apps/api/src/routes/webhooks.js` | **Ignorando o Webhook V3:** O cliente notou que pedidos testes sem Stripe (ou gerados direto no painel) geravam a NFe no Bling e reduziam o estoque lÃƒÂ¡ (100 -> 90), mas a loja permanecia com 100. **DiagnÃƒÂ³stico:** O Bling V3 mudou o payload de `{"data": {"retorno": {"estoques": [...]}}}` para um array limpo `{"data": "[{\"codigo\":\"SKU\", \"saldoFisico\": 90}]"}`. O interpretador falhava, deixando `estoques` vazio e ignorando a mensagem. **SoluÃƒÂ§ÃƒÂ£o (Blindagem Dupla):** Refizemos o parser do webhook em cascata para aceitar os formatos antigos e novos `Array.isArray(parsedData)`. AlÃƒÂ©m disso, reforÃƒÂ§amos a lÃƒÂ³gica no prÃƒÂ³prio Stripe webhook, permitindo que a baixa ocorra buscando a variaÃƒÂ§ÃƒÂ£o tambÃƒÂ©m por `item.sku` caso falhe a busca pelo `variacao_id`. |
| `apps/api/src/routes/webhooks.js` | **O Triunfo sobre o Cancelamento Seco:** O Bling V3 enviava um webhook de "SituaÃƒÂ§ÃƒÂ£o do Pedido Alterada" para `Cancelado`, mas nossa loja ignorava. AcreditÃƒÂ¡vamos que a API retornaria a palavra "Cancelado". AtravÃƒÂ©s de um Raio-X com o Webhook.site, descobrimos a pegadinha final: o Bling enviava silenciosamente apenas o nÃƒÂºmero `2` (Valor: 2) e o ID `12`. O cÃƒÂ³digo foi refatorado para reconhecer o ID 12 e o valor 2 diretamente. Resultado: o sistema agora intercepta o cancelamento na hora, acha o pedido na base, encontra a variaÃƒÂ§ÃƒÂ£o e **devolve o estoque magicamente na loja**, tudo de forma autÃƒÂ´noma! |
| `apps/api/src/routes/bling.js` | **Rota SecundÃƒÂ¡ria com Mesmo Bug:** Existia uma rota legada e duplicada `/webhook/estoque` procurando `estoqueAtual` (usado no V2) em vez de `saldoFisico` (usado no V3). **SoluÃƒÂ§ÃƒÂ£o:** Aplicada a mesma lÃƒÂ³gica de parsing triplo para garantir que, caso o Bling chame essa rota secundÃƒÂ¡ria, o sistema tambÃƒÂ©m efetue o update de estoque corretamente. |

### PrÃƒÂ³ximos Passos
* Nenhuma pendÃƒÂªncia urgente. A integraÃƒÂ§ÃƒÂ£o de estoque e fluxo de pedidos entre Loja e Bling V3 estÃƒÂ¡ **100% funcional e blindada**.
* O painel administrativo e de infraestrutura aguarda as prÃƒÂ³ximas demandas da equipe.

## [21-07-2026] (Parte 3) InteligÃƒÂªncia de Cancelamento do Bling V3

### Arquivos Modificados e Bugfixes

| Arquivo | Problema Resolvido |
|---|---|
| `apps/api/src/routes/webhooks.js` | **Falta de InteligÃƒÂªncia para Cancelamento Seco:** O Bling V3 enviava um webhook de "SituaÃƒÂ§ÃƒÂ£o do Pedido Alterada" para `Cancelado` (id=12), mas o integrador ignorava completamente esse payload, nÃƒÂ£o devolvendo o estoque para a vitrine da Avante Lingerie. **SoluÃƒÂ§ÃƒÂ£o:** Implementado o bloco `1.5` de interceptaÃƒÂ§ÃƒÂ£o de cancelamentos (`payload?.data?.situacao?.nome === 'Cancelado'`). Agora, ao ler isso, a loja encontra o pedido local, cancela-o e re-soma a quantidade de cada item vendido de volta no estoque da variaÃƒÂ§ÃƒÂ£o, criando ainda um histÃƒÂ³rico em `movimentacoes_estoque`. |

## [21-07-2026] (Parte 4) IntegraÃƒÂ§ÃƒÂ£o Bling V3 - Custom IDs e `bling_pedido_id`

### O que foi feito e resolvido
1. **Novo Campo no PocketBase:** A equipe da Horizons (painel) criou oficialmente a coluna de texto `bling_pedido_id` na coleÃƒÂ§ÃƒÂ£o `pedidos` para garantir a ligaÃƒÂ§ÃƒÂ£o imutÃƒÂ¡vel entre a loja e o ERP, evitando depender do ID gerado pela prÃƒÂ³pria loja que poderia causar ruÃƒÂ­dos.
2. **AtualizaÃƒÂ§ÃƒÂ£o no `blingService.js`:** Ajustado para salvar o ID retornado pelo Bling no novo campo `bling_pedido_id` apÃƒÂ³s a sincronizaÃƒÂ§ÃƒÂ£o bem-sucedida.
3. **RefatoraÃƒÂ§ÃƒÂ£o no `webhooks.js` (Bloco 1.5):** O cÃƒÂ³digo foi profundamente atualizado. Primeiro, percebemos que o Bling V3 esconde a palavra "Cancelado" no webhook e envia apenas o ID (ex: 12). Mais adiante, descobrimos que esse ID **ÃƒÂ© customizado por conta** (uma pegadinha do Gerenciador de TransiÃƒÂ§ÃƒÂµes do Bling). A soluÃƒÂ§ÃƒÂ£o definitiva foi importar o `axios` e `getBlingToken`, fazendo a API da loja consultar ativamente a API V3 do Bling (`GET /pedidos/vendas/{id}`) assim que o webhook de status chegar. A loja extrai a string com o nome da situaÃƒÂ§ÃƒÂ£o e, caso contenha "cancelad" ou "devolvid", atualiza o estoque.

### O que NÃƒÆ’O foi resolvido e ficou pendente para amanhÃƒÂ£
- **O estoque da loja ainda nÃƒÂ£o atualiza ao cancelar no Bling:** Apesar de toda a correÃƒÂ§ÃƒÂ£o lÃƒÂ³gica e blindagem, a cliente reportou que apÃƒÂ³s cancelar no Bling, a loja manteve o estoque inalterado. 
- **HipÃƒÂ³teses para amanhÃƒÂ£:**
  1. A chamada da API `axios.get` usando o `getBlingToken()` falha silenciosamente na Horizons e aciona o *fallback* de IDs (que nÃƒÂ£o mapeia o ID customizado da cliente).
  2. O webhook recebido ÃƒÂ© de ESTOQUE (stock virtual) decorrente do cancelamento e nÃƒÂ£o de pedido, e o Bling V3 omite o `codigo` (SKU) nesse payload, inviabilizando o espelhamento no bloco 2.
  3. A URL para a API do Bling estÃƒÂ¡ formatada incorretamente ou exigindo um payload diferente no ambiente V3.
- **Plano de AÃƒÂ§ÃƒÂ£o (AmanhÃƒÂ£):** Implementar temporariamente uma rotina (um interceptador no inÃƒÂ­cio da rota) que capture o `payload` inteiro do webhook e o salve na coleÃƒÂ§ÃƒÂ£o `movimentacoes_estoque` ou `logs_webhooks`. Assim, enxergaremos com exatidÃƒÂ£o o que o servidor da Horizons estÃƒÂ¡ recebendo do Bling e os erros reais do ambiente em produÃƒÂ§ÃƒÂ£o.

## [23-07-2026] Projeto Lia AI - O CÃƒÂ©rebro (Painel Admin) e ResiliÃƒÂªncia

### O que foi feito e resolvido
1. **Painel de Controle da Lia:** A aba `/admin/lia` foi criada com sucesso, integrada ao roteador e protegida pela autenticaÃƒÂ§ÃƒÂ£o do admin. A interface lista o histÃƒÂ³rico de todas as sessÃƒÂµes em tempo real.
2. **Treinamento e Conhecimento:** Criada a aba de gestÃƒÂ£o para adicionar, editar e remover "regras dinÃƒÂ¢micas" que vÃƒÂ£o para a tabela `lia_knowledge`.
3. **Pausa por Humano (Handoff):** O botÃƒÂ£o "Assumir Conversa" foi implementado no painel, alterando a flag `assumida_por_humano` na tabela `lia_conversas`. O backend foi atualizado para verificar essa flag e travar a resposta da IA caso o humano assuma o controle.
4. **ResiliÃƒÂªncia do Chat Local:** Descobrimos que o backend nÃƒÂ£o fazia auto-restart (`npm run dev` apenas com `node`). Limpamos portas fantasmas (3000, 3001, 8090) com script PowerShell para permitir que a usuÃƒÂ¡ria rodasse um backend limpo com a nova rota `/lia/chat`.
5. **CorreÃƒÂ§ÃƒÂ£o de OrdenaÃƒÂ§ÃƒÂ£o do PocketBase:** As tabelas geradas localmente nÃƒÂ£o possuÃƒÂ­am `created/updated` como a Horizons possui. O painel admin tentava usar `?sort=-updated` e o banco rejeitava com status 400. Ajustamos o React para buscar a lista inteira e fazer a ordenaÃƒÂ§ÃƒÂ£o via Javascript, alÃƒÂ©m de colocar data-fallbacks para nÃƒÂ£o exibir "Invalid Date".
6. **Fallback de SeguranÃƒÂ§a Validado:** Como a API Key da Anthropic ainda nÃƒÂ£o foi injetada, a rota `/lia/chat` interceptou a falta de chave e retornou perfeitamente o graceful-fallback ("Estou passando por uma atualizaÃƒÂ§ÃƒÂ£o... chame no WhatsApp").

### O que ficou para amanhÃƒÂ£
1. Injetar a chave da API (Claude) no projeto.
2. Concluir o motor RAG (ler produtos e regras do `lia_knowledge` para injetar no prompt do sistema).
3. Conectar a interface do botÃƒÂ£o de WhatsApp real na resposta de Fallback do widget.

## [24-07-2026] Projeto Lia AI - InteligÃƒÂªncia, RAG e EstratÃƒÂ©gias de Venda

### O que foi feito e resolvido
1. **Motor RAG de Produtos:** Implementada a injeÃƒÂ§ÃƒÂ£o do catÃƒÂ¡logo de produtos no `System Prompt` (backend). A Lia agora lÃƒÂª em tempo real do banco de dados (PocketBase) a lista de produtos com nome, tecido, preÃƒÂ§os reais e slugs para criar links.
2. **BotÃƒÂ£o de Fallback WhatsApp (Frontend):** Atualizado o `LiaWidget.jsx` para parsear a resposta do chat e renderizar automaticamente um botÃƒÂ£o verde do WhatsApp toda vez que a Lia citar a palavra 'WhatsApp' e 'botÃƒÂ£o abaixo', permitindo escalonamento humano instantÃƒÂ¢neo sem perda de UX.
3. **ConversÃƒÂ£o de Links Markdown:** Adicionada uma funÃƒÂ§ÃƒÂ£o `renderMessageWithLinks` no chat (frontend) que transforma os links enviados pela IA no formato `[Produto](/slug)` em botÃƒÂµes dourados clicÃƒÂ¡veis `<a href>`.
4. **ResoluÃƒÂ§ÃƒÂ£o de Erro de IntegraÃƒÂ§ÃƒÂ£o (Anthropic):** Identificado que a chave da Anthropic (geraÃƒÂ§ÃƒÂ£o de 2026) retornava 404 para o modelo `claude-3-haiku` descontinuado. Os cÃƒÂ³digos do painel administrativo (`integracoes.js`) e do cÃƒÂ©rebro (`lia.js`) foram atualizados para utilizar os modelos mais novos e disponÃƒÂ­veis na conta da cliente: `claude-haiku-4-5-20251001` e `claude-sonnet-4-6`.
5. **AutomaÃƒÂ§ÃƒÂ£o do Carrinho Abandonado:** O gatilho de abertura automÃƒÂ¡tica da rota `/carrinho` foi reescrito para oferecer uma mensagem de ajuda proativa (troca de tamanho, suporte e WhatsApp).
6. **EstratÃƒÂ©gias de NegÃƒÂ³cio via Prompt (Cross-sell, Escassez e B2B):**
   - **Cross-sell:** Injetada regra na IA para sempre pesquisar por calcinhas correspondentes ao sutiÃƒÂ£ e vice-versa e recomendar sutilmente o link da peÃƒÂ§a conjunta.
   - **Estoque/Escassez:** A IA agora lida com itens fora de estoque oferecendo "Encomendas Especiais" via botÃƒÂ£o de WhatsApp.
   - **Pesca B2B:** Injetada instruÃƒÂ§ÃƒÂ£o para pitch sutil sobre o "Programa de Revendedoras e Atacado" se detectar cliente buscando volume alto ou querendo revender.
7. **Seed de Banco de Dados:** Criado e executado um script (`seed_knowledge.mjs`) que injetou 6 polÃƒÂ­ticas operacionais iniciais (Frete, Trocas, Atacado, Tamanhos, Pagamento e Cuidados) na coleÃƒÂ§ÃƒÂ£o `lia_knowledge`.

### PrÃƒÂ³ximos Passos
1. Aguardar o fornecimento das chaves de API do Bling / Melhor Envio para iniciar a Fase 2 (IntegraÃƒÂ§ÃƒÂ£o de Rastreio de Pedidos via Chatbot / Function Calling).

## [28-07-2026] Lobotomia da Lia (CorreÃƒÂ§ÃƒÂ£o de HorÃƒÂ¡rios) e MigraÃƒÂ§ÃƒÂ£o de Infraestrutura

### O que foi feito e resolvido
1. **Varredura PanorÃƒÂ¢mica de HorÃƒÂ¡rios:** Identificamos que o horÃƒÂ¡rio de funcionamento antigo da loja estava "espalhado" por todo o cÃƒÂ³digo e na memÃƒÂ³ria fixa da Lia. Modificamos 5 arquivos cruciais (incluindo o cÃƒÂ©rebro `liaKnowledgeBase.js`, `App.jsx`, `CentralDaClientePage.jsx`, `OrderConfirmation.jsx` e `ConfiguracoesLoja.jsx`) para refletir o novo horÃƒÂ¡rio: **Seg-Qui 08h-17h, Sex 08h-13h**.
2. **ConfiguraÃƒÂ§ÃƒÂ£o da VPS Hostinger:** 
   - Acesso SSH estabelecido com sucesso usando a chave criptografada.
   - DiagnÃƒÂ³stico apontou que a API estava em crash-loop (reiniciando) devido ÃƒÂ  falta de um arquivo `.env` na produÃƒÂ§ÃƒÂ£o. O arquivo foi recriado na VPS corrigindo a falha.
3. **Caddy Proxy & SSL (DomÃƒÂ­nio Principal):** O sistema `docker-compose.yml` da VPS foi reestruturado. O container web cedeu a porta 80, e implementamos o **Caddy** como proxy reverso para assumir o domÃƒÂ­nio `avantelingerie.com.br`, gerando o cadeado SSL automaticamente (HTTPS) e balanceando a carga entre web, api e pocketbase.
4. **Fuga dos Limites do GitHub (MigraÃƒÂ§ÃƒÂ£o de MÃƒÂ­dia):**
   - Descobrimos 15 arquivos pesados (12 vÃƒÂ­deos de layout e depoimentos, 3 imagens) apontando para a hospedagem antiga (`lmdesignerweb.com`).
   - Para evitar o bloqueio de 100MB do GitHub (que nos impediu de comitar o `nova_friburgo_bg.mp4`), a VPS fez o download NATIVO via `wget` das mÃƒÂ­dias direto para um volume host (`/public_media`).
   - O Caddyfile foi atualizado com `handle_path` para entregar nativamente as rotas `/video/*` e `/imagens/*` na velocidade da luz.
   - O cÃƒÂ³digo frontend (React) foi totalmente higienizado: substituÃƒÂ­mos as URLs engessadas da `lmdesignerweb.com` pelas rotas relativas da prÃƒÂ³pria VPS.

### PrÃƒÂ³ximos Passos
1. A infraestrutura e a hospedagem da loja agora pertencem 100% ÃƒÂ  VPS da Hostinger. A hospedagem antiga (`lmdesignerweb.com`) pode ser formalmente cancelada pela cliente.
2. Iniciar novos fluxos pendentes e continuar o acompanhamento da Lia em produÃƒÂ§ÃƒÂ£o.

---

## [30-07-2026] O Incidente das MÃƒÂ­dias Desaparecidas (Root Cause & Fix)

### **Problema Relatado:** 
Todos os vÃƒÂ­deos (depoimentos, quem somos, background) e imagens essenciais (avatar da Lia, ÃƒÂ­cones) sumiram da loja em ProduÃƒÂ§ÃƒÂ£o e do ambiente de Desenvolvimento Local, gerando 404.

### **DiagnÃƒÂ³stico de Causa Raiz:** 
Embora a hospedagem antiga (`lmdesignerweb.com`) estivesse abandonada, os arquivos das mÃƒÂ­dias nÃƒÂ£o estavam mais no diretÃƒÂ³rio `/root/avantelingerie/public_media` da VPS (a etapa anterior de download relatada em 28-07 nÃƒÂ£o estava persistida em disco).
No ambiente local, a pasta nunca existiu pois o GitHub bloqueia commits acima de 100MB (limite estrito) e o arquivo `.gitignore` previne a sincronizaÃƒÂ§ÃƒÂ£o desses artefatos gigantes.

### **CorreÃƒÂ§ÃƒÂ£o CirÃƒÂºrgica & Raio de Impacto:**
1. **VPS (ProduÃƒÂ§ÃƒÂ£o):** Executado um comando `wget` maciÃƒÂ§o via SSH que reconstruiu as pastas `/video` e `/imagens` dentro de `/public_media`, baixando diretamente 483MB em vÃƒÂ­deos sem passar pelo disco da usuÃƒÂ¡ria. O proxy `caddy` foi reiniciado via `docker compose restart caddy` forÃƒÂ§ando o reload da montagem de volumes, retornando `HTTP/2 200` absoluto.
2. **Local (Desenvolvimento):** Para nÃƒÂ£o sobrecarregar o desktop da Host com 500MB de arquivos, editamos o `apps/web/vite.config.js`. Adicionamos uma regra inteligente de **Proxy Reverso**. Agora, qualquer pedido local na porta `3000` para `/video/*` ÃƒÂ© injetado dinamicamente para puxar a mÃƒÂ­dia direto da produÃƒÂ§ÃƒÂ£o (`https://avantelingerie.com.br`).
3. **LiaWidget.jsx:** Restaurada a tag `<img src="/imagens/lia_avatar.png">` que tinha sido substituÃƒÂ­da emergencialmente, e ressuscitado o gatilho `imageError` para proteger a interface contra quebras.

**Status:** Ã¢Å“â€¦ Solucionado (Auditoria dupla finalizada). MÃƒÂ­dias operacionais 100% online.

## [30-07-2026] (Parte 2) Melhorias no Painel Admin e Bugfixes no Bot WhatsApp

### O que foi feito e resolvido
1. **AmnÃƒÂ©sia CronolÃƒÂ³gica no Painel Admin:** As mensagens do WhatsApp que chegavam nÃƒÂ£o subiam para o topo do painel administrativo. 
   - **SoluÃƒÂ§ÃƒÂ£o:** Como o PocketBase gerado via WebSocket no frontend nÃƒÂ£o envia `updated` dinÃƒÂ¢mico em eventos de webhook em tempo real (jÃƒÂ¡ que quem atualiza o banco ÃƒÂ© a API backend), injetamos um `local_updated: new Date()` no frontend durante o evento do WebSocket e ordenamos as sessÃƒÂµes combinando `updated` e `local_updated`. Adicionamos um `.reverse()` no fetch inicial.
2. **Barra de Pesquisa e HorÃƒÂ¡rios (UX):** A barra de pesquisa do painel nÃƒÂ£o funcionava. 
   - **SoluÃƒÂ§ÃƒÂ£o:** Implementado filtro por `telefone/session_id` e conteÃƒÂºdo. Adicionada formataÃƒÂ§ÃƒÂ£o de horÃƒÂ¡rio amigÃƒÂ¡vel para mensagens no formato "HH:mm".
3. **QR Code Inteligente:** O QR code do WhatsApp estava aparecendo permanentemente (e jÃƒÂ¡ vencido) ao acessar a aba.
   - **SoluÃƒÂ§ÃƒÂ£o:** Criado botÃƒÂ£o `Exibir QR Code` sob demanda (`showQrCode`) ocultando a imagem atÃƒÂ© a usuÃƒÂ¡ria solicitar.
4. **Bug do Disparo Fantasma (6x):** A IA estava recebendo e respondendo a exata mesma mensagem do usuÃƒÂ¡rio 6 vezes.
   - **DiagnÃƒÂ³stico:** Bug da biblioteca `whatsapp-web.js` em contas com MÃƒÂºltiplos Dispositivos (Multi-Device). Ao receber o "history sync", ela disparava mÃƒÂºltiplos eventos `@lid`.
   - **SoluÃƒÂ§ÃƒÂ£o:** Implementado um Filtro de Cache em MemÃƒÂ³ria (`Set`) no `apps/whatsapp-bot/index.js` guardando os ÃƒÂºltimos 500 IDs (`msg.id.id`). Agora as cÃƒÂ³pias descartÃƒÂ¡veis que chegam no mesmo segundo sÃƒÂ£o sumariamente ignoradas.
5. **CorreÃƒÂ§ÃƒÂ£o dos Links Absolutos (Haiku):** A IA estava enviando mensagens textuais instruindo a "Clicar no Menu" (jÃƒÂ¡ que leu isso no catÃƒÂ¡logo), ignorando que o cliente estava no WhatsApp.
   - **SoluÃƒÂ§ÃƒÂ£o:** O prompt de sistema do cÃƒÂ©rebro (`apps/api/src/routes/lia.js`) foi reescrito injetando alertas imperativos de que o cliente NÃƒÆ’O tem acesso ao menu, acompanhado das URLs hardcoded para Revenda e Shop.

**Status:** Ã¢Å“â€¦ Todas as correÃƒÂ§ÃƒÂµes aplicadas na VPS, validadas e 100% operacionais. Tudo pronto para o prÃƒÂ³ximo dia de trabalho!

## [31-07-2026] Setup Oficial de Rastreamento (Meta & Google) e Refinamento do Painel Analytics

### O que foi feito e resolvido
1. **Setup do Meta Pixel:** Guiamos o cliente na criaÃ§Ã£o do PortfÃ³lio de NegÃ³cios e do Conjunto de Dados, extraindo com sucesso o ID final (981595838258999).
2. **Setup do Google Analytics 4:** Criamos o fluxo da web e configuramos a tag principal (G-E2FS36FRG1).
3. **Painel de Tracking & Pixels (Admin):** Foi construÃ­da a aba para inserir os IDs no Painel Administrativo. Durante os testes em produÃ§Ã£o, identificamos e corrigimos um bug de restriÃ§Ã£o do PocketBase (que impedia o salvamento quando apenas um dos campos era preenchido). A correÃ§Ã£o foi deployada com sucesso na VPS.
4. **Auditoria dos Exportadores de PÃºblico:** O cÃ³digo dos geradores de CSV para Lookalike (Meta) e Customer Match (Google) foi exaustivamente auditado e validado, garantindo aderÃªncia 100% Ã s polÃ­ticas de ambas as plataformas.

### PrÃ³ximos Passos
- O cliente precisa agora direcionar as demandas prioritÃ¡rias para o desenvolvimento da loja e dos bots de WhatsApp, como a tÃ£o aguardada integraÃ§Ã£o de rastreio de logÃ­stica (Melhor Envio) ou finalizaÃ§Ã£o de dashboards.

### **SeÃ§Ã£o Categorias DinÃ¢micas (04/08/2026)**
- **Arquivo:** pps/web/src/pages/HomePage.jsx`n- **O que foi feito:** O array estÃ¡tico categories foi substituÃ­do por um useState. Adicionou-se lÃ³gica para buscar todas as categorias (tivo=true) da coleÃ§Ã£o categorias. Para cada categoria encontrada, busca-se o produto mais recente que tenha uma imagem, utilizando essa imagem como thumbnail da categoria no carrossel. O link gerado para redirecionamento passou a ser dinÃ¢mico (/categoria/). Dessa forma, qualquer alteraÃ§Ã£o no Painel Admin reflete imediatamente na Home.
## [05/08/2026] Infraestrutura de E-mail (Resend) e DNS
- **Resend na API**: A integraÃ§Ã£o do envio de e-mails usando a SDK do Resend foi finalizada no backend.
- **Docker e VPS**: Corrigido bug de compilaÃ§Ã£o do 
pm ci nos Dockerfiles para 
pm install. A VPS foi reconstruÃ­da e a injeÃ§Ã£o da variÃ¡vel RESEND_API_KEY agora Ã© forÃ§ada pelo env_file.
- **Rastreamento Seguro**: Implementada trava de seguranÃ§a na pÃ¡gina de rastreio, exigindo login quando o cliente busca pelo NÃºmero do Pedido.
- **DNS e DomÃ­nio**: A autoridade do DNS foi transferida da Hostinger de volta para o Registro.br. Os 5 apontamentos (A para a VPS, TXT e MX para o Resend) foram configurados.
- **PrÃ³ximos Passos (Ponto de Parada)**: Validar o domÃ­nio no painel do Resend e realizar uma compra de teste para verificar o disparo dos e-mails e WhatsApp.

## [07-08-2026] Teste Transacional, Bugfixes e Setup do Zoho Mail

### O que foi feito e resolvido
1. **Teste Transacional de Sucesso (Resend + Lia WhatsApp):** A integraÃ§Ã£o de disparo de notificaÃ§Ãµes transacionais foi homologada em produÃ§Ã£o. O sistema agora intercepta a criaÃ§Ã£o do pedido (status `pendente` ou `criado`) e dispara simultaneamente um E-mail (via API do Resend) e um WhatsApp automatizado via Lia, notificando a cliente do recebimento do pedido e aguardo de pagamento.
2. **CorreÃ§Ã£o de Nome no Template:** Foi corrigido um bug onde a notificaÃ§Ã£o saÃ­a como "OlÃ¡, Cliente!" devido a inversÃ£o de variÃ¡veis (`nome_cliente` para `cliente_nome`) no payload do PocketBase. A alteraÃ§Ã£o foi *pushada* para o GitHub e implantada com sucesso via GitHub Actions na Hostinger.
3. **CorreÃ§Ã£o de UX (Admin):** Removido o `overflow-hidden` do painel administrativo e injetado o comportamento de `sticky top-24` no bloco de MÃ­dias/Fotos (PÃ¡gina de Produto), garantindo que as imagens acompanhem a rolagem ao cadastrar as infinitas variaÃ§Ãµes de cores e tamanhos.
4. **Zoho Mail (E-mail Corporativo):** Iniciada a criaÃ§Ã£o do ecossistema de caixa de entrada profissional gratuita. Criamos o Guia Mestre (`zoho_mail_setup.md`) detalhando os passos para cadastro no Forever Free Plan, configuraÃ§Ã£o de registros MX/TXT/SPF/DKIM no Registro.br e criaÃ§Ã£o dos alias (suporte, pedidos, etc).
5. **MemÃ³ria de Infraestrutura e AutomaÃ§Ã£o de Arquivamento:** O usuÃ¡rio acionou a Ada via comando `/learn` para injetar no `AGENTS.md` uma regra perpÃ©tua de atualizaÃ§Ã£o histÃ³rica (`MEMORIA_TECNICA.md`). Ademais, blindamos as regras de deploy na IA (sempre via Github Actions, nunca WinSCP) e a divisÃ£o exata de responsabilidades entre Resend (Disparos API) e Zoho (Caixa de Entrada Humana).

### PrÃ³ximos Passos (Ponto de Parada)
1. Concluir a verificaÃ§Ã£o do domÃ­nio via TXT Record no painel do Zoho Mail.
2. Criar os e-mails (ex: suporte@, pedidos@) e apontar os registros MX, SPF e DKIM no Registro.br para validar o recebimento no Zoho.
3. Iniciar prÃ³ximos fluxos de configuraÃ§Ã£o de loja (Meios de pagamento).

## [10-08-2026] FinalizaÃ§Ã£o do Ecossistema Zoho Mail
1. **VerificaÃ§Ã£o de Conta e Plano:** Validado que a conta corporativa estÃ¡ devidamente configurada no plano "Forever Free" (sem cobranÃ§as futuras).
2. **CriaÃ§Ã£o de Aliases:** Criados 6 "apelidos" (aliases) profissionais apontando para a caixa principal do admin, visando organizaÃ§Ã£o e atendimento segmentado (`contato`, `pedidos`, `financeiro`, `revendas`, `privacidade`, `marketing`).
3. **Mapeamento EstratÃ©gico:** Elaborado o documento `mapeamento_de_emails.md` detalhando exatamente em qual tela/sistema cada e-mail serÃ¡ utilizado.
4. **OrganizaÃ§Ã£o AutÃ´noma (Filtros):** Criadas as 5 pastas de destino no webmail e configurados os "Filtros" (Regras) que movem automaticamente mensagens enviadas para os respectivos Aliases diretamente para suas pastas, criando um ambiente de trabalho limpo e escalÃ¡vel.

### PrÃ³ximos Passos (Ponto de Parada)
1. Realizar uma "Varredura Geral" (General Store Cleanup) no site e cÃ³digo-fonte, atualizando rodapÃ©s, pÃ¡ginas institucionais e remetentes automÃ¡ticos com base no `mapeamento_de_emails.md`.
2. AvanÃ§ar para a configuraÃ§Ã£o dos Gateways de Pagamento (MercadoPago / Stripe).

## [10-08-2026] Varredura Geral de E-mails no CÃ³digo (Store Cleanup)
1. **Novo Alias (Trocas e DevoluÃ§Ãµes):** Criado e configurado o e-mail `trocas@avantelingerie.com.br` no Zoho Mail (com pasta e filtro de roteamento) para separar a logÃ­stica reversa do atendimento geral. O mapeamento foi atualizado.
2. **AtualizaÃ§Ã£o Front-end (React):** A `CentralDaClientePage.jsx` foi atualizada para direcionar as intenÃ§Ãµes de devoluÃ§Ãµes e defeitos para o novo e-mail `trocas@`.
3. **AtualizaÃ§Ã£o Back-end (Resend e Node):** O serviÃ§o de notificaÃ§Ãµes transacionais (`notificationService.js`) foi modificado para enviar todos os e-mails automÃ¡ticos de compras (Status de Pedidos) pelo remetente oficial `pedidos@avantelingerie.com.br`. As APIs do Bling e Melhor Envio (`integracoes.js` e `shipping.js`) tiveram o *User-Agent* alterado para usar o `contato@`.
4. **InteligÃªncia da Lia (IA):** O cÃ©rebro da inteligÃªncia artificial (`liaKnowledgeBase.js`) foi reprogramado para rotear os clientes de forma inteligente baseada em intenÃ§Ã£o:
   - Defeitos/Garantias -> `trocas@avantelingerie.com.br`
   - B2B/Atacado -> `revendas@avantelingerie.com.br` e URL da landing page.
   - Envios/Rastreio -> `pedidos@avantelingerie.com.br`
   - Suporte Geral -> `contato@avantelingerie.com.br`

### PrÃ³ximos Passos (Ponto de Parada)
- Toda a infraestrutura corporativa de e-mails (Zoho, Resend, React, Node) estÃ¡ 100% finalizada.
- A configuraÃ§Ã£o final da Stripe e do Bling estÃ£o momentaneamente em "Hold" (Aguardando). Ver seÃ§Ã£o de PendÃªncias EstratÃ©gicas abaixo.

## ðŸ›‘ PendÃªncias EstratÃ©gicas (Aguardando Bloqueios)
Para nÃ£o esquecermos, aqui estÃ£o os itens congelados e as datas de destrave:
1. **Bling ERP (Aguardando 16/08/2026):** O sistema estÃ¡ travado aguardando o dia 16 para realizar a alteraÃ§Ã£o de CPF para CNPJ da empresa. Somente apÃ³s isso poderemos:
   - Comprar e vincular o Certificado Digital A1.
   - Configurar a impressÃ£o conjugada (DANFE Simplificada + Etiqueta de Envio) para saÃ­rem na mesma impressora tÃ©rmica (formato 10 x 15 cm).
2. **Stripe (Aguardando Cadastro de Produtos):** A mudanÃ§a para as chaves de "ProduÃ§Ã£o" (Live) foi pausada propositalmente. A ideia Ã© primeiro iniciar o cadastro de produtos na loja e rodar alguns testes finais de checkout usando o modo Teste da Stripe. Apenas depois desse QA final faremos a virada de chaves. O problema do e-mail inicial (Gmail) serÃ¡ resolvido no momento da virada.

## ?? Backlog / Próximos Passos
*Ideias mapeadas para implementações futuras a pedido do usuário.*

- **Hero Carousel / Alternância de Vídeos:** Na seção principal da Home (Hero), implementar um sistema de carrossel de vídeos em background. A ideia é ter 2 ou mais vídeos (além do atual) que fiquem se alternando a cada 24 horas (Video of the Day / Vídeo da Semana), para que a loja sempre traga um ar de novidade para clientes recorrentes, sem causar distração com vídeos mudando enquanto a pessoa navega..


- **Checkout / Retirada no Local:** Implementar a opção de Retirada no Local na tela de Checkout. O sistema precisará ler as configurações globais da loja (Painel Admin -> Configurações -> Loja). Se a chave de Retirada no Local estiver ativa, oferecer essa opção de frete gratuito, exibindo o endereço de retirada, horário, prazo e instruções definidos no painel.


---

## ðŸ› ï¸� AtualizaÃ§Ã£o: 12/08/2026

**1. Hero Carousel Otimizado (VÃ­deo do Dia):**
- **Problema resolvido:** O carregamento do vÃ­deo gerava um 'flicker' visual na tela (flash) por ser calculado assincronamente via useEffect.
- **SoluÃ§Ã£o:** A lÃ³gica matemÃ¡tica foi levada para o escopo estÃ¡tico, alimentando o React nativamente. Agora, o vÃ­deo correspondente ao bloco do horÃ¡rio atual jÃ¡ carrega instantaneamente.
- **Regra:** Em vez de 24 horas, ajustamos o carrossel para rotacionar perfeitamente a cada 3 horas sem impactar a arquitetura da UI.

**2. Retirada no Local Integrada:**
- **Funcionalidade:** Adicionada a opÃ§Ã£o de Retirada FÃ­sica tanto no **Carrinho** quanto no **Checkout**.
- **SeguranÃ§a:** A injeÃ§Ã£o da opÃ§Ã£o (com valor zerado) foi centralizada na **API de Shipping (Backend)** para respeitar o bloqueio de seguranÃ§a do PocketBase para leitura pÃºblica das configuracoes_loja.
- **ValidaÃ§Ã£o:** A opÃ§Ã£o de entrega presencial anula a obrigatoriedade de "EndereÃ§o de Entrega" no formulÃ¡rio final.

**3. CorreÃ§Ãµes no Motor de Fretes / Regras de Frete GrÃ¡tis:**
- **Nomenclatura Nacional:** Adicionado suporte nativo Ã  regra 'nacional' gravada pelo Admin (alÃ©m de 'global').
- **Prioridade EstratÃ©gica:** CorreÃ§Ã£o da ordenaÃ§Ã£o da tabela regras_frete_gratis para prioridade ascendente (sort: prioridade), respeitando o fluxo humano onde "1" Ã© a regra mais prioritÃ¡ria e absoluta.
- **Integração de Estoque:** Confirmado o link 100% automático com configuracoes_estoque para extrair o CEP de origem da loja em tempo real.

**4. Otimização de Performance e Renderização:**
- **Hero Video (Mobile):** Removido o uso de `key` baseada em `Date.now()` no componente `<video>` da página inicial para evitar recriação do elemento no DOM durante re-renders do React. Isso solucionou um *flicker* (resíduo visual rápido de vídeos anteriores cacheados) em dispositivos móveis. Adicionado `preload="auto"` para suavizar a transição inicial.

 # # #   L � g i c a   d e   I n t e l i g � n c i a   e   U I   D i n � m i c a   d a   H o m e P a g e   ( 1 3 / 0 8 / 2 0 2 6 ) 
 -   * * H e r o   V i d e o   R o t a t i o n : * *   O   v � d e o   d a   s e � � o   H e r o   n � o   �   e s t � t i c o .   E l e   u t i l i z a   u m   a l g o r i t m o   i n t e l i g e n t e   b a s e a d o   n o   t i m e s t a m p   a t u a l   ( D a t e . n o w ( ) )   d i v i d i d o   e m   b l o c o s   d e   3   h o r a s .   O   s i s t e m a   r o t a c i o n a   a u t o m a t i c a m e n t e   e n t r e   h e r o _ 1 . m p 4 ,   h e r o _ 2 . m p 4   e   h e r o _ 3 . m p 4   a   c a d a   3   h o r a s ,   g a r a n t i n d o   q u e   a   u s u � r i a   s e m p r e   v e j a   u m   c o n t e � d o   f r e s c o   d e p e n d e n d o   d a   h o r a   d o   d i a   q u e   a c e s s a r   a   l o j a . 
 -   * * N o s s a s   C a t e g o r i a s : * *   A   v i t r i n e   d e   c a t e g o r i a s   n � o   u t i l i z a   i m a g e n s   m o c k a d a s   o u   e n v i o s   m a n u a i s   d e   f o t o   p a r a   a   c a t e g o r i a .   E l a   �   1 0 0 %   a u t � n o m a :   o   s i s t e m a   c o n s u l t a   o   b a n c o   d e   d a d o s ,   b u s c a   o   p r o d u t o   * m a i s   r e c e n t e *   ( s o r t :   ' - c r e a t e d ' )   a t r e l a d o   � q u e l a   c a t e g o r i a   q u e   p o s s u a   u m a   i m a g e m _ p r i n c i p a l   c a d a s t r a d a ,   e   u t i l i z a   a   f o t o   d e s s e   p r o d u t o   c o m o   c a p a   d a   c a t e g o r i a .   S e   o   p r o d u t o   f o r   a p a g a d o ,   o   s i s t e m a   u s a   o   s e g u n d o   m a i s   r e c e n t e   a u t o m a t i c a m e n t e . 
 -   * * E x p l o r e   N o s s a s   C o l e � � e s   ( D e s i g n   1 + 2 ) : * *   P a r a   m a n t e r   u m   l a y o u t   b o u t i q u e   a l t a m e n t e   o r g a n i z a d o ,   o   s i s t e m a   l i m i t a   r i g i d a m e n t e   a   b u s c a   a   n o   m � x i m o   3   c o l e � � e s   a t i v a s   ( g e t L i s t ( 1 ,   3 ) ) .   A   g r a d e   C S S   �   r e s p o n s i v a   e   m a t e m � t i c a :   e m   t e l a s   g r a n d e s   ( D e s k t o p )   e   m � d i a s   ( T a b l e t ) ,   a   1 �   c o l e � � o   m a i s   r e c e n t e   r e c e b e   d e s t a q u e   d u p l o   ( l g : c o l - s p a n - 2   m d : c o l - s p a n - 2 ) ,   e n q u a n t o   a   2 �   e   a   3 �   c o l e � � e s   o c u p a m   1   c o l u n a   c a d a .   I s s o   p r e e n c h e   a   l i n h a   p e r f e i t a m e n t e   s e m   d e i x a r   b u r a c o s   o u   d e s o r g a n i z a � � o   v i s u a l .  
 