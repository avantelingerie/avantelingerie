import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Heart, Tag, Ruler, ShoppingBag,
  CheckCircle2, RefreshCw, Truck, ChevronRight, X,
  Zap, Eye, Wind, Sparkles, Move, Shield, Droplet, Crown, Leaf, PiggyBank, Award, DollarSign,
  Minus, Plus, Hash
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

    if (!semVariacoes && (!activeVariation || !activeVariation.id)) {
      toast.error('Esta combinação de cor e tamanho não está disponível no momento. Por favor, escolha outra combinação.', { duration: 4000 });
      return;
    }

    const colorName = dynamicColors[selectedColor];
    const mainItemPrice = activePrice;

    const currentCartTotal = getTotalPrice();
    const newTotal = currentCartTotal + (mainItemPrice * quantity);

    addToCart({
      id: product?.id || fallbackProduct.id,
      variacao_id: activeVariation?.id || null,
      name: product?.name || fallbackProduct.name,
      price: mainItemPrice,
      image: resolvedImages?.[selectedImageIdx] || resolvedImages?.[0] || fallbackProduct.image,
      selectedSize: selectedSize,
      selectedColor: colorName,
      quantity: quantity,
      stock: maxPurchaseQuantity,
      preco_varejo: activeVarPrice,
      preco_atacado: activeVarWholesalePrice,
      sku: activeVariation?.sku || product?.sku || ''
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
          {/* Esquerda - Galeria */}
          <div className="flex flex-col md:flex-row-reverse gap-4 lg:sticky lg:top-24 h-fit">
            <div
              className="relative w-full aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-premium-sm border border-[#c59b5f]/15"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => { setIsZoomed(false); setZoomOrigin('50% 50%'); }}
              onMouseMove={handleMouseMove}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIdx}
                  src={resolvedImages[selectedImageIdx]}
                  alt={`${productName} - Vista ${selectedImageIdx + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: isZoomed ? 2 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: zoomOrigin }}
                  className="w-full h-full object-cover cursor-zoom-in"
                  loading={selectedImageIdx === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </AnimatePresence>

              {activeDiscount > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  -{activeDiscount}% OFF
                </div>
              )}
              {isReseller && (
                <div className="absolute top-4 right-4 bg-black text-[#c59b5f] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-black/20 flex items-center gap-1 border border-[#c59b5f]/30">
                  <Crown className="w-3 h-3" />
                  PREÇO VIP
                </div>
              )}
            </div>

            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto py-1 md:py-0 md:pr-2 max-h-[500px] md:max-h-[600px] [scrollbar-width:thin] [scrollbar-color:#c59b5f_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#c59b5f] [&::-webkit-scrollbar-thumb]:rounded-full">
              {resolvedImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-20 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${selectedImageIdx === idx
                    ? 'ring-2 ring-[#c59b5f] ring-offset-2 scale-[1.02] shadow-md'
                    : 'opacity-60 hover:opacity-100 hover:scale-[1.02] bg-white border border-[#c59b5f]/10'
                    }`}
                  aria-label={`Ver imagem ${idx + 1}`}
                >
                  <img src={img} alt={`${productName} miniatura ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  {selectedImageIdx === idx && (
                    <div className="absolute inset-0 bg-[#c59b5f]/10" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direita - Informações */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase text-[#c59b5f] bg-[#c59b5f]/10 px-3 py-1 rounded-full border border-[#c59b5f]/20">
                  {productCategoria}
                </span>
                <div className="flex items-center gap-1 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{productAvaliacao.toFixed(1)}</span>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1.5 ml-auto">
                  <Hash className="w-3 h-3" />
                  {productReferencia}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {productName}
              </h1>

              <p className="text-sm md:text-base text-gray-600 font-medium mt-3 mb-1 leading-relaxed bg-[#c59b5f]/10 p-3 rounded-2xl border border-[#c59b5f]/20">
                Tecido inteligente que não marca e não enrola. A modelagem perfeita que valoriza suas curvas com conforto absoluto.
              </p>

              {isReseller ? (
                // Área de Preço Atacadista (Logado)
                <div className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-3xl border border-[#c59b5f]/30 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b5f]/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-700 group-hover:bg-[#c59b5f]/20"></div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-4 h-4 text-[#c59b5f]" />
                        <span className="text-xs font-bold text-[#c59b5f] tracking-widest uppercase">Seu Preço de Atacado</span>
                      </div>
                      <div className="flex items-end gap-3">
                        <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(activePrice)}</span>
                        <span className="text-sm text-gray-400 line-through mb-1.5">{formatPrice(activeOldPrice)}</span>
                      </div>
                    </div>

                    <div className="bg-[#c59b5f]/10 border border-[#c59b5f]/30 rounded-2xl p-3 flex flex-col items-end backdrop-blur-sm">
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold mb-0.5 flex items-center gap-1">
                        <Award className="w-3 h-3 text-[#c59b5f]" /> Lucro Estimado
                      </span>
                      <span className="text-lg font-bold text-[#c59b5f] leading-none mb-1">
                        +{profitMarginPercent}%
                      </span>
                      <span className="text-xs text-gray-400 font-medium">Revenda a {formatPrice(activeOldPrice)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Área de Preço Varejo (Visitante/Padrão)
                <div className="flex flex-col gap-1">
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">{formatPrice(activePrice)}</span>
                    {activeOldPrice > activePrice && (
                      <span className="text-lg text-gray-400 line-through mb-1">{formatPrice(activeOldPrice)}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-gray-500">
                      ou 6x de <span className="font-bold text-gray-900">{formatPrice(activePrice / 6)}</span> sem juros
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Componente Modular de Desconto Progressivo */}
            {!isReseller && (
              <div className="pt-2">
                <ProgressiveDiscountBar
                  currentTotal={currentCartTotal}
                  previewAddedValue={activePrice * quantity}
                  profile="retail"
                />
              </div>
            )}

            {/* Componente Modular de Benefício PIX */}
            <div className="pt-2">
              <PixInfoBlock eligible={isPixEligible} />
            </div>

            {/* Seleção de Cor */}
            {!semVariacoes && dynamicColors.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    Cor Selecionada
                    <span className="text-xs font-normal text-gray-500 normal-case bg-gray-100 px-2 py-0.5 rounded-full">
                      {activeColorName}
                    </span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {dynamicColors.map((color, idx) => {
                    const isSelected = selectedColor === idx;
                    const colorHex = getColorHex(color);
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected
                          ? 'ring-2 ring-offset-2 ring-gray-900 scale-110 shadow-md'
                          : 'ring-1 ring-gray-200 hover:scale-105 hover:ring-gray-400'
                          }`}
                        aria-label={`Selecionar cor ${color}`}
                        title={color}
                      >
                        <span
                          className="w-10 h-10 rounded-full shadow-inner block"
                          style={{
                            background: colorHex.includes('hsl') || colorHex.includes('#') ? colorHex : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                            border: colorHex === '#FFFFFF' ? '1px solid #e5e7eb' : 'none'
                          }}
                        />
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm mix-blend-difference" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Seleção de Tamanho */}
            {!semVariacoes && dynamicSizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    Tamanho
                    <span className="text-xs font-normal text-gray-500 normal-case bg-gray-100 px-2 py-0.5 rounded-full">
                      {selectedSize}
                    </span>
                  </span>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xs font-bold text-[#c59b5f] hover:text-[#a37c46] transition-colors flex items-center gap-1.5 bg-[#c59b5f]/5 hover:bg-[#c59b5f]/10 px-3 py-1.5 rounded-full border border-[#c59b5f]/20">
                        <Ruler className="w-3.5 h-3.5" />
                        Guia de Medidas
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl rounded-3xl p-0 overflow-hidden bg-[#FFFBF8]">
                      <div className="bg-[#c59b5f] p-6 text-white relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 opacity-10">
                          <Ruler className="w-40 h-40" />
                        </div>
                        <DialogTitle className="text-2xl font-bold tracking-tight mb-2 relative z-10">{tableData.title}</DialogTitle>
                        <DialogDescription className="text-white/90 text-sm relative z-10 font-medium">
                          {tableData.intro}
                        </DialogDescription>
                      </div>
                      <div className="p-6">
                        {tableData.alert && (
                          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-2xl flex items-start gap-3 mb-6">
                            <Sparkles className="w-5 h-5 mt-0.5 shrink-0" />
                            <p className="font-medium leading-relaxed">{tableData.alert}</p>
                          </div>
                        )}
                        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
                          <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                              <tr>
                                {tableData.headers.map((h, i) => (
                                  <th key={i} className="px-6 py-4 font-bold tracking-wider">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tableData.rows.map((row, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-[#FFFBF8] transition-colors">
                                  {row.map((cell, j) => (
                                    <td key={j} className={`px-6 py-4 ${j === 0 ? 'font-bold text-gray-900 bg-gray-50/50' : 'text-gray-600'}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <DialogClose asChild>
                            <Button className="rounded-full font-bold px-8" variant="outline">Entendi</Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {dynamicSizes.map(size => {
                    const isSelected = selectedSize === size;
                    // Check if this specific size and current color combination is available
                    const specificVariation = variacoesList.find(v =>
                      v.status !== false &&
                      v.cor?.trim().toLowerCase() === activeColorName.trim().toLowerCase() &&
                      v.tamanho?.trim().toLowerCase() === size.trim().toLowerCase()
                    );
                    const isAvailable = specificVariation && specificVariation.estoque > 0;

                    return (
                      <button
                        key={size}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        disabled={!isAvailable}
                        className={`h-12 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${!isAvailable
                          ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200'
                          : isSelected
                            ? 'bg-gray-900 text-white shadow-lg scale-105 border border-gray-900'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                      >
                        {size}
                        {!isAvailable && (
                          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            <div className="w-full h-[1px] bg-gray-300 rotate-45 transform origin-center"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Quantidade</span>
                {!semVariacoes && activeVariation && (
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activeVariation.estoque > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 animate-pulse'
                    }`}>
                    {activeVariation.estoque > 0
                      ? `${activeVariation.estoque} disponíveis`
                      : 'Esgotado'}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-[52px] flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-1 w-full sm:w-[140px] shrink-0 shadow-sm">
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
                  className={`h-[52px] rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md active:scale-[0.98] w-full 
                  ${semVariacoes || (activeVariation && activeVariation.estoque <= 0)
                      ? 'bg-gray-300 border-gray-300 text-gray-550 cursor-not-allowed'
                      : isReseller
                        ? 'bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white border-0 shadow-xl shadow-black/20'
                        : 'bg-[#c59b5f] hover:bg-[#a37c46] text-white border border-[#a37c46]/50 shadow-[#c59b5f]/20 hover:shadow-lg hover:shadow-[#c59b5f]/30'
                    }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {isReseller ? 'FINALIZAR LOTE AGORA' : 'COMPRAR AGORA'}
                </Button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`h-[52px] w-[52px] shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border ${isFavorite
                    ? 'bg-red-50 text-red-500 border-red-200'
                    : 'bg-white text-gray-400 border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50'
                    }`}
                  aria-label="Adicionar aos favoritos"
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Bloco de Benefícios Premium (Grid Estático Elegante) */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 mt-6">
              <div className="flex flex-col items-center text-center p-3.5 bg-gradient-to-b from-[#FFFBF8] to-white border border-[#c59b5f]/15 rounded-2xl hover:border-[#c59b5f] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center mb-2.5 border border-[#c59b5f]/20">
                  <Shield className="w-5 h-5 text-[#c59b5f]" />
                </div>
                <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-0.5">Compra Segura</h4>
                <p className="text-[9px] text-gray-400 leading-normal">Criptografia SSL de ponta a ponta</p>
              </div>

              <div className="flex flex-col items-center text-center p-3.5 bg-gradient-to-b from-[#FFFBF8] to-white border border-[#c59b5f]/15 rounded-2xl hover:border-[#c59b5f] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center mb-2.5 border border-[#c59b5f]/20">
                  <RefreshCw className="w-5 h-5 text-[#c59b5f]" />
                </div>
                <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-0.5">Troca Fácil</h4>
                <p className="text-[9px] text-gray-400 leading-normal">Primeira grátis em até 7 dias</p>
              </div>

              <div className="flex flex-col items-center text-center p-3.5 bg-gradient-to-b from-[#FFFBF8] to-white border border-[#c59b5f]/15 rounded-2xl hover:border-[#c59b5f] transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center mb-2.5 border border-[#c59b5f]/20">
                  <Truck className="w-5 h-5 text-[#c59b5f]" />
                </div>
                <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider mb-0.5">Envio Rápido</h4>
                <p className="text-[9px] text-gray-400 leading-normal">Discreto e perfumado para todo o BR</p>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Social Proof & Trust Modules */}
      <div className="bg-white border-y border-gray-100">
        <div className="container-custom py-12">
          <SocialProofStats productId={product?.id || fallbackProduct.id} reviewsCount={productReviewsCount} />
        </div>
      </div>

      <div className="bg-[#FFFBF8] border-y border-gray-100">
        <div className="container-custom py-12">
          <Tabs defaultValue="geral" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-transparent h-auto p-0 mb-6 gap-6 overflow-x-auto scrollbar-hide flex">
              <TabsTrigger
                value="geral"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Geral
              </TabsTrigger>
              <TabsTrigger
                value="tecido"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Tecido
              </TabsTrigger>
              <TabsTrigger
                value="modelagem"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Modelagem
              </TabsTrigger>
              <TabsTrigger
                value="cuidados"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Cuidados
              </TabsTrigger>
              <TabsTrigger
                value="diferenciais"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Diferenciais
              </TabsTrigger>
              <TabsTrigger
                value="compra_segura"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Compra Segura
              </TabsTrigger>
              <TabsTrigger
                value="guia"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c59b5f] data-[state=active]:text-[#c59b5f] rounded-none px-0 py-3 font-bold text-sm text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                Guia de Medidas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="geral" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_geral || product?.description || fallbackProduct.description }} />
            </TabsContent>

            <TabsContent value="tecido" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_tecido || 'Informação sobre composição de tecido não disponível.' }} />
            </TabsContent>

            <TabsContent value="modelagem" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_modelagem || 'Informação sobre modelagem e caimento não disponível.' }} />
            </TabsContent>

            <TabsContent value="cuidados" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_cuidados || 'Informação sobre conservação e lavagem não disponível.' }} />
            </TabsContent>

            <TabsContent value="diferenciais" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_diferenciais || 'Diferenciais exclusivos do produto não disponíveis.' }} />
            </TabsContent>

            <TabsContent value="compra_segura" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              <div className="prose prose-sm max-w-none text-gray-600 font-sans" dangerouslySetInnerHTML={{ __html: product?.desc_compra_segura || 'Informações sobre garantia, trocas e segurança de pagamento.' }} />
            </TabsContent>

            <TabsContent value="guia" className="text-sm text-gray-600 leading-relaxed font-light animate-in fade-in duration-500">
              {(() => {
                const guia = getSizingTableData(productCategoria);
                return (
                  <div className="space-y-4">
                    <p className="text-gray-500 text-xs italic">{guia.intro}</p>
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-100">
                            {guia.headers.map((h, i) => (
                              <th key={i} className="p-4 font-bold text-gray-700 uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {guia.rows.map((row, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="p-4 font-medium text-gray-600">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="container-custom py-16 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#c59b5f]" />
          Quem comprou, também amou
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {relatedProductsList.map((relProduct) => (
            <ProductCard
              key={relProduct.id}
              produto={relProduct}
              onFavoriteToggle={() => { }}
            />
          ))}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          >
            {/* Sombras suaves sobrepostas */}
            <div className="absolute inset-0 -top-8 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

            <div className="relative px-4 pb-6 pt-4 border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
              {/* Resumo do produto mobile */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                    <img src={resolvedImages[selectedImageIdx]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{productCategoria}</div>
                    <div className="font-bold text-gray-900 text-sm">{formatPrice(activePrice)}</div>
                  </div>
                </div>

                {!semVariacoes && (
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-full border border-gray-100">
                    <span className="w-3 h-3 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: getColorHex(activeColorName) }} />
                    <span className="text-xs font-bold text-gray-700">{selectedSize}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="h-[48px] bg-white border border-gray-200 rounded-xl flex items-center px-1 shrink-0">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    disabled={semVariacoes || quantity <= 1}
                    className="w-10 h-full flex items-center justify-center text-gray-500 disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => (!maxPurchaseQuantity || quantity < maxPurchaseQuantity) && setQuantity(quantity + 1)}
                    disabled={semVariacoes || (maxPurchaseQuantity && quantity >= maxPurchaseQuantity)}
                    className="w-10 h-full flex items-center justify-center text-gray-500 disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <Button
                  onClick={() => {
                    handleAddToCart();
                    // Opcional: feedback visual extra no mobile ou abrir mini-cart
                  }}
                  disabled={semVariacoes || (activeVariation && activeVariation.estoque <= 0)}
                  className={`flex-1 h-[48px] rounded-xl text-xs font-bold tracking-wider uppercase shadow-md ${semVariacoes || (activeVariation && activeVariation.estoque <= 0)
                    ? 'bg-gray-300 text-gray-500 border-0'
                    : isReseller
                      ? 'bg-gray-900 hover:bg-black text-white'
                      : 'bg-[#c59b5f] hover:bg-[#a37c46] text-white'
                    }`}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  ADICIONAR
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}