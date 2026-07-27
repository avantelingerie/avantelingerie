import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Percent, ShieldCheck, Clock } from 'lucide-react';
import RevendedorActivationForm from './RevendedorActivationForm.jsx';

export default function RevendedorActivationModal({ isOpen, onClose, onSubmit, isLoading }) {
  if (!isOpen) return null;

  const benefits = [
    { icon: Percent, title: 'Descontos progressivos', desc: 'Até 20% OFF extra no carrinho' },
    { icon: TrendingUp, title: 'Margens atrativas', desc: 'Lucro de até 150% na revenda' },
    { icon: ShieldCheck, title: 'Condições exclusivas', desc: 'Acesso a kits e combos especiais' },
    { icon: Clock, title: 'Atendimento prioritário', desc: 'Suporte dedicado via WhatsApp' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-[#3A2E2A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Side - Benefits */}
          <div className="w-full md:w-2/5 bg-[#3A2E2A] p-8 md:p-10 text-white flex flex-col justify-center relative overflow-hidden shrink-0">
            <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.05] mix-blend-overlay" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight text-[#D4AF37]">
                Ative sua Condição Profissional
              </h2>
              <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
                Seu carrinho atual pode desbloquear condições comerciais exclusivas para revenda.
              </p>

              <div className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{benefit.title}</h4>
                      <p className="text-white/60 text-xs mt-1">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-[#3A2E2A] mb-6">
                Preencha seus dados para liberar os descontos
              </h3>
              <RevendedorActivationForm 
                onSubmit={onSubmit} 
                onCancel={onClose}
                isLoading={isLoading}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}