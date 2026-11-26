import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation, useParams, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { useCart } from '@/hooks/useCart.js';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { cart } = useCart();

  // Extrai o token de redefinição de todas as origens possíveis:
  // 1. Parâmetro de rota (/redefinir-senha/:token)
  // 2. Query string (?token=XYZ)
  // 3. Hash do link padrão do PocketBase (#/auth/confirm-password-reset/XYZ)
  const token = useMemo(() => {
    if (routeToken) return routeToken;
    const queryToken = searchParams.get('token');
    if (queryToken) return queryToken;

    const hash = window.location.hash || '';
    if (hash.includes('confirm-password-reset')) {
      const parts = hash.split('confirm-password-reset/');
      if (parts[1]) {
        return parts[1].split('?')[0].split('/')[0];
      }
    }
    return '';
  }, [routeToken, searchParams, location]);

  const [email, setEmail] = useState(() => searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Link de redefinição não encontrado ou incompleto. Se você clicou no e-mail, verifique se o link foi copiado integralmente.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Token de segurança ausente. Solicite um novo link de redefinição.');
      return;
    }

    if (password.length < 8) {
      setError('A nova senha deve conter no mínimo 8 caracteres.');
      return;
    }

    if (password !== passwordConfirm) {
      setError('As senhas digitadas não coincidem. Por favor, verifique.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Confirmação oficial do token e troca da senha no PocketBase
      await pb.collection('users').confirmPasswordReset(
        token.trim(),
        password.trim(),
        passwordConfirm.trim()
      );

      setIsSuccess(true);
      toast.success('Senha redefinida com sucesso!');

      // 2. Se o usuário informou o e-mail, loga automaticamente
      if (email && email.includes('@')) {
        try {
          await login(email.trim().toLowerCase(), password.trim());
          toast.success('Login realizado com sucesso! Redirecionando...');
          setTimeout(() => {
            navigate(cart && cart.length > 0 ? '/cart' : '/');
          }, 1500);
          return;
        } catch (loginErr) {
          console.warn('[ResetPasswordPage] Login automático pós-reset não efetuado:', loginErr);
        }
      }

      // Redireciona para o login após 2.5s se não logar automaticamente
      setTimeout(() => {
        navigate('/login?tab=login');
      }, 2500);

    } catch (err) {
      console.error('[ResetPasswordPage] Erro ao redefinir senha:', err);
      const msg = err?.data?.message || err?.message || '';
      if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('invalid')) {
        setError('Este link de redefinição é inválido ou já expirou. Por favor, solicite um novo link.');
      } else {
        setError('Não foi possível redefinir a senha com esses dados. Tente solicitar um novo link.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-12 px-4 flex flex-col justify-center items-center relative overflow-hidden">
      <Helmet>
        <title>Redefinir Senha | Avante Lingerie</title>
        <meta name="description" content="Redefina sua senha de acesso na Avante Lingerie com total segurança." />
      </Helmet>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* LOGO & BRANDING */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block transition-transform hover:scale-105">
            <span className="font-serif text-3xl font-bold tracking-widest text-[#121212]">
              AVANTE LINGERIE
            </span>
            <span className="block text-[10px] tracking-[3px] uppercase font-bold text-[#c59b5f] mt-1">
              Confecção Própria • Nova Friburgo / RJ
            </span>
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-[#c59b5f]/25 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(197,155,95,0.08)]">
          
          {isSuccess ? (
            <div className="text-center py-6 animate-in fade-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Senha Redefinida!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-6">
                Sua nova senha foi gravada com sucesso e com criptografia bancária. Você já pode acessar sua conta normalmente.
              </p>
              <Button
                onClick={() => navigate('/login?tab=login')}
                className="w-full bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black font-bold uppercase tracking-wider text-xs py-6 rounded-xl transition-all"
              >
                Ir para o Login &rarr;
              </Button>
            </div>
          ) : (
            <>
              {/* Header do Formulário */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#c59b5f]/15 border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] mx-auto mb-3">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                  Criar Nova Senha
                </h1>
                <p className="text-xs text-gray-500 font-light mt-1.5 leading-relaxed">
                  Cadastre uma nova senha com pelo menos 8 caracteres para proteger seus dados e pedidos.
                </p>
              </div>

              {/* Banner de Erro */}
              {error && (
                <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-2xl flex items-start gap-3 text-red-700 text-xs shadow-xs animate-in fade-in duration-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <div className="flex-1">
                    <span className="font-semibold">{error}</span>
                    {error.includes('expirou') && (
                      <Link 
                        to="/login?tab=login" 
                        className="block mt-1 text-[11px] underline font-bold text-red-800 hover:text-red-950"
                      >
                        Clique aqui para solicitar um novo link de redefinição
                      </Link>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Campo Opcional de E-mail (facilita login automático após redefinir) */}
                <div className="form-group text-left">
                  <Label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 block">
                    Seu E-mail (Para Login Imediato)
                  </Label>
                  <Input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm h-11 px-4 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors"
                  />
                </div>

                {/* Nova Senha */}
                <div className="form-group text-left">
                  <Label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 block">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full text-sm h-11 px-4 pr-11 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Nova Senha */}
                <div className="form-group text-left">
                  <Label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 block">
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPasswordConfirm ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Repita sua nova senha"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      className="w-full text-sm h-11 px-4 pr-11 border border-gray-200 rounded-xl focus:border-[#c59b5f] focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Botão de Envio */}
                <Button
                  type="submit"
                  disabled={isLoading || !token}
                  className="w-full h-12 bg-gradient-to-r from-[#121212] to-[#242424] hover:from-[#c59b5f] hover:to-[#deb881] text-white hover:text-black font-bold uppercase tracking-wider text-xs border border-[#c59b5f]/40 rounded-xl mt-4 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#c59b5f]" />
                      <span>Atualizando Senha...</span>
                    </>
                  ) : (
                    <>
                      <span>Salvar Nova Senha & Conectar</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              {/* Rodapé com Selo de Segurança */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <Link to="/login" className="text-[#c59b5f] hover:underline font-semibold">
                  Voltar para o Login
                </Link>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px]">Proteção 256-bit</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
