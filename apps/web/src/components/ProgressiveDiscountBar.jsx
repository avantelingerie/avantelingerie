import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Unlock, Lock, ShoppingBag, Gift, Crown, Award } from 'lucide-react';
import { descontosService } from '@/services/descontosService.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function ProgressiveDiscountBar({ currentTotal = 0 }) {
  const { currentUser } = useAuth();
  const [configuracoes, setConfiguracoes] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Load configuration for progressive discounts
  useEffect(() => {
    descontosService.getConfiguracoes()
      .then(config => setConfiguracoes(config))
      .catch(err => console.error('[ProgressiveDiscountBar] Erro ao carregar configurações:', err));
  }, []);

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
  const perfil = isReseller ? 'reseller' : 'retail';
  const faixas = descontosService.getFaixasPorPerfil(configuracoes, perfil);

  // Map dynamic milestones from database or fallback defaults
  const milestones = faixas.length > 0
    ? faixas.map(f => ({
      value: parseFloat(f.valor_minimo),
      discount: parseFloat(f.percentual),
      label: `${f.percentual}%`
    })).sort((a, b) => a.value - b.value)
    : (isReseller
      ? [
        { value: 1500, discount: 10, label: '10%' },
        { value: 3000, discount: 15, label: '15%' }
      ]
      : [
        { value: 300, discount: 15, label: '15%' },
        { value: 900, discount: 20, label: '20%' }
      ]
    );

  const maxMilestone = milestones[milestones.length - 1]?.value || 1000;

  // Progress calculations
  const clampedTotal = Math.min(currentTotal, maxMilestone);
  const progressPercent = (clampedTotal / maxMilestone) * 100;

  // Determine active and next milestones
  let activeMilestone = null;
  let nextMilestone = milestones[0];

  for (let i = milestones.length - 1; i >= 0; i--) {
    if (currentTotal >= milestones[i].value) {
      activeMilestone = milestones[i];
      nextMilestone = milestones[i + 1] || null;
      break;
    }
  }

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const getDynamicMessage = () => {
    if (currentTotal === 0) {
      return isReseller
        ? 'Monte seu pedido e desbloqueie descontos progressivos adicionais no atacado!'
        : 'Adicione peças e desbloqueie até 20% OFF Progressivo de alta costura!';
    }

    if (!nextMilestone) {
      return isReseller
        ? `✨ Incrível! Você alcançou o desconto de atacado máximo de ${activeMilestone.label} extra!`
        : `✨ Luxo Máximo! Você desbloqueou o desconto especial de ${activeMilestone.label} OFF!`;
    }

    const diff = nextMilestone.value - currentTotal;

    if (activeMilestone) {
      return isReseller
        ? `👑 Desconto de ${activeMilestone.label} Extra Ativo! Faltam ${formatCurrency(diff)} para subir para ${nextMilestone.label} Extra!`
        : `🎉 ${activeMilestone.label} OFF Ativo! Adicione mais ${formatCurrency(diff)} e libere ${nextMilestone.label} OFF!`;
    }

    return isReseller
      ? `Faltam ${formatCurrency(diff)} para ativar o primeiro desconto adicional de ${nextMilestone.label} no seu atacado!`
      : `Adicione apenas mais ${formatCurrency(diff)} e destrave seu primeiro desconto de ${nextMilestone.label} OFF!`;
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#251f15] border border-[#c59b5f]/30 rounded-3xl p-6 relative overflow-hidden shadow-premium group"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#c59b5f]/10 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-80"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#e5c595]/5 rounded-full blur-[60px] pointer-events-none transition-opacity duration-500 group-hover:opacity-80"></div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c59b5f] to-[#e5c595] text-black flex items-center justify-center shadow-lg font-bold">
            {isReseller ? (
              <Crown className="w-5 h-5 text-black" strokeWidth={1.5} />
            ) : (
              <Award className="w-5 h-5 text-black" strokeWidth={1.5} />
            )}
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-white tracking-wide">
              {isReseller ? 'Vantagens de Revendedora Avante' : 'Boutique de Descontos Progressivos'}
            </h3>
            <p className="text-[10px] text-[#c59b5f] uppercase tracking-[2px] font-semibold">
              {isReseller ? 'Margens extras e benefícios exclusivos' : 'Leve mais, pague menos'}
            </p>
          </div>
        </div>

        {/* Current Balance Tag */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 self-start md:self-auto flex items-center gap-2">
          <span className="text-[10px] text-white/50 uppercase tracking-widest">Total Parcial:</span>
          <span className="text-sm font-bold text-white tracking-tight">{formatCurrency(currentTotal)}</span>
        </div>
      </div>

      {/* Dynamic Animated Message */}
      <div className="mb-6 relative z-10 min-h-[2.5rem] flex items-center">
        <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
          {getDynamicMessage()}
        </p>
      </div>

      {/* Progressive Line Container */}
      <div className="relative h-3 bg-black/40 rounded-full mb-8 mt-2 mx-1 border border-white/5 shadow-inner">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c59b5f] via-[#e5c595] to-[#c59b5f] rounded-full shadow-[0_0_12px_rgba(197,155,95,0.4)] relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute right-0 top-0 h-full w-2 bg-white/40 blur-[2px] rounded-full animate-pulse"></div>
        </motion.div>

        {/* Milestone Circles & Details */}
        {milestones.map((m, idx) => {
          const posPercent = (m.value / maxMilestone) * 100;
          const isReached = currentTotal >= m.value;

          return (
            <div
              key={idx}
              className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-20"
              style={{ left: `calc(${posPercent}% - 14px)` }}
            >
              <motion.div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-default ${isReached
                    ? 'border-[#c59b5f] bg-gradient-to-br from-[#c59b5f] to-[#e5c595] text-black shadow-[0_0_15px_rgba(197,155,95,0.4)]'
                    : 'border-[#c59b5f]/30 bg-[#121212] text-[#c59b5f]/50'
                  }`}
                whileHover={{ scale: 1.15 }}
                animate={isReached ? {
                  boxShadow: [
                    '0 0 10px rgba(197,155,95,0.3)',
                    '0 0 20px rgba(197,155,95,0.5)',
                    '0 0 10px rgba(197,155,95,0.3)'
                  ]
                } : {}}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                {isReached ? (
                  <Unlock className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                ) : (
                  <Lock className="w-3 h-3 text-[#c59b5f]/60" strokeWidth={2.5} />
                )}
              </motion.div>

              <div className="absolute -bottom-7 text-[10px] font-bold whitespace-nowrap tracking-wider text-center flex flex-col items-center">
                <span className={isReached ? 'text-[#c59b5f]' : 'text-white/40'}>
                  {m.label} OFF
                </span>
                <span className="text-[8px] text-white/30 font-light mt-0.5">
                  {formatCurrency(m.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}