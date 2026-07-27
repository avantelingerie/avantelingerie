import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';

export default function AjusteDescontoModal({ isOpen, onClose, cliente, onSave }) {
  const [nivel, setNivel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cliente && isOpen) {
      setNivel(cliente.nivel_desconto || 0);
    }
  }, [cliente, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nivelNum = parseInt(nivel, 10);
    if (isNaN(nivelNum) || nivelNum < 0 || nivelNum > 5) {
      toast.error('O nível deve ser um número entre 0 e 5.');
      return;
    }

    setIsLoading(true);
    try {
      await clientesService.updateNivelDesconto(cliente.id, nivelNum);
      toast.success('Nível de desconto atualizado com sucesso!');
      onSave();
      onClose();
    } catch (error) {
      toast.error('Erro ao atualizar nível de desconto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate preview percentage (assuming 10% per level as per service logic)
  const previewPct = parseInt(nivel, 10) * 10 || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Ajustar Nível de Desconto</DialogTitle>
          <DialogDescription>
            Defina o nível de desconto para {cliente?.nome}. O nível determina a porcentagem de desconto aplicada automaticamente nas compras.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="nivel">Nível (0 a 5)</Label>
            <Input 
              id="nivel" 
              type="number" 
              min="0" 
              max="5" 
              value={nivel} 
              onChange={(e) => setNivel(e.target.value)} 
              required
            />
          </div>

          <div className="bg-muted p-4 rounded-lg flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Desconto Projetado:</span>
            <span className="text-2xl font-bold text-primary">{previewPct}%</span>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar Ajuste'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}