import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { descontosService } from '@/services/descontosService.js';
import { toast } from 'sonner';

// Shared state for pub/sub across components
let globalCart = [];
try {
  const saved = localStorage.getItem('avante_cart');
  if (saved) {
    globalCart = JSON.parse(saved);
  }
} catch (e) {
  globalCart = [];
}

const listeners = new Set();

const notifyListeners = () => {
  try {
    localStorage.setItem('avante_cart', JSON.stringify(globalCart));
  } catch (e) {
    console.error('[useCart] Falha ao salvar carrinho no localStorage (modo privado ou quota cheia):', e);
  }
  // Using spread to guarantee a new array reference and force React to re-render
  listeners.forEach(listener => listener([...globalCart]));
};

// High #8: Synchronize cart items across multiple browser tabs in real-time
try {
  window.addEventListener('storage', (e) => {
    if (e.key === 'avante_cart') {
      try {
        const parsed = JSON.parse(e.newValue);
        globalCart = parsed || [];
        // Notify hook instances in this tab without triggering loops or redundant local writes
        listeners.forEach(listener => listener([...globalCart]));
      } catch (err) {
        console.error('[useCart] Erro ao sincronizar carrinho via evento storage:', err);
      }
    }
  });

  // Critical #3: Instantly clear global cart upon custom logout notification
  window.addEventListener('cart_cleared', () => {
    globalCart = [];
    listeners.forEach(listener => listener([]));
  });
} catch (e) {
  console.error('[useCart] Erro ao registrar listeners globais de storage/carrinho:', e);
}

// Global cache for discount configurations to prevent multiple redundant Pocketbase calls
let cachedConfig = null;
let configPromise = null;

