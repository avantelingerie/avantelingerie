import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { descontosService } from '@/services/descontosService.js';
import { toast } from 'sonner';
import CupomModal from './CupomModal.jsx';

export default function CuponsTab() {
  const [cupons, setCupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tipoFilter, setTipoFilter] = useState('all');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCupom, setSelectedCupom] = useState(null);

  const fetchCupons = async (currentPage = 1) => {
    setIsLoading(true);
    try {
      const res = await descontosService.getCupons({ search, status: statusFilter, tipo: tipoFilter }, currentPage, 20);
      setCupons(res.items);
      setTotalPages(res.totalPages || 1);
      setPage(res.page);
    } catch (err) {
      toast.error('Erro ao carregar os cupons.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayFn = setTimeout(() => fetchCupons(1), 400);
    return () => clearTimeout(delayFn);
  }, [search, statusFilter, tipoFilter]);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await descontosService.toggleCupomStatus(id, currentStatus);
      setCupons(cupons.map(c => c.id === id ? { ...c, ativo: !currentStatus } : c));
      toast.success(currentStatus ? 'Cupom desativado com sucesso.' : 'Cupom ativado com sucesso.');
    } catch (err) {
      toast.error('Erro ao alterar status do cupom.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este cupom permanentemente?')) return;
    try {
      await descontosService.deleteCupom(id);
      fetchCupons(page);
      toast.success('Cupom removido com sucesso.');
    } catch (err) {
      toast.error('Erro ao remover o cupom. Ele pode estar atrelado a pedidos.');
    }
  };

  const formatValue = (tipo, val) => tipo === 'percentual' ? `${val}%` : `R$ ${val.toFixed(2).replace('.', ',')}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Cupons de Desconto</h2>
          <p className="text-sm text-muted-foreground">Crie e gerencie códigos promocionais.</p>
        </div>
        <Button onClick={() => { setSelectedCupom(null); setModalOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 border rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por código..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={tipoFilter} onValueChange={setTipoFilter}>
            <SelectTrigger><SelectValue placeholder="Qualquer Tipo" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer Tipo</SelectItem>
              <SelectItem value="percentual">Percentual</SelectItem>
              <SelectItem value="valor_fixo">Valor Fixo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger><SelectValue placeholder="Qualquer Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Qualquer Status</SelectItem>
              <SelectItem value="ativo">Ativos</SelectItem>
              <SelectItem value="inativo">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead className="text-center">Usos</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell align="center"><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                  <TableCell align="center"><Skeleton className="h-5 w-10 mx-auto" /></TableCell>
                  <TableCell align="right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : cupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum cupom encontrado com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              cupons.map(c => {
                const isExpired = c.validade && new Date(c.validade) < new Date();
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-bold text-foreground tracking-wider">{c.codigo}</div>
                      {c.uso_unico && <Badge variant="secondary" className="mt-1 text-[10px]">Uso Único</Badge>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        {formatValue(c.tipo, c.valor)}
                      </Badge>
                    </TableCell>
                    <TableCell className={isExpired ? 'text-destructive text-sm' : 'text-sm'}>
                      {c.validade ? new Date(c.validade).toLocaleDateString('pt-BR') : 'Sem validade'}
                      {isExpired && <span className="block text-xs">Expirado</span>}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {c.usos_realizados || 0} / {c.limite_usos || '∞'}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={c.ativo} 
                        onCheckedChange={() => handleToggleStatus(c.id, c.ativo)} 
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedCupom(c); setModalOpen(true); }}>
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => page > 1 && fetchCupons(page - 1)}
                    className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => page < totalPages && fetchCupons(page + 1)}
                    className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <CupomModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        cupom={selectedCupom} 
        onSuccess={() => fetchCupons(page)} 
      />
    </div>
  );
}