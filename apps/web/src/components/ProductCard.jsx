import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Link as LinkIcon, ShoppingCart, QrCode, Package, Zap, Crown, PiggyBank, DollarSign, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import { useAuth } from '@/context/AuthContext.jsx';
import { useCart } from '@/hooks/useCart.js';
import { descontosService } from '@/services/descontosService.js';

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

  // Detecção robusta e sanitizada de estoque (Portão Nemotron)
  const parseStockNumber = (val) => {
    if (val === undefined || val === null || val === '') return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };
  const parsedRawStock = parseStockNumber(data.stock ?? data.estoque ?? data.estoque_restante);
  const isOutOfStock = parsedRawStock !== null && parsedRawStock <= 0;
  const stock = !isOutOfStock 
    ? (parsedRawStock !== null ? parsedRawStock : ((seed % 14) + 2))
    : 0;

  // Quantidade de peças despachadas acima de 1.000 com variação natural e determinística por produto
  const soldCount = data.vendidos_semana || (1150 + ((seed * 37) % 1850)); // de 1.150 a 2.999
  const soldFormatted = Number(soldCount).toLocaleString('pt-BR');

  // Preço de Varejo Sugerido para a Revendedora revender com margem digna de boutique (~70% de margem ou campo específico)
  const suggestedRetailPrice = data.preco_sugerido_revenda || data.preco_sugerido || (wholesalePrice > 0 ? wholesalePrice * 1.7 : price * 1.5);
  const profitPerPiece = suggestedRetailPrice - wholesalePrice;
  const profitMarginPercent = wholesalePrice > 0 ? Math.round((profitPerPiece / wholesalePrice) * 100) : 70;
  const wholesaleSavingsPercent = price > 0 ? Math.round((1 - (wholesalePrice / price)) * 100) : 45;

  const { configuracoes } = useCart();

  // 1. Limite dinâmico do gatilho configurado no painel admin (Configurações > Descontos > Gatilhos & Regras)
  const limiteUpgrade = configuracoes?.limite_upgrade_revenda != null 
    ? parseFloat(configuracoes.limite_upgrade_revenda) 
    : 69.90;

  // 2. Maior porcentagem configurada no painel admin (Configurações > Descontos > Varejo ou Atacado)
  const faixasProgressivas = isReseller
    ? (configuracoes?.desconto_progressivo_faixas_revenda || [])
    : (configuracoes?.desconto_progressivo_faixas || []);

  const maxProgressivePct = faixasProgressivas.length > 0
    ? Math.max(...faixasProgressivas.map(f => Number(f.percentual) || 0))
    : (isReseller ? 15 : 10);

  // Parcelamento no cartão: respeita a parcela mínima de R$ 9,90 e limite de 6x
  const calcMaxInstallments = Math.min(6, Math.floor(activePrice / 9.90));
  const installmentText = calcMaxInstallments >= 2
    ? `em até ${calcMaxInstallments}x no cartão`
    : 'No cartão em até 6x';

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
    const target = Array.isArray(filename) ? filename[0] : filename;
    if (!target) return 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante+Lingerie';
    if (typeof target === 'string' && (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('data:'))) {
      return target;
    }
    try {
      const getUrlFn = pb.files.getURL ? pb.files.getURL.bind(pb.files) : pb.files.getUrl.bind(pb.files);
      return getUrlFn(record, target);
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

  const handleEncomendaClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'encomenda_fabrica_click',
          productId: id,
          productName: name,
          reference: reference
        });
      }
    } catch (_) {}
    navigate(`/produto/${id}`);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-gray-100/90 hover:border-[#c59b5f]/40 hover:shadow-[0_12px_30px_rgba(197,155,95,0.12)] hover:-translate-y-1.5 transition-all duration-400 h-full w-full max-w-sm mx-auto relative overflow-hidden">

      {/* 1. Image Section */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shrink-0">
        <Link to={`/produto/${id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x533/1a1a1a/c59b5f?text=Avante'; e.currentTarget.onerror = null; }}
          />
          <img
            src={hoverImage}
            alt={`${name} - detalhe`}
            className="absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
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
                className="w-[18px] h-[18px] rounded-full border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400 hover:border-[#c59b5f] hover:text-[#c59b5f] transition-all bg-white"
                onClick={(e) => { e.preventDefault(); navigate(`/produto/${id}`); }}
              >
                +{colors.length - 4}
              </button>
            )}
          </div>
        )}

        {/* 6. Price & Dual-Price Wholesale Section */}
        {isReseller ? (
          /* MODO REVENDEDORA OFICIAL LOGADA */
          <div className="mb-3 bg-gradient-to-br from-[#121212] via-[#1a1714] to-[#121212] text-white p-3.5 rounded-xl border border-[#c59b5f]/40 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase tracking-widest text-[#c59b5f] font-bold flex items-center gap-1">
                <Crown className="w-3 h-3 text-[#c59b5f]" /> Seu Custo de Fábrica
              </span>
              <span className="text-[10px] text-gray-400 line-through">
                Sugerido: {formatPrice(suggestedRetailPrice)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">
                {formatPrice(wholesalePrice)}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                +{profitMarginPercent}% Margem
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
              <span>Seu lucro líquido por peça:</span>
              <span className="font-bold text-emerald-400">{formatPrice(profitPerPiece)}</span>
            </div>
          </div>
        ) : (
          /* MODO VAREJO ELEGANTE COM GANCHO DE ATACADO DIRETO DA FÁBRICA */
          <div className="mb-3 flex flex-col gap-2">
            {/* Linha de Preço Varejo Principal */}
            <div className="flex items-baseline justify-between">
              <div className="flex flex-col">
                {activeOldPrice > activePrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">
                    {formatPrice(activeOldPrice)}
                  </span>
                )}
                <span className="text-2xl sm:text-[26px] font-bold text-gray-900 tracking-tight leading-none">
                  {formatPrice(activePrice)}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium text-right">
                {installmentText}
              </span>
            </div>

            {/* O Selo / Gancho Elegante de Atacado da Fábrica */}
            <div className="bg-gradient-to-r from-[#FFFBF5] via-[#FCF9F2] to-[#FAF5EC] border border-[#C59B5F]/35 rounded-xl p-2.5 flex items-center justify-between shadow-[0_2px_8px_rgba(197,155,95,0.06)]">
              <div className="flex flex-col pr-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#8C6D3B] flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#C59B5F]" /> No Atacado de Fábrica
                </span>
                <span 
                  className="text-[10px] text-gray-500 font-normal leading-tight mt-0.5" 
                  title="Valor mínimo somado de itens na sacola para liberar preço de custo"
                >
                  Pedido mín. {formatPrice(limiteUpgrade)} na sacola
                </span>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm sm:text-base font-extrabold text-[#9A7432] leading-none">
                  {formatPrice(wholesalePrice)}
                  <span className="text-[10px] font-normal text-gray-500">/un</span>
                </span>
                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50/80 px-1.5 py-0.5 rounded-full border border-emerald-200/50 mt-0.5">
                  Economize {wholesaleSavingsPercent}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 7. Micro-pills de Benefícios (Discretos e Leves, sem botões falsos) */}
        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
          <div 
            className="bg-emerald-50/80 border border-emerald-200/60 rounded-lg py-1 px-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-800 cursor-default"
            title="5% de desconto automático finalizando o pedido via PIX"
          >
            <QrCode size={11} className="text-emerald-700 shrink-0" />
            <span className="truncate">{isReseller ? 'PIX +5% EXTRA' : 'PIX 5% OFF'}</span>
          </div>
          <div 
            className="bg-[#FAF7F2] border border-[#C59B5F]/25 rounded-lg py-1 px-2 flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#8C6D3B] cursor-default"
            title="Desconto progressivo automático por volume de compra configurado no painel admin"
          >
            <Zap size={11} className="text-[#C59B5F] shrink-0" />
            <span className="truncate">ATÉ {maxProgressivePct}% PROGRESSIVO</span>
          </div>
        </div>

        {/* 8. Informações de Fábrica & Encomendas */}
        <div className="flex items-center justify-between text-[10px] text-gray-500 py-1.5 px-0.5 border-t border-gray-100 mb-2.5">
          <span className="flex items-center gap-1">
            <span className="text-xs">🏭</span> Fábrica: <strong className="text-gray-700 font-semibold">{soldFormatted}</strong> despachadas
          </span>
          <button
            type="button"
            onClick={handleEncomendaClick}
            className="flex items-center gap-1 text-gray-600 hover:text-[#9A7432] transition-colors duration-200 group text-left cursor-pointer"
            title="Clique para solicitar lotes, cores exclusivas ou encomendas sob medida diretamente com a fábrica"
          >
            <span className="text-xs group-hover:scale-110 transition-transform">📦</span>
            <span className="underline decoration-dotted underline-offset-2 font-medium hover:font-semibold">Aceitamos encomendas</span>
          </button>
        </div>

        {/* 9. Botão Único Principal de Ação (Camaleão: Pronta Entrega vs Encomenda de Fábrica) */}
        <div className="mt-auto">
          {isOutOfStock ? (
            <button
              onClick={handleEncomendaClick}
              aria-label="Comprar sob encomenda diretamente com a confecção"
              className="w-full h-11 sm:h-12 rounded-none font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer bg-[#c59b5f] hover:bg-[#b0874c] text-[#121212] border border-[#c59b5f]"
            >
              <span aria-hidden="true" className="text-sm">🧵</span>
              COMPRAR SOB ENCOMENDA
            </button>
          ) : (
            <button
              onClick={handleBuyClick}
              className={`w-full h-11 sm:h-12 rounded-none font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-[0.98] cursor-pointer ${
                isReseller
                  ? 'bg-gradient-to-r from-[#121212] via-[#241F18] to-[#121212] text-white hover:from-[#C59B5F] hover:to-[#DFC193] hover:text-black border border-[#C59B5F]/35'
                  : 'bg-[#121212] text-white hover:bg-[#C59B5F] hover:text-black hover:shadow-[0_4px_16px_rgba(197,155,95,0.25)]'
              }`}
            >
              <ShoppingCart size={15} />
              {isReseller ? 'ADICIONAR AO PEDIDO' : 'ADICIONAR À SACOLA'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
