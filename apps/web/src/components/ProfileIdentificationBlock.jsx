import React from 'react';
import { ShoppingBag, Crown, UserCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfileIdentificationBlock({ currentUser, tipo_cliente }) {
  if (!currentUser) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm transition-all duration-300">
        <UserCircle className="w-5 h-5 text-white/60" />
        <span className="text-sm md:text-base text-white/80 font-medium">
          Faça login ou cadastre-se para condições exclusivas
        </span>
        <Link to="/login" className="text-[#D4AF37] text-sm md:text-base font-semibold hover:underline flex items-center">
          Entrar <ChevronRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>
    );
  }

  if (tipo_cliente === 'revendedor') {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 bg-white/5 border border-[#D4AF37]/30 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 shadow-md backdrop-blur-sm transition-all duration-300">
        <div className="flex items-start gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
            <Crown className="w-5 h-5 text-[#D4AF37]" strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-bold text-base md:text-lg">👑 Área Profissional Ativa</h3>
            <p className="text-white/70 text-sm md:text-base">Condições comerciais exclusivas já aplicadas ao seu pedido</p>
          </div>
        </div>
        <div className="shrink-0 mt-2 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wide uppercase">
            Tabela Profissional
          </span>
        </div>
      </div>
    );
  }

  // Varejo (Default)
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 shadow-sm backdrop-blur-sm transition-all duration-300">
      <div className="flex items-start gap-4 text-center sm:text-left">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <ShoppingBag className="w-5 h-5 text-[#D4AF37]" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-white font-bold text-base md:text-lg">🛍️ Compra Varejo</h3>
          <p className="text-white/70 text-sm md:text-base">Condições especiais para sua compra com total segurança</p>
        </div>
      </div>
      <div className="shrink-0 w-full sm:w-auto mt-1 sm:mt-0">
        <Link 
          to="/revenda" 
          className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-white/85 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          Quero Comprar para Revenda
        </Link>
      </div>
    </div>
  );
}