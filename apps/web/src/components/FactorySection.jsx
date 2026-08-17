import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';

export default function FactorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#FDFBF9] overflow-hidden">
      <div className="container-custom mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#c59b5f]/10 text-xs font-bold text-[#c59b5f] uppercase tracking-widest w-fit border border-[#c59b5f]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Feito por mãos de ouro
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
              A Verdadeira <span className="text-[#c59b5f] italic">Arte</span> da Confecção
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Nós não revendemos, nós criamos. A Avante Lingerie nasceu de uma confecção independente, onde cada peça é desenhada e costurada com precisão e carinho.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Por sermos os próprios fabricantes, conseguimos entregar qualidade de padrão internacional e rendas exclusivas a <strong>preços de fábrica</strong>, garantindo luxo acessível para você e margens imbatíveis para nossas revendedoras.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5" />
                <span className="text-gray-700">Design exclusivo desenhado por especialistas no corpo da mulher brasileira.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5" />
                <span className="text-gray-700">Costuras de alta durabilidade e aviamentos hipoalergênicos importados.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c59b5f] shrink-0 mt-0.5" />
                <span className="text-gray-700">Zero intermediários: você compra com o preço justo, direto da nossa linha de produção.</span>
              </li>
            </ul>

            <div className="pt-6">
              <Button
                size="lg"
                onClick={() => navigate('/quero-revender')}
                className="bg-black hover:bg-[#c59b5f] text-white font-bold px-8 py-6 rounded-full tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl uppercase group"
              >
                Seja uma Revendedora
                <ChevronRight className="w-4.5 h-4.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Media Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/10 group"
          >
            {/* The user mentioned they have videos of women sewing in the factory used in the hero, 
                we can use one of those videos here as well, or a placeholder if we don't know the exact path.
                I will use hero_2.mp4 assuming it's the one with the sewing. */}
            <video
              src="/video/hero_2.mp4"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <p className="text-white font-medium text-lg italic">
                "Cada ponto é costurado pensando no seu conforto e poder."
              </p>
              <p className="text-white/80 text-sm mt-2 uppercase tracking-widest">
                — Equipe de Confecção Avante
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
