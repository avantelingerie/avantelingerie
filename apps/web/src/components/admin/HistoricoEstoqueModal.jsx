import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { ArrowDownRight, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { estoqueService } from '@/services/estoqueService.js';
import { format } from 'date-fns';

export default function HistoricoEstoqueModal({ open, onOpenChange, sku }) {
  const [historico, setHistorico] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [error, setError] = useState(null);

  const fetchHistorico = async () => {
    if (!sku) return;
    try {
      setIsLoading(true);
      setError(null);
      console.log(`[Teste 3] Filtro aplicado: ${dataInicio || 'início'} a ${dataFim || 'fim'}, buscando...`);
      const data = await estoqueService.buscarHistoricoEstoque(sku, dataInicio, dataFim);
      
      console.log(`[Teste 3] Movimentações carregadas: ${data.length}`);
      console.log('[Teste 3] Ordenação: mais recente primeiro');
      if (data.length > 0) {
        console.group(`[Teste 3] Tabela de Histórico - SKU: ${sku}`);
        const tableData = data.map(item => {
          console.log(`[Teste 3] Status Bling (ID ${item.id}): ${item.bling_sincronizado ? "sucesso" : "erro"}`);
          return {
            ID: item.id,
            Data: format(new Date(item.criado_em), "dd/MM/yy HH:mm"),
            Tipo: item.tipo,
            Qtd: item.quantidade,
            'Estoque Ant': item.qtd_anterior,
            'Estoque Novo': item.qtd_atual,
            Motivo: item.motivo,
            'Motivo Livre': item.motivo_livre,
            Admin: item.expand?.admin_id?.nome || 'Sistema',
            'Bling Sync': item.bling_sincronizado
          };
        });
        console.table(tableData);
        console.groupEnd();
      }
      
      setHistorico(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar o histórico');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && sku) {
      console.log(`[Teste 3] Histórico aberto para SKU: ${sku}`);
      fetchHistorico();
    } else {
      setHistorico([]);
      setDataInicio('');
      setDataFim('');
    }
  }, [open, sku, dataInicio, dataFim]);

  const getMotivoLabel = (motivo) => {
    const labels = {
      compra_fornecedor: 'Compra Fornecedor',
      ajuste: 'Ajuste',
      devolucao: 'Devolução',
      perda: 'Perda/Avaria',
      outros: 'Outros',
      venda: 'Venda'
    };
    return labels[motivo] || motivo;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Histórico de Movimentação</SheetTitle>
          <SheetDescription>SKU: {sku}</SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Data Inicial</Label>
            <Input 
              type="date" 
              value={dataInicio} 
              onChange={(e) => setDataInicio(e.target.value)} 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Data Final</Label>
            <Input 
              type="date" 
              value={dataFim} 
              onChange={(e) => setDataFim(e.target.value)} 
            />
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Estoque (Ant → Novo)</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Admin / Bling</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : historico.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    Nenhuma movimentação encontrada neste período.
                  </TableCell>
                </TableRow>
              ) : (
                historico.map((mov) => (
                  <TableRow key={mov.id}>
                    <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                      {format(new Date(mov.criado_em), "dd/MM/yy HH:mm")}
                    </TableCell>
                    <TableCell>
                      {mov.tipo === 'entrada' ? (
                        <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200 gap-1 pr-2">
                          <ArrowUpRight className="w-3 h-3" /> Entrada
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 gap-1 pr-2">
                          <ArrowDownRight className="w-3 h-3" /> Saída
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-center">
                      {mov.quantidade}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className="text-muted-foreground">{mov.qtd_anterior}</span>
                      <span className="mx-1 text-muted-foreground">→</span>
                      <span className="font-medium text-foreground">{mov.qtd_atual}</span>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{getMotivoLabel(mov.motivo)}</div>
                      {mov.motivo_livre && (
                        <div className="text-xs text-muted-foreground truncate max-w-[120px]" title={mov.motivo_livre}>
                          {mov.motivo_livre}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium truncate max-w-[100px]" title={mov.expand?.admin_id?.nome}>
                        {mov.expand?.admin_id?.nome || 'Sistema'}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px]">
                        {mov.bling_sincronizado ? (
                          <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> OK Bling</span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1" title={mov.bling_erro}><AlertCircle className="w-3 h-3" /> Erro Bling</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SheetContent>
    </Sheet>
  );
}