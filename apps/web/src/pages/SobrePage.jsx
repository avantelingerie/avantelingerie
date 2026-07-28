import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Memoized video component to block any React re-renders which cause stutters and trembling
const BackgroundVideo = memo(() => {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
      {/* Dark overlay to guarantee text legibility */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover opacity-75 transform translate-z-0 will-change-transform"
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
      >
        <source src="/video/nf_sobre.mp4" type="video/mp4" />
        <source src="/videos/nova_friburgo_bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
});

BackgroundVideo.displayName = 'BackgroundVideo';

export default function SobrePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#2C2C2C] font-sans flex flex-col pt-[72px] md:pt-[88px] overflow-hidden">
      <Helmet>
        <title>Sobre a Avante | Tradição e Moda Íntima em Nova Friburgo</title>
        <meta name="description" content="Saiba mais sobre a nossa trajetória em Nova Friburgo, a capital nacional da lingerie, e nosso compromisso de conforto real." />
      </Helmet>

      {/* SECTION 1: Clean video hero without box or modals */}
      <section className="relative h-[65vh] md:h-[75vh] w-full flex items-center justify-center text-white text-center px-4 overflow-hidden bg-black">
        {/* Render memoized background video */}
        <BackgroundVideo />

        {/* Headline, Subheadline and Buttons over the video */}
        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#e6c280]"
          >
            <MapPin size={12} /> Polo de Nova Friburgo
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5.5xl font-serif font-bold text-white tracking-tight leading-tight"
          >
            Tradição e Carinho no Berço <br />
            <span className="text-[#e6c280] italic font-normal">Da Lingerie Nacional</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-200 text-sm md:text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            A Avante Lingerie tem orgulho de fazer parte da história de Nova Friburgo, o maior polo de moda íntima do Brasil.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3.5 bg-[#c59b5f] hover:bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              Explorar Coleções <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => navigate('/quero-revender')}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Seja uma Revendedora
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Sincere and professional brand history below the video */}
      <section className="py-20 px-4 md:px-8 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Title */}
          <div className="text-center space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#c59b5f] block">
              NOSSA HISTÓRIA
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-[#1E1E1E]">
              O Maior Polo de Moda Íntima do País
            </h2>
            <div className="w-12 h-0.5 bg-[#c59b5f] mx-auto rounded-full" />
          </div>

          {/* Narrative text block */}
          <div className="prose prose-lg max-w-3xl mx-auto text-gray-600 font-light text-sm md:text-base leading-relaxed space-y-6">
            <p>
              Nova Friburgo, localizada na Região Serrana do Rio de Janeiro, é amplamente reconhecida como a capital nacional da moda íntima. No bairro de <strong>Olaria</strong>, o polo de confecção reúne dezenas de fábricas e lojas, sendo um verdadeiro centro de criatividade e talento técnico que abastece todo o Brasil.
            </p>
            <p>
              É nesse cenário de tradição e dedicação que a <strong>Avante Lingerie</strong> foi fundada. Nosso ateliê principal fica no coração de Olaria, onde trabalhamos ao lado de costureiras locais altamente capacitadas. Acreditamos que o verdadeiro valor de uma lingerie não está em adjetivos de luxo exagerados, mas sim no cuidado com o qual a peça é desenhada, cortada e costurada.
            </p>
            <p>
              Nosso compromisso é entregar peças com conforto de verdade para o dia a dia. Por isso, selecionamos com seriedade cada matéria-prima: forros internos estritamente 100% algodão nobre, rendas antialérgicas que se adaptam suavemente ao corpo e metais livres de níquel que não agridem a pele. Cada lingerie é revisada individualmente antes do envio, carregando a seriedade e o carinho da confecção na serra.
            </p>
          </div>

          {/* Core Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-150">
            <div className="flex gap-4">
              <Heart size={20} className="text-[#c59b5f] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1E1E1E] text-sm mb-1">Conforto Real</h4>
                <p className="text-gray-500 text-xs font-light">Modelagens anatômicas feitas para vestir bem e acompanhar o seu dia sem apertar.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Sparkles size={20} className="text-[#c59b5f] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1E1E1E] text-sm mb-1">Cuidado Dermatológico</h4>
                <p className="text-gray-500 text-xs font-light">Materiais testados, rendas hipoalergênicas e forro protetor de algodão puro.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck size={20} className="text-[#c59b5f] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-[#1E1E1E] text-sm mb-1">Empresa Registrada</h4>
                <p className="text-gray-500 text-xs font-light">Operação séria de fabricação própria com nota fiscal e garantia de troca grátis.</p>
              </div>
            </div>
          </div>

          {/* Legal Business Footer */}
          <div className="bg-[#FCFAF7] border border-gray-150 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-gray-500">
            <div>
              <p className="font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-0.5">Razão Social</p>
              <p className="font-medium text-gray-600">AVANTE INDUSTRIA E COMERCIO DE VESTUARIO LTDA</p>
              <p className="font-light text-gray-400 mt-1">Rua Folly, 69, Olaria, Nova Friburgo - RJ | CEP 28623-780</p>
            </div>
            <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-xs shrink-0 flex flex-col items-center">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block text-center">CNPJ</span>
              <span className="text-xs font-mono font-semibold text-gray-700">54.615.037/0001-53</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
