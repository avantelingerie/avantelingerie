import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Shield, UserCircle, Truck, CreditCard, ChevronRight, Loader2, X, Mail, Gift, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Label } from '@/components/ui/label.jsx';
import { toast } from 'sonner';

import pb from '@/lib/pocketbaseClient.js';
import { useCheckoutLogic } from '@/hooks/useCheckoutLogic.js';
import CheckoutAddressForm from '@/components/CheckoutAddressForm.jsx';
import CheckoutOrderSummary from '@/components/CheckoutOrderSummary.jsx';
import CheckoutMicroOffer from '@/components/CheckoutMicroOffer.jsx';
import { trackInitiateCheckout } from '@/lib/marketingPixels.js';

// CORRIGIDO: máscara de CPF aplicada durante a digitação (000.000.000-00)
const formatCPF = (value) => {
  return (value || '')
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export default function Checkout() {
  const navigate = useNavigate();
  const {
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
    isSubmitting,
    finalizeOrder,
    getItemPrice,
    limiteUpgrade,
    shippingOptions,
    loadingShipping,
    selectedShippingId,
    selectShippingOption
  } = useCheckoutLogic();

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
  const showWholesaleLock = isReseller && subtotal < limiteUpgrade;

  // Fallback payment method if boleto is disabled dynamically
  React.useEffect(() => {
    if (!isBoletoActive && paymentMethod === 'boleto') {
      setPaymentMethod('credit_card');
    }
  }, [isBoletoActive, paymentMethod, setPaymentMethod]);

  // High #18: Redirect to store after 3s if cart is empty, avoiding static stranded UX
  React.useEffect(() => {
    if (cart.length === 0) {
      toast.info('Seu carrinho está vazio. Redirecionando para as nossas coleções...');
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [cart, navigate]);

  // Track Initiate Checkout
  React.useEffect(() => {
    if (cart.length > 0) {
      trackInitiateCheckout(cart, finalTotal);
    }
  }, [cart, finalTotal]);

  // Guests can purchase directly by filling in the personal data fields
  const [showExitModal, setShowExitModal] = React.useState(false);
  const [exitStep, setExitStep] = React.useState('persuasion'); // 'persuasion' | 'capture' | 'success'
  const [leadEmail, setLeadEmail] = React.useState('');
  const [leadWhatsapp, setLeadWhatsapp] = React.useState('');
  const [savingLead, setSavingLead] = React.useState(false);

  // Exit Intent Detection
  React.useEffect(() => {
    // Check if popup was already shown in this session
    const wasShown = sessionStorage.getItem('avante_exit_popup_shown');
    if (wasShown || cart.length === 0) return;

    const handleMouseLeave = (e) => {
      // Trigger if mouse moves out of the top of the viewport (common close tab gesture)
      if (e.clientY < 15) {
        setShowExitModal(true);
        sessionStorage.setItem('avante_exit_popup_shown', 'true');
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cart]);

  const handleSaveLead = async (e) => {
    e.preventDefault();
    if (!leadEmail.trim() || !leadEmail.includes('@')) {
      toast.error('Por favor, informe um e-mail válido.');
      return;
    }

    setSavingLead(true);
    try {
      await pb.collection('leads_abandono').create({
        nome: personalInfo.nome || 'Visitante Abandono',
        email: leadEmail,
        whatsapp: leadWhatsapp || personalInfo.whatsapp || '',
        valor_carrinho: finalTotal,
        itens_carrinho: cart
      });
      setExitStep('success');
      toast.success('Desconto garantido e carrinho salvo!');
    } catch (err) {
      console.error('[Checkout] Erro ao salvar lead de abandono:', err);
      toast.error('Erro ao salvar seus dados. Mas você ainda pode voltar e concluir!');
    } finally {
      setSavingLead(false);
    }
  };

  const handleFinalizeOrder = async () => {
    const orderId = await finalizeOrder();
    if (orderId) {
      navigate(`/order-confirmation/${orderId}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4 bg-[#FFFBF8] font-sans">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Seu carrinho está vazio</h1>
        <p className="text-gray-400 text-xs font-light mb-6">Estamos te levando de volta para a nossa vitrine de lançamentos...</p>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black border border-[#c59b5f]/30 rounded-2xl px-10 py-6 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md active:scale-95 animate-pulse"
        >
          Voltar para a loja
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFBF8] pb-24 text-gray-800 font-sans">
      <Helmet>
        <title>Finalizar Compra | Avante Lingerie</title>
      </Helmet>

      {/* LUXURY GLOWING TOP BANNER */}
      <div className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden shadow-premium border-b border-[#c59b5f]/15">
        <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.04] mix-blend-overlay"></div>
        {/* Decorative elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-white/50 text-xs w-full justify-center font-medium">
            <Link to="/cart" className="hover:text-[#c59b5f] transition-colors">Carrinho</Link>
            <ChevronRight className="w-3 h-3 text-[#c59b5f]/50" />
            <span className="text-[#c59b5f] font-bold">Pagamento Seguro</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-2.5xl md:text-3.5xl font-serif font-bold text-white flex items-center justify-center gap-3.5">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 select-none">
                {/* Gold seal body with radial gold gradients */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#b3864b] via-[#e5c595] to-[#b3864b] p-[1.5px] shadow-[0_0_12px_rgba(197,155,95,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center relative">
                    {/* Dashed certificate line */}
                    <div className="absolute inset-[2px] rounded-full border border-dashed border-[#c59b5f]/35"></div>
                    <Lock className="w-4.5 h-4.5 text-[#e5c595]" strokeWidth={2} />
                  </div>
                </div>
                {/* Tiny glowing dot representing premium active security */}
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212] shadow-sm animate-ping"></span>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#121212] shadow-sm"></span>
              </div>
              Finalização Segura
            </h1>
            <p className="text-white/70 text-xs md:text-sm mt-2.5 font-light">Ambiente de segurança máxima com criptografia SSL ativa. Seus dados estão 100% protegidos.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-7 flex flex-col gap-8">

            {showWholesaleLock && (
              <div className="bg-red-50 border border-red-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300">
                <div className="flex gap-4 items-start">
                  <span className="text-red-500 text-2xl">⚠️</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900 text-sm uppercase">Pedido abaixo do mínimo de atacado</h4>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      Como revendedora oficial, o valor mínimo do seu pedido de atacado deve ser de <strong>R$ {limiteUpgrade.toFixed(2)}</strong>.
                      Seu carrinho atual é de <strong>R$ {subtotal.toFixed(2)}</strong>. Por favor, retorne ao carrinho para completar seu pedido ou alterar para varejo.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button
                        onClick={() => navigate('/cart')}
                        className="bg-[#3A2E2A] hover:bg-[#2A1E1A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl h-auto"
                      >
                        Voltar ao Carrinho
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IDENTIFICATION & PERSONAL INFO SECTION */}
            <div className="bg-white border border-[#c59b5f]/15 border-l-4 border-l-[#c59b5f] rounded-3xl p-6 md:p-8 shadow-premium-sm transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.04)]">
              {currentUser ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/20 flex items-center justify-center text-[#c59b5f]">
                      <UserCircle className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg font-serif font-bold text-gray-950">Conta Autenticada</h2>
                      <p className="text-xs text-gray-500 mt-1 font-light">
                        Comprando como <strong>{personalInfo.nome}</strong> ({personalInfo.email}).
                      </p>
                      {(!personalInfo.cpf || personalInfo.cpf.replace(/\D/g, '').length !== 11) && (
                        <div className="mt-4 flex flex-col gap-1.5 w-full sm:w-80">
                          <Label htmlFor="auth-cpf" className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">⚠️ CPF Obrigatório para Nota Fiscal</Label>
                          <input
                            id="auth-cpf"
                            type="text"
                            inputMode="numeric"
                            placeholder="000.000.000-00"
                            value={personalInfo.cpf || ''}
                            onChange={(e) => handlePersonalInfoChange('cpf', formatCPF(e.target.value))}
                            className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-amber-900"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    <Shield className="w-3.5 h-3.5" strokeWidth={2} /> Sessão Ativa
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-base md:text-lg font-serif font-bold text-gray-950">Dados Pessoais</h2>
                      <p className="text-xs text-gray-400 font-light mt-0.5">Informe seus dados para prosseguir com o pagamento seguro.</p>
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => navigate('/login', { state: { from: { pathname: '/checkout' } } })}
                      className="border border-[#c59b5f]/30 text-gray-800 hover:bg-[#121212] hover:text-white rounded-2xl py-4 px-6 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 h-auto"
                    >
                      Já tenho cadastro
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="personal-nome" className="text-xs font-bold text-gray-750 uppercase tracking-wider">Nome Completo</Label>
                      <input
                        id="personal-nome"
                        type="text"
                        placeholder="Nome e Sobrenome"
                        value={personalInfo.nome}
                        onChange={(e) => handlePersonalInfoChange('nome', e.target.value)}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b5f]/30 transition-all text-gray-900"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="personal-email" className="text-xs font-bold text-gray-750 uppercase tracking-wider">E-mail</Label>
                      <input
                        id="personal-email"
                        type="email"
                        placeholder="exemplo@email.com"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b5f]/30 transition-all text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="personal-whatsapp" className="text-xs font-bold text-gray-750 uppercase tracking-wider">WhatsApp / Celular</Label>
                      <input
                        id="personal-whatsapp"
                        type="text"
                        placeholder="(00) 00000-0000"
                        value={personalInfo.whatsapp}
                        onChange={(e) => handlePersonalInfoChange('whatsapp', e.target.value)}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b5f]/30 transition-all text-gray-900"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="personal-cpf" className="text-xs font-bold text-gray-750 uppercase tracking-wider">CPF</Label>
                      <input
                        id="personal-cpf"
                        type="text"
                        inputMode="numeric"
                        placeholder="000.000.000-00"
                        value={personalInfo.cpf || ''}
                        onChange={(e) => handlePersonalInfoChange('cpf', formatCPF(e.target.value))}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b5f]/30 transition-all text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BILLING ADDRESS SECTION */}
            <CheckoutAddressForm
              type="billing"
              title="Endereço de Faturamento"
              data={billingAddress}
              onChange={handleAddressChange}
              onCepBlur={handleCepBlur}
              isLoading={loadingCep.billing}
            />

            {/* TOGGLE SAME ADDRESS SECTION */}
            <div className="bg-white border border-[#c59b5f]/15 rounded-3xl p-6 md:p-8 shadow-premium-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.04)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="same-address-toggle" className="text-base font-serif font-bold text-gray-950 cursor-pointer">
                    Endereço de Entrega
                  </Label>
                  <span className="text-xs text-gray-400 font-light mt-0.5">O pedido será entregue no mesmo endereço de faturamento?</span>
                </div>
                <Switch
                  id="same-address-toggle"
                  checked={isSameAddress}
                  onCheckedChange={setIsSameAddress}
                  className="data-[state=checked]:bg-[#c59b5f]"
                />
              </div>

              {!isSameAddress && (
                <div className="pt-6 border-t border-gray-100 mt-2">
                  <CheckoutAddressForm
                    type="delivery"
                    title="Onde devemos entregar?"
                    data={deliveryAddress}
                    onChange={handleAddressChange}
                    onCepBlur={handleCepBlur}
                    isLoading={loadingCep.delivery}
                  />
                </div>
              )}
            </div>

            {/* SHIPPING OPTIONS SECTION */}
            <div className="bg-white border border-[#c59b5f]/15 rounded-3xl p-6 md:p-8 shadow-premium-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.04)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/20 flex items-center justify-center text-[#c59b5f]">
                  <Truck className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-serif font-bold text-gray-950">Opções de Frete</h3>
              </div>

              {loadingShipping ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-[#c59b5f]" />
                  <p className="text-xs text-gray-400 font-light">Calculando opções de envio via Melhor Envio...</p>
                </div>
              ) : shippingOptions.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {shippingOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => selectShippingOption(option.id)}
                      className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 flex items-center justify-between gap-4 ${selectedShippingId === option.id
                          ? 'border-[#c59b5f] bg-[#c59b5f]/5 shadow-premium-sm scale-[1.01]'
                          : 'border-gray-100 hover:border-[#c59b5f]/30 hover:bg-[#FFFBF8]'
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedShippingId === option.id ? 'border-[#c59b5f]' : 'border-gray-300'
                          }`}>
                          {selectedShippingId === option.id && <div className="w-2.5 h-2.5 rounded-full bg-[#c59b5f]" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 text-sm tracking-wide">
                            {option.company} - {option.name}
                          </span>
                          <span className="text-xs text-gray-400 font-light mt-0.5">
                            Prazo estimado: {option.delivery_time || option.delivery_range} dias úteis
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        {option.price === 0 || option.isFree ? (
                          <span className="text-sm font-extrabold text-green-600 uppercase tracking-wider">Grátis</span>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(option.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFFBF8] p-6 rounded-2xl text-center text-xs text-gray-400 border border-dashed border-[#c59b5f]/25 font-light">
                  Insira o CEP de entrega acima para carregar as opções de envio disponíveis.
                </div>
              )}
            </div>

            {/* PAYMENT METHODS SECTION */}
            <div className="bg-white border border-[#c59b5f]/15 rounded-3xl p-6 md:p-8 shadow-premium-sm flex flex-col transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.04)]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/20 flex items-center justify-center text-[#c59b5f]">
                  <CreditCard className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-serif font-bold text-gray-950">Forma de Pagamento</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => !isSubmitting && setPaymentMethod('credit_card')}
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''} ${paymentMethod === 'credit_card' ? 'border-[#c59b5f] bg-[#c59b5f]/5 shadow-premium-sm scale-[1.01]' : 'border-gray-100 hover:border-[#c59b5f]/30 hover:bg-[#FFFBF8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'credit_card' ? 'border-[#c59b5f]' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit_card' && <div className="w-2.5 h-2.5 rounded-full bg-[#c59b5f]" />}
                    </div>
                    <span className="font-bold text-gray-900 text-sm tracking-wide">Cartão de Crédito</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light mt-2 ml-8">Até 6x sem juros</p>
                </div>

                <div
                  onClick={() => !isSubmitting && setPaymentMethod('pix')}
                  className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''} ${paymentMethod === 'pix' ? 'border-[#c59b5f] bg-[#c59b5f]/5 shadow-premium-sm scale-[1.01]' : 'border-gray-100 hover:border-[#c59b5f]/30 hover:bg-[#FFFBF8]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'pix' ? 'border-[#c59b5f]' : 'border-gray-300'}`}>
                      {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-[#c59b5f]" />}
                    </div>
                    <span className="font-bold text-gray-900 text-sm tracking-wide">PIX</span>
                  </div>
                  <p className="text-xs text-[#c59b5f] font-extrabold mt-2 ml-8 uppercase tracking-widest">5% OFF</p>
                </div>

                {isBoletoActive && (
                  <div
                    onClick={() => !isSubmitting && setPaymentMethod('boleto')}
                    className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''} ${paymentMethod === 'boleto' ? 'border-[#c59b5f] bg-[#c59b5f]/5 shadow-premium-sm scale-[1.01]' : 'border-gray-100 hover:border-[#c59b5f]/30 hover:bg-[#FFFBF8]'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'boleto' ? 'border-[#c59b5f]' : 'border-gray-300'}`}>
                        {paymentMethod === 'boleto' && <div className="w-2.5 h-2.5 rounded-full bg-[#c59b5f]" />}
                      </div>
                      <span className="font-bold text-gray-900 text-sm tracking-wide">Boleto</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light mt-2 ml-8">
                      Vencimento em {boletoVencimentoDias} {parseInt(boletoVencimentoDias, 10) === 1 ? 'dia' : 'dias'}
                    </p>
                  </div>
                )}
              </div>

              {paymentMethod === 'boleto' ? (
                <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-5 flex gap-4 text-xs text-amber-800 leading-relaxed font-light mt-6">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div className="text-left">
                    <strong className="block font-serif text-sm font-bold text-amber-900 mb-1">Aviso de Compensação:</strong>
                    O boleto bancário pode levar **de 1 a 3 dias úteis** para ser compensado pelo sistema.
                    Seu pedido será preparado e enviado somente após a confirmação automática do pagamento pela Stripe.
                    O envio de comprovantes de pagamento não antecipa a liberação do pedido.
                  </div>
                </div>
              ) : (
                <div className="bg-[#FFFBF8] p-5 rounded-2xl text-center text-xs text-gray-400 border border-dashed border-[#c59b5f]/25 font-light mt-6 opacity-70">
                  Formulário de pagamento seguro integrado com a plataforma de pagamentos Stripe.
                </div>
              )}
            </div>

          </div>

          {/* STICKY ORDER SUMMARY COLUMN */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 flex flex-col">

              <CheckoutMicroOffer />

              <CheckoutOrderSummary
                cart={cart}
                subtotal={subtotal}
                finalTotal={finalTotal}
                finalDiscountAmount={finalDiscountAmount}
                activeBenefitMessage={activeBenefitMessage}
                benefitType={benefitType}
                shippingCost={shippingCost}
                onRemove={removeFromCart}
                getItemPrice={getItemPrice}
              />

              <Button
                size="lg"
                onClick={handleFinalizeOrder}
                disabled={isSubmitting || showWholesaleLock}
                className="w-full mt-6 bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black border border-[#c59b5f]/30 rounded-2xl py-7.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 text-[#c59b5f] animate-spin" />
                ) : (
                  <Lock className="w-4 h-4 mr-2 text-[#c59b5f] group-hover:text-black transition-colors" />
                )}
                {isSubmitting ? 'PROCESSANDO PEDIDO...' : showWholesaleLock ? 'MÍNIMO DE ATACADO NÃO ATINGIDO' : 'CONCLUIR COMPRA'}
              </Button>

              <p className="text-[10px] text-gray-400 font-light text-center mt-3.5 px-4 leading-normal max-w-sm mx-auto">
                Pagamento processado com criptografia e segurança de nível bancário pela <strong className="text-gray-600 font-semibold">Stripe</strong>. Seus dados de cartão estão 100% protegidos.
              </p>

              {/* SECURITY CERTIFICATE BADGES */}
              <div className="flex items-center justify-center gap-4 mt-5 flex-wrap">
                <div className="flex items-center gap-2 border border-[#c59b5f]/20 bg-[#c59b5f]/5 text-gray-800 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-premium-sm">
                  <Shield className="w-4 h-4 text-[#c59b5f]" strokeWidth={1.5} /> 100% Seguro
                </div>
                <div className="flex items-center gap-2 border border-[#c59b5f]/20 bg-[#c59b5f]/5 text-gray-800 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider shadow-premium-sm">
                  <Lock className="w-4 h-4 text-[#c59b5f]" strokeWidth={1.5} /> Criptografia SSL
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

       {/* PERSUASIVE EXIT INTENT POPUP (SHOPEE STYLE - CONVERSION ORIENTED) */}
      {showExitModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
          
          <div className="relative w-full max-w-md overflow-visible rounded-3xl bg-white p-[3px] shadow-[0_20px_50px_rgba(255,102,0,0.2)] animate-scale-up border border-[#ff6600]/20">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowExitModal(false)}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-300 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Lia Image Popping Out */}
            <div className="absolute -top-[120px] -left-8 w-44 h-44 z-20 pointer-events-none drop-shadow-xl animate-bounce-slow flex justify-center items-end hidden sm:flex">
              <img 
                src="/imagens/lia_avatar.png" 
                alt="Lia Consultora" 
                className="w-full h-full object-contain object-bottom"
              />
            </div>
            {/* Mobile version of Lia */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-28 h-28 z-20 pointer-events-none drop-shadow-xl animate-bounce-slow flex justify-center items-end sm:hidden">
              <img 
                src="/imagens/lia_avatar.png" 
                alt="Lia Consultora" 
                className="w-full h-full object-contain object-bottom"
              />
            </div>

            <div className="bg-white rounded-[22px] p-6 pt-14 md:p-8 md:pt-10 flex flex-col items-center text-center relative z-10 overflow-hidden">
              
              {/* Top Banner (Shopee Style) */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#ff6600] to-[#ff9900]"></div>

              {exitStep === 'persuasion' && (
                <div className="flex flex-col items-center mt-2">
                  <div className="flex items-center gap-2 mb-3 bg-[#fff0e6] px-4 py-1.5 rounded-full border border-[#ff6600]/20">
                    <Gift className="w-4 h-4 text-[#ff6600]" strokeWidth={2.5} />
                    <span className="text-[#ff6600] font-black text-[11px] uppercase tracking-wider">Presente Liberado</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3">
                    ESPERE! NÃO VÁ EMBORA!
                  </h3>

                  <p className="text-sm font-medium text-gray-600 leading-relaxed mb-6 max-w-sm">
                    A Lia separou <strong className="text-[#ff6600] font-black text-base">5% de Desconto Adicional no PIX</strong> que expira em instantes. Garanta o melhor preço de fábrica agora!
                  </p>

                  <div className="flex flex-col w-full gap-3">
                    <Button
                      type="button"
                      onClick={() => setShowExitModal(false)}
                      className="w-full bg-gradient-to-r from-[#ff6600] to-[#ff8c00] hover:from-[#e65c00] hover:to-[#ff7b00] text-white font-extrabold text-xs tracking-wider uppercase py-6 rounded-2xl shadow-xl shadow-[#ff6600]/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border-b-4 border-[#cc5200]"
                    >
                      🎁 QUERO MEU DESCONTO AGORA
                    </Button>

                    <button
                      type="button"
                      onClick={() => setExitStep('capture')}
                      className="text-[11px] text-gray-400 hover:text-gray-600 underline font-semibold transition-colors mt-2"
                    >
                      Salvar meu carrinho para depois
                    </button>
                  </div>
                </div>
              )}

              {exitStep === 'capture' && (
                <div className="flex flex-col items-center mt-2">
                  <div className="w-14 h-14 rounded-full bg-[#fff0e6] border border-[#ff6600]/20 flex items-center justify-center mb-4 text-[#ff6600]">
                    <Mail className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-2">
                    Salvar Carrinho & Cupom
                  </h3>
                  <p className="text-xs font-medium text-gray-500 leading-relaxed mb-6 max-w-xs">
                    Insira seu contato. Nós guardamos suas lingeries reservadas e te enviamos o link do carrinho com desconto por e-mail/WhatsApp!
                  </p>

                  <form onSubmit={handleSaveLead} className="flex flex-col w-full gap-3 text-left">
                    <div className="flex flex-col gap-1.5 w-full">
                      <Label htmlFor="lead-email" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Seu E-mail principal</Label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        placeholder="exemplo@email.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6600]/30 transition-all text-gray-900 placeholder-gray-400 w-full font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 w-full">
                      <Label htmlFor="lead-whatsapp" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">WhatsApp / Celular (Opcional)</Label>
                      <input
                        id="lead-whatsapp"
                        type="text"
                        placeholder="(00) 00000-0000"
                        value={leadWhatsapp}
                        onChange={(e) => setLeadWhatsapp(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6600]/30 transition-all text-gray-900 placeholder-gray-400 w-full font-medium"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={savingLead}
                      className="w-full mt-2 bg-gradient-to-r from-[#ff6600] to-[#ff8c00] hover:from-[#e65c00] hover:to-[#ff7b00] text-white font-extrabold text-xs tracking-wider uppercase py-6 rounded-2xl shadow-xl shadow-[#ff6600]/20 transition-all duration-300 disabled:opacity-50 border-b-4 border-[#cc5200]"
                    >
                      {savingLead ? 'SALVANDO SEUS DADOS...' : '🔥 Garantir Desconto'}
                    </Button>
                  </form>
                </div>
              )}

              {exitStep === 'success' && (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mb-6 text-green-500">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">Tudo Certo!</h3>
                  <p className="text-sm font-medium text-gray-600 mb-8 max-w-xs leading-relaxed">
                    Seu carrinho e desconto estão garantidos. Te enviaremos o link em breve!
                  </p>
                  <Button
                    onClick={() => setShowExitModal(false)}
                    className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs tracking-wider uppercase py-6 rounded-2xl shadow-lg transition-all"
                  >
                    Voltar para Loja
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}