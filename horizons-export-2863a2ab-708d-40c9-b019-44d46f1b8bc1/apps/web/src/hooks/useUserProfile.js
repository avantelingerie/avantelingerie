import { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';

export function useUserProfile() {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  const [isAuthenticated, setIsAuthenticated] = useState(pb.authStore.isValid);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      try {
        setIsLoading(true);
        setCurrentUser(pb.authStore.model);
        setIsAuthenticated(pb.authStore.isValid);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
    const unsubscribe = pb.authStore.onChange(() => {
      checkUser();
    });

    return () => unsubscribe();
  }, []);

  const tipo_cliente = currentUser?.tipo_cliente || 'varejo';
  const userType = tipo_cliente === 'revendedor' ? 'revendedor' : 'consumidor_final';

  const getProfilePrices = (product) => {
    if (!product) return { price: 0, type: 'varejo' };
    if (userType === 'revendedor' && product.price_wholesale) {
      return { price: product.price_wholesale, type: 'atacado' };
    }
    return { price: product.price, type: 'varejo' };
  };

  return { 
    currentUser, 
    userType,
    tipo_cliente, 
    getProfilePrices, 
    isAuthenticated,
    isLoading,
    error
  };
}