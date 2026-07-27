# VALIDAÇÃO E TESTE DO MÓDULO 5 - Gestão de Clientes

Este documento contém o checklist de validação e o relatório de testes para o Módulo 5 (Gestão de Clientes e Endereços).

## 1. VALIDAÇÃO DE BANCO DE DADOS (POCKETBASE)

### 1.1. Expansão da Coleção `usuarios`
Verificar se os 6 novos campos foram adicionados corretamente e se os campos existentes foram preservados:
- [ ] `cpf` (text, optional)
- [ ] `telefone` (text, optional)
- [ ] `total_compras` (number, optional)
- [ ] `nivel_desconto` (number, optional)
- [ ] `desconto_pct` (number, optional)
- [ ] `bloqueado` (boolean, optional)
- [ ] Campos antigos preservados (id, email, password, nome, role, ativo, created, updated)

### 1.2. Criação da Coleção `enderecos`
Verificar se a coleção foi criada com os 11 campos e regras de acesso corretas:
- [ ] `usuario_id` (relation -> usuarios, required)
- [ ] `cep` (text, required)
- [ ] `logradouro` (text, required)
- [ ] `numero` (text, required)
- [ ] `complemento` (text, optional)
- [ ] `bairro` (text, required)
- [ ] `cidade` (text, required)
- [ ] `estado` (text, required)
- [ ] `principal` (boolean, optional)
- [ ] `criado_em` (autodate)
- [ ] `atualizado_em` (autodate)
- [ ] Regras de acesso (User-Owned Data Pattern): list/view/update/delete restritos ao próprio usuário (`usuario_id = @request.auth.id`), create permitido para usuários autenticados.

---

## 2. TESTES FUNCIONAIS - LISTAGEM DE CLIENTES

### 2.1. Página `/admin/clientes`
- [ ] Acessar `/admin/clientes` como administrador.
- [ ] Verificar se a página carrega sem erros (Skeleton loader aparece durante o carregamento).
- [ ] Verificar se a tabela exibe as colunas corretas: Nome | Email | CPF | Telefone | Criado Em | Total Compras | Ações.
- [ ] Verificar se o botão "Exportar CSV" está presente.

### 2.2. Filtros e Ordenação
- [ ] **Busca:** Digitar um nome, email ou CPF na barra de busca e verificar se a tabela filtra os resultados em tempo real.
- [ ] **Ordenação:** Testar as opções de ordenação:
  - [ ] Mais recentes primeiro (`-created`)
  - [ ] Mais antigos primeiro (`created`)
  - [ ] Maior volume de compras (`-total_compras`)
  - [ ] Menor volume de compras (`total_compras`)
- [ ] **Paginação:** Verificar se a paginação funciona corretamente (20 itens por página).

### 2.3. Exportação CSV
- [ ] Clicar no botão "Exportar CSV".
- [ ] Verificar se o arquivo é baixado corretamente.
- [ ] Abrir o arquivo e verificar se os cabeçalhos e dados correspondem aos clientes filtrados na tela.

---

## 3. TESTES FUNCIONAIS - DETALHES DO CLIENTE

### 3.1. Página `/admin/clientes/:id`
- [ ] Clicar em um cliente na tabela.
- [ ] Verificar se a página de detalhes carrega corretamente com todas as seções:
  - [ ] Dados Cadastrais (`ClienteDetalhes`)
  - [ ] Fidelidade e Descontos (`ClienteDescontos`)
  - [ ] Endereços (`ClienteEnderecos`)
  - [ ] Histórico de Pedidos (`ClientePedidos`)

### 3.2. Gestão de Endereços
- [ ] **Adicionar:** Clicar em "Adicionar Endereço", preencher o modal (validar campos obrigatórios) e salvar. Verificar se aparece na lista.
- [ ] **Editar:** Clicar em "Editar" em um endereço existente, alterar um dado e salvar. Verificar se a alteração reflete na tela.
- [ ] **Tornar Principal:** Clicar em "Tornar Principal" em um endereço secundário. Verificar se a badge "Principal" é movida para ele e removida do anterior.
- [ ] **Excluir:** Clicar em "Excluir", confirmar no prompt e verificar se o endereço some da lista.

### 3.3. Ajuste de Nível de Desconto
- [ ] Na seção "Fidelidade e Descontos", clicar em "Ajustar".
- [ ] Inserir um nível válido (0 a 5) e verificar se o "Desconto Projetado" calcula corretamente (ex: Nível 2 = 20%).
- [ ] Salvar e verificar se os cards de Nível Atual e Desconto Ativo são atualizados na tela.

### 3.4. Bloqueio/Desbloqueio de Cliente
- [ ] Clicar no botão "Bloquear Cliente" no topo da página.
- [ ] Verificar se a badge "Bloqueado" aparece ao lado do nome do cliente.
- [ ] Tentar fazer login na loja com as credenciais deste cliente (deve ser impedido/tratado pelo sistema de auth).
- [ ] Voltar ao admin e clicar em "Desbloquear Cliente". Verificar se a badge some.

### 3.5. Histórico de Pedidos
- [ ] Verificar se a tabela de pedidos exibe os pedidos do cliente (se houver).
- [ ] Clicar em uma linha de pedido e verificar se redireciona corretamente para `/admin/pedidos/:id`.

---

## 4. TESTES DE REGRESSÃO (MÓDULOS 1 A 4)

Verificar se a introdução do Módulo 5 não quebrou funcionalidades anteriores:
- [ ] `/admin/produtos`: Listagem, criação e edição de produtos funcionam.
- [ ] `/admin/estoque`: Listagem e movimentação de estoque funcionam.
- [ ] `/admin/descontos`: Configuração de descontos progressivos, PIX e cupons funcionam.
- [ ] `/admin/pedidos`: Listagem, criação manual e detalhes de pedidos funcionam.
- [ ] **Loja Pública:** Navegação, carrinho, checkout e aplicação de descontos (PIX, Cupons, Progressivo) continuam operando normalmente.

---

## 5. RESPONSIVIDADE E ERROS

### 5.1. Responsividade
Testar as páginas `/admin/clientes` e `/admin/clientes/:id` nas seguintes resoluções:
- [ ] **Desktop (1920px):** Layout em grid/colunas exibe corretamente.
- [ ] **Tablet (768px):** Tabelas com scroll horizontal se necessário, cards ajustados.
- [ ] **Mobile (375px):** Layout empilhado (stack), modais ocupam a tela adequadamente, botões acessíveis ao toque.

### 5.2. Verificação de Console
- [ ] **Navegador (F12):** Navegar por todas as telas do Módulo 5 e verificar a ausência de erros (vermelhos) no console.
- [ ] **Servidor (Terminal):** Verificar se não há erros de execução do Node/Vite ou falhas de requisição à API do PocketBase.

---

## 6. RELATÓRIO FINAL

### Status Geral
[ PENDENTE DE EXECUÇÃO MANUAL ]

### Observações e Problemas Encontrados
*(Preencher após a execução dos testes manuais)*
- N/A

### Próximos Passos
- Executar os testes descritos acima.
- Corrigir eventuais bugs encontrados.
- Avançar para o próximo módulo (Módulo 6).