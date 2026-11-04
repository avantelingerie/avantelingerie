import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { cn } from '@/lib/utils.js';
import KPIsSection from '@/components/admin/KPIsSection.jsx';
import GraficosSection from '@/components/admin/GraficosSection.jsx';
import ListasRapidasSection from '@/components/admin/ListasRapidasSection.jsx';

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleManualRefresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    setLastUpdated(new Date());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, []);

  // Inscrição em tempo real no PocketBase e Polling de contingência
  useEffect(() => {
    let unsubscribeFn = null;

    const setupRealtime = async () => {
      try {
        const unsub = await pb.collection('pedidos').subscribe('*', (e) => {
          console.log('[Dashboard] Evento realtime em pedidos:', e.action);
          setRefreshKey((prev) => prev + 1);
          setLastUpdated(new Date());
        });
        unsubscribeFn = unsub;
      } catch (err) {
        console.warn('[Dashboard] Inscrição realtime indisponível:', err);
      }
    };

    setupRealtime();

    // Polling de contingência a cada 60s
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
      setLastUpdated(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
      if (typeof unsubscribeFn === 'function') {
        try {
          unsubscribeFn();
        } catch (_) {}
      } else {
        pb.collection('pedidos').unsubscribe('*').catch(() => {});
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const formatHora = (date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/40 pb-5"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Visão Geral
          </h1>
          <p className="text-muted-foreground mt-1">Acompanhe as métricas e indicadores de desempenho da sua loja em tempo real.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 gap-1.5 py-1 px-2.5 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Tempo Real Ativo
          </Badge>

          <span className="text-xs text-muted-foreground hidden sm:inline">
            Atualizado às {formatHora(lastUpdated)}
          </span>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="border-border/60 hover:bg-muted/50 gap-2 h-9"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin text-primary")} />
            <span>Atualizar</span>
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Row 1: Key Performance Indicators */}
        <motion.section variants={itemVariants}>
          <KPIsSection refreshKey={refreshKey} />
        </motion.section>

        {/* Row 2: Visual Charts */}
        <motion.section variants={itemVariants}>
          <GraficosSection refreshKey={refreshKey} />
        </motion.section>

        {/* Row 3: Quick Action Tables */}
        <motion.section variants={itemVariants}>
          <ListasRapidasSection refreshKey={refreshKey} />
        </motion.section>
      </motion.div>
    </div>
  );
}
