import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';

export default function AnalyticsTracker() {
  const location = useLocation();
  const [pixelId, setPixelId] = useState(null);
  const [ga4Id, setGa4Id] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Buscar configuraes do banco de dados (PocketBase)
  useEffect(() => {
    const fetchAnalyticsConfigs = async () => {
      try {
        const records = await pb.collection('integracoes_config').getFullList({
          filter: 'servico = "marketing" && ativo = true',
        });

        records.forEach((record) => {
          if (record.chave_nome === 'meta_pixel_id') {
            setPixelId(record.chave_valor);
          }
          if (record.chave_nome === 'ga4_id') {
            setGa4Id(record.chave_valor);
          }
        });
      } catch (err) {
        console.warn('AnalyticsTracker: No foi possvel carregar as configuraes de marketing.', err);
      }
    };

    fetchAnalyticsConfigs();
  }, []);

  // 2. Inicializar Scripts assim que os IDs so carregados
  useEffect(() => {
    if (isInitialized) return;

    // --- META PIXEL ---
    if (pixelId) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      window.fbq('init', pixelId);
      console.log(`[Analytics] Meta Pixel (${pixelId}) inicializado.`);
    }

    // --- GOOGLE ANALYTICS (GA4) ---
    if (ga4Id) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ga4Id);
      console.log(`[Analytics] Google Analytics 4 (${ga4Id}) inicializado.`);
    }

    if (pixelId || ga4Id) {
      setIsInitialized(true);
    }
  }, [pixelId, ga4Id, isInitialized]);

  // 3. Monitorar navegao (PageView) e disparar eventos
  useEffect(() => {
    if (!isInitialized) return;

    // Disparar PageView no Facebook Pixel
    if (pixelId && window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Disparar PageView no Google Analytics
    if (ga4Id && window.gtag) {
      window.gtag('config', ga4Id, {
        page_path: location.pathname + location.search
      });
    }

  }, [location, isInitialized, pixelId, ga4Id]);

  return null; // Este componente  invisvel
}
