import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useMarketingTracker() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const utmParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid'
    ];

    utmParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        // Salva no localStorage para persistir entre páginas e recarregamentos
        localStorage.setItem(param, value);
      }
    });
  }, [location]);

  return null;
}

export function getMarketingParams() {
  return {
    utm_source: localStorage.getItem('utm_source') || '',
    utm_medium: localStorage.getItem('utm_medium') || '',
    utm_campaign: localStorage.getItem('utm_campaign') || '',
    utm_term: localStorage.getItem('utm_term') || '',
    utm_content: localStorage.getItem('utm_content') || '',
    gclid: localStorage.getItem('gclid') || '',
    fbclid: localStorage.getItem('fbclid') || ''
  };
}

export function clearMarketingParams() {
  const utmParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'fbclid'
  ];
  utmParams.forEach(param => localStorage.removeItem(param));
}