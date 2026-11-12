// Caminho do arquivo no Horizons: apps/web/src/pages/CategoryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  Grid2X2,
  X,
  Star,
  Check,
  MessageCircle,
  Sparkles,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.jsx';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.jsx';
import pb from '@/lib/pocketbaseClient.js';
import ProductCard from '@/components/ProductCard.jsx';

const SIZES = ['P', 'M', 'G', 'GG'];
const COLORS = [
  { name: 'Preto', hex: '#000000' },
  { name: 'Branco', hex: '#FFFFFF' },
  { name: 'Sensuale', hex: '#8B0000' },
  { name: 'Romance', hex: '#FFC0CB' },
  { name: 'Nude', hex: '#E6C2A4' },
  { name: 'Bebê', hex: '#ADD8E6' }
];
const TYPES = ['Conjunto', 'Calcinha', 'Sutiã', 'Cropped', 'Body'];

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isModoAtacado = searchParams.get('modo') === 'atacado';

  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const [layout, setLayout] = useState(4); // 2 or 4 columns
  const [sort, setSort] = useState(isModoAtacado ? 'price' : '-vendidos_semana');
  const [filters, setFilters] = useState({
    sizes: [],
    colors: [],
    types: [],
    price: [0, 500]
  });

  const [categoriaId, setCategoriaId] = useState(null);
  const [colecaoId, setColecaoId] = useState(null);
  const [entityName, setEntityName] = useState(''); // Real name from DB

  const formattedCategoryName = entityName || (categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace(/-/g, ' ')
    : 'Todas as Peças');

  // Sincroniza modo atacado para ordenação pelo menor preço e memória de compras
  useEffect(() => {
    if (isModoAtacado) {
      setSort('price');
      try {
        localStorage.setItem('avante_modo_compra', 'atacado');
      } catch (e) {}
    }
  }, [isModoAtacado]);

  // Busca o ID da categoria ou coleção pelo slug assim que categoryName mudar
  useEffect(() => {
    setCategoriaId(null);
    setColecaoId(null);
    setEntityName('');
    if (!categoryName || categoryName === 'todas') return;

    const findEntity = async () => {
      try {
        const cat = await pb.collection('categorias').getFirstListItem(`slug = "${categoryName}"`, { $autoCancel: false });
        setCategoriaId(cat.id);
        setEntityName(cat.nome);
      } catch (e1) {
        try {
          const col = await pb.collection('colecoes').getFirstListItem(`slug = "${categoryName}"`, { $autoCancel: false });
          setColecaoId(col.id);
          setEntityName(col.nome);
        } catch (e2) {
          setCategoriaId('__not_found__');
        }
      }
    };
    findEntity();
  }, [categoryName]);

  const buildFilterString = useCallback(() => {
    let filterStr = 'status = true';

    if (categoryName && categoryName !== 'todas') {
      if (categoriaId && categoriaId !== '__not_found__') {
        filterStr = `status = true && categoria_id = "${categoriaId}"`;
      } else if (colecaoId) {
        filterStr = `status = true && colecoes_ids ~ "${colecaoId}"`;
      } else if (categoriaId === '__not_found__') {
        filterStr = 'status = true && id = ""';
      }
    }

    if (filters.sizes.length > 0) {
      const sizeFilters = filters.sizes.map(s => `sizes ~ '"${s}"'`).join(' || ');
      filterStr += ` && (${sizeFilters})`;
    }

    if (filters.colors.length > 0) {
      const colorFilters = filters.colors.map(c => `colors ~ '"${c}"'`).join(' || ');
      filterStr += ` && (${colorFilters})`;
    }

    if (filters.types.length > 0) {
      const typeFilters = filters.types.map(t => `name ~ "${t}"`).join(' || ');
      filterStr += ` && (${typeFilters})`;
    }

    if (filters.price[0] > 0 || filters.price[1] < 500) {
      filterStr += ` && (price >= ${filters.price[0]} && price <= ${filters.price[1]})`;
    }

    return filterStr;
  }, [categoryName, categoriaId, filters]);

  const fetchProducts = useCallback(async (pageNum = 1, isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);
    else setLoadingMore(true);

    try {
      const result = await pb.collection('products').getList(pageNum, 24, {
        filter: buildFilterString(),
        sort: sort,
        expand: 'categoria_id',
        $autoCancel: false
      });

      if (isLoadMore) {
        setProducts(prev => [...prev, ...result.items]);
      } else {
        setProducts(result.items);
      }

      setTotalItems(result.totalItems);
      setHasMore(result.page < result.totalPages);
      setPage(result.page);
    } catch (error) {
      console.error('Error fetching products:', error);
      if (!isLoadMore) {
        setProducts([]);
        setTotalItems(0);
        setHasMore(false);
        setPage(1);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [buildFilterString, sort]);

  useEffect(() => {
    if (categoryName && categoryName !== 'todas' && categoriaId === null && colecaoId === null) return;
    fetchProducts(1, false);
    window.scrollTo(0, 0);
  }, [fetchProducts, categoryName, categoriaId, colecaoId]);

  const handleLoadMore = () => {
    if (hasMore && !loadingMore) {
      fetchProducts(page + 1, true);
    }
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const removeFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const getActiveFiltersCount = () => {
    return filters.sizes.length + filters.colors.length + filters.types.length + (filters.price[0] > 0 || filters.price[1] < 500 ? 1 : 0);
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 tracking-wide uppercase">Tamanho</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => toggleFilter('sizes', size)}
              className={`w-11 h-11 rounded-xl border text-xs font-extrabold transition-all duration-300 ${filters.sizes.includes(size)
                  ? 'bg-[#121212] text-white border-transparent shadow-md'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-[#c59b5f]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 tracking-wide uppercase">Cor</h4>
        <div className="flex flex-wrap gap-3">
          {COLORS.map(color => (
            <button
              key={color.hex}
              onClick={() => toggleFilter('colors', color.hex)}
              className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${filters.colors.includes(color.hex)
                  ? 'border-[#c59b5f] scale-110 shadow-md'
                  : 'border-transparent shadow-sm hover:scale-110'
                }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {filters.colors.includes(color.hex) && (
                <Check className={`w-4 h-4 ${color.hex === '#FFFFFF' || color.hex === '#F5F5DC' ? 'text-black' : 'text-white'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 tracking-wide uppercase">Tipo de Peça</h4>
        <div className="flex flex-wrap gap-2">
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => toggleFilter('types', type)}
              className={`px-5 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filters.types.includes(type)
                  ? 'bg-[#c59b5f] text-black border-transparent shadow-sm'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-[#c59b5f]'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold text-gray-900 tracking-wide uppercase">Faixa de Preço</h4>
          <span className="text-xs font-bold text-[#c59b5f]">
            R$ {filters.price[0]} - R$ {filters.price[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          value={filters.price}
          onValueChange={(val) => setFilters(prev => ({ ...prev, price: val }))}
          className="w-full text-[#c59b5f]"
        />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FFFBF8] font-sans text-gray-800">
      <Helmet>
        <title>{formattedCategoryName} | Avante Lingerie</title>
      </Helmet>

      {/* CATEGORY BANNER */}
      <div className="bg-[#121212] pt-28 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 relative overflow-hidden border-b border-[#c59b5f]/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,95,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex flex-col items-start w-full md:w-1/2 z-20">
            <div className="flex items-center gap-2 text-white/50 text-xs md:text-sm mb-4 font-medium tracking-wide">
              <Link to="/" className="hover:text-[#c59b5f] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/categoria/todas" className="hover:text-[#c59b5f] transition-colors cursor-pointer">Categorias</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#c59b5f] font-bold">
                {isModoAtacado ? 'Atacado da Fábrica' : formattedCategoryName}
              </span>
            </div>

            {isModoAtacado ? (
              <>
                <div className="inline-flex items-center bg-[#c59b5f]/15 border border-[#c59b5f]/40 rounded-full px-4 py-1.5 text-[#c59b5f] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                  Fábrica Própria em Nova Friburgo/RJ • Venda Direta
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-5.5xl font-serif font-bold text-[#c59b5f] mb-3 leading-tight drop-shadow-md">
                  Catálogo de Atacado da Fábrica
                </h1>

                <p className="text-gray-100 text-sm md:text-base mb-4 font-medium leading-relaxed max-w-xl">
                  Confeccionamos nossas próprias peças com padrão de alta costura em Nova Friburgo. Venda direta da fábrica no Varejo e Atacado.
                </p>

                {/* Box de Condição Especial de Fábrica */}
                <div className="bg-gradient-to-r from-black/70 to-[#1e1a14]/70 border border-[#c59b5f]/30 rounded-2xl p-4 mb-6 backdrop-blur-md max-w-xl shadow-lg">
                  <div className="flex items-center gap-2 text-[#c59b5f] font-bold text-xs uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4 text-[#c59b5f]" /> Condição Especial da Fábrica
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                    Pedido Mínimo de apenas <strong className="text-white">R$ 69,90</strong> na sacola para liberar o preço de atacado. Ao finalizar a compra, você é aprovada automaticamente como <strong className="text-[#c59b5f]">Revendedora Oficial VIP</strong>.
                  </p>
                </div>

                {/* Ações Atacado: WhatsApp + Alternador para Varejo */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://wa.me/5522981225010?text=Ol%C3%A1%20Lia!%20Vim%20pelo%20Cat%C3%A1logo%20de%20Atacado%20da%20Avante%20Lingerie%20e%20gostaria%20de%20conhecer%20as%20condi%C3%A7%C3%B5es%20de%20f%C3%A1brica."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs md:text-sm px-6 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" /> Falar com a Consultora Lia no WhatsApp
                  </a>

                  <button
                    onClick={() => {
                      const p = new URLSearchParams(searchParams);
                      p.delete('modo');
                      setSearchParams(p);
                      try { localStorage.removeItem('avante_modo_compra'); } catch (e) {}
                    }}
                    className="text-xs text-gray-400 hover:text-white underline transition-colors px-3 py-2"
                  >
                    Ver preços de Varejo (peças avulsas)
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5.5xl lg:text-6.5xl font-serif font-bold text-[#c59b5f] mb-4 leading-tight drop-shadow-md">
                  {formattedCategoryName}
                </h1>
                <p className="text-gray-300 text-base md:text-lg mb-6 max-w-md font-light leading-relaxed">
                  Peças exclusivas de alta costura que abraçam e valorizam a beleza do seu corpo com conforto absoluto e o toque de ouro Avante.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <button
                    onClick={() => {
                      const p = new URLSearchParams(searchParams);
                      p.set('modo', 'atacado');
                      setSearchParams(p);
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#c59b5f] to-[#e5c595] text-black font-extrabold text-xs px-5 py-3 rounded-full shadow-md hover:brightness-110 transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4" /> 🏷️ Ver Preços de Atacado da Fábrica (Mínimo R$ 69,90)
                  </button>

                  <div className="inline-flex items-center bg-white/5 border border-[#c59b5f]/30 rounded-full px-5 py-2 text-white text-xs font-semibold backdrop-blur-sm shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#c59b5f] mr-2.5 animate-pulse"></span>
                    {totalItems} produtos encontrados
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MÍDIA DO BANNER: VÍDEO DA FÁBRICA NO MODO ATACADO OU IMAGEM NO VAREJO */}
          {isModoAtacado ? (
            <div className="w-full md:w-1/2 h-[260px] md:h-[350px] relative rounded-3xl overflow-hidden border border-[#c59b5f]/30 shadow-2xl bg-black">
              <video
                src="https://avantelingerie.com.br/video/hero_2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 z-10 bg-black/60 backdrop-blur-md rounded-xl p-2.5 border border-[#c59b5f]/30 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Confeccionado em Nova Friburgo — RJ
                </span>
                <span className="text-[10px] text-[#c59b5f] font-bold uppercase tracking-wider">Alta Costura</span>
              </div>
            </div>
          ) : (
            <div className="w-full md:w-1/2 h-[220px] md:h-[320px] relative rounded-3xl overflow-hidden border border-[#c59b5f]/30 shadow-2xl bg-black flex items-center justify-center group">
              <img
                src="/banner-avante-institucional.jpg"
                alt="Avante Lingerie — Fábrica em Nova Friburgo RJ"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
            </div>
          )}

        </div>
      </div>

      {/* STICKY FILTER & SORT BAR */}
      <div className="sticky top-[70px] md:top-[80px] z-40 bg-white border-b border-gray-100 shadow-premium-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-800 hover:bg-[#FFFBF8] hover:text-[#c59b5f] hover:border-[#c59b5f] rounded-full px-6 transition-all duration-300">
                  <SlidersHorizontal className="w-4 h-4 text-[#c59b5f]" />
                  <span className="font-bold text-xs uppercase tracking-wider">Filtros</span> {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto bg-[#FFFBF8] border-r border-[#c59b5f]/15">
                <SheetHeader className="mb-6 border-b border-gray-100 pb-4">
                  <SheetTitle className="font-serif text-2xl text-gray-900 font-bold">Filtrar Vitrine</SheetTitle>
                </SheetHeader>
                <FilterContent />
                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-full py-6 text-xs font-bold uppercase tracking-wider border-gray-200 hover:bg-gray-50 hover:text-black transition-all duration-300"
                    onClick={() => setFilters({ sizes: [], colors: [], types: [], price: [0, 500] })}
                  >
                    Limpar
                  </Button>
                  <SheetTrigger asChild>
                    <Button className="flex-1 bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black font-bold text-xs uppercase tracking-wider rounded-full py-6 transition-all duration-300 shadow-md">
                      Aplicar Filtros
                    </Button>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:inline-block">
              Exibindo {products.length} de {totalItems} joias
            </span>
          </div>

          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[190px] border-gray-200 bg-white text-gray-800 font-bold text-xs uppercase tracking-widest rounded-full px-5 py-5 focus:ring-[#c59b5f] focus:border-[#c59b5f]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="border-[#c59b5f]/20">
                <SelectItem value="-vendidos_semana">Mais Vendidos</SelectItem>
                <SelectItem value="price">Menor Preço</SelectItem>
                <SelectItem value="-price">Maior Preço</SelectItem>
                <SelectItem value="-created">Novidades</SelectItem>
                <SelectItem value="-discount_percentage">Maior Desconto</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden md:flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
              <button
                onClick={() => setLayout(2)}
                className={`p-2 rounded-full transition-all duration-300 ${layout === 2 ? 'bg-white shadow-sm text-black scale-105' : 'text-gray-400 hover:text-black'}`}
                aria-label="Visualização em 2 colunas"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout(4)}
                className={`p-2 rounded-full transition-all duration-300 ${layout === 4 ? 'bg-white shadow-sm text-black scale-105' : 'text-gray-400 hover:text-black'}`}
                aria-label="Visualização em 4 colunas"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ACTIVE FILTERS TAGS */}
      {getActiveFiltersCount() > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Filtros ativos:</span>

          {filters.sizes.map(size => (
            <span key={`size-${size}`} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#c59b5f]/20 text-xs font-bold text-gray-800 shadow-premium-sm transition-all">
              Tam: {size}
              <button onClick={() => removeFilter('sizes', size)} className="hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5 text-[#c59b5f]" /></button>
            </span>
          ))}

          {filters.colors.map(color => {
            const colorName = COLORS.find(c => c.hex === color)?.name || color;
            return (
              <span key={`color-${color}`} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#c59b5f]/20 text-xs font-bold text-gray-800 shadow-premium-sm transition-all">
                Cor: {colorName}
                <button onClick={() => removeFilter('colors', color)} className="hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5 text-[#c59b5f]" /></button>
              </span>
            );
          })}

          {filters.types.map(type => (
            <span key={`type-${type}`} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#c59b5f]/20 text-xs font-bold text-gray-800 shadow-premium-sm transition-all">
              Tipo: {type}
              <button onClick={() => removeFilter('types', type)} className="hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5 text-[#c59b5f]" /></button>
            </span>
          ))}

          {(filters.price[0] > 0 || filters.price[1] < 500) && (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#c59b5f]/20 text-xs font-bold text-gray-800 shadow-premium-sm transition-all">
              R$ {filters.price[0]} - R$ {filters.price[1]}
              <button onClick={() => setFilters(prev => ({ ...prev, price: [0, 500] }))} className="hover:text-red-500 transition-colors"><X className="w-3.5 h-3.5 text-[#c59b5f]" /></button>
            </span>
          )}

          <button
            onClick={() => setFilters({ sizes: [], colors: [], types: [], price: [0, 500] })}
            className="text-xs font-bold uppercase tracking-wider text-[#c59b5f] hover:text-[#121212] transition-colors ml-2 hover:underline"
          >
            Limpar todos
          </button>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        {loading ? (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${layout === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6 md:gap-8`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] w-full rounded-3xl border border-[#c59b5f]/15" />
                <Skeleton className="h-5 w-3/4 bg-gray-150" />
                <Skeleton className="h-4 w-1/2 bg-gray-150" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-white border border-[#c59b5f]/20 rounded-full flex items-center justify-center mb-6 shadow-premium-sm">
              <X className="w-8 h-8 text-[#c59b5f]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-400 font-light max-w-sm mb-8 text-sm">
              Não encontramos peças que correspondam aos filtros selecionados. Tente remover alguns filtros para ver mais opções.
            </p>
            <Button
              onClick={() => setFilters({ sizes: [], colors: [], types: [], price: [0, 500] })}
              className="bg-[#121212] hover:bg-[#c59b5f] text-white hover:text-black font-bold text-xs uppercase tracking-wider rounded-full px-8 py-5 transition-all duration-300"
            >
              Limpar Filtros
            </Button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${layout === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6 md:gap-8`}>
            {products.map((product, index) => (
              <React.Fragment key={product.id}>
                <ProductCard
                  produto={product}
                  isAtacadoMode={isModoAtacado}
                  onComprarAgora={(p) => navigate(`/produto/${p.id}${isModoAtacado ? '?modo=atacado' : ''}`)}
                />

                {/* INLINE LUXURY BANNER EVERY 8 PRODUCTS */}
                {(index + 1) % 8 === 0 && index !== products.length - 1 && (
                  <div className="col-span-full my-6 md:my-10 bg-gradient-to-r from-[#121212] to-[#1e1e1e] border border-[#c59b5f]/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://horizons-cdn.hostinger.com/2863a2ab-708d-40c9-b019-44d46f1b8bc1/32a1bb1a0ab84a2ba361f1c75c87c712.png')] opacity-[0.03] mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c59b5f]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c59b5f]/10 transition-colors duration-700"></div>

                    <div className="relative z-10 space-y-2 max-w-xl text-left">
                      <span className="text-[10px] font-bold text-[#c59b5f] uppercase tracking-[3px]">Curadoria de Luxo</span>
                      <h4 className="text-xl md:text-2.5xl font-serif font-bold text-white">Adicione estilo e toque de seda ao seu dia</h4>
                      <p className="text-gray-400 text-xs font-light leading-relaxed">
                        Peças confeccionadas com renda francesa importada e microfibra premium de alta tecnologia. Vista amor-próprio com a modelagem sob medida Avante.
                      </p>
                    </div>

                    <Button
                      onClick={() => navigate('/lojas')}
                      className="relative z-10 shrink-0 bg-gradient-to-r from-[#c59b5f] to-[#e5c595] text-black font-bold text-xs uppercase tracking-wider rounded-xl px-8 py-5.5 transition-all duration-300 shadow-md active:scale-95 border border-[#c59b5f]/30 hover:brightness-110"
                    >
                      Conhecer Nossas Lojas
                    </Button>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {hasMore && (
          <div className="mt-16 text-center">
            <Button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-transparent hover:bg-[#121212] text-gray-800 hover:text-white border-2 border-gray-200 hover:border-transparent font-bold text-xs uppercase tracking-wider rounded-full px-12 py-5.5 transition-all duration-300 shadow-premium-sm disabled:opacity-50"
            >
              {loadingMore ? 'Carregando mais joias...' : 'Carregar mais produtos'}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}