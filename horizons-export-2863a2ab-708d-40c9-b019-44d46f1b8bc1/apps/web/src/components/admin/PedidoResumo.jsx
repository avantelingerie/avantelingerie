import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Receipt } from 'lucide-react';

export default function PedidoResumo({ pedido }) {
  if (!pedido) return null;

  const subtotal = pedido.subtotal || (pedido.valor_total - (pedido.valor_frete || 0) + (pedido.valor_desconto || 0)) || 0;
  const desconto = pedido.desconto_valor || pedido.valor_desconto || 0;
  const frete = pedido.frete_valor || pedido.valor_frete || 0;
  const total = pedido.total || pedido.valor_total || 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Receipt className="w-5 h-5 text-primary" />
          Resumo Financeiro
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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