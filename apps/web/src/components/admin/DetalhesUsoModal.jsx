import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { descontosService } from '@/services/descontosService.js';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DetalhesUsoModal({ open, onOpenChange, cupom, initialDataInicial, initialDataFinal }) {
  const [usos, setUsos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [dataInicial, setDataInicial] = useState(initialDataInicial || '');
  const [dataFinal, setDataFinal] = useState(initialDataFinal || '');

  useEffect(() => {
    if (open && cupom) {
      setIsLoading(true);
      setError(null);
      descontosService.getUsosCupons(cupom.id, { data_inicial: dataInicial, data_final: dataFinal })
        .then(data => {
          // Sort by date descending
          const sorted = data.sort((a, b) => new Date(b.created) - new Date(a.created));
          setUsos(sorted);
        })
        .catch(err => setError('Falha ao carregar detalhes de uso.'))
        .finally(() => setIsLoading(false));
    } else {
      setUsos([]);
    }
  }, [open, cupom, dataInicial, dataFinal]);

  const totalEconomia = usos.reduce((acc, curr) => acc + (curr.valor_desconto || 0), 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Uso do Cupom: {cupom?.codigo}</SheetTitle>
          <SheetDescription>
            Detalhes de todos os pedidos onde este cupom foi aplicado.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Data Inicial</Label>
            <Input 
              type="date" 
              value={dataInicial} 
              onChange={(e) => setDataInicial(e.target.value)} 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Data Final</Label>
            <Input 
              type="date" 
              value={dataFinal} 
              onChange={(e) => setDataFinal(e.target.value)} 
            />
          </div>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-destructive/10 text-destructive rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {!isLoading && usos.length > 0 && (
          <div className="bg-muted p-4 rounded-xl mb-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total de Usos</p>
              <p className="text-2xl font-bold">{usos.length}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Economia Gerada</p>
              <p className="text-2xl font-bold text-emerald-600">
                R$ {totalEconomia.toFixed(2).replace('.', ',')}
              </p>
            </div>
          </div>
        )}

        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="text-right">Desconto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell align="right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : usos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Nenhum uso encontrado neste período.
                  </TableCell>
                </TableRow>
              ) : (
                usos.map(uso => (
                  <TableRow key={uso.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(uso.created), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      {uso.pedido_id}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {uso.cliente_id || '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium text-emerald-600">
                      R$ {(uso.valor_desconto || 0).toFixed(2).replace('.', ',')}
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