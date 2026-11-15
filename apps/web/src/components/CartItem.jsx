import React from 'react';
import { Minus, Plus, Trash2, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { isExternalVideo, getYoutubeThumbnail, isDirectVideo } from '@/lib/utils.js';

export default function CartItem({ item, getItemPrice, onUpdateQuantity, onRemove }) {
  const price = getItemPrice ? getItemPrice(item) : item.price;
  const isEncomenda = Boolean(item.is_encomenda);
  const stockLimit = isEncomenda ? 99 : (typeof item.stock === 'number' ? item.stock : Infinity);
  const subtotal = price * item.quantity;

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 py-6 border-b border-primary/10 last:border-0"
    >
      <div className={`w-20 h-28 md:w-24 md:h-32 shrink-0 rounded-xl overflow-hidden border border-primary/10 relative flex items-center justify-center ${item.is_mimo ? 'bg-black p-0.5' : 'bg-muted'}`}>
        {item.image ? (
          isDirectVideo(item.image) ? (
            <div className="w-full h-full relative bg-[#1a1a1a] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#c59b5f] flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 text-black fill-black ml-0.5" />
              </div>
            </div>
          ) : isExternalVideo(item.image) ? (
            <img src={getYoutubeThumbnail(item.image)} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <img src={item.image} alt={item.name} className={`w-full h-full ${item.is_mimo ? 'object-contain' : 'object-cover'}`} />
          )
        ) : (
          <div className="w-full h-full bg-primary/5 flex items-center justify-center text-xs text-muted-foreground">Sem foto</div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow justify-between py-1">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="font-bold text-foreground text-sm md:text-base line-clamp-2 leading-tight mb-1">
              {item.name}
            </h3>
            {item.is_mimo ? (
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#D4AF37]/15 text-[#996515] dark:text-[#F3BA2F] border border-[#D4AF37]/30">
                  🎁 Presente VIP da Fábrica
                </span>
                {item.is_combo_item ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    Combo 3 Apps VIP
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                    100% Grátis
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1.5">
                  Cor: 
                  {item.selectedColor?.startsWith('#') ? (
                    <span className="w-3 h-3 rounded-full border border-primary/20 shadow-sm" style={{ backgroundColor: item.selectedColor }}></span>
                  ) : (
                    <span className="font-medium text-foreground">{item.selectedColor || 'Padrão'}</span>
                  )}
                </span>
                <span>Tam: <strong className="text-foreground">{item.selectedSize || 'M'}</strong></span>
              </div>
            )}
            {isEncomenda && (
              <div className="mt-1.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#c59b5f]/15 text-[#8C6D3B] border border-[#c59b5f]/30">
                  🧵 Sob Encomenda (5 dias úteis de confecção)
                </span>
              </div>
            )}
          </div>
          <button 
            onClick={() => onRemove(item.cartItemId)}
            className="text-muted-foreground hover:text-destructive transition-colors p-1.5 -mr-1.5 h-fit rounded-lg hover:bg-destructive/5"
            aria-label="Remover item"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Quantidade</span>
            {item.is_mimo ? (
              <div className="flex items-center text-xs font-bold text-foreground bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-lg shadow-xs">
                1 un (Acesso Digital)
              </div>
            ) : (
              <div className="flex items-center border border-primary/20 rounded-lg bg-background shadow-sm h-9 md:h-10">
                <button 
                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                  className="w-9 md:w-10 h-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
                  disabled={item.quantity <= 1}
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                  className="w-9 md:w-10 h-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
                  disabled={item.quantity >= stockLimit}
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="text-right">
            {item.is_mimo ? (
              price === 0 ? (
                <div>
                  <div className="text-[11px] text-muted-foreground line-through">De R$ 97,00</div>
                  <div className="text-sm md:text-base font-extrabold text-[#10b981]">
                    GRÁTIS HOJE
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[11px] text-muted-foreground line-through">De R$ 97,00</div>
                  <div className="text-sm md:text-base font-extrabold text-foreground">
                    {formatPrice(subtotal)}
                  </div>
                </div>
              )
            ) : (
              <>
                <div className="text-xs text-muted-foreground mb-0.5">{formatPrice(price)} / un</div>
                <div className="font-bold text-foreground text-base md:text-lg">{formatPrice(subtotal)}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}