import React, { useState, useEffect } from 'react';
import { Users, Download, Search, ArrowUpDown, AlertCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';
import ClientesTable from '@/components/admin/ClientesTable.jsx';
import SolicitacoesRevendedorTable from '@/components/admin/SolicitacoesRevendedorTable.jsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(true);
  const [errorClientes, setErrorClientes] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('-criado_em');

  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isLoadingSolicitacoes, setIsLoadingSolicitacoes] = useState(true);

  const fetchClientesList = async (currentPage = 1) => {
    setIsLoadingClientes(true);
    setErrorClientes(null);
    try {
      const res = await clientesService.getClientes(currentPage, 20, { search }, sort);
      setClientes(res.items || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || 1);
    } catch (err) {
      console.error('Erro na página ClientesPage:', err);
      const msg = err?.response?.message || err?.message || 'Falha ao buscar dados';
      setErrorClientes(`Erro ao carregar clientes: ${msg}. Consulte o console (F12) para detalhes técnicos.`);
      toast.error('Não foi possível carregar a lista de clientes.');
    } finally {
      setIsLoadingClientes(false);
    }
  };

  const fetchSolicitacoes = async () => {
    setIsLoadingSolicitacoes(true);
    try {
      const res = await clientesService.getSolicitacoesPendentes(1, 50);
      setSolicitacoes(res.items || []);
    } catch (err) {
      console.error('Erro ao buscar solicitações:', err);
      toast.error('Não foi possível carregar as solicitações de revenda.');
    } finally {
      setIsLoadingSolicitacoes(false);
    }
  };

  useEffect(() => {
    const delayFn = setTimeout(() => fetchClientesList(1), 400);
    return () => clearTimeout(delayFn);
  }, [search, sort]);

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const handleExport = () => {
    clientesService.exportClientesCSV(clientes);
    toast.success('Exportação iniciada.');
  };

  const handleAprovar = async (id, userId) => {
    try {
      await clientesService.aprovarRevendedor(id, userId);
      toast.success('Solicitação aprovada com sucesso! Cliente agora é revendedor.');
      fetchSolicitacoes();
      fetchClientesList(page); 
    } catch (error) {
      toast.error('Erro ao aprovar solicitação.');
    }
  };

  const handleRejeitar = async (id) => {
    try {
      await clientesService.rejeitarRevendedor(id);
      toast.success('Solicitação rejeitada.');
      fetchSolicitacoes();
    } catch (error) {
      toast.error('Erro ao rejeitar solicitação.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Central de Clientes e B2B
          </h1>
          <p className="text-muted-foreground mt-1">Gerencie os clientes cadastrados e aprove solicitações de revenda.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleExport} disabled={isLoadingClientes || clientes.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Exportar CSV
          </Button>
        </div>
      </div>

      <Tabs defaultValue="clientes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="clientes" className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Base de Clientes
          </TabsTrigger>
          <TabsTrigger value="solicitacoes" className="flex items-center gap-2 relative">
            <Briefcase className="w-4 h-4" /> Solicitações B2B
            {solicitacoes.length > 0 && (
               <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {solicitacoes.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clientes" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 bg-card p-4 border rounded-xl shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nome, email ou CPF..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="w-full md:w-64 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger><SelectValue placeholder="Ordenar por" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="-criado_em">Mais recentes primeiro</SelectItem>
                  <SelectItem value="criado_em">Mais antigos primeiro</SelectItem>
                  <SelectItem value="-total_compras">Maior volume de compras</SelectItem>
                  <SelectItem value="total_compras">Menor volume de compras</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {errorClientes ? (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription className="flex flex-col gap-3 items-start">
                <p>{errorClientes}</p>
                <Button variant="outline" size="sm" onClick={() => fetchClientesList(page)}>
                  Tentar Novamente
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <ClientesTable clientes={clientes} isLoading={isLoadingClientes} />

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => page > 1 && fetchClientesList(page - 1)}
                          className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => page < totalPages && fetchClientesList(page + 1)}
                          className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="solicitacoes" className="space-y-4 mt-6">
          <SolicitacoesRevendedorTable 
            solicitacoes={solicitacoes} 
            isLoading={isLoadingSolicitacoes} 
            onAprovar={handleAprovar} 
            onRejeitar={handleRejeitar} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}