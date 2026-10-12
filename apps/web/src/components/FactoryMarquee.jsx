import React from 'react';
import { motion } from 'framer-motion';

export default function FactoryMarquee() {
  const items = [
    { icon: '🏭', text: 'COMPRE DIRETO DA FÁBRICA' },
    { icon: '📦', text: 'PRONTA-ENTREGA E SOB ENCOMENDA' },
    { icon: '💎', text: 'PREÇO DE ATACADO E VAREJO' },
    { icon: '🚀', text: 'DESCONTOS PROGRESSIVOS' },
  ];

  const renderGroup = (key) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <span key={idx} className="inline-flex items-center mx-3 md:mx-4 gap-2">
          <span className="text-sm md:text-base leading-none select-none">{item.icon}</span>
          <span className="text-[#FFF700] font-bold text-xs md:text-sm tracking-[2px]">{item.text}</span>
          <span className="text-[#c59b5f]/50 ml-2 select-none">•</span>
        </span>
      ))}
    </div>
  );
  
  return (
    <div className="w-full bg-[#111111] overflow-hidden py-3 border-y border-[#c59b5f]/30 flex relative z-[10]">
      <motion.div
        className="flex whitespace-nowrap items-center shrink-0"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25 // 25s loop
        }}
      >
        {renderGroup('g1')}
        {renderGroup('g2')}
        {renderGroup('g3')}
        {renderGroup('g4')}
      </motion.div>
    </div>
  );
}
