# 🔍 Investigação Profunda: Origem do Sufixo de Sort (`:1` / `:-1`)

Após uma varredura rigorosa em todas as camadas da aplicação, desde o `vite.config.js` até os interceptors e arquivos de serviço, aqui está o relatório detalhado de onde e como o sufixo `:1` está sendo injetado nas requisições HTTP.

---

## 1. Verificação de Interceptors e Clientes Base (READ-ONLY)
* **`pocketbaseClient.js`**: Não contém nenhuma transformação de parâmetros. Instancia o PocketBase de forma limpa apontando para `/hcgi/platform`.
* **`apiServerClient.js`**: Realiza um wrapper simples do `window.fetch`, sem interceptação ou manipulação de `query params`.
* **`vite.config.js`**: Possui um "monkey patch" no `window.fetch`, mas ele atua exclusivamente na **captura de erros** para envio ao overlay do editor. A URL original e seus parâmetros (`args[0]`) não sofrem mutação.
* **`utils.js` (lib)**: Contém apenas a função `cn` para Tailwind. Sem relação com requisições.

## 2. Verificação de Hooks e Contextos
* **Hooks (`useCart`, `useCheckoutLogic`, `useUserProfile`)**: Nenhum deles manipula listagens ou parâmetros de ordenação (sort) da API.
* **Contextos (`AuthContext`, `AdminAuthContext`)**: Gerenciam apenas estado de usuário e login. Nenhuma interceptação HTTP.

## 3. O Diagnóstico Exato (A Origem do Problema)

O mistério não está em um interceptor global, nem em uma biblioteca externa, e o SDK do PocketBase também não adiciona `:1` sozinho. 

A injeção do `:1` ocorre no **Estado (State) dos Componentes React (UI)**.

### O Fluxo do Bug:
1. Dentro dos componentes de página (ex: `ProdutosListagem.jsx` ou `ClientesTable.jsx`), o estado inicial de ordenação foi instanciado com resquícios de padrão MongoDB. Algo como: