
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ChevronRight, Star, Shield, Lock, Crown, CheckCircle2, TrendingUp, Sparkles, X, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { descontosService } from '@/services/descontosService.js';
import { trackResellerUpgrade } from '@/lib/marketingPixels.js';
import { getGenderTerms } from '@/utils/genderHelper.js';

import CartItem from '@/components/CartItem.jsx';
import ProgressiveDiscountBar from '@/components/ProgressiveDiscountBar.jsx';
import PixInfoBlock from '@/components/PixInfoBlock.jsx';
import OrderSummary from '@/components/OrderSummary.jsx';
import SmartShipping from '@/components/SmartShipping.jsx';
import UpsellSection from '@/components/UpsellSection.jsx';
import TrustSection from '@/components/TrustSection.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import { Button } from '@/components/ui/button.jsx';
import MimoRetentionModal, { MIMO_APPS } from '@/components/MimoRetentionModal.jsx';
import GiftReservedReminderModal from '@/components/cart/GiftReservedReminderModal.jsx';

export default function CartPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, updateUser, signup, login, requestPasswordReset } = useAuth();
  const genderTerms = getGenderTerms(currentUser?.name || currentUser?.nome_completo);
  
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    addToCart,
    getCartTotal,
    getActiveDiscount,
    getNextTierInfo,
    getPixBenefitEligibility,
    getItemPrice,
    hasEncomendaItems
  } = useCart();

  const [shipping, setShipping] = useState({ cost: 0, method: null });
  const [configuracoes, setConfiguracoes] = useState(null);
  
  // Upgrade Modal states
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasDismissedUpgrade, setHasDismissedUpgrade] = useState(false);
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [modalFeedback, setModalFeedback] = useState(null); // { type: 'info' | 'success' | 'error', message: '' }
  
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

  const isAtacadoSession = typeof window !== 'undefined' && localStorage.getItem('avante_modo_compra') === 'atacado';
  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor' || cart.some(i => i.is_atacado) || isAtacadoSession;
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

    // Blindagem Inegociável: Não permitir checkout sem ao menos 1 produto físico de lingerie
    const physicalItems = cart.filter(i => !i.is_mimo && !i.is_digital && !i.is_combo_item);
    if (physicalItems.length === 0) {
      toast.error('Adicione pelo menos 1 peça de lingerie à sua sacola para acompanhar o presente e finalizar o pedido.', {
        duration: 4500
      });
      return;
    }
    
    if (isReseller) {
      if (subtotal < limiteUpgrade) {
        toast.error(`Valor mínimo de atacado não atingido. Seu pedido atual é de R$ ${subtotal.toFixed(2)} e o mínimo é R$ ${limiteUpgrade.toFixed(2)}.`);
        return;
      }
      
      // Check if incomplete reseller (logged in user missing document)
      const isDocMissing = Boolean(currentUser && !currentUser.cpf && !currentUser.cnpj && !currentUser.cadastro_completo);
      if (isDocMissing) {
        setShowIncompletoCheckoutModal(true);
        return;
      }

      // If complete or guest in wholesale mode, proceed directly to checkout
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
    setModalFeedback(null);

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
          setModalFeedback({ type: 'error', message: 'O CPF/CNPJ é obrigatório para faturamento de revenda.' });
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
        trackResellerUpgrade({ email: updated.email, name: updated.name || updated.nome_completo });
        toast.success('👑 Fantástico! Perfil de Revendedora ativado com sucesso! Preços recalculados.');
        setShowUpgradeModal(false);
      } else {
        // SCENARIO 2: Guest User
        if (!upgradeFormData.email || !upgradeFormData.password) {
          setModalFeedback({ type: 'error', message: 'E-mail e Senha são obrigatórios.' });
          setIsSubmittingUpgrade(false);
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(upgradeFormData.email.trim())) {
          setModalFeedback({ type: 'error', message: 'Por favor, informe um e-mail válido (exemplo: seuemail@gmail.com).' });
          setIsSubmittingUpgrade(false);
          return;
        }

        if (upgradeFormData.password.length < 8) {
          setModalFeedback({ type: 'error', message: 'A senha deve conter no mínimo 8 caracteres.' });
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
          trackResellerUpgrade({ email: updatedModel.email, name: updatedModel.name || updatedModel.nome_completo });
          toast.success(`👑 ${genderTerms.bemVindoDeVolta}! Seu perfil de revenda está ativo e o carrinho foi atualizado.`);
          setShowUpgradeModal(false);
        } else {
          // B) Fast Register & Upgrade
          if (!upgradeFormData.name || !upgradeFormData.cpf) {
            setModalFeedback({ type: 'error', message: 'Nome completo e CPF/CNPJ são necessários para cadastrar como revenda.' });
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
          trackResellerUpgrade({ email: updated.email, name: updated.name || updated.nome_completo });
          toast.success('👑 Conta criada! Seu perfil de Revendedora Oficial foi ativado com sucesso!');
          setShowUpgradeModal(false);
        }
        try {
          localStorage.removeItem('avante_reseller_draft');
        } catch (e) {}
      }
    } catch (err) {
      console.error('Erro no upgrade de atacado:', err);
      
      const fieldErrors = err?.data?.data || err?.response?.data || {};

      if (fieldErrors.email?.code === 'validation_not_unique' || fieldErrors.email?.message?.toLowerCase().includes('unique')) {
        setModalFeedback({
          type: 'info',
          message: 'Que bom ver você de volta! Identificamos sua conta cadastrada. Digite sua senha para entrar e ativar seus descontos de atacado.'
        });
        setIsLoginMode(true);
      } else if (fieldErrors.email?.code === 'validation_is_email' || fieldErrors.email?.message?.toLowerCase().includes('valid email')) {
        setModalFeedback({
          type: 'error',
          message: 'O e-mail digitado parece incompleto ou inválido. Por favor, confira o endereço (ex: nome@gmail.com).'
        });
      } else if (fieldErrors.password) {
        setModalFeedback({
          type: 'error',
          message: 'A senha informada deve ter no mínimo 8 caracteres.'
        });
      } else if (err?.message?.includes('Failed to authenticate')) {
        setModalFeedback({
          type: 'error',
          message: 'Senha incorreta. Por favor, confira os dados ou clique em "Esqueceu a senha?".'
        });
      } else if (err?.message?.includes('Failed to create record')) {
        setModalFeedback({
          type: 'info',
          message: 'Identificamos que você já possui conta! Digite sua senha para entrar e ativar o atacado.'
        });
        setIsLoginMode(true);
      } else {
        setModalFeedback({
          type: 'error',
          message: err?.response?.message || err?.message || 'Erro ao processar ativação de revenda. Tente novamente.'
        });
      }
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = (upgradeFormData.email || '').trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setModalFeedback({
        type: 'error',
        message: 'Por favor, informe seu e-mail no campo acima para receber as instruções de recuperação.'
      });
      return;
    }
    try {
      await requestPasswordReset(cleanEmail);
      toast.success('Link de recuperação enviado com sucesso para seu e-mail!');
      setModalFeedback({
        type: 'success',
        message: 'Enviamos o link de recuperação para seu e-mail! Abra sua caixa de entrada no Gmail para criar sua nova senha.'
      });
    } catch (err) {
      toast.error('Não foi possível enviar o e-mail de recuperação. Verifique se o e-mail está cadastrado.');
      setModalFeedback({
        type: 'error',
        message: 'Não foi possível enviar o e-mail de recuperação. Verifique se o e-mail está cadastrado.'
      });
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
    if (e && e.preventDefault) e.preventDefault();
    
    const cleanDoc = (incompletoCpf || '').replace(/\D/g, '');
    if (!cleanDoc || (cleanDoc.length !== 11 && cleanDoc.length !== 14)) {
      setErrorIncompleto('Por favor, informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
      return;
    }

    setIsSubmittingIncompleto(true);
    setErrorIncompleto('');

    try {
      // 1. Sempre salva localmente para que o Checkout use imediatamente
      localStorage.setItem('checkout_cpf', cleanDoc);
      try {
        const guest = JSON.parse(localStorage.getItem('avante_guest_info') || '{}');
        localStorage.setItem('avante_guest_info', JSON.stringify({ ...guest, cpf: cleanDoc }));
      } catch (eGuest) {
        console.warn('[CartPage] Erro ao sincronizar guest_info:', eGuest);
      }

      // 2. Se o usuário estiver autenticado no PocketBase, tenta atualizar o cadastro
      if (currentUser?.id && pb.authStore.isValid) {
        try {
          const updated = await pb.collection('users').update(currentUser.id, {
            cpf: cleanDoc
          }, { $autoCancel: false });

          if (typeof updateUser === 'function') {
            updateUser(updated);
          }
        } catch (errUser) {
          console.warn('[CartPage] Aviso ao atualizar users.cpf no PocketBase:', errUser);
        }

        // Tenta registrar solicitação B2B se necessário, sem travar o checkout
        try {
          if (!currentUser?.cadastro_completo) {
            await pb.collection('solicitacoes_revendedor').create({
              user_id: currentUser.id,
              nome: currentUser.name || currentUser.nome_completo || 'Revendedora',
              whatsapp: currentUser.whatsapp || currentUser.telefone || '',
              cpf_cnpj: cleanDoc,
              cidade_estado: 'Preenchido no Checkout',
              ja_revende: 'sim',
              status: 'pendente'
            }, { $autoCancel: false });
          }
        } catch (errReq) {
          console.warn('[CartPage] Aviso ao registrar solicitação B2B:', errReq);
        }
      }

      toast.success('Documento confirmado! Redirecionando para o checkout...', { duration: 1500 });
      setShowIncompletoCheckoutModal(false);
      proceedToCheckout();
    } catch (err) {
      console.error('[CartPage] Erro no fluxo de documento:', err);
      // NUNCA trava o cliente: fecha o modal e segue para o checkout seguro
      setShowIncompletoCheckoutModal(false);
      proceedToCheckout();
    } finally {
      setIsSubmittingIncompleto(false);
    }
  };

  const handleIncompletoSkip = () => {
    setShowIncompletoCheckoutModal(false);
    proceedToCheckout();
  };

  const isEmpty = cart.length === 0;

  // VIP Retention Gift (Mimo) States & Logic
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showGiftReminderModal, setShowGiftReminderModal] = useState(false);
  const [chosenGift, setChosenGift] = useState(() => {
    try {
      const saved = localStorage.getItem('avante_brinde_escolhido');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Exit-Intent & Retention Trigger para Presentes VIP na Sacola (Duplo Estágio Inteligente)
  useEffect(() => {
    if (isEmpty) return;

    const handleMouseLeave = (e) => {
      // Dispara quando o cursor do mouse se move em direção ao topo da janela (sair da página ou fechar aba)
      if (e.clientY < 15) {
        const hasExistingGift = cart.some(i => i.is_mimo || i.is_combo_item) || localStorage.getItem('avante_brinde_escolhido');
        
        if (hasExistingGift) {
          // ESTÁGIO 2: Cliente JÁ escolheu um brinde (ou combo), mas cisma de tentar sair da sacola!
          // Exibe o modal de lembrete com a caixa de presente animada para não repetir a tela de escolha dos 3 apps.
          const reminderShown = sessionStorage.getItem('avante_mimo_reminder_shown');
          if (!reminderShown) {
            setShowGiftReminderModal(true);
            sessionStorage.setItem('avante_mimo_reminder_shown', 'true');
          }
        } else {
          // ESTÁGIO 1: Cliente AINDA NÃO escolheu o brinde.
          // Exibe o modal de retenção para escolher 1 dos 3 Apps ou o Combo.
          const selectionShown = sessionStorage.getItem('avante_mimo_selection_shown');
          if (!selectionShown) {
            setShowGiftModal(true);
            sessionStorage.setItem('avante_mimo_selection_shown', 'true');
          }
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Timer de inatividade (8 segundos) disparado apenas para quem ainda NÃO possui brinde
    const idleTimer = setTimeout(() => {
      const selectionShown = sessionStorage.getItem('avante_mimo_selection_shown');
      const hasChosen = localStorage.getItem('avante_brinde_escolhido');
      const hasItemInCart = cart.some(i => i.is_mimo || i.is_combo_item);
      if (!selectionShown && !hasChosen && !hasItemInCart && !isEmpty) {
        setShowGiftModal(true);
        sessionStorage.setItem('avante_mimo_selection_shown', 'true');
      }
    }, 8000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(idleTimer);
    };
  }, [isEmpty, cart]);

  const handleConfirmGift = (giftData) => {
    setChosenGift(giftData);

    // 1. Remove qualquer brinde/app anterior da sacola
    const previousMimos = cart.filter(i => 
      i.is_mimo || 
      i.is_combo_item || 
      i.id === 'combo-3-apps-vip' ||
      (i.id && i.id.startsWith('app-mimo-'))
    );
    previousMimos.forEach(mi => removeFromCart(mi.cartItemId));

    // 2. Se for combo, adiciona os 3 apps listados um abaixo do outro
    if (giftData.is_combo) {
      MIMO_APPS.forEach((app) => {
        addToCart({
          id: `app-mimo-${app.id}`,
          name: `App VIP: ${app.name}`,
          price: 3.30,
          preco_varejo: 3.30,
          preco_atacado: 3.30,
          image: app.coverImage,
          selectedSize: 'App VIP',
          selectedColor: 'Acesso Digital',
          quantity: 1,
          stock: 9999,
          is_digital: true,
          is_mimo: true,
          is_combo_item: true,
          mimo_app_id: app.id
        });
      });
    } else {
      // Se for brinde individual, adiciona o App escolhido com preço 0
      addToCart({
        id: `app-mimo-${giftData.id}`,
        name: `App VIP: ${giftData.name}`,
        price: 0,
        preco_varejo: 0,
        preco_atacado: 0,
        image: giftData.coverImage,
        selectedSize: 'App VIP',
        selectedColor: 'Acesso Digital',
        quantity: 1,
        stock: 9999,
        is_digital: true,
        is_mimo: true,
        is_combo_item: false,
        mimo_app_id: giftData.id
      });
    }
  };

  const handleRemoveCartItem = (cartItemId) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    if (item?.is_mimo || item?.is_combo_item) {
      const isCombo = item.is_combo_item || cart.some(i => i.is_combo_item);
      const allMimoItems = cart.filter(i => 
        i.is_mimo || 
        i.is_combo_item || 
        (i.id && i.id.startsWith('app-mimo-')) || 
        i.id === 'combo-3-apps-vip'
      );
      allMimoItems.forEach(mi => removeFromCart(mi.cartItemId));

      if (isCombo) {
        // Se o cliente desfez o Combo de 3 Apps (+R$ 9,90), ele NÃO fica de mãos vazias!
        // Mantemos 1 App VIP 100% GRÁTIS como brinde legítimo da fábrica:
        const freeGiftApp = MIMO_APPS[0]; // Método Cintura Esculpida
        addToCart({
          id: `app-mimo-${freeGiftApp.id}`,
          name: `App VIP: ${freeGiftApp.name}`,
          price: 0,
          preco_varejo: 0,
          preco_atacado: 0,
          image: freeGiftApp.coverImage,
          selectedSize: 'App VIP',
          selectedColor: 'Acesso Digital',
          quantity: 1,
          stock: 9999,
          is_digital: true,
          is_mimo: true,
          is_combo_item: false,
          mimo_app_id: freeGiftApp.id
        });
        const savedChoice = { ...freeGiftApp, is_combo: false };
        setChosenGift(savedChoice);
        localStorage.setItem('avante_brinde_escolhido', JSON.stringify(savedChoice));
        toast.info('Combo de 3 apps desfeito. Mantivemos o seu 1º App VIP 100% GRÁTIS na sacola!', {
          duration: 4500
        });
        return;
      } else {
        setChosenGift(null);
        localStorage.removeItem('avante_brinde_escolhido');
        toast.info('Presente VIP removido da sacola.');
        return;
      }
    }

    // Verifica se após a remoção ainda restará algum item físico
    const remainingPhysical = cart.filter(i => 
      i.cartItemId !== cartItemId && 
      !i.is_mimo && 
      !i.is_digital && 
      !i.is_combo_item
    );

    removeFromCart(cartItemId);

    if (remainingPhysical.length === 0 && cart.some(i => i.is_mimo || i.is_combo_item)) {
      toast.warning('O presente VIP é um benefício exclusivo para acompanhar seu pedido. Adicione ao menos 1 peça de lingerie para liberá-lo no checkout!', { 
        duration: 5000 
      });
    }
  };

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
                          Como {genderTerms.revendedorMinusculo} oficial, o valor mínimo do seu pedido de atacado deve ser de <strong>R$ {limiteUpgrade.toFixed(2)}</strong>. 
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
                  {hasEncomendaItems && (
                    <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5 shadow-sm">
                      <span className="text-lg leading-none">🧵</span>
                      <div>
                        <strong>Contém peça sob encomenda:</strong> O prazo de confecção da fábrica (5 dias úteis) será somado ao frete selecionado com remessa única para todos os seus itens.
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col divide-y divide-gray-100">
                    {cart.map(item => (
                      <CartItem 
                        key={item.cartItemId} 
                        item={item} 
                        getItemPrice={getItemPrice}
                        onUpdateQuantity={updateQuantity}
                        onRemove={handleRemoveCartItem}
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
                    chosenGift={chosenGift}
                    hasPhysicalItems={cart.some(i => !i.is_mimo && !i.is_digital && !i.is_combo_item)}
                    onOpenGiftModal={() => setShowGiftModal(true)}
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
                            ? `Economize R$ ${resellerSaving.toFixed(2).replace('.', ',')} imediatamente neste pedido ativando seu perfil de ${genderTerms.revendedorMinusculo}!`
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
                { question: 'Quais as formas de pagamento?', answer: 'Aceitamos PIX com aprovação imediata (com 5% de desconto extra), cartão de crédito em até 6x, boleto bancário e parcelamento no boleto via Mercado Crédito.' },
                { question: 'Posso trocar se não servir?', answer: 'Oferecemos troca por arrependimento em até 7 dias corridos, ou troca por defeito em até 30 dias.' },
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
                    Ao ativar seu perfil de {genderTerms.revendedorMinusculo}, <strong>você economizará R$ {resellerSaving.toFixed(2).replace('.', ',')} imediatamente</strong> neste pedido!
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

                  {modalFeedback && (
                    <div className={`mb-3.5 p-3.5 rounded-xl text-xs font-medium leading-relaxed flex items-start gap-2.5 shadow-sm text-left ${
                      modalFeedback.type === 'info'
                        ? 'bg-[#FFFDF9] border border-[#c59b5f]/40 text-[#7A5110]'
                        : modalFeedback.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                      {modalFeedback.type === 'info' && <Sparkles className="w-4 h-4 text-[#c59b5f] flex-shrink-0 mt-0.5" />}
                      {modalFeedback.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
                      {modalFeedback.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
                      <span className="flex-1">{modalFeedback.message}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpgradeSubmit} className="space-y-3">
                    
                    {!isAuthenticated && (
                      <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-55 mb-3">
                        <button
                          type="button"
                          onClick={() => { setIsLoginMode(false); setModalFeedback(null); }}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${!isLoginMode ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                        >
                          Criar Cadastro Revenda
                        </button>
                        <button
                          type="button"
                          onClick={() => { setIsLoginMode(true); setModalFeedback(null); }}
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
                          <div className="flex items-center justify-between mb-0.5">
                            <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">Senha</label>
                            {isLoginMode && (
                              <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-[10px] text-[#c59b5f] hover:text-[#996515] font-semibold underline cursor-pointer"
                              >
                                Esqueceu a senha?
                              </button>
                            )}
                          </div>
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
                    maxLength={18}
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

      {/* LUXURY VIP RETENTION MODAL (MIMOS DA FÁBRICA) */}
      <MimoRetentionModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        onConfirmChoice={handleConfirmGift}
        currentChoice={chosenGift}
      />

      {/* POP-UP DE LEMBRETE DE PRESENTE RESERVADO (QUANDO JÁ ESCOLHIDO) */}
      <GiftReservedReminderModal
        isOpen={showGiftReminderModal}
        onClose={() => setShowGiftReminderModal(false)}
        onProceedToCheckout={handleCheckout}
        chosenGiftName={chosenGift?.name || 'Aplicativo VIP Exclusivo'}
        isCombo={Boolean(chosenGift?.is_combo || cart.some(i => i.is_combo_item))}
      />
    </main>
  );
}
