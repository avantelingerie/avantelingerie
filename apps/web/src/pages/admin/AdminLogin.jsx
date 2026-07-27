import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    console.log(`[AdminLogin] Tentando autenticar usuário: ${email}`);
    
    try {
      // loginAdmin context correctly calls pb.collection('usuarios').authWithPassword(email, password)
      const authData = await loginAdmin(email, password);
      console.log(`[AdminLogin] Autenticação bem sucedida. ID: ${authData.record.id}`);
      
      // Redirect to /admin as requested
      navigate('/admin');
    } catch (err) {
      console.error('[AdminLogin] Erro na autenticação:', err);
      // Improved error handling to show API messages if available
      setError(
        err?.response?.message || 
        err?.message || 
        'Credenciais inválidas ou acesso não autorizado.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--admin-bg))] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-xl border overflow-hidden">
        <div className="bg-[hsl(var(--admin-sidebar))] p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[hsl(var(--admin-sidebar-fg))]" />
          </div>
          <h1 className="text-2xl font-bold text-[hsl(var(--admin-sidebar-fg))]">Área Restrita</h1>
          <p className="text-white/60 text-sm mt-2">Acesso exclusivo para administradores</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@avantelingerie.com.br"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'ACESSAR PAINEL'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}