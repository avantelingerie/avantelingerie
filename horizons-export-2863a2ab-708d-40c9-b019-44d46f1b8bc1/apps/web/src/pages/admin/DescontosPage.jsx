import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { BadgePercent as TicketPercent, Database } from 'lucide-react';
import { descontosService } from '@/services/descontosService.js';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';

import DescontoProgressivoTab from '@/components/admin/DescontoProgressivoTab.jsx';
import DescontoPIXTab from '@/components/admin/DescontoPIXTab.jsx';
import BoletoConfigTab from '@/components/admin/BoletoConfigTab.jsx';
import CuponsTab from '@/components/admin/CuponsTab.jsx';
import RelatorioUsoTab from '@/components/admin/RelatorioUsoTab.jsx';

export default function DescontosPage() {
  const [configuracoes, setConfiguracoes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  const fetchConfigs = async () => {
    setIsLoading(true);
    try {
      const data = await descontosService.getConfiguracoes();
      setConfiguracoes(data || {});
    } catch (err) {
      toast.error('Erro ao carregar configurações de descontos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleSeedData = async () => {
    if (!window.confirm('Isso irá criar dados de teste (faixas, cupons e usos). Deseja continuar?')) return;
    setIsSeeding(true);
    try {
      await descontosService.seedTestData();
      toast.success('Dados de teste gerados com sucesso!');
      fetchConfigs(); // Refresh configs
      // Dispatch event to refresh other tabs if needed
      window.dispatchEvent(new Event('refresh_cupons'));
    } catch (err) {
      toast.error('Erro ao gerar dados de teste.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="border-b pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <TicketPercent className="w-8 h-8 text-primary" />
            Descontos e Cupons
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie promoções, cupons de desconto, PIX e regras progressivas do carrinho.
          </p>
        </div>
        <Button variant="outline" onClick={handleSeedData} disabled={isSeeding || isLoading}>
          <Database className="w-4 h-4 mr-2" />
          {isSeeding ? 'Gerando...' : 'Gerar Dados de Teste'}
        </Button>
      </div>

      <Tabs defaultValue="cupons" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 mb-8">
          <TabsTrigger value="cupons" className="py-2.5">Cupons</TabsTrigger>
          <TabsTrigger value="progressivo" className="py-2.5">Desconto Progressivo</TabsTrigger>
          <TabsTrigger value="pix" className="py-2.5">Desconto PIX</TabsTrigger>
          <TabsTrigger value="boleto" className="py-2.5">Boleto</TabsTrigger>
          <TabsTrigger value="relatorio" className="py-2.5">Relatório de Uso</TabsTrigger>
        </TabsList>

        <TabsContent value="cupons" className="focus-visible:outline-none">
          <CuponsTab />
        </TabsContent>

        <TabsContent value="progressivo" className="focus-visible:outline-none">
          <DescontoProgressivoTab configuracoes={configuracoes} onUpdateConfiguracoes={setConfiguracoes} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="pix" className="focus-visible:outline-none">
          <DescontoPIXTab configuracoes={configuracoes} onUpdateConfiguracoes={setConfiguracoes} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="boleto" className="focus-visible:outline-none">
          <BoletoConfigTab />
        </TabsContent>

        <TabsContent value="relatorio" className="focus-visible:outline-none">
          <RelatorioUsoTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}