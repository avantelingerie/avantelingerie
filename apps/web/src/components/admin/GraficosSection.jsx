import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

export default function GraficosSection() {
  const [vendasPorDia, setVendasPorDia] = useState([]);
  const [receitaSemanas, setReceitaSemanas] = useState([]);
  const [topProdutos, setTopProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGraficos = async () => {
      try {
        const [resVendas, resReceita, resProdutos] = await Promise.all([
          apiServerClient.fetch('/dashboard/vendas-por-dia?dias=30'),
          apiServerClient.fetch('/dashboard/receita-por-semana?semanas=8'),
          apiServerClient.fetch('/dashboard/produtos-mais-vendidos?limite=5')
        ]);

        if (resVendas.ok) {
          const data = await resVendas.json();
          // Extract array from standard wrapper if needed
          setVendasPorDia(Array.isArray(data) ? data : data.items || []);
        }
        if (resReceita.ok) {
          const data = await resReceita.json();
          setReceitaSemanas(Array.isArray(data) ? data : data.items || []);
        }
        if (resProdutos.ok) {
          const data = await resProdutos.json();
          setTopProdutos(Array.isArray(data) ? data : data.items || []);
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos gráficos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGraficos();
  }, []);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[350px] w-full rounded-xl" />
        <Skeleton className="h-[350px] w-full rounded-xl" />
        <Skeleton className="h-[350px] w-full rounded-xl lg:col-span-2" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Vendas por Dia (Últimos 30 dias)</CardTitle>
          <CardDescription>Quantidade de pedidos realizados diariamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {vendasPorDia.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendasPorDia} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey={(v) => v.dia || v.date || v.name} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={(v) => v.quantidade || v.count || v.pedidos || 0} 
                    name="Pedidos"
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Sem dados suficientes para o período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Receita por Semana (Últimas 8 semanas)</CardTitle>
          <CardDescription>Faturamento agrupado por semana comercial.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {receitaSemanas.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={receitaSemanas} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey={(v) => v.semana || v.week || v.name} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `R$${(value/1000).toFixed(1)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), "Receita"]}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey={(v) => v.receita || v.revenue || v.valor || 0} 
                    name="Receita"
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Sem dados suficientes para o período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm lg:col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Produtos Mais Vendidos</CardTitle>
          <CardDescription>Produtos com maior volume de vendas geral.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            {topProdutos.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProdutos} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey={(v) => v.nome || v.name} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={90}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar 
                    dataKey={(v) => v.quantidade || v.quantity || v.count || 0} 
                    name="Qtd. Vendida"
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Nenhum produto vendido no período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}