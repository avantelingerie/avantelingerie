import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Gift, 
  Wallet, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Info, 
  AlertCircle, 
  MessageCircle,
  Mail,
  ChevronRight,
  RefreshCw,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/context/AuthContext.jsx';
import ProductCard from '@/components/ProductCard.jsx';

// Fallback products in case PocketBase query yields no results
const fallbackProducts = [
  {
    id: "conjunto-black",
    nome_produto: "Conjunto Luxo Rendado Avante Black",
    categoria: "Novidades",
    referencia: "AVL0010",
    preco_varejo: 119.90,
    preco_antigo: 159.90,
    badge_desconto: 25,
    nota: 5.0,
    quantidade_avaliacoes: 148,
    estoque_restante: 6,
    cores_disponiveis: ["#000000", "#FF0000"],
    imagem_produto: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80",
    gallery: ["https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "robe-cobre",
    nome_produto: "Robe Elegance em Cetim e Renda Cobre",
    categoria: "Robes",
    referencia: "AVL0042",
    preco_varejo: 149.90,
    preco_antigo: 189.90,
    badge_desconto: 21,
    nota: 5.0,
    quantidade_avaliacoes: 96,
    estoque_restante: 4,
    cores_disponiveis: ["#c59b5f", "#000000"],
    imagem_produto: "https://images.unsplash.com/photo-1574242168924-f58c704f05ba?auto=format&fit=crop&w=400&q=80",
    gallery: ["https://images.unsplash.com/photo-1574242168924-f58c704f05ba?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "body-rose",
    nome_produto: "Body Rendado Sensualité Rose Gold",
    categoria: "Bodies",
    referencia: "AVL0089",
    preco_varejo: 109.90,
    preco_antigo: 149.90,
    badge_desconto: 26,
    nota: 4.9,
    quantidade_avaliacoes: 112,
    estoque_restante: 8,
    cores_disponiveis: ["#FFB6C1", "#ffffff"],
    imagem_produto: "https://images.unsplash.com/photo-1562575214-da9fcf59b907?auto=format&fit=crop&w=400&q=80",
    gallery: ["https://images.unsplash.com/photo-1562575214-da9fcf59b907?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "soft-touch",
    nome_produto: "Conjunto Soft Touch Sem Costura",
    categoria: "Conforto",
    referencia: "AVL0112",
    preco_varejo: 89.90,
    preco_antigo: 119.90,
    badge_desconto: 25,
    nota: 4.8,
    quantidade_avaliacoes: 84,
    estoque_restante: 12,
    cores_disponiveis: ["#F5F5DC", "#000000"],
    imagem_produto: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80",
    gallery: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=400&q=80"]
  }
];

export default function RastreioPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [trackingCode, setTrackingCode] = useState('');
  const [searchStatus, setSearchStatus] = useState('idle'); // idle | searching | success | error
  const [orderData, setOrderData] = useState(null);
  const [newProducts, setNewProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappNumber = "5522997618591"; // Official support WhatsApp number

  // 1. Fetch newest products from PocketBase (Dynamic Showcase)
  useEffect(() => {
    const fetchNewestProducts = async () => {
      setLoadingProducts(true);
      try {
        const result = await pb.collection('products').getList(1, 4, {
          sort: '-created',
          $autoCancel: false
        });
        
        if (result.items && result.items.length > 0) {
          setNewProducts(result.items);
        } else {
          setNewProducts(fallbackProducts);
        }
      } catch (error) {
        console.error('Error fetching newest products for tracking page:', error);
        setNewProducts(fallbackProducts);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchNewestProducts();
  }, []);

  // 2. Auto-run tracking if code is provided in the URL query string (?codigo=...)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("codigo") || urlParams.get("code") || urlParams.get("tracking");
    if (code) {
      const cleanCode = decodeURIComponent(code).trim();
      setTrackingCode(cleanCode);
      handleSearch(cleanCode);
    }
  }, []);

  // 3. Search Engine
  const handleSearch = async (codeToSearch) => {
    const targetCode = (codeToSearch || trackingCode).trim();
    if (!targetCode) {
      toast.error("Por favor, digite um código de rastreamento.");
      return;
    }

    // Trava de Autenticação (Privacy Guard)
    const isCorreiosCode = /^[A-Z]{2}\d{9}[A-Z]{2}$/i.test(targetCode);
    const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(targetCode);
    
    // Melhor Envio tracking sometimes is alphanumeric like "MEL12345"
    // Let's assume order numbers are typically short numbers like "1055" or have "#" like "#1055"
    const looksLikeOrderNumber = targetCode.length < 8 || targetCode.startsWith('#');

    if (looksLikeOrderNumber && !isCorreiosCode && !isUUID) {
      if (!currentUser) {
        toast.error("Para buscar pelo Número do Pedido, você precisa fazer Login.");
        navigate('/login');
        return;
      }
    }

    setSearchStatus('searching');
    setErrorMsg('');

    try {
      const response = await apiServerClient.fetch('/shipping/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: targetCode })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.erro || 'Código de rastreio ou pedido não localizado.');
      }

      const result = await response.json();
      if (result.sucesso && result.data) {
        setOrderData(result.data);
        setSearchStatus('success');
        toast.success("Histórico de entrega carregado!");
      } else {
        throw new Error('Formato de resposta inválido.');
      }
    } catch (err) {
      console.error('[RastreioPage] Error tracking:', err);
      setOrderData(null);
      setSearchStatus('error');
      setErrorMsg(err.message || 'Código ou pedido não localizado em nossa base.');
      toast.error(err.message || 'Código não localizado.');
    }
  };

  const resetSearch = () => {
    setTrackingCode('');
    setOrderData(null);
    setSearchStatus('idle');
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to generate dynamic pre-filled WhatsApp URLs
  const getSupportWhatsappURL = (code) => {
    const message = encodeURIComponent(`Olá! Estou acompanhando meu pedido na página de rastreio e gostaria de suporte sobre o código de rastreamento: ${code || 'AVANTE-GERAL'}`);
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col font-sans text-gray-800">
      <Helmet>
        <title>Rastreamento de Pedido | Avante Lingerie</title>
        <meta name="description" content="Acompanhe a entrega premium do seu pedido na Avante Lingerie em tempo real." />
      </Helmet>

      {/* ==========================================
          HERO SECTION (BUSCA)
          ========================================== */}
      <section 
        className="pt-32 pb-24 px-4 relative overflow-hidden text-center border-b border-[#c59b5f]/20"
        style={{ background: 'linear-gradient(135deg, #121212 0%, #0a0a0a 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 tracking-wide text-balance"
            style={{ color: '#c59b5f' }}
          >
            Rastreie sua Experiência
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-300 text-base md:text-lg mb-8 max-w-xl mx-auto font-light"
          >
            Acompanhe o trajeto de sua caixa de luxo até o seu endereço com total segurança e comodidade.
          </motion.p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto flex items-center p-1 rounded-full bg-white/5 border border-[#c59b5f]/30 focus-within:border-[#c59b5f] focus-within:ring-2 focus-within:ring-[#c59b5f]/15 transition-all shadow-xl">
            <input 
              type="text" 
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Número do pedido ou código de rastreamento" 
              className="flex-1 bg-transparent border-none outline-none py-3 px-5 text-white placeholder-gray-500 font-sans tracking-wide"
            />
            <button 
              onClick={() => handleSearch()}
              disabled={searchStatus === 'searching'}
              className="bg-[#c59b5f] hover:bg-white text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed shrink-0 uppercase text-xs tracking-wider"
            >
              {searchStatus === 'searching' ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Search size={14} />
              )}
              Rastrear
            </button>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-400 text-[10px] sm:text-xs mt-3 tracking-wide"
          >
            * Por motivos de segurança e privacidade, rastreios usando o <span className="text-[#c59b5f]">Número do Pedido</span> exigem Login.
          </motion.p>
        </div>
      </section>

      {/* ==========================================
          MAIN AREA (CONTEÚDO DINÂMICO)
          ========================================== */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 -mt-8 relative z-20 mb-20">
        <AnimatePresence mode="wait">
          
          {/* A. IDLE STATE */}
          {searchStatus === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border rounded-2xl p-10 md:p-12 text-center shadow-lg border-gray-100 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#FFF8F5] border border-[#c59b5f]/25 flex items-center justify-center mb-5 text-[#c59b5f]">
                <Gift size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-[#1e1e1e] mb-2">Previsão e Histórico Completo</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                Digite o seu código de rastreamento recebido por e-mail ou WhatsApp no campo acima para verificar o status atual e o histórico logístico da sua entrega.
              </p>
            </motion.div>
          )}

          {/* B. SEARCHING LOADING STATE */}
          {searchStatus === 'searching' && (
            <motion.div 
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border rounded-2xl p-20 text-center shadow-lg border-gray-100 flex flex-col items-center justify-center min-h-[300px]"
            >
              <RefreshCw size={40} className="text-[#c59b5f] animate-spin mb-4" />
              <p className="text-gray-500 text-sm font-semibold tracking-wider uppercase">Carregando informações logísticas...</p>
            </motion.div>
          )}

          {/* C. SUCCESS CARDS */}
          {searchStatus === 'success' && orderData && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-gray-150 rounded-2xl p-6 md:p-10 shadow-xl space-y-10"
            >
              {/* Header Box */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-100">
                <div>
                  <h2 className="text-2xl font-bold font-serif text-gray-900 mb-1">{orderData.orderNumber}</h2>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">
                    Status: <span className="text-black font-bold uppercase">{orderData.status}</span> • Transportadora: <span className="font-semibold">Avante Cargo Premium</span>
                  </p>
                </div>
                <div className="md:text-right shrink-0">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">Estimativa de Entrega</p>
                  <p className="text-2xl font-bold font-serif" style={{ color: '#c59b5f' }}>{orderData.etaDate}</p>
                </div>
              </div>

              {/* Progress Timeline Block */}
              <div className="py-4">
                {/* Desktop Horizontal Line */}
                <div className="relative hidden md:block">
                  <div className="absolute top-[27px] left-[5%] w-[90%] h-1 bg-gray-100 rounded"></div>
                  <div 
                    className="absolute top-[27px] left-[5%] h-1 bg-gradient-to-r from-[#c59b5f] to-[#d9a520] rounded transition-all duration-1000"
                    style={{ width: `${orderData.progressPercent - 10}%` }}
                  ></div>
                  
                  <div className="flex justify-between relative z-10">
                    {[
                      { step: 1, icon: Wallet, label: 'Confirmado' },
                      { step: 2, icon: Gift, label: 'Separação' },
                      { step: 3, icon: Truck, label: 'Em Trânsito' },
                      { step: 4, icon: Package, label: 'Na Rota' },
                      { step: 5, icon: CheckCircle2, label: 'Entregue' }
                    ].map((s) => {
                      const isActive = s.step === orderData.stepsConfig.activeStep;
                      const isCompleted = orderData.stepsConfig.completedSteps.includes(s.step);
                      return (
                        <div key={s.step} className="flex flex-col items-center w-[16%]">
                          <div 
                            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${
                              isActive 
                                ? 'border-[#c59b5f] bg-[#c59b5f] text-black scale-110 shadow-[#c59b5f]/30' 
                                : isCompleted 
                                  ? 'border-[#c59b5f] bg-white text-[#c59b5f]' 
                                  : 'border-gray-200 bg-white text-gray-300'
                            }`}
                          >
                            <s.icon size={20} />
                          </div>
                          <span className={`text-[11px] font-bold uppercase tracking-wider mt-3 transition-colors ${isActive ? 'text-black' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="md:hidden space-y-6 pl-4 border-l-2 border-gray-100 relative ml-3">
                  {[
                    { step: 1, icon: Wallet, label: 'Pedido Confirmado' },
                    { step: 2, icon: Gift, label: 'Em Separação' },
                    { step: 3, icon: Truck, label: 'Em Trânsito' },
                    { step: 4, icon: Package, label: 'Saiu para Entrega' },
                    { step: 5, icon: CheckCircle2, label: 'Entregue com Sucesso' }
                  ].map((s) => {
                    const isActive = s.step === orderData.stepsConfig.activeStep;
                    const isCompleted = orderData.stepsConfig.completedSteps.includes(s.step);
                    return (
                      <div key={s.step} className="flex items-center gap-4 relative">
                        <div 
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 shadow-sm relative -left-[30px] z-10 bg-white ${
                            isActive 
                              ? 'border-[#c59b5f] bg-[#c59b5f] text-black scale-105' 
                              : isCompleted 
                                ? 'border-[#c59b5f] text-[#c59b5f]' 
                                : 'border-gray-200 text-gray-300'
                          }`}
                        >
                          <s.icon size={16} />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider -ml-3 ${isActive ? 'text-black font-extrabold' : isCompleted ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grid: Updates list & Sidebar block */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-6 border-t border-gray-100">
                {/* Left Side: Update logs */}
                <div className="lg:col-span-3 space-y-6">
                  <h4 className="text-base font-bold font-serif uppercase tracking-wider flex items-center gap-2">
                    <Clock size={16} className="text-[#c59b5f]" /> Histórico de Atualizações
                  </h4>
                  
                  <div className="relative pl-6 border-l border-gray-150 space-y-6 py-2 ml-2">
                    {orderData.history.map((item, idx) => (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div 
                          className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full transition-all ${
                            item.isLatest 
                              ? 'bg-[#c59b5f] ring-4 ring-[#c59b5f]/25 scale-125' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                        
                        <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mb-1">{item.time}</p>
                        <p className={`text-sm leading-relaxed ${item.isLatest ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>{item.desc}</p>
                        <p className="text-[11px] font-semibold text-gray-400 flex items-center gap-1 mt-1.5">
                          <MapPin size={10} /> {item.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Shipping Meta Data & Contact box */}
                <div className="lg:col-span-2 space-y-6">
                  <h4 className="text-base font-bold font-serif uppercase tracking-wider flex items-center gap-2">
                    <Info size={16} className="text-[#c59b5f]" /> Detalhes do Envio
                  </h4>
                  
                  <div className="bg-gray-50 border rounded-2xl p-5 md:p-6 space-y-6">
                    <ul className="space-y-4">
                      <li className="flex flex-col text-sm border-b border-gray-200/60 pb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Destino de Entrega</span>
                        <strong className="text-gray-900 font-semibold mt-0.5">{orderData.destiny}</strong>
                      </li>
                      <li className="flex flex-col text-sm border-b border-gray-200/60 pb-3">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Método de Envio</span>
                        <strong className="text-gray-900 font-semibold mt-0.5">{orderData.shipmentMethod}</strong>
                      </li>
                      <li className="flex flex-col text-sm">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Código de Rastreamento</span>
                        <strong className="text-gray-900 font-semibold mt-0.5 tracking-wider">{trackingCode.toUpperCase()}</strong>
                      </li>
                    </ul>

                    {/* Integrated Support Card */}
                    <div className="bg-white border border-[#c59b5f]/30 rounded-xl p-5 text-center shadow-sm relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-xl opacity-20 select-none">⚜️</div>
                      <div className="w-10 h-10 bg-[#2a2520] border border-[#c59b5f] rounded-full flex items-center justify-center mx-auto mb-3 text-[#c59b5f] text-sm">
                        ⚜️
                      </div>
                      <h5 className="text-sm font-bold font-serif text-gray-900 mb-1">Suporte ao Pedido</h5>
                      <p className="text-[11px] text-gray-500 leading-normal mb-4">
                        Qualquer dúvida ou problema em relação à sua entrega? Conte conosco!
                      </p>
                      
                      <a 
                        href={getSupportWhatsappURL(trackingCode)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 px-4 py-2.5 bg-black hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f] hover:border-transparent font-bold text-xs uppercase rounded-lg transition-all shadow-sm"
                      >
                        <MessageCircle size={14} /> Chamar no WhatsApp
                      </a>

                      <div className="mt-4 pt-3 border-t border-dashed border-gray-150 text-[10px] text-gray-400 font-medium">
                        Ou envie e-mail para: <br />
                        <a href="mailto:pedidos@avantelingerie.com.br" className="text-[#c59b5f] hover:underline font-bold">pedidos@avantelingerie.com.br</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* D. ERROR STATE */}
          {searchStatus === 'error' && (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-red-150 rounded-2xl p-8 md:p-12 text-center shadow-lg flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-5 text-red-600">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-serif text-red-700 mb-2">Código não Localizado</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-8">
                {errorMsg || "Não conseguimos identificar nenhum pacote correspondente ao código inserido em nossa base de dados. Por favor, confirme o código em seu e-mail de envio ou chame nosso suporte."}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm">
                <button 
                  onClick={resetSearch}
                  className="flex-1 px-6 py-3 bg-[#c59b5f] hover:bg-black text-black hover:text-[#c59b5f] border border-transparent hover:border-[#c59b5f] font-bold text-xs uppercase rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Buscar Novamente
                </button>
                <a 
                  href={getSupportWhatsappURL(trackingCode)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-black hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f] hover:border-transparent font-bold text-xs uppercase rounded-xl transition-all shadow-sm"
                >
                  <MessageCircle size={14} /> WhatsApp Suporte
                </a>
              </div>

              <div className="mt-8 text-xs text-gray-400 font-medium">
                Dúvidas sobre envios? Escreva para: <a href="mailto:pedidos@avantelingerie.com.br" className="text-[#c59b5f] font-bold hover:underline">pedidos@avantelingerie.com.br</a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ==========================================
          RECOMENDAÇÕES (DYNAMIC SHOWCASE REUSING CARD)
          ========================================== */}
      <section className="py-20 border-t border-gray-150 bg-[#FFF8F5] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px]" style={{ color: '#c59b5f' }}>
              Enquanto seu pacote não chega
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mt-2">
              Novidades da Avante
            </h2>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] w-full bg-gray-200 rounded-2xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {newProducts.map((produto) => (
                <div key={produto.id} className="h-full">
                  <ProductCard 
                     produto={produto} 
                     onComprarAgora={(p) => navigate(`/produto/${p.id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}