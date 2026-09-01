
# Backlog de Futuras Implementações
## Projeto: Robô de Impressão Unificada (DANFE + Logística em 10x15cm)
**Destinos:** Avante Lingerie e Módulo de Expedição do FAST ERP.
**Status:** Arquivado para o futuro (Fase de Escala).
**Descrição:**
Desenvolvimento de um middleware que atue como 'Compositor de Impressão'.
- **Fluxo:** Integração com API do Bling (download do XML da NF-e) e API da Melhor Envio (download da etiqueta).
- **Processamento:** Geração de arquivo 100x150mm contendo a Etiqueta de Transporte na base e a mini-DANFE Simplificada no topo, sem sobreposição.
- **Legalidade:** Respeito integral à Nota Técnica 2020.004 (fontes >= 6pt e códigos de barras legíveis) e Ajuste SINIEF 07/05.
- **Gatilho de Início:** Quando a operação atingir alto volume de expedição diária, justificando o tempo de desenvolvimento para economizar papel térmico.
