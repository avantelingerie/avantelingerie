import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Package,
  Truck,
  Home,
  CreditCard,
  Copy,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  RefreshCcw,
  HeartHandshake,
  ChevronRight,
  Play,
  Check,
  Gift,
  ExternalLink,
  Sparkles,
  Flame,
  Lock,
  Zap
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';
import ProductCard from '@/components/ProductCard.jsx';
import { trackPurchase } from '@/lib/marketingPixels.js';
import { MIMO_APPS } from '@/components/MimoRetentionModal.jsx';
import OrderCelebrationOverlay from '@/components/OrderCelebrationOverlay.jsx';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFirstPurchase, setIsFirstPurchase] = useState(false);
  const [isActivatingCoupon, setIsActivatingCoupon] = useState(false);
  const [couponActivated, setCouponActivated] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [boletoCopied, setBoletoCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutos em segundos
  const [showGiftLockModal, setShowGiftLockModal] = useState(false);
  const [isRegeneratingPix, setIsRegeneratingPix] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Resolve VIP retention gift chosen during cart/checkout with complete fallbacks
  const resolvedGift = React.useMemo(() => {
    try {
      const raw = localStorage.getItem('avante_brinde_escolhido');
      if (raw) return JSON.parse(raw);
    } catch (e) {}

    const obs = order?.observacoes || '';
    const items = order?.items || [];
    const hasCombo = obs.includes('Combo 3 Apps VIP') || items.some(i => (i.id && String(i.id).includes('combo-3-apps')) || (i.name && i.name.toLowerCase().includes('combo 3')));
    if (hasCombo) {
      return {
        id: 'combo-3-apps',
        name: 'Combo 3 Aplicativos VIP da Fábrica',
        is_combo: true,
        price: 9.90,
        coverImage: '/assets/mimos/popup-brindes-transparente.png',
        apps: MIMO_APPS
      };
    }
    if (obs.includes('Máquina de Vendas')) {
      const app = MIMO_APPS.find(a => a.id === 'maquina-de-vendas');
      return { ...app, is_combo: false, price: 0 };
    }
    if (obs.includes('Cintura Esculpida')) {
      const app = MIMO_APPS.find(a => a.id === 'cintura-esculpida');
      return { ...app, is_combo: false, price: 0 };
    }
    if (obs.includes('Espelho Secreto')) {
      const app = MIMO_APPS.find(a => a.id === 'espelho-secreto');
      return { ...app, is_combo: false, price: 0 };
    }

    const defaultApp = MIMO_APPS.find(a => a.id === 'espelho-secreto') || MIMO_APPS[0];
    return { ...defaultApp, is_combo: false, price: 0 };
  }, [order]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchOrderAndSuggestions = async () => {
      try {
        // MODO DEMO / PREVIEW: Permite ao lojista visualizar o pedido confirmado e a celebração instantaneamente
        if (!orderId || orderId === 'preview' || orderId === 'demo' || orderId === 'teste') {
          const previewOrder = {
            id: 'demo-preview',
            numero_pedido: 'PED-PREVIEW',
            created: new Date().toISOString(),
            status: 'confirmed',
            isPaid: true,
            rawStatus: 'confirmado',
            paymentMethod: 'pix',
            installments: 1,
            subtotal: 157.79,
            shippingCost: 0,
            discount: 7.89,
            discountLabel: 'PIX 5% OFF',
            total: 149.90,
            pix_qr_code_url: '/assets/demo-pix-qrcode.png',
            pix_copia_cola: '00020126580014br.gov.bcb.pix0136avantelingerie-demo5204000053039865406149.905802BR5915AVANTE LINGERIE6013NOVA FRIBURGO62070503***6304ABCD',
            estimatedDelivery: '3 a 5 dias úteis',
            cliente_nome: 'Cliente VIP Avante',
            cliente_telefone: '229981225010',
            cliente_cpf: '000.000.000-00',
            cliente_email: 'cliente@avantelingerie.com.br',
            shippingAddress: {
              rua: 'Avenida Alberto Braune',
              numero: '100',
              complemento: 'Loja de Fábrica',
              bairro: 'Centro',
              cidade: 'Nova Friburgo',
              estado: 'RJ',
              cep: '28610-000'
            },
            items: [
              {
                id: 'prod-demo-1',
                name: 'Conjunto Lingerie Renda Sublime Alta Costura',
                size: 'M',
                color: 'Preto Nobre',
                quantity: 1,
                price: 149.90,
                image: 'https://images.unsplash.com/photo-1701017718943-996aa586e955?w=800&q=80'
              },
              {
                id: 'app-mimo-cintura-esculpida',
                name: 'App VIP: Método Cintura Esculpida',
                size: 'App VIP',
                color: 'Acesso Digital',
                quantity: 1,
                price: 0,
                is_mimo: true,
                is_digital: true,
                image: '/assets/mimos/capa-cintura-esculpida-3d.png'
              }
            ],
            observacoes: '[🎁 BRINDE VIP: Método Cintura Esculpida]'
          };
          setOrder(previewOrder);
          setShowCelebration(true);
          setLoading(false);
          return;
        }

        let fetchedOrder;
        try {
          // Attempt 1: Fetch from 'pedidos' collection
          const rawOrder = await pb.collection('pedidos').getOne(orderId, { $autoCancel: false });
          
          // Resiliently parse street address string back into components (Rua, Número, Complemento, Bairro)
          let parsedAddress = { rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', cep: '' };
          if (rawOrder.endereco_entrega) {
            const parts = rawOrder.endereco_entrega.split(',').map(s => s.trim());
            parsedAddress.rua = parts[0] || '';
            if (parts[1]) {
              const numParts = parts[1].split('-').map(s => s.trim());
              parsedAddress.numero = numParts[0] || '';
              parsedAddress.complemento = numParts[1] || '';
            }
            parsedAddress.bairro = parts[2] || '';
          }
          parsedAddress.cidade = rawOrder.cidade || '';
          parsedAddress.cep = rawOrder.cep || '';
          parsedAddress.estado = rawOrder.estado || '';

          let localPix = null;
          try {
            const rawPix = sessionStorage.getItem(`avante_pix_${orderId}`);
            if (rawPix) localPix = JSON.parse(rawPix);
          } catch (e) {}

          // Map snake_case to the confirmation component expected attributes
          fetchedOrder = {
            id: rawOrder.id,
            numero_pedido: rawOrder.numero_pedido || rawOrder.id,
            created: rawOrder.created,
            status: rawOrder.status === 'processando' ? 'confirmed' : (rawOrder.status || 'confirmed'),
            items: Array.isArray(rawOrder.items) ? rawOrder.items : (Array.isArray(rawOrder.itens) ? rawOrder.itens : []),
            shippingAddress: parsedAddress,
            paymentMethod: rawOrder.forma_pagamento || rawOrder.metodo_pagamento || 'credit_card',
            installments: rawOrder.installments || 1,
            subtotal: rawOrder.subtotal || (rawOrder.valor_total - (rawOrder.valor_frete || 0) + (rawOrder.valor_desconto || 0)) || 0,
            shippingCost: rawOrder.valor_frete || rawOrder.shippingCost || 0,
            discount: rawOrder.valor_desconto || rawOrder.discount || 0,
            discountLabel: rawOrder.discountLabel || 'Desconto Progressivo',
            total: rawOrder.valor_total || rawOrder.total || 0,
            estimatedDelivery: rawOrder.estimatedDelivery || '3 a 5 dias úteis',
            cliente_nome: rawOrder.cliente_nome || '',
            cliente_telefone: rawOrder.cliente_telefone || '',
            cliente_cpf: rawOrder.cliente_cpf || rawOrder.cpf || '',
            cliente_email: rawOrder.cliente_email || '',
            cliente_id: rawOrder.cliente_id || '',
            observacoes: rawOrder.observacoes || '',
            pix_copia_cola: rawOrder.pix_copia_cola || localPix?.qr_code || localPix?.pix_copia_cola || '',
            pix_qr_code_base64: rawOrder.pix_qr_code_base64 || localPix?.qr_code_base64 || localPix?.pix_qr_code_base64 || '',
            pix_expiracao: rawOrder.pix_expiracao || localPix?.date_of_expiration || localPix?.pix_expiracao || '',
            boleto_barcode: rawOrder.boleto_barcode || '',
            boleto_url: rawOrder.boleto_url || '',
            isPaid: rawOrder.status === 'confirmado' || rawOrder.status === 'pago',
            rawStatus: rawOrder.status || 'pendente'
          };

          // Avaliação de Primeira Compra para exibição do Cupom VIP da Lia
          try {
            let isReseller = false;
            if (rawOrder.cliente_id) {
              try {
                const uRec = await pb.collection('users').getOne(rawOrder.cliente_id, { $autoCancel: false });
                if (uRec?.tipo_cliente === 'revendedor' || uRec?.tipo_cliente === 'reseller') {
                  isReseller = true;
                }
              } catch (e) {}
            }

            if (!isReseller) {
              const cleanCpf = (rawOrder.cliente_cpf || rawOrder.cpf || '').replace(/\D/g, '');
              const cleanEmail = (rawOrder.cliente_email || '').trim().toLowerCase();
              
              let filterQuery = '';
              if (cleanCpf && cleanCpf.length >= 11) {
                filterQuery = `cpf ~ "${cleanCpf}" || cliente_cpf ~ "${cleanCpf}"`;
              } else if (cleanEmail) {
                filterQuery = `cliente_email = "${cleanEmail}"`;
              }

              if (filterQuery) {
                const pastOrders = await pb.collection('pedidos').getList(1, 2, {
                  filter: filterQuery,
                  $autoCancel: false
                });
                if (pastOrders.totalItems <= 1) {
                  setIsFirstPurchase(true);
                }
              } else {
                setIsFirstPurchase(true);
              }
            }
          } catch (errCheck) {
            console.warn('[OrderConfirmation] Verificação de 1ª compra:', errCheck);
          }
        } catch (err1) {
          console.log('[OrderConfirmation] Coleção "pedidos" falhou, tentando "orders"...', err1);
          try {
            // Attempt 2: Fetch from 'orders' collection
            const rawOrder = await pb.collection('orders').getOne(orderId, { $autoCancel: false });
            fetchedOrder = rawOrder;
          } catch (err2) {
            console.error('[OrderConfirmation] Falha ao recuperar o pedido em ambas as coleções:', err2);
            throw err2;
          }
        }
        setOrder(fetchedOrder);

        const suggestionsRes = await pb.collection('products').getList(1, 3, {
          filter: 'is_novidade = true',
          sort: '-created',
          $autoCancel: false
        });

        setSuggestions(suggestionsRes.items);
      } catch (error) {
        console.error('Error fetching confirmation data:', error);
        toast.error('Não foi possível carregar todos os detalhes do pedido.');
      } finally {
        setLoading(false);
      }
    };

    const fetchTimer = setTimeout(fetchOrderAndSuggestions, 300);
    return () => clearTimeout(fetchTimer);
  }, [orderId]);

  // Track Purchase Event
  useEffect(() => {
    if (order && !loading) {
      trackPurchase(order.numero_pedido || order.id, order.total, order.items || [], order.paymentMethod);
    }
  }, [order, loading]);

  // Celebração de "PARABÉNS!" com confetes ao confirmar o pagamento
  useEffect(() => {
    if (searchParams.get('celebrate') === '1' || searchParams.get('celebrate') === 'true') {
      setShowCelebration(true);
      return;
    }
    if (order?.isPaid) {
      const orderKey = order.numero_pedido || order.id;
      const alreadyCelebrated = sessionStorage.getItem(`avante_celebrated_${orderKey}`);
      if (!alreadyCelebrated) {
        setShowCelebration(true);
        sessionStorage.setItem(`avante_celebrated_${orderKey}`, 'true');
      }
    }
  }, [order?.isPaid, order?.id, order?.numero_pedido, searchParams]);

  // Polling em tempo real e recuperação imediata para PIX / Boleto
  useEffect(() => {
    if (!orderId || orderId === 'preview' || orderId === 'demo' || orderId === 'teste' || !order || order.isPaid) return;

    let isMounted = true;

    const checkStatus = async () => {
      try {
        const res = await apiServerClient.fetch(`/payment/order-status/${orderId}`);
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.isApproved) {
            setOrder(prev => prev ? {
              ...prev,
              status: 'confirmed',
              isPaid: true,
              rawStatus: 'confirmado',
            } : prev);
            setShowCelebration(true);
            toast.success('🎉 Pagamento aprovado com sucesso! Seu pedido já está sendo preparado pela fábrica.');
            return;
          }
          if (data.pix_copia_cola || data.pix_qr_code_base64) {
            setOrder(prev => prev ? {
              ...prev,
              pix_copia_cola: data.pix_copia_cola || prev.pix_copia_cola,
              pix_qr_code_base64: data.pix_qr_code_base64 || prev.pix_qr_code_base64,
              pix_expiracao: data.pix_expiracao || prev.pix_expiracao,
            } : prev);
          }
        }
      } catch (err) {
        // silencioso
      }
    };

    // Dispara checagem imediata
    checkStatus();

    // Se após 1.5s o QR Code ainda estiver ausente e o método for PIX, solicita diretamente ao backend
    const fallbackTimer = setTimeout(async () => {
      if (order.paymentMethod === 'pix' && !order.pix_copia_cola && isMounted) {
        try {
          const pixRes = await apiServerClient.fetch('/payment/pix-transparent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          });
          if (pixRes.ok && isMounted) {
            const pixData = await pixRes.json();
            if (pixData.qr_code || pixData.qr_code_base64) {
              setOrder(prev => prev ? {
                ...prev,
                pix_copia_cola: pixData.qr_code || prev.pix_copia_cola,
                pix_qr_code_base64: pixData.qr_code_base64 || prev.pix_qr_code_base64,
                pix_expiracao: pixData.date_of_expiration || prev.pix_expiracao,
              } : prev);
              try {
                sessionStorage.setItem(`avante_pix_${orderId}`, JSON.stringify(pixData));
              } catch (e) {}
            }
          }
        } catch (e) {
          console.warn('[OrderConfirmation] Fallback de geração PIX:', e);
        }
      }
    }, 1500);

    const interval = setInterval(checkStatus, 3500);

    return () => {
      isMounted = false;
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, [orderId, order?.isPaid, order?.pix_copia_cola, order?.paymentMethod]);

  // Contagem regressiva do PIX (30 minutos)
  useEffect(() => {
    if (!order || order.isPaid || order.paymentMethod !== 'pix') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [order?.isPaid, order?.paymentMethod]);

  const handleCopyPix = () => {
    if (!order?.pix_copia_cola) return;
    navigator.clipboard.writeText(order.pix_copia_cola);
    setPixCopied(true);
    toast.success('Chave PIX Copia e Cola copiada com sucesso! Abra o app do seu banco para pagar.');
    setTimeout(() => setPixCopied(false), 4000);
  };

  const handleRegeneratePix = async () => {
    if (!orderId || orderId === 'preview' || orderId === 'demo' || orderId === 'teste') {
      toast.success('QR Code Oficial atualizado com sucesso!');
      return;
    }
    setIsRegeneratingPix(true);
    try {
      const pixRes = await apiServerClient.fetch('/payment/pix-transparent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      if (pixRes.ok) {
        const pixData = await pixRes.json();
        if (pixData.qr_code || pixData.qr_code_base64) {
          setOrder(prev => prev ? {
            ...prev,
            pix_copia_cola: pixData.qr_code || prev.pix_copia_cola,
            pix_qr_code_base64: pixData.qr_code_base64 || prev.pix_qr_code_base64,
            pix_expiracao: pixData.date_of_expiration || prev.pix_expiracao,
          } : prev);
          try {
            sessionStorage.setItem(`avante_pix_${orderId}`, JSON.stringify(pixData));
          } catch (e) {}
          toast.success('Novo QR Code PIX carregado com sucesso!');
        }
      } else {
        const err = await pixRes.json();
        toast.error(err.error || 'Não foi possível gerar novo QR Code no momento.');
      }
    } catch (e) {
      toast.error('Erro de conexão ao gerar o PIX.');
    } finally {
      setIsRegeneratingPix(false);
    }
  };

  const handleCopyBoleto = () => {
    if (!order?.boleto_barcode) return;
    navigator.clipboard.writeText(order.boleto_barcode);
    setBoletoCopied(true);
    toast.success('Linha digitável do boleto copiada com sucesso!');
    setTimeout(() => setBoletoCopied(false), 4000);
  };

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const copyCoupon = () => {
    navigator.clipboard.writeText('AVANTELIA10');
    setCouponCopied(true);
    toast.success('Cupom AVANTELIA10 copiado! Aproveite 10% OFF no seu próximo pedido.');
    setTimeout(() => setCouponCopied(false), 4000);
  };

  const handleActivateVipCoupon = async () => {
    if (isActivatingCoupon || couponActivated) return;
    setIsActivatingCoupon(true);
    try {
      const cleanPhone = (order?.cliente_telefone || '').replace(/\D/g, '');
      const cleanCpf = (order?.cliente_cpf || '').replace(/\D/g, '');
      const orderNum = order?.numero_pedido || order?.id || '';

      // 1. Notifica o backend para disparar mensagem oficial da Lia no WhatsApp
      try {
        await apiServerClient.fetch('/notificacoes/ativar-cupom-vip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: orderNum,
            whatsapp: cleanPhone,
            nome: order?.cliente_nome || 'Cliente',
            cpf: cleanCpf
          })
        });
      } catch (errApi) {
        console.warn('[OrderConfirmation] Falha ao acionar API da Lia:', errApi);
      }

      setCouponActivated(true);
      toast.success('✨ Presente VIP ativado! Redirecionando para o WhatsApp da Lia...');

      // 2. Abre o WhatsApp com a mensagem da Lia pré-preenchida
      const liaNumber = '5522981225010';
      const waMsg = encodeURIComponent(
        `Olá Lia! ✨ Acabei de fazer minha 1ª compra (Pedido ${orderNum}) e amei meu presente de 10% OFF com o cupom AVANTELIA10! Já deixei salvo aqui no nosso chat para o meu próximo pedido de varejo. Muito obrigada pelo carinho!`
      );
      setTimeout(() => {
        window.open(`https://wa.me/${liaNumber}?text=${waMsg}`, '_blank');
      }, 500);
    } catch (err) {
      console.error('[OrderConfirmation] Erro ao ativar cupom VIP:', err);
      toast.error('Não foi possível conectar com o WhatsApp da Lia no momento.');
    } finally {
      setIsActivatingCoupon(false);
    }
  };

  const handleSupportClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de falar sobre o meu pedido ${order?.numero_pedido || order?.id}`);
    window.open(`https://wa.me/5522981225010?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] pt-32 pb-24 px-4 flex flex-col items-center">
        <Skeleton className="w-16 h-16 rounded-full mb-6 bg-[#c59b5f]/20" />
        <Skeleton className="w-3/4 max-w-md h-10 mb-4 bg-gray-800" />
        <Skeleton className="w-1/2 max-w-sm h-6 mb-12 bg-gray-800" />
        <Skeleton className="w-full max-w-4xl h-[400px] rounded-2xl bg-gray-800" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-serif font-bold text-white mb-4">Pedido não encontrado</h1>
        <p className="text-gray-400 mb-8 max-w-md font-light leading-relaxed">Não conseguimos localizar as informações deste pedido no momento.</p>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#c59b5f] hover:bg-[#a37c46] text-white border border-[#a37c46]/30 rounded-2xl px-10 py-6 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md active:scale-95"
        >
          Voltar para a Loja
        </Button>
      </div>
    );
  }

  const statusSteps = [
    { id: 'confirmed', label: 'Pedido Confirmado', icon: CheckCircle2, active: true, date: order.created },
    { id: 'separation', label: 'Em separação', icon: Package, active: false, date: null },
    { id: 'shipped', label: 'Enviado', icon: Truck, active: false, date: null },
    { id: 'delivered', label: 'Entregue', icon: Home, active: false, date: null }
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] pb-24 font-sans text-gray-800">
      <Helmet>
        <title>Pedido Confirmado | Avante Lingerie</title>
      </Helmet>

      {/* LUXURY GLOWING TOP BANNER */}
      <div className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden shadow-premium border-b border-[#c59b5f]/15">
        <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay"></div>
        {/* Decorative glow elements */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#c59b5f]/10 rounded-full flex items-center justify-center mb-8 border border-[#c59b5f]/20 shadow-[0_0_30px_rgba(197,155,95,0.25)]">
            {order.paymentMethod === 'pix' && !order.isPaid ? (
              <Sparkles className="w-10 h-10 text-[#c59b5f] animate-pulse" strokeWidth={1.5} />
            ) : order.paymentMethod === 'boleto' && !order.isPaid ? (
              <Clock className="w-10 h-10 text-[#c59b5f]" strokeWidth={1.5} />
            ) : (
              <CheckCircle2 className="w-10 h-10 text-[#c59b5f]" strokeWidth={1.5} />
            )}
          </div>

          <h1 className="text-3xl md:text-4.5xl lg:text-5.5xl font-serif font-bold text-white mb-4 tracking-tight text-balance leading-tight">
            {order.paymentMethod === 'pix' && !order.isPaid
              ? 'Aguardando Pagamento do PIX ⚡'
              : order.paymentMethod === 'boleto' && !order.isPaid
              ? 'Aguardando Pagamento do Boleto 📄'
              : 'Pedido confirmado com sucesso ✨'}
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl font-light text-balance leading-relaxed">
            {order.paymentMethod === 'pix' && !order.isPaid
              ? 'Seu pedido foi registrado na fábrica! Conclua o pagamento via PIX no seu banco para que a confecção e separação iniciem imediatamente.'
              : order.paymentMethod === 'boleto' && !order.isPaid
              ? 'Seu boleto bancário foi gerado com sucesso. Efetue o pagamento em qualquer banco ou aplicativo para liberação do pedido.'
              : 'Seu pedido Avante já está sendo preparado com todo o nosso carinho e rigor de alta costura. Enviamos os detalhes completos para o seu e-mail.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 flex flex-col gap-8">

        {/* SLEEK MINIMAL HORIZONTAL TRACKER (APENAS APÓS O PAGAMENTO CONFIRMADO) */}
        {order.isPaid && (
          <div className="bg-white border border-[#c59b5f]/30 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#c59b5f]" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900 font-serif">
                  Acompanhamento da Produção & Entrega
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Pagamento Aprovado
              </span>
            </div>

            {/* Linha Horizontal Elegante */}
            <div className="relative flex items-center justify-between px-1 sm:px-6">
              {/* Linha contínua de fundo */}
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200 z-0">
                <div className="h-full bg-gradient-to-r from-[#deb881] to-[#c59b5f] w-1/4 transition-all duration-700" />
              </div>

              {statusSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      step.active
                        ? 'bg-gradient-to-br from-[#deb881] to-[#c59b5f] text-black shadow-sm ring-4 ring-[#c59b5f]/20 font-bold'
                        : 'bg-white border border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" strokeWidth={step.active ? 2.5 : 1.5} />
                    </div>
                    <span className={`text-[10px] sm:text-xs mt-1.5 font-medium max-w-[68px] sm:max-w-none truncate sm:whitespace-normal ${step.active ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                    {step.date ? (
                      <span className="text-[9px] text-[#c59b5f] font-mono mt-0.5">
                        {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(step.date))}
                      </span>
                    ) : (
                      <span className="text-[9px] text-gray-400 mt-0.5">Aguardando</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CARD NOBRE DO PIX TRANSPARENTE NATIVO (LIGHT LUXURY HAUTE COUTURE) */}
        {order.paymentMethod === 'pix' && !order.isPaid && (
          <Card className="border-2 border-[#c59b5f]/60 shadow-[0_12px_45px_rgba(197,155,95,0.18)] rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#FFF8EE] text-gray-900">
            <div className="bg-gradient-to-r from-[#FAF4EA] via-[#F4ECE0] to-[#FAF4EA] px-6 sm:px-8 py-5 border-b border-[#c59b5f]/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-amber-950">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-950">
                  Pagamento Instantâneo PIX • 5% OFF Garantido
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Aguardando Pagamento ({formatCountdown(timeLeft)})
                </span>
              </div>
            </div>

            <CardContent className="p-5 sm:p-8 md:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10 w-full overflow-hidden">
              {/* Imagem do QR Code em Destaque */}
              <div className="flex flex-col items-center shrink-0 w-full sm:w-auto">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-white p-3 shadow-md border-2 border-[#deb881] flex items-center justify-center relative overflow-hidden">
                  {order.pix_qr_code_base64 || order.pix_qr_code_url ? (
                    <img
                      src={order.pix_qr_code_url || (order.pix_qr_code_base64?.startsWith('data:') ? order.pix_qr_code_base64 : `data:image/png;base64,${order.pix_qr_code_base64}`)}
                      alt="QR Code PIX Avante Lingerie"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 text-center p-4">
                      <Sparkles className="w-8 h-8 text-[#c59b5f] animate-spin mb-2" />
                      <span className="text-xs font-semibold text-gray-800">Gerando QR Code Oficial...</span>
                      <p className="text-[10px] text-gray-500 font-light mt-1 max-w-[180px]">
                        Conectando com o Banco Central
                      </p>
                      <Button
                        onClick={handleRegeneratePix}
                        disabled={isRegeneratingPix}
                        className="mt-3 text-[11px] font-bold bg-[#FAF4EA] text-amber-900 hover:bg-[#F5ECE0] border border-[#c59b5f]/40 px-3 py-1.5 h-auto rounded-lg cursor-pointer"
                      >
                        {isRegeneratingPix ? 'Atualizando...' : 'Recarregar QR Code'}
                      </Button>
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-gray-600 mt-2.5 font-medium text-center">
                  Aponte a câmera no aplicativo do seu banco
                </span>
              </div>

              {/* Chave Copia e Cola & Instruções com Distribuição Perfeita */}
              <div className="flex-1 min-w-0 w-full flex flex-col text-center lg:text-left justify-between">
                <div>
                  <span className="text-xs text-gray-600 font-medium block uppercase tracking-wider mb-1">
                    Valor com Desconto de Fábrica
                  </span>
                  <div className="flex items-baseline gap-3 justify-center lg:justify-start flex-wrap">
                    <span className="text-3xl sm:text-4.5xl font-serif font-black text-[#8c6721]">
                      {formatPrice(order.total)}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      Economia de 5% Aplicada
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 font-normal mt-3 leading-relaxed">
                    Se você estiver no celular, toque no botão abaixo para copiar a chave e utilize a opção <strong>"PIX Copia e Cola"</strong> no app do seu banco:
                  </p>

                  {/* Campo Copia e Cola com Botão Nobre */}
                  <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-2.5 w-full">
                    <div className="flex-1 min-w-0 bg-white border border-[#deb881]/60 rounded-xl px-4 py-3.5 text-xs font-mono text-gray-800 truncate select-all shadow-inner">
                      {order.pix_copia_cola || 'Carregando chave PIX...'}
                    </div>
                    <Button
                      onClick={handleCopyPix}
                      disabled={!order.pix_copia_cola}
                      className="w-full sm:w-auto shrink-0 bg-gradient-to-r from-[#deb881] via-[#c59b5f] to-[#b0874c] hover:from-[#c59b5f] hover:to-[#deb881] text-black font-black text-xs uppercase tracking-wider py-4 sm:py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {pixCopied ? (
                        <>
                          <Check className="w-4 h-4 text-black stroke-[3]" />
                          <span>Chave Copiada!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-black stroke-[2.5]" />
                          <span>Copiar Código PIX</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Radar e Atualização Automática */}
                <div className="mt-6 pt-4 border-t border-[#c59b5f]/20 flex items-center justify-center lg:justify-start gap-3 text-xs text-gray-700">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="font-medium text-gray-700 text-balance">
                    Identificação em tempo real: esta página será atualizada automaticamente assim que o pagamento for concluído.
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CARD NOBRE DO BOLETO TRANSPARENTE */}
        {order.paymentMethod === 'boleto' && !order.isPaid && (
          <Card className="border-2 border-amber-600/40 shadow-premium-sm rounded-3xl overflow-hidden bg-white text-gray-900">
            <div className="bg-amber-50 px-6 sm:px-8 py-5 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-amber-900">
                <Clock className="w-5 h-5 text-amber-700" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Boleto Bancário Gerado com Sucesso
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Vencimento em 3 dias úteis
              </span>
            </div>

            <CardContent className="p-6 sm:p-8 flex flex-col gap-5 text-left">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                  Utilize a linha digitável abaixo para pagar pelo aplicativo do seu banco ou internet banking, ou clique para visualizar e imprimir o boleto oficial:
                </p>

                {order.boleto_barcode && (
                  <div className="mt-4 flex flex-col sm:flex-row items-stretch gap-2.5">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono text-gray-800 select-all truncate">
                      {order.boleto_barcode}
                    </div>
                    <Button
                      onClick={handleCopyBoleto}
                      className="bg-gray-900 hover:bg-[#c59b5f] text-white hover:text-black text-xs font-bold uppercase tracking-wider py-5 px-5 rounded-xl transition-all"
                    >
                      {boletoCopied ? 'Linha Copiada!' : 'Copiar Linha Digitável'}
                    </Button>
                  </div>
                )}
              </div>

              {order.boleto_url && (
                <div className="flex justify-start">
                  <Button
                    onClick={() => window.open(order.boleto_url, '_blank')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider py-5 px-6 rounded-xl flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Baixar / Visualizar Boleto PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* VIP DIGITAL GIFT DELIVERY CARD */}
        {resolvedGift && (
          <Card className="border border-[#D4AF37]/50 shadow-[0_0_35px_rgba(212,175,55,0.2)] rounded-3xl overflow-hidden bg-gradient-to-br from-[#17140e] via-[#0d0b08] to-[#1a150e] text-white">
            <div className="bg-gradient-to-r from-[#2a2113] via-[#1a150e] to-[#2a2113] px-6 sm:px-8 py-4 border-b border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Gift className="w-5 h-5 animate-bounce" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">
                  {resolvedGift.is_combo
                    ? (order.isPaid ? 'Combo 3 Aplicativos VIP Liberado' : 'Combo 3 Apps VIP Reservado na Fábrica')
                    : (order.isPaid ? 'Seu Presente VIP da Fábrica está Liberado' : 'Seu Presente VIP da Fábrica está Reservado')}
                </span>
              </div>
              {order.isPaid ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34d399]/20 text-[#34d399] border border-[#34d399]/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Acesso Imediato
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" /> Liberado Após Pagamento do PIX
                </span>
              )}
            </div>

            <CardContent className="p-6 sm:p-8">
              {resolvedGift.is_combo ? (
                <div className="flex flex-col gap-6">
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white">
                      {order.isPaid ? (
                        <>Parabéns! Você destravou o <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Combo Completo dos 3 Apps VIP</span></>
                      ) : (
                        <>Seu <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Combo dos 3 Apps VIP</span> está Reservado</>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 font-light mt-1">
                      {order.isPaid
                        ? 'Todos os seus aplicativos já estão liberados e configurados para uso. Toque em qualquer um dos botões abaixo para abrir e começar a usar agora:'
                        : 'Seus 3 aplicativos já estão reservados com exclusividade. Conclua o pagamento do PIX acima para desbloquear o acesso vitalício de cada um deles:'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {MIMO_APPS.map((app) => (
                      <div 
                        key={app.id} 
                        className="bg-[#120f0a] border border-[#D4AF37]/30 rounded-2xl p-4 flex flex-col justify-between hover:border-[#D4AF37] transition-all group"
                      >
                        <div>
                          <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-transparent flex items-center justify-center">
                            <img src={app.coverImage} alt={app.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                            ★ {app.badge}
                          </span>
                          <h4 className="text-sm font-bold text-white mb-1.5 line-clamp-1">{app.name}</h4>
                          <p className="text-[11px] text-gray-400 font-light line-clamp-2 mb-4 leading-relaxed">{app.subtitle}</p>
                        </div>

                        {order.isPaid ? (
                          <Button
                            onClick={() => window.open(app.appUrl, '_blank', 'noopener,noreferrer')}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider py-5 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Acessar App
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setShowGiftLockModal(true)}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold text-xs uppercase tracking-wider py-5 rounded-xl border border-amber-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Lock className="w-3.5 h-3.5 text-amber-400" /> Acesso Reservado
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
                  <div className="w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shrink-0 border-2 border-[#D4AF37]/40 shadow-[0_0_25px_rgba(212,175,55,0.3)] bg-transparent flex items-center justify-center">
                    <img 
                      src={(resolvedGift.coverImage || '/assets/mimos/caixa-presente-ganhouu.png').replace('.jpg', '.png')} 
                      alt={resolvedGift.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  <div className="flex flex-col flex-1 text-center sm:text-left justify-between h-full">
                    <div>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mb-2 ${order.isPaid ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30' : 'text-amber-300 bg-amber-500/15 border-amber-500/30'}`}>
                        {order.isPaid ? '★ Presente Exclusivo Liberado' : '🔒 Presente VIP Reservado'}
                      </span>
                      <h3 className="text-xl sm:text-2.5xl font-serif font-extrabold text-white">
                        {resolvedGift.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 font-light mt-2 leading-relaxed max-w-xl">
                        {order.isPaid
                          ? (resolvedGift.subtitle || 'Seu aplicativo VIP oficial está 100% liberado para acompanhar o seu pedido. Você pode utilizá-lo direto no seu navegador ou salvar como atalho na tela inicial do seu celular.')
                          : 'Seu aplicativo VIP oficial já está reservado com carinho para acompanhar suas peças. Ele será liberado automaticamente com acesso vitalício nesta mesma página assim que o pagamento do PIX for confirmado.'}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 justify-center sm:justify-start w-full">
                      {order.isPaid ? (
                        <Button
                          onClick={() => window.open(resolvedGift.appUrl || '/mimos/maquina-de-vendas', '_blank', 'noopener,noreferrer')}
                          className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:from-[#F59E0B] hover:to-[#D4AF37] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-6 rounded-2xl shadow-[0_6px_25px_rgba(212,175,55,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4 text-black" />
                          <span>Acessar {resolvedGift.name} Agora</span>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setShowGiftLockModal(true)}
                          className="w-full sm:w-auto bg-zinc-800/90 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-6 rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Lock className="w-4 h-4 text-amber-400" />
                          <span>Liberar {resolvedGift.name} (Após o PIX)</span>
                        </Button>
                      )}

                      <span className="text-[11px] text-gray-400 font-light">
                        {order.isPaid ? '(Abre em uma nova aba com acesso vitalício)' : '(Acesso vitalício liberado imediatamente após a confirmação)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ITEMS LIST COLUMN */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Card className="border border-gray-200 shadow-sm rounded-3xl overflow-hidden bg-white h-full transition-all hover:shadow-md">
              <div className="bg-[#1A1A1A] px-6 py-5 border-b border-[#c59b5f]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#c59b5f]" strokeWidth={1.5} />
                  Itens do Pedido
                </h2>
                <span className="text-xs font-bold text-[#1A1A1A] bg-[#c59b5f] px-4 py-1.5 rounded-full border border-[#c59b5f]/20 tracking-wider shadow-sm uppercase">
                  {order.numero_pedido}
                </span>
              </div>

              <CardContent className="p-0 bg-white">
                <div className="flex flex-col divide-y divide-gray-100">
                  {order.items.map((item, idx) => {
                    const name = item.name || item.nome || '';
                    const size = item.size || item.tamanho || '';
                    const color = item.color || item.cor || '';
                    const quantity = Number(item.quantity !== undefined ? item.quantity : item.quantidade) || 0;
                    const rawPrice = Number(item.price !== undefined ? item.price : item.preco) || 0;
                    const isMimoOrDigital = Boolean(item.is_mimo || item.is_digital || name.toLowerCase().includes('app vip') || name.toLowerCase().includes('brinde'));
                    const isFreeGift = isMimoOrDigital && (!item.is_combo_item || Number(item.preco_unitario) === 0 || rawPrice <= 0.05);
                    const price = isFreeGift ? 0 : rawPrice;

                    const image = item.image || item.imagem || '';
                    const imageUrl = image
                      ? (image.startsWith('http') || image.startsWith('/') ? image : `${pb.baseUrl}/api/files/products/${item.id}/${image}`)
                      : (isMimoOrDigital ? '/assets/mimos/capa-cintura-esculpida-3d.png' : '');
                    const isVideo = imageUrl.toLowerCase().endsWith('.mp4') || imageUrl.toLowerCase().endsWith('.webm') || imageUrl.toLowerCase().endsWith('.mov');

                    return (
                      <div key={idx} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                        <div className={`w-20 h-24 rounded-2xl ${isMimoOrDigital ? 'bg-white p-1.5 border border-[#c59b5f]/25 shadow-2xs' : 'bg-gray-50 border border-gray-200'} overflow-hidden shrink-0 flex items-center justify-center`}>
                          {imageUrl ? (
                            isVideo ? (
                              <div className="w-full h-full relative bg-[#1a1a1a] flex items-center justify-center">
                                <div className="w-7 h-7 rounded-full bg-[#c59b5f] flex items-center justify-center shadow-md">
                                  <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                                </div>
                              </div>
                            ) : (
                              <img src={imageUrl} alt={name} className={`w-full h-full ${isMimoOrDigital ? 'object-contain' : 'object-cover'}`} />
                            )
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 justify-between h-full min-h-[6rem]">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{name}</h3>
                              {isFreeGift && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  🎁 Brinde VIP Grátis
                                </span>
                              )}
                              {item.is_combo_item && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                                  💎 App VIP Combo
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 font-light mt-1">
                              Tamanho: {size} | Cor: {color}
                            </p>
                          </div>
                          <div className="flex items-end justify-between mt-2">
                            <span className="text-xs font-medium text-gray-500">Qtd: {quantity}</span>
                            {isFreeGift ? (
                              <span className="text-base font-bold text-emerald-600">GRÁTIS</span>
                            ) : (
                              <span className="text-base font-bold text-[#c59b5f]">{formatPrice(price * quantity)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FINANCIAL SUMMARY & DELIVERY COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            <Card className="border border-gray-200 shadow-sm rounded-3xl overflow-hidden bg-white transition-all hover:shadow-md">
              <div className="bg-[#1A1A1A] px-6 py-5 border-b border-gray-800">
                <h2 className="font-serif font-bold text-lg text-white">Resumo Financeiro</h2>
              </div>
              <CardContent className="p-6 flex flex-col gap-4 bg-white">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frete ({order.estimatedDelivery})</span>
                  <span className="font-semibold text-gray-900">{formatPrice(order.shippingCost)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-emerald-600 font-bold bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                    <span>Desconto ({order.discountLabel})</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}

                <Separator className="bg-gray-100" />

                <div className="flex justify-between items-center py-2">
                  <span className="font-bold text-gray-900 font-serif">
                    {order.isPaid ? 'Total Pago' : 'Total a Pagar'}
                  </span>
                  <span className="text-2xl md:text-3xl font-extrabold text-[#c59b5f]">{formatPrice(order.total)}</span>
                </div>

                {order.paymentMethod === 'pix' ? (
                  <div className={`mt-2 flex items-center gap-2.5 text-xs p-4 rounded-2xl border font-medium ${order.isPaid ? 'text-emerald-900 bg-emerald-50/90 border-emerald-300' : 'text-amber-900 bg-amber-50/90 border-amber-200'}`}>
                    {order.isPaid ? (
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Zap className="w-4.5 h-4.5 text-amber-600 fill-amber-500 shrink-0" />
                    )}
                    <span>
                      Forma de Pagamento: <strong className="text-gray-950 uppercase font-extrabold">PIX Instantâneo (5% OFF)</strong>
                      {order.isPaid ? ' — Confirmado com Sucesso' : ' — Aguardando Pagamento'}
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2.5 text-xs text-gray-700 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300 font-medium">
                    <CreditCard className="w-4.5 h-4.5 text-[#c59b5f] shrink-0" strokeWidth={1.5} />
                    <span>
                      {order.isPaid ? 'Pago com sucesso via ' : 'Forma de Pagamento: '}
                      <strong className="text-gray-950 uppercase font-extrabold">
                        {(order.paymentMethod === 'credit_card' || order.paymentMethod === 'credito') ? 'Cartão de Crédito' : 'Boleto Bancário'}
                      </strong>
                      {order.installments > 1 ? ` em ${order.installments}x no cartão` : ''}
                      {!order.isPaid && order.paymentMethod === 'boleto' ? ' — Aguardando Compensação' : ''}
                    </span>
                  </div>
                )}

                {order.paymentMethod === 'boleto' && (
                  <div className="mt-3 bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-xs text-amber-800 leading-relaxed font-light">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="text-left">
                      <strong className="block font-serif text-sm font-bold text-amber-900 mb-1">Aviso sobre o Boleto:</strong>
                      A compensação bancária pode levar **de 1 a 3 dias úteis**. 
                      Seu pedido será separado e postado somente após a confirmação sistêmica automática do Mercado Pago. 
                      O envio de comprovantes de pagamento não antecipa a liberação do pedido.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm rounded-3xl overflow-hidden bg-white transition-all hover:shadow-md">
              <div className="bg-[#1A1A1A] px-6 py-5 border-b border-gray-800">
                <h2 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#c59b5f]" strokeWidth={1.5} />
                  Endereço de Entrega
                </h2>
              </div>
              <CardContent className="p-6 bg-white">
                <address className="not-italic text-sm text-gray-600 leading-relaxed font-light">
                  <strong className="text-gray-900 block mb-2 font-serif text-base">Sua Residência</strong>
                  {order.shippingAddress.rua}, {order.shippingAddress.numero}
                  {order.shippingAddress.complemento && ` - ${order.shippingAddress.complemento}`}<br />
                  {order.shippingAddress.bairro}<br />
                  {order.shippingAddress.cidade} - {order.shippingAddress.estado}<br />
                  CEP: {order.shippingAddress.cep}
                </address>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* LIA VIP WELCOME COUPON CARD (Exclusivo para 1ª Compra no Varejo) */}
        {isFirstPurchase && (
          <div className="bg-gradient-to-br from-[#1c1813] via-[#141414] to-[#0d0d0d] border border-[#c59b5f]/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-premium relative overflow-hidden transition-all duration-300">
            {/* Glow decorativo de alta costura */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#c59b5f]/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Avatar da Lia com status online ao vivo */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-[#c59b5f]/40 shadow-xl bg-[#242424]">
                  <img
                    src="/lia-padrao.jpg"
                    alt="Lia • Consultora VIP Avante Lingerie"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-[#141414] rounded-full ring-2 ring-emerald-400/50 shadow-sm animate-pulse" title="Lia Online no WhatsApp"></span>
              </div>

              {/* Conteúdo Persuasivo de Boas-Vindas */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/30 text-[#c59b5f] text-xs font-semibold tracking-wider uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c59b5f] animate-ping"></span>
                  Presente Exclusivo de 1ª Compra
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 leading-snug">
                  Parabéns pela sua 1ª compra! A Lia preparou um presente para você ✨
                </h3>
                <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
                  Para celebrar sua chegada ao universo Avante Lingerie, você ganhou <strong className="text-white font-semibold">10% OFF</strong> no subtotal da sua próxima compra no varejo (a partir de R$ 59,90).
                </p>

                {/* Bloco do Cupom e Ação */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {/* Caixa do Código com Copiar */}
                  <div className="inline-flex items-center bg-[#0d0d0d] border border-[#c59b5f]/50 rounded-xl p-1.5 shadow-inner">
                    <span className="px-4 py-2 font-mono font-bold text-base sm:text-lg tracking-widest text-[#c59b5f] select-all">
                      AVANTELIA10
                    </span>
                    <Button
                      type="button"
                      onClick={copyCoupon}
                      className="bg-[#c59b5f] hover:bg-[#a37c46] text-white rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all shadow"
                    >
                      {couponCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 mr-1 text-emerald-200" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Botão de 1 Clique: Salvar/Ativar no WhatsApp da Lia */}
                  <Button
                    type="button"
                    onClick={handleActivateVipCoupon}
                    disabled={isActivatingCoupon}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-5 py-3 text-xs sm:text-sm font-bold tracking-wide uppercase shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-100" />
                    {couponActivated ? 'Presente Salvo no WhatsApp ✓' : (isActivatingCoupon ? 'Salvando...' : 'Salvar Presente no WhatsApp da Lia')}
                  </Button>
                </div>

                <p className="text-[11px] text-gray-400 mt-4 leading-normal">
                  🔒 Válido para 1 único uso por CPF no Varejo • Pedido mínimo de R$ 59,90 • Não cumulativo com PIX ou outras promoções.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT SUGGESTIONS */}
        {suggestions.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#c59b5f]/15">
            <div className="text-center mb-16">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
                Sugestões do Nosso Ateliê
              </span>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">
                Complete sua experiência Avante
              </h2>
              <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {suggestions.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onComprarAgora={(p) => navigate(`/produto/${p.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CUSTOMER SUPPORT CARD */}
          <Card className="bg-[#242424] border border-[#c59b5f]/20 shadow-premium-sm rounded-3xl transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.08)]">
            <CardContent className="p-8">
              <h3 className="font-serif font-bold text-lg text-white mb-6 flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-[#c59b5f]" strokeWidth={1.5} />
                Precisa de ajuda?
              </h3>
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleSupportClick}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl py-6.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Falar no WhatsApp
                </Button>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-[#c59b5f]/20">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">E-mail de Suporte</span>
                    <span className="text-xs text-gray-500 font-light">pedidos@avantelingerie.com.br</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-[#c59b5f]/20">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Horário de Atendimento</span>
                    <span className="text-xs text-gray-500 font-light">Seg-Qui: 8h-17h | Sex: 8h-13h</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AVANTE GUARANTEES */}
          <Card className="bg-[#242424] border border-[#c59b5f]/20 shadow-premium-sm rounded-3xl transition-all duration-300 hover:shadow-[0_12px_30px_rgba(197,155,95,0.08)]">
            <CardContent className="p-8">
              <h3 className="font-serif font-bold text-lg text-white mb-6 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#c59b5f]" strokeWidth={1.5} />
                Garantias Avante
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shadow-sm">
                    <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-sm text-white">Compra Segura</span>
                  <span className="text-xs text-gray-400 leading-relaxed font-light">Seus dados estão 100% protegidos e criptografados.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shadow-sm">
                    <RefreshCcw className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-sm text-white">Troca Facilitada</span>
                  <span className="text-xs text-gray-400 leading-relaxed font-light">Troca em até 7 dias após o recebimento.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shadow-sm">
                    <Truck className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-sm text-white">Envio Garantido</span>
                  <span className="text-xs text-gray-400 leading-relaxed font-light">Acompanhe cada passo da sua entrega em tempo real.</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shadow-sm">
                    <HeartHandshake className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-bold text-sm text-white">Suporte Humanizado</span>
                  <span className="text-xs text-gray-400 leading-relaxed font-light">Nossa equipe de suporte está sempre pronta para te ouvir.</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* GRAND FINALE CELEBRATION BLOCK */}
        <div className="mt-20 mb-10 text-center flex flex-col items-center">
          <div className="w-16 h-1 bg-[#c59b5f]/40 rounded-full mb-8"></div>
          <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-gray-900 max-w-2xl leading-snug mb-10 text-balance">
            Obrigada por escolher a Avante Lingerie. Cada detalhe do seu pedido foi pensado para proporcionar uma experiência elegante do início ao fim.
          </h2>

          <Button
            onClick={() => navigate('/')}
            className="bg-[#c59b5f] hover:bg-[#a37c46] text-white border border-[#a37c46]/50 rounded-2xl px-12 py-7 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl active:scale-[0.98] group flex items-center justify-center"
          >
            CONTINUAR COMPRANDO
            <ChevronRight className="w-4.5 h-4.5 ml-2 text-white group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </div>

      </div>

      {/* MODAL INTELIGENTE E EDUCADO DE BLOQUEIO DO PRESENTE VIP */}
      <Dialog open={showGiftLockModal} onOpenChange={setShowGiftLockModal}>
        <DialogContent className="max-w-md w-[92vw] p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#18140F] via-[#0E0C09] to-[#080705] border border-[#D4AF37]/50 text-white text-center shadow-[0_0_50px_rgba(212,175,55,0.3)] z-50">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock className="w-8 h-8 text-[#deb881]" />
          </div>
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-2">
            ★ Acesso Vitalício Reservado
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-white mb-2 leading-tight">
            Quase lá! Seu <span className="text-[#deb881]">Presente VIP</span> Já Está Garantido 🎁
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
            O seu aplicativo exclusivo acompanha o seu pedido de fábrica.
            <br /><br />
            Para desbloquear o acesso imediato e vitalício, basta efetuar o pagamento do <strong>PIX de R$ {order ? formatPrice(order.total) : ''}</strong> no topo desta página.
            <br /><br />
            A identificação do banco é 100% automática e leva menos de 10 segundos. Assim que compensar, esta página vai atualizar e o botão de acesso será liberado!
          </p>

          <Button
            onClick={() => {
              setShowGiftLockModal(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full bg-gradient-to-r from-[#deb881] via-[#c59b5f] to-[#b0874c] hover:from-[#c59b5f] hover:to-[#deb881] text-black font-extrabold text-xs uppercase tracking-wider py-6 rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            Entendido, Vou Concluir o PIX Acima
          </Button>
        </DialogContent>
      </Dialog>

      {/* OVERLAY DE CELEBRAÇÃO ("PARABÉNS! VENDA CONCLUÍDA") COM CONFETES */}
      <OrderCelebrationOverlay
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
      />

      {/* BARRA DE DEMONSTRAÇÃO / PREVIEW EXCLUSIVA PARA O LOJISTA */}
      {(!orderId || orderId === 'preview' || orderId === 'demo' || orderId === 'teste') && (
        <aside aria-label="Painel de Demonstração" className="fixed bottom-5 right-5 z-50 bg-[#121212]/95 backdrop-blur-md text-white border-2 border-[#deb881]/80 rounded-2xl p-3 sm:p-3.5 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-wrap items-center gap-2 sm:gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[calc(100vw-2rem)]">
          <div className="flex items-center gap-1.5 pr-2 border-r border-white/15">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-serif text-[#deb881] font-bold tracking-wide">Preview Lojista</span>
          </div>
          <button
            type="button"
            onClick={() => setShowCelebration(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-[#deb881] to-[#c59b5f] hover:from-[#c59b5f] hover:to-[#deb881] text-black font-extrabold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" /> Rever "PARABÉNS!" Confetes
          </button>
          <button
            type="button"
            onClick={() => setOrder(prev => ({ ...prev, isPaid: !prev.isPaid }))}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all border border-white/20 active:scale-95 cursor-pointer"
          >
            Alternar: {order?.isPaid ? 'Ver Pendente (PIX Claro)' : 'Ver Aprovado (Rastreio Nobre)'}
          </button>
        </aside>
      )}
    </main>
  );
}