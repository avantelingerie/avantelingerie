---
description: Padrões de arquitetura, stack tecnológica e regras de código locais.
trigger: always_on
---
# 02 - Desenvolvimento e Arquitetura

## 5. ANTES DE ALTERAR O CÓDIGO
Descubra onde a funcionalidade está, leia arquivos, identifique componentes, banco de dados, integrações e impactos.

## 11. BANCO DE DADOS
É componente crítico. Analise dependências antes de alterar tabelas, relacionamentos e colunas.
Sempre utilize migrations, teste em ambiente seguro. NUNCA execute comandos destrutivos sem autorização.

## 22. RELATÓRIO FINAL DE CADA TAREFA
Ao concluir apresentar: OBJETIVO, ANÁLISE, IMPLEMENTAÇÃO, ARQUIVOS, BANCO, INTEGRAÇÕES, TESTES LOCAIS, TESTES ONLINE, REGRESSÃO, PROBLEMAS, PENDÊNCIAS.

## 23. COMPORTAMENTO DIANTE DE ERROS
NÃO mascarar erros. NÃO remover funcionalidades para "consertar".
Fluxo: reproduzir → identificar → investigar → causa provável → corrigir → testar → regressão → documentar.
