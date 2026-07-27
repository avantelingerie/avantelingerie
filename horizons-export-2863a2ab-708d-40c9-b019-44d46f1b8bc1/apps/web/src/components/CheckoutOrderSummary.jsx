import React from 'react';
import { ShoppingBag, Tag, ShieldCheck, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

export default function CheckoutOrderSummary({
  cart,
  subtotal,
  finalTotal,
  finalDiscountAmount,
  activeBenefitMessage,
  benefitType,
  shippingCost,
  onRemove,
  getItemPrice
}) {
  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <Card className="border-primary/10 shadow-lg bg-card overflow-hidden">
      <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShoppingBag className="w-5 h-5 text-primary" />
          Resumo do Pedido
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 flex flex-col gap-6">
        {/* Item List */}
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
          {cart.map((item) => {
            const activeItemPrice = getItemPrice ? getItemPrice(item) : item.price;
            return (
              <div key={item.cartItemId} className="flex items-start gap-4 group">
                <div className="w-16 h-16 rounded-lg bg-muted border border-primary/10 overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm font-bold text-foreground line-clamp-2 leading-tight">{item.name}</span>
                    <button
                      onClick={() => onRemove(item.cartItemId)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 -mr-1 -mt-1 shrink-0 opacity-70 hover:opacity-100"
                      aria-label="Remover produto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    Tam: {item.selectedSize || 'Padrão'} | Cor: {item.selectedColor?.startsWith('#') ? 'Personalizada' : (item.selectedColor || 'Padrão')}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-medium text-foreground">Qtd: {item.quantity}</span>
                    <span className="text-sm font-bold text-primary">{formatPrice(activeItemPrice * item.quantity)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-px w-full bg-primary/10" />

        {/* Totals Breakdown */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between text-muted-foreground font-medium">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground font-medium">
            <span>Frete</span>
            <span>{shippingCost > 0 ? formatPrice(shippingCost) : 'A calcular'}</span>
          </div>

          {finalDiscountAmount > 0 && (
            <div className={`flex flex-col gap-1 mt-1 p-3 rounded-xl border transition-all duration-300 ${benefitType === 'progressive' ? 'bg-[#FFF8E1] border-[#D4AF37]' : 'bg-[#E8F5E9] border-[#81C784]'
              }`}>
              <div className="flex items-center justify-between font-bold">
                <div className={`flex items-center gap-1.5 ${benefitType === 'progressive' ? 'text-[#8B7355]' : 'text-[#2E7D32]'}`}>
                  <Tag className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Desconto Aplicado</span>
                </div>
                <span className={benefitType === 'progressive' ? 'text-[#8B7355]' : 'text-[#2E7D32]'}>
                  -{formatPrice(finalDiscountAmount)}
                </span>
              </div>
              <span className={`text-xs ${benefitType === 'progressive' ? 'text-[#8B7355]/80' : 'text-[#2E7D32]/80'}`}>
                {activeBenefitMessage}
              </span>
            </div>
          )}
        </div>

        <div className="h-px w-full bg-primary/10" />

        {/* Final Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-foreground">Total a pagar</span>
          <span className="text-2xl font-extrabold tracking-tight text-foreground transition-all duration-300">{formatPrice(finalTotal)}</span>
        </div>

        <div className="secure-badge mt-2 border border-muted-foreground/10">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Finalização segura e criptografada</span>
        </div>
      </CardContent>
    </Card>
  );
}