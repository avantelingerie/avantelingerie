import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext.jsx';
import { Loader2, ShieldAlert, Sparkles, LogOut } from 'lucide-react';

export default function ProtectedRouteReseller({ children }) {
  const { isAuthenticated, currentUser, isLoading, logout } = useContext(AuthContext);
  const location = useLocation();

  // Verifica rigorosamente se o usuário é uma revendedora atacadista ou administrador
  const isReseller = currentUser?.commercial_profile === 'reseller' || 
                     currentUser?.tipo_cliente === 'revendedor' ||
                     currentUser?.email === 'admin@avantelingerie.com.br' ||
                     currentUser?.role === 'admin' ||
                     currentUser?.is_admin === true;

  // Enquanto carrega os dados de login da sessão
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#C59B5F] mx-auto" />
          <p className="text-sm font-light text-[#5C4D4A] tracking-wider uppercase">Verificando Credenciais B2B...</p>
        </div>
      </div>
    );
  }

  // Se NÃO estiver logado no site, joga para a tela de login normal
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se ESTIVER logado mas for um CLIENTE VAREJO comum (bloqueia o acesso!)
  if (!isReseller) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4 pt-24 font-sans text-[#2C1E1A]">
        <div className="max-w-md w-full bg-white border border-[#EADCD9] p-8 md:p-10 rounded-3xl shadow-xl space-y-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C59B5F]/5 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2" />
          
          <div className="w-16 h-16 bg-[#C59B5F]/10 text-[#C59B5F] rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold">Área Restrita B2B</h3>
            <p className="text-[#5C4D4A] text-sm font-light leading-relaxed">
              Sua conta atual está configurada como <strong>Cliente Varejo</strong>. Para ter acesso ao nosso Portal de Revendedoras, você precisa ter um cadastro de parceira comercial aprovado.
            </p>
          </div>

          <div className="border-t border-[#EADCD9] pt-6 space-y-3">
            <a 
              href="/quero-revender" 
              className="w-full py-3.5 bg-[#2C1E1A] hover:bg-[#C59B5F] text-white hover:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              Fazer Pré-Cadastro de Revenda <Sparkles className="w-4 h-4" />
            </a>
            
            <button 
              onClick={() => logout()}
              className="w-full py-3 border border-[#EADCD9] hover:bg-[#FAF6F0] text-[#5C4D4A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Usar outra conta <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Se for uma revendedora autenticada com sucesso, libera a área restrita
  return children;
}