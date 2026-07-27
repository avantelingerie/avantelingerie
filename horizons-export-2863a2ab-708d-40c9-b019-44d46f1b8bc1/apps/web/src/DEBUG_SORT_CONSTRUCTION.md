# Debug: 'sort' Construction Analysis

This document analyzes how the `sort` parameter is constructed and passed across the codebase to identify any suspicious patterns, such as the injection of `:1` or `:-1`.

## File Analysis Table

| File | Line # | Content | Has Template Literal | Has Concatenation | Has Ternary | Special Flags |
| :--- | :---: | :--- | :---: | :---: | :---: | :--- |
| `apps/web/src/services/clientesService.js` | 4 | `async getClientes(page = 1, limit = 20, filters = {}, sort = '-created') {` | No | No | No | None |
| `apps/web/src/services/clientesService.js` | 13 | `sort: sort,` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/clientesService.js` | 39 | `async fetchClientes(page = 1, limit = 20, filters = {}, sort = '-created') {` | No | No | No | None |
| `apps/web/src/services/clientesService.js` | 40 | `return this.getClientes(page, limit, filters, sort);` | No | No | No | None |
| `apps/web/src/services/clientesService.js` | 69 | `sort: '-principal,-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/clientesService.js` | 126 | `sort: '-data_pedido',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/pages/admin/ClientesPage.jsx` | 20 | `const [sort, setSort] = useState('-created');` | No | No | No | None |
| `apps/web/src/pages/admin/ClientesPage.jsx` | 25 | `const res = await clientesService.getClientes(currentPage, 20, { search }, sort);` | No | No | No | None |
| `apps/web/src/pages/admin/ClientesPage.jsx` | 40 | `}, [search, sort]);` | No | No | No | None |
| `apps/web/src/pages/admin/ClientesPage.jsx` | 71 | `<Select value={sort} onValueChange={setSort}>` | No | No | No | None |
| `apps/web/src/pages/admin/ProdutosListagem.jsx` | 31 | `const records = await pb.collection('categorias').getFullList({ sort: 'nome', $autoCancel: false });` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/pages/admin/ProdutosListagem.jsx` | 46 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/pages/admin/EstoqueListagem.jsx` | 36 | `const cats = await pb.collection('categorias').getFullList({ sort: 'nome', $autoCancel: false });` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/descontosService.js` | 40 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/descontosService.js` | 104 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/estoqueService.js` | 16 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/estoqueService.js` | 54 | `sort: '-criado_em',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/pedidosService.js` | 23 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |
| `apps/web/src/services/pedidosService.js` | 80 | `sort: '-created',` | No | No | No | Has 'sort' and ':' |

*(Note: `PedidosPage.jsx`, `DescontosPage.jsx`, and `CuponsTab.jsx` do not contain the explicit string `sort` in their current content).*

---

## FINDINGS

### 1. No Suspicious String Constructions
Across all analyzed files, there are **no instances** of:
- Template literals using `${sort}`.
- String concatenations like `sort + ":"`.
- Ternary operators related to `sort` (e.g., `? 1 : -1`).

### 2. Clean Service Implementations
In `clientesService.js` and all other service files (`descontosService.js`, `estoqueService.js`, `pedidosService.js`), the `sort` parameter is passed entirely cleanly. It defaults to a plain string (`'-created'`) and is mapped directly to the PocketBase options object (`sort: sort,` or `sort: '-created',`). 

### 3. Clean Component State
In `ClientesPage.jsx`, `sort` is managed through standard React state (`useState('-created')`) and populated by standard `<SelectItem>` values (`-created`, `created`, `-total_compras`, `total_compras`). There is no formatting layer between the `<Select>` and the `clientesService` call.

### Conclusion on the `:-1` / `:1` Injection
Because the visible frontend codebase (services and components) passes pure string values (`-created`) directly into the `options` object for PocketBase SDK functions (`getList`, `getFullList`), the rogue `:1` or `:-1` parameter is **NOT** being injected by any of the analyzed files. 

If requests are reaching the network containing `sort=-created:1`, the modification is highly likely happening inside a central client wrapper (`apps/web/src/lib/pocketbaseClient.js`), a global network interceptor, or an external proxy configuration. The UI and Service layers are structurally sound and not responsible for appending indices to the sorting logic.