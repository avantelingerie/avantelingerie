import React, { useState, useEffect, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { descontosService } from '@/services/descontosService.js';
import { Download, FileText, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import DetalhesUsoModal from './DetalhesUsoModal.jsx';

export default function RelatorioUsoTab() {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Default to last 30 days
  const defaultStart = new Date();
  defaultStart.setDate(defaultStart.getDate() - 30);
  
  const [dataInicial, setDataInicial] = useState(defaultStart.toISOString().split('T')[0]);
  const [dataFinal, setDataFinal] = useState(new Date().toISOString().split('T')[0]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCupom, setSelectedCupom] = useState(null);

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const cuponsRes = await descontosService.getCupons({}, 1, 500);
      const cuponsList = cuponsRes.items;
      
      const usos = await descontosService.getUsosCupons(null, { data_inicial: dataInicial, data_final: dataFinal });
      
      const aggregated = cuponsList.map(cupom => {
        const usosCupom = usos.filter(u => u.cupom_id === cupom.id);
        const economia = usosCupom.reduce((acc, curr) => acc + (curr.valor_desconto || 0), 0);
        return {
          ...cupom,
          report_usos: usosCupom.length,
          economia_gerada_total: economia
        };
      }).filter(c => c.report_usos > 0 || (!dataInicial && !dataFinal));

      setReportData(aggregated.sort((a, b) => b.report_usos - a.report_usos));
    } catch (err) {
      toast.error('Erro ao carregar relatório.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dataInicial, dataFinal]);

  const handleExport = () => {
    descontosService.exportCuponsCSV(reportData);
    toast.success('Relatório exportado com sucesso.');
  };

  const chartData = useMemo(() => {
    return reportData
      .filter(item => item.economia_gerada_total > 0)
      .sort((a, b) => b.economia_gerada_total - a.economia_gerada_total)
      .slice(0, 10)
      .map(item => ({
        name: item.codigo,
        economia: item.economia_gerada_total
      }));
  }, [reportData]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Relatório de Uso</h2>
          <p className="text-sm text-muted-foreground">Acompanhe a performance e economia gerada por cupons.</p>
        </div>
        <div className="flex items-end gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Data Inicial</Label>
            <Input type="date" value={dataInicial} onChange={e => setDataInicial(e.target.value)} className="h-9" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Data Final</Label>
            <Input type="date" value={dataFinal} onChange={e => setDataFinal(e.target.value)} className="h-9" />
          </div>
          <Button variant="outline" size="sm" className="h-9" onClick={handleExport} disabled={isLoading || reportData.length === 0}>
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Top 10 Cupons por Economia Gerada</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val}`} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                  formatter={(value) => [`R$ ${value.toFixed(2)}`, 'Economia']}
                />
                <Bar dataKey="economia" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Cupom</TableHead>
              <TableHead className="text-center">Usos no Período</TableHead>
              <TableHead className="text-right">Economia Gerada</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  <TableCell align="center"><Skeleton className="h-5 w-16 mx-auto" /></TableCell>
                  <TableCell align="right"><Skeleton className="h-5 w-24 ml-auto" /></TableCell>
                  <TableCell align="right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : reportData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  Nenhum dado encontrado para o período selecionado.
                </TableCell>
              </TableRow>
            ) : (
              reportData.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-bold text-foreground">{c.codigo}</TableCell>
                  <TableCell className="text-center font-medium">{c.report_usos}</TableCell>
                  <TableCell className="text-right text-emerald-600 font-semibold">
                    R$ {(c.economia_gerada_total || 0).toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => { setSelectedCupom(c); setModalOpen(true); }}>
                      <FileText className="w-4 h-4 mr-2" />
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DetalhesUsoModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        cupom={selectedCupom} 
        initialDataInicial={dataInicial}
        initialDataFinal={dataFinal}
      />
    </div>
  );
}