import React, { useEffect, useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign, Users, UserCheck, AlertCircle, ShoppingCart, CreditCard, Ticket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { cn } from '@/lib/utils.js';
import apiServerClient from '@/lib/apiServerClient.js';

export default function KPIsSection() {
  const [kpis, setKpis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const res = await apiServerClient.fetch('/dashboard/kpis');
        if (res.ok) {
          const data = await res.json();
          setKpis(data);
        }
      } catch (error) {
        console.error('Erro ao buscar KPIs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchKpis();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);
  const formatNumber = (val) => new Intl.NumberFormat('pt-BR').format(val || 0);

  // Extract keys dynamically accounting for potential backend naming variations
  const getValue = (keys) => {
    if (!kpis) return 0;
    for (const key of keys) {
      if (kpis[key] !== undefined) return kpis[key];
    }
    return 0;
  };

  const cards = [
    { title: 'Pedidos Hoje', value: formatNumber(getValue(['pedidos_hoje', 'pedidosHoje', 'orders_today'])), icon: ShoppingBag },
    { title: 'Pedidos Semana', value: formatNumber(getValue(['pedidos_semana', 'pedidosSemana', 'orders_week'])), icon: ShoppingCart },
    { title: 'Pedidos Mês', value: formatNumber(getValue(['pedidos_mes', 'pedidosMes', 'orders_month'])), icon: TrendingUp },
    { title: 'Receita Total Mês', value: formatCurrency(getValue(['receita_mes', 'receitaTotalMes', 'revenue_month'])), icon: DollarSign },
    { title: 'Receita Líquida Mês', value: formatCurrency(getValue(['receita_liquida_mes', 'receitaLiquidaMes', 'net_revenue_month'])), icon: CreditCard },
    { title: 'Ticket Médio Mês', value: formatCurrency(getValue(['ticket_medio', 'ticketMedio', 'average_ticket'])), icon: Ticket },
    { title: 'Clientes Novos Mês', value: formatNumber(getValue(['clientes_novos', 'clientesNovos', 'new_customers'])), icon: Users },
    { title: 'Clientes Recorrentes Mês', value: formatNumber(getValue(['clientes_recorrentes', 'clientesRecorrentes', 'returning_customers'])), icon: UserCheck },
  ];

  const pendingActionCount = getValue(['aguardando_acao', 'pedidosAguardando', 'pending_actions']);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <Card key={i} className="shadow-sm border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground opacity-70" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground font-variant-numeric:tabular-nums">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* 9th Card - Pedidos Aguardando Ação (Alert highlighted) */}
      <Card className={cn(
        "shadow-sm border-border/50",
        pendingActionCount > 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-400" : "bg-card text-card-foreground"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={cn(
            "text-xs font-medium",
            pendingActionCount > 0 ? "text-amber-800 dark:text-amber-500" : "text-muted-foreground"
          )}>Pedidos Aguardando Ação</CardTitle>
          <AlertCircle className={cn(
            "h-4 w-4",
            pendingActionCount > 0 ? "text-amber-600 dark:text-amber-500" : "text-muted-foreground opacity-70"
          )} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight font-variant-numeric:tabular-nums">{pendingActionCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}