import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { X, CheckCircle2 } from 'lucide-react';
import apiServerClient from '@/lib/apiServerClient.js';

// Função para tocar um "bit" cristalino e refinado de alta costura via Web Audio API (Zero arquivos externos)
const playLuxuryChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Oscilador 1: Tom cristalino fundamental (nota Dó agudo ~ 1046Hz com brilho para Mi)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1046.5, now);
    osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12);

    // Envelope de volume suave e aveludado (início imediato, fade out delicado a 6%)
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.06, now + 0.03);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    // Oscilador 2: Harmônico superior para acabamento de taça de cristal
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2093, now + 0.04);
    gain2.gain.setValueAtTime(0.001, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.03, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.36);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.29);

    setTimeout(() => {
      try { ctx.close(); } catch {}
    }, 500);
  } catch (e) {
    // Silencioso se o navegador restringir autoplay de áudio
  }
};

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
    tag: 'COMPRA REALIZADA',
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
    tag: 'COMPRA REALIZADA',
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
  const [isWobbling, setIsWobbling] = useState(false);
  const [impressionsCount, setImpressionsCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('avante_social_proof_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const timerRef = useRef(null);
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

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
    if (isDismissed || isExcludedRoute) {
      setIsVisible(false);
      return;
    }

    let isMounted = true;
    let showTimeout = null;
    let hideTimeout = null;
    let wobbleTimeout = null;

    const scheduleNext = (delay) => {
      showTimeout = setTimeout(() => {
        if (!isMounted) return;

        // Dispara aparição com som elegante e micro-atração visual
        setIsVisible(true);
        setIsWobbling(true);
        playLuxuryChime();

        // Tremedeira rápida de 0.5s para chamar atenção da visão periférica e cessa
        wobbleTimeout = setTimeout(() => {
          if (isMounted) setIsWobbling(false);
        }, 500);

        // Permanece em tela por 5.5 segundos (entre 5 e 6s) e faz fade-out suave
        hideTimeout = setTimeout(() => {
          if (!isMounted) return;

          setIsVisible(false);

          // Avança para o próximo item do catálogo
          const totalItems = itemsRef.current.length || 1;
          setCurrentIndex(prev => (prev + 1) % totalItems);

          // Atualiza contador e agenda a próxima aparição após 17 segundos (intervalo de 15 a 20s)
          setImpressionsCount(prev => {
            const nextCount = prev + 1;
            if (nextCount < 10 && isMounted) {
              scheduleNext(17000);
            }
            return nextCount;
          });
        }, 5500);

      }, delay);
    };

    // Primeira notificação surge aos 4.5 segundos após carregar a página
    scheduleNext(4500);

    return () => {
      isMounted = false;
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      clearTimeout(wobbleTimeout);
    };
  }, [isDismissed, isExcludedRoute]);

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
    <>
      <style>{`
        @keyframes avanteLuxuryWobble {
          0% { transform: translateY(0) scale(1); }
          20% { transform: translateY(-3px) rotate(-1.2deg) scale(1.02); }
          40% { transform: translateY(2px) rotate(1.2deg) scale(1.01); }
          60% { transform: translateY(-1.5px) rotate(-0.6deg); }
          80% { transform: translateY(0.5px) rotate(0.4deg); }
          100% { transform: translateY(0) rotate(0deg) scale(1); }
        }
        .animate-avante-wobble {
          animation: avanteLuxuryWobble 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
      `}</style>

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
          className={`group relative flex items-center gap-3 p-2.5 sm:p-3 bg-[#141414]/95 backdrop-blur-md border border-[#c59b5f]/30 hover:border-[#c59b5f]/60 rounded-2xl shadow-2xl shadow-black/70 cursor-pointer select-none transition-all duration-300 hover:scale-[1.01] ${
            isWobbling ? 'animate-avante-wobble' : ''
          }`}
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
                {currentItem.tag || 'COMPRA REALIZADA'}
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
    </>
  );
}
