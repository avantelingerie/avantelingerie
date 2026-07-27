import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { estoqueService } from '@/services/estoqueService.js';
import { useAdminAuth } from '@/context/AdminAuthContext.jsx';
import { RefreshCcw } from 'lucide-react';

export default function MovimentacaoEstoqueModal({ open, onOpenChange, variacao, onSuccess }) {
  const { currentAdmin } = useAdminAuth();
  
  const [tipo, setTipo] = useState('entrada');
  const [quantidade, setQuantidade] = useState(1);
  const [motivo, setMotivo] = useState('compra_fornecedor');
  const [motivoLivre, setMotivoLivre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill datetime string for display
  const now = new Date().toLocaleString('pt-BR');

  useEffect(() => {
    if (open && variacao) {
      console.log(`[Teste 2] Modal aberto para SKU: ${variacao.sku}`);
      console.log(`[Teste 2] SKU preenchido: ${variacao.sku}`);
    } else if (!open && variacao) {
      console.log('[Teste 2] Modal fechado');
    }
  }, [open, variacao]);

  useEffect(() => {
    if (open) {
      console.log(`[Teste 2] Campo motivo_livre visível: ${motivo === 'outros'}`);
    }
  }, [motivo, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!variacao || !currentAdmin) return;
    
    if (quantidade < 1) {
      toast.error('A quantidade deve ser maior ou igual a 1.');
      return;
    }

    if (motivo === 'outros' && !motivoLivre.trim()) {
      toast.error('Informe o motivo livre.');
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(`[Teste 2] Movimentação criada: tipo=${tipo}, quantidade=${quantidade}, motivo=${motivo}`);
      
      const res = await estoqueService.criarMovimentacao(
        variacao.id,
        variacao.sku,
        tipo,
        parseInt(quantidade, 10),
        motivo,
        motivoLivre,
        currentAdmin.id
      );

      console.log(`[Teste 2] Estoque atualizado: ${res.movimentacao.qtd_anterior} → ${res.movimentacao.qtd_atual}`);
      console.log(`[Teste 2] Registro criado em movimentacoes_estoque: ${res.movimentacao.id}`);
      console.log(`[Teste 2] Sincronização Bling: ${res.syncResult.sucesso ? "sucesso" : "erro"}`);

      if (res.syncResult.sucesso) {
        toast.success('Movimentação realizada e sincronizada com Bling!');
      } else {
        toast.warning(`Movimentação salva. Erro Bling: ${res.syncResult.erro}`);
      }
      
      onSuccess && onSuccess();
      console.log('[Teste 2] Tabela atualizada');
      onOpenChange(false);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Erro ao realizar movimentação.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTipo('entrada');
    setQuantidade(1);
    setMotivo('compra_fornecedor');
    setMotivoLivre('');
  };

  if (!variacao) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) resetForm();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Movimentar Estoque</DialogTitle>
          <DialogDescription>
            Ajuste o estoque do item selecionado. A alteração refletirá no ERP Bling.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={variacao.sku || ''} disabled className="bg-muted text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label>Estoque Atual</Label>
              <Input value={variacao.estoque || 0} disabled className="bg-muted text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Movimentação</Label>
              <Select value={tipo} onValueChange={(val) => {
                setTipo(val);
                setMotivo(val === 'entrada' ? 'compra_fornecedor' : 'venda');
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input 
                type="number" 
                min="1" 
                value={quantidade} 
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Motivo</Label>
            <Select value={motivo} onValueChange={setMotivo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                {tipo === 'entrada' ? (
                  <>
                    <SelectItem value="compra_fornecedor">Compra de Fornecedor</SelectItem>
                    <SelectItem value="devolucao">Devolução</SelectItem>
                    <SelectItem value="ajuste">Ajuste de Estoque</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="ajuste">Ajuste de Estoque</SelectItem>
                    <SelectItem value="perda">Perda / Avaria</SelectItem>
                    <SelectItem value="venda">Venda Externa</SelectItem>
                  </>
                )}
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {motivo === 'outros' && (
            <div className="space-y-2">
              <Label>Especifique o Motivo</Label>
              <Input 
                value={motivoLivre} 
                onChange={(e) => setMotivoLivre(e.target.value)}
                placeholder="Descreva o motivo da movimentação"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t">
            <div>
              <span className="block font-medium">Data/Hora:</span>
              <span>{now}</span>
            </div>
            <div>
              <span className="block font-medium">Responsável:</span>
              <span>{currentAdmin?.nome || 'Administrador'}</span>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : 'Confirmar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}