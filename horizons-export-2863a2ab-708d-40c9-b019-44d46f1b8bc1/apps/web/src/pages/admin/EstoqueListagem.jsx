import React, { useState, useEffect, useMemo } from 'react';
import { estoqueService } from '@/services/estoqueService.js';
import pb from '@/lib/pocketbaseClient.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { ArrowLeftRight, Clock, Search, RefreshCw, AlertTriangle } from 'lucide-react';
import MovimentacaoEstoqueModal from '@/components/admin/MovimentacaoEstoqueModal.jsx';
import HistoricoEstoqueModal from '@/components/admin/HistoricoEstoqueModal.jsx';

export default function EstoqueListagem() {
  const [variacoes, setVariacoes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [limiteAlerta, setLimiteAlerta] = useState(10);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isMovimentacaoOpen, setIsMovimentacaoOpen] = useState(false);
  const [isHistoricoOpen, setIsHistoricoOpen] = useState(false);
  const [selectedVariacao, setSelectedVariacao] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);

  const fetchData = async (currentPage = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const config = await estoqueService.buscarConfiguracoes();
      setLimiteAlerta(config.limite_alerta_global || 10);

      const cats = await pb.collection('categorias').getFullList({ sort: 'nome', $autoCancel: false });
      setCategorias(cats);

      const result = await estoqueService.buscarVariacoesComEstoque(currentPage, 20, {
        search,
        categoria_id: categoriaFilter
      });

      setVariacoes(result.items);
      setTotalPages(result.totalPages || 1);
      setPage(result.page);
      
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Falha ao carregar estoque. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(1);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, categoriaFilter, statusFilter]);

  const getStatus = (qtd) => {
    if (qtd === 0 || !qtd) return 'zerado';
    if (qtd <= limiteAlerta) return 'baixo';
    return 'normal';
  };

  const filteredVariacoes = useMemo(() => {
    let filtered = variacoes;
    if (statusFilter !== 'all') {
      filtered = variacoes.filter(v => getStatus(v.estoque || 0) === statusFilter);
    }
    return filtered;
  }, [variacoes, statusFilter, limiteAlerta, isLoading, page, totalPages]);

  const StatusBadge = ({ status }) => {
    if (status === 'zerado') return <Badge variant="destructive" className="uppercase text-[10px]">Zerado</Badge>;
    if (status === 'baixo') return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 uppercase text-[10px]">Baixo</Badge>;
    return <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 uppercase text-[10px]">Normal</Badge>;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estoque de Produtos</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie a quantidade, ajustes e histórico de estoque por SKU.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card border rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por SKU ou Nome..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-56">
          <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              {categorias.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="normal">Estoque Normal</SelectItem>
              <SelectItem value="baixo">Estoque Baixo</SelectItem>
              <SelectItem value="zerado">Estoque Zerado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center p-12 border border-destructive/20 rounded-xl bg-destructive/5 text-destructive">
          <AlertTriangle className="w-8 h-8 mb-3 opacity-80" />
          <p className="font-medium mb-4">{error}</p>
          <Button variant="outline" onClick={() => fetchData(page)} className="border-destructive/30 hover:bg-destructive/10">
            <RefreshCw className="w-4 h-4 mr-2" /> Tentar Novamente
          </Button>
        </div>
      ) : (
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Variação</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell align="center"><Skeleton className="h-5 w-8 mx-auto" /></TableCell>
                      <TableCell align="center"><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                      <TableCell align="right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredVariacoes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Nenhum item encontrado com os filtros atuais.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVariacoes.map((item) => {
                    const status = getStatus(item.estoque);
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium text-foreground">{item.expand?.produto_id?.name || 'Produto Desconhecido'}</div>
                          <div className="text-xs text-muted-foreground">{item.expand?.produto_id?.expand?.categoria_id?.nome}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {item.cor && (
                              <span className="w-3 h-3 rounded-full border shadow-sm" style={{ backgroundColor: item.cor }}></span>
                            )}
                            <span className="text-sm font-medium">{item.tamanho}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {item.sku}
                        </TableCell>
                        <TableCell className="text-center font-bold text-lg">
                          {item.estoque || 0}
                        </TableCell>
                        <TableCell className="text-center">
                          <StatusBadge status={status} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 px-2"
                            onClick={() => {
                              setSelectedVariacao(item);
                              setIsMovimentacaoOpen(true);
                            }}
                          >
                            <ArrowLeftRight className="w-4 h-4 mr-1.5 text-muted-foreground" />
                            Ajustar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8"
                            title="Histórico"
                            onClick={() => {
                              setSelectedSku(item.sku);
                              setIsHistoricoOpen(true);
                            }}
                          >
                            <Clock className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && statusFilter === 'all' && (
            <div className="p-4 border-t flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => {
                        page > 1 && fetchData(page - 1);
                      }}
                      className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => {
                        page < totalPages && fetchData(page + 1);
                      }}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}

      <MovimentacaoEstoqueModal 
        open={isMovimentacaoOpen}
        onOpenChange={setIsMovimentacaoOpen}
        variacao={selectedVariacao}
        onSuccess={() => fetchData(page)}
      />

      <HistoricoEstoqueModal
        open={isHistoricoOpen}
        onOpenChange={setIsHistoricoOpen}
        sku={selectedSku}
      />
    </div>
  );
}