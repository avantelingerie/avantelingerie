## INVESTIGAÇÃO PROFUNDA - MONTAGEM DINÂMICA DE SORT

### RESUMO
- **Data da investigação:** 2026-05-15
- **Total de arquivos investigados:** 68 (incluindo services, pages, components, lib/utils, hooks e backend)
- **Total de pontos de manipulação de sort encontrados:** 5 pontos principais (onde o estado de sort é definido e repassado).
- **Locais onde ":1" ou ":-1" está sendo adicionado:** 0 (ZERO). Não existe nenhuma concatenação dinâmica, interceptador ou template string adicionando ":1" ou ":-1" na base de código atual.

### ARQUIVOS QUE MANIPULAM SORT E ANÁLISE

#### Arquivo: `apps/web/src/pages/admin/ClientesPage.jsx`
- **Linha:** 18 e 69
- **Tipo de manipulação:** Definição de Estado (React useState)
- **Código ORIGINAL:**