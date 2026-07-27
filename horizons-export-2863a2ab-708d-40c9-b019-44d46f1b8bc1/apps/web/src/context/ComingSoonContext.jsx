import React, { createContext, useContext, useState, useEffect } from 'react';
import apiServerClient from '@/lib/apiServerClient.js';

const ComingSoonContext = createContext(null);

export const ComingSoonProvider = ({ children }) => {
  const [config, setConfig] = useState({
    modoEmBreve: false,
    dataLancamento: null,
    instagramUrl: '',
    whatsappUrl: '',
    tiktokUrl: '',
    facebookUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await apiServerClient.fetch('/configuracoes/modo-em-breve');
        if (!response.ok) throw new Error('Failed to fetch coming soon config');
        
        const data = await response.json();
        setConfig({
          modoEmBreve: data.modo_em_breve || false,
          dataLancamento: data.data_lancamento || null,
          instagramUrl: data.instagram_url || '',
          whatsappUrl: data.whatsapp_url || '',
          tiktokUrl: data.tiktok_url || '',
          facebookUrl: data.facebook_url || ''
        });
      } catch (err) {
        console.error('Error fetching coming soon config:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ComingSoonContext.Provider value={{ ...config, loading, error }}>
      {children}
    </ComingSoonContext.Provider>
  );
};

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error('useComingSoon must be used within a ComingSoonProvider');
  }
  return context;
};