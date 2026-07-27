import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  RefreshCw, 
  Truck, 
  HeartHandshake, 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  Lock, 
  CreditCard,
  Shield,
  CheckCircle,
  Award,
  Crown
} from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResellerModalOpen, setIsResellerModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser } = useAuth();

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';

  const handleNossasLojasClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('nossas-lojas');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      const el = document.getElementById('nossas-lojas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleResellerPortalClick = (e) => {
    e.preventDefault();
    if (isAuthenticated && isReseller) {
      navigate('/portal-revenda');
    } else {
      setIsResellerModalOpen(true);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }
    
    setIsLoading(true);
    try {
      await pb.collection('newsletter_signups').create({ email }, { $autoCancel: false });
      toast.success('Inscrição realizada com sucesso! Bem-vinda à nossa lista VIP.');
      setEmail('');
    } catch (error) {
      console.error('Erro ao assinar newsletter:', error);
      toast.error('Não foi possível realizar a inscrição. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ==========================================
          TRUST BAR (POR QUE ESCOLHER A AVANTE)
          ========================================== */}
      <div className="bg-[#FFF8F5] border-t border-[#c59b5f]/20 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
            Compromisso e Elegância
          </span>
          <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-gray-900 mt-2 mb-12">
            Por que escolher a Avante?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-[#c59b5f]/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#c59b5f] group-hover:scale-105 shadow-sm">
                <ShieldCheck className="w-7 h-7 text-[#c59b5f] group-hover:text-black transition-colors" />
              </div>
              <span className="text-base font-bold font-serif text-gray-900 mb-2">Compra 100% Segura</span>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
                Seus dados pessoais e de pagamento estão totalmente criptografados e protegidos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-[#c59b5f]/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#c59b5f] group-hover:scale-105 shadow-sm">
                <RefreshCw className="w-7 h-7 text-[#c59b5f] group-hover:text-black transition-colors" />
              </div>
              <span className="text-base font-bold font-serif text-gray-900 mb-2">Troca Facilitada</span>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
                A primeira troca de suas lingeries é grátis em até 7 dias após o recebimento.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-[#c59b5f]/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#c59b5f] group-hover:scale-105 shadow-sm">
                <Truck className="w-7 h-7 text-[#c59b5f] group-hover:text-black transition-colors" />
              </div>
              <span className="text-base font-bold font-serif text-gray-900 mb-2">Entrega Rápida</span>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
                Parceria com as melhores transportadoras do país para entrega ágil e rastreada.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border border-[#c59b5f]/30 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#c59b5f] group-hover:scale-105 shadow-sm">
                <HeartHandshake className="w-7 h-7 text-[#c59b5f] group-hover:text-black transition-colors" />
              </div>
              <span className="text-base font-bold font-serif text-gray-900 mb-2">Atendimento Humanizado</span>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
                Nossa equipe premium de consultoras de estilo pronta para tirar dúvidas via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN LUXURY FOOTER
          ========================================== */}
      <footer className="bg-[#121212] text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t-2 border-[#c59b5f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-12 border-b border-[#c59b5f]/20">
          
          {/* Coluna 1: Marca & Redes */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/2cc53c4f87239617896d951f98b0a124.png"
                alt="Avante Lingerie"
                className="h-14 w-auto object-contain brightness-100"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Delicadeza, conforto e sensualidade em cada detalhe. Peças exclusivas e atemporais desenvolvidas com o mais alto padrão de qualidade para valorizar a beleza feminina.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/avante.lingerie/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] hover:bg-[#c59b5f] hover:text-black transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61589229361324&locale=pt_BR" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] hover:bg-[#c59b5f] hover:text-black transition-all shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5522997618591" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] hover:bg-[#c59b5f] hover:text-black transition-all shadow-sm"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Central da Cliente */}
          <div className="space-y-4">
            <h4 className="text-[#c59b5f] font-serif font-bold text-lg tracking-wider">Central da Cliente</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              {/* Correct Fix: Point Minha Conta link to /account to avoid guest lockouts */}
              <li><Link to="/account" className="hover:text-[#c59b5f] transition-colors">Minha Conta</Link></li>
              <li><Link to="/pedidos" className="hover:text-[#c59b5f] transition-colors">Meus Pedidos</Link></li>
              <li><Link to="/rastreio" className="hover:text-[#c59b5f] transition-colors">Rastrear Pedido</Link></li>
              <li><Link to="/central-da-cliente#trocas-e-devolucoes" className="hover:text-[#c59b5f] transition-colors">Trocas e Devoluções</Link></li>
              <li><Link to="/faq" className="hover:text-[#c59b5f] transition-colors">Dúvidas Frequentes</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Institucional */}
          <div className="space-y-4">
            <h4 className="text-[#c59b5f] font-serif font-bold text-lg tracking-wider">Institucional</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/sobre" className="hover:text-[#c59b5f] transition-colors">Sobre a Avante</Link></li>
              <li><a href="/#nossas-lojas" onClick={handleNossasLojasClick} className="hover:text-[#c59b5f] transition-colors">Nossas Lojas</a></li>
              
              {/* Menu Revendedora Cadastrada (Chamativo e Brilhoso) */}
              <li>
                <button 
                  onClick={handleResellerPortalClick} 
                  className="relative text-left font-bold text-[#c59b5f] hover:text-white transition-all duration-300 group flex items-center gap-1.5 overflow-hidden rounded py-0.5"
                  style={{
                    textShadow: '0 0 8px rgba(197, 155, 95, 0.4)'
                  }}
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b5f] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d9a520]"></span>
                  </span>
                  <span className="bg-gradient-to-r from-[#ffd700] via-[#c59b5f] to-[#ffb700] bg-clip-text text-transparent group-hover:from-white group-hover:to-white font-extrabold tracking-wide drop-shadow-[0_0_2px_rgba(197,155,95,0.2)] animate-pulse">
                    Revendedora Cadastrada 👑
                  </span>
                </button>
              </li>

              <li><Link to="/quero-revender" className="hover:text-[#c59b5f] transition-colors">Quero ser Revendedora</Link></li>
              <li><Link to="/central-da-cliente#politica-de-privacidade" className="hover:text-[#c59b5f] transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/central-da-cliente#termos-de-uso" className="hover:text-[#c59b5f] transition-colors">Termos de Serviço</Link></li>
              <li><Link to="/central-da-cliente#fale-conosco" className="hover:text-[#c59b5f] transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Confiança e Segurança Premium */}
          <div className="space-y-5">
            <h4 className="text-[#c59b5f] font-serif font-bold text-lg tracking-wider">Segurança & Selos</h4>
            <div className="grid grid-cols-1 gap-4">
              
              {/* Ebit Ouro */}
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 hover:border-[#c59b5f]/30 rounded-2xl p-3 shadow-premium transition-all duration-300 group/selo">
                <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_8px_rgba(197,155,95,0.25)] group-hover/selo:scale-105 transition-transform duration-300" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#1b2a47" stroke="#c59b5f" strokeWidth="2" />
                  <circle cx="20" cy="20" r="15" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3,3" />
                  <path d="M16 14 L18 16 L20 13 L22 16 L24 14 L23 18 L17 18 Z" fill="#d4af37" />
                  <text x="20" y="23" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ebit</text>
                  <text x="20" y="29" fill="#d4af37" fontSize="5" fontWeight="black" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">OURO</text>
                </svg>
                <div className="text-xs">
                  <p className="font-bold text-gray-200">Selo Ebit</p>
                  <p className="text-[#c59b5f] font-semibold text-[10px] uppercase tracking-wider">Ouro</p>
                </div>
              </div>

              {/* Google Safe Browsing */}
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 hover:border-green-500/20 rounded-2xl p-3 shadow-premium transition-all duration-300 group/selo">
                <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_8px_rgba(61,139,69,0.2)] group-hover/selo:scale-105 transition-transform duration-300" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20 C9 12, 13 10, 13 10 M31 20 C31 12, 27 10, 27 10" stroke="#3d8b45" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 20 C9 28, 15 31, 20 32 M31 20 C31 28, 25 31, 20 32" stroke="#3d8b45" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="14" r="1.5" fill="#3d8b45" />
                  <circle cx="8" cy="19" r="1.5" fill="#3d8b45" />
                  <circle cx="10" cy="24" r="1.5" fill="#3d8b45" />
                  <circle cx="12" cy="28" r="1.5" fill="#3d8b45" />
                  <circle cx="30" cy="14" r="1.5" fill="#3d8b45" />
                  <circle cx="32" cy="19" r="1.5" fill="#3d8b45" />
                  <circle cx="30" cy="24" r="1.5" fill="#3d8b45" />
                  <circle cx="28" cy="28" r="1.5" fill="#3d8b45" />
                  <path d="M20 12 L14 14 V20 C14 24.5 20 28 20 28 C20 28 26 24.5 26 20 V14 L20 12 Z" fill="#2d6e35" stroke="#3d8b45" strokeWidth="1.5" />
                  <path d="M17 20 L19 22 L23 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-xs">
                  <p className="font-bold text-gray-200">Safe Browsing</p>
                  <p className="text-green-500 font-semibold text-[10px] uppercase tracking-wider">Google</p>
                </div>
              </div>

              {/* Certificado SSL */}
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 hover:border-[#c59b5f]/30 rounded-2xl p-3 shadow-premium transition-all duration-300 group/selo">
                <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_8px_rgba(197,155,95,0.25)] group-hover/selo:scale-105 transition-transform duration-300" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" fill="#121212" stroke="#c59b5f" strokeWidth="2" />
                  <circle cx="20" cy="20" r="15" fill="none" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,2" />
                  <circle cx="20" cy="20" r="13" fill="#1c1c1c" />
                  <rect x="15" y="20" width="10" height="8" rx="1" fill="#c59b5f" />
                  <path d="M17 20 V17 C17 15.3 18.3 14 20 14 C21.7 14 23 15.3 23 17 V20" stroke="#c59b5f" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="20" cy="23.5" r="1" fill="#000000" />
                  <line x1="20" y1="24.5" x2="20" y2="26.5" stroke="#000000" strokeWidth="1" />
                </svg>
                <div className="text-xs">
                  <p className="font-bold text-gray-200">Certificado</p>
                  <p className="text-[#c59b5f] font-semibold text-[10px] uppercase tracking-wider">SSL</p>
                </div>
              </div>

              {/* Compra Protegida */}
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/5 hover:border-[#c59b5f]/30 rounded-2xl p-3 shadow-premium transition-all duration-300 group/selo">
                <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_8px_rgba(197,155,95,0.25)] group-hover/selo:scale-105 transition-transform duration-300" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="17" fill="#121212" stroke="#c59b5f" strokeWidth="2" />
                  <circle cx="20" cy="20" r="14" fill="none" stroke="#d4af37" strokeWidth="0.8" />
                  <path d="M20 13 L15 15 V20 C15 23.5 20 26 20 26 C20 26 25 23.5 25 20 V15 L20 13 Z" fill="none" stroke="#c59b5f" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M18 20 L19.5 21.5 L22 19" stroke="#c59b5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-xs">
                  <p className="font-bold text-gray-200">Compra</p>
                  <p className="text-[#c59b5f] font-semibold text-[10px] uppercase tracking-wider">Protegida</p>
                </div>
              </div>

            </div>
          </div>

          {/* Coluna 5: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[#c59b5f] font-serif font-bold text-lg tracking-wider">Lista VIP Avante</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Receba novidades exclusivas e 10% de desconto na sua primeira compra de luxo.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full bg-white/5 border border-[#c59b5f]/30 focus:border-[#c59b5f] outline-none text-white text-sm py-2.5 px-4 rounded-xl placeholder-gray-500 transition-colors"
                required
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#c59b5f] hover:bg-white text-black font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Entrar na Lista VIP
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Fim da seção principal do footer */}
      </footer>
      
      {/* Sub-Footer com fundo preto absoluto */}
      <div className="bg-[#050505] border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8 text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          
          {/* Dados da Empresa (Mais nítidos e legíveis) */}
          <div className="text-center lg:text-left space-y-2 max-w-xl">
            <p className="text-xs text-gray-400 font-medium">
              &copy; {new Date().getFullYear()} Avante Lingerie. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-gray-300 font-medium leading-relaxed">
              AVANTE INDUSTRIA E COMERCIO DE VESTUARIO LTDA | CNPJ: 12.345.678/0001-90<br />
              Ateliê & Showroom: Rua Folly, 69, Olaria, Nova Friburgo — RJ | CEP: 28620-190
            </p>
          </div>

          {/* Stripe & Payment Brands (Premium) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            {/* Stripe Info */}
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 rounded-xl px-3.5 py-2">
              <svg className="w-12 h-6 text-white" viewBox="54 36 360 150" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z" />
                <path d="M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z" />
                <polygon points="223.8,61.7 248.9,56.3 248.9,36 223.8,41.3" />
                <rect x="223.8" y="69.3" width="25.1" height="87.5" />
                <path d="M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z" />
                <path d="M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z" />
                <path d="M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z" />
              </svg>
              <div className="text-[10px] text-gray-400 font-light flex flex-col leading-tight">
                <span className="text-white font-bold">Processamento via Stripe</span>
                <span>Pagamentos Criptografados</span>
              </div>
            </div>
            
            {/* Payment Brands Grid */}
            <div className="flex items-center gap-2">
              {/* Visa */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="Visa">
                <svg className="w-8 h-4 text-white" viewBox="0 0 48 16" fill="currentColor">
                  <path d="M19.1 16h3L24 2.8H21l-1.9 9.3L18 3.7c-.3-1.4-1.2-2.5-2.7-3L10.1 16h3.1l6.1-13.2L19.1 16zM9.5 5.3C9.3 4 8 2.8 6.4 2.8c-1.6 0-2.8 1.1-2.8 2.5 0 2.2 3.1 2.5 3.1 4.3 0 1-.9 1.7-2.2 1.7-1.5 0-2.6-.6-3.3-1.1L.6 12.3c.9.8 2.4 1.4 4.2 1.4 3.8 0 5.9-2.1 5.9-4.5 0-3.3-4.5-3.6-4.5-5 0-.8.8-1.4 1.8-1.4.9 0 1.6.4 2 1L9.5 5.3zM35.6.8h-2.5c-.8 0-1.5.5-1.8 1.2l-5.3 14h3.1l1.1-3.1h3.8l.3 3.1h2.7L35.6.8zm-3.8 8.8l1.6-4.9 1 4.9h-2.6zM46.7.8c-.8 0-1.5.5-1.8 1.2l-5.3 14h3.1l1.1-3.1h3.8l.3 3.1h2.7L46.7.8z" />
                </svg>
              </div>
              {/* Mastercard */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="Mastercard">
                <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none">
                  <circle cx="7" cy="8" r="7" fill="#EB001B" />
                  <circle cx="17" cy="8" r="7" fill="#F79E1B" />
                  <path d="M12 1.4a6.95 6.95 0 0 1 2 6.6 6.95 6.95 0 0 1-2 6.6 6.95 6.95 0 0 1-2-6.6 6.95 6.95 0 0 1 2-6.6" fill="#FF5F00" />
                </svg>
              </div>
              {/* Elo */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="Elo">
                <span className="text-[9px] font-black italic tracking-tighter text-[#c59b5f]">elo</span>
              </div>
              {/* Amex */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="American Express">
                <span className="text-[9px] font-bold tracking-tighter text-[#c59b5f]">AMEX</span>
              </div>
              {/* Boleto */}
              <div className="bg-white/5 border border-white/10 rounded-lg px-2 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="Boleto Bancário">
                <span className="text-[8px] font-extrabold tracking-wide text-gray-400 uppercase leading-none">Boleto</span>
              </div>
              {/* PIX */}
              <div className="bg-white/5 border border-white/10 rounded-lg px-2 flex items-center justify-center h-10 w-12 hover:border-[#c59b5f]/30 transition-colors" title="PIX">
                <span className="text-[9px] font-black tracking-widest text-emerald-500 uppercase leading-none">PIX</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal Premium de Restrição de Revendedora */}
      <AnimatePresence>
        {isResellerModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResellerModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0d0d0d] border-2 border-[#c59b5f] rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(197,155,95,0.25)] z-10 overflow-hidden"
            >
              {/* Subtle gold glow background */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full bg-[#121212] border-2 border-[#c59b5f] flex items-center justify-center mx-auto mb-6 text-[#c59b5f] shadow-[0_0_20px_rgba(197,155,95,0.15)]">
                <Crown className="w-8 h-8 animate-bounce" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-wide">
                Área Restrita Premium
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                O <strong className="text-[#c59b5f] font-semibold">Portal de Revenda</strong> é reservado exclusivamente para nossas Revendedoras Parceiras homologadas.
              </p>
              
              <div className="bg-[#121212] border border-[#c59b5f]/25 rounded-2xl p-4 mb-8 text-xs text-gray-400 font-light leading-relaxed">
                Se você já possui o cadastro aprovado, por favor clique no botão de login abaixo para entrar. Caso queira se tornar uma parceira e faturar alto com lingeries de luxo, conheça nosso programa clicando no menu logo abaixo.
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setIsResellerModalOpen(false);
                    navigate('/login');
                  }}
                  className="w-full bg-[#c59b5f] hover:bg-white text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  Fazer Login como Revendedora
                </button>
                <button 
                  onClick={() => {
                    setIsResellerModalOpen(false);
                    navigate('/quero-revender');
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer border border-[#c59b5f]/30"
                >
                  Quero ser Revendedora ⚜️
                </button>
                <button 
                  onClick={() => setIsResellerModalOpen(false)}
                  className="mt-3 text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}