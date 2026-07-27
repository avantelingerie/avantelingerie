import React from 'react';
import { motion } from 'framer-motion';
import TestimonialsCarouselSection from '@/components/TestimonialsCarouselSection.jsx';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TestimonialsSection({ className }) {
  return (
    <section className={cn("py-24 bg-white relative overflow-hidden border-t border-gray-50", className)}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-[#FFFDFB] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c59b5f]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-[-10%] w-[300px] h-[300px] bg-gray-50 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
              <span className="w-6 h-px bg-[#c59b5f]" />
              <span className="text-[#c59b5f] font-bold tracking-[3px] uppercase text-xs flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Histórias de Sucesso
              </span>
              <span className="w-6 h-px bg-[#c59b5f]" />
            </div>

            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 leading-tight mb-6">
              Elas começaram como você… e hoje estão faturando com a Avante
            </h2>
            
            <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-8">
              Veja histórias reais de mulheres decididas que deram o primeiro passo e conquistaram independência financeira, liberdade de horários e uma autoestima renovada através de nosso ateliê.
            </p>

            <div className="hidden lg:flex items-center gap-4 text-gray-400 font-medium text-xs">
              <span className="w-10 h-10 rounded-full bg-[#FFF8F5] border border-[#c59b5f]/30 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#c59b5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#c59b5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#c59b5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Deslize no celular para assistir a mais depoimentos
            </div>
          </motion.div>

          {/* Carousel Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex-1 w-full flex justify-center lg:justify-end pr-0 lg:pr-8"
          >
            <test-carousel />
            <TestimonialsCarouselSection />
          </motion.div>

        </div>
      </div>
    </section>
  );
}