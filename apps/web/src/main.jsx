import React from 'react';
import ReactDOM from 'react-dom/client';

// Global pocketbase_auth interceptor for isolating Admin and Customer sessions
if (typeof window !== 'undefined' && window.localStorage) {
  const originalGetItem = window.localStorage.getItem.bind(window.localStorage);
  const originalSetItem = window.localStorage.setItem.bind(window.localStorage);
  const originalRemoveItem = window.localStorage.removeItem.bind(window.localStorage);

  const getTargetKey = (key) => {
    if (key === 'pocketbase_auth') {
      const isAdmin = window.location.pathname.startsWith('/admin');
      return isAdmin ? 'pocketbase_admin_auth' : 'pocketbase_auth';
    }
    return key;
  };

  window.localStorage.getItem = function (key) {
    return originalGetItem(getTargetKey(key));
  };

  window.localStorage.setItem = function (key, value) {
    originalSetItem(getTargetKey(key), value);
  };

  window.localStorage.removeItem = function (key) {
    originalRemoveItem(getTargetKey(key));
  };

  // Proteção contra cópia não autorizada de imagens e mídias de produtos
  document.addEventListener('contextmenu', (e) => {
    const target = e.target;
    if (
      target.tagName === 'IMG' ||
      target.tagName === 'VIDEO' ||
      target.closest('.aspect-\\[3\\/4\\]') ||
      target.closest('.product-gallery-container') ||
      target.closest('[data-protected-media]')
    ) {
      e.preventDefault();
    }
  }, { passive: false });
}

// Dynamically import the App and CSS to ensure the localStorage interceptor runs first
Promise.all([
  import('@/App.jsx'),
  import('@/index.css')
]).then(([{ default: App }]) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
  );
});