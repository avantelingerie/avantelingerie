# Resumo de Implementação - Correção do Erro 400 no Checkout

## O QUE FOI CORRIGIDO

### 1. **Autenticação de Superuser** ✅

A API agora autentica como superuser **ANTES** de cada operação crítica:

```javascript
// Chamado no início de POST /payment/create-order
await authenticateAsSuperuser();

// Chamado no início de POST /payment/create-checkout-session
await authenticateAsSuperuser();

// Chamado em GET /payment/next-order-number
await authenticateAsSuperuser();
```

**Por quê?** Sem autenticação, a API não tem permissão para:
- Criar usuários na coleção 'users'
- Salvar pedidos na coleção 'pedidos'
- Atualizar registros com dados de Stripe

### 2. **Validação de Entrada** ✅

Antes de processar, a API valida:

```javascript
// Validação de campos obrigatórios
if (!personalInfo || !personalInfo.email || !personalInfo.nome) {
  return res.status(400).json({ error: 'Informações pessoais incompletas...' });
}

// Validação de endereço
if (!billingAddress || !billingAddress.rua || !billingAddress.numero...) {
  return res.status(400).json({ error: 'Endereço de cobrança incompleto.' });
}

// Validação de carrinho
if (!cart || !Array.isArray(cart) || cart.length === 0) {
  return res.status(400).json({ error: 'Carrinho vazio.' });
}

// Validação de valor total
if (finalTotal === undefined || typeof finalTotal !== 'number') {
  return res.status(400).json({ error: 'Valor total inválido.' });
}
```

### 3. **Validação de Payload do Pedido** ✅

Antes de salvar no PocketBase, valida estrutura completa:

```javascript
const validateOrderPayload = (payload) => {
  // Campos obrigatórios
  const requiredFields = [
    'numero_pedido', 'cliente_id', 'cliente_nome', 'cliente_email',
    'status', 'valor_total', 'endereco_entrega', 'cidade', 'cep',
    'metodo_pagamento', 'itens'
  ];
  
  // Validação de tipos
  if (typeof payload.valor_total !== 'number' || payload.valor_total < 0) {
    throw new Error('valor_total must be a non-negative number');
  }
  
  // Validação de array de itens
  if (!Array.isArray(payload.itens) || payload.itens.length === 0) {
    throw new Error('itens must be a non-empty array');
  }
};
```

### 4. **Tratamento de Erros Melhorado** ✅

**Padrão correto:**
- Input validation (campos faltando) → `res.status(400).json({ error: '...' })`
- Erros de API/servidor → `throw new Error('...')` (capturado por errorMiddleware)
- Logs detalhados com contexto

```javascript
try {
  // Operação que pode falhar
  const newGuestUser = await pb.collection('users').create({...});
} catch (errUser) {
  logger.error(`[CreateOrder] Error creating/fetching user: ${errUser.message}`);
  if (errUser.response) {
    logger.error(`[CreateOrder] PocketBase error details:`, JSON.stringify(errUser.response));
  }
  throw new Error(`Erro ao registrar cliente: ${errUser.message}`);
}
```

### 5. **Rotas de Diagnóstico** ✅

Três novas rotas para debugging:

#### GET /payment/test-admin-auth
Testa se autenticação de superuser funciona.

```bash
curl http://localhost:3001/hcgi/api/payment/test-admin-auth
```

**Resposta sucesso:**
```json
{
  "success": true,
  "token": "acquired",
  "identity": "admin@pocketbase.local"
}
```

#### GET /payment/inspect-pedidos
Retorna schema da coleção 'pedidos' e amostra de registro.

```bash
curl http://localhost:3001/hcgi/api/payment/inspect-pedidos
```

**Resposta:**
```json
{
  "collection": {
    "id": "...",
    "name": "pedidos",
    "fields": [
      {
        "id": "...",
        "name": "numero_pedido",
        "type": "text",
        "required": true
      },
      ...
    ]
  },
  "sample": {
    "fields": ["id", "numero_pedido", "cliente_id", ...],
    "record": {...}
  }
}
```

#### GET /payment/debug-info
Retorna informações de debug completas.

```bash
curl http://localhost:3001/hcgi/api/payment/debug-info
```

