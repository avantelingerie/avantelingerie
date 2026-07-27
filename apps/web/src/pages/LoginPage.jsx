import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, UserCircle2, Sparkles, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext.jsx';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function LoginPage() {
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Default tab based on query param if provided
  const queryParams = new URLSearchParams(location.search);
  const defaultTab = queryParams.get('tab') === 'signup' ? 'signup' : 'login';

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    tipo_cliente: 'varejo'
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/cart';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(loginData.email, loginData.password);
      toast.success('Login realizado com sucesso!');
      const from = location.state?.from?.pathname || '/cart';
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!signupData.name.trim()) {
      setError('O nome completo é obrigatório.');
      setIsLoading(false);
      return;
    }

    if (signupData.password !== signupData.passwordConfirm) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      await signup(signupData.email, signupData.password, signupData.name, signupData.tipo_cliente);
      toast.success('Conta criada com sucesso!');
      navigate('/cart', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.message || 'Ocorreu um erro ao criar a conta. Tente outro e-mail.');
    } finally {
      setIsLoading(false);
    }
  };

  const customStyles = `
    .login-page-container {
      --color-black: #121212;
      --color-black-light: #1a1a1a;
      --color-gold: #c59b5f;
      --color-gold-dark: #a98048;
      --color-gold-light: #d6b384;
      --color-gold-bg: #FCF9F5;
      --color-white: #ffffff;
      --color-gray-50: #FFFBF8;
      --color-gray-100: #F3F1ED;
      --color-gray-200: #EAE6DF;
      --color-gray-600: #555555;
      --color-gray-800: #222222;
      
      --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      --shadow-premium: 0 15px 35px rgba(197, 155, 95, 0.05), 0 5px 15px rgba(0, 0, 0, 0.02);
      --font-display: 'Playfair Display', serif;
      
      font-family: 'Inter', sans-serif;
      background-color: var(--color-gray-50);
      color: var(--color-gray-800);
      min-height: 100vh;
      padding-top: 80px; /* Evita que o header cubra o conteúdo */
    }

    @media (max-width: 1024px) {
      .login-page-container {
        padding-top: 70px;
      }
    }

    .login-page-container .left-banner {
      background-color: #0d0d0d;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
    }

    .login-page-container .left-banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(197, 155, 95, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 10;
    }

    .login-page-container .left-banner h1 {
      font-family: var(--font-display);
      font-size: 3.5rem;
      font-weight: 500;
      color: var(--color-white);
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    .login-page-container .left-banner h1 span {
      color: var(--color-gold);
      font-style: italic;
    }

    .login-page-container .left-banner p {
      font-size: 1.15rem;
      color: #EAE6DF;
      font-weight: 300;
      line-height: 1.7;
      letter-spacing: 0.02em;
    }

    .login-page-container .right-content {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
    }

    .login-page-container .tabs-list {
      background-color: var(--color-gray-100);
      border: 1px solid var(--color-gray-200);
      border-radius: 1rem;
      padding: 0.25rem;
      height: 3.25rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 2.25rem;
    }

    .login-page-container .tabs-trigger {
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--color-gray-600);
      transition: var(--transition-smooth);
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .login-page-container .tabs-trigger[data-state="active"] {
      background-color: var(--color-white);
      color: var(--color-gold-dark) !important;
      box-shadow: 0 4px 15px rgba(197, 155, 95, 0.08);
    }

    .login-page-container label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-black);
      letter-spacing: 0.02em;
      margin-bottom: 0.5rem;
      display: block;
    }

    .login-page-container input {
      width: 100%;
      height: 3.25rem;
      padding: 0 1.25rem;
      border-radius: 0.75rem;
      border: 1px solid var(--color-gray-200);
      background-color: var(--color-white);
      color: var(--color-gray-800);
      font-size: 0.95rem;
      transition: var(--transition-smooth);
      outline: none;
    }

    .login-page-container input:focus {
      border-color: var(--color-gold);
      box-shadow: 0 0 0 4px rgba(197, 155, 95, 0.1);
      background-color: var(--color-gold-bg);
    }

    .login-page-container .btn-submit {
      width: 100%;
      height: 3.25rem;
      background-color: var(--color-gold);
      color: var(--color-black);
      font-weight: 700;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-radius: 0.75rem;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      transition: var(--transition-smooth);
      box-shadow: 0 8px 25px rgba(197, 155, 95, 0.25);
    }

    .login-page-container .btn-submit:hover {
      background-color: var(--color-white);
      color: var(--color-gold-dark);
      border: 1px solid var(--color-gold);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(197, 155, 95, 0.35);
    }

    .login-page-container .btn-submit:active {
      transform: translateY(0);
    }

    .login-page-container .profile-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      border-radius: 1rem;
      border: 2px solid var(--color-gray-200);
      background-color: var(--color-white);
      cursor: pointer;
      transition: var(--transition-smooth);
    }

    .login-page-container .profile-card.active-varejo {
      border-color: var(--color-gold);
      background-color: var(--color-gold-bg);
      color: var(--color-gold-dark);
    }

    .login-page-container .profile-card.active-revendedor {
      border-color: var(--color-black);
      background-color: var(--color-black);
      color: var(--color-white);
    }

    .login-page-container .profile-card i,
    .login-page-container .profile-card svg {
      transition: var(--transition-smooth);
    }

    .login-page-container .profile-card.active-revendedor svg {
      color: var(--color-gold) !important;
    }

    @media (max-width: 1024px) {
      .login-page-container .right-content {
        padding: 4rem 1.5rem;
      }
    }

    /* Forçar header global sólido preto fosco na página de login */
    header, .global-header {
      background-color: #121212 !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
      border-bottom: 1px solid rgba(197, 155, 95, 0.15) !important;
    }
    
    header a, 
    header button, 
    header span, 
    header svg {
      color: #ffffff !important;
    }
    
    header svg path {
      fill: #ffffff !important;
    }
    
    header a:hover, 
    header a:hover i,
    header a:hover svg, 
    header a:hover svg path {
      color: var(--color-gold) !important;
      fill: var(--color-gold) !important;
    }
  `;

  return (
    <div className="login-page-container min-h-screen flex flex-col lg:flex-row relative">
      <style>{customStyles}</style>
      <Helmet>
        <title>Acesso à Conta | Avante Lingerie</title>
        <meta name="description" content="Acesse sua conta Avante Lingerie para conferir benefícios, pedidos e finalizar suas compras." />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Left Side - Image & Brand */}
      <div className="w-full lg:w-1/2 left-banner hidden lg:flex">
        <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.08] mix-blend-overlay object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />

        <div className="relative z-20 max-w-xl mx-auto text-center mt-auto">
          <Sparkles className="w-12 h-12 text-[#c59b5f] mx-auto mb-6" />
          <h1 className="mb-4">
            Descubra sua <span>melhor versão</span>
          </h1>
          <p>
            Acesse sua conta para conferir benefícios exclusivos, rastrear pedidos e finalizar suas compras com rapidez.
          </p>
        </div>
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-1/2 right-content">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-3xl font-bold font-serif mb-2" style={{ color: 'var(--color-black)', fontFamily: 'var(--font-display)' }}>Bem-vinda à Avante</h1>
            <p className="text-gray-500 text-sm">Faça login ou cadastre-se para continuar</p>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="tabs-list">
              <TabsTrigger value="login" className="tabs-trigger">
                Fazer Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="tabs-trigger">
                Criar Conta
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium text-center shadow-sm">
                {error}
              </div>
            )}

            {/* LOGIN TAB */}
            <TabsContent value="login" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div className="form-group">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="login-password" style={{ marginBottom: 0 }}>Senha</Label>
                    <button type="button" className="text-xs font-semibold hover:underline" style={{ color: 'var(--color-gold-dark)' }}>
                      Esqueceu a senha?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-submit"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <>ACESSAR MINHA CONTA <ChevronRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup" className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div className="form-group">
                  <Label htmlFor="signup-name">Nome Completo</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="signup-email">E-mail</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Mínimo 8 carac."
                      required
                      minLength={8}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="signup-password-confirm">Confirmar Senha</Label>
                    <Input
                      id="signup-password-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={8}
                      value={signupData.passwordConfirm}
                      onChange={(e) => setSignupData({ ...signupData, passwordConfirm: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Label className="text-base font-semibold" style={{ color: 'var(--color-black)' }}>Qual o seu perfil de compra?</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`profile-card ${signupData.tipo_cliente === 'varejo' ? 'active-varejo' : ''}`}>
                      <input
                        type="radio"
                        name="tipo_cliente"
                        value="varejo"
                        className="sr-only"
                        checked={signupData.tipo_cliente === 'varejo'}
                        onChange={(e) => setSignupData({ ...signupData, tipo_cliente: e.target.value })}
                      />
                      <UserCircle2 className="w-8 h-8 mb-2" style={{ color: signupData.tipo_cliente === 'varejo' ? 'var(--color-gold)' : 'var(--color-gray-600)' }} />
                      <span className="font-semibold text-sm text-center">Sou Cliente<br />Varejo</span>
                    </label>

                    <label className={`profile-card ${signupData.tipo_cliente === 'revendedor' ? 'active-revendedor' : ''}`}>
                      <input
                        type="radio"
                        name="tipo_cliente"
                        value="revendedor"
                        className="sr-only"
                        checked={signupData.tipo_cliente === 'revendedor'}
                        onChange={(e) => setSignupData({ ...signupData, tipo_cliente: e.target.value })}
                      />
                      <Sparkles className="w-8 h-8 mb-2" style={{ color: signupData.tipo_cliente === 'revendedor' ? 'var(--color-gold)' : 'var(--color-gray-600)' }} />
                      <span className="font-semibold text-sm text-center">Sou<br />Revendedor</span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-submit"
                  style={{ backgroundColor: signupData.tipo_cliente === 'revendedor' ? 'var(--color-black)' : 'var(--color-gold)', color: signupData.tipo_cliente === 'revendedor' ? 'var(--color-white)' : 'var(--color-black)', border: signupData.tipo_cliente === 'revendedor' ? '1px solid rgba(197, 155, 95, 0.3)' : 'none' }}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    <>CRIAR MINHA CONTA <ChevronRight className="w-5 h-5 ml-2" /></>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-gray-500 mt-8">
            Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </p>
        </div>
      </div>
    </div>
  );
}