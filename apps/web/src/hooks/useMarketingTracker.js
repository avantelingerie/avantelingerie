import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';

function getOrCreateSessionId() {
  let sessionId = sessionStorage.getItem('avante_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem('avante_session_id', sessionId);
  }
  return sessionId;
}

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua) || window.innerWidth < 768) {
    return 'mobile';
  }
  return 'desktop';
}

export function trackEvent(eventType, data = {}) {
  try {
    const pagePath = data.page_path || (typeof window !== 'undefined' ? window.location.pathname : '');
    
    // Ignora rotas administrativas e arquivos técnicos de sistema
    if (
      pagePath.startsWith('/admin') ||
      pagePath.includes('apple-app-site-association') ||
      pagePath.includes('.well-known') ||
      pagePath.includes('robots.txt') ||
      pagePath.includes('sitemap.xml')
    ) {
      return;
    }

    const sessionId = getOrCreateSessionId();
    const params = getMarketingParams();
    const deviceType = data.device_type || getDeviceType();
    
    // Dispara pro PocketBase de forma assíncrona (não bloqueia a UI)
    pb.collection('analytics_events').create({
      session_id: sessionId,
      event_type: eventType,
      page_path: pagePath,
      item_id: data.item_id || '',
      value: data.value || 0,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign,
      device_type: deviceType
    }).catch(err => {
      // Falha silenciosa
      console.warn('Analytics Tracking Ignore:', err.message);
    });
  } catch (error) {
    console.warn('Analytics Tracking Catch:', error.message);
  }
}

export default function useMarketingTracker() {
  const location = useLocation();
  const lastPathTracked = useRef(null);

  useEffect(() => {
    const pathname = location.pathname || '';
    
    // Não rastreia o painel administrativo nem rotas técnicas internas
    if (
      pathname.startsWith('/admin') ||
      pathname.includes('apple-app-site-association') ||
      pathname.includes('.well-known')
    ) {
      return;
    }

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
        localStorage.setItem(param, value);
      }
    });

    // Rastreia a visualização de página apenas se o caminho mudou (evita re-renders duplicados)
    if (lastPathTracked.current !== pathname) {
      trackEvent('page_view', { page_path: pathname });
      lastPathTracked.current = pathname;
    }
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
