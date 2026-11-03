import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, FileText, Copy, CheckCircle2, Truck, ExternalLink, MessageCircle, RotateCw, Loader2, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
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
  const [codigoRastreioInput, setCodigoRastreioInput] = useState('');
  const [transportadoraInput, setTransportadoraInput] = useState('J&T Express');
  const [isDespachando, setIsDespachando] = useState(false);
  const [dispatchFeedback, setDispatchFeedback] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const fetchPedido = async () => {
    try {
      const data = await pedidosService.getPedidoById(id);
      setPedido(data);
      if (data) {
        setCodigoRastreioInput(data.codigo_rastreio || data.rastreamento || '');
        setTransportadoraInput(data.transportadora || 'J&T Express');
      }
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
      fetchPedido();
    } catch (err) {
      toast.error(err.message || 'Erro ao enviar para o Bling.');
    } finally {
      setIsSendingBling(false);
    }
  };

  const handleDespachar = async (isReenvio = false) => {
    if (!codigoRastreioInput || !codigoRastreioInput.trim()) {
      toast.error('Por favor, informe o código de rastreamento antes de despachar.');
      return;
    }
    setIsDespachando(true);
    try {
      const res = await pedidosService.despacharPedido({
        pedidoId: pedido.id || pedido.numero_pedido,
        codigoRastreio: codigoRastreioInput.trim(),
        transportadora: transportadoraInput
      });

      setDispatchFeedback({
        emailSent: res.emailSent,
        waSent: res.waSent,
        waLink: res.waLink,
        trackingUrl: res.trackingUrl
      });

      if (res.emailSent && res.waSent) {
        toast.success(isReenvio ? 'Notificações reenviadas com sucesso!' : 'Pedido despachado! E-mail VIP e WhatsApp enviados com sucesso.');
      } else if (res.emailSent) {
        toast.success('Pedido despachado! E-mail VIP enviado com sucesso via Resend.');
      } else {
        toast.success('Pedido despachado com sucesso!');
      }

      await fetchPedido();
    } catch (err) {
      toast.error(err.message || 'Erro ao despachar pedido.');
    } finally {
      setIsDespachando(false);
    }
  };

  const copyTracking = (code) => {
    const textToCopy = code || pedido?.codigo_rastreio || pedido?.rastreamento || codigoRastreioInput;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
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

      {/* CARD ELEGANTE: EXPEDIÇÃO & RASTREAMENTO */}
      {(() => {
        const isDispatched = pedido.status === 'enviado' || pedido.status === 'entregue' || Boolean(pedido.codigo_rastreio || pedido.rastreamento);
        const currentTracking = pedido.codigo_rastreio || pedido.rastreamento || codigoRastreioInput;
        const cleanPhone = (pedido.cliente_telefone || '').replace(/\D/g, '');
        const waPhone = cleanPhone.startsWith('55') ? cleanPhone : (cleanPhone ? `55${cleanPhone}` : '');
        const defaultWaUrl = waPhone ? `https://api.whatsapp.com/send?phone=${waPhone}` : null;
        const waUrl = dispatchFeedback?.waLink || defaultWaUrl;

        return (
          <div className="bg-card border border-border/80 rounded-xl p-5 md:p-6 shadow-sm space-y-5 bg-gradient-to-br from-card via-card to-amber-950/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                    Expedição & Rastreamento
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Despache o pacote, registre o rastreio e notifique a cliente por E-mail VIP (Resend) e WhatsApp (Lia).
                  </p>
                </div>
              </div>
              <div>
                {isDispatched ? (
                  <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1.5 px-3 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Enviado à Transportadora
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 gap-1.5 px-3 py-1">
                    <Sparkles className="w-3.5 h-3.5" /> Pronto p/ Expedição
                  </Badge>
                )}
              </div>
            </div>

            {/* Formulário de Despacho */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-5 space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Código de Rastreamento (J&T / Melhor Envio)
                </label>
                <div className="relative">
                  <Input 
                    value={codigoRastreioInput}
                    onChange={(e) => setCodigoRastreioInput(e.target.value.toUpperCase())}
                    placeholder="Ex: 888031017960740"
                    className="font-mono font-medium tracking-wide uppercase pr-10"
                  />
                  {codigoRastreioInput && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyTracking(codigoRastreioInput)} 
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </Button>
                  )}
                </div>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Transportadora
                </label>
                <Select value={transportadoraInput} onValueChange={setTransportadoraInput}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="J&T Express">J&T Express</SelectItem>
                    <SelectItem value="Jadlog">Jadlog (.Package)</SelectItem>
                    <SelectItem value="Correios PAC">Correios PAC</SelectItem>
                    <SelectItem value="Correios SEDEX">Correios SEDEX</SelectItem>
                    <SelectItem value="Azul Cargo Express">Azul Cargo Express</SelectItem>
                    <SelectItem value="Loggi">Loggi</SelectItem>
                    <SelectItem value="Outra">Outra Transportadora</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Button 
                  onClick={() => handleDespachar(isDispatched)}
                  disabled={isDespachando || !codigoRastreioInput.trim()}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold shadow-md h-10"
                >
                  {isDespachando ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Despachando...
                    </>
                  ) : isDispatched ? (
                    <>
                      <RotateCw className="w-4 h-4 mr-2" />
                      Atualizar / Reenviar Notificações
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4 mr-2" />
                      🚚 Despachar & Notificar Cliente
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Barra de Ações Rápidas (quando já possui rastreio ou foi despachado) */}
            {(currentTracking || pedido.danfe_url) && (
              <div className="pt-2 border-t border-border/40 flex flex-wrap items-center gap-3">
                {currentTracking && (
                  <>
                    <Button variant="outline" size="sm" asChild className="hover:border-amber-500/50 hover:text-amber-500">
                      <a 
                        href={`https://avantelingerie.com.br/rastreio?codigo=${encodeURIComponent(currentTracking)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-1.5 text-amber-500" />
                        Ver Rastreio na Loja
                      </a>
                    </Button>

                    {waUrl && (
                      <Button variant="outline" size="sm" asChild className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10">
                        <a href={waUrl} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-500" />
                          Conversa WhatsApp (Lia)
                        </a>
                      </Button>
                    )}
                  </>
                )}

                {pedido.danfe_url && (
                  <Button variant="outline" size="sm" asChild className="border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10">
                    <a href={pedido.danfe_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-1.5 text-blue-500" />
                      Ver DANFE (NF-e)
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Banner de Feedback dos Disparos */}
            {dispatchFeedback && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-xs text-emerald-700 dark:text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    {dispatchFeedback.emailSent ? '✉️ E-mail VIP enviado via Resend. ' : ''}
                    {dispatchFeedback.waSent ? '📲 WhatsApp disparado via Lia.' : '📲 Link de WhatsApp pronto para envio.'}
                  </span>
                </div>
                {dispatchFeedback.waLink && (
                  <a 
                    href={dispatchFeedback.waLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline font-semibold hover:text-emerald-200"
                  >
                    Abrir mensagem no WhatsApp ➜
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })()}

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