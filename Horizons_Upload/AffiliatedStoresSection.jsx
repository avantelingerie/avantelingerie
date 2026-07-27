import React from 'react';
import { motion } from 'framer-motion';

const AffiliatedStoresSection = () => {
  const marcas = [
    {
      id: 'brand-1',
      name: 'Bella Íntima',
      desc: 'Sofisticação, sensualidade e elegância em peças que valorizam a beleza feminina.',
      src: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/7155ae224c8426bf3b195e3cc770cf7e.png',
      isDark: true,
      textColor: 'text-gray-300',
      logoFilter: 'brightness(1.1) contrast(1.2) drop-shadow(0 0 15px rgba(197, 155, 95, 0.65))',
      logoMobileHeight: '165px',
      logoDesktopHeight: '225px'
    },
    {
      id: 'brand-2',
      name: 'Versatil',
      desc: 'Versatilidade e conforto para mulheres modernas, dentro e fora da rotina fitness.',
      src: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/6a8992925775282761ac649e912afc2f.png',
      isDark: false,
      textColor: 'text-gray-300',
      logoFilter: 'brightness(1.1) contrast(1.2) drop-shadow(0 0 15px rgba(233, 206, 191, 0.55))',
      logoMobileHeight: '180px',
      logoDesktopHeight: '255px'
    },
    {
      id: 'brand-3',
      name: 'Jeito Feminino',
      desc: 'Moda íntima feminina com personalidade, delicadeza e autenticidade.',
      src: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/91c85835af78a26f97f349d5a7d1ab2d.png',
      isDark: true,
      textColor: 'text-gray-300',
      // Filtro de luz prateada com preservador de matiz (hue-rotate):
      // Inverte o preto para prata brilhante, mas rotaciona a cor para trazer de volta o rosa perfeito original
      logoFilter: 'invert(0.9) hue-rotate(180deg) brightness(0.95) contrast(0.9) drop-shadow(0 0 15px rgba(255, 255, 255, 0.45))',
      logoMobileHeight: '225px',
      logoDesktopHeight: '315px'
    },
    {
      id: 'brand-4',
      name: 'Immo Lingerie',
      desc: 'Uma experiência romântica e sofisticada inspirada na delicadeza feminina.',
      src: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/431699410d65e81644fbd9b9df4dc780.png',
      isDark: false,
      textColor: 'text-gray-300',
      logoFilter: 'brightness(1.1) contrast(1.2) drop-shadow(0 0 15px rgba(236, 212, 203, 0.55))',
      logoMobileHeight: '195px',
      logoDesktopHeight: '270px'
    }
  ];

  return (
    <section id="nossas-lojas" className="py-8 md:py-12 bg-gradient-to-br from-[#0b0b0b] via-[#161616] to-[#251b11] overflow-hidden relative border-y border-[#c59b5f]/30 w-full">
      {/* Luzes tridimensionais de fundo */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#c59b5f]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#c59b5f]/6 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Container */}
      <div className="container-custom relative z-10 mb-6 text-center">
        <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
          ✦ ECOSSISTEMA AVANTE ✦
        </span>
        <h2 className="text-3xl md:text-4.5xl font-serif font-semibold text-white tracking-[2px] mt-2 mb-2 leading-tight drop-shadow-md">
          NOSSAS LOJAS PARCEIRAS
        </h2>
        <h3 className="text-[10px] md:text-xs font-sans text-[#c59b5f] uppercase tracking-[3px] font-bold mb-4">
          UM UNIVERSO DE MARCAS FEMININAS
        </h3>
        <p className="text-gray-300 text-xs md:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4">
          A Avante Lingerie conecta marcas femininas com identidades únicas, oferecendo experiências exclusivas em moda íntima, sensualidade e bem-estar.
        </p>
        <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Carrossel Horizontal Contínuo e Automático (Marquee) */}
      <div className="relative w-full overflow-hidden py-4 select-none">
        {/* Degradê de sombreamento lateral para suavizar a entrada/saída das logos */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#0b0b0b] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#251b11] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-16 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35, // Velocidade suave e luxuosa para perfeita leitura
            repeat: Infinity,
          }}
        >
          {/* Renderizamos a lista duplicada para criar o loop contínuo infinito e sem emendas */}
          {[...marcas, ...marcas, ...marcas].map((marca, index) => (
            <div
              key={`${marca.id}-${index}`}
              className="flex flex-col items-center justify-between group cursor-default p-2 px-6 w-[280px] md:w-[350px] shrink-0 h-[320px] md:h-[390px] bg-transparent"
            >
              {/* Topo: Logo Ampliada com Iluminação de Fundo e Filtro Glow */}
              <div className="flex-grow flex items-center justify-center py-2 relative w-full">
                {/* Aura de iluminação (Glow) radial suave atrás da logo que intensifica no Hover */}
                <div
                  className="absolute inset-0 m-auto w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-85 group-hover:scale-125 transition-all duration-700 pointer-events-none"
                  style={{
                    background: marca.id === 'brand-3'
                      ? 'radial-gradient(circle, rgba(219, 39, 119, 0.35) 0%, rgba(0,0,0,0) 70%)' // Rosa/Magenta para Jeito Feminino
                      : marca.isDark
                        ? 'radial-gradient(circle, rgba(197, 155, 95, 0.45) 0%, rgba(0,0,0,0) 70%)'
                        : 'radial-gradient(circle, rgba(233, 206, 191, 0.5) 0%, rgba(0,0,0,0) 70%)'
                  }}
                />

                <img
                  src={marca.src}
                  alt={`Logo ${marca.name}`}
                  className="w-auto object-contain transition-all duration-700 ease-out group-hover:scale-[1.08]"
                  style={{
                    filter: marca.logoFilter,
                    height: `clamp(${marca.logoMobileHeight}, 16vw, ${marca.logoDesktopHeight})`
                  }}
                  loading="lazy"
                />
              </div>

              {/* Divisor fino dourado com expansão suave no Hover */}
              <div className="w-10 h-[1px] bg-[#c59b5f]/30 my-2 shrink-0 transition-all duration-500 group-hover:w-20 group-hover:bg-[#c59b5f]/60" />

              {/* Base: Descrição com fundo transparente e legibilidade em fundo escuro */}
              <div className="text-center px-2 shrink-0">
                <p className={`text-xs md:text-sm font-light leading-relaxed tracking-wide ${marca.textColor}`}>
                  {marca.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Texto de Encerramento Simétrico */}
      <div className="container-custom relative z-10 text-center mt-6 space-y-3">
        <span className="text-[9px] md:text-xs text-[#c59b5f] tracking-[3px] uppercase font-bold select-none">
          TODAS CONECTADAS PELA ESSÊNCIA FEMININA AVANTE.
        </span>

        {/* Ícone de coroa dourado em SVG */}
        <div className="flex items-center justify-center pt-1.5">
          <svg
            className="w-8 h-8 text-[#c59b5f] transition-transform duration-500 hover:rotate-6 hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.2"
              d="M3 18l1.5-9 4.5 4.5L12 6l3 7.5 4.5-4.5 1.5 9H3z"
            />
            <circle cx="12" cy="18" r="1" fill="#c59b5f" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default AffiliatedStoresSection;