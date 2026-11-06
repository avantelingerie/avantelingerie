const fs = require('fs');

const entry = `

---

## [05/11/2026] - Integração do Pedido PED-004 (Bling ERP, NF-e 000016, Melhor Envio e J&T Express)

### Contexto e Diagnóstico
O lojista realizou a venda real do pedido **PED-004** (Tatiane Albiati, R$ 71,31, Jaguariúna/SP, 2 conjuntos de lingerie) e necessitava da sincronização completa: visualização no Bling, emissão da NF-e, contratação da etiqueta no Melhor Envio com saldo em carteira e impressão térmica na Gainscha GS-2406T.

### Causas Raiz Identificadas e Resolvidas
1. **Fuso Horário no Bling (Pedido invisível no filtro de hoje):**
   - Venda realizada às 21:27 BRT (00:27 UTC do dia seguinte). O código anterior enviava \`new Date().toISOString().split('T')[0]\`, gerando data \`2026-11-06\` no Bling. O filtro padrão do Bling exibia até a data local \`05/11/2026\`.
   - **Solução:** Implementada função \`getBrazilDateString()\` com fuso horário \`America/Sao_Paulo\` em \`apps/api/src/services/blingService.js\`. Pedido atualizado no Bling para \`2026-11-05\` (ID Bling: \`27320328372\`, Número Bling: \`57\`).
2. **Emissão e Autorização da NF-e na SEFAZ:**
   - Emitida NF-e **000016** no Bling e autorizada com sucesso na SEFAZ (Chave de Acesso: \`33261154615037000153550010000000161206888561\`).
3. **Validação de Documento PJ no Melhor Envio API v2:**
   - Ao acionar a contratação, retornava: *"Melhor Envio: O campo from.document deve ter um CPF válido."*
   - **Causa:** Para cadastros PJ, a API v2 do Melhor Envio exige estritamente o CPF de 11 dígitos do titular da conta (\`01065648707\`) em \`from.document\` e o CNPJ da empresa (\`54615037000153\`) em \`from.company_document\`.
   - **Solução:** Corrigido payload do remetente em \`apps/api/src/routes/shipping.js\`.
4. **Mapeamento de Serviço J&T Express:**
   - Serviço estava mapeado para o ID \`17\` (que no Melhor Envio é Correios Mini Envios com restrição de altura máxima de 4cm).
   - **Solução:** Mapeamento corrigido para o ID oficial **\`33\`** (J&T Express Standard).
5. **Compra do Frete e Geração de Etiqueta com Saldo:**
   - Checkout do envio \`a3282ece-7a46-4595-9126-d5fa5a4a00b0\` aprovado via carteira (Compra \`PUR-20261169592545\`, R$ 25,00 debitados do saldo de R$ 78,16).
   - Gerado código de rastreamento oficial J&T Express: **\`888031032322960\`**.
   - Gerada etiqueta oficial do Melhor Envio: \`https://melhorenvio.com.br/portal/imprimir/9Xz0KqY6vuRy\`.
   - Pedido PED-004 atualizado no PocketBase com status \`enviado\` e código de rastreamento oficial.

### Observações do Lojista e Roadmap para a Manhã Seguinte
1. **Rastreio na Loja vs Melhor Rastreio:**
   - No Melhor Rastreio, consta com precisão: *"Adicionado no sistema - Etiqueta criada pronta para coleta/postagem"*.
   - Na página de rastreio interna da loja (\`/rastreio\`), o fallback simulado pulou para *"Objeto em transferência para unidade de distribuição"*.
   - **Ação mapeada:** Calibrar o fallback da rota \`POST /shipping/track\` para exibir *"Etiqueta criada / Em preparação para coleta pela transportadora"* até que a primeira bipagem física ocorra.
2. **Impressão Térmica Gainscha GS-2406T:**
   - O popup da etiqueta unificada renderizou a NF-e antiga 000015 em vez da 000016 autorizada.
   - O lojista solicitou que a tela apresente as orientações de configuração padrão da impressora Gainscha (papel 100x150mm, margens nenhuma, escala 100%) ou abra o PDF pré-formatado da J&T/Melhor Envio.
   - **Ação mapeada:** Vincular os dados da NF-e 000016 na rota da etiqueta unificada e incluir o painel de instruções de impressão térmica direta.
`;

fs.appendFileSync('MEMORIA_TECNICA.md', entry, 'utf8');
console.log('Successfully appended to MEMORIA_TECNICA.md');

