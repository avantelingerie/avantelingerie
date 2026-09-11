---
description: Limites de autonomia em ações destrutivas ou externas para este escopo.
trigger: always_on
---
# 01 - Segurança e Permissões

## 10. SEGURANÇA E AUTONOMIA e 26. AUTONOMIA
Autonomia ALTA, mas DISCIPLINADA para tarefas normais. Confirmação OBRIGATÓRIA para:
- Ações destrutivas
- Produção
- Dados críticos
- Alterações fora do projeto
- Mudanças arquiteturais de grande impacto
- Operações irreversíveis.

## 12. SEGURANÇA DE DADOS
Nunca exponha senhas, tokens, API keys, secrets ou credenciais. Não coloque secrets no código, use variáveis de ambiente.

## 13. ARQUIVOS e 14. TERMINAL
Autonomia DENTRO do workspace para ler/editar arquivos e comandos seguros (build, lint, npm, etc).
FORA do workspace ou comandos destrutivos (apagar grandes massas, comandos admin, banco irreversível): EXIGE AUTORIZAÇÃO.
