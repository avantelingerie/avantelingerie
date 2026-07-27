import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResellersSection({ className }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } }
  };

  const impactPhrases = [
    { icon: Heart, text: "Ganhe mais vendendo lingeries que toda mulher ama vestir." },
    { icon: Sparkles, text: "Sua independência financeira com peças de alto desejo." },
    { icon: TrendingUp, text: "Alta margem de lucro e estoque de giro rápido." },
    { icon: ShieldCheck, text: "Revender Avante é vender autoconfiança e sofisticação." }
  ];

  return (
    <section className={cn("py-24 md:py-32 bg-white relative overflow-hidden", className)}>
      {/* Subtle Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[40%] h-[60%] rounded-full bg-[#c59b5f]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] rounded-full bg-gray-50 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 relative w-full order-1"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border border-[#c59b5f]/20 bg-gray-50 aspect-video lg:aspect-[4/5] group">
              <video
                src="https://lmdesignerweb.com/video/video_revenda_avante.mp4"
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                playsInline
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#c59b5f]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gray-100 rounded-full blur-xl -z-10" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-6 flex flex-col items-start max-w-xl order-2"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFF8F5] text-[#c59b5f] text-xs font-bold tracking-widest uppercase border border-[#c59b5f]/20">
                Oportunidade de Negócios Avante
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4.5xl font-serif text-gray-900 leading-tight mb-6 font-bold"
            >
              Transforme Paixão em Lucro com Lingeries Premium
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-10"
            >
              Seja dona de sua própria jornada de sucesso. Encante suas clientes com lingeries exclusivas que vestem curvas com sensualidade, discrição e conforto impecável.
            </motion.p>

            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full">
              {impactPhrases.map((phrase, index) => {
                const Icon = phrase.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col gap-3 p-5 rounded-2xl bg-white shadow-sm border border-[#c59b5f]/15 hover:border-[#c59b5f]/40 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#FFF8F5] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#c59b5f]" />
                    </div>
                    <span className="text-gray-800 font-bold font-serif text-sm leading-snug">
                      {phrase.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#c59b5f] hover:bg-black text-black hover:text-[#c59b5f] border border-transparent hover:border-[#c59b5f] rounded-full px-8 py-6.5 text-xs uppercase tracking-wider font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <Link to="/revendedora">
                  Quero Ser Revendedora Avante
                  <ArrowRight className="ml-2 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}