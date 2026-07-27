# Relatório de Auditoria Técnica - Avante Lingerie
**Data da Auditoria:** 27 de Maio de 2026
**Foco:** Análise estática de código e mapeamento profundo de bugs.

Abaixo estão detalhados todos os problemas encontrados na base de código atual, categorizados por área de impacto.

---

## 1. ERROS DE NAVEGAÇÃO E ROTAS

**1.1. Links do Footer apontando para páginas inexistentes (404)**
- **Tipo de Erro:** Navegação
- **Arquivo Afetado:** `apps/web/src/components/Footer.jsx` e `apps/web/src/App.jsx`
- **Descrição do Problema:** O Footer possui links para `/sobre`, `/lojas` e `/faq`. No entanto, essas rotas não estão mapeadas no `App.jsx`, o que faz com que os usuários sejam direcionados para a página de erro 404 (NotFound).
- **Impacto:** Médio
- **Passos para Reproduzir:** Rolar até o rodapé de qualquer página e clicar em "Sobre a Avante", "Nossas Lojas" ou "Dúvidas Frequentes".

**1.2. Redirecionamento incorreto para "Minha Conta"**
- **Tipo de Erro:** Navegação / Usabilidade
- **Arquivo Afetado:** `apps/web/src/components/Footer.jsx` e `apps/web/src/pages/LoginPage.jsx`
- **Descrição do Problema:** O link "Minha Conta" no rodapé aponta para `/login`. Se o usuário já estiver logado, o `useEffect` da página `LoginPage` o redireciona automaticamente para `/cart` (ou para o `state.from`), e não para `/account` (`MinhaContaPage.jsx`). O usuário tem dificuldade de acessar o próprio painel.
- **Impacto:** Alto
- **Passos para Reproduzir:** Fazer login no site. Navegar até o Footer e clicar em "Minha Conta". O usuário será jogado para o carrinho.

---

## 2. BUGS GERAIS E USABILIDADE

**2.1. Checkout sem processamento de pagamento real**
- **Tipo de Erro:** Bug Geral
- **Arquivo Afetado:** `apps/web/src/pages/Checkout.jsx`
- **Descrição do Problema:** A função `handleFinalizeOrder` na página de Checkout não faz nenhuma chamada para a API (Stripe, banco de dados ou integração). Ela apenas valida o endereço superficialmente, gera um ID aleatório (`AVL-YYYY-XXXXX`), limpa o carrinho e redireciona para a página de confirmação.
- **Impacto:** Crítico
- **Passos para Reproduzir:** Adicionar um item ao carrinho, ir para o checkout, preencher o endereço e clicar em "Concluir Compra". O pedido é "aprovado" sem cobrar nada e sem ser salvo no banco de dados.

**2.2. Carrinho não valida estoque em tempo real na finalização**
- **Tipo de Erro:** Bug Geral
- **Arquivo Afetado:** `apps/web/src/hooks/useCart.js` e `apps/web/src/pages/Checkout.jsx`
- **Descrição do Problema:** O carrinho limita a quantidade máxima com base na propriedade `stock` que foi puxada no momento em que o produto foi adicionado. Não há uma verificação em tempo real (no banco de dados) do estoque na hora em que o usuário clica em "Concluir Compra".
- **Impacto:** Alto
- **Passos para Reproduzir:** Adicionar o último item em estoque ao carrinho. Outro usuário compra o mesmo item. O primeiro usuário tenta finalizar a compra e o sistema permite, gerando furo de estoque.

---

## 3. PROBLEMAS DE RENDERIZAÇÃO

