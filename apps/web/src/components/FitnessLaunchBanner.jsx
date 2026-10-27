import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FitnessLaunchBanner() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    try {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'fitness_launch_banner_click',
          action: 'encomenda_fabrica'
        });
      }
    } catch (_) {}

    navigate('/contato?assunto=Encomendas%20Especiais%20%2F%20Produção&produto=Coleção%20Fitness%20Avante%20(Pré-Lançamento)&ref=FITNESS-FRIBURGO');
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Olá Lia! Gostaria de consultar a grade e garantir encomendas antecipadas da nova Linha Fitness Avante.');
    window.open(`https://wa.me/5522998811776?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-12 md:py-16 bg-[#0E0E0E] text-white overflow-hidden border-y border-[#c59b5f]/30">
      {/* Luz ambiente de fundo e texturas de luxo */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c59b5f]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c59b5f]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#c59b5f_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#181614] via-[#121110] to-[#0A0908] border border-[#c59b5f]/40 p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden">
          
          {/* Faixa decorativa no topo do card interno */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c59b5f] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Lado Esquerdo: Conteúdo e Chamada de Conversão */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge de Pré-Lançamento */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/40 text-[#c59b5f] text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#c59b5f]" />
                <span>Pré-Lançamento Exclusivo • Direto da Fábrica</span>
              </div>

              {/* Título de Alto Impacto */}
              <h2 className="text-2xl sm:text-3.5xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Linha Fitness Avante: <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c59b5f] via-[#edd5ab] to-[#c59b5f]">
                  Alta Compressão & Zero Transparência
                </span>
              </h2>

              {/* Texto Persuasivo */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                Desenvolvida com <strong>poliamida tecnológica de toque acetinado</strong>, elasticidade quadridirecional e modelagem anatômica que abraça as curvas sem marcar. Lotes limitados de pré-venda e confecção sob encomenda direta do polo de <strong>Nova Friburgo</strong> para revendedoras e clientes VIP.
              </p>

              {/* 3 Pilares Técnicos da Peça */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b5f]/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Zero Transparência</h3>
                    <p className="text-[10px] text-gray-400">Trama densa de alta cobertura</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b5f]/20 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Alta Compressão</h3>
                    <p className="text-[10px] text-gray-400">Modela a cintura e sustenta</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-[#c59b5f]/20 flex items-center justify-center shrink-0">
                    <span className="text-sm">🏭</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Grade sob Medida</h3>
                    <p className="text-[10px] text-gray-400">Do P ao GG direto de fábrica</p>
                  </div>
                </div>
              </div>

              {/* Ações (CTAs) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
                <button
                  type="button"
                  onClick={handleOrderClick}
                  aria-label="Garantir lote exclusivo ou encomendar da fábrica"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#c59b5f] via-[#dfc193] to-[#c59b5f] text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-[#c59b5f]/20 cursor-pointer"
                >
                  <span aria-hidden="true" className="text-base">📦</span>
                  <span>ENCOMENDAR LOTE DE FÁBRICA</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  aria-label="Tirar dúvidas com a Lia no WhatsApp"
                  className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-wider bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 hover:border-[#c59b5f]/50 transition-all duration-300 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>CONSULTAR VIA WHATSAPP</span>
                </button>
              </div>

            </div>

            {/* Lado Direito: Selo de Autenticidade & Card Ilustrativo */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-md relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-[#c59b5f]/30 backdrop-blur-md shadow-inner text-center space-y-4">
                
                {/* Ícone de Destaque */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1f1b14] to-[#2e261a] border border-[#c59b5f]/50 flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl" aria-hidden="true">💎</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c59b5f]">
                    Polo de Moda Íntima & Fitness
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">
                    Nova Friburgo • RJ
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Confecção própria com tecidos nobres homologados, garantia anti-transparência e entrega para todo o Brasil.
                  </p>
                </div>

                {/* Micro-termômetro de Urgência */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between items-center text-[11px] mb-1.5 font-medium">
                    <span className="text-gray-400">Lote 1 (Pré-venda Friburgo):</span>
                    <span className="text-[#c59b5f] font-bold">Últimas 200 peças</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#c59b5f] to-[#e5c595] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                  <span className="block text-[10px] text-gray-500 mt-1.5">
                    * Após o fim do lote, novos pedidos entram na fila padrão de produção (5 a 7 dias úteis).
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
