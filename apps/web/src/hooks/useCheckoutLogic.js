import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { descontosService } from '@/services/descontosService.js';
import apiServerClient from '@/lib/apiServerClient.js';
import { pedidosService } from '@/services/pedidosService.js';
import { clientesService } from '@/services/clientesService.js';

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

  const [personalInfo, setPersonalInfo] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cpf: ''
  });

  // Sync personal info when currentUser is loaded, or fallback to localStorage drafts
  useEffect(() => {
    if (currentUser) {
      setPersonalInfo({
        nome: currentUser.name || currentUser.nome_completo || '',
        email: currentUser.email || '',
        whatsapp: currentUser.whatsapp || currentUser.telefone || '',
        cpf: currentUser.cpf || currentUser.cnpj || ''
      });
    } else {
      // 1. Try reading from guest checkout cache
      const guestCache = localStorage.getItem('avante_guest_info');
      if (guestCache) {
        try {
          const parsed = JSON.parse(guestCache);
          setPersonalInfo({
            nome: parsed.nome || '',
            email: parsed.email || '',
            whatsapp: parsed.whatsapp || '',
            cpf: parsed.cpf || ''
          });
          return;
        } catch (e) {
          console.warn('[useCheckoutLogic] Erro ao ler avante_guest_info do localStorage', e);
        }
      }

      // 2. Try reading from reseller pre-registration draft
      const resellerDraft = localStorage.getItem('avante_reseller_draft');
      if (resellerDraft) {
        try {
          const parsed = JSON.parse(resellerDraft);
          setPersonalInfo({
            nome: parsed.nome || '',
            email: parsed.email || '',
            whatsapp: parsed.whatsapp || '',
            cpf: parsed.cpf || ''
          });
        } catch (e) {
          console.warn('[useCheckoutLogic] Erro ao ler avante_reseller_draft do localStorage', e);
        }
      }
    }
  }, [currentUser]);

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => {
      const updated = { ...prev, [field]: value };
      if (!currentUser) {
        localStorage.setItem('avante_guest_info', JSON.stringify(updated));
      }
      return updated;
    });
  };

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
  const [shippingOptions, setShippingOptions] = useState([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [loadingCep, setLoadingCep] = useState({ billing: false, delivery: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBoletoActive, setIsBoletoActive] = useState(true);
  const [boletoVencimentoDias, setBoletoVencimentoDias] = useState(3);
  const [localPickupConfig, setLocalPickupConfig] = useState(null);

  // Sync Boleto configs from PocketBase settings
  useEffect(() => {
    const fetchBoletoConfigs = async () => {
      try {
        const records = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "stripe" && (chave_nome = "boleto_ativo" || chave_nome = "boleto_vencimento_dias")',
          $autoCancel: false
        });
        const activeRecord = records.find(r => r.chave_nome === 'boleto_ativo');
        const daysRecord = records.find(r => r.chave_nome === 'boleto_vencimento_dias');

        if (activeRecord) {
          setIsBoletoActive(activeRecord.chave_valor === 'true');
        }
        if (daysRecord && daysRecord.chave_valor) {
          setBoletoVencimentoDias(parseInt(daysRecord.chave_valor, 10) || 3);
        }
      } catch (err) {
        console.warn('[useCheckoutLogic] Erro ao carregar configurações de boleto:', err);
      }
    };
    fetchBoletoConfigs();
  }, []);

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
  
  // Fetch shipping options from backend
  const calculateShipping = useCallback(async (targetCep) => {
    const cleanCep = (targetCep || '').replace(/\D/g, '');
    if (cleanCep.length !== 8 || cart.length === 0) {
      setShippingOptions([]);
      setShippingOption(null);
      setSelectedShippingId(null);
      return;
    }

    setLoadingShipping(true);
    const actualDelivery = isSameAddress ? billingAddress : deliveryAddress;
    try {
      const response = await apiServerClient.fetch('/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toCep: cleanCep,
          items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
          cidade: actualDelivery.cidade,
          estado: actualDelivery.estado
        })
      });

      if (!response.ok) {
        let errMsg = 'Falha ao calcular frete.';
        try {
          const errData = await response.json();
          errMsg = errData.erro || errData.error || errMsg;
        } catch(e) {}
        throw new Error(errMsg);
      }

      const result = await response.json();
      if (result.sucesso && result.options) {
        if (result.localPickupConfig) {
          setLocalPickupConfig(result.localPickupConfig);
        } else {
          setLocalPickupConfig(null);
        }

        setShippingOptions(result.options);
        if (result.options.length > 0) {
          const alreadySelected = result.options.find(opt => opt.id === selectedShippingId);
          const defaultOpt = alreadySelected || result.options.find(opt => opt.isFree) || result.options[0];
          setShippingOption({
            cost: defaultOpt.price,
            method: `${defaultOpt.company} ${defaultOpt.name}`,
            id: defaultOpt.id
          });
          setSelectedShippingId(defaultOpt.id);
        } else {
          setShippingOption(null);
          setSelectedShippingId(null);
        }
      }
    } catch (err) {
      console.error('[CheckoutShipping] Error calculating:', err);
      toast.error(err.message || 'Erro ao calcular as opções de frete.');
    } finally {
      setLoadingShipping(false);
    }
  }, [cart, isSameAddress, billingAddress, deliveryAddress, selectedShippingId]);

  // Recalculate shipping options automatically when active CEP changes
  useEffect(() => {
    const targetCep = isSameAddress ? billingAddress.cep : deliveryAddress.cep;
    const cleanCep = (targetCep || '').replace(/\D/g, '');
    if (cleanCep.length === 8) {
      calculateShipping(cleanCep);
    } else {
      setShippingOptions([]);
      setShippingOption(null);
      setSelectedShippingId(null);
    }
  }, [billingAddress.cep, deliveryAddress.cep, isSameAddress, calculateShipping]);

  // Handle manual shipping option selection
  const selectShippingOption = useCallback((optionId) => {
    const option = shippingOptions.find(opt => opt.id === optionId);
    if (option) {
      setShippingOption({
        cost: option.price,
        method: `${option.company} ${option.name}`,
        id: option.id
      });
      setSelectedShippingId(option.id);
    }
  }, [shippingOptions]);

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

    // Run personal info validation
    if (!personalInfo.nome || !personalInfo.nome.trim()) {
      toast.error('O Nome Completo é obrigatório.');
      return null;
    }
    if (!personalInfo.email || !personalInfo.email.trim() || !personalInfo.email.includes('@')) {
      toast.error('Por favor, informe um e-mail válido.');
      return null;
    }
    if (!personalInfo.whatsapp || !personalInfo.whatsapp.trim()) {
      toast.error('Por favor, informe seu celular ou WhatsApp.');
      return null;
    }
    const cleanCpf = (personalInfo.cpf || '').replace(/\D/g, '');
    if (!cleanCpf || (cleanCpf.length !== 11 && cleanCpf.length !== 14)) {
      toast.error('Por favor, informe um CPF ou CNPJ válido.');
      return null;
    }

    // Run address validations
    const billingError = validateAddress(billingAddress);
    if (billingError) {
      toast.error(`Dados de Faturamento: ${billingError}`);
      return null;
    }

    if (!isSameAddress && selectedShippingId !== 'retirada_local') {
      const deliveryError = validateAddress(deliveryAddress);
      if (deliveryError) {
        toast.error(`Dados de Entrega: ${deliveryError}`);
        return null;
      }
    }

    setIsSubmitting(true);

    const backendPayload = {
      personalInfo,
      billingAddress,
      deliveryAddress,
      isSameAddress,
      paymentMethod,
      shippingCost,
      shippingOption,
      subtotal,
      finalDiscountAmount,
      finalTotal,
      cart: cart.map(item => ({
        id: item.id,
        variacao_id: item.variacao_id || '',
        name: item.name || item.nome || '',
        quantity: item.quantity,
        price: getItemPrice(item),
        preco_atacado: item.preco_atacado || 0,
        selectedSize: item.selectedSize || '',
        selectedColor: item.selectedColor || '',
        sku: item.sku || '',
        image: item.image || item.imagem || ''
      })),
      userId: currentUser?.id || ''
    };

    try {
      let createdOrder = null;

      // Create order via secure Admin-privileged API (bypasses rules & fixes guest checkouts)
      try {
        const response = await apiServerClient.fetch('/payment/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendPayload)
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Falha ao criar o pedido via API.');
        }

        createdOrder = await response.json();
        console.log('[Checkout] Pedido criado com sucesso via API:', createdOrder);
      } catch (err) {
        console.error('[Checkout] Falha crítica ao salvar o pedido via API:', err);
        throw new Error(err.message || 'Não foi possível gravar o seu pedido em nosso banco. Por favor, contate o suporte.');
      }

      // Update total purchase volume for this client record
      if (createdOrder.cliente_id) {
        try {
          await clientesService.updateTotalCompras(createdOrder.cliente_id);
        } catch (errUpdate) {
          console.warn('[Checkout] Erro ao atualizar total de compras do cliente:', errUpdate);
        }
      }

      // Order created successfully!
      // If payment method is card, PIX or boleto, create a Stripe checkout session
      if (paymentMethod === 'credit_card' || paymentMethod === 'pix' || paymentMethod === 'boleto') {
        try {
          const checkoutResponse = await apiServerClient.fetch('/payment/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId: createdOrder.id }),
          });

          if (checkoutResponse.ok) {
            const checkoutSession = await checkoutResponse.json();
            if (checkoutSession.url) {
              clearCart();
              window.location.href = checkoutSession.url;
              return null; // Don't redirect immediately to confirmation page
            }
          } else {
            const errData = await checkoutResponse.json();
            console.error('[Checkout] Falha ao criar sessão de pagamento Stripe:', errData);
            toast.error(errData.error || 'Erro ao iniciar sessão de pagamento.');
            // Cancel order creation since payment session failed
            try {
              await pb.collection('pedidos').delete(createdOrder.id);
            } catch (errDel) {
              console.warn('[Checkout] Erro ao deletar pedido órfão após falha da Stripe:', errDel);
            }
            return null;
          }
        } catch (errStripe) {
          console.error('[Checkout] Erro de rede ao conectar com Stripe:', errStripe);
          toast.error('Erro de conexão ao iniciar o portal de pagamentos.');
          // Cancel order creation since payment session failed
          try {
            await pb.collection('pedidos').delete(createdOrder.id);
          } catch (errDel) {
            console.warn('[Checkout] Erro ao deletar pedido órfão após falha de conexão:', errDel);
          }
          return null;
        }
      }

      // Fallback: Clear the shopping cart and return order ID for immediate redirect
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
    personalInfo,
    handlePersonalInfoChange,
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
    isBoletoActive,
    boletoVencimentoDias,
    shippingCost,
    removeFromCart,
    clearCart,
    isSubmitting,
    finalizeOrder,
    getItemPrice,
    limiteUpgrade,
    shippingOptions,
    loadingShipping,
    selectedShippingId,
    selectShippingOption,
    localPickupConfig
  };
}