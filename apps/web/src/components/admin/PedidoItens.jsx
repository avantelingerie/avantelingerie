import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Package } from 'lucide-react';

export default function PedidoItens({ itens }) {
  let parsedItens = [];
  if (itens) {
    if (typeof itens === 'string') {
      try {
        parsedItens = JSON.parse(itens);
      } catch (e) {
        console.error('Error parsing items JSON:', e);
      }
    } else {
      parsedItens = itens;
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Itens do Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="pl-6">Produto</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-center">Qtd</TableHead>
              <TableHead className="text-right">Preço Unit.</TableHead>
              <TableHead className="text-right pr-6">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedItens.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  Nenhum item encontrado.
                </TableCell>
              </TableRow>
            ) : (
              parsedItens.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="pl-6 font-medium">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{item.nome || item.name || item.produto || 'Produto'}</span>
                      {item.is_combo_item && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-300 dark:border-amber-600/30">
                          💎 App VIP Combo
                        </span>
                      )}
                      {(item.is_mimo || item.is_digital) && !item.is_combo_item && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/30">
                          🎁 Brinde VIP Grátis
                        </span>
                      )}
                    </div>
                    {(item.size || item.tamanho || item.color || item.cor) && (
                      <span className="block text-[10px] text-muted-foreground font-normal mt-0.5">
                        {item.size || item.tamanho ? `Tam: ${item.size || item.tamanho}` : ''}
                        {(item.size || item.tamanho) && (item.color || item.cor) ? ' | ' : ''}
                        {item.color || item.cor ? `Cor: ${item.color || item.cor}` : ''}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.sku || '-'}</TableCell>
                  <TableCell className="text-center">{item.quantidade || item.quantity || 1}</TableCell>
                  <TableCell className="text-right">
                    {(item.is_mimo || item.is_digital) && (!item.preco_unitario || Number(item.preco_unitario) === 0) ? (
                      <span className="text-emerald-600 font-semibold text-xs">GRÁTIS</span>
                    ) : (
                      `R$ ${(item.preco_unitario !== undefined ? item.preco_unitario : (item.preco || item.price || 0)).toFixed(2).replace('.', ',')}`
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6 font-medium">
                    {(item.is_mimo || item.is_digital) && (!item.preco_unitario || Number(item.preco_unitario) === 0) ? (
                      <span className="text-emerald-600 font-semibold text-xs">R$ 0,00</span>
                    ) : (
                      `R$ ${((item.quantidade || item.quantity || 1) * (item.preco_unitario !== undefined ? item.preco_unitario : (item.preco || item.price || 0))).toFixed(2).replace('.', ',')}`
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}