**3.1. Quebra do Layout de Grid (Purging Dinâmico do Tailwind)**
- **Tipo de Erro:** Renderização
- **Arquivo Afetado:** `apps/web/src/pages/CategoryPage.jsx`
- **Descrição do Problema:** A visualização de produtos usa interpolação de strings para classes do Tailwind: ``className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${layout} ...`}``. O Tailwind CSS não consegue detectar e compilar classes geradas dinamicamente durante o processo de build. Em produção, a classe `lg:grid-cols-4` ou `lg:grid-cols-2` será removida (purged) e a vitrine ficará quebrada ou em coluna única.
- **Impacto:** Alto
- **Passos para Reproduzir:** Fazer o build do projeto para produção (`npm run build`). Acessar a página de categorias em uma tela desktop. A grid de produtos estará desconfigurada.

---

## 4. INTEGRAÇÃO FRONT-END/BACK-END (POCKETBASE & API)

**4.1. Falha crítica na Consulta de Confirmação de Pedido**
- **Tipo de Erro:** Integração API
- **Arquivo Afetado:** `apps/web/src/pages/OrderConfirmation.jsx`
- **Descrição do Problema:** O componente tenta buscar os dados do pedido recém-criado na coleção errada: `pb.collection('orders').getOne(orderId)`. O banco de dados não possui a coleção `orders` (o nome correto da coleção é `pedidos`). Como a consulta falha, o bloco `catch` força o uso de dados de pedido simulados/mockados estáticos, mostrando sempre os mesmos produtos falsos.
- **Impacto:** Crítico
- **Passos para Reproduzir:** Acessar a página `/order-confirmation/QUALQUER-ID`. A página sempre exibirá um "Conjunto em Microfibra" fictício.

**4.2. Inconsistência Crítica no Modelo de Usuários (Varejo x Revenda)**
- **Tipo de Erro:** Integração Back-End
- **Arquivo Afetado:** `apps/web/src/context/AuthContext.jsx` e `apps/web/src/pages/CartPage.jsx`
- **Descrição do Problema:** O cliente da loja se cadastra na coleção `users` (`_pb_users_auth_`). O código de Signup tenta enviar o campo `tipo_cliente: 'varejo'`. O código de upgrade de revendedora no Carrinho tenta atualizar `commercial_profile`, `account_level`, `cpf` e `whatsapp`. **Nenhum destes campos existe na coleção `users` do banco de dados.** A inserção/atualização falhará e a lógica de revenda inteira será bloqueada. (Nota: Esses campos existem na coleção paralela `usuarios`, que é usada pelo Admin).
- **Impacto:** Crítico
- **Passos para Reproduzir:** No Carrinho, tentar fazer o Upgrade para Revendedora preenchendo CPF e Telefone e clicando em "Ativar Meu Cadastro". A requisição ao PocketBase vai falhar com erro 400 (Campos desconhecidos).

**4.3. Filtro de Categorias Quebrado na Vitrine**
- **Tipo de Erro:** Integração API / Bug de Lógica
- **Arquivo Afetado:** `apps/web/src/pages/CategoryPage.jsx` e `apps/web/src/pages/admin/ProdutoForm.jsx`
- **Descrição do Problema:** O componente `CategoryPage` cria a query de filtro assim: `filterStr = categoria ~ "${formattedCategoryName}"` (buscando por um campo texto chamado `categoria`). No entanto, a modelagem de produtos atualizada salva a categoria usando a relação `categoria_id` (vinculada à tabela de `categorias`). A busca na vitrine retornará vazia ao selecionar categorias nos menus.
- **Impacto:** Alto
- **Passos para Reproduzir:** Clicar em "Conjuntos" no menu superior. A vitrine carregará vazia ("Nenhum produto encontrado"), pois a consulta do PocketBase falhará ou não encontrará correspondência de string na relação.

---

## 5. PAINEL ADMINISTRATIVO E PERMISSÕES

**5.1. Conflito entre coleções `users` e `usuarios`**
- **Tipo de Erro:** Arquitetura / Autenticação
- **Arquivo Afetado:** `apps/web/src/context/AdminAuthContext.jsx` vs `apps/web/src/context/AuthContext.jsx`
- **Descrição do Problema:** O contexto de administração faz autenticação pela coleção `usuarios` (`pb.collection('usuarios')`), enquanto o cliente comum acessa pela coleção `users` (`pb.collection('users')`). Isso causa dados fragmentados, clientes que não aparecem na listagem do painel de administração e problemas na gestão de pedidos e faturamento (pois o administrador enxergará o ID de uma tabela que não corresponde aos dados da outra).
- **Impacto:** Crítico
- **Passos para Reproduzir:** Um cliente cria a conta na loja. O administrador entra na tela de `ClientesPage` no painel. O cliente recém-cadastrado não estará listado, pois a listagem administrativa busca dados da coleção `usuarios`, enquanto a loja cadastra na coleção `users`.

**5.2. Admin - Salvar Produto com Imagens Vazio**
- **Tipo de Erro:** Bug
- **Arquivo Afetado:** `apps/web/src/pages/admin/ProdutoForm.jsx`
- **Descrição do Problema:** Ao salvar um produto novo sem definir uma imagem principal, a lógica do `finalMainImage` tenta puxar da galeria, mas caso a galeria esteja vazia, ela envia `''` vazio ou pode quebrar. Há ausência de validação rígida impedindo a criação de produto totalmente sem fotos, o que quebra a renderização do `ProductCard` na vitrine.
- **Impacto:** Médio
- **Passos para Reproduzir:** Criar um produto no painel sem subir nenhuma foto. Ir para a Home Page. O skeleton placeholder de fallback não possui um tratamento de design ideal.