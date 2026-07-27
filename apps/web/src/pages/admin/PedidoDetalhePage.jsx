import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, FileText, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { toast } from 'sonner';
import { pedidosService } from '@/services/pedidosService.js';
import { blingService } from '@/services/blingService.js';

import PedidoDetalhes from '@/components/admin/PedidoDetalhes.jsx';
import PedidoItens from '@/components/admin/PedidoItens.jsx';
import PedidoResumo from '@/components/admin/PedidoResumo.jsx';
import PedidoHistorico from '@/components/admin/PedidoHistorico.jsx';

export default function PedidoDetalhePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingBling, setIsSendingBling] = useState(false);

  const fetchPedido = async () => {
    try {
      const data = await pedidosService.getPedidoById(id);
      setPedido(data);
    } catch (err) {
      toast.error('Erro ao carregar detalhes do pedido.');
      navigate('/admin/pedidos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await pedidosService.updatePedidoStatus(id, newStatus, 'Status atualizado manualmente');
      toast.success('Status atualizado com sucesso.');
      fetchPedido();
    } catch (err) {
      toast.error('Erro ao atualizar status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendToBling = async () => {
    setIsSendingBling(true);
    try {
      await blingService.sendPedidoToBling(pedido);
      toast.success('Pedido enviado para o Bling com sucesso!');
      // Optionally update local status or bling_pedido_id if returned
      fetchPedido();
    } catch (err) {
      toast.error(err.message || 'Erro ao enviar para o Bling.');
    } finally {
      setIsSendingBling(false);
    }
  };

  const copyTracking = () => {
    if (pedido?.codigo_rastreio || pedido?.rastreamento) {
      navigator.clipboard.writeText(pedido.codigo_rastreio || pedido.rastreamento);
      toast.success('Código de rastreio copiado!');
    }
  };

  if (isLoading) {
    return <div className="p-8 space-y-6"><Skeleton className="h-12 w-1/3" /><Skeleton className="h-64 w-full" /></div>;
  }

  if (!pedido) return null;

  const canSendToBling = pedido.status === 'pago' || pedido.status === 'em_separacao' || pedido.status === 'confirmado' || pedido.status === 'processando';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pedidos')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            Pedido {pedido.numero_pedido}
            <Badge variant="secondary" className="text-sm uppercase">{pedido.status}</Badge>
            {pedido.bling_pedido_id ? (
              <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs">Bling: Enviado</Badge>
            ) : (
              <Badge variant="destructive" className="bg-red-50 text-red-700 hover:bg-red-50 border border-red-200 text-xs">Bling: Pendente</Badge>
            )}
          </h1>
          <p className="text-sm text-muted-foreground">
            Realizado em {new Date(pedido.created).toLocaleString('pt-BR')}
          </p>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <Select value={pedido.status} onValueChange={handleStatusChange} disabled={isUpdating}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Alterar Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="confirmado">Confirmado / Pago</SelectItem>
              <SelectItem value="processando">Em Separação</SelectItem>
              <SelectItem value="enviado">Enviado</SelectItem>
              <SelectItem value="entregue">Entregue</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={handleSendToBling} 
            disabled={!canSendToBling || isSendingBling}
          >
            <Send className="w-4 h-4 mr-2" /> {pedido.bling_pedido_id ? 'Reenviar p/ Bling' : 'Enviar p/ Bling'}
          </Button>
        </div>
      </div>

      {(pedido.codigo_rastreio || pedido.rastreamento || pedido.danfe_url) && (
        <div className="bg-muted/50 border rounded-xl p-4 flex flex-wrap gap-4 items-center">
          {(pedido.codigo_rastreio || pedido.rastreamento) && (
            <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border shadow-sm">
              <span className="text-sm font-medium">Rastreio: {pedido.codigo_rastreio || pedido.rastreamento}</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyTracking}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}
          {pedido.danfe_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={pedido.danfe_url} target="_blank" rel="noopener noreferrer">
                <FileText className="w-4 h-4 mr-2" /> Ver DANFE
              </a>
            </Button>
          )}
        </div>
      )}

      <PedidoDetalhes pedido={pedido} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PedidoItens itens={pedido.itens} />
          <PedidoHistorico historico={pedido.historico_status} />
        </div>
        <div>
          <PedidoResumo pedido={pedido} />
        </div>
      </div>
    </div>
  );
}