# Roadmap Técnico: Geração Automática de Etiquetas via Melhor Envio no Admin

**Status:** Planejado para Implementação Futura  
**Autor:** Ada (Arquiteta Líder) & Equipe Avante Lingerie  
**Data:** 03/11/2026  

---

## 1. Objetivo de Negócio
Permitir que a equipe da Avante Lingerie compre, gere e imprima a etiqueta de frete oficial (J&T Express, Jadlog, Correios, Azul Cargo) **direto pelo Painel Administrativo da Loja** com 1 clique, sem precisar acessar manualmente o painel web do Melhor Envio.

Ao clicar em **`[ 🏷️ Gerar Etiqueta no Melhor Envio ]`**:
1. A loja calcula as dimensões e peso dos produtos do pedido.
2. Faz a compra do frete com a transportadora selecionada debitando o saldo ou cartão da conta Melhor Envio.
3. Recebe o código de rastreamento oficial e o link do PDF da etiqueta térmica (100x150mm).
4. Abre a janela de impressão diretamente para a impressora térmica da expedição (**Gainscha GS-2406T**).
5. Preenche automaticamente o campo de rastreio e despacha o pedido, notificando a cliente via E-mail VIP e WhatsApp da Lia.

---

## 2. Pré-requisitos & Integrações
- **Token Bearer Conectado:** O token da Avante Lingerie já está conectado e validado em `integracoes_config` (`servico = "melhor_envio"`).
- **Saldo na Carteira:** A conta do Melhor Envio deve ter saldo na carteira ou cartão de crédito cadastrado para débito automático.
- **Endereço de Origem:** Fábrica Avante Lingerie em Nova Friburgo/RJ (`28623-620`).

---

## 3. Endpoints da API do Melhor Envio (v2)

### Passo 1: Inserir Frete no Carrinho
- **Método:** `POST https://api.melhorenvio.com/v2/me/cart`
- **Headers:** `Authorization: Bearer {token}`, `Content-Type: application/json`
- **Payload:**
  - `service`: ID do serviço selecionado (ex: J&T Standard, Jadlog .Package, PAC, SEDEX).
  - `agency`: ID da agência (se aplicável para Jadlog).
  - `from`: Dados do remetente (Avante Lingerie LTDA, CNPJ, Nova Friburgo).
  - `to`: Dados da destinatária (Nome, CPF, Endereço, CEP, Telefone).
  - `products`: Array de itens com peso (kg), largura, altura, comprimento e valor declarado.
  - `options`: `{ invoice: { key: "CHAVE_DA_NFE_EMITIDA_NO_BLING" } }` (vincula a DANFE emitida!).
- **Retorno:** Objeto com `id` da etiqueta no carrinho (UUID).

### Passo 2: Checkout (Comprar Etiqueta)
- **Método:** `POST https://api.melhorenvio.com/v2/me/shipment/checkout`
- **Payload:** `{ orders: ["UUID_DO_PASSO_1"] }`
- **Retorno:** Status de compra aprovada.

### Passo 3: Gerar Etiqueta
- **Método:** `POST https://api.melhorenvio.com/v2/me/shipment/generate`
- **Payload:** `{ orders: ["UUID_DO_PASSO_1"] }`
- **Retorno:** Status da geração.

### Passo 4: Impressão da Etiqueta
- **Método:** `POST https://api.melhorenvio.com/v2/me/shipment/print`
- **Payload:** `{ orders: ["UUID_DO_PASSO_1"], mode: "private" }`
- **Retorno:** URL do PDF com a etiqueta pronta para impressão térmica.

---

## 4. Próximos Passos de Desenvolvimento
1. Criar rota no backend: `POST /shipping/melhor-envio/gerar-etiqueta`.
2. Adicionar modal de confirmação no painel admin com escolha da transportadora cotada mais barata.
3. Botão "Imprimir Etiqueta Térmica" com popup direto para a impressora configurada.

