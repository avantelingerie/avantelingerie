import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Heart, Tag, Ruler, ShoppingBag,
  CheckCircle2, RefreshCw, Truck, ChevronRight, X,
  Zap, Eye, Wind, Sparkles, Move, Shield, Droplet, Crown, Leaf, PiggyBank, Award, DollarSign,
  Minus, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from '@/components/ui/dialog.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel.jsx';
import pb from '@/lib/pocketbaseClient.js';
import ProductCard from '@/components/ProductCard.jsx';
import { trackViewContent, trackAddToCart } from '@/lib/marketingPixels.js';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import ProgressiveDiscountBar from '@/components/ProgressiveDiscountBar.jsx';
import PixInfoBlock from '@/components/PixInfoBlock.jsx';
import SocialProofStats from '@/components/SocialProofStats.jsx';
import TrustSection from '@/components/TrustSection.jsx';
import QuantitySelector from '@/components/QuantitySelector.jsx';
import { useCart } from '@/hooks/useCart.js';
import { useAuth } from '@/context/AuthContext.jsx';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, getTotalPrice, getPixBenefitEligibility } = useCart();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [variacoesList, setVariacoesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(true);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  const [benefitsApi, setBenefitsApi] = useState(null);
  const [currentBenefitSlide, setCurrentBenefitSlide] = useState(0);
  const [benefitSnaps, setBenefitSnaps] = useState([]);
  const [isBenefitsHovered, setIsBenefitsHovered] = useState(false);

  const fallbackProduct = {
    id: id || 'AVL0001',
    name: 'Conjunto em Microfibra Cropped Regata Gola Alta',
    categoria: 'CONJUNTOS',
    referencia: 'AVL0001',
    description: 'Conforto que abraça seu corpo e valoriza cada curva sem marcar.',
    avaliacao_media: 4.8,
    reviews_count: 124,
    vendidos_semana: 1200,
    price: 19.90,
    oldPrice: 55.23,
    stock: 17,
    discount: 64,
    installments: 6,
    image: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/e0ba3020c78377b123dc4a5786ff6c64.png',
    gallery: [
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c2d4624557c0de0eb4a45ebd8f3f9385.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/021cb0190198eb005ad0498485c5e02a.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/684efea9860acc8caab24e49f3eebf28.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/9331fd1b840bbc52cc06e34b807d7083.jpg'
    ]
  };

  const galleryAltTexts = [
    'Detalhe frontal do conjunto premium',
    'Detalhe das costas e caimento',
    'Modelo vestindo o conjunto premium',
    'Acabamento e costuras de alta costura'
  ];

  const getColorHex = (colorName) => {
    if (!colorName) return '#c59b5f';
    let cleanName = colorName.trim().toLowerCase();

    cleanName = cleanName.replace(/[-_]/g, ' ');

    if (cleanName.startsWith('#') || cleanName.startsWith('rgb') || cleanName.startsWith('hsl')) {
      return colorName;
    }

    if (cleanName.includes('verde militar') || cleanName.includes('verde oliva') || cleanName.includes('musgo')) {
      return '#4B5320';
    }
    if (cleanName.includes('azul marinho') || cleanName.includes('marinho')) {
      return '#0A192F';
    }
    if (cleanName.includes('tiffany') || cleanName.includes('azul tiffany')) {
      return '#0ABAB5';
    }
    if (cleanName.includes('rosa sensacional') || cleanName.includes('rosa chiclete')) {
      return '#FF69B4';
    }
    if (cleanName.includes('bordo') || cleanName.includes('bordô') || cleanName.includes('vinho')) {
      return '#722F37';
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

    let hash = 0;
    for (let i = 0; i < cleanName.length; i++) {
      hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    const s = 40 + (Math.abs(hash >> 1) % 25);
    const l = 40 + (Math.abs(hash >> 2) % 15);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const getSizingTableData = (categoryName) => {
    const cat = (categoryName || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (cat.includes('sutia') || cat.includes('conjunto')) {
      return {
        title: 'Tabela de Sutiãs & Conjuntos',
        headers: ['Tamanho', 'Manequim', 'Busto (cm)', 'Cintura (cm)', 'Quadril (cm)'],
        rows: [
          ['P', '38 – 40', '84 – 88 cm', '66 – 72 cm', '90 – 96 cm'],
          ['M', '42', '89 – 94 cm', '73 – 78 cm', '97 – 102 cm'],
          ['G', '44', '95 – 102 cm', '79 – 86 cm', '103 – 110 cm'],
          ['GG', '46', '103 – 110 cm', '87 – 94 cm', '111 – 118 cm']
        ],
        intro: 'A medida do busto determina a taça e o tórax/sob busto determina a largura da base do sutiã para sustentação ideal.'
      };
    }
    if (cat.includes('calcinha') || cat.includes('tang') || cat.includes('fio') || cat.includes('calc') || cat.includes('cuec')) {
      return {
        title: 'Tabela de Calcinhas / Fios',
        headers: ['Tamanho', 'Manequim BR', 'Quadril (cm)'],
        rows: [
          ['P', '36 – 38', '88 – 96 cm'],
          ['M', '40 – 42', '97 – 102 cm'],
          ['G', '44', '103 – 110 cm'],
          ['GG', '46 – 48', '111 – 118 cm']
        ],
        intro: 'Para calcinhas, a medida do quadril é o principal indicador para assegurar um caimento sem marcas e com conforto absoluto.'
      };
    }
    if (cat.includes('body') || cat.includes('bodys') || cat.includes('bodie')) {
      return {
        title: 'Tabela de Bodys',
        headers: ['Tamanho', 'Busto (cm)', 'Cintura (cm)', 'Quadril (cm)', 'Tronco (cm)'],
        rows: [
          ['P', '80 – 88 cm', '60 – 68 cm', '84 – 92 cm', '66 – 68 cm'],
          ['M', '88 – 96 cm', '68 – 76 cm', '92 – 100 cm', '69 – 71 cm'],
          ['G', '96 – 104 cm', '76 – 84 cm', '100 – 108 cm', '72 – 74 cm'],
          ['GG', '104 – 112 cm', '84 – 92 cm', '108 – 116 cm', '75 – 77 cm']
        ],
        intro: 'Por ser peça única, meça o busto, cintura e quadril. A flexibilidade do tecido garante a vestibilidade em alturas variadas.',
        alert: 'Se você tiver o tronco longo (altura acima de 1.72m), recomendamos escolher um tamanho acima.'
      };
    }
    if (cat.includes('pijama') || cat.includes('camisola') || cat.includes('sleepwear') || cat.includes('shortdoll')) {
      return {
        title: 'Tabela de Pijamas',
        headers: ['Tamanho', 'Busto / Cropped (cm)', 'Quadril / Shorts / Calça (cm)', 'Caimento Sugerido'],
        rows: [
          ['P', '82 – 90 cm', '86 – 94 cm', 'Fluido, Soltinho e Macio'],
          ['M', '90 – 98 cm', '94 – 102 cm', 'Fluido, Soltinho e Macio'],
          ['G', '98 – 106 cm', '102 – 110 cm', 'Fluido, Soltinho e Macio'],
          ['GG', '106 – 114 cm', '110 – 118 cm', 'Fluido, Soltinho e Macio']
        ],
        intro: 'Linha Sleepwear criada para proporcionar fluidez e leveza absoluta em momentos de descanso.'
      };
    }
    if (cat.includes('cropped')) {
      return {
        title: 'Tabela de Croppeds',
        headers: ['Tamanho', 'Busto (cm)', 'Comprimento (cm)', 'Elasticidade'],
        rows: [
          ['P', '80 – 88 cm', '38 cm', 'Alta Elasticidade'],
          ['M', '88 – 96 cm', '40 cm', 'Alta Elasticidade'],
          ['G', '96 – 104 cm', '42 cm', 'Alta Elasticidade'],
          ['GG', '104 – 112 cm', '44 cm', 'Alta Elasticidade']
        ],
        intro: 'Nossos croppeds possuem modelagens estruturadas que servem perfeitamente tanto como lingerie de luxo quanto para outwear.'
      };
    }

    return {
      title: 'Tabela de Medidas Geral',
      headers: ['Tamanho', 'Manequim', 'Busto (cm)', 'Cintura (cm)', 'Quadril (cm)'],
      rows: [
        ['P', '38 – 40', '84 – 88 cm', '66 – 72 cm', '90 – 96 cm'],
        ['M', '42', '89 – 94 cm', '73 – 78 cm', '97 – 102 cm'],
        ['G', '44', '95 – 102 cm', '79 – 86 cm', '103 – 110 cm'],
        ['GG', '46', '103 – 110 cm', '87 – 94 cm', '111 – 118 cm']
      ],
      intro: 'Escolha com segurança seu tamanho ideal utilizando nossa guia de medidas geral.'
    };
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedProduct;
        let fetchedVariacoes = [];
        const currentId = id;

        if (currentId) {
          try {
            fetchedProduct = await pb.collection('products').getOne(currentId, {
              expand: 'categoria_id',
              $autoCancel: false
            });
            fetchedVariacoes = await pb.collection('variacoes').getFullList({
              filter: `produto_id="${currentId}"`,
              $autoCancel: false
            });
          } catch (e) {
            console.log("Product not found by ID, attempting fallbacks...");
            try {
              const validProducts = await pb.collection('products').getList(1, 1, { sort: '-created', $autoCancel: false });
              if (validProducts?.items?.length > 0 && isMounted) {
                navigate(`/produto/${validProducts.items[0].id}`, { replace: true });
                return;
              }
            } catch (innerErr) {
              console.error("Error fetching fallback product list", innerErr);
            }
          }
        }

        if (isMounted) {
          if (fetchedProduct) {
            setProduct({ ...fallbackProduct, ...fetchedProduct });
          } else {
            setProduct(fallbackProduct);
          }
          setVariacoesList(fetchedVariacoes || []);
          setQuantity(1);
        }

        const categoryToMatch = fetchedProduct?.categoria || fallbackProduct.categoria;
        const categoryIdToMatch = fetchedProduct?.categoria_id;
        const prodId = fetchedProduct?.id || fallbackProduct.id;

        try {
          let relatedRes = await pb.collection('products').getList(1, 8, {
            filter: categoryIdToMatch
              ? `categoria_id = "${categoryIdToMatch}" && id != "${prodId}"`
              : `categoria = "${categoryToMatch}" && id != "${prodId}"`,
            sort: '-created',
            $autoCancel: false
          });

          if ((!relatedRes.items || relatedRes.items.length === 0) && isMounted) {
            relatedRes = await pb.collection('products').getList(1, 8, {
              filter: `id != "${prodId}"`,
              sort: '-created',
              $autoCancel: false
            });
          }

          if (isMounted) {
            setRelatedProducts(relatedRes.items || []);
          }
        } catch (relatedErr) {
          console.error("Error fetching related products:", relatedErr);
          if (isMounted) setRelatedProducts([]);
        }

      } catch (err) {
        console.error("Error fetching product data:", err);
        if (isMounted) {
          setProduct(fallbackProduct);
          setVariacoesList([]);
          setRelatedProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
    return () => { isMounted = false; };
  }, [id, navigate]);

  useEffect(() => {
    if (product) {
      trackViewContent(product);
    }
  }, [product]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 200) {
        setShowMobileCTA(false);
      } else {
        setShowMobileCTA(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!benefitsApi) return;
    setBenefitSnaps(benefitsApi.scrollSnapList());
    benefitsApi.on("select", () => {
      setCurrentBenefitSlide(benefitsApi.selectedScrollSnap());
    });
    benefitsApi.on("reInit", () => {
      setBenefitSnaps(benefitsApi.scrollSnapList());
      setCurrentBenefitSlide(benefitsApi.selectedScrollSnap());
    });
  }, [benefitsApi]);

  useEffect(() => {
    if (!benefitsApi || isBenefitsHovered) return;
    const interval = setInterval(() => {
      benefitsApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [benefitsApi, isBenefitsHovered]);

  const formatPrice = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const isReseller = currentUser?.commercial_profile === 'reseller' || currentUser?.tipo_cliente === 'revendedor';

  useEffect(() => {
    if (isReseller) return;

    const handleContextMenu = (e) => {
      e.preventDefault();
      toast.error('Proteção de Imagem: O download direto de fotos de varejo é protegido.');
    };

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast.error('Cópia Protegida: O conteúdo deste site é propriedade intelectual da Avante Lingerie.');
      }
    };

    const handleDragStart = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [isReseller]);

  const basePrice = product?.price ?? fallbackProduct?.price ?? 0;
  const baseOldPrice = product?.oldPrice ?? fallbackProduct?.oldPrice ?? 0;
  const baseDiscount = product?.discount ?? fallbackProduct?.discount ?? 0;
  const resellerWholesalePrice = product?.price_wholesale || product?.preco_atacado || (basePrice * 0.6);

  const getProductImageUrl = (record, filename) => {
    if (!filename) return '';
    if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
      return filename;
    }
    try {
      return pb.files.getUrl(record, filename);
    } catch (err) {
      return '';
    }
  };

  const resolvedImages = useMemo(() => {
    let imgs = [];
    if (product) {
      if (Array.isArray(product.gallery)) {
        product.gallery.forEach(img => {
          const url = getProductImageUrl(product, img);
          if (url && !imgs.includes(url)) imgs.push(url);
        });
      }
      if (product.image) {
        if (Array.isArray(product.image)) {
          product.image.forEach(img => {
            const url = getProductImageUrl(product, img);
            if (url && !imgs.includes(url)) imgs.push(url);
          });
        } else {
          const url = getProductImageUrl(product, product.image);
          if (url && !imgs.includes(url)) imgs.push(url);
        }
      }
      if (product.imagem_principal) {
        const url = getProductImageUrl(product, product.imagem_principal);
        if (url) {
          imgs = imgs.filter(img => img !== url);
          imgs.unshift(url);
        }
      }
    }
    if (imgs.length === 0) {
      return fallbackProduct.gallery;
    }
    return imgs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, product?.gallery, product?.image, product?.imagem_principal]);

  let dynamicColors = [];
  let dynamicSizes = [];

  if (variacoesList && variacoesList.length > 0) {
    dynamicColors = [...new Set(
      variacoesList
        .filter(v => v.status !== false && v.cor && typeof v.cor === 'string')
        .map(v => v.cor.trim())
    )];

    dynamicSizes = [...new Set(
      variacoesList
        .filter(v => v.status !== false && v.tamanho && typeof v.tamanho === 'string')
        .map(v => v.tamanho.trim())
    )];

    const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG', '38', '40', '42', '44', '46', '48', '50', '52'];
    dynamicSizes.sort((a, b) => {
      const indexA = sizeOrder.indexOf(a.toUpperCase());
      const indexB = sizeOrder.indexOf(b.toUpperCase());
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }

  useEffect(() => {
    if (selectedColor >= dynamicColors.length) {
      setSelectedColor(0);
    }
    if (dynamicSizes.length > 0 && !dynamicSizes.includes(selectedSize)) {
      setSelectedSize(dynamicSizes[0]);
    }
  }, [dynamicColors, dynamicSizes]);

  const semVariacoes = variacoesList.length === 0;

  const activeColorName = dynamicColors[selectedColor] || '';
  const activeVariation = variacoesList.find(v =>
    v.status !== false &&
    v.cor && typeof v.cor === 'string' &&
    v.cor.trim().toLowerCase() === activeColorName.trim().toLowerCase() &&
    v.tamanho && typeof v.tamanho === 'string' &&
    v.tamanho.trim().toLowerCase() === selectedSize.trim().toLowerCase()
  );

  const activeVarPrice = activeVariation && parseFloat(activeVariation.preco) > 0 ? parseFloat(activeVariation.preco) : basePrice;
  const activeVarWholesalePrice = activeVariation && parseFloat(activeVariation.preco_atacado) > 0 ? parseFloat(activeVariation.preco_atacado) : resellerWholesalePrice;

  const activePrice = isReseller ? activeVarWholesalePrice : activeVarPrice;
  const activeOldPrice = isReseller ? activeVarPrice : baseOldPrice;
  const activeDiscount = isReseller ? Math.round((1 - activeVarWholesalePrice / activeVarPrice) * 100) : baseDiscount;

  const profitPerPiece = activeVarPrice - activeVarWholesalePrice;
  const profitMarginPercent = activeVarWholesalePrice > 0 ? Math.round((profitPerPiece / activeVarWholesalePrice) * 100) : 0;

  const maxPurchaseQuantity = activeVariation ? (activeVariation.estoque || 5) : (product?.stock || fallbackProduct.stock || 1);

  useEffect(() => {
    if (!activeVariation?.imagem_url || !resolvedImages?.length) return;

    const varImgRef = activeVariation.imagem_url;

    const idx = resolvedImages.findIndex(imgUrl => {
      if (imgUrl === varImgRef) return true;
      const urlFilename = imgUrl.split('/').pop()?.split('?')[0];
      return urlFilename === varImgRef || imgUrl.includes(varImgRef);
    });

    if (idx !== -1) {
      setSelectedImageIdx(idx);
    }
  }, [activeVariation?.imagem_url, resolvedImages]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho.', { duration: 3000 });
      return;
    }

    if (selectedColor === null || selectedColor === undefined || !dynamicColors[selectedColor]) {
      toast.error('Por favor, selecione uma cor.', { duration: 3000 });
      return;
    }

    const colorName = dynamicColors[selectedColor];
    const mainItemPrice = activePrice;

    const currentCartTotal = getTotalPrice();
    const newTotal = currentCartTotal + (mainItemPrice * quantity);

    addToCart({
      id: product?.id || fallbackProduct.id,
      name: product?.name || fallbackProduct.name,
      price: mainItemPrice,
      image: resolvedImages?.[selectedImageIdx] || resolvedImages?.[0] || fallbackProduct.image,
      selectedSize: selectedSize,
      selectedColor: colorName,
      quantity: quantity,
      stock: maxPurchaseQuantity,
      preco_varejo: activeVarPrice,
      preco_atacado: activeVarWholesalePrice
    });

    trackAddToCart(product || fallbackProduct, quantity);

    let toastMessage = '';
    const desc = `Tamanho: ${selectedSize} | Cor: ${colorName}`;

    if (isReseller) {
      if (newTotal >= 3000 && currentCartTotal < 3000) {
        toastMessage = `${quantity} conjuntos adicionados ao lote - Sensacional! Desconto máximo de atacado ativado.`;
      } else if (newTotal >= 1500 && currentCartTotal < 1500) {
        toastMessage = `${quantity} conjuntos adicionados ao lote - Excelente! Novo patamar de desconto extra desbloqueado.`;
      } else if (newTotal < 1500) {
        toastMessage = `${quantity} conjuntos adicionados - Faltam ${formatPrice(1500 - newTotal)} para liberar 10% OFF EXTRA no atacado.`;
      } else {
        toastMessage = `${quantity} conjuntos adicionados ao lote de atacado!`;
      }
    } else {
      if (newTotal >= 900 && currentCartTotal < 900) {
        toastMessage = `${quantity} itens adicionados à sacola - Parabéns! Novo desconto desbloqueado`;
      } else if (newTotal >= 300 && currentCartTotal < 300) {
        toastMessage = `${quantity} itens adicionados à sacola - Parabéns! Novo desconto desbloqueado`;
      } else if (newTotal < 300) {
        toastMessage = `${quantity} itens adicionados à sacola - Faltam apenas ${formatPrice(300 - newTotal)} para desbloquear seu próximo benefício`;
      } else if (newTotal < 900) {
        toastMessage = `${quantity} itens adicionados à sacola - Faltam apenas ${formatPrice(900 - newTotal)} para desbloquear seu próximo benefício`;
      } else {
        toastMessage = `${quantity} itens adicionados à sacola com sucesso!`;
      }
    }

    toast.success(toastMessage, { description: desc, duration: 4500 });

    // Reset selection counter to standard minimum (1)
    setQuantity(1);
  };

  const handleBuy = (itemFromCard = null) => {
    const isEvent = itemFromCard && itemFromCard.nativeEvent;
    const item = isEvent ? null : itemFromCard;

    if (item && item?.id && (!product || item.id !== product?.id)) {
      navigate(`/produto/${item.id}`);
      return;
    }

    // Comprar Agora apenas redireciona para a sacola de compras, sem alterar quantidades
    navigate('/cart');
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const productCategoria = product?.expand?.categoria_id?.nome || product?.categoria || fallbackProduct?.categoria || 'CATEGORIA';
  const tableData = useMemo(() => getSizingTableData(productCategoria), [productCategoria]);

  if (loading) {
    return (
      <div className="container-custom py-12 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[3/4] w-full rounded-3xl border border-[#c59b5f]/25" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-16 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const productName = product?.name || fallbackProduct?.name || 'Produto';
  const productDescription = product?.desc_geral || product?.description || fallbackProduct?.description || '';
  const productReferencia = product?.reference || product?.referencia || product?.id || fallbackProduct?.referencia || 'REF-001';
  const productAvaliacao = product?.avaliacao_media ?? fallbackProduct?.avaliacao_media ?? 5.0;
  const productReviewsCount = product?.reviews_count ?? fallbackProduct?.reviews_count ?? 124;

  const currentCartTotal = getTotalPrice();
  const isPixEligible = getPixBenefitEligibility();

  const testimonialsData = [
    { id: '1', customer_name: 'Maria Silva', comment: 'Melhor compra que fiz! Conforto o dia inteiro e não marca nada. Recomendo!', rating: 5, avatar: '' },
    { id: '2', customer_name: 'Ana Costa', comment: 'Qualidade premium! Uso todos os dias e continua perfeito. Voltaria a comprar com certeza!', rating: 5, avatar: '' },
    { id: '3', customer_name: 'Juliana Oliveira', comment: 'Não marca, não enrola, conforto o dia inteiro. Exatamente como descrito!', rating: 5, avatar: '' }
  ];

  const upsellProducts = Array(4).fill(null).map((_, i) => ({
    id: `upsell-${i}`,
    nome_produto: 'Conjunto em Microfibra Cropped Regata Gola Alta',
    categoria: 'CONJUNTOS',
    imagem_produto: [
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c2d4624557c0de0eb4a45ebd8f3f9385.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/021cb0190198eb005ad0498485c5e02a.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/684efea9860acc8caab24e49f3eebf28.jpg',
      'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/9331fd1b840bbc52cc06e34b807d7083.jpg'
    ][i],
    badge_desconto: 15,
    nota: 4.8,
    quantidade_avaliacoes: 1200,
    price: 19.90,
    oldPrice: 25.87,
    parcelas: 6,
    vendidos_semana: 1200,
    estoque_restante: 12,
    cores_disponiveis: dynamicColors
  }));

  const relatedProductsList = relatedProducts.length > 0 ? relatedProducts : upsellProducts;

  return (
    <article className="w-full bg-[#FFFBF8] min-h-screen pb-24 md:pb-0 font-sans text-gray-800">
      <Helmet>
        <title>{`${productName} | Conforto e Qualidade Avante`}</title>
        <meta name="description" content={`Descubra o ${productName}. Aproveite 5% OFF no PIX, compra 100% segura, troca facilitada e envio rápido para todo o Brasil.`} />
      </Helmet>

      <div className="container-custom py-8 md:py-12">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-8 font-medium tracking-wide">
          <Link to="/" className="hover:text-[#c59b5f] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/categoria/${productCategoria.toLowerCase()}`} className="hover:text-[#c59b5f] transition-colors cursor-pointer">{productCategoria}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c59b5f] font-bold truncate max-w-[200px]">{productName}</span>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 h-fit">
            <div
              className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted border border-[#c59b5f]/15 group"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => { setIsZoomed(false); setZoomOrigin('50% 50%'); }}
            >
              <img
                src={resolvedImages?.[selectedImageIdx] || fallbackProduct.image}
                alt={`${productName} - Vista detalhada ${selectedImageIdx + 1}`}
                className="w-full h-full object-cover transition-all duration-300 ease-out cursor-zoom-in"
                style={isZoomed ? {
                  transform: 'scale(3.5)',
                  transformOrigin: zoomOrigin,
                  filter: 'brightness(1.05) contrast(1.1)',
                  imageRendering: 'crisp-edges'
                } : {
                  transform: 'scale(1)',
                  transformOrigin: '50% 50%',
                  filter: 'brightness(1) contrast(1)',
                  imageRendering: 'auto'
                }}
              />

              <button
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  toast.success(!isFavorite ? "Produto adicionado aos favoritos!" : "Produto removido dos favoritos!");
                }}
                className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 active:scale-95 shadow-md border border-[#c59b5f]/20 z-10"
                aria-label="Favoritar produto"
              >
                <Heart className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'fill-[#c59b5f] text-[#c59b5f]' : 'text-gray-400 hover:text-[#c59b5f]'}`} />
              </button>

              <div className={`absolute top-4 right-4 border text-xs font-black tracking-widest uppercase shadow-premium-sm z-10 px-4.5 py-2 rounded-xl bg-gradient-to-br from-[#121212] to-[#1e1e1e] text-[#c59b5f] border-[#c59b5f]/30`}>
                {isReseller ? `Atacado -${activeDiscount}%` : `-${activeDiscount}% OFF`}
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2.5 snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#c59b5f_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#c59b5f] [&::-webkit-scrollbar-thumb]:rounded-full">
              {resolvedImages && resolvedImages.length > 0 ? (
                resolvedImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-24 md:w-24 md:h-32 rounded-2xl overflow-hidden shrink-0 snap-start border-2 transition-all duration-300 ${selectedImageIdx === idx ? 'border-[#c59b5f] shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    aria-label={`Ver miniatura ${idx + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))
              ) : (
                <div className="w-20 h-24 md:w-24 md:h-32 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  Sem imagens
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs mb-4">
              <div className="flex items-center gap-2 text-[#c59b5f] font-bold uppercase tracking-wider bg-[#c59b5f]/10 px-4 py-1.5 rounded-full">
                <span>{isReseller ? 'Lote de Atacado' : productCategoria}</span>
              </div>
              <span className="text-gray-400 font-semibold tracking-wider border border-[#c59b5f]/20 bg-[#c59b5f]/5 px-4 py-1.5 rounded-full font-mono">
                REF: {productReferencia}
              </span>
            </div>

            <h1 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {productName}
            </h1>

            <p className="text-gray-500 text-base md:text-lg mb-6 leading-relaxed font-light italic">
              "{productDescription}"
            </p>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4.5 h-4.5 ${i < Math.floor(productAvaliacao) ? 'fill-[#c59b5f] text-[#c59b5f]' : 'text-gray-200 fill-none'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
                {productAvaliacao} <span className="text-gray-400 font-normal lowercase">({productReviewsCount} avaliações)</span>
              </span>
            </div>

            <div className="mb-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-4 flex-wrap">
                  <span className="text-gray-400 line-through text-sm md:text-base font-medium">
                    {isReseller ? `Preço Sugerido Varejo: ${formatPrice(activeVarPrice)}` : `De: ${formatPrice(activeOldPrice)}`}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-900 text-3xl md:text-4xl font-black tracking-tight transition-all duration-300">
                      {formatPrice(activePrice)}
                    </span>
                    {isReseller && (
                      <span className="text-xs font-bold text-[#c59b5f] uppercase tracking-wider bg-[#c59b5f]/15 border border-[#c59b5f]/30 px-2.5 py-1 rounded-md mb-1 shadow-sm">
                        Seu Preço Atacado
                      </span>
                    )}
                  </div>
                  {!isReseller && (
                    <span className="text-[#c59b5f] text-xs font-extrabold uppercase bg-[#c59b5f]/10 px-3 py-1 rounded-lg">-{activeDiscount}% OFF no PIX</span>
                  )}
                </div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mt-1">
                  Parcele em até <strong className="text-gray-900 font-extrabold">6x sem juros</strong> no cartão
                </p>
              </div>
            </div>

            {isReseller && (
              <div className="mb-6 bg-gradient-to-br from-[#FFFBF8] to-[#FCF9F5] border-2 border-[#c59b5f]/25 rounded-[1.5rem] p-5 shadow-premium-sm text-left animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#c59b5f]/15 pb-3 mb-4">
                  <h4 className="font-serif font-bold text-gray-900 text-base flex items-center gap-2">
                    <PiggyBank className="w-5.5 h-5.5 text-[#c59b5f]" />
                    Demonstrativo de Lucro Exclusivo
                  </h4>
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 rounded-full">
                    +{profitMarginPercent}% Margem Lucro
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white border border-gray-100 rounded-xl p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Lucro por Conjunto:</span>
                    <strong className="text-lg text-emerald-600 font-bold">{formatPrice(profitPerPiece)}</strong>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-3">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Custo Atacado:</span>
                    <strong className="text-lg text-gray-900 font-bold">{formatPrice(activeVarWholesalePrice)}</strong>
                  </div>
                </div>

                <div className="bg-[#121212] rounded-xl p-4 text-white text-xs font-light space-y-2 border border-[#c59b5f]/20">
                  <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#c59b5f] block mb-1">Simulador de Ganhos Rápidos:</span>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Vendendo 10 peças:</span>
                    <strong className="text-white font-bold">Lucro de {formatPrice(profitPerPiece * 10)}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Vendendo 30 peças:</span>
                    <strong className="text-[#c59b5f] font-bold">Lucro de {formatPrice(profitPerPiece * 30)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendendo 50 peças:</span>
                    <strong className="text-emerald-400 font-bold">Lucro de {formatPrice(profitPerPiece * 50)}</strong>
                  </div>
                </div>
              </div>
            )}

            <PixInfoBlock isEligible={isPixEligible} />
            <ProgressiveDiscountBar currentTotal={currentCartTotal} />

            <SocialProofStats variant="product" product={product} />

            <div className="flex flex-col gap-6 mb-8 mt-6">
              <div>
                {semVariacoes && (
                  <div className="mb-4 flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-2xl px-4 py-3">
                    <span className="text-orange-400 text-base mt-0.5">⚠️</span>
                    <div>
                      <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">Sem variações cadastradas</p>
                      <p className="text-xs text-orange-600 mt-0.5">Este produto ainda não possui tamanhos ou cores disponíveis. Volte em breve!</p>
                    </div>
                  </div>
                )}
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                  Cor: <span className="text-[#c59b5f] font-extrabold ml-1 uppercase">{activeColorName}</span>
                </h3>
                <div className="flex items-center gap-3">
                  {dynamicColors && dynamicColors.length > 0 ? (
                    dynamicColors.map((colorName, idx) => {
                      const hexColor = getColorHex(colorName);
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`relative w-9 h-9 rounded-full border-2 transition-all duration-300 flex items-center justify-center shadow-sm ${selectedColor === idx ? 'border-[#c59b5f] ring-2 ring-[#c59b5f]/20 scale-110 shadow-md' : 'border-transparent hover:scale-110'
                            }`}
                          style={{ backgroundColor: hexColor }}
                          aria-label={`Selecionar cor ${colorName}`}
                        >
                          {selectedColor === idx && (
                            <CheckCircle2 className={`w-4 h-4 ${hexColor.toLowerCase() === '#ffffff' || hexColor.toLowerCase() === '#f5f5dc' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-sm text-gray-400">Cores não disponíveis</span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                    Tamanho
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  {dynamicSizes && dynamicSizes.length > 0 ? (
                    dynamicSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-11 rounded-xl border text-xs font-bold transition-all duration-300 flex items-center justify-center ${selectedSize === size
                            ? 'border-[#c59b5f] bg-[#c59b5f]/10 text-[#c59b5f] font-extrabold shadow-sm scale-105'
                            : 'border-gray-200 text-gray-800 hover:border-[#c59b5f] hover:text-black'
                          }`}
                        aria-label={`Selecionar tamanho ${size}`}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">Tamanhos não disponíveis</span>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1.5 text-xs text-[#c59b5f] font-bold hover:underline transition-opacity py-1">
                      <Ruler className="w-3.5 h-3.5" />
                      [TABELA DE MEDIDAS]
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl rounded-3xl bg-white/95 border-none shadow-2xl p-0 overflow-hidden backdrop-blur-md">
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <DialogTitle className="text-2xl font-serif font-bold text-gray-900 mb-1">{tableData.title}</DialogTitle>
                          <DialogDescription className="text-gray-400 text-xs font-light">{tableData.intro}</DialogDescription>
                        </div>
                        <DialogClose asChild>
                          <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </DialogClose>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-[#c59b5f]/15 mb-6 bg-white">
                        <table className="w-full text-xs text-left">
                          <tbody className="divide-y divide-gray-100">
                            {tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-[#FFFBF8] transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`px-6 py-4 ${cIdx === 0 ? 'font-bold text-[#c59b5f]' : ''}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {tableData.alert && (
                        <div className="mb-6 p-4 bg-orange-50/70 border border-orange-200/50 rounded-2xl text-xs text-orange-850">
                          ⚠️ {tableData.alert}
                        </div>
                      )}

                      <div className="bg-[#FFFBF8] rounded-2xl p-5 mb-6 border border-[#c59b5f]/15">
                        <p className="text-xs font-medium text-gray-500 mb-4 italic">
                          "Nosso tecido possui elasticidade inteligente e excelente adaptação ao corpo."
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#c59b5f]" /> Alta elasticidade
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#c59b5f]" /> Ajuste anatômico
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-[#c59b5f]" /> Modelagem confortável
                          </div>
                        </div>
                      </div>

                      <DialogClose asChild>
                        <Button className="w-full bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black rounded-2xl py-6 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md">
                          ENTENDI, ESCOLHER TAMANHO
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6 w-full">
              {activeVariation && (
                <div className="text-xs font-semibold text-gray-500 mb-2">
                  Estoque desta combinação: {activeVariation.estoque > 0 ? (
                    <strong className="text-green-600 font-extrabold">{activeVariation.estoque} unidades disponíveis</strong>
                  ) : (
                    <strong className="text-red-650 font-extrabold">Sem estoque no momento</strong>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center justify-between h-[52px] border border-[#c59b5f]/30 rounded-2xl overflow-hidden bg-white hover:border-[#c59b5f]/60 transition-colors">
                  <button
                    type="button"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={semVariacoes || quantity <= 1}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-r border-gray-100"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddToCart()}
                    disabled={semVariacoes || (activeVariation && activeVariation.estoque <= 0)}
                    className="flex-1 h-full font-bold text-[10px] md:text-xs uppercase tracking-wider text-gray-900 hover:text-[#c59b5f] transition-colors whitespace-nowrap px-1"
                  >
                    {semVariacoes
                      ? 'SEM ESTOQUE'
                      : (activeVariation && activeVariation.estoque <= 0)
                        ? 'INDISPONÍVEL'
                        : isReseller
                          ? `ADICIONAR LOTE (${quantity})`
                          : `ADICIONAR (${quantity})`
                    }
                  </button>

                  <button
                    type="button"
                    onClick={() => (!maxPurchaseQuantity || quantity < maxPurchaseQuantity) && setQuantity(quantity + 1)}
                    disabled={semVariacoes || (maxPurchaseQuantity && quantity >= maxPurchaseQuantity)}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-l border-gray-100"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  onClick={() => handleBuy()}
                  disabled={semVariacoes || (activeVariation && activeVariation.estoque <= 0)}
                  className={`h-[52px] rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md active:scale-[0.98] w-full ${semVariacoes || (activeVariation && activeVariation.estoque <= 0)
                      ? 'bg-gray-300 border-gray-300 text-gray-550 cursor-not-allowed'
                      : isReseller
                        ? 'bg-gradient-to-r from-[#121212] to-[#251f15] text-white hover:from-[#c59b5f] hover:to-[#e5c595] hover:text-black border border-[#c59b5f]/30'
                        : 'bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black'
                    }`}
                >
                  {isReseller ? 'COMPRAR LOTE' : 'COMPRAR AGORA'}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full border border-gray-200 text-gray-805 bg-transparent hover:bg-gray-50 hover:text-black rounded-2xl py-6 text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-[0.98]"
              >
                CONTINUAR COMPRANDO
              </Button>

              <TrustSection />
            </div>
          </div>
        </section>
      </div>

      <section
        className="container-custom py-16 relative"
        onMouseEnter={() => setIsBenefitsHovered(true)}
        onMouseLeave={() => setIsBenefitsHovered(false)}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setBenefitsApi}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {[
              { icon: Heart, title: 'Modela sem apertar', text: 'Valoriza suas curvas com conforto.' },
              { icon: Zap, title: 'Não enrola na cintura', text: 'Perfeito para o dia a dia todo.' },
              { icon: Eye, title: 'Não marca na roupa', text: 'Discreto e invisível até nas roupas justas.' },
              { icon: Wind, title: 'Conforto o dia inteiro', text: 'Tecido leve, macio e respirável.' },
              { icon: Sparkles, title: 'Bem-estar garantido', text: 'Sinta-se confortável e confiante.' },
              { icon: Move, title: 'Máxima flexibilidade', text: 'Acompanha cada movimento do seu corpo.' },
              { icon: Shield, title: 'Durável e resistente', text: 'Mantém a qualidade após muitos usos.' },
              { icon: Droplet, title: 'Fácil de cuidar', text: 'Lava e seca rapidamente.' },
              { icon: Crown, title: 'Design sofisticado', text: 'Peça que valoriza seu estilo.' },
              { icon: Leaf, title: 'Sustentável', text: 'Produzido com responsabilidade.' }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                  <div className="h-full p-1">
                    <div className="h-full flex flex-col items-center text-center gap-2 p-6 bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f] rounded-2xl transition-all duration-500 hover:shadow-[0_12px_30px_rgba(197,155,95,0.08)] hover:-translate-y-1 group/benefit">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#121212] to-[#1e1e1e] border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] mb-3 transition-all duration-500 group-hover/benefit:from-[#c59b5f] group-hover/benefit:to-[#c59b5f] group-hover/benefit:text-black group-hover/benefit:border-transparent group-hover/benefit:shadow-[0_0_15px_rgba(197,155,95,0.4)]">
                        <Icon className="w-6 h-6 transition-transform duration-500 group-hover/benefit:scale-105" strokeWidth={1.5} />
                      </div>
                      <h4 className="font-bold text-sm text-gray-905 font-serif">{benefit.title}</h4>
                      <p className="text-xs text-gray-400 font-light max-w-[190px]">{benefit.text}</p>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f]/30 shadow-md transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f]/30 shadow-md transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center" />
          </div>
        </Carousel>

        <div className="flex justify-center gap-2 mt-8">
          {benefitSnaps && benefitSnaps.length > 0 ? (
            benefitSnaps.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentBenefitSlide ? 'bg-[#c59b5f] w-8' : 'bg-[#c59b5f]/20 hover:bg-[#c59b5f]/50'
                  }`}
                onClick={() => benefitsApi?.scrollTo(idx)}
                aria-label={`Ir para o slide ${idx + 1}`}
              />
            ))
          ) : null}
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#c59b5f]/15 overflow-hidden shadow-premium-sm">
          <Tabs defaultValue="descricao" className="w-full">
            <TabsList className="w-full flex h-auto bg-gray-50 border-b border-gray-100 rounded-none p-0 overflow-x-auto scrollbar-hide justify-start">
              {[
                { id: 'descricao', label: 'Descrição' },
                { id: 'tecido', label: 'Tecido & Composição' },
                { id: 'modelagem', label: 'Modelagem & Caimento' },
                { id: 'cuidados', label: 'Cuidados' },
                { id: 'diferenciais', label: 'Diferenciais' },
                { id: 'compra-segura', label: 'Compra Segura' }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] text-gray-400 hover:text-black data-[state=active]:bg-transparent transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-8 md:p-10 text-sm leading-relaxed text-gray-600 font-light min-h-[250px] bg-white flex flex-col gap-6">
              <TabsContent value="descricao" className="mt-0">
                {product?.desc_geral ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_geral}</p>
                ) : (
                  <p>{productDescription || 'Conjunto em microfibra premium...'}</p>
                )}
              </TabsContent>

              <TabsContent value="tecido" className="mt-0">
                {product?.desc_tecido ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_tecido}</p>
                ) : (
                  <div className="space-y-6">
                    <p>Confeccionado em microfibra 100% poliamida de alta qualidade...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="modelagem" className="mt-0">
                {product?.desc_modelagem ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_modelagem}</p>
                ) : (
                  <div className="space-y-6">
                    <p>Design exclusivo que valoriza o corpo com elegância...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="cuidados" className="mt-0">
                {product?.desc_cuidados ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_cuidados}</p>
                ) : (
                  <div className="space-y-6">
                    <p>Para manter a qualidade premium do seu conjunto...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="diferenciais" className="mt-0">
                {product?.desc_diferenciais ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_diferenciais}</p>
                ) : (
                  <div className="space-y-6">
                    <p>Por que escolher este conjunto...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="compra-segura" className="mt-0">
                {product?.desc_compra_segura ? (
                  <p className="whitespace-pre-line text-gray-600 font-light leading-relaxed">{product.desc_compra_segura}</p>
                ) : (
                  <div className="space-y-6">
                    <p>Sua compra é 100% segura e protegida...</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      <section className="bg-[#FFFBF8] py-20 border-y border-[#c59b5f]/15 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
              Voz de Nossas Clientes
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-909 mt-2">O que nossas clientes dizem</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((test, idx) => (
              <div key={idx} className="bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f] rounded-3xl p-8 shadow-premium-sm transition-all duration-550 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#c59b5f]/10 text-[#c59b5f] border border-[#c59b5f]/20 flex items-center justify-center font-bold">
                    {test.customer_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-950 text-sm">{test.customer_name}</h4>
                    <div className="flex text-[#c59b5f] gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 font-light text-sm italic">"{test.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-custom py-20 bg-white border-b border-gray-100">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
            Combinações Perfeitas
          </span>
          <h2 className="text-3xl font-serif font-bold text-gray-909 mt-2">Quem comprou também levou</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {upsellProducts.map(p => (
            <ProductCard key={p.id} produto={p} onComprarAgora={handleBuy} />
          ))}
        </div>
      </section>

      <section className="container-custom py-20 bg-[#FFFBF8]">
        <div className="text-center mb-16">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
            Sugestões do Nosso Ateliê
          </span>
          <h2 className="text-3xl font-serif font-bold text-gray-909 mt-2">Você também pode gostar</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {relatedProductsList.map(p => (
            <ProductCard key={p.id} produto={p} onComprarAgora={handleBuy} />
          ))}
        </div>
      </section>

      <section className="container-custom py-20 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] block">
            Dúvidas Frequentes
          </span>
          <h2 className="text-2xl font-serif font-bold text-gray-909 mt-2">Dúvidas frequentes</h2>
        </div>
        <FAQAccordion items={[
          { question: 'O tecido marca?', answer: 'Não! Nosso tecido é especialmente desenvolvido para não marcar.' },
          { question: 'Como escolher tamanho?', answer: 'Consulte nossa tabela de medidas.' },
          { question: 'Tem elasticidade?', answer: 'Sim! Nosso tecido possui elasticidade inteligente.' }
        ]} />
      </section>

      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#c59b5f]/25 shadow-2xl p-4 z-40 md:hidden flex flex-col gap-3"
          >
            <div className="flex items-center justify-between px-1">
              <span className="text-lg font-bold text-gray-900">{formatPrice(activePrice)}</span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Tamanho: {selectedSize}</span>
            </div>
            <Button
              onClick={() => handleBuy()}
              disabled={semVariacoes || (activeVariation && activeVariation.estoque <= 0)}
              className={`w-full border rounded-2xl py-4 font-bold text-xs uppercase tracking-wider shadow-md ${semVariacoes || (activeVariation && activeVariation.estoque <= 0)
                  ? 'bg-gray-300 text-gray-550 cursor-not-allowed'
                  : 'bg-[#121212] text-white hover:bg-[#c59b5f] hover:text-black border-[#c59b5f]/30'
                }`}
            >
              {semVariacoes ? 'SEM ESTOQUE' : activeVariation && activeVariation.estoque <= 0 ? 'INDISPONÍVEL' : isReseller ? 'ADICIONAR AO LOTE' : 'COMPRAR AGORA'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}