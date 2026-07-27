// Caminho do arquivo: apps/web/src/pages/QueroRevenderPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, Award, Shield, Crown, ShoppingBag,
  ArrowRight, Check, HelpCircle, Users, Download,
  Percent, Smartphone, Copy, CheckCircle2, AlertCircle,
  X, Lock, Eye, EyeOff, Loader2, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext.jsx';
import { descontosService } from '@/services/descontosService.js';

export default function QueroRevenderPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, login, signup, updateUser } = useAuth();

  // Load Progressive Discount Configurations
  const [configuracoes, setConfiguracoes] = useState(null);
  useEffect(() => {
    descontosService.getConfiguracoes()
      .then(config => setConfiguracoes(config))
      .catch(err => console.error('[QueroRevenderPage] Erro ao carregar descontos:', err));
  }, []);

  // Calculate dynamic maximum discount values based on database configuration
  const getRetailMaxDiscount = () => {
    if (!configuracoes) return '15%';
    const faixas = configuracoes.desconto_progressivo_faixas;
    const faixasArr = typeof faixas === 'string' ? JSON.parse(faixas) : faixas;
    if (!faixasArr || faixasArr.length === 0) return '15%';
    const max = Math.max(...faixasArr.map(f => f.percentual));
    return `${max}%`;
  };

  const getResellerMaxDiscount = () => {
    if (!configuracoes) return '20%';
    const faixas = configuracoes.desconto_progressivo_faixas_revenda;
    const faixasArr = typeof faixas === 'string' ? JSON.parse(faixas) : faixas;
    if (!faixasArr || faixasArr.length === 0) return '20%';
    const max = Math.max(...faixasArr.map(f => f.percentual));
    return `${max}%`;
  };

  const limiteUpgrade = configuracoes?.limite_upgrade_revenda || 500;

  // Simulator State
  const [investimento, setInvestimento] = useState(1000);

  // Auto-correct investment if it falls below dynamic limit
  useEffect(() => {
    if (investimento < limiteUpgrade) {
      setInvestimento(limiteUpgrade);
    }
  }, [limiteUpgrade, investimento]);

  const ticketMedioPeca = 25; // Custo médio de atacado por peça
  const pecasEstimadas = Math.round(investimento / ticketMedioPeca);
  const retornoEstimado = Math.round(investimento * 2.5); // Vende por 2.5x o valor pago (150% de lucro)
  const lucroLiquido = retornoEstimado - investimento;

  // Form State
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load & Sync Registration Draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('avante_reseller_draft');
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData(prev => ({
          ...prev,
          nome: parsed.nome || '',
          whatsapp: parsed.whatsapp || '',
          email: parsed.email || ''
        }));
      } catch (e) {
        console.error('[QueroRevenderPage] Erro ao carregar rascunho de cadastro:', e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('avante_reseller_draft', JSON.stringify(updated));
      return updated;
    });
  };

  // Funnel Modal States
  const [showVarejoModal, setShowVarejoModal] = useState(false);
  const [showIncompletoModal, setShowIncompletoModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Login Form inside Modal
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);



  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
  const isIncomplete = isReseller && !currentUser?.cadastro_completo;
  const isApproved = isReseller && currentUser?.cadastro_completo;

  // Main Portal Button Click Handler
  const handleAcessarPortal = () => {
    if (!isAuthenticated) {
      setIsLoginMode(false);
      setShowVarejoModal(true);
    } else if (!isReseller) {
      setIsLoginMode(false);
      setShowVarejoModal(true);
    } else if (isIncomplete) {
      setShowIncompletoModal(true);
    } else if (isApproved) {
      navigate('/portal-revenda');
    }
  };

  // Handle Login inside Varejo Modal
  const handleModalLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Preencha e-mail e senha.');
      return;
    }
    setIsLoggingIn(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success('Login realizado com sucesso!');
      setShowVarejoModal(false);
      
      // Determine redirection after login
      setTimeout(() => {
        const u = pb.authStore.model;
        const uReseller = u?.commercial_profile === 'reseller' || u?.tipo_cliente === 'revendedor';
        const uApproved = uReseller && u?.cadastro_completo;
        if (uApproved) {
          navigate('/portal-revenda');
        } else if (uReseller) {
          setShowIncompletoModal(true);
        }
      }, 500);
    } catch (err) {
      toast.error('E-mail ou senha inválidos.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Reseller Account Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.whatsapp || !formData.email) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);
    try {
      const numericWhatsapp = formData.whatsapp.replace(/\D/g, '');
      if (numericWhatsapp.length < 10) {
        toast.error('Informe um WhatsApp válido com DDD.');
        setIsSubmitting(false);
        return;
      }

      // 1. Sign up as reseller
      const authData = await signup(formData.email, numericWhatsapp, 'revendedor');

      // 2. Complete name and whatsapp details
      const updated = await pb.collection('users').update(authData.record.id, {
        name: formData.nome,
        whatsapp: formData.whatsapp,
        commercial_profile: 'reseller',
        account_level: 'basic',
        cadastro_completo: false // Document completion pending
      }, { $autoCancel: false });

      updateUser(updated);

      // Save lead entry as well
      try {
        await pb.collection('leads_revenda').create({
          nome: formData.nome,
          email: formData.email,
          whatsapp: formData.whatsapp,
          status: 'pendente'
        });
      } catch (pbError) {
        console.warn('[QueroRevenderPage] leads_revenda collection fallback:', pbError);
      }

      toast.success('Cadastro de revendedora criado com sucesso! Sua senha temporária é seu WhatsApp.');
      setSubmitSuccess(true);
      localStorage.removeItem('avante_reseller_draft');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error(error.message || 'Erro ao realizar cadastro. Tente outro e-mail.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const faqData = [
    {
      q: "Qual é o valor mínimo para a primeira compra de revendedora?",
      a: `Para liberar o seu acesso à nossa tabela exclusiva de preços de custo (atacado) e garantir a exclusividade, o pedido mínimo inicial é de apenas R$ ${limiteUpgrade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no carrinho (já calculados com o desconto de atacado aplicado).`
    },
    {
      q: "Preciso ter CNPJ para começar a revender?",
      a: "Não! Você pode iniciar o seu negócio imediatamente utilizando o seu CPF. Se futuramente você formalizar sua empresa e desejar migrar para os níveis Verified ou Gold para receber mais benefícios tributários e kits exclusivos, nosso time de suporte fará a alteração em segundos."
    },
    {
      q: "Como funciona a liberação de fotos e vídeos promocionais?",
      a: "Todas as nossas parceiras têm acesso ao Portal Restrito. As parceiras do nível Gold/Approved possuem liberação direta de download de lotes completos de fotos de estúdio profissionais e vídeos reels de alta qualidade das modelos para postarem em suas redes sociais e venderem antes mesmo da peça física chegar!"
    },
    {
      q: "Quais são as formas de pagamento aceitas?",
      a: "Oferecemos 10% de desconto adicional para pagamentos à vista via Pix, ou parcelamento em até 3x sem juros em todos os cartões de crédito para facilitar o fluxo de caixa do seu negócio de revenda."
    },
    {
      q: "Como é calculado o frete para a minha região?",
      a: "Trabalhamos com integração direta ao Melhor Envio, garantindo as tarifas de frete mais baratas do mercado (Correios, Jadlog, Latam Cargo). A partir de determinados volumes de compras de nível Gold, liberamos campanhas de frete grátis ou com subsídio."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden pt-24 md:pt-28 pb-16 font-sans">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C59B5F]/15 border border-[#C59B5F]/30 text-[#C59B5F] font-bold text-xs tracking-wider uppercase">
              <Crown className="w-3.5 h-3.5 animate-pulse" /> Clube de Parceiras Avante
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-sm">
              Transforme sua paixão por moda em <span className="text-[#C59B5F]">independência financeira</span>.
            </h1>

            <p className="text-white/70 text-lg font-light leading-relaxed max-w-2xl">
              Revenda lingeries premium de Nova Friburgo com lucros reais de até 150%. 
              Ganhe acesso imediato a preços de atacado direto de fábrica, kits prontos e material profissional de marketing para explodir suas vendas nas redes sociais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAcessarPortal}
                className="px-8 py-4 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-sm uppercase tracking-wider rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto"
              >
                Acessar Portal de Revenda <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Proof Trust Bars */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-4 text-left">
              <div>
                <p className="text-2xl font-bold text-[#C59B5F] font-serif">+1.200</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Peças enviadas/semana</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#C59B5F] font-serif">150%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">De retorno estimado</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#C59B5F] font-serif">100%</p>
                <p className="text-xs text-white/50 uppercase tracking-wider">Fotos/Vídeos inclusos</p>
              </div>
            </div>
          </div>

          {/* Hero Video Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-[#C59B5F]/10 rounded-3xl filter blur-3xl transform rotate-6 scale-95" />
            <div className="relative border-4 border-[#C59B5F]/30 bg-[#1a1a1a] rounded-[32px] overflow-hidden shadow-2xl w-full max-w-[420px] aspect-[4/5] flex items-center justify-center group transition-transform duration-500 hover:scale-[1.01]">
              <video
                src="https://lmdesignerweb.com/video/video_revenda_avante.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121212]/95 via-[#121212]/40 to-transparent p-8 text-left space-y-2 pointer-events-none z-10">
                <div className="flex gap-1 text-[#C59B5F]">
                  <Crown className="w-4 h-4 fill-current" />
                  <Crown className="w-4 h-4 fill-current" />
                  <Crown className="w-4 h-4 fill-current" />
                </div>
                <p className="text-white text-lg font-serif font-bold">Coleção Satin Gold 2026</p>
                <p className="text-white/80 text-xs font-light">Lingeries de alta costura com margem imbatível de revenda.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: INTERACTIVE PROFIT SIMULATOR (Cream BG #fff8f5) */}
      <section id="simulador" className="py-16 bg-[#fff8f5] border-y border-[#b0874e]/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[#b0874e] text-xs font-bold uppercase tracking-wider">Faça as Contas do Seu Sucesso</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1E1A]">
              Simulador de Lucros Interativo
            </h2>
            <p className="text-[#5C4D4A] font-light">
              Escolha o valor que deseja investir em mercadorias e veja na hora o número estimado de conjuntos premium recebidos, o valor de revenda sugerido e o lucro líquido real no seu bolso.
            </p>
          </div>

          {/* Dark Simulator block */}
          <div className="max-w-4xl mx-auto bg-[#121212] rounded-[24px] border border-[#b0874e]/30 p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C59B5F]/5 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2" />

            {/* Slider Controls */}
            <div className="lg:col-span-7 space-y-8 z-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold uppercase tracking-wider text-white/70">
                    Quanto deseja investir?
                  </label>
                  <span className="text-3xl font-bold font-serif text-[#C59B5F]">
                    R$ {investimento.toLocaleString('pt-BR')}
                  </span>
                </div>

                <input
                  type="range"
                  min={limiteUpgrade}
                  max="5000"
                  step="100"
                  value={investimento}
                  onChange={(e) => setInvestimento(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#C59B5F] border border-white/10"
                />

                <div className="flex justify-between text-xs text-white/40 font-semibold">
                  <span>Mínimo: R$ {limiteUpgrade}</span>
                  <span>Médio: R$ 2.500</span>
                  <span>Máximo: R$ 5.000</span>
                </div>
              </div>

              {/* Details Box */}
              <div className="grid grid-cols-2 gap-6 bg-[#1a1a1a] p-6 rounded-2xl border border-[#b0874e]/20 shadow-inner">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    <ShoppingBag className="w-4 h-4 text-[#C59B5F]" /> Peças sugeridas
                  </div>
                  <p className="text-2xl font-bold text-white font-serif">
                    ~ {pecasEstimadas} conjuntos
                  </p>
                  <p className="text-xxs text-white/40">Variados em modelos e cores</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                    <Percent className="w-4 h-4 text-[#C59B5F]" /> Margem aplicada
                  </div>
                  <p className="text-2xl font-bold text-white font-serif">
                    150% de ROI
                  </p>
                  <p className="text-xxs text-white/40">Retorno estimado sob custo</p>
                </div>
              </div>
            </div>

            {/* Results Callout */}
            <div className="lg:col-span-5 bg-[#1a1a1a] border border-[#b0874e]/30 text-white p-8 rounded-2xl flex flex-col justify-between shadow-2xl z-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B5F]/10 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2" />

              <div className="space-y-2">
                <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Seu Resultado comercial</span>
                <p className="text-sm text-white/70">Você revende o lote total por:</p>
                <p className="text-3xl font-serif font-bold text-[#C59B5F]">
                  R$ {retornoEstimado.toLocaleString('pt-BR')}
                </p>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6 space-y-1">
                <p className="text-xs text-white/50 uppercase tracking-wider">Seu Lucro Líquido Real:</p>
                <p className="text-4xl font-serif font-bold text-emerald-400 animate-pulse">
                  + R$ {lucroLiquido.toLocaleString('pt-BR')}
                </p>
                <p className="text-xxs text-white/40">Dinheiro direto no seu bolso ao concluir as vendas.</p>
              </div>

              <button
                onClick={handleAcessarPortal}
                className="mt-8 px-6 py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl text-center shadow-lg transition-colors duration-300"
              >
                Garantir Minha Vaga de Revenda
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: EXPLICATIVE GUIDE BEFORE THE SAAS TABLE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Como Funciona a Jornada B2B</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Conheça o Caminho da Revendedora
          </h2>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Entenda detalhadamente cada tipo de perfil de cliente na nossa plataforma. Cada fase possui direitos específicos de descontos, acessos a mídias e ferramentas exclusivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1: Visitante (Deslogado) */}
          <div className="bg-[#1a1a1a]/80 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden hover:border-[#C59B5F]/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/60">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">1. Visitante Deslogado</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Tem acesso público ao site com preços de varejo. Pode testar o simulador e navegar nas coleções, mas não visualiza preços de atacado e não possui acesso ao Portal.
            </p>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider bg-white/5 py-1 px-2.5 rounded inline-block">
              Acesso Público
            </div>
          </div>

          {/* Card 2: Cliente Varejo (Logado) */}
          <div className="bg-[#1a1a1a]/80 border border-white/5 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden hover:border-[#C59B5F]/20 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-[#C59B5F]/10 flex items-center justify-center text-[#C59B5F]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">2. Cliente Varejo Logado</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Membro cadastrado para compras de uso pessoal. Compra com preços normais de varejo e pode fazer upgrade para revenda automaticamente ao somar R$ {limiteUpgrade} na sacola.
            </p>
            <div className="text-[10px] text-[#C59B5F] font-bold uppercase tracking-wider bg-[#C59B5F]/5 py-1 px-2.5 rounded inline-block">
              Preços de Varejo
            </div>
          </div>

          {/* Card 3: Revendedor Incompleto */}
          <div className="bg-[#1a1a1a]/80 border border-amber-500/10 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden hover:border-amber-500/25 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">3. Revendedor Incompleto</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Já compra com preços de atacado direto de fábrica e acessa a precificadora no portal, mas as mídias (fotos/vídeos originais) ficam bloqueadas até preencher o CPF/CNPJ em Minha Conta.
            </p>
            <div className="text-[10px] text-amber-500 font-bold uppercase tracking-wider bg-amber-500/5 py-1 px-2.5 rounded inline-block">
              Sem Fotos/Vídeos
            </div>
          </div>

          {/* Card 4: Revendedor Aprovado */}
          <div className="bg-[#1a1a1a]/80 border border-emerald-500/10 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden hover:border-emerald-500/25 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-white">4. Revendedor Aprovado</h3>
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Parceiro com documentação validada. Desbloqueia downloads imediatos de mídias, atendimento VIP da assistente Lia AI, selos nos menus e descontos extras progressivos na sacola.
            </p>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/5 py-1 px-2.5 rounded inline-block">
              Acesso Total Liberado
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: SAAS PREMIUM COMPARATIVE TABLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Tabela Comparativa Premium</span>
          <h2 className="text-3xl font-serif font-bold text-white">Diferença de Benefícios e Regras</h2>
          <p className="text-white/60 font-light text-sm">
            Compare visualmente as dinâmicas de cada perfil de cliente. As faixas de descontos progressivos mostradas abaixo são atualizadas automaticamente conforme configurado em nosso painel Admin.
          </p>
        </div>

        {/* Premium SaaS Table Container */}
        <div className="max-w-5xl mx-auto bg-[#1a1a1a] border border-[#b0874e]/20 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-black/30">
                  <th className="p-6 text-xs uppercase tracking-wider font-bold text-white/40">Recursos & Benefícios</th>
                  <th className="p-6 text-xs uppercase tracking-wider font-bold text-white/70 text-center">Cliente Varejo (Logado/Deslogado)</th>
                  <th className="p-6 text-xs uppercase tracking-wider font-bold text-amber-500 text-center">Revendedor Incompleto (Bronze)</th>
                  <th className="p-6 text-xs uppercase tracking-wider font-bold text-[#C59B5F] text-center">Revendedor Aprovado (Silver/Gold)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                
                {/* Row 1: Preço de Fábrica */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white/80">Preços de Atacado Direto de Fábrica</td>
                  <td className="p-6 text-center text-red-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-950/20">✕</span>
                  </td>
                  <td className="p-6 text-center text-emerald-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/20">✓</span>
                  </td>
                  <td className="p-6 text-center text-emerald-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/20">✓</span>
                  </td>
                </tr>

                {/* Row 2: Acesso ao Portal */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white/80">Acesso ao Portal de Revendedora</td>
                  <td className="p-6 text-center text-red-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-950/20">✕</span>
                  </td>
                  <td className="p-6 text-center text-amber-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-950/20">⚠️</span>
                  </td>
                  <td className="p-6 text-center text-emerald-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/20">✓</span>
                  </td>
                </tr>

                {/* Row 3: Acesso às Mídias */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white/80">Download de Fotos & Reels (Sem marca d'água)</td>
                  <td className="p-6 text-center text-red-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-950/20">✕</span>
                  </td>
                  <td className="p-6 text-center text-red-500">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-950/20">✕</span>
                  </td>
                  <td className="p-6 text-center text-emerald-400">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/20">✓</span>
                  </td>
                </tr>

                {/* Row 4: Descontos Progressivos */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white/80">Faixa de Descontos Progressivos</td>
                  <td className="p-6 text-center text-white/70">Até {getRetailMaxDiscount()}</td>
                  <td className="p-6 text-center text-white/70">Até {getResellerMaxDiscount()}</td>
                  <td className="p-6 text-center text-[#C59B5F] font-bold">Até {getResellerMaxDiscount()} + 2% ou 5% Extra VIP</td>
                </tr>

                {/* Row 5: Benefícios Exclusivos */}
                <tr className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-medium text-white/80">Benefícios Exclusivos</td>
                  <td className="p-6 text-center text-white/30">—</td>
                  <td className="p-6 text-center text-white/60">Precificadora Digital</td>
                  <td className="p-6 text-center text-emerald-400 font-bold">Assistente Lia AI, Selos e Brindes</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 4: ESCADA DE PRESTÍGIO */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Evolução do Seu Negócio</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            A Escada de Prestígio Avante
          </h2>
          <p className="text-white/60 font-light text-sm">
            Suba na nossa hierarquia e desbloqueie margens e benefícios exclusivos em cada nível. Garantimos total consistência visual com os ícones do cabeçalho da loja.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card Bronze */}
          <div className="bg-[#1a1a1a] border border-[#b0874e]/30 rounded-2xl p-8 text-left space-y-6 shadow-2xl hover:border-[#C59B5F] transition-all duration-300 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-700/10 rounded-full flex items-center justify-center text-amber-500">
                <Award className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center justify-between">
                Bronze Partner <span className="text-xs px-2 py-0.5 rounded bg-amber-950/40 text-amber-500 font-sans font-normal uppercase tracking-wider">Nível 1</span>
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Inicie suas vendas com o menor investimento inicial do mercado e aproveite conjuntos premium de alto apelo comercial.
              </p>
              <ul className="space-y-2.5 text-xs text-white/70 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Preço de atacado direto de Nova Friburgo</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Margem recomendada acima de 40%</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Acesso ao Portal de Membros (sem mídias)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Precificadora rápida no WhatsApp</li>
              </ul>
            </div>
            <div className="pt-6">
              <span className="text-xxs uppercase tracking-wider text-white/40 font-bold block mb-1">Requisito</span>
              <p className="text-sm font-bold text-[#C59B5F]">Pré-cadastro de revenda</p>
            </div>
          </div>

          {/* Card Silver Verified */}
          <div className="bg-[#1a1a1a] border border-[#C59B5F] rounded-2xl p-8 text-left space-y-6 shadow-2xl hover:scale-[1.02] transition-all duration-300 relative flex flex-col justify-between">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#C59B5F] text-black font-extrabold text-[9px] uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
              Mais Recomendado
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gray-500/10 rounded-full flex items-center justify-center text-gray-300">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white flex items-center justify-between">
                Silver Verified <span className="text-xs px-2 py-0.5 rounded bg-gray-950/40 text-gray-300 font-sans font-normal uppercase tracking-wider">Nível 2</span>
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Para parceiras formalizadas (MEI/CNPJ) ou com cadastro verificado que desejam prioridade de suporte e downloads.
              </p>
              <ul className="space-y-2.5 text-xs text-white/70 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Todos os benefícios do Bronze</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> **+2% de Desconto Extra Fixo** na sacola</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Selo "Verified" Prateado no Perfil</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Atendimento prioritário no WhatsApp</li>
              </ul>
            </div>
            <div className="pt-6">
              <span className="text-xxs uppercase tracking-wider text-white/40 font-bold block mb-1">Requisito</span>
              <p className="text-sm font-bold text-[#C59B5F]">Completar cadastro comercial</p>
            </div>
          </div>

          {/* Card Gold Elite (Glow borders) */}
          <div className="bg-[#1a1a1a] border-2 border-[#C59B5F] rounded-2xl p-8 text-left space-y-6 shadow-[0_0_25px_rgba(197,155,95,0.25)] hover:shadow-[0_0_35px_rgba(197,155,95,0.4)] transition-all duration-300 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#C59B5F]/20 rounded-full flex items-center justify-center text-[#C59B5F]">
                <Crown className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#C59B5F] flex items-center justify-between">
                Gold Elite <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-[#C59B5F] font-sans font-normal uppercase tracking-wider">Elite</span>
              </h3>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                Elite do ateliê. Acesso total e irrestrito ao acervo de fotos, suporte automatizado da Lia AI e tráfego pago compartilhado.
              </p>
              <ul className="space-y-2.5 text-xs text-white/75 pt-4 border-t border-white/5">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Todos os benefícios do Silver</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> **+5% de Desconto Extra Fixo** na sacola</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Download livre de mídias no Portal</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Selo "Gold Elite" no cabeçalho</li>
              </ul>
            </div>
            <div className="pt-6">
              <span className="text-xxs uppercase tracking-wider text-white/40 font-bold block mb-1">Requisito</span>
              <p className="text-sm font-bold text-[#C59B5F]">R$ 3.000 acumulados em compras</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: THE PRIVATE PORTAL TEASER (Cream BG #fff8f5) */}
      <section className="py-20 bg-[#fff8f5] border-y border-[#b0874e]/20 text-[#2C1E1A] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#C59B5F]/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[#b0874e] text-xs font-bold uppercase tracking-wider">Apoio Tecnológico Inédito</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight text-[#2C1E1A]">
              Um "App" Privado para turbinar suas vendas e faturar mais
            </h2>
            <p className="text-[#5C4D4A] font-light text-base leading-relaxed">
              Diferente de qualquer confecção comum, as parceiras comerciais da Avante Lingerie ganham acesso gratuito a um <strong>Portal de Membros</strong> fechado, equipado com ferramentas de automação que poupam seu tempo e aumentam sua conversão de vendas diárias.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#C59B5F] shrink-0 shadow-md">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1E1A]">Central de Mídias 100% Livre</h4>
                  <p className="text-xs text-[#5C4D4A] mt-1">Baixe pacotes compactados de fotos e Reels profissionais de alta definição in 1 clique.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#C59B5F] shrink-0 shadow-md">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1E1A]">Precificadora Inteligente</h4>
                  <p className="text-xs text-[#5C4D4A] mt-1">Coloque o preço pago, configure desconto do Pix/parcelas e copie a oferta formatada.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#C59B5F] shrink-0 shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1E1A]">Kits Iniciais Inteligentes</h4>
                  <p className="text-xs text-[#5C4D4A] mt-1">Sugerimos o seu lote ideal com base nas cores e tamanhos mais vendidos do e-commerce na semana.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#C59B5F] shrink-0 shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#2C1E1A]">Sua Franquia Digital</h4>
                  <p className="text-xs text-[#5C4D4A] mt-1">Gere o catálogo oficial em PDF contendo seus próprios dados e telefone no cabeçalho em 5 segundos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Portal Preview Mockup */}
          <div className="lg:col-span-5 relative flex justify-center z-10">
            <div className="bg-[#1a1a1a] border border-[#b0874e]/30 rounded-3xl p-6 w-full max-w-[380px] shadow-2xl relative text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-[#C59B5F]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-white">Central B2B</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase">Sessão Gold</span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Ferramenta Rápida</p>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <h5 className="font-bold text-xs text-white">Precificadora de WhatsApp</h5>

                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-[11px] text-white/60">
                        <span>Custo Pago: R$ 25,00</span>
                        <span>Margem: 120%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-[#C59B5F]" />
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 flex justify-between items-center border border-white/5">
                        <span className="text-[10px] text-white/40">WhatsApp Copy</span>
                        <Copy className="w-3.5 h-3.5 text-[#C59B5F] cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Material Recente</p>
                  <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white/80 font-bold">Fotos Satin Gold 2026.zip</span>
                    </div>
                    <span className="text-[10px] text-white/40">45 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 7: RESELLER SIGN-UP FORM */}
      <section id="cadastro" className="py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Garanta sua Oportunidade</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Inscreva-se como Revendedora Avante
            </h2>
            <p className="text-white/60 font-light text-sm">
              Preencha o formulário abaixo para abrir imediatamente sua conta de cliente Bronze e ter acesso aos preços de atacado.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-[#1a1a1a] border border-[#b0874e]/30 p-8 md:p-10 rounded-3xl shadow-2xl relative">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">Parabéns! Cadastro de revendedora criado!</h3>
                <p className="text-white/70 text-sm font-light leading-relaxed max-w-sm mx-auto">
                  Sua conta de nível Bronze foi ativada. Você já está logada e visualiza preços de atacado!
                  Para fazer download das fotos e vídeos, acesse o Portal de Revenda e envie os dados comerciais na seção Minha Conta. Seja muito bem-vinda!
                </p>
                <button
                  onClick={() => navigate('/portal-revenda')}
                  className="px-8 py-3 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors"
                >
                  Acessar Painel do Portal
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3.5 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none transition-colors bg-[#262626] text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">WhatsApp / Celular comercial</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="(00) 90000-0000"
                    className="w-full px-4 py-3.5 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none transition-colors bg-[#262626] text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">Seu E-mail principal</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@gmail.com"
                    className="w-full px-4 py-3.5 border border-white/10 focus:border-[#C59B5F] rounded-xl outline-none transition-colors bg-[#262626] text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Criando conta de revenda...' : 'Enviar Cadastro de Revendedora'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-xxs text-white/40 text-center leading-normal">
                  Ao criar sua conta de revendedora Bronze, você declara que está de acordo com as diretrizes de LGPD e políticas comerciais da Avante Lingerie. Sua senha de acesso inicial será o número de WhatsApp preenchido acima (apenas números).
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQ ACCORDION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4">
          <span className="text-[#C59B5F] text-xs font-bold uppercase tracking-wider">Perguntas Frequentes</span>
          <h2 className="text-3xl font-serif font-bold text-white">Tire Suas Dúvidas Rápidas</h2>
        </div>

        <div className="space-y-4 text-left">
          {faqData.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-[#b0874e]/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-white gap-4"
                >
                  <span className="flex items-center gap-3"><HelpCircle className="w-4 h-4 text-[#C59B5F] shrink-0" /> {item.q}</span>
                  <span className={`text-xs text-[#C59B5F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-white/5"
                    >
                      <div className="px-6 py-5 text-white/70 text-xs font-light leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL A: VAREJO (RETAIL / GUEST) EXPLANATION & LOGIN */}
      <AnimatePresence>
        {showVarejoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-[#C59B5F]/30 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative text-left text-white"
            >
              <button
                onClick={() => setShowVarejoModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {!isLoginMode ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C59B5F]/15 rounded-xl flex items-center justify-center text-[#C59B5F]">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-white">Como Funciona a Revenda Avante</h3>
                      <span className="text-[9px] uppercase tracking-wider text-white/50">Requisitos e Regras do Atacado</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Para comprar lingeries premium com preços exclusivos de atacado (tabela de custo com até 40% de desconto) e ter acesso ao Portal de Revenda, é necessário seguir estas diretrizes:
                  </p>

                  <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5 text-xs">
                    <div className="flex gap-2">
                      <span className="text-[#C59B5F] font-bold">•</span>
                      <p className="text-white/80"><strong className="text-white">Pedido Mínimo Inicial:</strong> R$ {limiteUpgrade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no carrinho, já calculando o desconto de atacado.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#C59B5F] font-bold">•</span>
                      <p className="text-white/80"><strong className="text-white">Cadastro de Revendedora:</strong> Criação de conta Bronze gratuita para liberar a visualização de preços de atacado na loja.</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[#C59B5F] font-bold">•</span>
                      <p className="text-white/80"><strong className="text-white">Nível Silver (Mídias):</strong> Completando o cadastro com documentos (CNPJ, MEI ou CPF) em Minha Conta, libera downloads imediatos de fotos e Reels profissionais.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      onClick={() => {
                        setShowVarejoModal(false);
                        const el = document.getElementById('cadastro');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="py-3 px-4 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl text-center shadow transition-colors"
                    >
                      Formulário de Cadastro
                    </button>
                    <button
                      onClick={() => setIsLoginMode(true)}
                      className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors"
                    >
                      Já tenho conta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleModalLogin} className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C59B5F]/15 rounded-xl flex items-center justify-center text-[#C59B5F]">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-white">Login de Revendedora</h3>
                      <span className="text-[9px] uppercase tracking-wider text-[#C59B5F] font-bold">Acesso ao Portal Avante</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">E-mail</label>
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
                        className="w-full text-sm h-11 px-4 border border-white/10 rounded-xl focus:border-[#C59B5F] focus:outline-none transition-colors bg-[#262626] text-white"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Senha</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="Sua senha ou WhatsApp"
                          className="w-full text-sm h-11 pl-4 pr-12 border border-white/10 rounded-xl focus:border-[#C59B5F] focus:outline-none transition-colors bg-[#262626] text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="w-4.5 h-4.5 animate-spin" /> Acessando Portal...
                      </>
                    ) : (
                      <>
                        Entrar no Portal <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsLoginMode(false)}
                      className="text-xs text-white/50 hover:text-white hover:underline transition-colors"
                    >
                      ← Voltar para a Explicação
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL B: INCOMPLETO (RESELLER WITHOUT DOCUMENTS) */}
      <AnimatePresence>
        {showIncompletoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-amber-500/30 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative text-left text-white space-y-6"
            >
              <button
                onClick={() => setShowIncompletoModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-white">Fotos e Reels Bloqueados</h3>
                  <span className="text-[9px] uppercase tracking-wider text-amber-500 font-bold">Documentação Pendente</span>
                </div>
              </div>

              <p className="text-xs text-white/70 font-light leading-relaxed">
                Você já possui acesso ao **Portal de Revendedora** (dashboard de pedidos, tabelas de atacado e precificadora), porém o download de criativos, fotos profissionais e vídeos Reels das modelos está restrito.
              </p>

              <div className="bg-amber-950/20 border border-amber-500/20 p-4 rounded-xl text-xs text-white/80 space-y-2">
                <p>💡 <strong className="text-amber-400">Liberação Automática e Imediata:</strong></p>
                <p>Basta preencher seus dados comerciais completos (MEI, CNPJ ou CPF) em Minha Conta. Ao salvar, as mídias são desbloqueadas na hora no seu painel!</p>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowIncompletoModal(false);
                    navigate('/minha-conta', { state: { tab: 'dados' } });
                  }}
                  className="w-full py-3.5 bg-[#C59B5F] hover:bg-[#b0874e] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl text-center shadow transition-colors"
                >
                  Completar Cadastro Comercial Agora
                </button>
                <button
                  onClick={() => {
                    setShowIncompletoModal(false);
                    navigate('/portal-revenda');
                  }}
                  className="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl text-center transition-colors"
                >
                  Ir para o Portal Sem Mídias
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}