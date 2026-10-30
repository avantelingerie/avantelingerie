import React from 'react';
import { ShoppingBag, Tag, ShieldCheck, Trash2, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { isExternalVideo, getYoutubeThumbnail, isDirectVideo } from '@/lib/utils.js';

export default function CheckoutOrderSummary({
  cart,
  subtotal,
  finalTotal,
  finalDiscountAmount,
  activeBenefitMessage,
  benefitType,
  shippingCost,
  onRemove,
  getItemPrice,
  couponCode = '',
  setCouponCode,
  appliedCoupon = null,
  couponError = '',
  isApplyingCoupon = false,
  onApplyCoupon,
  onRemoveCoupon,
  tipoCliente = 'varejo'
}) {
  const [showCouponInput, setShowCouponInput] = React.useState(Boolean(appliedCoupon));
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
                  {isDirectVideo(item.image) ? (
                    <div className="w-full h-full relative bg-[#1a1a1a] flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#c59b5f] flex items-center justify-center shadow-md">
                        <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                  ) : isExternalVideo(item.image) ? (
                    <img src={getYoutubeThumbnail(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  )}
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

          {/* Seção Cirúrgica de Cupom de Desconto (Exclusivo Varejo) */}
          {tipoCliente !== 'revendedor' && tipoCliente !== 'reseller' && (
            <div className="flex flex-col gap-2 pt-1 pb-1">
              {!appliedCoupon ? (
                <div>
                  {!showCouponInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(true)}
                      className="text-xs text-primary hover:text-primary/80 font-semibold flex items-center gap-1.5 transition-colors group cursor-pointer"
                    >
                      <Tag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      Possui cupom de desconto?
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode && setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Ex: AVANTELIA10"
                          className="w-full h-9 px-3 text-xs uppercase font-bold tracking-wider rounded-lg border border-primary/20 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (onApplyCoupon) onApplyCoupon(couponCode);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => onApplyCoupon && onApplyCoupon(couponCode)}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
                        >
                          {isApplyingCoupon ? '...' : 'Aplicar'}
                        </button>
                      </div>
                      {couponError && (
                        <span className="text-[11px] text-destructive font-medium leading-tight">
                          {couponError}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold tracking-wider">{appliedCoupon.code}</span>
                      <span className="text-[10px] text-muted-foreground">10% de desconto aplicado</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="text-xs text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                    title="Remover cupom"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          )}

          {finalDiscountAmount > 0 && (
            <div className={`flex flex-col gap-1 mt-1 p-3 rounded-xl border transition-all duration-300 ${
              benefitType === 'coupon'
                ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-800'
                : benefitType === 'progressive'
                ? 'bg-[#FFF8E1] border-[#D4AF37]'
                : 'bg-[#E8F5E9] border-[#81C784]'
              }`}>
              <div className="flex items-center justify-between font-bold">
                <div className={`flex items-center gap-1.5 ${
                  benefitType === 'coupon'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : benefitType === 'progressive'
                    ? 'text-[#8B7355]'
                    : 'text-[#2E7D32]'
                }`}>
                  <Tag className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">
                    {benefitType === 'coupon' ? 'Cupom de Desconto' : 'Desconto Aplicado'}
                  </span>
                </div>
                <span className={
                  benefitType === 'coupon'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : benefitType === 'progressive'
                    ? 'text-[#8B7355]'
                    : 'text-[#2E7D32]'
                }>
                  -{formatPrice(finalDiscountAmount)}
                </span>
              </div>
              <span className={`text-xs ${
                benefitType === 'coupon'
                  ? 'text-emerald-700/80 dark:text-emerald-400/80'
                  : benefitType === 'progressive'
                  ? 'text-[#8B7355]/80'
                  : 'text-[#2E7D32]/80'
              }`}>
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