import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';

import ClienteDetalhes from '@/components/admin/ClienteDetalhes.jsx';
import ClienteDescontos from '@/components/admin/ClienteDescontos.jsx';
import ClienteEnderecos from '@/components/admin/ClienteEnderecos.jsx';
import ClientePedidos from '@/components/admin/ClientePedidos.jsx';

export default function ClienteDetalhePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [cliente, setCliente] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTogglingBlock, setIsTogglingBlock] = useState(false);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [clienteData, enderecosData, pedidosData] = await Promise.all([
        clientesService.fetchClienteById(id),
        clientesService.fetchEnderecos(id),
        clientesService.fetchPedidosCliente(id)
      ]);
      
      setCliente(clienteData);
      setEnderecos(enderecosData);
      setPedidos(pedidosData);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar os dados do cliente.');
      toast.error('Erro ao carregar cliente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAllData();
  }, [id]);

  const handleToggleBlock = async () => {
    setIsTogglingBlock(true);
    try {
      if (cliente.bloqueado) {
        await clientesService.desbloquearCliente(id);
        toast.success('Cliente desbloqueado com sucesso.');
      } else {
        await clientesService.bloquearCliente(id);
        toast.warning('Cliente bloqueado.');
      }
      fetchAllData();
    } catch (err) {
      toast.error('Erro ao alterar status de bloqueio.');
    } finally {
      setIsTogglingBlock(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !cliente) {
    return (
      <div className="max-w-5xl mx-auto text-center py-20">
        <p className="text-destructive mb-4">{error || 'Cliente não encontrado.'}</p>
        <Button onClick={() => navigate('/admin/clientes')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Clientes
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/clientes')} className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
              {cliente.nome || 'Cliente sem nome'}
              {cliente.bloqueado && (
                <span className="text-xs font-medium bg-destructive/10 text-destructive px-2 py-1 rounded-md flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Bloqueado
                </span>
              )}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{cliente.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant={cliente.bloqueado ? "outline" : "destructive"} 
            onClick={handleToggleBlock}
            disabled={isTogglingBlock}
          >
            {cliente.bloqueado ? (
              <><ShieldCheck className="w-4 h-4 mr-2" /> Desbloquear Cliente</>
            ) : (
              <><ShieldAlert className="w-4 h-4 mr-2" /> Bloquear Cliente</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClienteDetalhes cliente={cliente} onUpdate={fetchAllData} />
          <ClienteEnderecos enderecos={enderecos} usuarioId={cliente.id} onUpdate={fetchAllData} />
          <ClientePedidos pedidos={pedidos} />
        </div>
        
        <div className="space-y-6">
          <ClienteDescontos cliente={cliente} onUpdate={fetchAllData} />
        </div>
      </div>
    </div>
  );
}