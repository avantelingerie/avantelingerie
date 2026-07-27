import React from 'react';
import { Tag } from 'lucide-react';

export default function PriceDisplay({ 
  precoAtacado, 
  precoAntigo, 
  precoVarejo 
}) {
  return (
    <div className="space-y-2">
      {/* Wholesale Band - Moderate Size */}
      {precoAtacado && (
        <div className="bg-primary rounded-md px-3 py-1.5 flex items-center justify-center gap-2">
          <Tag className="w-3.5 h-3.5 text-primary-foreground" />
          <span className="text-xs font-medium text-primary-foreground uppercase tracking-wide">
            Atacado:
          </span>
          <span className="text-sm font-semibold" style={{ color: '#B8860B' }}>
            R$ {precoAtacado.toFixed(2).replace('.', ',')}
          </span>
        </div>
      )}

      {/* Retail Price Pair - LARGER Typography (Visual Priority) */}
      <div className="flex items-center justify-center gap-3">
        {precoAntigo && (
          <span className="text-base text-muted-foreground line-through">
            R$ {precoAntigo.toFixed(2).replace('.', ',')}
          </span>
        )}
        <span className="text-2xl font-bold text-primary">
          R$ {precoVarejo.toFixed(2).replace('.', ',')}
        </span>
      </div>
    </div>
  );
}