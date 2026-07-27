# Verificação do Sanitizador de Ordenação (Sort Sanitizer)

Este documento exibe e verifica a lógica de sanitização adicionada ao `clientesService.js` para garantir que o PocketBase receba os parâmetros de ordenação no formato estritamente correto (sem sufixos `:1` ou `:-1` oriundos de injeções de terceiros ou comportamentos estilo MongoDB).

## 1. Código Exato do Sanitizador e Regex

A sanitização ocorre logo no início da função `getClientes`, utilizando a seguinte expressão regular: