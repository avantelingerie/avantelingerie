# ANÁLISE COMPLETA DE REGRAS PIX - AVANTE LINGERIE

## RESUMO EXECUTIVO
A auditoria na base de código revela que o pagamento via PIX na plataforma Avante Lingerie possui uma regra de negócio estrita de **exclusividade mútua (não-cumulatividade)** em relação aos descontos progressivos. O PIX atua como um benefício de entrada (5% OFF) para clientes que ainda não atingiram o valor mínimo necessário para ativar as faixas de desconto progressivo (atacado ou varejo). O método de pagamento PIX está sempre disponível para seleção no checkout, mas o *desconto* atrelado a ele possui travas de elegibilidade dinâmicas baseadas no perfil do usuário e no subtotal do carrinho.

---

## REGRA PIX PARA VAREJO (B2C)
*   **Regra Exata:** O cliente de varejo recebe **5% de desconto** no valor total dos produtos ao selecionar PIX, **SE E SOMENTE SE** o subtotal do carrinho for inferior à primeira faixa de desconto progressivo.
*   **Restrições e Validações:**
    *   O desconto PIX não se acumula com o desconto progressivo. A lógica no `useCheckoutLogic.js` prioriza o desconto progressivo (`progressiveDiscount.amount > 0`).
    *   A elegibilidade é calculada no `useCart.js` (`getPixBenefitEligibility`), verificando se o total é menor que a faixa mínima (fallback padrão: R$ 300,00).
*   **Permissões/Bloqueios:**
    *   Permitido selecionar PIX em qualquer valor de compra.
    *   Bloqueado o desconto de 5% se o carrinho atingir R$ 300,00 (pois o cliente passa a ganhar 15% OFF Progressivo, que substitui o PIX).

---

## REGRA PIX PARA REVENDEDOR (B2B)
*   **Regra Exata:** O cliente revendedor (atacado) recebe **5% de desconto** no valor total dos produtos (já com preço de atacado aplicado) ao selecionar PIX, **SE E SOMENTE SE** o subtotal do carrinho for inferior à primeira faixa de desconto progressivo extra do atacado.
*   **Restrições e Validações:**
    *   Assim como no varejo, não há cumulatividade. Se o revendedor atingir a faixa de bônus extra (ex: 10% extra acima de R$ 1500,00), o desconto de 5% do PIX é desativado e substituído pelo benefício maior.
    *   A elegibilidade (`getPixBenefitEligibility`) usa um fallback diferente para revendedores: o limite é R$ 1500,00.
*   **Permissões/Bloqueios:**
    *   Permitido selecionar PIX em qualquer valor.
    *   Bloqueado o desconto de 5% se o carrinho atingir R$ 1500,00 (pois o revendedor passa a ganhar 10% OFF Extra Progressivo).

---

## DIFERENÇAS ENTRE VAREJO E REVENDEDOR
A principal diferença reside no **teto de elegibilidade** para o desconto PIX, que é dinamicamente ajustado com base no perfil comercial (`commercial_profile`):
1.  **Teto Varejo:** O desconto PIX de 5% é válido para compras de **R$ 0,01 até R$ 299,99**. A partir de R$ 300,00, entra o desconto progressivo (15%).
2.  **Teto Revendedor:** O desconto PIX de 5% é válido para compras de **R$ 0,01 até R$ 1499,99** (calculado sobre o preço de atacado). A partir de R$ 1500,00, entra o desconto progressivo extra (10%).
3.  **Base de Cálculo:** Para o varejo, os 5% incidem sobre o `preco_varejo`. Para o revendedor, os 5% incidem sobre o `preco_atacado`.

---

## ARQUIVOS ENVOLVIDOS E LÓGICA EXATA

### 1. `apps/web/src/hooks/useCart.js`
*   **Linhas 188-201 (`getPixBenefitEligibility`):**
    *   *Lógica:* Determina se o PIX é elegível. Busca as faixas de desconto do banco de dados baseadas no perfil (`reseller` ou `retail`). Se o total for menor que a menor faixa (`minTier`), retorna `true`.
    *   *Fallback:* Se não houver faixas no banco, usa `1500` para revendedor e `300` para varejo.

### 2. `apps/web/src/hooks/useCheckoutLogic.js`
*   **Linhas 85-96 (Lógica de Aplicação de Benefício):**
    *   *Lógica:* `Rule: Apply Best Eligible Benefit, Never Accumulate`.
    *   Se `progressiveDiscount.amount > 0`, aplica o progressivo (`benefitType = 'progressive'`).
    *   Senão, se `paymentMethod === 'pix' && isPixEligible`, aplica 5% (`finalDiscountAmount = subtotal * 0.05`, `benefitType = 'pix'`).

### 3. `apps/web/src/pages/Checkout.jsx`
*   **Linhas 168-180 (Seleção de Método de Pagamento):**
    *   *Lógica:* Renderiza o botão de seleção do PIX. Define `setPaymentMethod('pix')`. Exibe a tag estática "5% de Desconto Extra".

### 4. `apps/web/src/components/CheckoutOrderSummary.jsx`
*   **Linhas 58-72 (Exibição do Desconto):**
    *   *Lógica:* Renderiza o bloco de desconto aplicado. Se `benefitType === 'pix'`, exibe a mensagem "Benefício aplicado: 5% OFF no PIX" (passada via props do `useCheckoutLogic`).

### 5. `apps/web/src/components/PixInfoBlock.jsx`
*   **Linhas 6-25 (Componente Visual):**
    *   *Lógica:* Recebe a prop `isEligible`. Se `true`, exibe o banner verde informando "Benefício disponível: 5% OFF no PIX à vista".

### 6. `apps/web/src/pages/CartPage.jsx`
*   **Linhas 168 & 171 (Injeção de Elegibilidade):**
    *   *Lógica:* Chama `isPixEligible = getPixBenefitEligibility()` e passa para o `<PixInfoBlock isEligible={isPixEligible} />` e `<OrderSummary pixEligible={isPixEligible} />`.

### 7. `apps/web/src/pages/ProductPage.jsx`
*   **Linha 511 (Inconsistência Visual):**
    *   *Lógica:* Renderiza `<PixInfoBlock isEligible={true} />` de forma estática (hardcoded).

### 8. `apps/web/src/services/descontosService.js`
*   **Linhas 35-36 (`seedTestData`):**
    *   *Lógica:* Define a configuração padrão no banco de dados: `desconto_pix_ativo: true`, `desconto_pix_percentual: 5`.

---

## GAPS E INCONSISTÊNCIAS IDENTIFICADAS

1.  **Falso Positivo na ProductPage (MÉDIO):**
    *   No arquivo `apps/web/src/pages/ProductPage.jsx` (Linha 511), o componente `<PixInfoBlock isEligible={true} />` está com a propriedade `true` fixada no código (hardcoded).
    *   *Problema:* Se um cliente já tem R$ 500,00 no carrinho (já ativou o progressivo e perdeu a elegibilidade do PIX), ao entrar na página de um produto, ele ainda verá o banner "5% OFF no PIX", o que pode gerar frustração no checkout quando o desconto não for aplicado (pois o progressivo de 15% será aplicado no lugar).
    *   *Solução Recomendada:* Alterar para `<PixInfoBlock isEligible={getPixBenefitEligibility()} />` utilizando o hook `useCart`.

2.  **Hardcode do Percentual de 5% (BAIXO):**
    *   No arquivo `apps/web/src/hooks/useCheckoutLogic.js` (Linha 94), o cálculo do desconto está fixo em `subtotal * 0.05`.
    *   *Problema:* Embora o `descontosService.js` preveja um campo `desconto_pix_percentual` no banco de dados, o frontend não está consumindo esse valor dinâmico, assumindo sempre 5%.
    *   *Solução Recomendada:* Buscar o percentual de PIX das configurações globais (`configuracoes.desconto_pix_percentual`) e aplicar no cálculo.