**Resposta:**
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "env": {
    "PB_SUPERUSER_EMAIL": "configured",
    "PB_SUPERUSER_PASSWORD": "configured",
    "STRIPE_SECRET_KEY": "configured"
  },
  "auth_status": "authenticated",
  "rules": {
    "pedidos": {
      "listRule": "@request.auth.id != ''",
      "viewRule": "@request.auth.id != ''",
      "createRule": "@request.auth.id != ''",
      "updateRule": "@request.auth.id != ''",
      "deleteRule": "@request.auth.id != ''"
    }
  },
  "recent_logs": [...]
}
```

---

## FLUXO CORRIGIDO

### POST /payment/create-order

**1. Autentica como superuser**
```javascript
await authenticateAsSuperuser();
```

**2. Valida entrada**
```javascript
if (!personalInfo || !personalInfo.email || !personalInfo.nome) {
  return res.status(400).json({ error: '...' });
}
```

**3. Busca ou cria usuário**
```javascript
const existingUsers = await pb.collection('users').getList(1, 1, {
  filter: `email = "${personalInfo.email}"`,
  $autoCancel: false
});

if (existingUsers.items.length > 0) {
  targetUserId = existingUsers.items[0].id;
} else {
  const newGuestUser = await pb.collection('users').create({...});
  targetUserId = newGuestUser.id;
}
```

**4. Gera número sequencial de pedido**
```javascript
const result = await pb.collection('pedidos').getList(1, 1, {
  sort: '-created',
  $autoCancel: false
});

if (result.items.length > 0) {
  const lastNumber = result.items[0].numero_pedido;
  const match = lastNumber.match(/PED-(\d+)/);
  if (match) {
    const nextNum = parseInt(match[1], 10) + 1;
    numero_pedido = `PED-${nextNum.toString().padStart(3, '0')}`;
  }
}
```

**5. Prepara payload do pedido**
```javascript
const orderPayload = {
  numero_pedido,
  cliente_id: targetUserId,
  cliente_nome: personalInfo.nome,
  cliente_email: personalInfo.email,
  cliente_telefone: personalInfo.whatsapp || '',
  data_pedido: new Date().toISOString(),
  status: 'pendente',
  valor_total: Number(finalTotal) || 0,
  valor_desconto: Number(finalDiscountAmount) || 0,
  valor_frete: Number(shippingCost) || 0,
  endereco_entrega: formattedAddress,
  cidade: actualDelivery.cidade,
  estado: actualDelivery.estado || '',
  cep: actualDelivery.cep,
  metodo_pagamento: paymentMethod === 'credit_card' ? 'credito' : 'pix',
  itens: cart.map(item => ({
    variacao_id: item.id,
    quantidade: Number(item.quantity) || 1,
    preco_unitario: Number(item.price) || 0,
    preco_total: (Number(item.price) || 0) * (Number(item.quantity) || 1),
    tamanho: item.selectedSize || '',
    cor: item.selectedColor || '',
    nome: item.name || ''
  }))
};
```

**6. Valida payload**
```javascript
validateOrderPayload(orderPayload);
```

**7. Salva pedido**
```javascript
const createdOrder = await pb.collection('pedidos').create(orderPayload, { $autoCancel: false });
```

**8. Retorna resposta**
```javascript
res.json({
  id: createdOrder.id,
  numero_pedido: createdOrder.numero_pedido,
  cliente_id: createdOrder.cliente_id,
  valor_total: createdOrder.valor_total,
  status: createdOrder.status
});
```

### POST /payment/create-checkout-session

**1. Autentica como superuser**
```javascript
await authenticateAsSuperuser();
```

**2. Busca pedido**
```javascript
let order = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
```

**3. Carrega chave Stripe**
```javascript
let stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  const configs = await pb.collection('integracoes_config').getFullList({
    filter: 'servico = "stripe" && chave_nome = "sk_live"',
    $autoCancel: false
  });
  if (configs.length > 0) {
    stripeSecretKey = configs[0].chave_valor;
  }
}
```

**4. Cria sessão Stripe**
```javascript
const stripe = new Stripe(stripeSecretKey);
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [{
    price_data: {
      currency: 'brl',
      product_data: { name: `Pedido Avante Lingerie ${order.numero_pedido}` },
      unit_amount: Math.round(order.valor_total * 100)
    },
    quantity: 1
  }],
  mode: 'payment',
  client_reference_id: order.id,
  customer_email: order.cliente_email,
  success_url: `${origin}/order-confirmation/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${origin}/checkout`
});
```

**5. Salva session ID no pedido**
```javascript
await pb.collection('pedidos').update(order.id, { stripe_session_id: session.id }, { $autoCancel: false });
```

**6. Retorna URL de checkout**
```javascript
res.json({
  id: session.id,
  url: session.url
});
```

---

## VARIÁVEIS DE AMBIENTE NECESSÁRIAS

**Arquivo:** `apps/api/.env`

```env
# Servidor
PORT=3001
CORS_ORIGIN=*

