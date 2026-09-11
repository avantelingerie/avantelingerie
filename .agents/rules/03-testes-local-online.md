---
description: Obrigatoriedade de testes locais e regras para validação online (staging/produção).
trigger: always_on
---
# 03 - Testes (Local e Online)

## 7. TESTES — REGRA OBRIGATÓRIA e 9. VERIFICAÇÃO REAL
Dois ambientes: LOCAL e ONLINE.
- Teste Local: build, lint, iniciar sistema, validar tela, fluxos, console, banco.
- Teste Online: Não é validado só por rodar localmente. Testar acesso, navegação, integrações e erros de rede.
Teste não é "ver se abriu". Verifique persistência, estados, mensagens e regras.

## 8. HOMOLOGAÇÃO VS PRODUÇÃO
Nunca presuma a URL. Se não souber: [NÃO DETERMINADO]. Nunca faça teste destrutivo em Produção.

## 10. TESTE DE REGRESSÃO
Após alterar algo, teste o que está relacionado. (No ERP isso é mandatório para todos os módulos cruzados).

## 16. INTERNET E NAVEGADOR
Pode usar para testar, validar e ler docs. Mas não execute ações irreversíveis sem permissão.
Diferencie no relatório: TESTE LOCAL vs TESTE ONLINE.
