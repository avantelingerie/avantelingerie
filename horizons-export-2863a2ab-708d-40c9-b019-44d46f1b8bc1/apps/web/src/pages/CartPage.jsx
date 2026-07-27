
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ChevronRight, Star, Shield, Lock, Crown, CheckCircle2, TrendingUp, Sparkles, X, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { descontosService } from '@/services/descontosService.js';

import CartItem from '@/components/CartItem.jsx';
import ProgressiveDiscountBar from '@/components/ProgressiveDiscountBar.jsx';
import PixInfoBlock from '@/components/PixInfoBlock.jsx';
import OrderSummary from '@/components/OrderSummary.jsx';
import SmartShipping from '@/components/SmartShipping.jsx';
import UpsellSection from '@/components/UpsellSection.jsx';
import TrustSection from '@/components/TrustSection.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import { Button } from '@/components/ui/button.jsx';

export default function CartPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateUser, signup, login } = useAuth();
  
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    addToCart,
    getCartTotal,
    getActiveDiscount,
    getNextTierInfo,
    getPixBenefitEligibility,
    getItemPrice
  } = useCart();

  const [shipping, setShipping] = useState({ cost: 0, method: null });
  const [configuracoes, setConfiguracoes] = useState(null);
  
  // Upgrade Modal states
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasDismissedUpgrade, setHasDismissedUpgrade] = useState(false);
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [errorModal, setErrorModal] = useState('');
  
  const [upgradeFormData, setUpgradeFormData] = useState({
    name: '',
    whatsapp: '',
    cpf: '',
    email: '',
    password: ''
  });

  // Incomplete Reseller Modal states
  const [showIncompletoCheckoutModal, setShowIncompletoCheckoutModal] = useState(false);
  const [incompletoCpf, setIncompletoCpf] = useState('');
  const [isSubmittingIncompleto, setIsSubmittingIncompleto] = useState(false);
  const [errorIncompleto, setErrorIncompleto] = useState('');

  // Load configuration for pricing rules
  useEffect(() => {
    descontosService.getConfiguracoes()
      .then(config => setConfiguracoes(config))
      .catch(err => console.error('[CartPage] Erro ao carregar configurações:', err));
  }, []);

  const subtotal = getCartTotal();
  const discountInfo = getActiveDiscount();
  const nextTierInfo = getNextTierInfo();
  const isPixEligible = getPixBenefitEligibility();
  
  const total = Math.max(0, subtotal - discountInfo.amount + shipping.cost);

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
  const limiteUpgrade = descontosService.getLimiteUpgrade(configuracoes);

  // Calculate retail and wholesale subtotals for savings display
  const retailSubtotal = cart.reduce((sum, item) => {
    if (!item) return sum;
    const cleanPrice = String(item.preco_varejo || item.price || 0).replace(/[^\d.,]/g, '').replace(',', '.');
    const retailPrice = parseFloat(cleanPrice) || 0;
    return sum + (retailPrice * (item.quantity || 0));
  }, 0);

  const wholesaleSubtotal = cart.reduce((sum, item) => {
    if (!item) return sum;
    const valAtacado = item.preco_atacado || item.price_wholesale;
    const valVarejo = item.preco_varejo || item.price || 0;
    const wholesalePrice = valAtacado 
      ? (parseFloat(String(valAtacado).replace(/[^\d.,]/g, '').replace(',', '.')) || 0)
      : (parseFloat(String(valVarejo).replace(/[^\d.,]/g, '').replace(',', '.')) || 0) * 0.6;
    return sum + (wholesalePrice * (item.quantity || 0));
  }, 0);

  const resellerSaving = Math.max(0, retailSubtotal - wholesaleSubtotal);

  // Load draft from localStorage on mount (if guest)
  useEffect(() => {
    if (!currentUser) {
      try {
        const savedDraft = localStorage.getItem('avante_reseller_draft');
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          setUpgradeFormData(prev => ({
            ...prev,
            name: parsed.nome || parsed.name || '',
            email: parsed.email || '',
            whatsapp: parsed.whatsapp || ''
          }));
        }
      } catch (e) {
        console.error('[CartPage] Erro ao carregar rascunho de cadastro:', e);
      }
    }
  }, [currentUser]);

  // Auto-save draft whenever upgradeFormData changes (if guest)
  useEffect(() => {
    if (!currentUser && (upgradeFormData.name || upgradeFormData.email || upgradeFormData.whatsapp)) {
      try {
        const draft = {
          nome: upgradeFormData.name,
          email: upgradeFormData.email,
          whatsapp: upgradeFormData.whatsapp
        };
        localStorage.setItem('avante_reseller_draft', JSON.stringify(draft));
      } catch (e) {
        console.error('[CartPage] Erro ao salvar rascunho de cadastro:', e);
      }
    }
  }, [upgradeFormData, currentUser]);

  // Autofill name and email if user is logged in
  useEffect(() => {
    if (currentUser) {
      setUpgradeFormData(prev => ({
        ...prev,
        name: currentUser.name || currentUser.nome_completo || '',
        email: currentUser.email || '',
        whatsapp: currentUser.whatsapp || currentUser.telefone || ''
      }));
    }
  }, [currentUser]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }
    
    if (isReseller) {
      if (subtotal < limiteUpgrade) {
        toast.error(`Valor mínimo de atacado não atingido. Seu pedido atual é de R$ ${subtotal.toFixed(2)} e o mínimo é R$ ${limiteUpgrade.toFixed(2)}.`);
        return;
      }
      
      // Check if incomplete reseller (missing document)
      const isDocMissing = !currentUser?.cpf && !currentUser?.cnpj && !currentUser?.cadastro_completo;
      if (isDocMissing) {
        setShowIncompletoCheckoutModal(true);
        return;
      }

      // If complete, proceed to checkout
      proceedToCheckout();
    } else {
      // B2C client
      if (subtotal >= limiteUpgrade) {
        setShowUpgradeModal(true);
      } else {
        proceedToCheckout();
      }
    }
  };

  const proceedToCheckout = () => {
    toast.success('Redirecionando para pagamento seguro...', { duration: 1500 });
    navigate('/checkout');
  };

  const handleUpsellAdd = (produto, qty, variation) => {
    addToCart({ ...produto, ...variation, quantity: qty });
    toast.success(`${produto.name || produto.nome_produto} adicionado!`);
  };

  const handleUpgradeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingUpgrade(true);
    setErrorModal('');

    const createB2bRequestSilently = async (userId, userData) => {
      try {
        await pb.collection('solicitacoes_revendedor').create({
          user_id: userId,
          nome: userData.name || 'Revendedora',
          whatsapp: userData.whatsapp || '',
          cpf_cnpj: userData.cpf || '',
          cidade_estado: 'Preenchido no Checkout',
          ja_revende: 'sim',
          status: 'pendente'
        }, { $autoCancel: false });
      } catch (errReq) {
        console.error('Erro ao registrar solicitação B2B no upgrade:', errReq);
      }
    };

    try {
      if (isAuthenticated) {
        // SCENARIO 1: User is already logged in
        if (!upgradeFormData.cpf) {
          setErrorModal('O CPF/CNPJ é obrigatório para faturamento de revenda.');
          setIsSubmittingUpgrade(false);
          return;
        }

        const updated = await pb.collection('users').update(currentUser.id, {
          commercial_profile: 'reseller',
          tipo_cliente: 'revendedor',
          account_level: 'basic',
          cpf: upgradeFormData.cpf,
          whatsapp: upgradeFormData.whatsapp || currentUser.whatsapp,
          name: upgradeFormData.name || currentUser.name
        }, { $autoCancel: false });

        if (!updated.cadastro_completo) {
          await createB2bRequestSilently(updated.id, {
            name: updated.name || updated.nome_completo,
            whatsapp: updated.whatsapp || updated.telefone,
            cpf: updated.cpf
          });
        }

        updateUser(updated);
        toast.success('👑 Fantástico! Perfil de Revendedora ativado com sucesso! Preços recalculados.');
        setShowUpgradeModal(false);
      } else {
        // SCENARIO 2: Guest User
        if (!upgradeFormData.email || !upgradeFormData.password) {
          setErrorModal('E-mail e Senha são obrigatórios.');
          setIsSubmittingUpgrade(false);
          return;
        }

        if (isLoginMode) {
          // A) Login & Upgrade
          const authData = await login(upgradeFormData.email, upgradeFormData.password);
          
          let updatedModel = authData.record;
          if (authData.record.commercial_profile !== 'reseller') {
            updatedModel = await pb.collection('users').update(authData.record.id, {
              commercial_profile: 'reseller',
              tipo_cliente: 'revendedor',
              account_level: 'basic',
              cpf: upgradeFormData.cpf || authData.record.cpf || '',
              whatsapp: upgradeFormData.whatsapp || authData.record.whatsapp || ''
            }, { $autoCancel: false });
          }

          if (!updatedModel.cadastro_completo) {
            await createB2bRequestSilently(updatedModel.id, {
              name: updatedModel.name || updatedModel.nome_completo,
              whatsapp: updatedModel.whatsapp || updatedModel.telefone,
              cpf: updatedModel.cpf
            });
          }

          updateUser(updatedModel);
          toast.success('👑 Bem-vinda de volta! Seu perfil de revenda está ativo e o carrinho foi atualizado.');
          setShowUpgradeModal(false);
        } else {
          // B) Fast Register & Upgrade
          if (!upgradeFormData.name || !upgradeFormData.cpf) {
            setErrorModal('Nome completo e CPF/CNPJ são necessários para cadastrar como revenda.');
            setIsSubmittingUpgrade(false);
            return;
          }

          // Register in AuthContext
          const authData = await signup(upgradeFormData.email, upgradeFormData.password, upgradeFormData.name, 'revendedor');
          
          const recordId = authData.record?.id || authData.model?.id || pb.authStore.model?.id;
          
          // Complete detailed fields in Pocketbase
          const updated = await pb.collection('users').update(recordId, {
            commercial_profile: 'reseller',
            account_level: 'basic',
            cpf: upgradeFormData.cpf,
            whatsapp: upgradeFormData.whatsapp,
            name: upgradeFormData.name
          }, { $autoCancel: false });

          await createB2bRequestSilently(updated.id, {
            name: updated.name || updated.nome_completo,
            whatsapp: updated.whatsapp || updated.telefone,
            cpf: updated.cpf
          });

          updateUser(updated);
          toast.success('👑 Conta criada! Seu perfil de Revendedora Oficial foi ativado com sucesso!');
          setShowUpgradeModal(false);
        }
        try {
          localStorage.removeItem('avante_reseller_draft');
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
      const msg = err && typeof err === 'object'
        ? (err.response?.message || err.message)
        : (err ? String(err) : '');
      setErrorModal(msg || 'Erro ao processar ativação de revenda. Tente novamente.');
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  const [isReverting, setIsReverting] = useState(false);

  const handleRevertToRetail = async () => {
    if (!currentUser) return;
    setIsReverting(true);
    try {
      const updated = await pb.collection('users').update(currentUser.id, {
        commercial_profile: 'retail',
        tipo_cliente: 'varejo',
        account_level: 'basic'
      }, { $autoCancel: false });

      updateUser(updated);
      toast.success('🛍️ Perfil alterado para Varejo! Preços e descontos recalculados.');
    } catch (err) {
      console.error(err);
      toast.error('Erro ao retornar para o perfil de Varejo. Tente novamente.');
    } finally {
      setIsReverting(false);
    }
  };

  const handleIncompletoSubmit = async (e) => {
    e.preventDefault();
    if (!incompletoCpf) {
      setErrorIncompleto('Por favor, informe seu CPF ou CNPJ.');
      return;
    }
    setIsSubmittingIncompleto(true);
    setErrorIncompleto('');
    try {
      // Atualiza apenas o documento, sem dar o cadastro completo B2B
      const updated = await pb.collection('users').update(currentUser.id, {
        cpf: incompletoCpf
      }, { $autoCancel: false });

      // Registra a solicitação para avaliação da diretoria
      try {
        if (!currentUser?.cadastro_completo) {
          await pb.collection('solicitacoes_revendedor').create({
            user_id: currentUser.id,
            nome: currentUser.name || currentUser.nome_completo || 'Revendedora',
            whatsapp: currentUser.whatsapp || currentUser.telefone || '',
            cpf_cnpj: incompletoCpf,
            cidade_estado: 'Preenchido no Checkout',
            ja_revende: 'sim',
            status: 'pendente'
          }, { $autoCancel: false });
        }
      } catch (errReq) {
        console.error('Erro ao registrar solicitação B2B no checkout:', errReq);
      }

      updateUser(updated);
      toast.success('Documento salvo! Compra liberada. Seu perfil B2B irá para análise das mídias.');
      setShowIncompletoCheckoutModal(false);
      proceedToCheckout();
    } catch (err) {
      console.error(err);
      setErrorIncompleto('Erro ao salvar documento. Tente novamente.');
    } finally {
      setIsSubmittingIncompleto(false);
    }
  };

  const handleIncompletoSkip = () => {
    setShowIncompletoCheckoutModal(false);
    proceedToCheckout();
  };

  const isEmpty = cart.length === 0;

  const testimonialsData = [
    { id: '1', customer_name: 'Maria Silva', comment: 'Chegou rápido e a qualidade é impecável! As medidas batiam certinho.', rating: 5 },
    { id: '2', customer_name: 'Ana Costa', comment: 'Amei os descontos progressivos, valeu muito a pena levar mais peças.', rating: 5 },
    { id: '3', customer_name: 'Juliana Oliveira', comment: 'Primeira vez comprando e já virei cliente fiel. Muito capricho!', rating: 5 }
  ];

  return (
    <main className="min-h-screen bg-[#FFFBF8] overflow-hidden pb-24 text-gray-800 font-sans">
      <Helmet>
        <title>Meu Carrinho | Avante Lingerie</title>
      </Helmet>

      {/* LUXURY GLOWING HEADER */}
      <div className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] pt-28 md:pt-32 pb-24 md:pb-28 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] md:rounded-b-[3rem] shadow-premium relative overflow-hidden border-b border-[#c59b5f]/15">
        <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-white/60 mb-6 w-full max-w-5xl justify-start">
            <Link to="/" className="hover:text-[#c59b5f] transition-colors font-medium">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#c59b5f]/50" />
            <span className="text-[#c59b5f] font-bold">Carrinho</span>
          </nav>
          
          <div className="flex items-center justify-center gap-4 w-full max-w-5xl relative">
            <button 
              onClick={() => navigate(-1)} 
              className="absolute left-0 p-3 rounded-full hover:bg-white/5 border border-white/10 text-white transition-colors hidden md:flex items-center justify-center active:scale-95"
              aria-label="Voltar para a página anterior"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center w-full">
              <h1 className="text-3xl md:text-4.5xl lg:text-5.5xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-3 w-full">
                <ShoppingBag className="w-8 h-8 md:w-11 md:h-11 text-[#c59b5f]" strokeWidth={1.2} />
                Meu Carrinho
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3 bg-[#c59b5f]/10 border border-[#c59b5f]/20 px-4 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-[#c59b5f]" strokeWidth={1.5} />
                <span className="text-xs md:text-sm text-white font-bold tracking-widest uppercase">
                  {isReseller ? 'Atendimento Exclusivo Revenda' : 'Finalização 100% Segura'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-12 md:-mt-16 relative z-20">
        {isEmpty ? (
          <div className="bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f]/30 rounded-3xl p-12 md:p-16 shadow-premium-sm text-center max-w-2xl mx-auto relative overflow-hidden group/empty transition-all duration-500">
            <div className="w-24 h-24 bg-[#c59b5f]/10 border border-[#c59b5f]/20 rounded-full flex items-center justify-center mx-auto mb-8 transition-transform duration-500 group-hover/empty:scale-105 group-hover/empty:shadow-[0_0_20px_rgba(197,155,95,0.25)]">
              <ShoppingBag className="w-10 h-10 text-[#c59b5f]" strokeWidth={1.5} />
            </div>
            <h2 className="text-2.5xl font-serif font-bold text-gray-900 mb-4">Sua sacola está vazia</h2>
            <p className="text-gray-500 font-light text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
              Descubra nossas coleções exclusivas e encontre a peça perfeita que valoriza sua beleza e contorna suas curvas com conforto de alta costura.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black border border-[#c59b5f]/30 rounded-2xl px-12 py-6.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md active:scale-[0.98]"
            >
              EXPLORAR PRODUTOS
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                
                {isReseller && configuracoes && subtotal < limiteUpgrade && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 text-left shadow-sm animate-in fade-in duration-300">
                    <div className="flex items-start gap-4">
                      <span className="text-red-500 text-2xl">⚠️</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 text-sm uppercase">Pedido abaixo do mínimo de atacado</h4>
                        <p className="text-xs text-red-700 mt-1 leading-relaxed">
                          Como revendedora oficial, o valor mínimo do seu pedido de atacado deve ser de <strong>R$ {limiteUpgrade.toFixed(2)}</strong>. 
                          Seu carrinho atual é de <strong>R$ {subtotal.toFixed(2)}</strong>. Por favor, adicione mais <strong>R$ {(limiteUpgrade - subtotal).toFixed(2)}</strong> em produtos para finalizar a compra no atacado.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Button
                            onClick={() => navigate('/')}
                            className="bg-[#3A2E2A] hover:bg-[#2A1E1A] text-white text-[10px] md:text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl h-auto"
                          >
                            Continuar Comprando (Atacado)
                          </Button>
                          <Button
                            onClick={handleRevertToRetail}
                            disabled={isReverting}
                            variant="outline"
                            className="border-red-350 text-red-800 hover:bg-red-100/30 text-[10px] md:text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl h-auto bg-transparent"
                          >
                            {isReverting ? 'Processando...' : 'Voltar a Varejo'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <ProgressiveDiscountBar currentTotal={subtotal} />
                <PixInfoBlock isEligible={isPixEligible} />

                {/* CART ITEMS CONTAINER */}
                <div className="bg-white rounded-3xl border border-[#c59b5f]/15 p-6 md:p-8 shadow-premium-sm transition-all hover:shadow-[0_12px_30px_rgba(197,155,95,0.04)]">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                    <h2 className="font-serif font-bold text-gray-900 text-lg md:text-xl flex items-center gap-2.5">
                      Seus Itens ({cart.length})
                      {isReseller && (
                        <span className="text-[10px] tracking-wider uppercase font-bold text-white bg-gradient-to-r from-[#c59b5f] to-[#e5c595] px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(197,155,95,0.25)] flex items-center gap-1">
                          <Crown className="w-3 h-3 animate-pulse" /> Atacado Ativo
                        </span>
                      )}
                    </h2>
                  </div>
                  <div className="flex flex-col divide-y divide-gray-100">
                    {cart.map(item => (
                      <CartItem 
                        key={item.cartItemId} 
                        item={item} 
                        getItemPrice={getItemPrice}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))}
                  </div>
                </div>

                <SmartShipping currentTotal={subtotal} onSelectShipping={setShipping} />
              </div>

              {/* STICKY SUMMARY COLUMN */}
              <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-28 flex flex-col gap-6">
                  <OrderSummary 
                    subtotal={subtotal}
                    discount={discountInfo}
                    total={total}
                    pixEligible={isPixEligible}
                    nextTierInfo={nextTierInfo}
                    onCheckout={handleCheckout} 
                    resellerSaving={resellerSaving}
                  />
                  
                  {/* B2C to B2B Manual Upgrade Banner */}
                  {!isReseller && (
                    <button 
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full bg-[#121212] hover:bg-[#1f1f1f] text-[#c59b5f] border border-[#c59b5f]/30 hover:border-[#c59b5f] rounded-2xl p-4 transition-all duration-300 text-left flex items-start gap-3 shadow-premium-sm group/banner"
                    >
                      <Crown className="w-6 h-6 text-[#c59b5f] shrink-0 mt-0.5 group-hover/banner:scale-110 transition-transform" />
                      <div>
                        <h4 className="text-xs font-bold tracking-wider uppercase text-white mb-0.5 flex items-center gap-1.5">
                          Quero Preço de Atacado <Sparkles className="w-3 h-3 text-[#c59b5f]" />
                        </h4>
                        <p className="text-[11px] text-white/70 font-light leading-relaxed">
                          {subtotal >= limiteUpgrade 
                            ? `Economize R$ ${resellerSaving.toFixed(2).replace('.', ',')} imediatamente neste pedido ativando seu perfil de revendedora!`
                            : `Falta R$ ${(limiteUpgrade - subtotal).toFixed(2).replace('.', ',')} para comprar direto de fábrica e economizar cerca de R$ ${resellerSaving.toFixed(2).replace('.', ',')}!`
                          }
                        </p>
                      </div>
                    </button>
                  )}

                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full border border-[#c59b5f]/30 text-gray-800 bg-transparent hover:bg-[#121212] hover:text-white rounded-2xl py-6.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 active:scale-[0.98]"
                  >
                    CONTINUAR COMPRANDO
                  </Button>
                  <TrustSection />
                </div>
              </div>
            </div>

            <UpsellSection 
              currentCartTotal={subtotal} 
              onAddToCart={handleUpsellAdd} 
            />

            {/* TESTIMONIALS SECTION */}
            <section className="mt-20 pt-16 border-t border-[#c59b5f]/15">
              <div className="text-center mb-16">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
                  Voz de Nossas Clientes
                </span>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">O que nossas clientes dizem</h2>
                <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonialsData.map((test, idx) => (
                  <div key={idx} className="bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f] rounded-3xl p-8 shadow-premium-sm hover:shadow-[0_15px_35px_rgba(197,155,95,0.08)] transition-all duration-500 flex flex-col gap-4 group/testimonial">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#c59b5f]/10 text-[#c59b5f] border border-[#c59b5f]/20 flex items-center justify-center font-bold text-lg shrink-0">
                        {test.customer_name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{test.customer_name}</h4>
                        <div className="flex text-[#c59b5f] gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 font-light text-sm italic leading-relaxed">"{test.comment}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="mt-20 pt-16 border-t border-[#c59b5f]/15 max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
                  Suporte Exclusivo
                </span>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">Dúvidas frequentes sobre sua compra</h2>
                <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
              </div>
              <FAQAccordion items={[
                { question: 'Quais as formas de pagamento?', answer: 'Aceitamos PIX com aprovação imediata (e com 5% de desconto extra) e cartão de crédito em até 6x sem juros.' },
                { question: 'Posso trocar se não servir?', answer: 'Com certeza! A primeira troca na Avante é totalmente grátis. Você tem até 30 dias após o recebimento para iniciar a sua solicitação.' },
                { question: 'Qual o prazo de entrega?', answer: 'O prazo varia conforme o seu CEP, mas despachamos a sua compra em até 24h úteis para garantir o frete mais rápido do mercado.' },
                { question: 'O site é seguro?', answer: 'Sim. Possuímos criptografia SSL blindada activa em toda a jornada de compra, garantindo proteção total para seus dados.' }
              ]} />
            </section>
          </>
        )}
      </div>

      {/* BOUTIQUE CHAMPAGNE GOLD UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white border border-[#c59b5f]/30 rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-400 my-8">
            
            <button 
              onClick={() => {
                setShowUpgradeModal(false);
                setHasDismissedUpgrade(true);
                toast.info('Você pode ativar seu desconto de atacado a qualquer momento no banner da sacola.', { duration: 4000 });
              }}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors z-20 cursor-pointer"
              aria-label="Fechar Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {subtotal < limiteUpgrade ? (
              <>
                <div className="bg-gradient-to-br from-[#121212] via-[#1d1d1d] to-[#2b2114] py-5 px-6 text-center border-b border-[#c59b5f]/25 text-white relative">
                  <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c59b5f] to-[#e5c595] text-black flex items-center justify-center shadow-[0_0_25px_rgba(197,155,95,0.4)] mb-2.5">
                      <Crown className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-2">
                      Preço de Fábrica Quase Lá!
                    </h3>
                    <p className="text-[#c59b5f] text-xs font-semibold uppercase tracking-[2px] mt-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Falta apenas R$ {(limiteUpgrade - subtotal).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-gray-600 font-light text-sm text-center leading-relaxed mb-4">
                    Seja uma <strong>Revendedora Oficial Avante</strong>! Adicione mais peças ao seu carrinho para atingir o valor mínimo de <strong>R$ {limiteUpgrade.toFixed(2).replace('.', ',')}</strong> e compre direto de fábrica com descontos automáticos de atacado!
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4 bg-gradient-to-br from-[#FFFBF8] to-[#FCF9F5] border border-[#c59b5f]/15 rounded-xl p-3">
                    <div className="flex flex-col items-center text-center">
                      <TrendingUp className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Margem</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Até 100% Lucro</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x border-[#c59b5f]/15 px-2">
                      <Shield className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mínimo</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Direto Fábrica</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Crown className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Benefício</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Lia Assistente</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full h-11 bg-gradient-to-r from-[#121212] to-[#242424] hover:from-[#c59b5f] hover:to-[#e5c595] text-white hover:text-black font-bold uppercase tracking-wider text-xs border border-[#c59b5f]/40 rounded-xl mt-3 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
                  >
                    <Sparkles className="w-4 h-4 text-[#c59b5f] group-hover:text-black transition-colors" />
                    ADICIONAR MAIS PRODUTOS
                  </Button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setHasDismissedUpgrade(true);
                      proceedToCheckout();
                    }}
                    className="mt-3 text-[11px] text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest font-semibold block mx-auto underline cursor-pointer"
                  >
                    Entendi, prefiro comprar no varejo
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-br from-[#121212] via-[#1d1d1d] to-[#2b2114] py-5 px-6 text-center border-b border-[#c59b5f]/25 text-white relative">
                  <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c59b5f] to-[#e5c595] text-black flex items-center justify-center shadow-[0_0_25px_rgba(197,155,95,0.4)] mb-2.5 animate-bounce">
                      <Crown className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-2">
                      Upgrade Atacado Destravado!
                    </h3>
                    <p className="text-[#c59b5f] text-xs font-semibold uppercase tracking-[2px] mt-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Compra Mínima Atingida R$ {limiteUpgrade.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <p className="text-gray-600 font-light text-sm text-center leading-relaxed mb-4">
                    Parabéns! Sua sacola atingiu o valor necessário para comprar direto da fábrica. 
                    Ao ativar seu perfil de revendedora, <strong>você economizará R$ {resellerSaving.toFixed(2).replace('.', ',')} imediatamente</strong> neste pedido!
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4 bg-gradient-to-br from-[#FFFBF8] to-[#FCF9F5] border border-[#c59b5f]/15 rounded-xl p-3">
                    <div className="flex flex-col items-center text-center">
                      <TrendingUp className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Margem</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Até 100% Lucro</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-x border-[#c59b5f]/15 px-2">
                      <Shield className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mínimo</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Direto Fábrica</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Crown className="w-4 h-4 text-[#c59b5f] mb-1" />
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Benefício</span>
                      <span className="text-xs font-bold text-gray-800 mt-0.5">Lia Assistente</span>
                    </div>
                  </div>

                  {errorModal && (
                    <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold text-center shadow-sm">
                      {errorModal}
                    </div>
                  )}

                  <form onSubmit={handleUpgradeSubmit} className="space-y-3">
                    
                    {!isAuthenticated && (
                      <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-55 mb-3">
                        <button
                          type="button"
                          onClick={() => { setIsLoginMode(false); setErrorModal(''); }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${!isLoginMode ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                        >
                          Criar Cadastro Revenda
                        </button>
                        <button
                          type="button"
                          onClick={() => { setIsLoginMode(true); setErrorModal(''); }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${isLoginMode ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                        >
                          Já Tenho Conta (Entrar)
                        </button>
                      </div>
                    )}

                    {(!isAuthenticated && !isLoginMode) && (
                      <div className="form-group text-left">
                        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">Nome Completo</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Maria das Dores Silva"
                          value={upgradeFormData.name}
                          onChange={(e) => setUpgradeFormData({ ...upgradeFormData, name: e.target.value })}
                          className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                        />
                      </div>
                    )}

                    {!isAuthenticated && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="form-group text-left">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">E-mail</label>
                          <input
                            type="email"
                            required
                            placeholder="revenda@gmail.com"
                            value={upgradeFormData.email}
                            onChange={(e) => setUpgradeFormData({ ...upgradeFormData, email: e.target.value })}
                            className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                          />
                        </div>
                        <div className="form-group text-left">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">Senha</label>
                          <input
                            type="password"
                            required
                            placeholder="Mínimo 8 caracteres"
                            minLength={8}
                            value={upgradeFormData.password}
                            onChange={(e) => setUpgradeFormData({ ...upgradeFormData, password: e.target.value })}
                            className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                          />
                        </div>
                      </div>
                    )}

                    {(!isLoginMode) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="form-group text-left">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">CPF ou CNPJ</label>
                          <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={upgradeFormData.cpf}
                            onChange={(e) => setUpgradeFormData({ ...upgradeFormData, cpf: e.target.value })}
                            className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                          />
                        </div>
                        <div className="form-group text-left">
                          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">WhatsApp / Telefone</label>
                          <input
                            type="text"
                            required
                            placeholder="(00) 90000-0000"
                            value={upgradeFormData.whatsapp}
                            onChange={(e) => setUpgradeFormData({ ...upgradeFormData, whatsapp: e.target.value })}
                            className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmittingUpgrade}
                      className="w-full h-11 bg-gradient-to-r from-[#121212] to-[#242424] hover:from-[#c59b5f] hover:to-[#e5c595] text-white hover:text-black font-bold uppercase tracking-wider text-xs border border-[#c59b5f]/40 rounded-xl mt-3 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(197,155,95,0.25)]"
                    >
                      {isSubmittingUpgrade ? (
                        'Processando Ativação...'
                      ) : (
                        <>
                          <Crown className="w-4 h-4 text-[#c59b5f] group-hover:text-black transition-colors" /> 
                          {isLoginMode ? 'Entrar & Ativar Desconto Atacado' : 'Ativar Meu Cadastro Revenda & Recalcular'}
                        </>
                      )}
                    </Button>
                  </form>

                  <button
                    type="button"
                    onClick={() => {
                      setShowUpgradeModal(false);
                      setHasDismissedUpgrade(true);
                      proceedToCheckout();
                    }}
                    className="mt-3 text-[11px] text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest font-semibold block mx-auto underline cursor-pointer"
                  >
                    Não desejo descontos, prefiro comprar no varejo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* INCOMPLETE RESELLER DOCUMENTATION MODAL */}
      {showIncompletoCheckoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white border border-[#c59b5f]/30 rounded-[2rem] max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in-50 zoom-in-95 duration-400 my-8">
            
            <button 
              onClick={() => setShowIncompletoCheckoutModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors z-20 cursor-pointer"
              aria-label="Fechar Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-br from-[#121212] via-[#1d1d1d] to-[#2b2114] py-5 px-6 text-center border-b border-[#c59b5f]/25 text-white relative">
              <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c59b5f] to-[#e5c595] text-black flex items-center justify-center shadow-[0_0_25px_rgba(197,155,95,0.4)] mb-2.5">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight flex items-center justify-center gap-2">
                  Cadastro Pendente
                </h3>
                <p className="text-[#c59b5f] text-xs font-semibold uppercase tracking-[2px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Liberação Comercial
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6 text-center">
              <p className="text-gray-500 font-light text-sm leading-relaxed mb-4">
                Seu cadastro de revenda está ativo, mas precisamos do seu <strong>CPF ou CNPJ</strong> para emitir as notas fiscais e liberar o download completo de mídias de divulgação.
              </p>

              {errorIncompleto && (
                <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold shadow-sm">
                  {errorIncompleto}
                </div>
              )}

              <form onSubmit={handleIncompletoSubmit} className="space-y-3 text-left">
                <div className="form-group">
                  <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-0.5 block">CPF ou CNPJ de Faturamento</label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu CPF ou CNPJ"
                    value={incompletoCpf}
                    onChange={(e) => setIncompletoCpf(e.target.value)}
                    className="w-full text-sm h-10 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors focus:bg-[#FFFBF8]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmittingIncompleto}
                  className="w-full h-11 bg-gradient-to-r from-[#121212] to-[#242424] hover:from-[#c59b5f] hover:to-[#e5c595] text-white hover:text-black font-bold uppercase tracking-wider text-xs border border-[#c59b5f]/40 rounded-xl mt-2 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(197,155,95,0.25)]"
                >
                  {isSubmittingIncompleto ? 'Salvando Documento...' : 'Salvar Documento & Ir para Checkout'}
                </Button>
              </form>

              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleIncompletoSkip}
                  className="text-xs text-[#c59b5f] hover:text-[#b48a4f] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Finalizar Compra Agora (Completar no perfil depois)
                </button>
                <button
                  type="button"
                  onClick={() => setShowIncompletoCheckoutModal(false)}
                  className="text-[11px] text-gray-400 hover:text-gray-550 transition-colors uppercase tracking-widest font-semibold block underline cursor-pointer"
                >
                  Voltar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
