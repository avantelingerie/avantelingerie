import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';

// Itens de fallback imediatos para garantir exibição instantânea sem depender de latência de rede
const DEFAULT_PROOF_ITEMS = [
  {
    id: 'proof_1',
    customer: 'Mariana S.',
    location: 'Campinas, SP',
    productName: 'Cropped Renda Chantilly com Aro',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/croppeds',
    timeAgo: 'há 14 min',
    tag: 'Compra no Ateliê',
    type: 'varejo'
  },
  {
    id: 'proof_2',
    customer: 'Camila R.',
    location: 'Belo Horizonte, MG',
    productName: 'Calcinha Cinta Modeladora Alta Compressão',
    productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/calcinhas',
    timeAgo: 'há 28 min',
    tag: 'Mais Vendido',
    type: 'varejo'
  },
  {
    id: 'proof_3',
    customer: 'Juliana P.',
    location: 'São Paulo, SP',
    productName: 'Body Sensual em Renda com Aro',
    productImage: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/bodies',
    timeAgo: 'há 42 min',
    tag: 'Destaque de Fábrica',
    type: 'varejo'
  },
  {
    id: 'proof_4',
    customer: 'Patrícia F.',
    location: 'Nova Iguaçu, RJ',
    productName: 'Kit Mostruário Revendedora de Fábrica',
    productImage: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&auto=format&fit=crop&q=80',
    productUrl: '/quero-revender',
    timeAgo: 'há 1 hora',
    tag: 'Nova Revendedora',
    type: 'atacado'
  },
  {
    id: 'proof_5',
    customer: 'Renata M.',
    location: 'Curitiba, PR',
    productName: 'Baby Doll Seda Gloss com Renda',
    productImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=200&auto=format&fit=crop&q=80',
    productUrl: '/categoria/pijamas',
    timeAgo: 'há 2 horas',
    tag: 'Compra no Ateliê',
    type: 'varejo'
  }
];

export default function SocialProofToast() {
  const location = useLocation();
  const navigate = useNavigate();

  // Inicia com os itens padrão garantidos para nunca renderizar vazio
  const [items, setItems] = useState(DEFAULT_PROOF_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [impressionsCount, setImpressionsCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('avante_social_proof_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const timerRef = useRef(null);
  const hideTimerRef = useRef(null);

  // Guarda de rota: Desativado em rotas de checkout ou administrativas
  const isExcludedRoute =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/confirmacao') ||
    location.pathname.startsWith('/order-confirmation') ||
    location.pathname.startsWith('/login');

  // 1. Carregamento dos dados reais do backend via apiServerClient (/hcgi/api)
  useEffect(() => {
    if (isDismissed || isExcludedRoute) return;

    let isMounted = true;
    const fetchProofData = async () => {
      try {
        const res = await apiServerClient.fetch('/marketing/social-proof');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      } catch (err) {
        // Fallback já está ativo em items
      }
    };

    fetchProofData();

    return () => {
      isMounted = false;
    };
  }, [isDismissed, isExcludedRoute]);

  // 2. Orquestração do ciclo de exibição das notificações
  useEffect(() => {
    if (isDismissed || isExcludedRoute || items.length === 0) {
      setIsVisible(false);
      return;
    }

    // Teto de 4 aparições por sessão para não saturar
    if (impressionsCount >= 4) {
      setIsVisible(false);
      return;
    }

    // Primeira notificação aparece aos 5 segundos; as seguintes a cada 22 segundos
    const showDelay = impressionsCount === 0 ? 5000 : 22000;

    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      setImpressionsCount(prev => prev + 1);

      // Permanece visível por 4.5 segundos e faz fade-out suave
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, 4500);

    }, showDelay);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(hideTimerRef.current);
    };
  }, [impressionsCount, items, isDismissed, isExcludedRoute]);

  if (isDismissed || isExcludedRoute || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex] || items[0];
  if (!currentItem) return null;

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem('avante_social_proof_dismissed', 'true');
    } catch {}
  };

  const handleToastClick = () => {
    if (currentItem.productUrl) {
      navigate(currentItem.productUrl);
    }
  };

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-5 left-4 md:bottom-6 md:left-6 z-40 max-w-[280px] sm:max-w-[325px] w-full transition-all duration-500 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
      }`}
    >
      <div
        onClick={handleToastClick}
        className="group relative flex items-center gap-3 p-2.5 sm:p-3 bg-[#141414]/95 backdrop-blur-md border border-[#c59b5f]/30 hover:border-[#c59b5f]/60 rounded-2xl shadow-2xl shadow-black/70 cursor-pointer select-none transition-all duration-300 hover:scale-[1.01]"
      >
        {/* Imagem do Produto Adquirido (Miniatura nobre de alta costura) */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden bg-[#1c1c1c] border border-[#c59b5f]/25 shrink-0 shadow-inner">
          <img
            src={currentItem.productImage}
            alt={currentItem.productName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=200&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Informações Persuasivas */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#c59b5f] truncate">
              {currentItem.tag || 'Compra no Ateliê'}
            </span>
          </div>

          <p className="text-xs font-semibold text-white truncate leading-tight">
            {currentItem.customer} <span className="text-gray-400 font-normal">• {currentItem.location}</span>
          </p>

          <p className="text-[11px] text-gray-300 truncate font-light leading-snug mt-0.5">
            {currentItem.productName}
          </p>

          <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-1 font-light">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span>Verificado {currentItem.timeAgo}</span>
          </div>
        </div>

        {/* Botão de Fechar Discreto */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fechar notificação"
          className="absolute top-2 right-2 text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
