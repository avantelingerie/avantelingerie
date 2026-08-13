import React from 'react';
import { motion } from 'framer-motion';

export default function FactoryMarquee() {
  const message = "🏭 COMPRE DIRETO DA FÁBRICA • 📦 PRONTA-ENTREGA E SOB ENCOMENDA • 💎 PREÇO DE ATACADO E VAREJO • 🚀 DESCONTOS PROGRESSIVOS";
  
  return (
    <div className="w-full bg-[#111111] overflow-hidden py-3 border-y border-[#c59b5f]/30 flex relative z-[10]">
      <motion.div
        className="flex whitespace-nowrap text-[#c59b5f] font-bold text-xs md:text-sm tracking-[2px]"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25 // 25s loop
        }}
      >
        {/* We duplicate the content multiple times to ensure a seamless infinite loop */}
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
        <span className="mx-4">{message}</span>
      </motion.div>
    </div>
  );
}
