import React, { useState, useEffect } from 'react';
import { X, Check, Gift, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';

export const MIMO_APPS = [
  {
    id: 'maquina-de-vendas',
    name: 'Máquina de Vendas Zap',
    badge: 'RENDA EXTRA',
    originalPrice: 97,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Calculadora de Preço & Scripts de Vendas no WhatsApp.',
    coverImage: '/assets/mimos/capa-maquina-vendas-3d.jpg',
    appUrl: '/mimos/maquina-de-vendas',
    themeColor: '#D4AF37'
  },
  {
    id: 'cintura-esculpida',
    name: 'Método Cintura Esculpida',
    badge: 'RESULTADO REAL',
    originalPrice: 97,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Rotina de 21 Dias, Drenagem & Calculadora de Hidratação.',
    coverImage: '/assets/mimos/capa-cintura-esculpida-3d.jpg',
    appUrl: '/mimos/cintura-esculpida',
    themeColor: '#38bdf8'
  },
  {
    id: 'espelho-secreto',
    name: 'O Espelho Secreto',
    badge: 'MAIS ESCOLHIDO',
    originalPrice: 67,
    promoPrice: 'GRÁTIS HOJE',
    subtitle: 'Quiz VIP de Diagnóstico de Busto & Sutiã ABNT.',
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
      coverImage: '/assets/mimos/caixa-presente-ganhouu.png',
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-x-hidden overflow-y-auto animate-in fade-in duration-300 font-sans">
      <div 
        className="relative w-full max-w-xl bg-[#0b0a08] border border-[#D4AF37]/40 rounded-3xl p-4 sm:p-6 shadow-[0_0_45px_rgba(212,175,55,0.25)] text-white my-auto overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mimo-modal-title"
      >
        {/* Subtle decorative glowing background gradients */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismissWithoutGift}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Fechar pop-up"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Hero: Single Gift Box with GANHOUU!! Badge */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="relative mb-1 transition-transform hover:scale-105 duration-300">
            <img 
              src="/assets/mimos/caixa-presente-ganhouu.png" 
              alt="GANHOUU!!"
              className="h-13 sm:h-15 w-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)]"
            />
          </div>

          <h2 id="mimo-modal-title" className="text-base sm:text-xl font-serif font-extrabold text-white tracking-tight leading-snug">
            Espere! Escolha seu <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] bg-clip-text text-transparent">Aplicativo VIP</span> Grátis
          </h2>

          <p className="text-[11px] sm:text-xs text-gray-300 font-light mt-0.5 max-w-md leading-tight">
            Para acompanhar seu pedido, selecione <strong className="text-white font-semibold">1 App Oficial</strong> inteiramente <span className="text-[#34d399] font-bold">GRÁTIS HOJE</span>:
          </p>
        </div>

        {/* The 3 App Cards Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 my-3 sm:my-3.5 relative z-10">
          {MIMO_APPS.map((app) => {
            const isSelected = selectedAppId === app.id && !isCombo;
            return (
              <div
                key={app.id}
                onClick={() => handleSelectApp(app.id)}
                className={`relative flex flex-col rounded-xl p-2 sm:p-2.5 cursor-pointer transition-all duration-200 border text-left group ${
                  isSelected || isCombo
                    ? 'bg-gradient-to-b from-[#221c11] to-[#120f09] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.01]'
                    : 'bg-[#14120e]/90 border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#181510]'
                }`}
              >
                {/* 3D Cover Thumbnail with 100% full contain, no cropping */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-1.5 bg-black flex items-center justify-center border border-white/5">
                  <img
                    src={app.coverImage}
                    alt={app.name}
                    className="w-full h-full object-contain bg-black transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Selection Radio / Badge */}
                  <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isSelected || isCombo
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] text-black shadow-sm'
                      : 'bg-black/70 border border-white/30 text-transparent'
                  }`}>
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                {/* Badge Tag */}
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] line-clamp-1">
                  ★ {app.badge}
                </span>

                {/* Title */}
                <h3 className="text-[11px] sm:text-xs font-bold text-white line-clamp-1 leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {app.name}
                </h3>

                {/* Pricing Block */}
                <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[9px] text-gray-400 line-through">
                    R$ {app.originalPrice}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#34d399] tracking-wide">
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
          className={`relative rounded-xl p-2.5 sm:p-3 cursor-pointer transition-all duration-200 border flex items-center gap-2.5 mb-3.5 ${
            isCombo
              ? 'bg-gradient-to-r from-[#291b07] via-[#3d2706] to-[#291b07] border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'bg-[#15120c] border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#1a160e]'
          }`}
        >
          {/* Custom Checkbox */}
          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
            isCombo 
              ? 'bg-[#F59E0B] text-black shadow-[0_0_8px_rgba(245,158,11,0.6)]' 
              : 'border border-white/40 bg-black/40 text-transparent'
          }`}>
            <Check className="w-3 h-3 stroke-[3]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 leading-none">
              <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded-full border border-amber-500/30">
                <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> OFERTA VIP
              </span>
              <span className="text-[10px] text-gray-400">
                De <span className="line-through">R$ 261</span> por:
              </span>
              <span className="text-[#34d399] font-black text-xs sm:text-sm">
                +R$ 9,90
              </span>
            </div>

            <p className="text-[10px] sm:text-[11px] text-white font-medium mt-1 leading-tight line-clamp-1 sm:line-clamp-none">
              Destravar o <strong>Combo Completo dos 3 Apps VIP</strong> juntos (Economia de mais de R$ 250).
            </p>
          </div>
        </div>

        {/* CTA BUTTONS & LOSS AVERSION */}
        <div className="flex flex-col gap-1.5 relative z-10">
          <Button
            onClick={handleConfirm}
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] hover:from-[#F59E0B] hover:to-[#D4AF37] text-black font-extrabold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-[0_6px_25px_rgba(212,175,55,0.35)] transition-all duration-200 flex items-center justify-center gap-1.5 group cursor-pointer active:scale-[0.98]"
          >
            <Gift className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>
              {isCombo
                ? 'GARANTIR OS 3 APLICATIVOS VIP (+R$ 9,90)'
                : `GARANTIR ${activeApp.name.toUpperCase()} GRÁTIS`
              }
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-black group-hover:translate-x-1 transition-transform" />
          </Button>

          <button
            type="button"
            onClick={handleDismissWithoutGift}
            className="text-[10px] sm:text-[11px] text-gray-400 hover:text-gray-200 transition-colors underline font-medium text-center py-0.5 cursor-pointer"
          >
            Prefiro abrir mão do presente e continuar sem brinde...
          </button>
        </div>

        {/* Security / Trust Stamp */}
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-center gap-3 text-[9px] sm:text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Acesso liberado no final do pedido
          </span>
          <span>•</span>
          <span>Funciona em qualquer celular</span>
        </div>
      </div>
    </div>
  );
}
