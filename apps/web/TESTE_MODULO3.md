# Checklist de Testes - Módulo 3 (Descontos e Cupons)

Este documento contém os cenários de teste para validação manual do Módulo 3.

**Pré-requisito:** Acesse `/admin/descontos` e clique no botão "Gerar Dados de Teste" no topo da página para popular o banco de dados com faixas, cupons e usos.

---

## 1. Desconto Progressivo

| Status | Cenário | Instruções | Resultado Esperado | Notas |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | Carregamento | Acesse a aba "Desconto Progressivo". | Skeleton loader aparece brevemente. Tabela exibe as faixas geradas pelo seed. | |
| [ ] | Adicionar Faixa | Clique em "Adicionar Faixa". Preencha: Min=500, Max=vazio, Perc=20. Salve. | Modal fecha, toast de sucesso aparece, tabela atualiza com a nova faixa. | |
| [ ] | Validação de Sobreposição | Tente adicionar uma faixa que conflite com uma existente (ex: Min=50, Max=150). | Erro em tempo real aparece no modal. Botão "Salvar" fica desabilitado. | |
| [ ] | Editar Faixa | Clique no ícone de lápis em uma faixa. Altere o percentual e salve. | Modal fecha, toast de sucesso, tabela reflete o novo valor. | |
| [ ] | Remover Faixa | Clique no ícone de lixeira. Confirme a exclusão. | Toast de sucesso, faixa desaparece da tabela. | |

---

## 2. Desconto PIX

| Status | Cenário | Instruções | Resultado Esperado | Notas |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | Carregamento | Acesse a aba "Desconto PIX". | Card de resumo e formulário exibem os valores atuais. | |
| [ ] | Validação em Tempo Real | Ative o toggle. Insira Percentual = 150. | Mensagem de erro aparece abaixo do campo. Botão "Salvar" desabilita. | |
| [ ] | Atualização | Corrija para Percentual = 10, Valor Mínimo = 50. Clique em Salvar. | Toast de sucesso ("Desconto PIX atualizado com sucesso!"). Card de resumo atualiza. | |
| [ ] | Desativar PIX | Desative o toggle e salve. | Campos ficam opacos/desabilitados. Card de resumo mostra "Inativo". | |

---

## 3. Cupons de Desconto

| Status | Cenário | Instruções | Resultado Esperado | Notas |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | Listagem e Paginação | Acesse a aba "Cupons". Verifique a tabela e os controles de paginação no rodapé. | Tabela exibe cupons. Paginação funciona corretamente (se houver > 20 itens). | |
| [ ] | Filtros | Teste os filtros de Status, Tipo e Busca por código. | Tabela atualiza em tempo real. Paginação reseta para a página 1. | |
| [ ] | Novo Cupom (Validação) | Clique em "Novo Cupom". Tente usar um código que já existe (ex: BEMVINDO10). | Erro de código duplicado aparece. Botão "Salvar" desabilita. | |
| [ ] | Novo Cupom (Sucesso) | Crie um cupom válido (ex: TESTE123, 15%, validade futura). | Toast de sucesso, modal fecha, cupom aparece na tabela. | |
| [ ] | Editar Cupom | Edite um cupom existente. Altere o limite de usos. | Toast de sucesso, tabela reflete a alteração. | |
| [ ] | Ativar/Desativar | Clique no switch de status de um cupom na tabela. | Toast de sucesso, status altera imediatamente. | |
| [ ] | Excluir Cupom | Clique na lixeira de um cupom recém-criado. Confirme. | Toast de sucesso, cupom desaparece da tabela. | |

---

## 4. Relatório de Uso

| Status | Cenário | Instruções | Resultado Esperado | Notas |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | Carregamento e Gráfico | Acesse a aba "Relatório de Uso". | Tabela exibe cupons usados. Gráfico de barras mostra o Top 10 por economia. | |
| [ ] | Filtro de Data | Altere a "Data Inicial" para uma data futura. | Tabela mostra "Nenhum dado encontrado". Gráfico desaparece. | |
| [ ] | Detalhes de Uso | Volte a data para 30 dias atrás. Clique em "Detalhes" no cupom BEMVINDO10. | Modal abre com a lista de pedidos, clientes, datas e valores de desconto. | |
| [ ] | Filtro no Modal | Dentro do modal de detalhes, altere as datas. | Lista de pedidos é filtrada corretamente. | |
| [ ] | Exportar CSV | Clique no botão "Exportar". | Arquivo CSV é baixado com as colunas corretas e dados do relatório. | |

---

## 5. Preservação e Responsividade

| Status | Cenário | Instruções | Resultado Esperado | Notas |
| :---: | :--- | :--- | :--- | :--- |
| [ ] | Módulos Anteriores | Navegue para "Produtos" e "Estoque" no menu lateral. | Páginas carregam normalmente sem erros. | |
| [ ] | Responsividade (Mobile) | Reduza a tela para tamanho de celular (375px). | Tabelas ganham scroll horizontal. Modais se ajustam à tela. Menu lateral vira overlay. | |