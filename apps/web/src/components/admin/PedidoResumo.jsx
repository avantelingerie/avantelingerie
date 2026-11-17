import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Receipt, Gift, Sparkles } from 'lucide-react';

export default function PedidoResumo({ pedido }) {
  if (!pedido) return null;

  const subtotal = pedido.subtotal || (pedido.valor_total - (pedido.valor_frete || 0) + (pedido.valor_desconto || 0)) || 0;
  const desconto = pedido.desconto_valor || pedido.valor_desconto || 0;
  const frete = pedido.frete_valor || pedido.valor_frete || 0;
  const total = pedido.total || pedido.valor_total || 0;

  const observacoes = pedido.observacoes || '';
  const isCombo = observacoes.includes('Combo 3 Apps VIP') || 
    (pedido.itens && (typeof pedido.itens === 'string' ? pedido.itens.includes('Combo 3 Apps') : (pedido.itens || []).some(i => i.is_combo_item)));
  const matchBrinde = observacoes.match(/\[🎁 BRINDE VIP:\s*([^\]]+)\]/);
  const nomeBrinde = matchBrinde ? matchBrinde[1] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* DESTAQUE DE MIMOS & PRESENTES VIP */}
        {isCombo ? (
          <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                💎 Combo 3 Apps VIP (+R$ 9,90)
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                Cliente comprou o combo completo de aplicativos digitais.
              </span>
            </div>
          </div>
        ) : nomeBrinde ? (
          <div className="p-3.5 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 rounded-2xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                🎁 Presente VIP Resgatado (Grátis)
              </span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                {nomeBrinde}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-2.5 bg-zinc-500/5 border border-zinc-500/15 rounded-xl flex items-center justify-between text-xs text-muted-foreground">
            <span>Presente VIP:</span>
            <span className="font-medium text-zinc-500">Não resgatado</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between text-sm text-emerald-600">
          <span>Desconto {pedido.desconto_tipo ? `(${pedido.desconto_tipo})` : ''}</span>
          <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Frete {pedido.frete_transportadora ? `(${pedido.frete_transportadora})` : ''}</span>
          <span>+ R$ {frete.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="pt-4 border-t flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-1">Método de Pagamento</p>
          <p className="font-medium capitalize">{pedido.metodo_pagamento || pedido.forma_pagamento || 'Não informado'}</p>
        </div>
      </CardContent>
    </Card>
  );
}