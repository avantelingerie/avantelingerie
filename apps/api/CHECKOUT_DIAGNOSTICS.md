# Diagnóstico e Correção - Erro 400 no Checkout (Avante Lingerie)

## PROBLEMA IDENTIFICADO

API retorna erro 400 'Failed to create record.' ao tentar salvar pedido na coleção 'pedidos'. O fluxo é:
1. Cliente deslogado → preenche dados de checkout
2. API cria usuário automaticamente na coleção 'users'
3. API salva pedido na coleção 'pedidos'
4. API gera sessão Stripe

**Causa raiz:** A API não estava autenticada como superuser antes de criar usuários e pedidos, causando erro de permissão 400.

---

## CORREÇÕES IMPLEMENTADAS

### 1. ✅ Autenticação de Superuser

**Arquivo:** `apps/api/src/routes/payment.js`

**Mudanças:**
- Função `authenticateAsSuperuser()` agora é chamada **ANTES** de cada operação crítica
- Usa `PB_SUPERUSER_EMAIL` e `PB_SUPERUSER_PASSWORD` do `.env`
- Garante que API tem privilégios de admin para criar usuários e pedidos
- Logs detalhados para cada etapa

**Código:**
```javascript
const authenticateAsSuperuser = async () => {
  try {
    const email = process.env.PB_SUPERUSER_EMAIL;
    const password = process.env.PB_SUPERUSER_PASSWORD;

    if (!email || !password) {
      throw new Error('PB_SUPERUSER_EMAIL or PB_SUPERUSER_PASSWORD not configured in .env');
    }

    await pb.collection('_superusers').authWithPassword(email, password);
    logger.info('[Auth] Authenticated as superuser successfully');
  } catch (error) {
    logger.error('[Auth] Failed to authenticate as superuser:', error.message);
    throw new Error(`Superuser authentication failed: ${error.message}`);
  }
};
```

### 2. ✅ Validação de Payload

**Função:** `validateOrderPayload(payload)`

**Valida:**
- Campos obrigatórios: `numero_pedido`, `cliente_id`, `cliente_nome`, `cliente_email`, `status`, `valor_total`, `endereco_entrega`, `cidade`, `cep`, `metodo_pagamento`, `itens`
- Tipos numéricos: `valor_total`, `valor_desconto`, `valor_frete` (>= 0)
- Array de itens: não vazio, com estrutura correta
- Cada item: `variacao_id`, `quantidade`, `preco` obrigatórios

**Erro retornado:**
```json
{
  "error": "Missing required fields: cliente_id, cliente_nome"
}
```

### 3. ✅ Tratamento de Erros Melhorado

**Padrão:**
- Input validation (campos faltando) → `res.status(400).json({ error: '...' })`
- Erros de API/servidor → `throw new Error('...')` (capturado por errorMiddleware)
- Logs detalhados com contexto: email, dados do pedido, erros específicos do PocketBase

**Exemplo:**
```javascript
logger.error(`[CreateOrder] Error creating/fetching user: ${errUser.message}`);
if (errUser.response) {
  logger.error(`[CreateOrder] PocketBase error details:`, JSON.stringify(errUser.response));
}
throw new Error(`Erro ao registrar cliente: ${errUser.message}`);
```

### 4. ✅ Rotas de Diagnóstico

#### GET /payment/test-admin-auth
Testa autenticação de superuser.

**Resposta sucesso:**
```json
{
  "success": true,
  "token": "acquired",
  "identity": "admin@example.com"
}
```

**Resposta erro:**
```json
{
  "success": false,
  "error": "Invalid credentials",
  "status": 401
}
```

#### GET /payment/inspect-pedidos
Retorna schema da coleção 'pedidos' e amostra de registro.

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
        "required": true,
        "options": {...}
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
Retorna informações de debug: status de autenticação, estrutura de hooks, logs recentes.

