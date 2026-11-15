import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Gift, Crown, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';

export const MIMO_APPS = [
  {
    id: 'maquina-de-vendas',
    name: 'Máquina de Vendas Zap',
    badge: 'RENDA EXTRA DIRETO DA FÁBRICA',
    badgeColor: 'from-amber-500 to-yellow-600',
    originalPrice: 97,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Calculadora de Preço Inteligente, Scripts Prontos de WhatsApp e Manual de Revenda.',
    coverImage: '/assets/mimos/capa-maquina-vendas-3d.jpg',
    appUrl: '/mimos/maquina-de-vendas',
    themeColor: '#D4AF37'
  },
  {
    id: 'cintura-esculpida',
    name: 'Método Cintura Esculpida',
    badge: 'RESULTADO REAL & SILHUETA',
    badgeColor: 'from-sky-500 to-blue-600',
    originalPrice: 97,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Rotina de 21 Dias, Calculadora de Hidratação ml/kg e Guia de Drenagem com Modeladores.',
    coverImage: '/assets/mimos/capa-cintura-esculpida-3d.jpg',
    appUrl: '/mimos/cintura-esculpida',
    themeColor: '#38bdf8'
  },
  {
    id: 'espelho-secreto',
    name: 'O Espelho Secreto',
    badge: 'MAIS ESCOLHIDO PELAS CLIENTES',
    badgeColor: 'from-purple-500 to-fuchsia-600',
    originalPrice: 67,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Quiz VIP de Diagnóstico de Busto & Silhueta, Calculadora de Sutiã ABNT e Caimento Perfeito.',
    coverImage: '/assets/mimos/capa-espelho-secreto-3d.jpg',
    appUrl: '/mimos/espelho-secreto',
    themeColor: '#c084fc'
  }
];

