import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { toast } from 'sonner';
import { pedidosService } from '@/services/pedidosService.js';
import PedidosTable from '@/components/admin/PedidosTable.jsx';

export default function PedidosPage() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const fetchPedidos = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      const filters = { search, status: statusFilter, data_inicial: dataInicial, data_final: dataFinal };
      const res = await pedidosService.getPedidos(filters, currentPage, 20);
      setPedidos(res.items);
      setTotalPages(res.totalPages || 1);
      setPage(res.page);
    } catch (err) {
      toast.error('Erro ao carregar pedidos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayFn = setTimeout(() => fetchPedidos(1), 400);
    return () => clearTimeout(delayFn);
  }, [search, statusFilter, dataInicial, dataFinal]);

  const handleExport = () => {
    pedidosService.exportToCSV(pedidos);
    toast.success('Exportação concluída.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-primary" />
            Pedidos
          </h1>
          <p className="text-muted-foreground mt-1">Gerencie as vendas e acompanhe os status de entrega.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleExport} disabled={isLoading || pedidos.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
          <Button onClick={() => navigate('/admin/pedidos/novo')}>
            <Plus className="w-4 h-4 mr-2" /> Novo Pedido
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 border rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por número ou cliente..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="confirmado">Confirmado</SelectItem>
              <SelectItem value="processando">Processando</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} className="w-full md:w-36" />
          <span className="text-muted-foreground">até</span>
          <Input type="date" value={dataFinal} onChange={e => setDataFinal(e.target.value)} className="w-full md:w-36" />
        </div>
      </div>

      <PedidosTable pedidos={pedidos} isLoading={isLoading} />

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => page > 1 && fetchPedidos(page - 1)}
                  className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext 
                  onClick={() => page < totalPages && fetchPedidos(page + 1)}
                  className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}