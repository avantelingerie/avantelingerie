import React, { useEffect, useState } from 'react';
import { Sparkles, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function CheckoutMicroOffer() {
  const { cart, addToCart, getItemPrice } = useCart();
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Helper to resolve product image URLs correctly
  const getProductImage = (record) => {
    if (!record) return 'https://placehold.co/100x100/1a1a1a/c59b5f?text=Avante';
    
    // Check various image filename fields
    let filename = record.imagem_principal || record.imagem_produto;
    if (!filename && record.image) {
      filename = Array.isArray(record.image) 
        ? record.image[0] 
        : record.image;
    }
    if (!filename && record.gallery) {
      filename = Array.isArray(record.gallery)
        ? record.gallery[0]
        : record.gallery;
    }
    
    if (!filename) {
      return 'https://placehold.co/100x100/1a1a1a/c59b5f?text=Avante';
    }
    
    if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
      return filename;
    }
    
    try {
      // Use standard SDK getURL and convert relative paths to absolute URLs
      const rawUrl = pb.files.getURL ? pb.files.getURL(record, filename) : pb.files.getUrl(record, filename);
      if (typeof window !== 'undefined' && rawUrl && !rawUrl.startsWith('http')) {
        return `${window.location.origin}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;
      }
      return rawUrl;
    } catch (err) {
      console.error('[CheckoutMicroOffer] Erro ao obter URL da imagem no PocketBase:', err);
      return 'https://placehold.co/100x100/1a1a1a/c59b5f?text=Avante';
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const fetchOffer = async () => {
      if (cart.length === 0) return;
      
      try {
        let recommendedProduct = null;
        
        // 1. Try to find a product in the same category as the first item in the cart
        try {
          const firstCartItem = cart[0];
          const fullProduct = await pb.collection('products').getOne(firstCartItem.id, { $autoCancel: false });
          
          if (fullProduct && fullProduct.categoria_id) {
            // Fetch products in the same category
            const resSameCategory = await pb.collection('products').getList(1, 10, {
              filter: `categoria_id = "${fullProduct.categoria_id}" && status = true`,
              sort: '-created',
              $autoCancel: false
            });
            
            // Find one not already in the cart
            recommendedProduct = resSameCategory.items.find(item => !cart.some(c => c.id === item.id));
          }
        } catch (err) {
          console.log("[CheckoutMicroOffer] Category matching fallback triggered:", err.message);
        }
        
        // 2. If no same-category recommendation found, fallback to 10 recent products
        if (!recommendedProduct) {
          const resRecent = await pb.collection('products').getList(1, 10, {
            filter: 'status = true',
            sort: '-created',
            $autoCancel: false
          });
          
          recommendedProduct = resRecent.items.find(item => !cart.some(c => c.id === item.id));
        }
        
        if (isMounted) {
          if (recommendedProduct) {
            setProduct(recommendedProduct);
          } else {
            setIsVisible(false);
          }
        }
      } catch (err) {
        console.error("[CheckoutMicroOffer] Failed to fetch micro-offer", err);
      }
    };
    
    fetchOffer();
    return () => { isMounted = false; };
  }, [cart]);

  if (!product || !isVisible) return null;

  const isReseller = currentUser?.commercial_profile === 'reseller' || 
                     currentUser?.tipo_cliente === 'revendedor' ||
                     pb.authStore.model?.commercial_profile === 'reseller' ||
                     pb.authStore.model?.tipo_cliente === 'revendedor';

  const activePrice = getItemPrice(product);
  const retailPrice = product.preco_varejo || product.price || 0;
  const wholesalePrice = product.preco_atacado || product.price_wholesale || (retailPrice * 0.6);

  const handleAdd = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.nome_produto || product.name || 'Produto Avante Lingerie',
        price: activePrice,
        image: getProductImage(product),
        selectedSize: 'M',
        selectedColor: 'Padrão',
        quantity: 1,
        stock: product.stock || product.estoque_restante || 10,
        preco_varejo: retailPrice,
        preco_atacado: wholesalePrice,
        sku: product.reference || ''
      });
      setIsVisible(false);
    }, 500); // Simulate brief network/processing delay for realism
  };

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  const imgUrl = getProductImage(product);

  return (
    <div className="relative bg-[#FFF8E1] border border-[#D4AF37]/40 rounded-xl p-4 mb-6 shadow-sm overflow-hidden group">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-[#8B7355]/50 hover:text-[#8B7355] transition-colors rounded-full hover:bg-[#D4AF37]/10"
        aria-label="Ignorar oferta"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#8B7355]">Complete seu pedido</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0 border border-[#D4AF37]/20 shadow-sm flex items-center justify-center">
          <img 
            src={imgUrl} 
            alt={product.nome_produto || product.name} 
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/1a1a1a/c59b5f?text=Avante'; e.currentTarget.onerror = null; }}
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <span className="text-sm font-bold text-foreground line-clamp-1">{product.nome_produto || product.name}</span>
          <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {isReseller ? 'Desconto especial atacado' : 'Condição especial apenas agora'}
          </span>
          <span className="text-sm font-extrabold text-[#c59b5f] mt-1">{formatPrice(activePrice)}</span>
        </div>

        <Button 
          size="sm" 
          onClick={handleAdd}
          disabled={isAdding}
          className="shrink-0 bg-[#3A2E2A] hover:bg-[#2A1E1A] text-white rounded-lg px-3 transition-all active:scale-95 shadow-sm"
        >
          {isAdding ? (
            <span className="opacity-70 text-xs">Adicionando...</span>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1 text-[#D4AF37]" />
              <span className="text-xs font-bold">Adicionar</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}