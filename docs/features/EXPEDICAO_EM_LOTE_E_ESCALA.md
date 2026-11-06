# 🚀 Projeto de Engenharia: Expedição em Lote e Escala Logística (Avante Lingerie)

> **Documento de Arquitetura e Especificação Técnica para Alta Escala**  
> **Status:** Mapeado e Arquitetado (Pronto para Execução Futura)  
> **Data de Registro:** 06/11/2026  
> **Responsáveis:** Ada (Arquiteta Líder) & Vértice (Comércio e Operação)

---

## 1. Visão Geral e Objetivo

Quando a Avante Lingerie atingir patamares de alta escala (20, 50, 100+ pedidos/dia), a emissão individual de etiquetas e a conferência manual tela a tela tornam-se gargalos operacionais. O objetivo deste projeto é fornecer uma **esteira de expedição ultra-rápida, à prova de falhas e 100% integrada entre Bling ERP, Loja Virtual, Melhor Envio e Impressora Térmica Gainscha GS-2406T**.

---

## 2. Pilares da Arquitetura de Escala

```
                   [ VENDAS NA LOJA ]
                           │
                           ▼
                    [ BLING ERP ]
               (Emissão de NF-e em Lote)
                           │
               ┌───────────┴───────────┐
               │ Webhook SEFAZ         │ (Automático)
               ▼                       ▼
      [ BANCO POCKETBASE ]     [ PAINEL ADMIN AVANTE ]
      - NF-e vinculada         - Filtro: "Prontos para Envio"
      - Chave 44 dígitos       - Checkbox: [✓ Selecionar Todos]
      - Itens e tamanhos       - Botão: [ 📦 Gerar Lote ]
               │                       │
               └───────────┬───────────┘
                           ▼
               [ API MELHOR ENVIO V2 ]
               - Carrinho em Lote (/cart)
               - Checkout coletivo com carteira
                           │
                           ▼
          [ ROLO TÉRMICO GAINSCHA GS-2406T ]
          - Impressão contínua em sequência
          - Itens impressos na própria etiqueta
          - 0 cliques adicionais
```

---

## 3. Especificação dos 3 Módulos de Operação

### Módulo A: Captura Automática de NF-e via Webhook do Bling
- **Problema atual resolvido:** Elimina a necessidade de copiar e colar a chave da NF-e manualmente.
- **Funcionamento:**
  1. No Bling, ao emitir as notas fiscais das vendas do dia, o Bling dispara o webhook `POST /api/webhooks/bling/nfe`.
  2. Nossa API recebe o payload contendo: `numeroPedido`, `chaveAcesso`, `numeroNfe`, `serie` e `linkDanfe`.
  3. O backend localiza o pedido no PocketBase e atualiza automaticamente os campos fiscais.
  4. O pedido muda de status para `faturado_aguardando_envio`.

### Módulo B: Painel de Expedição em Lote no Admin
- **Interface:**
  - Aba ou Visão dedicada: `/admin/expedicao-lote`.
  - Tabela com filtros rápidos: `Somente Pagos + Faturados`.
  - Seleção em massa com 1 clique (`Selecionar todos os 35 pedidos`).
  - Resumo de frete consolidado: Total de frete estimado debitado do Melhor Envio.
  - Botão principal: `[ 📦 Gerar e Imprimir Lote de Fretes ]`.
- **Backend (`POST /api/shipping/gerar-lote`):**
  1. Envia todos os pedidos selecionados no payload da API v2 do Melhor Envio (`POST /api/v2/me/cart`).
  2. Executa a compra única via saldo da carteira (`POST /api/v2/me/shipment/checkout`).
  3. Gera os links e códigos de rastreio de cada um em paralelo.
  4. Atualiza todos os pedidos para status `enviado` com seus respectivos códigos de rastreamento.

### Módulo C: Impressão e Separação de Pacotes (Picking & Packing)

#### Opção 1: Resumo de Itens na Própria Etiqueta Unificada (100x150mm)
Na etiqueta unificada da Avante para a Gainscha GS-2406T, o rodapé do DANFE Simplificado recebe o bloco compacto:
```text
┌──────────────────────────────────────────────────────────┐
│ ITENS DO PACOTE (SEPARAÇÃO):                             │
│ [ ] 1x Conjunto Renda Romance Preto M (REF: 102)         │
│ [ ] 1x Cropped Canelado Gola Alta Branco G (REF: 204)    │
│ [ ] 2x Calcinha Cós Alto Chocolate M (REF: 055)          │
└──────────────────────────────────────────────────────────┘
```
- **Vantagem:** O operador retira a etiqueta do rolo da impressora, lê a listinha impressa na própria etiqueta, pega as peças na bancada, fecha o saquinho e cola a etiqueta. 
- **Tempo médio de expedição:** Menos de 30 segundos por pacote.

#### Opção 2: Romaneio de Onda (Picking List Consolidada)
- O sistema gera 1 folha A4 com a somatória total das peças vendidas no lote:
  - Ex: *15x Calcinhas Chocolate M, 10x Sutiãs Romance G, 8x Pijamas Suede GG*.
- Uma única viagem pelo estoque para recolher todo o lote e levar para a bancada de empacotamento.

#### Opção 3: Bipagem de Conferência Cega (Com Leitor USB de Código de Barras)
- O operador bipa o código do pedido na etiqueta.
- A tela abre a lista do pedido.
- O operador bipa a tag/etiqueta de cada peça.
  - Se estiver certo: bip sonoro positivo ✅.
  - Se for cor ou tamanho errado: alarme sonoro vermelho ❌.
- Eliminação de 100% de erros de envio.

---

## 4. Estrutura de Banco de Dados (PocketBase)

A estrutura atual implementada em 06/11/2026 já comporta essa esteira sem necessidade de migrações estruturais adicionais:
- `transportadora`: Nome da transportadora oficial (ex: Loggi, J&T, Jadlog, Correios).
- `forma_envio`: Nome do serviço exato (ex: Loggi Express, J&T Express Standard).
- `prazo_envio`: Prazo informado ao cliente.
- `servico_frete_id`: ID de serviço Melhor Envio (ex: 31, 33, 1, 2, 3, etc.).
- `chave_nfe`: 44 dígitos da chave SEFAZ.
- `numero_nfe`: Número formatado da nota fiscal (ex: `000016`).
- `etiqueta_url`: URL oficial do PDF gerado pelo Melhor Envio.
- `melhor_envio_id`: ID da compra no Melhor Envio (blindagem anti-duplicidade).
- `itens`: Array JSON com todos os produtos, cores, tamanhos, referências e quantidades.

---

## 5. Roteiro de Implementação Futura (Quando Decidir Ativar)

1. **Fase 1 - Ativação do Webhook Bling:** Criar endpoint `POST /webhooks/bling` e cadastrá-lo nas preferências de API do Bling.
2. **Fase 2 - Inclusão de Itens no Template Térmico:** Inserir a caixinha de itens no HTML da etiqueta unificada (`apps/api/src/routes/shipping.js`).
3. **Fase 3 - Endpoint de Lote e UI:** Criar o seletor com checkboxes na página de pedidos do Admin (`apps/web/src/pages/admin/PedidosPage.jsx`) e a rota `/gerar-lote`.
4. **Fase 4 - Teste Controlado:** Rodar teste com lote simulado de 3 a 5 pedidos para homologar a impressão contínua na Gainscha GS-2406T.

---
*Documento guardado e pronto para servir de base executiva no momento em que as vendas exigirem a esteira em lote.*
