import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Percent, Heart, ArrowLeftRight, Crown, ShoppingBag, Shield, ChevronRight, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import { descontosService } from '@/services/descontosService.js';
import { useCart } from '@/hooks/useCart.js';

export default function HomeBeneficiosSection({ onScrollToCategorias }) {
  const navigate = useNavigate();
  const { configuracoes: cartConfig } = useCart();
  const [localConfig, setLocalConfig] = useState(null);

  // Busca inicial das configurações de descontos do banco PocketBase
  useEffect(() => {
    let isMounted = true;
    descontosService.getConfiguracoes()
      .then(cfg => {
        if (isMounted && cfg) {
          setLocalConfig(cfg);
        }
      })
      .catch(err => console.error('[HomeBeneficiosSection] Erro ao carregar configurações de desconto:', err));

    const handleConfigUpdate = (e) => {
      if (e.detail && isMounted) {
        setLocalConfig(e.detail);
      }
    };

    window.addEventListener('configuracoes_updated', handleConfigUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('configuracoes_updated', handleConfigUpdate);
    };
  }, []);

  const config = localConfig || cartConfig;

  // 1. Desconto PIX Dinâmico
  const pixAtivo = config?.desconto_pix_ativo !== false;
  const pixPct = (config?.desconto_pix_pct != null && Number(config.desconto_pix_pct) > 0) ? Number(config.desconto_pix_pct) : 5;

  // 2. Limite Mínimo de Atacado (Gatilho de Upgrade de Fábrica)
  const limiteUpgrade = config?.limite_upgrade_revenda != null 
    ? parseFloat(config.limite_upgrade_revenda) 
    : 69.90;

  // 3. Faixas de Desconto Progressivo - Varejo B2C
  const rawFaixasVarejo = config?.desconto_progressivo_faixas;
  const faixasVarejo = (Array.isArray(rawFaixasVarejo) ? rawFaixasVarejo : [])
    .map(f => ({
      id: f.id || Math.random().toString(),
      min: Number(f.valor_minimo) || 0,
      max: f.valor_maximo != null ? Number(f.valor_maximo) : null,
      pct: Number(f.percentual) || 0
    }))
    .filter(f => f.min > 0 || f.pct > 0)
    .sort((a, b) => a.min - b.min);

  const fallbackFaixasVarejo = [
    { id: 'fv1', min: 0, max: 20, pct: 1.67 },
    { id: 'fv2', min: 20.01, max: 40, pct: 3.33 },
    { id: 'fv3', min: 40.01, max: null, pct: 5 }
  ];

  const activeFaixasVarejo = faixasVarejo.length > 0 ? faixasVarejo : fallbackFaixasVarejo;
  const maxVarejoPct = faixasVarejo.length > 0 ? Math.max(...faixasVarejo.map(f => f.pct)) : 5;

  // 4. Faixas de Desconto Progressivo - Atacado B2B
  const rawFaixasAtacado = config?.desconto_progressivo_faixas_revenda;
  const faixasAtacado = (Array.isArray(rawFaixasAtacado) ? rawFaixasAtacado : [])
    .map(f => ({
      id: f.id || Math.random().toString(),
      min: Number(f.valor_minimo) || 0,
      max: f.valor_maximo != null ? Number(f.valor_maximo) : null,
      pct: Number(f.percentual) || 0
    }))
    .filter(f => f.min > 0 || f.pct > 0)
    .sort((a, b) => a.min - b.min);

  const fallbackFaixasAtacado = [
    { id: 'fa1', min: 0, max: 20, pct: 1.67 },
    { id: 'fa2', min: 20.01, max: 40, pct: 3.33 },
    { id: 'fa3', min: 40.01, max: null, pct: 5 }
  ];

  const activeFaixasAtacado = faixasAtacado.length > 0 ? faixasAtacado : fallbackFaixasAtacado;
  const maxAtacadoPct = faixasAtacado.length > 0 ? Math.max(...faixasAtacado.map(f => f.pct)) : 5;

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <section id="beneficios" className="py-24 bg-gradient-to-br from-[#0b0b0b] via-[#161616] to-[#251b11] text-white border-y border-[#c59b5f]/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#c59b5f]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#c59b5f]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -20 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] mb-4">
            <Sparkles className="w-3.5 h-3.5" /> NA AVANTE VOCÊ GANHA SEMPRE
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto">
            Luxo que se Sente, <span className="text-[#c59b5f] italic">Economia</span> que se Vive!
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c59b5f] to-transparent mx-auto mt-5 mb-6" />
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Descontos automáticos no varejo para uso próprio ou lucros imbatíveis comprando com preço de custo direto da fábrica em Nova Friburgo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* ==========================================
              CARD 1: VAREJO (USO PESSOAL B2C)
              ========================================== */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] backdrop-blur-md border border-[#c59b5f]/20 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-[#c59b5f]/40 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] font-bold text-[#c59b5f] bg-[#c59b5f]/10 border border-[#c59b5f]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  Uso Pessoal
                </span>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Varejo Premium</span>
                  <span className="text-lg font-bold text-[#c59b5f] font-serif">
                    Até {maxVarejoPct}% OFF
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">Compre para Você</h3>
              <p className="text-gray-400 text-sm font-light mb-8">
                Lingeries de alta costura com benefícios acumulativos e economia progressiva.
              </p>

              <ul className="space-y-6 mb-8">
                {/* 1. PIX DINÂMICO */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <Percent className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      PIX Imediato 
                      <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {pixPct}% OFF
                      </span>
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-0.5">
                      Opção de desconto imediato pagando com PIX para pedidos abaixo da faixa máxima de desconto progressivo.
                    </p>
                  </div>
                </li>

                {/* 2. RÉGUA VISUAL DE DESCONTO PROGRESSIVO - VAREJO */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <Zap className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-white">Desconto Progressivo Automático</h4>
                      <span className="text-[10px] text-[#c59b5f] font-semibold">Até {maxVarejoPct}% OFF</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light mb-3">
                      Adicione mais peças à sacola e o desconto salta automaticamente no carrinho:
                    </p>

                    {/* Régua Visual dos Degraus Reais do Admin */}
                    <div className="bg-[#141414]/90 border border-[#c59b5f]/25 rounded-xl p-3.5 space-y-2.5">
                      {activeFaixasVarejo.map((faixa, idx) => (
                        <div key={faixa.id || idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#c59b5f] shadow-[0_0_8px_#c59b5f]" />
                            <span className="text-gray-300 font-medium">
                              A partir de <strong className="text-white">{formatCurrency(faixa.min)}</strong>
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                            {faixa.pct}% OFF
                          </span>
                        </div>
                      ))}

                      {/* Barra de Progresso Ilustrativa */}
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-[#8C6D3B] via-[#C59B5F] to-[#DFC193] rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </li>

                {/* 3. TROCA GARANTIDA */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <ArrowLeftRight className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Troca Simplificada Garantida</h4>
                    <p className="text-xs text-gray-400 font-light mt-0.5">
                      Ficou pequena ou grande? Oferecemos troca simplificada em até 7 dias úteis com total suporte.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => {
                if (onScrollToCategorias) {
                  onScrollToCategorias();
                } else {
                  const el = document.getElementById('categorias');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full py-6 rounded-xl border border-[#c59b5f]/40 text-[#c59b5f] bg-transparent hover:bg-[#c59b5f] hover:text-black hover:border-transparent font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              Explorar Coleções
              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* ==========================================
              CARD 2: ATACADO (REVENDA B2B)
              ========================================== */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#121212] via-[#1a1714] to-[#251e15] border-2 border-[#c59b5f] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-[0_0_45px_rgba(197,155,95,0.25)] transition-all duration-500 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c59b5f]/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span className="text-[9px] font-bold text-black bg-[#c59b5f] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                  Faturamento Real
                </span>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Preço de Fábrica</span>
                  <span className="text-lg font-bold text-white font-serif">
                    Margem de 100% a 150%
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">Revenda Avante Lingerie</h3>
              <p className="text-gray-400 text-sm font-light mb-8 relative z-10">
                Seja dona do seu próprio negócio e lucre alto comprando direto da confecção sem intermediários.
              </p>

              <ul className="space-y-6 mb-8 relative z-10">
                {/* 1. PREÇO DE FÁBRICA COM GATILHO MÍNIMO DINÂMICO */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <Crown className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      Compre a Preço de Custo
                      <span className="text-[11px] font-extrabold text-[#DFC193] bg-[#C59B5F]/20 px-2 py-0.5 rounded-full border border-[#C59B5F]/35">
                        Mín. {formatCurrency(limiteUpgrade)}
                      </span>
                    </h4>
                    <p className="text-xs text-gray-300 font-light mt-0.5">
                      Destrave o preço de atacado com pedido mínimo somado de apenas <strong>{formatCurrency(limiteUpgrade)}</strong> na sacola.
                    </p>
                  </div>
                </li>

                {/* 2. RÉGUA VISUAL DE DESCONTO PROGRESSIVO - ATACADO */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <TrendingUp className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-white">Descontos Progressivos no Atacado</h4>
                      <span className="text-[10px] text-[#DFC193] font-semibold">Até +{maxAtacadoPct}% Extra</span>
                    </div>
                    <p className="text-xs text-gray-300 font-light mb-3">
                      Bonificações extras cumulativas para pedidos de alto volume:
                    </p>

                    {/* Régua Visual dos Degraus Reais de Atacado do Admin */}
                    <div className="bg-[#0D0D0D]/90 border border-[#c59b5f]/30 rounded-xl p-3.5 space-y-2.5">
                      {activeFaixasAtacado.map((faixa, idx) => (
                        <div key={faixa.id || idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#DFC193] shadow-[0_0_8px_#DFC193]" />
                            <span className="text-gray-300 font-medium">
                              A partir de <strong className="text-white">{formatCurrency(faixa.min)}</strong>
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-[#DFC193] bg-[#C59B5F]/20 border border-[#C59B5F]/40 px-2 py-0.5 rounded-md">
                            +{faixa.pct}% Extra
                          </span>
                        </div>
                      ))}

                      {/* Barra de Progresso Ilustrativa de Atacado */}
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-[#C59B5F] via-[#DFC193] to-white rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                </li>

                {/* 3. MÍDIAS E SUPORTE */}
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20 mt-0.5">
                    <Shield className="w-4.5 h-4.5 text-[#c59b5f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Mídias de Estúdio & Consultoria Lia</h4>
                    <p className="text-xs text-gray-300 font-light mt-0.5">
                      Acesso completo a fotos e vídeos profissionais para divulgar nas suas redes, além de suporte comercial direto.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <Button
              onClick={() => navigate('/quero-revender')}
              className="w-full py-6 rounded-xl bg-gradient-to-r from-[#c59b5f] to-[#e5c595] text-black font-bold uppercase tracking-wider text-xs hover:from-white hover:to-white transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-[0_4px_15px_rgba(197,155,95,0.3)] relative z-10 border border-[#c59b5f]"
            >
              Seja uma Revendedora
              <Crown className="w-4 h-4 text-black group-hover/btn:scale-110 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
