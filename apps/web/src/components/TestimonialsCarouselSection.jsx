import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Wifi, Battery, Signal } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Dani",
    location: "Minas Gerais",
    text: "Comecei com pouco investimento e hoje a Avante é minha principal fonte de renda. As peças se vendem sozinhas!",
    video: "/video/dani_minasgerais.mp4"
  },
  {
    id: 2,
    name: "Stella",
    location: "Rio Grande do Sul",
    text: "A qualidade das lingeries fideliza as clientes. Quem compra uma vez, sempre volta pra comprar mais.",
    video: "/video/stella_riograndedosul.mp4"
  },
  {
    id: 3,
    name: "Silvane",
    location: "Rio de Janeiro",
    text: "Sempre tive o sonho de empreender. Com a Avante, conquistei minha independência financeira.",
    video: "/video/silvane_riodejaneiro.mp4"
  },
  {
    id: 4,
    name: "Clara",
    location: "Espírito Santo",
    text: "O suporte e os materiais de marketing me ajudaram a faturar logo no primeiro mês. É incrível!",
    video: "/video/clara_espiritosanto.mp4"
  },
  {
    id: 5,
    name: "Sonia",
    location: "Bahia",
    text: "Revender Avante mudou minha vida e a da minha família. A lucratividade é real e garantida.",
    video: "/video/sonia_bahia.mp4"
  },
  {
    id: 6,
    name: "Fernanda",
    location: "São Paulo",
    text: "As clientes amam o conforto e o design. É um produto maravilhoso de trabalhar.",
    video: "/video/fernanda_saopaulo.mp4"
  },
  {
    id: 7,
    name: "Vanda",
    location: "Goias",
    text: "A melhor decisão que tomei. Flexibilidade de horários e um retorno financeiro excelente.",
    video: "/video/vanda_RJ.mp4"
  }
];

export default function TestimonialsCarouselSection({ className }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    // Calculate which item is most visible based on the height of a card (85% of container)
    // plus the gap (16px).
    const cardHeight = clientHeight * 0.85 + 16;
    const newIndex = Math.round(scrollTop / cardHeight);
    if (newIndex !== activeIndex) {
      setActiveIndex(Math.min(Math.max(newIndex, 0), testimonials.length - 1));
    }
  };

  const scrollTo = (index) => {
    if (!containerRef.current) return;
    const { clientHeight } = containerRef.current;
    const cardHeight = clientHeight * 0.85 + 16;
    containerRef.current.scrollTo({
      top: index * cardHeight,
      behavior: 'smooth'
    });
    setActiveIndex(index);
  };

  const next = () => {
    if (activeIndex < testimonials.length - 1) scrollTo(activeIndex + 1);
  };

  const prev = () => {
    if (activeIndex > 0) scrollTo(activeIndex - 1);
  };

  return (
    <div className={cn("relative flex items-center justify-center py-8", className)}>

      {/* Smartphone Mockup Container - Replaced brown with deep black luxury and gold accents */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[650px] sm:h-[750px] bg-[#121212] rounded-[3rem] border-[12px] border-[#1a1a1a] shadow-2xl shadow-black/40 overflow-hidden flex flex-col group">

        {/* Status Bar */}
        <div className="absolute top-0 left-0 w-full h-7 z-50 flex items-center justify-between px-6 text-white/90 text-[10px] font-medium pointer-events-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-50 pointer-events-none" />

        {/* Scrollable Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-auto snap-y snap-mandatory pt-12 pb-24 px-4 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth"
        >
          {testimonials.map((t, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={t.id}
                className={cn(
                  "relative w-full h-[85%] min-h-[480px] snap-center shrink-0 rounded-2xl overflow-hidden bg-[#1f1f1f] shadow-xl border border-[#c59b5f]/25 flex flex-col transition-opacity duration-500",
                  isActive ? "opacity-100" : "opacity-50"
                )}
                initial={{ scale: 0.95 }}
                animate={{ scale: isActive ? 1 : 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* Video Area (75%) */}
                <div className="relative w-full h-[70%] sm:h-[75%] bg-black">
                  <video
                    src={t.video}
                    className="w-full h-full object-cover"
                    controls={true}
                    preload="metadata"
                    playsInline
                  />
                  {/* Subtle overlay to blend into the text area */}
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
                </div>

                {/* Text Area (25%) */}
                <div className="relative w-full h-[30%] sm:h-[25%] bg-[#121212] p-5 flex flex-col justify-center border-t border-[#c59b5f]/10">
                  <div className="mb-2">
                    <h4 className="text-[#c59b5f] font-serif font-bold text-base leading-tight tracking-wider uppercase">
                      {t.name}
                    </h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                      {t.location}
                    </p>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed line-clamp-3">
                    "{t.text}"
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* External Controls (Desktop/Tablet) */}
      <div className="hidden md:flex flex-col items-center justify-center gap-6 absolute right-[-80px] top-1/2 -translate-y-1/2">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-[#c59b5f]/30 flex items-center justify-center text-gray-800 hover:bg-[#c59b5f] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-800"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="flex flex-col gap-2 my-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "w-2 transition-all duration-300",
                activeIndex === idx ? "h-8 bg-[#c59b5f] rounded-full" : "h-2 bg-gray-300/40 rounded-full hover:bg-[#c59b5f]/40"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === testimonials.length - 1}
          className="w-12 h-12 rounded-full bg-white shadow-lg border border-[#c59b5f]/30 flex items-center justify-center text-gray-800 hover:bg-[#c59b5f] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-800"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}