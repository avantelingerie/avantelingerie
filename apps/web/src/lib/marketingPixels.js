import pb from '@/lib/pocketbaseClient.js';
import { trackEvent } from '@/hooks/useMarketingTracker.js';

// CONFIGURAÇÃO DIRETA DE MARKETING (Opcional - Altamente Recomendado para evitar 404 de Banco)
// Insira seus IDs aqui diretamente para pular a consulta ao PocketBase e blindar o site contra erros.
const CONFIG_PIXELS_LOCAIS = {
  meta_pixel_id: '981595838258999',
  google_analytics_id: 'G-E2FS36FRG1',
  google_ads_tag_id: '',
  google_ads_conversion_label: '',
  enable_pocketbase_sync: true, // Habilitado para ler da integracoes_config
};

let pixelsInitialized = false;
let googleAdsTagId = '';
let googleAdsConversionLabel = '';

// Helper para disparo seguro da Meta Conversions API (CAPI)
export async function sendCapiEvent(eventName, customData = {}, userData = {}, eventId = null) {
  try {
    const eid = eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await fetch('/hcgi/api/marketing/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eid,
        event_source_url: window.location.href,
        custom_data: customData,
        user_data: userData,
      }),
    }).catch(() => {});
  } catch (err) {
    // Silencioso para não afetar UX
  }
}

export async function initializePixels() {
  if (pixelsInitialized) return;

  let metaPixelId = CONFIG_PIXELS_LOCAIS.meta_pixel_id || '';
  let gaMeasurementId = CONFIG_PIXELS_LOCAIS.google_analytics_id || '';
  googleAdsTagId = CONFIG_PIXELS_LOCAIS.google_ads_tag_id || '';
  googleAdsConversionLabel = CONFIG_PIXELS_LOCAIS.google_ads_conversion_label || '';

  if (CONFIG_PIXELS_LOCAIS.enable_pocketbase_sync && (!metaPixelId || !gaMeasurementId || !googleAdsTagId)) {
    try {
      const records = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "marketing" && ativo = true',
      });
      
      records.forEach(record => {
        if (record.chave_nome === 'meta_pixel_id' && record.chave_valor) {
          metaPixelId = record.chave_valor;
        }
        if (record.chave_nome === 'google_analytics_id' && record.chave_valor) {
          gaMeasurementId = record.chave_valor;
        }
        if (record.chave_nome === 'google_ads_tag_id' && record.chave_valor) {
          googleAdsTagId = record.chave_valor;
        }
        if (record.chave_nome === 'google_ads_conversion_label' && record.chave_valor) {
          googleAdsConversionLabel = record.chave_valor;
        }
      });
    } catch (err) {
      console.warn('[Pixels] Erro ao ler integracoes_config. Lendo localstorage...', err);
      metaPixelId = localStorage.getItem('meta_pixel_id') || metaPixelId;
      gaMeasurementId = localStorage.getItem('google_analytics_id') || gaMeasurementId;
      googleAdsTagId = localStorage.getItem('google_ads_tag_id') || googleAdsTagId;
      googleAdsConversionLabel = localStorage.getItem('google_ads_conversion_label') || googleAdsConversionLabel;
    }
  }

  // 1. Inicializa o Meta Pixel
  if (metaPixelId && !window.fbq) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
    console.log(`[Pixels] Meta Pixel (${metaPixelId}) inicializado com sucesso.`);
  }

  // 2. Inicializa o Google Analytics 4
  if (gaMeasurementId && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId);
    console.log(`[Pixels] Google Analytics 4 (${gaMeasurementId}) inicializado com sucesso.`);
  }

  pixelsInitialized = true;
}

// Event Tracking Wrappers
export function trackPageView(url = window.location.pathname) {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
  if (window.gtag) {
    window.gtag('event', 'page_view', { page_path: url });
  }
}

export function trackViewContent(product) {
  if (!product) return;
  const value = product.preco_varejo || product.price || 0;
  const name = product.nome || product.name || '';
  const id = product.id || '';

  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: name,
      content_ids: [id],
      content_type: 'product',
      value: value,
      currency: 'BRL'
    });
  }

  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'BRL',
      value: value,
      items: [{
        item_id: id,
        item_name: name,
        price: value
      }]
    });
  }

  trackEvent('view_item', { item_id: id, value: value });
}

