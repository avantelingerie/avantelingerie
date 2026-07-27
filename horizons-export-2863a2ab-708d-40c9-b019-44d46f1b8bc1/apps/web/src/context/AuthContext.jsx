import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model?.collectionName === 'users' ? pb.authStore.model : null);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid && pb.authStore.model?.collectionName === 'users');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const isUserModel = pb.authStore.model?.collectionName === 'users';
      if (!isUserModel) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      // 1. Initial local synchronous sync to avoid initial render flickers
      setCurrentUser(pb.authStore.model);
      setIsAuthenticated(pb.authStore.isValid);
      
      // 2. Perform active validation with the Pocketbase server if token is present
      if (pb.authStore.isValid && pb.authStore.token) {
        try {
          const authData = await pb.collection('users').authRefresh();
          // Update local state with latest record info
          setCurrentUser(authData.record || authData.model || pb.authStore.model);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('[AuthContext] Falha ao revalidar token no servidor:', error);
          // If the token is invalid/expired (HTTP 401/400), clean up state to prevent silent failures
          if (error.status === 401 || error.status === 400) {
            pb.authStore.clear();
            setCurrentUser(null);
            setIsAuthenticated(false);
            // High #13 & #37: Friendly error toast notifying user of force logout
            toast.warning('Sua sessão expirou por segurança. Por favor, faça login novamente.');
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen to auth state changes (login, token updates, etc.)
    const unsubscribe = pb.authStore.onChange((token, model) => {
      const isUserModel = model?.collectionName === 'users';
      if (isUserModel) {
        setCurrentUser(model);
        setIsAuthenticated(!!model);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    // High #7: Sync session authentication changes across multiple browser tabs
    const handleStorageChange = (e) => {
      if (e.key === 'pocketbase_auth' || e.key === 'pocketbase_auth_logout_trigger') {
        const isUserModel = pb.authStore.model?.collectionName === 'users';
        if (isUserModel) {
          const hasAuth = pb.authStore.isValid;
          setCurrentUser(pb.authStore.model);
          setIsAuthenticated(hasAuth);
          
          if (!hasAuth) {
            toast.info('Sua sessão foi encerrada em outra aba de navegação.');
          } else {
            toast.success('Sessão sincronizada em tempo real!');
          }
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      return authData;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password, name, tipo_cliente) => {
    try {
      // Create the user with role/type distinction
      await pb.collection('users').create({
        name,
        email,
        password,
        passwordConfirm: password,
        tipo_cliente: tipo_cliente || 'varejo',
        emailVisibility: true
      }, { $autoCancel: false });
      
      // Automatically log them in after successful creation
      return await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    setIsAuthenticated(false);

    // Critical #3: Clear cart on logout to prevent cart leaks between different client sessions
    localStorage.removeItem('avante_cart');
    window.dispatchEvent(new Event('cart_cleared'));

    // Trigger storage event for other open browser tabs
    localStorage.setItem('pocketbase_auth_logout_trigger', Date.now().toString());
    localStorage.removeItem('pocketbase_auth_logout_trigger');
  };

  const updateUser = (userData) => {
    if (userData && pb.authStore.isValid) {
      pb.authStore.save(pb.authStore.token, userData);
    }
    setCurrentUser(userData);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};