import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, PackageSearch, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { cn } from '@/lib/utils.js';

export default function ListasRapidasSection() {
  const [ultimosPedidos, setUltimosPedidos] = useState([]);
  const [estoqueCritico, setEstoqueCritico] = useState([]);
  const [pedidosAguardando, setPedidosAguardando] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const [resPedidos, resEstoque, resAguardando] = await Promise.all([
          apiServerClient.fetch('/dashboard/ultimos-pedidos?limite=5'),
          apiServerClient.fetch('/dashboard/estoque-critico'),
          apiServerClient.fetch('/dashboard/pedidos-aguardando')
        ]);

        if (resPedidos.ok) {
          const data = await resPedidos.json();
          setUltimosPedidos(Array.isArray(data) ? data : data.items || []);
        }
        if (resEstoque.ok) {
          const data = await resEstoque.json();
          setEstoqueCritico(Array.isArray(data) ? data : data.items || []);
        }
        if (resAguardando.ok) {
          const data = await resAguardando.json();
          setPedidosAguardando(Array.isArray(data) ? data : data.items || []);
        }
      } catch (error) {
        console.error('Erro ao buscar listas rápidas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListas();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pendente': return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-200">Pendente</Badge>;
      case 'confirmado': return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">Confirmado</Badge>;
      case 'processando': return <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200">Processando</Badge>;
      case 'enviado': return <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-200">Enviado</Badge>;
      case 'entregue': return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Entregue</Badge>;
      case 'cancelado': return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-200">Cancelado</Badge>;
      default: return <Badge variant="outline">{status || 'Desconhecido'}</Badge>;
    }
  };

  const calcularTempoEspera = (createdDate) => {
    const diffMs = new Date() - new Date(createdDate);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays > 0) return `${diffDays} dia(s)`;
    if (diffHrs > 0) return `${diffHrs} hora(s)`;
    return 'Menos de 1h';
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Table 1: Últimos 5 pedidos */}
      <Card className="shadow-sm flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Últimos Pedidos</CardTitle>
              <CardDescription>Entradas mais recentes na loja.</CardDescription>
            </div>
            <PackageSearch className="w-5 h-5 text-muted-foreground opacity-50" />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Nº</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ultimosPedidos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Nenhum pedido recebido.
                  </TableCell>
                </TableRow>
              ) : (
                ultimosPedidos.map((pedido) => (
                  <TableRow key={pedido.id} className="hover:bg-muted/50 cursor-pointer transition-colors group">
                    <TableCell className="font-medium text-xs">
                      <Link to={`/admin/pedidos/${pedido.id}`} className="group-hover:underline text-primary">
                        {pedido.numero_pedido || pedido.id.substring(0,6)}
                      </Link>
                    </TableCell>
                    <TableCell className="truncate max-w-[120px] text-sm" title={pedido.cliente_nome}>
                      {pedido.cliente_nome || 'Cliente'}
                    </TableCell>
                    <TableCell className="text-sm">{formatCurrency(pedido.valor_total || pedido.total)}</TableCell>
                    <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="p-4 border-t mt-auto text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
            <Link to="/admin/pedidos">Ver todos os pedidos <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </Card>

      {/* Table 2: Pedidos aguardando ação */}
      <Card className="shadow-sm flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Aguardando Ação</CardTitle>
              <CardDescription>Pedidos que exigem sua atenção.</CardDescription>
            </div>
            <Clock className="w-5 h-5 text-amber-500 opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Espera</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosAguardando.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Nenhum pedido aguardando ação.
                  </TableCell>
                </TableRow>
              ) : (
                pedidosAguardando.map((pedido) => (
                  <TableRow key={pedido.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-xs">
                      {pedido.numero_pedido || pedido.id.substring(0,6)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-medium">
                      {calcularTempoEspera(pedido.created)}
                    </TableCell>
                    <TableCell>{getStatusBadge(pedido.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="text-xs h-7" asChild>
                         <Link to={`/admin/pedidos/${pedido.id}`}>Processar</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Table 3: Estoque Crítico */}
      <Card className="shadow-sm flex flex-col">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Estoque Crítico</CardTitle>
              <CardDescription>Variações abaixo do limite de alerta.</CardDescription>
            </div>
            <AlertTriangle className="w-5 h-5 text-red-500 opacity-80" />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Variação</TableHead>
                <TableHead className="text-right">Qtd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estoqueCritico.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
                    Todos os produtos com estoque ok.
                  </TableCell>
                </TableRow>
              ) : (
                estoqueCritico.map((item, idx) => {
                  const nome = item.produto_nome || item.name || item?.expand?.produto_id?.name || `Produto ${item.produto_id?.substring(0,4)}`;
                  const varNome = item.cor || item.tamanho ? `${item.cor || ''} ${item.tamanho || ''}`.trim() : 'Única';
                  const qtd = item.estoque || item.stock || 0;
                  
                  return (
                    <TableRow key={item.id || idx} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="text-sm truncate max-w-[140px]" title={nome}>
                        {nome}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {varNome}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={cn(
                          "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium",
                          qtd === 0 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}>
                          {qtd} un
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="p-4 border-t mt-auto text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
            <Link to="/admin/estoque">Gerenciar Estoque <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}