export function trackAddToCart(product, quantity = 1) {
  if (!product) return;
  const value = (product.preco_varejo || product.price || 0) * quantity;
  const name = product.nome || product.name || '';
  const id = product.id || '';

  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: name,
      content_ids: [id],
      content_type: 'product',
      value: value,
      currency: 'BRL'
    });
  }

  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: value,
      items: [{
        item_id: id,
        item_name: name,
        price: product.preco_varejo || product.price || 0,
        quantity: quantity
      }]
    });
  }

  trackEvent('add_to_cart', { item_id: id, value: value });
}

export function trackInitiateCheckout(cart, total) {
  if (!cart || cart.length === 0) return;
  const value = total || 0;
  const ids = cart.map(item => item.id || '');

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: ids,
      content_type: 'product',
      value: value,
      currency: 'BRL'
    });
  }

  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: value,
      items: cart.map(item => ({
        item_id: item.id || '',
        item_name: item.name || item.nome || '',
        price: item.preco_varejo || item.price || 0,
        quantity: item.quantity || 1
      }))
    });
  }

  trackEvent('begin_checkout', { value: value });
}

export function trackPurchase(orderId, total, items = [], paymentMethod = '', customerData = {}) {
  const value = total || 0;
  
  // Evita disparar pixels duplicados se o usuário recarregar a tela de confirmação
  const purchaseSentKey = `purchase_sent_${orderId}`;
  if (sessionStorage.getItem(purchaseSentKey)) {
    console.log(`[Pixels] Evento de Purchase para o pedido ${orderId} já enviado anteriormente.`);
    return;
  }

  const eventId = `purch_${orderId}`;

  // 1. Meta Pixel (Navegador com eventID para deduplicação com CAPI)
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      content_ids: items.map(item => item.id || ''),
      content_type: 'product',
      value: value,
      currency: 'BRL',
      order_id: orderId,
      payment_method: paymentMethod
    }, { eventID: eventId });
  }

  // 2. Google Analytics 4 (Enhanced Ecommerce Purchase)
  if (window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: 'BRL',
      payment_type: paymentMethod,
      items: items.map(item => ({
        item_id: item.id || '',
        item_name: item.name || item.nome || '',
        price: item.preco_varejo || item.price || 0,
        quantity: item.quantity || 1
      }))
    });

    // 3. Google Ads Direct Conversion Tag
    if (googleAdsTagId && googleAdsConversionLabel) {
      window.gtag('event', 'conversion', {
        send_to: `${googleAdsTagId}/${googleAdsConversionLabel}`,
        value: value,
        currency: 'BRL',
        transaction_id: orderId
      });
      console.log(`[Pixels] Conversão direta do Google Ads (${googleAdsTagId}/${googleAdsConversionLabel}) enviada!`);
    }
  }

  // 4. Meta Conversions API (CAPI - Servidor)
  sendCapiEvent('Purchase', {
    value: value,
    currency: 'BRL',
    order_id: orderId,
    content_type: 'product',
    content_ids: items.map(item => item.id || ''),
    num_items: items.length
  }, customerData, eventId);

  sessionStorage.setItem(purchaseSentKey, 'true');
  trackEvent('purchase', { value: value });
  console.log(`[Pixels] Evento de Compra (Purchase) do pedido ${orderId} disparado com sucesso!`);
}

export function trackResellerUpgrade(user) {
  if (!user) return;
  const email = user.email || '';
  const name = user.name || '';
  
  if (window.fbq) {
    window.fbq('trackCustom', 'ResellerUpgrade', {
      user_name: name,
      user_email: email,
      status: 'approved'
    });
  }

  if (window.gtag) {
    window.gtag('event', 'reseller_upgrade', {
      event_category: 'B2B',
      event_label: 'Revendedora Aprovada',
      user_email: email
    });
  }
  
  console.log(`[Pixels] Evento Exclusivo de B2B (ResellerUpgrade) disparado com sucesso!`);
}