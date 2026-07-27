import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Separator } from '@/components/ui/separator.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import pb from '@/lib/pocketbaseClient.js';
import ProductCard from '@/components/ProductCard.jsx';
import { trackPurchase } from '@/lib/marketingPixels.js';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchOrderAndSuggestions = async () => {
      try {
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
            estimatedDelivery: rawOrder.estimatedDelivery || '3 a 5 dias úteis'
          };
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

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const copyCoupon = () => {
    navigator.clipboard.writeText('AVANTE10');
    toast.success('Cupom copiado com sucesso! Aproveite em sua próxima compra.');
  };

  const handleSupportClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de falar sobre o meu pedido ${order?.numero_pedido || order?.id}`);
    window.open(`https://wa.me/5522997618591?text=${message}`, '_blank');
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
            <CheckCircle2 className="w-10 h-10 text-[#c59b5f]" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl md:text-4.5xl lg:text-5.5xl font-serif font-bold text-white mb-4 tracking-tight text-balance leading-tight">
            Pedido confirmado com sucesso ✨
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl font-light text-balance leading-relaxed">
            Seu pedido Avante já está sendo preparado com todo o nosso carinho e rigor de alta costura.
            Enviamos os detalhes completos para o seu e-mail.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 flex flex-col gap-8">

        {/* STATUS STEPS TRACKER */}
        <Card className="border border-[#c59b5f]/30 shadow-premium-sm rounded-3xl overflow-hidden bg-[#1A1A1A] transition-all hover:shadow-[0_12px_30px_rgba(197,155,95,0.15)]">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative">
              <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gray-800 z-0">
                <div className="h-full bg-[#c59b5f] w-[15%] transition-all duration-1000"></div>
              </div>

              {statusSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex md:flex-col items-center gap-4 md:gap-3 relative z-10 w-full md:w-1/4">
                    {index !== statusSteps.length - 1 && (
                      <div className="md:hidden absolute left-6 top-12 bottom-[-2rem] w-0.5 bg-gray-800 z-0">
                        {step.active && <div className="w-full bg-[#c59b5f] h-1/2"></div>}
                      </div>
                    )}

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${step.active
                        ? 'bg-gradient-to-br from-[#c59b5f] to-[#a37c46] border border-[#c59b5f]/30 text-black shadow-[0_0_15px_rgba(197,155,95,0.3)] ring-4 ring-[#c59b5f]/10'
                        : 'bg-[#242424] text-gray-600 border border-gray-700'
                      }`}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col md:items-center md:text-center">
                      <span className={`font-serif text-sm md:text-base ${step.active ? 'text-white font-bold' : 'text-gray-500 font-light'}`}>
                        {step.label}
                      </span>
                      {step.date && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#c59b5f] mt-1">
                          {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(step.date))}
                        </span>
                      )}
                      {step.id === 'separation' && step.active && (
                        <span className="text-xs text-[#c59b5f] font-semibold mt-1 uppercase tracking-widest">Em andamento</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

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
                    const price = Number(item.price !== undefined ? item.price : item.preco) || 0;
                    const image = item.image || item.imagem || '';
                    const imageUrl = image ? (image.startsWith('http') ? image : `${pb.baseUrl}/api/files/products/${item.id}/${image}`) : '';
                    const isVideo = imageUrl.toLowerCase().endsWith('.mp4') || imageUrl.toLowerCase().endsWith('.webm') || imageUrl.toLowerCase().endsWith('.mov');

                    return (
                      <div key={idx} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-24 rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0">
                          {imageUrl ? (
                            isVideo ? (
                              <video src={imageUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                            ) : (
                              <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                            )
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 justify-between h-full min-h-[6rem]">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1">{name}</h3>
                            <p className="text-xs text-gray-500 font-light">
                              Tamanho: {size} | Cor: {color}
                            </p>
                          </div>
                          <div className="flex items-end justify-between mt-2">
                            <span className="text-xs font-medium text-gray-500">Qtd: {quantity}</span>
                            <span className="text-base font-bold text-[#c59b5f]">{formatPrice(price * quantity)}</span>
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
                  <span className="font-bold text-gray-900 font-serif">Total Pago</span>
                  <span className="text-2xl md:text-3xl font-extrabold text-[#c59b5f]">{formatPrice(order.total)}</span>
                </div>

                <div className="mt-2 flex items-center gap-2.5 text-xs text-gray-600 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300 font-light">
                  <CreditCard className="w-4.5 h-4.5 text-[#c59b5f] shrink-0" strokeWidth={1.5} />
                  <span>
                    Pago via <strong className="text-gray-900 uppercase font-extrabold">{(order.paymentMethod === 'credit_card' || order.paymentMethod === 'credito') ? 'Cartão de Crédito' : (order.paymentMethod === 'boleto' ? 'Boleto Bancário' : 'PIX')}</strong>
                    {order.installments > 1 ? ` em ${order.installments}x sem juros` : ''}
                  </span>
                </div>

                {order.paymentMethod === 'boleto' && (
                  <div className="mt-3 bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-xs text-amber-800 leading-relaxed font-light">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="text-left">
                      <strong className="block font-serif text-sm font-bold text-amber-900 mb-1">Aviso sobre o Boleto:</strong>
                      A compensação bancária pode levar **de 1 a 3 dias úteis**. 
                      Seu pedido será separado e postado somente após a confirmação sistêmica automática da Stripe. 
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

        {/* CADEAU / COUPON OFFER */}
        <div className="bg-gradient-to-br from-[#242424] to-[#1a1a1a] border border-[#c59b5f]/30 rounded-3xl p-8 md:p-12 text-center shadow-premium relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 relative z-10">
            Um presente para sua próxima experiência
          </h3>
          <p className="text-gray-400 font-light text-sm md:text-base max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
            Cada compra na Avante Lingerie destrava benefícios de alta costura. Utilize o cupom abaixo e garanta 10% OFF em seu próximo pedido.
          </p>

          <div className="inline-flex items-center bg-[#1A1A1A] border border-[#c59b5f]/40 rounded-2xl p-2.5 shadow-premium-sm relative z-10">
            <span className="px-6 py-2 text-xl font-extrabold tracking-widest text-[#c59b5f] select-all">
              AVANTE10
            </span>
            <Button
              onClick={copyCoupon}
              className="bg-[#c59b5f] hover:bg-[#a37c46] text-white rounded-xl px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
          </div>
          <p className="text-[10px] text-[#c59b5f] font-semibold tracking-wider mt-4 relative z-10 uppercase">Cupom válido por 48 horas.</p>
        </div>

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
                    <span className="text-xs text-gray-500 font-light">contato@avantelingerie.com.br</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1A1A1A] border border-[#c59b5f]/20">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Horário de Atendimento</span>
                    <span className="text-xs text-gray-500 font-light">Seg a Sex: 09h às 18h</span>
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
                  <span className="text-xs text-gray-400 leading-relaxed font-light">Primeira troca grátis em até 7 dias após o recebimento.</span>
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
    </main>
  );
}