# PocketBase Superuser (CRÍTICO)
PB_SUPERUSER_EMAIL=admin@pocketbase.local
PB_SUPERUSER_PASSWORD=admin123456

# Stripe (CRÍTICO)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Bling (opcional)
BLING_CLIENT_ID=...
BLING_CLIENT_SECRET=...
BLING_REDIRECT_URI=...
BLING_API_TOKEN=...
```

**⚠️ CRÍTICO:** Se `PB_SUPERUSER_EMAIL` ou `PB_SUPERUSER_PASSWORD` não estiverem configurados, o checkout falhará com erro 401.

---

## TESTE RÁPIDO

### 1. Verificar autenticação
```bash
curl http://localhost:3001/hcgi/api/payment/test-admin-auth
```

### 2. Inspecionar schema
```bash
curl http://localhost:3001/hcgi/api/payment/inspect-pedidos
```

### 3. Criar pedido
```bash
curl -X POST http://localhost:3001/hcgi/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {"nome": "Teste", "email": "teste@example.com"},
    "billingAddress": {"rua": "Rua A", "numero": "123", "bairro": "Centro", "cidade": "São Paulo", "estado": "SP", "cep": "01310100"},
    "deliveryAddress": {"rua": "Rua A", "numero": "123", "bairro": "Centro", "cidade": "São Paulo", "estado": "SP", "cep": "01310100"},
    "isSameAddress": true,
    "paymentMethod": "credit_card",
    "shippingCost": 15.50,
    "subtotal": 150.00,
    "finalDiscountAmount": 0,
    "finalTotal": 165.50,
    "cart": [{"id": "var_123", "name": "Produto", "quantity": 1, "price": 150.00}]
  }'
```

### 4. Criar sessão Stripe
```bash
curl -X POST http://localhost:3001/hcgi/api/payment/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"orderId": "pedido_id_aqui"}'
```

---

## LOGS ESPERADOS

### Sucesso
```
[CreateOrder] Starting order creation process
[Auth] Authenticated as superuser successfully
[CreateOrder] Input validation passed. Email: teste@example.com, Total: 165.50
[CreateOrder] Searching for existing user with email: teste@example.com
[CreateOrder] Creating new guest user with email: teste@example.com
[CreateOrder] New guest user created successfully: teste@example.com (ID: user_xyz789)
[CreateOrder] Generating sequential order number
[CreateOrder] Generated order number: PED-001
[CreateOrder] Saving order PED-001 to PocketBase as superuser
[CreateOrder] Order created successfully: pedido_abc123
```

### Erro de Autenticação
```
[Auth] Failed to authenticate as superuser: Invalid credentials
[CreateOrder] Error processing order creation: Superuser authentication failed: Invalid credentials
```

### Erro de Validação
```
[CreateOrder] Starting order creation process
[Auth] Authenticated as superuser successfully
[CreateOrder] Input validation passed. Email: teste@example.com, Total: 165.50
[CreateOrder] Error creating/fetching user: Field validation failed
[CreateOrder] PocketBase error details: {"code": 400, "message": "Field validation failed"}
[CreateOrder] Error processing order creation: Erro ao registrar cliente: Field validation failed
```

---

## CHECKLIST

- [x] Autenticação de superuser implementada
- [x] Validação de entrada implementada
- [x] Validação de payload implementada
- [x] Tratamento de erros melhorado
- [x] Rotas de diagnóstico criadas
- [x] Logs detalhados adicionados
- [x] Variáveis de ambiente configuradas
- [x] Documentação completa criada

---

## PRÓXIMOS PASSOS

1. **Testar autenticação:**
   ```bash
   curl http://localhost:3001/hcgi/api/payment/test-admin-auth
   ```

2. **Testar criação de pedido:**
   ```bash
   curl -X POST http://localhost:3001/hcgi/api/payment/create-order ...
   ```

3. **Verificar logs:**
   ```bash
   docker logs api-container
   ```

4. **Testar checkout completo:**
   - Preencher formulário de checkout
   - Verificar se pedido foi criado
   - Verificar se sessão Stripe foi gerada
   - Verificar se status 200 foi retornado

5. **Validar em produção:**
   - Confirmar que `PB_SUPERUSER_EMAIL` e `PB_SUPERUSER_PASSWORD` estão configurados
   - Confirmar que `STRIPE_SECRET_KEY` está configurado
   - Testar fluxo completo de checkout