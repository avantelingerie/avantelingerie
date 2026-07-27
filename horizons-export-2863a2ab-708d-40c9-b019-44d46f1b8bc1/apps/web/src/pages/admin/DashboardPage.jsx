import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import KPIsSection from '@/components/admin/KPIsSection.jsx';
import GraficosSection from '@/components/admin/GraficosSection.jsx';
import ListasRapidasSection from '@/components/admin/ListasRapidasSection.jsx';

export default function DashboardPage() {
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

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            Visão Geral
          </h1>
          <p className="text-muted-foreground mt-1">Acompanhe as métricas e indicadores de desempenho da sua loja.</p>
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
          <KPIsSection />
        </motion.section>

        {/* Row 2: Visual Charts */}
        <motion.section variants={itemVariants}>
          <GraficosSection />
        </motion.section>

        {/* Row 3: Quick Action Tables */}
        <motion.section variants={itemVariants}>
          <ListasRapidasSection />
        </motion.section>
      </motion.div>
    </div>
  );
}