import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import apiServerClient from '@/lib/apiServerClient.js';

export default function GraficosSection({ refreshKey = 0 }) {
  const [vendasPorDia, setVendasPorDia] = useState([]);
  const [receitaSemanas, setReceitaSemanas] = useState([]);
  const [topProdutos, setTopProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchGraficos = async () => {
      try {
        const [resVendas, resReceita, resProdutos] = await Promise.all([
          apiServerClient.fetch('/dashboard/vendas-por-dia?dias=30'),
          apiServerClient.fetch('/dashboard/receita-por-semana?semanas=8'),
          apiServerClient.fetch('/dashboard/produtos-mais-vendidos?limite=5')
        ]);

        if (resVendas.ok && isMounted) {
          const data = await resVendas.json();
          setVendasPorDia(Array.isArray(data) ? data : data.items || []);
        }
        if (resReceita.ok && isMounted) {
          const data = await resReceita.json();
          setReceitaSemanas(Array.isArray(data) ? data : data.items || []);
        }
        if (resProdutos.ok && isMounted) {
          const data = await resProdutos.json();
          setTopProdutos(Array.isArray(data) ? data : data.items || []);
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos gráficos:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGraficos();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  if (isLoading && vendasPorDia.length === 0) {
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
      {/* Gráfico 1: Vendas por Dia */}
      <Card className="shadow-sm border-border/50">
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
                    allowDecimals={false}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'pedidos' ? 'Pedidos' : name]}
                    labelFormatter={(label) => `Dia: ${label}`}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pedidos" 
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

      {/* Gráfico 2: Receita por Semana */}
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>Receita por Semana (Últimas 8 semanas)</CardTitle>
          <CardDescription>Faturamento agrupado por semana comercial.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {receitaSemanas.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={receitaSemanas} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="semana" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => value >= 1000 ? `R$${(value/1000).toFixed(1)}k` : `R$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), "Receita"]}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="receita" 
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

      {/* Gráfico 3: Top 5 Produtos Mais Vendidos */}
      <Card className="shadow-sm border-border/50 lg:col-span-2">
        <CardHeader>
          <CardTitle>Top 5 Produtos Mais Vendidos</CardTitle>
          <CardDescription>Produtos com maior volume de vendas geral.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            {topProdutos.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProdutos} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="nome" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    width={160}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    formatter={(value, name, item) => [
                      `${value} unid. (${formatCurrency(item.payload.receita)})`,
                      "Vendas"
                    ]}
                    labelFormatter={(_, items) => items?.[0]?.payload?.nomeCompleto || ''}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="quantidade" 
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
