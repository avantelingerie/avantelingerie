import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ShoppingCart, ExternalLink } from 'lucide-react';

export default function ClientePedidos({ pedidos }) {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    const variants = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmado: 'bg-blue-100 text-blue-800 border-blue-200',
      processando: 'bg-purple-100 text-purple-800 border-purple-200',
      enviado: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      entregue: 'bg-green-100 text-green-800 border-green-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200'
    };
    return <Badge variant="outline" className={variants[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          Histórico de Pedidos
        </CardTitle>
        <Badge variant="secondary">{pedidos.length} pedidos</Badge>
      </CardHeader>
      <CardContent className="p-0">
        {pedidos.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Este cliente ainda não realizou nenhum pedido.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-6">Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Valor Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow
                  key={pedido.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors group"
                  onClick={() => navigate(`/admin/pedidos/${pedido.id}`)}
                >
                  <TableCell className="pl-6 font-medium flex items-center gap-2">
                    {pedido.numero_pedido}
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {pedido.data_pedido ? new Date(pedido.data_pedido.replace(' ', 'T')).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(pedido.status)}
                  </TableCell>
                  <TableCell className="text-right pr-6 font-medium">
                    R$ {pedido.valor_total != null ? parseFloat(pedido.valor_total).toFixed(2).replace('.', ',') : '0,00'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}