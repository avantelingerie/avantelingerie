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

export function trackEvent(eventType, data = {}) {
  try {
    const sessionId = getOrCreateSessionId();
    const params = getMarketingParams();
    
    // Dispara pro PocketBase de forma assíncrona (não bloqueia a UI)
    pb.collection('analytics_events').create({
      session_id: sessionId,
      event_type: eventType,
      page_path: data.page_path || window.location.pathname,
      item_id: data.item_id || '',
      value: data.value || 0,
      utm_source: params.utm_source,
      utm_medium: params.utm_medium,
      utm_campaign: params.utm_campaign
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
    if (lastPathTracked.current !== location.pathname) {
      trackEvent('page_view', { page_path: location.pathname });
      lastPathTracked.current = location.pathname;
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