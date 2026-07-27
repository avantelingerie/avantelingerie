import React from 'react';
import { ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function TrustSection() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 w-full">
      {/* Card 1: Compra Segura */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#FFFBF8] py-3.5 px-2 rounded-2xl border border-[#c59b5f]/25 shadow-premium-sm transition-all duration-300 hover:border-[#c59b5f]/50 hover:shadow-premium-md text-slate-800 text-center">
        <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          Compra Segura
        </span>
      </div>

      {/* Card 2: Troca Facilitada */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#FFFBF8] py-3.5 px-2 rounded-2xl border border-[#c59b5f]/25 shadow-premium-sm transition-all duration-300 hover:border-[#c59b5f]/50 hover:shadow-premium-md text-slate-800 text-center">
        <RefreshCw className="w-4 h-4 text-blue-600 flex-shrink-0" strokeWidth={2} />
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          Troca Facilitada
        </span>
      </div>

      {/* Card 3: Envio Rápido */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 bg-[#FFFBF8] py-3.5 px-2 rounded-2xl border border-[#c59b5f]/25 shadow-premium-sm transition-all duration-300 hover:border-[#c59b5f]/50 hover:shadow-premium-md text-slate-800 text-center">
        <Truck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" strokeWidth={2} />
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider">
          Envio Rápido
        </span>
      </div>
    </div>
  );
}