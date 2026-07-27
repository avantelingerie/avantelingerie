import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogOut, ChevronDown, Crown, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';
import SearchModal from '@/components/SearchModal.jsx';
import pb from '@/lib/pocketbaseClient.js';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, getCartTotal } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isConfirmationPage = location.pathname.includes('/order-confirmation');
  const isLightHeaderPage = location.pathname.startsWith('/produto');
  const useDarkText = !isScrolled && isLightHeaderPage;

  // Lista padrão para garantir que o menu nunca fique vazio caso o banco demore para responder
  const [categorias, setCategorias] = useState([
    { name: 'Conjuntos', path: '/categoria/conjuntos' },
    { name: 'Bodies', path: '/categoria/bodies' },
    { name: 'Calcinhas', path: '/categoria/calcinhas' },
    { name: 'Sutiãs', path: '/categoria/sutias' }
  ]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Carrega as categorias ativas do banco de dados em tempo real
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const records = await pb.collection('categorias').getFullList({
          filter: 'ativo = true',
          sort: 'nome',
          $autoCancel: false
        });
        if (records.length > 0) {
          setCategorias(records.map(rec => ({
            name: rec.nome,
            path: `/categoria/${rec.slug}`
          })));
        }
      } catch (err) {
        console.error('Erro ao buscar categorias para o Header:', err);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 60);

      // Controle visual do cabeçalho ao rolar a página
      const headerEl = document.querySelector('header') ||
        document.querySelector('.navbar') ||
        document.querySelector('.site-header') ||
        document.querySelector('nav') ||
        document.querySelector('[class*="header"]') ||
        document.querySelector('.global-header');

      if (headerEl) {
        if (currentScrollY > 60) {
          headerEl.classList.add('scrolled');
        } else {
          headerEl.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Links de navegação usando as categorias dinâmicas
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Mais Vendidos', path: '/#mais-vendidos' },
    {
      name: 'Categorias',
      path: '/categoria/todas',
      submenus: categorias
    },
    { name: 'Contato', path: '/contato' },
    { name: 'Quero ser Revendedora', path: '/quero-revender' },
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      if (location.pathname !== (route || '/')) {
        navigate(route || '/');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso.');
    navigate('/');
  };

  // Helper para extrair a identificação do usuário sem expor roles cruas
  const getDisplayName = (user) => {
    if (!user) return 'Membro';

    // 1. Nome do cliente (prioridade máxima)
    if (user.name && user.name.trim() !== '') {
      return user.name.trim().split(' ')[0];
    }
    if (user.nome_completo && user.nome_completo.trim() !== '') {
      return user.nome_completo.trim().split(' ')[0];
    }

    // 2. E-mail do cliente (caso o nome não esteja disponível)
    if (user.email && user.email.trim() !== '') {
      return user.email;
    }

    return 'Membro';
  };

  const clientName = getDisplayName(currentUser);
  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';

  // Ícone dinâmico do perfil com base no nível da conta do cliente
  const renderProfileIcon = (sizeClasses = "w-5 h-5") => {
    if (!isAuthenticated || !currentUser) {
      return <User className={sizeClasses} />;
    }

    if (!isReseller) {
      return <User className={`${sizeClasses} text-[#c59b5f]`} />;
    }

    let level = currentUser.account_level || 'basic';
    const isGold = currentUser.account_level === 'gold' || currentUser.is_gold || (Number(currentUser.total_compras) >= 3000) || (Number(currentUser.faturamento_acumulado) >= 3000);
    const isSilver = currentUser.account_level === 'verified' || currentUser.is_verified || currentUser.cadastro_completo;
    if (isGold) {
      level = 'gold';
    } else if (isSilver) {
      level = 'verified';
    } else {
      level = 'basic';
    }

    switch (level) {
      case 'gold':
        return (
          <div className="relative flex items-center justify-center shrink-0">
            <Crown className={`${sizeClasses} text-[#c59b5f] drop-shadow-[0_0_8px_rgba(197,155,95,0.7)] animate-pulse`} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-black animate-ping" />
          </div>
        );
      case 'verified':
        return <Shield className={`${sizeClasses} text-gray-300 drop-shadow-[0_0_6px_rgba(200,200,200,0.5)]`} />;
      case 'basic':
      default:
        return <Award className={`${sizeClasses} text-[#CD7F32] drop-shadow-[0_0_6px_rgba(205,127,50,0.4)]`} />;
    }
  };

  if (isConfirmationPage) {
    return (
      <header className={`global-header fixed top-0 left-0 right-0 z-50 py-4 border-transparent ${isScrolled ? 'scrolled backdrop-blur-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-center">
          <Link to="/" className="transition-transform duration-300 hover:scale-105 inline-block relative group cursor-pointer">
            <img
              src="https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/2cc53c4f87239617896d951f98b0a124.png"
              alt="Avante Lingerie"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
            />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={`global-header fixed top-0 left-0 right-0 z-50 py-3 border-transparent ${isScrolled ? 'scrolled backdrop-blur-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          <button
            className={`lg:hidden p-2 -ml-2 transition-colors drop-shadow-md ${useDarkText ? 'text-[#121212] hover:text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link
            to="/"
            className="transition-transform duration-300 hover:scale-105 inline-block relative group cursor-pointer"
          >
            <img
              src="https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/2cc53c4f87239617896d951f98b0a124.png"
              alt="Avante Lingerie"
              className="h-14 md:h-16 lg:h-20 w-auto object-contain drop-shadow-lg"
            />
            <div className="absolute inset-0 bg-[#c59b5f]/25 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`flex items-center gap-1 text-sm font-bold transition-colors duration-300 drop-shadow-md uppercase tracking-wide cursor-pointer py-2 ${location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                    ? 'text-[#c59b5f]'
                    : useDarkText
                      ? 'text-[#121212] hover:text-[#c59b5f]'
                      : 'text-white hover:text-[#c59b5f]'
                    }`}
                >
                  {link.name}
                  {link.submenus && <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </a>

                {link.submenus && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-[#121212] backdrop-blur-md rounded-2xl shadow-xl border border-[#c59b5f]/20 py-2 min-w-[200px] flex flex-col overflow-hidden">
                      {link.submenus.map(sub => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="px-5 py-3 text-[11px] font-bold text-white/80 hover:bg-[#c59b5f]/10 hover:text-[#c59b5f] tracking-widest uppercase transition-all duration-300"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={`p-2 transition-colors hidden sm:block ${useDarkText ? 'text-[#121212] hover:text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
                }`}
            >
              <Search className="w-5 h-5 drop-shadow-md" />
            </button>

            <div className="hidden sm:flex items-center gap-2">
              {!isAuthenticated ? (
                <Link to="/login" className={`flex items-center gap-2 text-sm font-bold transition-colors uppercase tracking-wide cursor-pointer ${useDarkText ? 'text-[#121212] hover:text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
                  }`}>
                  <User className="w-5 h-5" />
                  <span>Entrar</span>
                </Link>
              ) : (
                <div className="flex items-center gap-4 animate-in fade-in duration-300">
                  <Link to="/account" className={`flex items-center gap-2.5 text-sm font-bold transition-all duration-300 uppercase tracking-wider hover:scale-[1.03] cursor-pointer ${useDarkText ? 'text-[#121212] hover:text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
                    }`}>
                    {renderProfileIcon()}
                    <span className="hidden md:inline font-sans font-bold flex items-center gap-1.5">
                      Olá, {clientName}
                      {isReseller && (
                        <span className="text-[7.5px] font-bold tracking-widest text-black bg-gradient-to-r from-[#c59b5f] to-[#e5c595] px-1.5 py-0.5 rounded border border-[#c59b5f]/15 leading-none">
                          PRO
                        </span>
                      )}
                    </span>
                  </Link>
                  <button onClick={handleLogout} className={`transition-colors cursor-pointer ${useDarkText ? 'text-[#121212]/60 hover:text-destructive' : 'text-white/60 hover:text-destructive'
                    }`} title="Sair">
                    <LogOut className="w-4.5 h-4.5" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/cart')}
              aria-label="Cart"
              className={`p-2 transition-colors relative group flex items-center gap-1.5 ${useDarkText ? 'text-[#121212] hover:text-[#c59b5f]' : 'text-white hover:text-[#c59b5f]'
                }`}
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 drop-shadow-md" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 border border-black text-[10px] font-bold text-white flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
                    {cartItemCount}
                  </span>
                )}
              </div>
              {cartItemCount > 0 && (
                <span className="text-[11px] font-bold font-mono tracking-wide hidden sm:inline-block ml-0.5">
                  R$ {getCartTotal().toFixed(2).replace('.', ',')}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Menu móvel expandido */}
        <div
          className={`fixed inset-0 top-[70px] md:top-[80px] bg-[#0d0d0d]/98 backdrop-blur-md border-t border-[#c59b5f]/20 z-40 lg:hidden transition-transform duration-300 ease-in-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 text-xl font-bold text-white hover:text-[#c59b5f] border-b border-white/10 pb-4 transition-colors"
            >
              <Search className="w-5 h-5" /> Buscar
            </button>

            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-white/10 pb-4">
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="text-xl font-bold text-white hover:text-[#c59b5f] transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
                {link.submenus && (
                  <div className="flex flex-col gap-3 mt-4 pl-4 border-l-2 border-[#c59b5f]/30">
                    {link.submenus.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-white/80 hover:text-[#c59b5f] transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 pt-4">
              {!isAuthenticated ? (
                <Button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="flex-1 justify-center gap-2 bg-transparent border border-[#c59b5f] text-[#c59b5f] hover:bg-[#c59b5f] hover:text-[#121212] transition-colors">
                  <User className="w-4 h-4" /> Entrar / Cadastro
                </Button>
              ) : (
                <div className="flex flex-col w-full gap-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-white/5 border border-white/10 rounded-2xl">
                    {renderProfileIcon("w-6 h-6")}
                    <span className="text-white font-bold text-sm tracking-wide">
                      Olá, {clientName}
                      {isReseller && (
                        <span className="text-[7.5px] font-bold tracking-widest text-black bg-gradient-to-r from-[#c59b5f] to-[#e5c595] px-1.5 py-0.5 rounded border border-[#c59b5f]/15 leading-none ml-1.5 inline-block">
                          PRO
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex w-full gap-2">
                    <Button onClick={() => { navigate('/account'); setMobileMenuOpen(false); }} className="flex-1 justify-center gap-2 bg-transparent border border-[#c59b5f] text-[#c59b5f] hover:bg-[#c59b5f] hover:text-[#121212] transition-colors">
                      Minha Conta
                    </Button>
                    <Button onClick={handleLogout} variant="outline" className="px-3 border-destructive/50 text-destructive hover:bg-destructive hover:text-white">
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}