**Resposta:**
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "env": {
    "PB_SUPERUSER_EMAIL": "configured",
    "PB_SUPERUSER_PASSWORD": "configured",
    "STRIPE_SECRET_KEY": "configured",
    "NODE_ENV": "production"
  },
  "auth_status": "authenticated",
  "hooks_files": ["main.pb.js", "orders.pb.js"],
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

## FLUXO DE CHECKOUT CORRIGIDO

### 1. POST /payment/create-order

**Entrada:**
```json
{
  "personalInfo": {
    "nome": "João Silva",
    "email": "joao@example.com",
    "whatsapp": "11999999999"
  },
  "billingAddress": {
    "rua": "Rua A",
    "numero": "123",
    "complemento": "Apt 456",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01310100"
  },
  "deliveryAddress": {...},
  "isSameAddress": true,
  "paymentMethod": "credit_card",
  "shippingCost": 15.50,
  "subtotal": 150.00,
  "finalDiscountAmount": 0,
  "finalTotal": 165.50,
  "cart": [
    {
      "id": "variacao_123",
      "name": "Sutiã Premium",
      "quantity": 2,
      "price": 75.00,
      "selectedSize": "P",
      "selectedColor": "Preto"
    }
  ]
}
```

**Processo:**
1. ✅ Autentica como superuser
2. ✅ Valida entrada (campos obrigatórios)
3. ✅ Busca usuário existente por email
4. ✅ Se não existe, cria novo usuário na coleção 'users'
5. ✅ Gera número sequencial de pedido (PED-001, PED-002, ...)
6. ✅ Prepara payload do pedido com todos os campos obrigatórios
7. ✅ Valida payload antes de salvar
8. ✅ Salva pedido na coleção 'pedidos'
9. ✅ Retorna dados do pedido criado

**Saída sucesso (200):**
```json
{
  "id": "pedido_abc123",
  "numero_pedido": "PED-001",
  "cliente_id": "user_xyz789",
  "valor_total": 165.50,
  "status": "pendente"
}
```

**Saída erro (400 - validação):**
```json
{
  "error": "Informações pessoais incompletas (email e nome obrigatórios)."
}
```

**Saída erro (500 - servidor):**
```json
{
  "error": "Erro ao registrar cliente: Field validation failed"
}
```

### 2. POST /payment/create-checkout-session

**Entrada:**
```json
{
  "orderId": "pedido_abc123"
}
```

**Processo:**
1. ✅ Autentica como superuser
2. ✅ Busca pedido por ID
3. ✅ Carrega chave Stripe do .env ou PocketBase
4. ✅ Cria sessão Stripe com método de pagamento correto
5. ✅ Salva session ID no pedido
6. ✅ Retorna URL de checkout

**Saída sucesso (200):**
```json
{
  "id": "cs_live_abc123",
  "url": "https://checkout.stripe.com/pay/cs_live_abc123"
}
```

---

## VARIÁVEIS DE AMBIENTE NECESSÁRIAS

**Arquivo:** `apps/api/.env`

```env
PORT=3001
CORS_ORIGIN=*

# PocketBase Superuser (CRÍTICO para checkout)
PB_SUPERUSER_EMAIL=admin@example.com
PB_SUPERUSER_PASSWORD=sua_senha_segura

# Stripe (CRÍTICO para pagamento)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Bling (opcional)
BLING_CLIENT_ID=...
BLING_CLIENT_SECRET=...
BLING_REDIRECT_URI=...
BLING_API_TOKEN=...

# Melhor Envio (opcional)
MELHOR_ENVIO_TOKEN=...
```

**⚠️ CRÍTICO:** Se `PB_SUPERUSER_EMAIL` ou `PB_SUPERUSER_PASSWORD` não estiverem configurados, o checkout falhará com erro 401.

---

## TESTE PASSO A PASSO

### Passo 1: Verificar Autenticação

```bash
curl -X GET http://localhost:3001/hcgi/api/payment/test-admin-auth
```

**Esperado:**
```json
{
  "success": true,
  "token": "acquired",
  "identity": "admin@example.com"
}
```

### Passo 2: Inspecionar Schema de Pedidos