export default function MimoRetentionModal({
  isOpen,
  onClose,
  onConfirmChoice,
  currentChoice = null
}) {
  const [selectedAppId, setSelectedAppId] = useState('espelho-secreto');
  const [isCombo, setIsCombo] = useState(false);

  // Sync initial state if there's already a saved choice
  useEffect(() => {
    if (currentChoice) {
      if (currentChoice.is_combo) {
        setIsCombo(true);
      } else if (currentChoice.id) {
        setSelectedAppId(currentChoice.id);
        setIsCombo(false);
      }
    }
  }, [currentChoice, isOpen]);

  if (!isOpen) return null;

  const handleSelectApp = (appId) => {
    setSelectedAppId(appId);
    if (isCombo) {
      setIsCombo(false);
    }
  };

  const handleToggleCombo = () => {
    setIsCombo(prev => !prev);
  };

  const handleConfirm = () => {
    const selectedApp = MIMO_APPS.find(a => a.id === selectedAppId) || MIMO_APPS[0];

    const choiceData = isCombo ? {
      id: 'combo-3-apps',
      name: 'Combo 3 Aplicativos VIP da Fábrica',
      is_combo: true,
      price: 9.90,
      coverImage: '/assets/mimos/popup-brindes-transparente.png',
      apps: MIMO_APPS.map(a => ({
        id: a.id,
        name: a.name,
        appUrl: a.appUrl,
        coverImage: a.coverImage
      }))
    } : {
      id: selectedApp.id,
      name: selectedApp.name,
      is_combo: false,
      price: 0,
      coverImage: selectedApp.coverImage,
      appUrl: selectedApp.appUrl
    };

    try {
      localStorage.setItem('avante_brinde_escolhido', JSON.stringify(choiceData));
    } catch (e) {
      console.warn('[MimoRetentionModal] Erro ao gravar brinde no localStorage:', e);
    }

    if (onConfirmChoice) {
      onConfirmChoice(choiceData);
    }

    toast.success(
      isCombo
        ? '🔥 Combo dos 3 Apps VIP adicionado ao seu pedido por apenas +R$ 9,90!'
        : `🎁 Presente VIP garantido: ${selectedApp.name} (GRÁTIS HOJE)!`,
      { duration: 4000 }
    );

    onClose();
  };

  const handleDismissWithoutGift = () => {
    try {
      sessionStorage.setItem('avante_mimo_popup_dismissed', 'true');
    } catch (e) {}
    onClose();
  };

  const activeApp = MIMO_APPS.find(a => a.id === selectedAppId) || MIMO_APPS[0];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300 font-sans">
      <div 
        className="relative w-full max-w-2xl bg-[#0b0a08] border border-[#D4AF37]/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-white my-auto max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#D4AF37]/30"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mimo-modal-title"
      >
        {/* Subtle decorative glowing background gradients */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismissWithoutGift}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar pop-up"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Hero Banner with Transparent 3D Podium Asset */}
        <div className="flex flex-col items-center text-center relative z-10 pt-1">
          <div className="relative mb-2 max-w-[280px] sm:max-w-[340px] transition-transform hover:scale-105 duration-500">
            <img 
              src="/assets/mimos/popup-brindes-transparente.png" 
              alt="Mimos Exclusivos Avante Lingerie"
              className="w-full h-auto object-contain drop-shadow-[0_10px_25px_rgba(212,175,55,0.4)]"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 shadow-sm">
            <Gift className="w-3.5 h-3.5" /> Presente VIP da Fábrica Liberado
          </div>

          <h2 id="mimo-modal-title" className="text-xl sm:text-2.5xl font-serif font-extrabold text-white tracking-tight leading-tight">
            Espere! Você ganhou um <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Aplicativo VIP</span>
          </h2>

          <p className="text-xs sm:text-sm text-gray-300 font-light mt-1.5 max-w-lg leading-relaxed">
            Para celebrar seu pedido, escolha <strong className="text-white font-semibold">1 Aplicativo Oficial</strong> inteiramente <span className="text-[#34d399] font-bold">GRÁTIS HOJE</span> para acompanhar sua compra:
          </p>
        </div>

        {/* The 3 App Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 relative z-10">
          {MIMO_APPS.map((app) => {
            const isSelected = selectedAppId === app.id && !isCombo;
            return (
              <div
                key={app.id}
                onClick={() => handleSelectApp(app.id)}
                className={`relative flex flex-col rounded-2xl p-3 cursor-pointer transition-all duration-300 border text-left group ${
                  isSelected || isCombo
                    ? 'bg-gradient-to-b from-[#1f1a10] to-[#120f0a] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.02]'
                    : 'bg-[#14120e]/80 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#181510]'
                }`}
              >
                {/* 3D Cover Thumbnail */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2.5 bg-black/40 shadow-inner flex items-center justify-center">
                  <img
                    src={app.coverImage}
                    alt={app.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Selection Radio / Badge */}
                  <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected || isCombo
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] text-black shadow-md'
                      : 'bg-black/60 border border-white/30 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Badge Tag */}
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] line-clamp-1 mb-0.5">
                  ★ {app.badge}
                </span>

                {/* Title */}
                <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {app.name}
                </h3>

                {/* Subtitle / Short Description */}
                <p className="text-[10px] text-gray-400 line-clamp-2 mt-1 leading-snug">
                  {app.subtitle}
                </p>

                {/* Pricing Block */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 line-through">
                    De R$ {app.originalPrice}
                  </span>
                  <span className="text-[11px] font-extrabold text-[#34d399] tracking-wide">
                    {app.promoPrice}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* MICRO-OFFER UPSELL COMBO (+R$ 9,90) */}
        <div 
          onClick={handleToggleCombo}
          className={`relative rounded-2xl p-3.5 sm:p-4 cursor-pointer transition-all duration-300 border flex items-start sm:items-center gap-3.5 mb-5 ${
            isCombo
              ? 'bg-gradient-to-r from-[#291b07] via-[#3d2706] to-[#291b07] border-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.4)] scale-[1.01]'
              : 'bg-[#15120c] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#1c170f]'
          }`}
        >
          {/* Custom Checkbox */}
          <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-all ${
            isCombo 
              ? 'bg-[#F59E0B] text-black shadow-[0_0_10px_rgba(245,158,11,0.6)]' 
              : 'border border-white/40 bg-black/40 text-transparent'
          }`}>
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> OFERTA VIP IMPERDÍVEL
              </span>
              <span className="text-[10px] text-gray-400">
                De <span className="line-through">R$ 261,00</span> por apenas:
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
              Destravar o Combo Completo com os 3 Aplicativos VIP por <span className="text-[#34d399] font-black text-sm sm:text-base">+R$ 9,90</span>
            </h4>

            <p className="text-[10px] sm:text-xs text-gray-300 font-light mt-0.5">
              Receba acesso imediato à <em>Máquina de Vendas Zap</em> + <em>Método Cintura Esculpida</em> + <em>O Espelho Secreto</em>. Economize mais de R$ 250!
            </p>
          </div>
        </div>

        {/* CTA BUTTONS & LOSS AVERSION */}
        <div className="flex flex-col gap-2.5 relative z-10">
          <Button
            onClick={handleConfirm}
            className="w-full h-13 sm:h-14 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:from-[#F59E0B] hover:to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-2xl shadow-[0_8px_30px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
          >
            <Gift className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
            <span>
              {isCombo
                ? 'GARANTIR OS 3 APLICATIVOS VIP (+R$ 9,90)'
                : `GARANTIR ${activeApp.name.toUpperCase()} GRÁTIS`
              }
            </span>
            <ArrowRight className="w-4 h-4 ml-1 text-black group-hover:translate-x-1 transition-transform" />
          </Button>

          <button
            type="button"
            onClick={handleDismissWithoutGift}
            className="text-[11px] text-gray-400 hover:text-gray-200 transition-colors underline font-medium text-center py-1 cursor-pointer"
          >
            Prefiro abrir mão do presente e continuar sem brinde...
          </button>
        </div>

        {/* Security / Trust Stamp */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-4 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Acesso liberado no final do pedido
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Funciona em qualquer celular
          </span>
        </div>
      </div>
    </div>
  );
}
