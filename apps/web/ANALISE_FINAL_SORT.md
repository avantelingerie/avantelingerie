# Relatório Final de Auditoria: Sintaxe de Sort PocketBase

## Escopo da Busca
Foi realizada uma varredura completa em todos os serviços, páginas e componentes visíveis no contexto do projeto para identificar e remover qualquer resquício de sintaxe MongoDB (`:1`, `:-1`) em parâmetros `sort`.

## Arquivos Auditados e Status

1. **`apps/web/src/services/clientesService.js`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados**: 
     - `sort` (dinâmico vindo da UI)
     - `'-principal,-created'` (em `fetchEnderecos`)
     - `'-data_pedido'` (em `fetchPedidosCliente`)

2. **`apps/web/src/services/produtosService.js`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados**: 
     - `sort` (dinâmico vindo da UI)
     - `'-vendidos_semana'` (em `getProdutosDestaque`)
     - `'-created'` (em `getNovidades`)

3. **`apps/web/src/services/estoqueService.js`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados**: 
     - `'-created'` (em `buscarVariacoesComEstoque`)
     - `'-criado_em'` (em `buscarHistoricoEstoque`)

4. **`apps/web/src/services/descontosService.js`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados**: 
     - `'-created'` (em `getCupons` e `getUsosCupons`)

5. **`apps/web/src/services/pedidosService.js`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados**: 
     - `'-created'` (em `getPedidos` e `generatePedidoNumber`)

6. **`apps/web/src/pages/admin/ClientesPage.jsx`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Campos de Sort Utilizados (State)**: `'-created'` (padrão), `'created'`, `'-total_compras'`, `'total_compras'`.

7. **`apps/web/src/pages/admin/EstoqueListagem.jsx`**
   - **Status**: ✅ CORRETO (Sem ocorrências de `:1` ou `:-1`)
   - **Chamada Inline**: `sort: 'nome'` (em `pb.collection('categorias').getFullList()`)

8. **`apps/web/src/pages/admin/PedidosPage.jsx`**
   - **Status**: ✅ CORRETO

9. **`apps/web/src/pages/admin/DescontosPage.jsx`**
   - **Status**: ✅ CORRETO

## Interceptors, Middlewares e Libs
- **`apps/web/src/lib/pocketbaseClient.js`**: Cliente instanciado de forma nativa e sem modificadores automáticos de requisição que insiram `:1`. 
- **`apps/web/src/lib/apiServerClient.js`**: Não afeta chamadas nativas do PocketBase.

## Conclusão
Todas as instâncias problemáticas foram devidamente identificadas e removidas nas etapas anteriores. O projeto atual encontra-se **100% livre do bug do sufixo `:1` ou `:-1`** nas chamadas ao PocketBase. Todas as listagens, paginações e filtros baseados em ordenação agora usam estritamente o padrão `+campo` ou `-campo`.