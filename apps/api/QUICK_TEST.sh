#!/bin/bash

# QUICK TEST SCRIPT - Avante Lingerie Checkout
# Este script testa o fluxo completo de checkout

API_URL="http://localhost:3001/hcgi/api"

echo "========================================"
echo "TESTE RÁPIDO - CHECKOUT AVANTE LINGERIE"
echo "========================================"
echo ""

# Teste 1: Verificar autenticação de superuser
echo "[1/4] Testando autenticação de superuser..."
echo "GET $API_URL/payment/test-admin-auth"
echo ""

AUTH_RESPONSE=$(curl -s -X GET "$API_URL/payment/test-admin-auth")
echo "Resposta:"
echo "$AUTH_RESPONSE" | jq . 2>/dev/null || echo "$AUTH_RESPONSE"
echo ""

AUTH_SUCCESS=$(echo "$AUTH_RESPONSE" | jq -r '.success' 2>/dev/null)
if [ "$AUTH_SUCCESS" = "true" ]; then
  echo "✅ Autenticação OK"
else
  echo "❌ Autenticação FALHOU"
  echo "Verifique PB_SUPERUSER_EMAIL e PB_SUPERUSER_PASSWORD em .env"
  exit 1
fi
echo ""

# Teste 2: Inspecionar schema de pedidos
echo "[2/4] Inspecionando schema da coleção 'pedidos'..."
echo "GET $API_URL/payment/inspect-pedidos"
echo ""

SCHEMA_RESPONSE=$(curl -s -X GET "$API_URL/payment/inspect-pedidos")
echo "Resposta (primeiros 500 caracteres):"
echo "$SCHEMA_RESPONSE" | jq . 2>/dev/null | head -20 || echo "$SCHEMA_RESPONSE" | head -20
echo ""

SCHEMA_SUCCESS=$(echo "$SCHEMA_RESPONSE" | jq -r '.collection.name' 2>/dev/null)
if [ "$SCHEMA_SUCCESS" = "pedidos" ]; then
  echo "✅ Schema OK"
else
  echo "❌ Schema FALHOU"
  exit 1
fi
echo ""

# Teste 3: Criar pedido
echo "[3/4] Criando pedido de teste..."
echo "POST $API_URL/payment/create-order"
echo ""

ORDER_PAYLOAD='{
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

ORDER_RESPONSE=$(curl -s -X POST "$API_URL/payment/create-order" \
  -H "Content-Type: application/json" \
  -d "$ORDER_PAYLOAD")

echo "Resposta:"
echo "$ORDER_RESPONSE" | jq . 2>/dev/null || echo "$ORDER_RESPONSE"
echo ""

ORDER_ID=$(echo "$ORDER_RESPONSE" | jq -r '.id' 2>/dev/null)
ORDER_NUMBER=$(echo "$ORDER_RESPONSE" | jq -r '.numero_pedido' 2>/dev/null)

if [ ! -z "$ORDER_ID" ] && [ "$ORDER_ID" != "null" ]; then
  echo "✅ Pedido criado com sucesso"
  echo "   ID: $ORDER_ID"
  echo "   Número: $ORDER_NUMBER"
else
  echo "❌ Falha ao criar pedido"
  exit 1
fi
echo ""

# Teste 4: Criar sessão Stripe
echo "[4/4] Criando sessão Stripe..."
echo "POST $API_URL/payment/create-checkout-session"
echo ""

STRIPE_PAYLOAD="{\"orderId\": \"$ORDER_ID\"}"

STRIPE_RESPONSE=$(curl -s -X POST "$API_URL/payment/create-checkout-session" \
  -H "Content-Type: application/json" \
  -d "$STRIPE_PAYLOAD")

echo "Resposta:"
echo "$STRIPE_RESPONSE" | jq . 2>/dev/null || echo "$STRIPE_RESPONSE"
echo ""

STRIPE_URL=$(echo "$STRIPE_RESPONSE" | jq -r '.url' 2>/dev/null)

if [ ! -z "$STRIPE_URL" ] && [ "$STRIPE_URL" != "null" ]; then
  echo "✅ Sessão Stripe criada com sucesso"
  echo "   URL: $STRIPE_URL"
else
  echo "❌ Falha ao criar sessão Stripe"
  exit 1
fi
echo ""

echo "========================================"
echo "✅ TODOS OS TESTES PASSARAM!"
echo "========================================"
echo ""
echo "Resumo:"
echo "  - Autenticação: OK"
echo "  - Schema: OK"
echo "  - Pedido: $ORDER_NUMBER ($ORDER_ID)"
echo "  - Stripe: OK"
echo ""
echo "Próximos passos:"
echo "  1. Verificar logs: docker logs api-container"
echo "  2. Testar checkout completo no frontend"
echo "  3. Validar em produção"
echo ""