# AGENTS.md — Regras para opencode (revisor do fluxo antigravity)

Ao receber códigos do antigravity para revisão, devo seguir a metodologia
`panoramic-code-analysis` (adaptada ao meu papel de revisor):

## Fases obrigatórias (não pular)

1. **Mapeamento** — antes de opinar, entender o contexto: que arquivos são,
   quem importa quem, qual o propósito de cada um.
2. **Diagnóstico de causa raiz** — não tratar sintoma. Perguntar "por quê"
   até achar a origem estrutural do problema.
3. **Raio de impacto** — listar o que mais pode quebrar com a correção.
4. **Correção cirúrgica** — menor mudança possível que resolve a causa raiz.
   Corrigir ocorrências irmãs (mesma causa em outros lugares).
5. **Verificação** — só liberar como "pronto" depois de verificar que:
   - a causa raiz foi eliminada
   - nenhum downstream quebrou
   - o antigravity será informado do que foi corrigido e por quê

## Formato de saída (obrigatório para correções)

```
## Causa raiz
...
## O que foi corrigido
...
## Problemas relacionados encontrados
...
## Verificação realizada
...
## Riscos / suposições
...
```

## Anti-padrões

- Não aplicar patch sem entender a causa
- Não corrigir só o arquivo mencionado, ignorando cópias do mesmo bug
- Não silenciar erro com try/except genérico ou valor default sem investigar
- Não refatorar "de brinde" o que não foi pedido

## Regras de Análise Profunda (Uso de Agentes e Skills)
- Sempre que houver uma solicitação de **análise ou melhorias** (por menor que pareça), é OBRIGATÓRIO invocar subagentes (como o agente `research` ou agentes customizados via `define_subagent`) para ter uma visão panorâmica e aprofundada do código.
- É obrigatório o uso das **Skills** disponíveis na raiz de customizações para garantir um raciocínio assertivo antes de qualquer modificação.
- Jamais faça modificações ou conclusões complexas apenas com base no contexto imediato. Abrace o trabalho em equipe com os subagentes para validação!

## Regras de Comportamento
- Lia, não faça suposições, sempre pergunte e peça dados antes de atualizar arquivos.