```bash
curl -X GET http://localhost:3001/hcgi/api/payment/inspect-pedidos
```

**Esperado:** Lista de campos da coleção 'pedidos' com tipos e requisitos.

### Passo 3: Criar Pedido

```bash
curl -X POST http://localhost:3001/hcgi/api/payment/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "personalInfo": {
      "nome": "Teste Cliente",
      "email": "teste@example.com",
      "whatsapp": "11999999999"
    },
    "billingAddress": {
      "rua": "Rua Teste",
      "numero": "123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310100"
    },
    "deliveryAddress": {
      "rua": "Rua Teste",
      "numero": "123",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "cep": "01310100"
    },
    "isSameAddress": true,
    "paymentMethod": "credit_card",
    "shippingCost": 15.50,
    "subtotal": 150.00,
    "finalDiscountAmount": 0,
    "finalTotal": 165.50,
    "cart": [
      {
        "id": "variacao_123",
        "name": "Sutiã Premium",
        "quantity": 1,
        "price": 150.00
      }
    ]
  }'
```

**Esperado (200):**
```json
{
  "id": "pedido_abc123",
  "numero_pedido": "PED-001",
  "cliente_id": "user_xyz789",
  "valor_total": 165.50,
  "status": "pendente"
}
```

### Passo 4: Criar Sessão Stripe

```bash
curl -X POST http://localhost:3001/hcgi/api/payment/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"orderId": "pedido_abc123"}'
```

**Esperado (200):**
```json
{
  "id": "cs_live_abc123",
  "url": "https://checkout.stripe.com/pay/cs_live_abc123"
}
```

---

## LOGS ESPERADOS

### Sucesso Completo

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
[CreateOrder] Order payload: {...}
[CreateOrder] Order created successfully: pedido_abc123
[StripeCheckout] Starting checkout session creation
[Auth] Authenticated as superuser successfully
[StripeCheckout] Fetching order: pedido_abc123
[StripeCheckout] Order found in pedidos collection
[StripeCheckout] Stripe secret key loaded from .env
[StripeCheckout] Creating Stripe checkout session for order=pedido_abc123, total=165.50 BRL
[StripeCheckout] Stripe session created: cs_live_abc123
[StripeCheckout] Order updated with stripe_session_id
[StripeCheckout] Checkout session created successfully: cs_live_abc123
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
[CreateOrder] PocketBase error details: {"code": 400, "message": "Field validation failed", ...}
[CreateOrder] Error processing order creation: Erro ao registrar cliente: Field validation failed
```

---

## CHECKLIST DE RESOLUÇÃO

- [ ] `PB_SUPERUSER_EMAIL` e `PB_SUPERUSER_PASSWORD` configurados em `.env`
- [ ] `STRIPE_SECRET_KEY` configurado em `.env`
- [ ] Função `authenticateAsSuperuser()` chamada antes de criar usuários
- [ ] Função `authenticateAsSuperuser()` chamada antes de salvar pedidos
- [ ] Validação de payload implementada
- [ ] Logs detalhados para cada etapa
- [ ] Erro 400 resolvido
- [ ] Checkout funciona sem erros
- [ ] Usuário criado automaticamente com email do checkout
- [ ] Pedido salvo com sucesso na coleção 'pedidos'
- [ ] Sessão Stripe gerada com sucesso
- [ ] Status 200 retornado ao frontend com dados do pedido
- [ ] Rotas de diagnóstico funcionando

---

## SUPORTE

Para debugging adicional:

1. **Verificar logs da API:**
   ```bash
   docker logs api-container
   ```

2. **Verificar logs do PocketBase:**
   ```bash
   docker logs pocketbase-container
   ```

3. **Usar rota de debug:**
   ```bash
   curl http://localhost:3001/hcgi/api/payment/debug-info
   ```

4. **Verificar regras de acesso no PocketBase:**
   - Admin > Collections > pedidos > Access Control
   - Garantir que superuser tem permissão de criar/atualizar