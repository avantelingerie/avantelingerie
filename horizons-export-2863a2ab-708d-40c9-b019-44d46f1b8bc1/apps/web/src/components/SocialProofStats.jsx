import React from 'react';
import { Star, Users, ShoppingBag, Flame, Package } from 'lucide-react';

export default function SocialProofStats({ stats, product, variant = 'default' }) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  // 1. Dynamic Product Variant (used in ProductPage)
  if (variant === 'product' && product) {
    const sold = product?.vendidos_semana || 0;
    const stock = product?.stock || 0;
    
    if (sold === 0 && stock === 0) return null;

    return (
      <div className="flex flex-col gap-3 mt-4 mb-8 w-full">
        {sold > 0 && (
          <div className="flex items-center gap-3.5 bg-[#FFFBF8] border border-[#c59b5f]/30 p-3.5 rounded-2xl shadow-premium-sm transition-all duration-300 hover:border-[#c59b5f]/60">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#121212] to-[#1e1e1e] border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shrink-0">
              <Flame className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <span className="text-gray-800 text-xs sm:text-sm font-medium tracking-wide leading-tight">
              Muito procurado: <span className="text-[#c59b5f] font-black">{sold} clientes</span> compraram esta semana!
            </span>
          </div>
        )}
        {stock > 0 && (
          <div className="flex items-center gap-3.5 bg-[#FFFBF8] border border-[#c59b5f]/30 p-3.5 rounded-2xl shadow-premium-sm transition-all duration-300 hover:border-[#c59b5f]/60">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#121212] to-[#1e1e1e] border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shrink-0">
              <Package className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <span className="text-gray-800 text-xs sm:text-sm font-medium tracking-wide leading-tight">
              Últimas <span className="text-[#c59b5f] font-black">{stock} unidades</span> em estoque!
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. Generic Site Stats Variant (used in HomePage)
  const data = {
    rating: stats?.average_rating || 4.8,
    customers: stats?.total_customers || 12450,
    pieces: stats?.total_pieces_sold || 45800
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6 bg-muted rounded-3xl max-w-5xl mx-auto shadow-sm">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="flex text-secondary mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-6 h-6 ${i < Math.floor(data.rating) ? 'fill-current' : 'fill-none'}`} />
          ))}
        </div>
        <p className="text-3xl font-bold text-foreground font-serif">{data.rating.toFixed(1)}/5.0</p>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Avaliação Média</p>
      </div>
      
      <div className="flex flex-col items-center text-center space-y-2 relative md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-1/4 md:after:h-1/2 md:after:w-px md:after:bg-border md:before:content-[''] md:before:absolute md:before:left-0 md:before:top-1/4 md:before:h-1/2 md:before:w-px md:before:bg-border">
        <Users className="w-8 h-8 text-primary mb-1" />
        <p className="text-3xl font-bold text-foreground font-serif">{formatNumber(data.customers)}+</p>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Clientes Satisfeitas</p>
      </div>
      
      <div className="flex flex-col items-center text-center space-y-2">
        <ShoppingBag className="w-8 h-8 text-secondary mb-1" />
        <p className="text-3xl font-bold text-foreground font-serif">{formatNumber(data.pieces)}+</p>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Peças Vendidas</p>
      </div>
    </div>
  );
}