export function useCart() {
  const [cart, setCart] = useState(globalCart);
  const { currentUser } = useAuth();
  const [configuracoes, setConfiguracoes] = useState(cachedConfig);

  useEffect(() => {
    const listener = (newCart) => setCart(newCart);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  // Critical #4 & High #11 / #17: Sync and re-render the cart hook's components immediately when user logs in/out
  useEffect(() => {
    setCart([...globalCart]);
  }, [currentUser]);

  // Fetch or load configurations reactively
  useEffect(() => {
    if (cachedConfig) {
      setConfiguracoes(cachedConfig);
      return;
    }
    if (!configPromise) {
      configPromise = descontosService.getConfiguracoes().then(config => {
        cachedConfig = config;
        return config;
      }).catch(err => {
        console.error('[useCart] Erro ao carregar configurações de desconto', err);
        return null;
      });
    }
    configPromise.then(config => {
      setConfiguracoes(config);
    });
  }, []);

  // High #9: Enforce rigorous stock checks and alert user with warnings
  const addToCart = (product) => {
    const cartItemId = `${product.id}-${product.selectedSize || ''}-${product.selectedColor || ''}`;
    const existing = globalCart.find(item => item.cartItemId === cartItemId);
    const stockLimit = typeof product.stock === 'number' ? product.stock : (typeof product.estoque === 'number' ? product.estoque : Infinity);
    const requestedQty = (existing ? existing.quantity : 0) + (product.quantity || 1);

    if (stockLimit <= 0) {
      toast.error('Desculpe, este produto esgotou no momento!');
      return false;
    }

    if (requestedQty > stockLimit) {
      toast.warning(`Apenas ${stockLimit} unidade(s) deste produto estão disponíveis em estoque.`);
      if (existing) {
        globalCart = globalCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: stockLimit } : item
        );
      } else {
        globalCart = [...globalCart, {
          ...product,
          cartItemId,
          quantity: stockLimit
        }];
      }
      notifyListeners();
      return false;
    }

    if (existing) {
      globalCart = globalCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: requestedQty } : item
      );
    } else {
      globalCart = [...globalCart, {
        ...product,
        cartItemId,
        quantity: product.quantity || 1
      }];
    }
    notifyListeners();
    toast.success('Produto adicionado ao seu carrinho!');
    return true;
  };

  const removeFromCart = (cartItemId) => {
    globalCart = globalCart.filter(item => item.cartItemId !== cartItemId);
    notifyListeners();
    toast.info('Item removido do seu carrinho.');
  };

  // High #9: Validate input bounds and stock limit upon direct quantity updates
  const updateQuantity = (cartItemId, qty) => {
    const newQty = Math.max(1, qty);
    const item = globalCart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    const stockLimit = typeof item.stock === 'number' ? item.stock : (typeof item.estoque === 'number' ? item.estoque : Infinity);

    if (newQty > stockLimit) {
      toast.warning(`Apenas ${stockLimit} unidade(s) deste produto estão disponíveis em estoque.`);
      globalCart = globalCart.map(i =>
        i.cartItemId === cartItemId ? { ...i, quantity: stockLimit } : i
      );
    } else {
      globalCart = globalCart.map(i =>
        i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i
      );
    }
    notifyListeners();
  };

  const clearCart = () => {
    globalCart = [];
    notifyListeners();
  };

  // --- Centralized & Unified Calculation Logic ---

  // High #11 & Medium #24: Align pricing fallback and B2B reseller pricing consistently
  const getItemPrice = useCallback((item) => {
    if (!item) return 0;
    const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
    if (isReseller) {
      const valAtacado = item.preco_atacado || item.price_wholesale;
      if (valAtacado) {
        const clean = String(valAtacado).replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(clean) || 0;
      }
      const valVarejo = item.preco_varejo || item.price || 0;
      const cleanVarejo = String(valVarejo).replace(/[^\d.,]/g, '').replace(',', '.');
      return (parseFloat(cleanVarejo) || 0) * 0.6;
    }
    const retail = item.preco_varejo || item.price || 0;
    const cleanRetail = String(retail).replace(/[^\d.,]/g, '').replace(',', '.');
    return parseFloat(cleanRetail) || 0;
  }, [currentUser]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((sum, item) => {
      const price = getItemPrice(item);
      const qty = Number(item.quantity) || 0;
      return sum + (price * qty);
    }, 0);
  }, [cart, getItemPrice]);

  const getTotalPrice = getCartTotal;

  const getActiveDiscount = useCallback(() => {
    const total = getCartTotal();
    const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
    const perfil = isReseller ? 'reseller' : 'retail';
    const faixas = descontosService.getFaixasPorPerfil(configuracoes, perfil);

    // Calculate extra discount percent based on reseller tier levels
    let extraDiscountPercent = 0;
    if (isReseller && currentUser) {
      const isGold = currentUser.account_level === 'gold' || currentUser.is_gold || (Number(currentUser.total_compras) >= 3000) || (Number(currentUser.faturamento_acumulado) >= 3000);
      const isSilver = currentUser.account_level === 'verified' || currentUser.is_verified || currentUser.cadastro_completo;
      if (isGold) {
        extraDiscountPercent = 0.05; // 5% extra for Gold Elite
      } else if (isSilver) {
        extraDiscountPercent = 0.02; // 2% extra for Silver Verified
      }
    }

    // Sort descending to check from highest threshold down to lowest
    const faixasArr = Array.isArray(faixas) ? faixas.filter(Boolean) : [];
    const sortedFaixas = [...faixasArr]
      .map(f => {
        const valMin = String(f.valor_minimo || 0).replace(/[^\d.,]/g, '').replace(',', '.');
        const pct = String(f.percentual || 0).replace(/[^\d.,]/g, '').replace(',', '.');
        return {
          ...f,
          valor_minimo: parseFloat(valMin) || 0,
          percentual: parseFloat(pct) || 0
        };
      })
      .sort((a, b) => b.valor_minimo - a.valor_minimo);

    for (const f of sortedFaixas) {
      if (total >= f.valor_minimo) {
        const basePercent = f.percentual / 100;
        const percent = basePercent + extraDiscountPercent;
        const label = extraDiscountPercent > 0
          ? `${f.percentual}% + ${(extraDiscountPercent * 100).toFixed(0)}% VIP`
          : `${f.percentual}%`;
        return {
          percent: percent,
          amount: total * percent,
          label: label
        };
      }
    }

    // Resilient fallback in case db faixas are not loaded yet or are empty
    if (faixasArr.length === 0) {
      let basePercent = 0;
      if (perfil === 'reseller') {
        if (total >= 3000) basePercent = 0.15;
        else if (total >= 1500) basePercent = 0.10;
      } else {
        if (total >= 900) basePercent = 0.20;
        else if (total >= 300) basePercent = 0.15;
      }

      if (basePercent > 0 || extraDiscountPercent > 0) {
        const percent = basePercent + extraDiscountPercent;
        const label = extraDiscountPercent > 0
          ? `${(basePercent * 100).toFixed(0)}% + ${(extraDiscountPercent * 100).toFixed(0)}% VIP`
          : `${(basePercent * 100).toFixed(0)}%`;
        return {
          percent: percent,
          amount: total * percent,
          label: label
        };
      }
    }

    if (extraDiscountPercent > 0) {
      return {
        percent: extraDiscountPercent,
        amount: total * extraDiscountPercent,
        label: `${(extraDiscountPercent * 100).toFixed(0)}% VIP`
      };
    }

    return { percent: 0, amount: 0, label: '0%' };
  }, [getCartTotal, configuracoes, currentUser]);

  const getNextTierInfo = useCallback(() => {
    const total = getCartTotal();
    const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
    const perfil = isReseller ? 'reseller' : 'retail';
    const faixas = descontosService.getFaixasPorPerfil(configuracoes, perfil);
    const faixasArr = Array.isArray(faixas) ? faixas.filter(Boolean) : [];

    // Sort ascending to find the next threshold to cross
    const sortedFaixas = [...faixasArr]
      .map(f => {
        const valMin = String(f.valor_minimo || 0).replace(/[^\d.,]/g, '').replace(',', '.');
        const pct = String(f.percentual || 0).replace(/[^\d.,]/g, '').replace(',', '.');
        return {
          ...f,
          valor_minimo: parseFloat(valMin) || 0,
          percentual: parseFloat(pct) || 0
        };
      })
      .sort((a, b) => a.valor_minimo - b.valor_minimo);

    for (const f of sortedFaixas) {
      if (total < f.valor_minimo) {
        return {
          target: f.valor_minimo,
          label: `${f.percentual}%`,
          remaining: f.valor_minimo - total
        };
      }
    }

    // Resilient fallback in case db faixas are empty
    if (faixasArr.length === 0) {
      if (perfil === 'reseller') {
        if (total < 1500) return { target: 1500, label: '10%', remaining: 1500 - total };
        if (total < 3000) return { target: 3000, label: '15%', remaining: 3000 - total };
        return null;
      } else {
        if (total < 300) return { target: 300, label: '15%', remaining: 300 - total };
        if (total < 900) return { target: 900, label: '20%', remaining: 900 - total };
        return null;
      }
    }

    return null; // reached maximum possible discount tier
  }, [getCartTotal, configuracoes, currentUser]);

  const getPixBenefitEligibility = useCallback(() => {
    const total = getCartTotal();
    const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
    const perfil = isReseller ? 'reseller' : 'retail';
    const faixas = descontosService.getFaixasPorPerfil(configuracoes, perfil);
    const faixasArr = Array.isArray(faixas) ? faixas.filter(Boolean) : [];

    if (faixasArr.length > 0) {
      const minTier = Math.min(...faixasArr.map(f => {
        const valMin = String(f.valor_minimo || 0).replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(valMin) || 0;
      }));
      return total < minTier;
    }

    // Resilient fallback
    const fallbackLimit = perfil === 'reseller' ? 1500 : 300;
    return total < fallbackLimit;
  }, [getCartTotal, configuracoes, currentUser]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemPrice,
    getCartTotal,
    getTotalPrice, // backwards compatibility
    getActiveDiscount,
    getNextTierInfo,
    getPixBenefitEligibility
  };
}