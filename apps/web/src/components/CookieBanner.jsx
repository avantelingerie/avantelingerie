import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, X } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const adminAuth = useAdminAuth();
  const currentAdmin = adminAuth?.currentAdmin;

  useEffect(() => {
    const hasAccepted = localStorage.getItem('avante_cookies_accepted');
    if (hasAccepted !== 'true') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('avante_cookies_accepted', 'true');
    setIsVisible(false);
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute || !!currentAdmin) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, y: 30, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-[99999] w-[calc(100%-3rem)] max-w-[380px]"
        >
          {/* Card Retangular Premium no Canto Inferior Esquerdo */}
          <div className="relative overflow-hidden bg-[#121212]/95 backdrop-blur-xl border border-[#c59b5f]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_30px_rgba(197,155,95,0.08)] p-6 flex flex-col gap-5">
            
            {/* Efeito Glow Champagne sutil de fundo */}
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#c59b5f]/8 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[#c59b5f]/5 blur-2xl pointer-events-none" />

            {/* Cabeçalho do Card */}
            <div className="flex items-center justify-between border-b border-[#c59b5f]/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f]">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <h4 className="font-serif text-[#c59b5f] font-medium text-md tracking-wide flex items-center gap-1.5">
                  Privacidade Premium <Sparkles className="w-3.5 h-3.5" />
                </h4>
              </div>
              <button 
                type="button"
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo do Texto */}
            <div className="text-gray-300 text-[0.88rem] font-light leading-relaxed">
              Utilizamos cookies essenciais e tecnologias semelhantes para personalizar sua experiência, 
              analisar o tráfego e otimizar nossas campanhas de acordo com a nossa{' '}
              <Link 
                to="/central-da-cliente#politica-de-privacidade" 
                className="text-[#c59b5f] font-medium hover:text-[#d6b384] transition-colors underline decoration-[#c59b5f]/30 underline-offset-4"
              >
                Política de Privacidade
              </Link>
              . Ao navegar, você concorda com nossas diretrizes.
            </div>

            {/* Ações / Botões */}
            <div className="flex flex-col gap-2 mt-1">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full py-3 bg-[#c59b5f] text-[#121212] font-semibold text-xs uppercase tracking-[1.5px] rounded-full hover:bg-white hover:text-[#121212] active:scale-98 shadow-[0_8px_20px_rgba(197,155,95,0.2)] hover:shadow-[0_12px_25px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                Aceitar &amp; Continuar
              </button>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}