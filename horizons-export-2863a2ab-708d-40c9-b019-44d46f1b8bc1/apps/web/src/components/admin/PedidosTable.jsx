import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PedidosTable({ pedidos, isLoading }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const map = {
      'pendente': 'bg-yellow-100 text-yellow-800',
      'pago': 'bg-blue-100 text-blue-800',
      'confirmado': 'bg-blue-100 text-blue-800',
      'processando': 'bg-purple-100 text-purple-800',
      'em_separacao': 'bg-purple-100 text-purple-800',
      'enviado': 'bg-indigo-100 text-indigo-800',
      'entregue': 'bg-green-100 text-green-800',
      'cancelado': 'bg-red-100 text-red-800'
    };
    return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                <TableCell align="right"><Skeleton className="h-5 w-20 ml-auto" /></TableCell>
                <TableCell><Skeleton className="h-8 w-8 rounded-md ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="border rounded-xl bg-card p-8 text-center text-muted-foreground">
        Nenhum pedido encontrado com os filtros atuais.
      </div>
    );
  }

  return (
    <div className="border rounded-xl bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pedidos.map((pedido) => (
            <TableRow key={pedido.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/admin/pedidos/${pedido.id}`)}>
              <TableCell className="font-medium">{pedido.numero_pedido}</TableCell>
              <TableCell>{pedido.cliente_nome || 'N/A'}</TableCell>
              <TableCell>{new Date(pedido.created).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`border-0 ${getStatusColor(pedido.status)}`}>
                    {pedido.status?.toUpperCase() || 'PENDENTE'}
                  </Badge>
                  <Badge variant="outline" className={`border-0 whitespace-nowrap ${pedido.bling_pedido_id ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {pedido.bling_pedido_id ? 'BLING: ENVIADO' : 'BLING: PENDENTE'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="capitalize">{pedido.metodo_pagamento || pedido.forma_pagamento || '-'}</TableCell>
              <TableCell className="text-right font-medium">
                R$ {(pedido.valor_total || pedido.total || 0).toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); navigate(`/admin/pedidos/${pedido.id}`); }}>
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}