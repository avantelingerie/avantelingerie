import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Link as LinkIcon, ShoppingCart, QrCode, Package, Zap, Crown, PiggyBank, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function ProductCard({
  produto,
  product,
  onComprarAgora,
  onAddToCart,
  onFavorite,
  isFavorited
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const data = produto || product || {};

  const id = data.id || 'default-id';
  const name = data.nome_produto || data.name || 'Produto Exclusivo Avante';

  const rawCategory = data.expand?.categoria_id?.nome || data.categoria || data.category || 'Lingerie';
  const category = typeof rawCategory === 'string'
    ? rawCategory
    : (Array.isArray(rawCategory) && rawCategory.length > 0 ? rawCategory[0] : 'Lingerie');

  const reference = data.referencia || data.reference || data.id?.substring(0, 7).toUpperCase() || 'AVL0001';

  const price = data.preco_varejo || data.price || 0;
  const oldPrice = data.preco_antigo || data.original_price || data.oldPrice || (price * 1.3);

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';
  const wholesalePrice = data.preco_atacado || data.price_wholesale || (price * 0.6);

  const activePrice = isReseller ? wholesalePrice : price;
  const activeOldPrice = isReseller ? price : oldPrice;

  const safeDiv = activeOldPrice > 0 ? activePrice / activeOldPrice : 0;
  const discount = data.badge_desconto || data.discount_percentage || Math.round((1 - safeDiv) * 100) || 15;

  const rating = data.nota || data.avaliacao_media || data.rating || 5.0;
  const reviewsCount = data.quantidade_avaliacoes || data.reviews_count || 128;
  
  // Pseudo-random baseado no ID para os números não piscarem e variarem por produto
  const hashStr = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };
  const seed = hashStr(id);
  const stock = data.estoque_restante || data.stock || ((seed % 14) + 2); // de 2 a 15
  const sold = data.vendidos_semana || ((seed % 82) + 12); // de 12 a 93

  const profitPerPiece = price - wholesalePrice;
  const profitMarginPercent = wholesalePrice > 0 ? Math.round((profitPerPiece / wholesalePrice) * 100) : 0;

  // Helper mapper to convert color names into beautiful solid hex circles
  const getColorHex = (colorName) => {
    if (!colorName) return '#c59b5f';
    let cleanName = colorName.trim().toLowerCase();

    // Replace hyphens and underscores with spaces to unify names like "verde-militar" to "verde militar"
    cleanName = cleanName.replace(/[-_]/g, ' ');

    if (cleanName.startsWith('#') || cleanName.startsWith('rgb') || cleanName.startsWith('hsl')) {
      return colorName;
    }

    // Match specific compound colors or names first
    if (cleanName.includes('verde militar') || cleanName.includes('verde oliva') || cleanName.includes('musgo')) {
      return '#4B5320'; // Olive/Military Green
    }
    if (cleanName.includes('azul marinho') || cleanName.includes('marinho')) {
      return '#0A192F'; // Navy Blue
    }
    if (cleanName.includes('tiffany') || cleanName.includes('azul tiffany')) {
      return '#0ABAB5';
    }
    if (cleanName.includes('rosa sensacional') || cleanName.includes('rosa chiclete')) {
      return '#FF69B4';
    }
    if (cleanName.includes('bordo') || cleanName.includes('bordô') || cleanName.includes('vinho')) {
      return '#722F37'; // Wine / Burgundy
    }
    if (cleanName.includes('nude') || cleanName.includes('pele')) {
      return '#E3C1B2';
    }
    if (cleanName.includes('chocolate') || cleanName.includes('cacau')) {
      return '#5C4033';
    }
    if (cleanName.includes('lavanda') || cleanName.includes('lilas') || cleanName.includes('lilás')) {
      return '#C8A2C8';
    }
    if (cleanName.includes('menta') || cleanName.includes('verde menta')) {
      return '#98FF98';
    }
    if (cleanName.includes('pessego') || cleanName.includes('pêssego')) {
      return '#FFDAB9';
    }
    if (cleanName.includes('chumbo') || cleanName.includes('grafite')) {
      return '#3A3F47';
    }
    if (cleanName.includes('caramelo') || cleanName.includes('avelã') || cleanName.includes('avela')) {
      return '#C68E17';
    }
    if (cleanName.includes('terra') || cleanName.includes('terracota')) {
      return '#D97443';
    }

    // Match generic colors (handling feminine/plural forms like "preta", "brancas", "vermelhas")
    if (cleanName.includes('pret') || cleanName.includes('black')) {
      return '#0F0F0F';
    }
    if (cleanName.includes('branc') || cleanName.includes('white')) {
      return '#FFFFFF';
    }
    if (cleanName.includes('vermelh') || cleanName.includes('red')) {
      return '#DC2626';
    }
    if (cleanName.includes('azul') || cleanName.includes('blue')) {
      return '#1E3A8A';
    }
    if (cleanName.includes('rosa') || cleanName.includes('pink')) {
      return '#EC4899';
    }
    if (cleanName.includes('amarel') || cleanName.includes('yellow')) {
      return '#FBBF24';
    }
    if (cleanName.includes('verd') || cleanName.includes('green')) {
      return '#10B981';
    }
    if (cleanName.includes('marrom') || cleanName.includes('brown')) {
      return '#78350F';
    }
    if (cleanName.includes('bege') || cleanName.includes('beige')) {
      return '#F5F5DC';
    }
    if (cleanName.includes('crem') || cleanName.includes('cream')) {
      return '#FFFDD0';
    }
    if (cleanName.includes('cinz') || cleanName.includes('cinc') || cleanName.includes('grey') || cleanName.includes('gray')) {
      return '#6B7280';
    }
    if (cleanName.includes('violet') || cleanName.includes('purple') || cleanName.includes('rox')) {
      return '#8F00FF';
    }
    if (cleanName.includes('fucsia') || cleanName.includes('fúcsia')) {
      return '#FF00FF';
    }
    if (cleanName.includes('coral')) {
      return '#FF7F50';
    }
    if (cleanName.includes('safira')) {
      return '#0F52BA';
    }
    if (cleanName.includes('rubi')) {
      return '#E0115F';
    }
    if (cleanName.includes('esmeralda')) {
      return '#50C878';
    }
    if (cleanName.includes('perola') || cleanName.includes('pérola')) {
      return '#FDEEF4';
    }
    if (cleanName.includes('ouro') || cleanName.includes('gold')) {
      return '#D4AF37';
    }

    // Default static mapping as a fallback
    const colorMap = {
      'preto': '#0F0F0F',
      'branco': '#FFFFFF',
      'vermelho': '#DC2626',
      'azul': '#1E3A8A',
      'rosa': '#EC4899',
      'amarelo': '#FBBF24',
      'verde': '#10B981',
      'marrom': '#78350F',
      'bege': '#F5F5DC',
      'creme': '#FFFDD0',
      'cinza': '#6B7280',
      'cinca': '#6B7280',
      'vinho': '#722F37',
      'sensual': '#8B0000',
      'chocolate': '#5C4033',
      'romance': '#FFC0CB',
      'marinho': '#0A192F',
      'tiffany': '#0ABAB5',
      'bordo': '#800020',
      'bordô': '#800020',
      'lavanda': '#E6E6FA',
      'coral': '#FF7F50',
      'terra': '#C27D38',
      'nude': '#E3C1B2',
      'safira': '#0F52BA',
      'rubi': '#E0115F',
      'esmeralda': '#50C878',
      'perola': '#FDEEF4',
      'pérola': '#FDEEF4',
      'ouro': '#D4AF37',
      'violeta': '#8F00FF',
      'fúcsia': '#FF00FF',
      'fucsia': '#FF00FF',
      'terracota': '#D97443',
      'canela': '#A0522D',
      'avelã': '#AE8A67',
      'avela': '#AE8A67',
      'lilás': '#C8A2C8',
      'lilas': '#C8A2C8',
      'menta': '#98FF98',
      'ameixa': '#DDA0DD',
      'pêssego': '#FFDAB9',
      'pessego': '#FFDAB9',
      'chumbo': '#3A3F47',
      'grafite': '#4B5358',
      'caramelo': '#C68E17',
    };

    if (colorMap[cleanName]) {
      return colorMap[cleanName];
    }

    // Hash-based deterministic premium color generation for custom color names
    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
      hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    const s = 40 + (Math.abs(hash >> 1) % 25); // 40% - 65% saturation for elegant tones
    const l = 40 + (Math.abs(hash >> 2) % 15); // 40% - 55% lightness for premium visibility
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  // Colors handling - dynamically converting names to gorgeous circles!
  let rawColors = data.cores_disponiveis || data.colors || [];
  if (typeof rawColors === 'string') {
    rawColors = rawColors.split(',').map(c => c.trim()).filter(Boolean);
  }
  if (!Array.isArray(rawColors)) rawColors = [];
  const colors = rawColors
    .filter(Boolean)
    .map(c => {
      if (typeof c === 'string') return getColorHex(c);
      if (typeof c === 'object') return getColorHex(c.hex || c.value || c.nome || c.name || '#000');
      return '#c59b5f';
    });
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const getProductImage = (record, filename) => {
    if (!filename) return 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante+Lingerie';
    if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
      return filename;
    }
    try {
      return pb.files.getUrl(record, filename);
    } catch (err) {
      console.error('[ProductCard] Erro ao obter URL da imagem no PocketBase:', err);
      return 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante+Lingerie';
    }
  };

  const mainImage = getProductImage(data, data.imagem_principal || data.imagem_produto || data.image);
  const gallery = data.gallery || [];
  const hoverImage = data.imagem_verso
    ? getProductImage(data, data.imagem_verso)
    : (gallery.length > 1
      ? getProductImage(data, gallery[1])
      : (Array.isArray(data.imagem_produto) && data.imagem_produto.length > 1
        ? getProductImage(data, data.imagem_produto[1])
        : mainImage));

  const [localFav, setLocalFav] = useState(false);
  const isFav = isFavorited !== undefined ? isFavorited : localFav;

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(id, !isFav);
    } else {
      setLocalFav(!isFav);
      toast.success(!isFav ? "Adicionado aos favoritos" : "Removido dos favoritos");
    }
  };

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(data);
    } else if (onComprarAgora) {
      onComprarAgora(data);
    } else {
      navigate(`/produto/${id}`);
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-[#c59b5f]/15 overflow-hidden shadow-premium-sm hover:-translate-y-2 hover:shadow-premium hover:border-[#c59b5f]/40 transition-all duration-500 h-full w-full max-w-sm mx-auto relative">

      {/* 1. Image Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FFFBF8] shrink-0">
        <Link to={`/produto/${id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante'; e.currentTarget.onerror = null; }}
          />
          <img
            src={hoverImage}
            alt={`${name} - detalhe`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante'; e.currentTarget.onerror = null; }}
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className={`absolute top-3 left-3 z-10 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-lg shadow-md ${isReseller ? 'bg-gradient-to-r from-[#c59b5f] to-[#e5c595] text-black border border-[#c59b5f]/20' : 'bg-red-600'}`}>
            {isReseller ? `Atacado -${discount}%` : `-${discount}%`}
          </div>
        )}

        {/* Reseller Exclusive Badge */}
        {isReseller && (
          <div className="absolute top-3 left-[110px] z-10 bg-[#121212] border border-[#c59b5f]/30 text-[#c59b5f] text-[9px] uppercase tracking-widest font-bold px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-sm bg-black/80">
            <Crown className="w-3 text-[#c59b5f] animate-pulse" /> Revenda
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md border border-[#c59b5f]/15"
          aria-label="Favoritar"
        >
          <Heart
            className={`w-4.5 h-4.5 transition-colors duration-300 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 md:p-5 bg-card">

        {/* 2. Category + REF */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs text-gray-400 mb-2 font-medium">
          <Link
            to={`/categoria/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex items-center gap-1 hover:text-[#c59b5f] transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <LinkIcon size={11} className="text-[#c59b5f]/70" />
            <span className="uppercase tracking-wider">{category}</span>
          </Link>
          <span className="tracking-wide text-gray-400/80">REF: {reference}</span>
        </div>

        {/* 3. Product Name */}
        <Link to={`/produto/${id}`} className="block mb-2 flex-shrink-0">
          <h3 className="text-gray-900 font-serif font-bold text-sm sm:text-base leading-snug line-clamp-2 hover:text-[#c59b5f] transition-colors min-h-[2.5rem]">
            {name}
          </h3>
        </Link>

        {/* 4. Rating Section */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-[#c59b5f] text-[#c59b5f]' : 'fill-gray-100 text-gray-200'}`}
              />
            ))}
          </div>
          <span className="font-bold text-gray-900 text-xs">{rating.toFixed(1)}</span>
          <span className="text-gray-400 text-[10px]">({reviewsCount} avaliações)</span>
        </div>

        {/* 5. Color Swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {colors.slice(0, 4).map((cor, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); setSelectedColorIdx(idx); }}
                className={`w-[18px] h-[18px] rounded-full border transition-all duration-200 ${selectedColorIdx === idx ? 'border-[#c59b5f] ring-1 ring-[#c59b5f] scale-110' : 'border-gray-200 hover:border-gray-400'}`}
                style={{ backgroundColor: cor }}
                aria-label={`Selecionar cor ${idx + 1}`}
              />
            ))}
            {colors.length > 4 && (
              <button
                className="w-[18px] h-[18px] rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400 hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all bg-[#FFFBF8]"
                onClick={(e) => { e.preventDefault(); navigate(`/produto/${id}`); }}
              >
                +{colors.length - 4}
              </button>
            )}
          </div>
        )}

        {/* 6. Price Section */}
        <div className="flex flex-row justify-between items-end w-full mb-3 min-h-[42px] border-b border-[#c59b5f]/5 pb-2.5">
          <div className="flex flex-col">
            {isReseller ? (
              <>
                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Sugerido Venda:</span>
                <span className="text-xs text-gray-500 font-medium leading-none">
                  {formatPrice(price)}
                </span>
              </>
            ) : (
              activeOldPrice > activePrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatPrice(activeOldPrice)}
                </span>
              )
            )}
          </div>
          <div className="flex flex-col items-end">
            {isReseller && (
              <span className="text-[9px] uppercase tracking-widest text-[#c59b5f] font-bold mb-0.5 flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5" /> Seu Custo:
              </span>
            )}
            <span className={`font-bold leading-none tracking-tight ${isReseller ? 'text-lg md:text-xl text-gray-900' : 'text-xl sm:text-2.5xl text-gray-900'}`}>
              {formatPrice(activePrice)}
            </span>
          </div>
        </div>

        {/* Profit Simulation for Resellers */}
        {isReseller && (
          <div className="mb-4 bg-gradient-to-br from-[#FFFBF8] to-[#FCF9F5] border border-[#c59b5f]/20 rounded-2xl p-3 flex items-center justify-between shadow-premium-sm text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#c59b5f]/10 text-[#c59b5f] flex items-center justify-center shrink-0">
                <PiggyBank className="w-4.5 h-4.5 text-[#c59b5f]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Você Lucra por Peça:</span>
                <span className="text-sm font-bold text-gray-800 tracking-tight leading-tight">
                  {formatPrice(profitPerPiece)}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-500/20 px-2 py-0.5 rounded-full shadow-[0_2px_6px_rgba(5,150,105,0.2)]">
              +{profitMarginPercent}% Margem
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">

          <button
            className="w-full bg-[#121212] hover:bg-black text-[#c59b5f] border border-[#c59b5f]/30 flex justify-center items-center gap-1.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-pointer"
            onClick={handleBuyClick}
          >
            <QrCode size={13} /> {isReseller ? 'PAGUE NO PIX +5% OFF EXTRA' : 'PAGUE NO PIX 5% OFF'}
          </button>

          <button
            className="w-full bg-[#1a1a1a] hover:bg-[#121212] text-[#c59b5f] border border-[#c59b5f]/20 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-pointer"
            onClick={handleBuyClick}
          >
            {isReseller ? 'ATÉ 15% EXTRA PROGRESSIVO ATACADO' : 'ATÉ 20% OFF PROGRESSIVO'}
          </button>

          <div className="flex flex-col gap-1 my-1.5 bg-gradient-to-br from-[#FFFBF8] to-[#FCF9F5] p-2.5 rounded-xl border border-[#c59b5f]/15 shadow-premium-sm">
            <div className="text-gray-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5">
              <span className="shrink-0 text-[#c59b5f] text-sm">🏭</span>
              <span>Direto da Fábrica: <span className="text-[#c59b5f]">{sold}</span> peças despachadas!</span>
            </div>
            <div className="text-gray-800 text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5">
              <span className="shrink-0 text-[#c59b5f] text-sm">📦</span>
              <span>Pronta-entrega: <span className="text-[#c59b5f]">{stock}</span> un. (Aceitamos encomendas)</span>
            </div>
          </div>

          <button
            onClick={handleBuyClick}
            className={`w-full h-[52px] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-premium-sm active:scale-[0.98] cursor-pointer ${isReseller
                ? 'bg-gradient-to-r from-[#121212] to-[#251f15] text-white hover:from-[#c59b5f] hover:to-[#e5c595] hover:text-black border border-[#c59b5f]/30'
                : 'bg-[#121212] text-white hover:bg-[#c59b5f] hover:text-black'
              }`}
          >
            <ShoppingCart size={15} />
            {isReseller ? 'ADICIONAR AO LOTE' : 'ADICIONAR À SACOLA'}
          </button>

        </div>
      </div>
    </div>
  );
}