// Caminho do arquivo no Horizons: apps/web/src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Star, Lock, ArrowLeftRight, Package, CheckCircle2, Sparkles, ChevronRight, Headphones, Shield, Heart, ShoppingBag, Percent, TrendingUp, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient.js';
import useEmblaCarousel from 'embla-carousel-react';
import ProductCard from '@/components/ProductCard.jsx';
import TestimonialCarousel from '@/components/TestimonialCarousel.jsx';
import FAQAccordion from '@/components/FAQAccordion.jsx';
import CollectionCard from '@/components/CollectionCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import ResellersSection from '@/components/ResellersSection.jsx';
import TestimonialsSection from '@/components/TestimonialsSection.jsx';
import AffiliatedStoresSection from '@/components/AffiliatedStoresSection.jsx';
import StoreSection from '@/components/StoreSection.jsx';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [videoVersion] = useState(Date.now());
  const navigate = useNavigate();
  const [data, setData] = useState({
    maisVendidos: [],
    favorites: [],
    promos: [],
    newArrivals: [],
    kits: [],
    testimonials: []
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    if (isCarouselHovered) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);
    
    return () => clearInterval(interval);
  }, [emblaApi, isCarouselHovered]);

  const categories = [
    { id: 1, name: 'Conjuntos', image: 'https://images.unsplash.com/photo-1568441556126-f36ae0900180?w=600&q=80', link: '/categoria/conjuntos' },
    { id: 2, name: 'Calcinhas', image: 'https://images.unsplash.com/photo-1701017718943-996aa586e955?w=600&q=80', link: '/categoria/calcinhas' },
    { id: 3, name: 'Sutiãs', image: 'https://images.unsplash.com/photo-1700252713499-858564705cc3?w=600&q=80', link: '/categoria/sutias' },
    { id: 4, name: 'Modeladores', image: 'https://images.unsplash.com/photo-1593105293490-5c69eb4ac229?w=600&q=80', link: '/categoria/modeladores' },
    { id: 5, name: 'Kits', image: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/021cb0190198eb005ad0498485c5e02a.jpg', link: '/categoria/kits' },
    { id: 6, name: 'Sensuais', image: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c2d4624557c0de0eb4a45ebd8f3f9385.jpg', link: '/categoria/sensuais' },
  ];

  useEffect(() => {
    let isMounted = true;
    const fetchHomepageData = async () => {
      try {
        const [maisVendidosRes, favoritesRes, promosRes, newArrivalsRes, kitsRes, testimonialsRes] = await Promise.allSettled([
          pb.collection('products').getList(1, 4, { filter: 'status = true && is_mais_vendido = true', sort: '-created', expand: 'categoria_id', $autoCancel: false }),
          pb.collection('products').getList(1, 4, { filter: 'status = true && is_favorito = true', sort: '-created', expand: 'categoria_id', $autoCancel: false }),
          pb.collection('products').getList(1, 4, { filter: 'status = true && is_promocao = true', sort: '-created', expand: 'categoria_id', $autoCancel: false }),
          pb.collection('products').getList(1, 4, { filter: 'status = true && is_novidade = true', sort: '-created', expand: 'categoria_id', $autoCancel: false }),
          pb.collection('products').getList(1, 4, { filter: 'status = true && (categoria = "Kits" || is_combo = true)', sort: '-created', expand: 'categoria_id', $autoCancel: false }),
          pb.collection('testimonials').getList(1, 6, { sort: '-created', $autoCancel: false })
        ]);

        const getItems = res => res.status === 'fulfilled' ? res.value.items : [];

        const padWithCard = (items, fallback, targetLength = 4) => {
          const arr = [...items];
          while (arr.length < targetLength) {
            arr.push({
              ...fallback,
              id: `${fallback.id}-${arr.length}`
            });
          }
          return arr.slice(0, targetLength);
        };

        if (isMounted) {
          setData({
            maisVendidos: padWithCard(getItems(maisVendidosRes), {
              id: 'mais-vendido-4',
              nome_produto: 'Conjunto em Microfibra Cropped Regata Gola Alta',
              categoria: 'CONJUNTOS',
              imagem_produto: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/9331fd1b840bbc52cc06e34b807d7083.jpg',
              preco_varejo: 19.9,
              nota: 4.8,
              quantidade_avaliacoes: 124,
              is_promocao: false
            }),
            favorites: padWithCard(getItems(favoritesRes), {
              id: 'fav-4',
              nome_produto: 'Conjunto Renda Branca Elegance',
              categoria: 'CONJUNTOS',
              imagem_produto: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/9331fd1b840bbc52cc06e34b807d7083.jpg',
              preco_varejo: 39.90,
              is_promocao: true,
              nota: 5.0,
              quantidade_avaliacoes: 112
            }),
            promos: padWithCard(getItems(promosRes), {
              id: 'promo-4',
              nome_produto: 'Conjunto Renda Sensualité',
              categoria: 'CONJUNTOS',
              imagem_produto: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/c2d4624557c0de0eb4a45ebd8f3f9385.jpg',
              preco_varejo: 29.90,
              is_promocao: true,
              nota: 4.8,
              quantidade_avaliacoes: 96
            }),
            newArrivals: padWithCard(getItems(newArrivalsRes), {
              id: 'novidade-4',
              nome_produto: 'Conjunto Renda Noturna Avante',
              categoria: 'CONJUNTOS',
              imagem_produto: 'https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/021cb0190198eb005ad0498485c5e02a.jpg',
              preco_varejo: 34.90,
              is_promocao: false,
              nota: 4.9,
              quantidade_avaliacoes: 142
            }),
            kits: getItems(kitsRes),
            testimonials: getItems(testimonialsRes)
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading homepage data:", error);
        if (isMounted) setLoading(false);
      }
    };
    fetchHomepageData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleComprarAgora = produto => {
    navigate(`/produto/${produto.id}`);
  };

  const handleFavoriteToggle = (id, isFav) => {
    // Favorite toast already handled in ProductCard
  };

  const scrollToSection = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const ProductGridSkeleton = ({ count = 4 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[3/4] w-full rounded-2xl border border-[#c59b5f]/20" />
          <Skeleton className="h-5 w-3/4 bg-[#c59b5f]/10" />
          <Skeleton className="h-4 w-1/2 bg-[#c59b5f]/10" />
        </div>
      ))}
    </div>
  );

  const guarantees = [
    { icon: Lock, title: "Compra 100% Segura", desc: "Seus dados pessoais e de pagamento totalmente blindados." },
    { icon: ArrowLeftRight, title: "Troca Facilitada", desc: "Sua primeira troca é por nossa conta em até 7 dias úteis." },
    { icon: Package, title: "Envio Ultra Discreto", desc: "Caixa premium lacrada, perfumada e sem marcas externas." },
    { icon: Star, title: "Padrão de Qualidade", desc: "Rendas francesas e tecidos tecnológicos hipoalergênicos." },
    { icon: Headphones, title: "Suporte Dedicado", desc: "Nossa equipe VIP disponível para te ajudar no pós-venda." }
  ];

  return (
    <main className="w-full bg-[#FDFBF9] overflow-hidden font-sans text-gray-800">
      <Helmet>
        <title>Avante Lingerie | Sinta-se linda, confortável e confiante</title>
        <meta name="description" content="Lingerie premium com design inteligente que valoriza seu corpo. Conforto inigualável com o toque de ouro Avante." />
      </Helmet>

      {/* ==========================================
          SECTION 1: LUXURY HERO (100dvh)
          ========================================== */}
      <section id="home" className="relative min-h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center">
        <video 
          key={videoVersion} 
          src="https://lmdesignerweb.com/video/video_avante.mp4" 
          className="absolute inset-0 w-full h-full object-cover z-[1] opacity-75" 
          autoPlay muted loop playsInline controls={false} preload="none" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80 z-[2]" />
        <div className="absolute inset-0 bg-[#c59b5f]/5 mix-blend-overlay z-[2]" />
        
        <div className="relative z-[3] flex flex-col items-center justify-center w-full container-custom text-center text-white px-4 pt-20 md:pt-28">
          <motion.span 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-black/55 backdrop-blur-md text-xs font-extrabold mb-8 border border-[#c59b5f]/50 text-[#c59b5f] uppercase tracking-[3px] shadow-lg shadow-[#c59b5f]/10"
          >
            <Sparkles className="w-4.5 h-4.5" /> Coleção Ouro Premium
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }} 
            className="text-4xl md:text-5.5xl lg:text-7xl font-serif text-white max-w-5xl mx-auto mb-8 drop-shadow-2xl font-bold leading-tight"
          >
            A Joia que <span className="text-[#c59b5f] italic">Abraça</span> o Seu Corpo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          >
            Descubra a harmonia perfeita entre sustentação absoluta, costuras inteligentes e a elegância atemporal que você merece sentir todos os dias.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.3 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button 
              size="lg" onClick={() => scrollToSection('categorias')} 
              className="w-full sm:w-auto bg-[#c59b5f] hover:bg-white text-black font-bold px-10 py-7 text-sm rounded-full tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-[#c59b5f]/15 border border-[#c59b5f] group uppercase"
            >
              Explorar Coleção
              <ChevronRight className="w-4.5 h-4.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" variant="outline" onClick={() => navigate('/quero-revender')} 
              className="w-full sm:w-auto bg-black/40 text-[#c59b5f] border-[#c59b5f]/50 hover:bg-[#c59b5f] hover:text-black hover:border-transparent font-bold px-10 py-7 text-sm rounded-full tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm uppercase"
            >
              Quero Revender
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: INFINITE GLASS GUARANTEES
          ========================================== */}
      <section className="py-10 bg-white border-b border-[#c59b5f]/10 overflow-hidden relative z-20 shadow-sm">
        <div className="relative flex w-full flex-col justify-center">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex w-max items-center" 
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {[...guarantees, ...guarantees].map((g, i) => (
              <div key={i} className="flex flex-col items-center text-center px-8 group w-[260px] md:w-[300px] shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#FFF8F5] border border-[#c59b5f]/20 flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-[#c59b5f] group-hover:scale-105">
                  <g.icon className="w-6 h-6 text-[#c59b5f] group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-sm font-bold tracking-wide uppercase text-gray-900 mb-1 group-hover:text-[#c59b5f] transition-colors">{g.title}</h3>
                <p className="text-xs text-gray-500 font-light leading-normal max-w-[210px]">{g.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: PREMIUM CATEGORIES SLIDER
          ========================================== */}
      <section id="categorias" className="py-20 bg-white relative z-10">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              O Closet de Luxo
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Nossas Categorias
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto mt-2">
              Toque no tecido, escolha o caimento ideal e explore o melhor de Avante.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div 
            className="overflow-hidden group/carousel py-4" 
            ref={emblaRef}
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <div className="flex -ml-4">
              {categories.map((cat) => (
                <div key={cat.id} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33.3%] lg:flex-[0_0_25%] pl-4">
                  <a href={cat.link} onClick={(e) => { e.preventDefault(); navigate(cat.link); }} className="block h-full outline-none">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-500 group/card h-full flex flex-col hover:shadow-xl hover:border-[#c59b5f]/30">
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover/card:scale-105" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-85" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform transition-all duration-500 group-hover/card:-translate-y-1.5">
                          <h3 className="text-white font-serif text-2xl font-semibold tracking-wider drop-shadow-md">{cat.name}</h3>
                          <div className="w-8 h-0.5 bg-[#c59b5f] mx-auto mt-3 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 shadow-md"></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: BEST SELLERS (MAIS VENDIDOS)
          ========================================== */}
      <section id="mais-vendidos" className="py-24 bg-[#FFFBF8] relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#c59b5f]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Consagrados por Milhares
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Mais Vendidos da Avante
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-lg mx-auto mt-2">
              Os modelos favoritos eleitos por nossas clientes por seu caimento esculpido e durabilidade.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          
          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {data.maisVendidos.slice(0, 4).map(p => (
                <ProductCard key={p.id} produto={p} onComprarAgora={handleComprarAgora} onFavorite={handleFavoriteToggle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: RESELLERS & TESTIMONIALS SECTIONS
          ========================================== */}
      <section id="revendedores" className="relative z-10">
        <ResellersSection />
      </section>

      <section className="relative z-10">
        <TestimonialsSection />
      </section>

      {/* ==========================================
          SECTION 6: DUAL PERSUASIVE BANNER (VAREJO & ATACADO)
          ========================================== */}
      <section id="beneficios" className="py-24 bg-gradient-to-br from-[#0b0b0b] via-[#161616] to-[#251b11] text-white border-y border-[#c59b5f]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-[#c59b5f]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-[#c59b5f]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }} 
            initial={{ opacity: 0, y: -20 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-[#c59b5f]/10 border border-[#c59b5f]/30 text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f] mb-4">
              <Sparkles className="w-3.5 h-3.5" /> NA AVANTE VOCÊ GANHA SEMPRE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight max-w-4xl mx-auto">
              Luxo que se Sente, <span className="text-[#c59b5f] italic">Economia</span> que se Vive!
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#c59b5f] to-transparent mx-auto mt-5 mb-6"></div>
            <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Descontos incríveis no varejo para uso próprio ou lucros imbatíveis comprando com preço de fábrica no atacado. Unimos luxo absoluto com economia sem limites para você ganhar sempre.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* CARD VAREJO */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }} 
              initial={{ opacity: 0, x: -30 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="bg-white/[0.02] backdrop-blur-md border border-[#c59b5f]/15 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-[#c59b5f]/40 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] font-bold text-[#c59b5f] bg-[#c59b5f]/10 border border-[#c59b5f]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                    Uso Pessoal
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Varejo Premium</span>
                    <span className="text-lg font-bold text-[#c59b5f] font-serif">Até 15% OFF</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Compre para Você</h3>
                <p className="text-gray-400 text-sm font-light mb-8">A modelagem que abraça suas curvas com descontos acumuláveis e cupons especiais.</p>
                
                <ul className="space-y-5 mb-10">
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <Percent className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">PIX Extra (+5% OFF)</h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">Ganhe desconto cumulativo imediato em todas as compras com PIX.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <Heart className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Desconto Progressivo</h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">Quanto mais conjuntos adicionar, maior é o desconto direto no carrinho.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <ArrowLeftRight className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">1ª Troca Grátis Garantida</h4>
                      <p className="text-xs text-gray-400 font-light mt-0.5">Ficou pequena ou grande? Trocamos sem nenhum custo para você em até 30 dias.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <Button
                onClick={() => scrollToSection('categorias')}
                className="w-full py-6 rounded-xl border border-[#c59b5f]/40 text-[#c59b5f] bg-transparent hover:bg-[#c59b5f] hover:text-black hover:border-transparent font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                Explorar Coleções
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {/* CARD ATACADO */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }} 
              initial={{ opacity: 0, x: 30 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#121212] to-[#251e15] border-2 border-[#c59b5f] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-[0_0_45px_rgba(197,155,95,0.25)] transition-all duration-500 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c59b5f]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c59b5f]/20 transition-all duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[9px] font-bold text-black bg-[#c59b5f] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                    Faturamento Real
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Preço de Fábrica</span>
                    <span className="text-lg font-bold text-white font-serif">50% de Desconto</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-white mb-2 relative z-10">Revenda Avante Lingerie</h3>
                <p className="text-gray-400 text-sm font-light mb-8 relative z-10">Seja dona do seu negócio e conquiste sua liberdade financeira revendendo luxo.</p>
                
                <ul className="space-y-5 mb-10 relative z-10">
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <Crown className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Compre à Preço de Fábrica</h4>
                      <p className="text-xs text-gray-300 font-light mt-0.5">Destrave o desconto automático de atacado com pedido mínimo de apenas R$ 500.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <ShoppingBag className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Descontos Progressivos (+2% e +5%)</h4>
                      <p className="text-xs text-gray-300 font-light mt-0.5">Conquiste descontos extras em faturamentos de alto volume ou dependendo do seu Estado.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#c59b5f]/10 flex items-center justify-center shrink-0 border border-[#c59b5f]/20">
                      <Shield className="w-4.5 h-4.5 text-[#c59b5f]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Mídias e Lia Assistente Premium</h4>
                      <p className="text-xs text-gray-300 font-light mt-0.5">Acesso completo a materiais fotográficos de estúdio e suporte comercial humanizado.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <Button
                onClick={() => navigate('/quero-revender')}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-[#c59b5f] to-[#e5c595] text-black font-bold uppercase tracking-wider text-xs hover:from-white hover:to-white transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-[0_4px_15px_rgba(197,155,95,0.3)] relative z-10 border border-[#c59b5f]"
              >
                Seja uma Revendedora
                <Crown className="w-4 h-4 text-black group-hover/btn:scale-110 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: FAVORITES DYNAMIC
          ========================================== */}
      <section id="favoritos" className="py-24 bg-[#FFFBF8] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Sua Próxima Joia
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Destaques de Ouro
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto mt-2">
              Modelagem refinada e luxo traduzidos em lingeries atemporais.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.favorites.slice(0, 4).map(p => (
                <ProductCard key={p.id} produto={p} onComprarAgora={handleComprarAgora} onFavorite={handleFavoriteToggle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          SECTION 8: PROMOTIONS DYNAMIC
          ========================================== */}
      {!loading && data.promos.length > 0 && (
        <section id="promocoes" className="py-24 bg-[#FFF8F5] border-y border-[#c59b5f]/15">
          <div className="container-custom">
            <div className="text-center mb-16">
              <span className="text-[10px] md:text-xs font-bold text-[#c59b5f] uppercase tracking-[3px] font-extrabold block">
                Oportunidade Premium
              </span>
              <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
                Ofertas Exclusivas
              </h2>
              <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.promos.slice(0, 4).map(p => (
                <ProductCard key={p.id} produto={p} onComprarAgora={handleComprarAgora} onFavorite={handleFavoriteToggle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          SECTION 9: LUXURY COLLECTIONS
          ========================================== */}
      <section id="colecoes" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-[#c59b5f]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Conceito & Essência
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Explore Nossas Coleções
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto mt-2">
              Concebidas artesanalmente para cada instante da sua rotina ou ocasiões especiais.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div onClick={() => navigate('/categoria/premium')} className="cursor-pointer lg:col-span-2 aspect-[4/3] lg:aspect-auto">
              <CollectionCard title="Premium" image="https://images.unsplash.com/photo-1568441556126-f36ae0900180?w=600&q=80" />
            </div>
            <div onClick={() => navigate('/categoria/essenciais')} className="cursor-pointer">
              <CollectionCard title="Essenciais" image="https://images.unsplash.com/photo-1701017718943-996aa586e955?w=600&q=80" />
            </div>
            <div onClick={() => navigate('/categoria/sensuais')} className="cursor-pointer">
              <CollectionCard title="Sensuais" image="https://images.unsplash.com/photo-1700252713499-858564705cc3?w=600&q=80" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 10: NEW ARRIVALS (LANCAMENTOS DYNAMIC)
          ========================================== */}
      <section id="lancamentos" className="py-24 bg-[#FFFBF8] border-t border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Diretamente do Ateliê
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Lançamentos Recentes
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto mt-2">
              As novidades mais frescas e perfumadas do nosso processo de criação logístico.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {data.newArrivals.slice(0, 4).map(p => (
                <ProductCard key={p.id} produto={p} onComprarAgora={handleComprarAgora} onFavorite={handleFavoriteToggle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          SECTION 11: TRUSTED CUSTOMERS CAROUSEL
          ========================================== */}
      <section id="depoimentos" className="py-24 bg-white border-y border-[#c59b5f]/15 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,95,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Depoimentos de Ouro
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              O Que Dizem Sobre Nós
            </h2>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          {loading ? (
            <Skeleton className="w-full max-w-5xl mx-auto h-72 rounded-3xl border border-[#c59b5f]/20 bg-[#FFF8F5]/50 animate-pulse" />
          ) : (
            <TestimonialCarousel testimonials={[{
              id: 1,
              rating: 5,
              customer_name: "Mariana Silva",
              city: "São Paulo, SP",
              comment: "Sempre tive dificuldade em achar sutiãs que não me machucassem no fim do dia. A Avante mudou tudo! O material premium faz toda a diferença.",
              avatar_url: "https://images.unsplash.com/photo-1608875848903-06eec0bd71e2?w=150&q=80"
            }, {
              id: 2,
              rating: 5,
              customer_name: "Juliana Costa",
              city: "Rio de Janeiro, RJ",
              comment: "A modelagem é impecável. Usei sob um vestido de festa super justo e a peça ficou invisível. Recomendo para todas as minhas amigas.",
              avatar_url: "https://images.unsplash.com/photo-1637257690670-cd7daa6e85ca?w=150&q=80"
            }, {
              id: 3,
              rating: 4,
              customer_name: "Fernanda Alves",
              city: "Belo Horizonte, MG",
              comment: "As peças são lindas, muito delicadas e as rendas não pinicam! Meu marido elogiou e eu me senti maravilhosa. A cor realça a pele.",
              avatar_url: "https://images.unsplash.com/photo-1470500507674-2cbd7f1a08ea?w=150&q=80"
            }, ...data.testimonials]} />
          )}
        </div>
      </section>

      {/* ==========================================
          SECTION 12: PARTNER BRANDS & STORES
          ========================================== */}
      <AffiliatedStoresSection />

      {/* ==========================================
          SECTION 13: FAQ ACCORDION (COMPRA CONFIÁVEL)
          ========================================== */}
      <section id="faq" className="py-24 bg-[#FFFBF8] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#c59b5f]/5 to-transparent pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[3px] text-[#c59b5f]">
              Resolva Suas Dúvidas
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-gray-900 mt-2">
              Compre com Confiança
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light max-w-md mx-auto mt-2">
              Tire todas as suas dúvidas e compre suas joias com total comodidade.
            </p>
            <div className="w-16 h-0.5 bg-[#c59b5f] mx-auto mt-4 rounded-full"></div>
          </div>
          <FAQAccordion items={[{
            question: "Como escolher o tamanho perfeito?",
            answer: "Nossa modelagem foi desenhada milimetricamente para a mulher brasileira. Siga nosso Guia de Medidas oficial e caso fique em dúvida entre dois tamanhos, nossa equipe de consultoras premium está pronta para atender você via WhatsApp."
          }, {
            question: "As peças realmente não marcam na roupa?",
            answer: "Sim. A linha Avante Invisível utiliza tecnologia Seamless e corte a laser nas bordas, eliminando elásticos e costuras grossas. Elas desaparecem completamente, mesmo sob vestidos de seda ou calças justas."
          }, {
            question: "Como funciona a garantia de troca?",
            answer: "Se a sua joia não vestir com perfeição, a primeira troca é totalmente por nossa conta. Você tem até 7 dias corridos após o recebimento para solicitar, basta manter as etiquetas originais."
          }, {
            question: "Quais os métodos de pagamento aceitos?",
            answer: "Aceitamos cartões de crédito Visa, MasterCard, Elo e Amex com parcelamento in até 6x sem juros, além de PIX seguro com processamento imediato."
          }]} />
        </div>
      </section>

      {/* ==========================================
          SECTION 14: MAP & STORES INFOS
          ========================================== */}
      <StoreSection />
    </main>
  );
}