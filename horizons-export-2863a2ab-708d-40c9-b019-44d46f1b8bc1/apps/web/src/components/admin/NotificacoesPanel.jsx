import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, ListChecks as CheckAll, Loader2, AlertCircle, Info, Package, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet.jsx';
import { ScrollArea } from '@/components/ui/scroll-area.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';
import { cn } from '@/lib/utils.js';

export default function NotificacoesPanel() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const previousUnreadCountRef = useRef(0);

  const fetchNotificacoes = async (isBackground = false) => {
    try {
      if (!isBackground) setIsLoading(true);
      const res = await apiServerClient.fetch('/notificacoes');
      if (res.ok) {
        const data = await res.json();
        // Extract array depending on backend wrapper
        const items = Array.isArray(data) ? data : (data.items || data.notificacoes || []);
        
        const unreadCount = items.filter(n => !n.lida).length;
        
        // Check for new notifications
        if (isBackground && unreadCount > previousUnreadCountRef.current) {
          toast('Nova notificação recebida', {
            icon: <Bell className="w-4 h-4 text-primary" />,
            description: 'Você tem novas atualizações no sistema.'
          });
        }
        
        previousUnreadCountRef.current = unreadCount;
        setNotificacoes(items);
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotificacoes();
    
    // Polling every 30 seconds
    const intervalId = setInterval(() => {
      fetchNotificacoes(true);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleMarcarLida = async (id) => {
    try {
      const res = await apiServerClient.fetch(`/notificacoes/${id}/marcar-lida`, { method: 'POST' });
      if (res.ok) {
        setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
        previousUnreadCountRef.current = Math.max(0, previousUnreadCountRef.current - 1);
      }
    } catch (error) {
      toast.error('Erro ao atualizar notificação.');
    }
  };

  const handleMarcarTodasLidas = async () => {
    try {
      const res = await apiServerClient.fetch('/notificacoes/marcar-todas-lidas', { method: 'POST' });
      if (res.ok) {
        setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
        previousUnreadCountRef.current = 0;
        toast.success('Todas as notificações foram marcadas como lidas.');
      }
    } catch (error) {
      toast.error('Erro ao atualizar notificações.');
    }
  };

  const unreadCount = notificacoes.filter(n => !n.lida).length;

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'novo_pedido': return <Package className="w-4 h-4 text-blue-500" />;
      case 'pagamento_falhou': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'estoque_baixo': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'erro_bling': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 px-1.5 min-w-[20px] h-5 flex items-center justify-center text-[10px] rounded-full border-2 border-background"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col border-l">
        <SheetHeader className="pb-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl">Notificações</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleMarcarTodasLidas} className="h-8 text-xs text-muted-foreground">
                <CheckAll className="w-3.5 h-3.5 mr-1" /> Marcar todas como lidas
              </Button>
            )}
          </div>
          <SheetDescription>Fique por dentro das atualizações e alertas do sistema.</SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : notificacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Bell className="w-12 h-12 mb-4 opacity-20" />
              <p className="font-medium">Nenhuma notificação</p>
              <p className="text-sm">Você está em dia com os alertas.</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              {notificacoes.map((notificacao) => (
                <div 
                  key={notificacao.id} 
                  className={cn(
                    "flex flex-col gap-2 p-4 rounded-xl border transition-colors",
                    notificacao.lida ? "bg-card border-border/50 opacity-75" : "bg-primary/5 border-primary/20 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="mt-0.5 shrink-0 bg-background rounded-full p-1.5 shadow-sm border">
                        {getIcon(notificacao.tipo)}
                      </div>
                      <div className="space-y-1">
                        <p className={cn("text-sm font-semibold leading-none", !notificacao.lida && "text-foreground")}>
                          {notificacao.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {notificacao.mensagem}
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 font-medium">
                          {new Date(notificacao.created).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    {!notificacao.lida && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 h-8 w-8 rounded-full" 
                        onClick={() => handleMarcarLida(notificacao.id)}
                        title="Marcar como lida"
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}