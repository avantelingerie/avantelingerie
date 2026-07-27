import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch logic
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const res = await pb.collection('products').getList(1, 6, {
          filter: `name ~ "${debouncedQuery}" || categoria ~ "${debouncedQuery}"`,
          $autoCancel: false
        });
        setResults(res.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleResultClick = (product) => {
    onClose();
    setQuery('');
    navigate(`/produto/${product.id}`);
  };

  const handleCategorySearch = (e) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      onClose();
      navigate(`/categoria/${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-background border border-primary/20 shadow-2xl rounded-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Search Input Area */}
            <div className="relative border-b border-primary/10 bg-card">
              <form onSubmit={handleCategorySearch} className="flex items-center px-4 py-4">
                <Search className="w-6 h-6 text-muted-foreground mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar produtos, categorias..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground"
                />
                {query && (
                  <button 
                    type="button" 
                    onClick={() => setQuery('')}
                    className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </form>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 bg-muted/20">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                  <p className="text-sm font-medium">Buscando as melhores opções...</p>
                </div>
              ) : query.length >= 2 && results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-foreground font-bold text-lg mb-2">Nenhum resultado encontrado</p>
                  <p className="text-muted-foreground text-sm">Não encontramos produtos para "{query}".</p>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Produtos Encontrados</h3>
                  {results.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => handleResultClick(product)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-card border border-transparent hover:border-primary/20 hover:shadow-sm cursor-pointer transition-all group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        {product.image || product.imagem_produto ? (
                          <img 
                            src={product.imagem_produto || pb.files.getUrl(product, product.image)} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <Tag className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs font-bold text-primary mb-1 uppercase">{product.categoria || 'Produto'}</span>
                        <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{product.name || product.nome_produto}</h4>
                        <span className="text-sm font-medium text-muted-foreground">{formatPrice(product.price || product.preco_varejo || 0)}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                  
                  {results.length > 0 && (
                    <button 
                      onClick={handleCategorySearch}
                      className="mt-4 w-full py-3 rounded-xl bg-card border border-primary/20 text-primary font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Ver todos os resultados para "{query}"
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Sugestões</div>
                  {[
                    { name: 'Conjuntos Premium', path: '/categoria/conjuntos' },
                    { name: 'Lançamentos', path: '/categoria/lancamentos' },
                    { name: 'Calcinhas Invisíveis', path: '/categoria/calcinhas' },
                    { name: 'Sutiãs de Renda', path: '/categoria/sutias' }
                  ].map((sug, idx) => (
                    <button 
                      key={idx}
                      onClick={() => { onClose(); navigate(sug.path); }}
                      className="text-left px-4 py-3 rounded-xl bg-card border border-primary/10 hover:border-primary/40 hover:shadow-sm text-sm font-medium text-foreground transition-all"
                    >
                      {sug.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-muted px-4 py-3 border-t border-primary/10 text-xs text-muted-foreground flex items-center justify-between">
              <span>Pressione <kbd className="px-1.5 py-0.5 bg-background border border-primary/20 rounded-md font-mono text-[10px]">ESC</kbd> para fechar</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}