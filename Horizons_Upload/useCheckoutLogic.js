import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { descontosService } from '@/services/descontosService.js';

// Exponential retry helper for network instability (High #29)
const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.warn(`[CheckoutRetry] Operação falhou. Retentando em ${delay}ms... (Erros restantes: ${retries})`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 1.5);
  }
};

export function useCheckoutLogic() {
  const { currentUser } = useAuth();
  const { cart, getCartTotal, getActiveDiscount, getPixBenefitEligibility, removeFromCart, clearCart, getItemPrice } = useCart();

  const [limiteUpgrade, setLimiteUpgrade] = useState(500);

  useEffect(() => {
    descontosService.getConfiguracoes().then(config => {
      setLimiteUpgrade(descontosService.getLimiteUpgrade(config));
    }).catch(err => {
      console.error('[useCheckoutLogic] Erro ao carregar limite de upgrade:', err);
      setLimiteUpgrade(500);
    });
  }, []);

  const [billingAddress, setBillingAddress] = useState({
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  });

  const [isSameAddress, setIsSameAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [shippingOption, setShippingOption] = useState(null);
  const [loadingCep, setLoadingCep] = useState({ billing: false, delivery: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync addresses if toggle is active
  useEffect(() => {
    if (isSameAddress) {
      setDeliveryAddress({ ...billingAddress });
    }
  }, [billingAddress, isSameAddress]);

  const handleAddressChange = (type, field, value) => {
    if (type === 'billing') {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    } else {
      setDeliveryAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCepBlur = async (type) => {
    const address = type === 'billing' ? billingAddress : deliveryAddress;
    const cleanCep = address.cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) return;

    setLoadingCep(prev => ({ ...prev, [type]: true }));
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        const updates = {
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        };

        if (type === 'billing') {
          setBillingAddress(prev => ({ ...prev, ...updates }));
        } else {
          setDeliveryAddress(prev => ({ ...prev, ...updates }));
        }
        toast.success('Endereço encontrado com sucesso!');
      } else {
        toast.error('CEP não encontrado. Verifique e tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao buscar o CEP. Por favor, preencha manualmente.');
    } finally {
      setLoadingCep(prev => ({ ...prev, [type]: false }));
    }
  };

  // --- Core Commercial Logic (Validated & Real-time) ---
  const subtotal = getCartTotal();
  const progressiveDiscount = getActiveDiscount(); // { percent, amount, label }
  const isPixEligible = getPixBenefitEligibility();

  let activeBenefitMessage = null;
  let finalDiscountAmount = 0;
  let benefitType = 'none'; // 'progressive' | 'pix' | 'none'

  // Rule: Apply Best Eligible Benefit, Never Accumulate
  if (progressiveDiscount.amount > 0) {
    activeBenefitMessage = `Benefício aplicado: ${progressiveDiscount.label} OFF Progressivo`;
    finalDiscountAmount = progressiveDiscount.amount;
    benefitType = 'progressive';
  } else if (paymentMethod === 'pix' && isPixEligible) {
    activeBenefitMessage = 'Benefício aplicado: 5% OFF no PIX';
    finalDiscountAmount = subtotal * 0.05;
    benefitType = 'pix';
  }

  const shippingCost = shippingOption ? shippingOption.cost : 0;
  const finalTotal = subtotal - finalDiscountAmount + shippingCost;

  // High #15: Rigorous address fields validation
  const validateAddress = (addr) => {
    if (!addr.cep || !addr.rua || !addr.numero || !addr.bairro || !addr.cidade || !addr.estado) {
      return 'Todos os campos de endereço (CEP, Rua, Número, Bairro, Cidade, Estado) são obrigatórios.';
    }
    const cleanCep = addr.cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      return 'O CEP informado é inválido. Deve conter exatamente 8 dígitos.';
    }
    if (addr.estado.trim().length !== 2) {
      return 'O Estado (UF) deve conter exatamente 2 letras (ex: RJ, SP, MG).';
    }
    if (addr.rua.trim().length < 3) {
      return 'A Rua informada é muito curta.';
    }
    if (addr.cidade.trim().length < 2) {
      return 'A Cidade informada é muito curta.';
    }
    if (addr.bairro.trim().length < 2) {
      return 'O Bairro informado é muito curto.';
    }
    return null;
  };

  // Critical #2 & #16: Build full order payload and save to Pocketbase with retry and double collection fallback
  const finalizeOrder = async () => {
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio.');
      return null;
    }

    const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
    if (isReseller && subtotal < limiteUpgrade) {
      toast.error(`Atenção: O valor mínimo para pedidos de atacado é de R$ ${limiteUpgrade.toFixed(2)}. Seu pedido atual é de R$ ${subtotal.toFixed(2)}.`);
      return null;
    }

    // Run address validations
    const billingError = validateAddress(billingAddress);
    if (billingError) {
      toast.error(`Dados de Faturamento: ${billingError}`);
      return null;
    }

    if (!isSameAddress) {
      const deliveryError = validateAddress(deliveryAddress);
      if (deliveryError) {
        toast.error(`Dados de Entrega: ${deliveryError}`);
        return null;
      }
    }

    setIsSubmitting(true);

    const actualDelivery = isSameAddress ? billingAddress : deliveryAddress;
    const formattedAddress = `${actualDelivery.rua}, ${actualDelivery.numero}${actualDelivery.complemento ? ' - ' + actualDelivery.complemento : ''}, ${actualDelivery.bairro}`;

    // Highly aligned, multi-compatible payload satisfying all schema targets
    const orderPayload = {
      // User IDs
      user_id: currentUser?.id || '',
      usuario_id: currentUser?.id || '',
      cliente_id: currentUser?.id || '',

      // Client details
      cliente_nome: currentUser?.name || currentUser?.nome_completo || 'Consumidor Final',
      cliente_email: currentUser?.email || 'convidado@avantelingerie.com.br',
      cliente_telefone: currentUser?.whatsapp || currentUser?.telefone || '',

      // Financials
      valor_total: finalTotal,
      total: finalTotal,
      valor_desconto: finalDiscountAmount,
      discount: finalDiscountAmount,
      valor_frete: shippingCost,
      shippingCost: shippingCost,
      subtotal: subtotal,

      // Address mapping
      endereco_entrega: formattedAddress,
      cidade: actualDelivery.cidade,
      cep: actualDelivery.cep,
      endereco_faturamento: `${billingAddress.rua}, ${billingAddress.numero}${billingAddress.complemento ? ' - ' + billingAddress.complemento : ''}, ${billingAddress.bairro}`,

      // Payment details
      metodo_pagamento: paymentMethod,
      forma_pagamento: paymentMethod,

      // Items arrays (English/Portuguese camel/snake case alignment)
      items: cart.map(item => ({
        id: item.id,
        name: item.name || item.nome || '',
        quantity: item.quantity,
        price: item.preco_varejo || item.price || 0,
        preco_atacado: item.preco_atacado || item.price_wholesale || 0,
        size: item.selectedSize || '',
        color: item.selectedColor || '',
        image: item.image || ''
      })),
      itens: cart,

      status: 'processando'
    };

    try {
      let createdOrder = null;

      // Try saving in 'pedidos' first with retry logic
      try {
        createdOrder = await withRetry(() => pb.collection('pedidos').create(orderPayload, { $autoCancel: false }));
        console.log('[Checkout] Pedido salvo com sucesso na coleção "pedidos":', createdOrder);
      } catch (err1) {
        console.warn('[Checkout] Coleção "pedidos" falhou ou não existe. Tentando coleção "orders"...', err1);
        // Fallback to 'orders' with retry logic
        try {
          createdOrder = await withRetry(() => pb.collection('orders').create(orderPayload, { $autoCancel: false }));
          console.log('[Checkout] Pedido salvo com sucesso na coleção "orders":', createdOrder);
        } catch (err2) {
          console.error('[Checkout] Falha crítica ao persistir em ambas as coleções:', err2);
          throw new Error('Não foi possível gravar o seu pedido em nosso banco. Por favor, contate o suporte.');
        }
      }

      // Order created successfully! Clear the shopping cart
      clearCart();

      // Return order record ID or generated number for confirmation route
      return createdOrder.id || createdOrder.numero_pedido || `AVL-${Date.now().toString().slice(-6)}`;
    } catch (error) {
      console.error('[Checkout] Erro fatal durante a gravação do pedido:', error);
      toast.error(error.message || 'Erro ao processar o seu pedido. Por favor, tente novamente.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentUser,
    cart,
    subtotal,
    finalTotal,
    finalDiscountAmount,
    activeBenefitMessage,
    benefitType,
    billingAddress,
    deliveryAddress,
    isSameAddress,
    setIsSameAddress,
    handleAddressChange,
    handleCepBlur,
    loadingCep,
    paymentMethod,
    setPaymentMethod,
    shippingCost,
    removeFromCart,
    clearCart,
    isSubmitting,
    finalizeOrder,
    getItemPrice,
    limiteUpgrade
  };
}