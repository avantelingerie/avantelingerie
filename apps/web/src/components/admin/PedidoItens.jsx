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
                    {item.nome || item.name || item.produto || 'Produto'}
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
                  <TableCell className="text-right">R$ {(item.preco_unitario || item.preco || item.price || 0).toFixed(2).replace('.', ',')}</TableCell>
                  <TableCell className="text-right pr-6 font-medium">
                    R$ {((item.quantidade || item.quantity || 1) * (item.preco_unitario || item.preco || item.price || 0)).toFixed(2).replace('.', ',')}
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