import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { ShoppingBag, ArrowRight, Zap, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderSummary({ subtotal, discount, total, pixEligible, nextTierInfo, onCheckout, resellerSaving }) {
  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-lg text-foreground mb-6">Resumo do Pedido</h2>
      
      {/* Absolute B2B Factory Savings Banner */}
      {resellerSaving > 0 && (
        <div className="bg-[#FFF3E0] border border-[#FFB74D] rounded-xl p-3.5 mb-6 flex items-start gap-2.5 shadow-sm text-[#E65100]">
          <Tag className="w-5 h-5 text-[#F57C00] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">
              Economia de Fábrica
            </span>
            <span className="text-xs font-semibold leading-relaxed">
              Você economiza {formatPrice(resellerSaving)} neste pedido por comprar direto de fábrica!
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>
        
        {/* Active Discount Row */}
        {discount.amount > 0 && (
          <div className="flex justify-between text-sm text-green-700 font-medium">
            <span>Desconto Progressivo ({discount.label})</span>
            <span className="font-bold">-{formatPrice(discount.amount)}</span>
          </div>
        )}

        {/* Dynamic Benefits Area */}
        <div className="flex flex-col gap-3 py-2">
          <AnimatePresence mode="popLayout">
            {pixEligible && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="bg-[#E8F5E9] border border-[#81C784] rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
                  <div className="flex items-center text-[#2E7D32] font-bold text-xs sm:text-sm uppercase tracking-wide">
                    <Zap className="w-4 h-4 text-[#4CAF50] mr-2 shrink-0" fill="currentColor" />
                    <span>Benefício disponível: 5% OFF no PIX à vista</span>
                  </div>
                  <span className="text-[#2E7D32]/80 text-xs font-medium pl-6">
                    Finalize sua compra via Pix e garanta este desconto extra
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {nextTierInfo ? (
            <div className="bg-[#FFF8E1] border border-[#D4AF37] rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center text-[#8B7355] font-bold text-xs sm:text-sm uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-[#D4AF37] mr-2 shrink-0" fill="currentColor" />
                <span>Adicione +{formatPrice(nextTierInfo.remaining)}</span>
              </div>
              <span className="text-[#8B7355]/80 text-xs font-medium pl-6">
                para liberar {nextTierInfo.label} OFF Progressivo
              </span>
            </div>
          ) : (
            <div className="bg-[#FFF8E1] border border-[#D4AF37] rounded-xl p-3.5 flex flex-col gap-1 shadow-sm">
              <div className="flex items-center text-[#8B7355] font-bold text-xs sm:text-sm uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-[#D4AF37] mr-2 shrink-0" fill="currentColor" />
                <span>Desconto Máximo Atingido</span>
              </div>
              <span className="text-[#8B7355]/80 text-xs font-medium pl-6">
                Você garantiu 20% OFF Progressivo em sua compra
              </span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete</span>
          <span className="font-medium text-foreground text-right">Calculado abaixo</span>
        </div>
      </div>
      
      <div className="border-t border-primary/10 pt-5 mb-6">
        <div className="flex justify-between items-end">
          <span className="font-bold text-foreground">Total Estimado</span>
          <div className="text-right flex flex-col items-end">
            <span className="font-extrabold text-2xl md:text-3xl text-foreground block leading-none tracking-tight">
              {formatPrice(total)}
            </span>
            <AnimatePresence>
              {discount.amount > 0 && (
                <motion.span 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs text-green-700 font-bold mt-2 block px-2.5 py-1 bg-green-100/50 rounded-md uppercase tracking-wider"
                >
                  Economia de {formatPrice(discount.amount)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Button 
        onClick={onCheckout}
        className="w-full bg-[#3A2E2A] hover:bg-[#2A1E1A] text-white font-bold py-6 text-base rounded-xl shadow-md transition-all active:scale-[0.98] uppercase tracking-wide group"
      >
        <ShoppingBag className="w-5 h-5 mr-2 text-[#D4AF37]" />
        Finalizar Compra
        <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Button>
    </div>
  );
}