import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';

export default function FaixaDescontoModal({ open, onOpenChange, faixa, onSave, allFaixas = [] }) {
  const [valorMinimo, setValorMinimo] = useState('');
  const [valorMaximo, setValorMaximo] = useState('');
  const [percentual, setPercentual] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && faixa) {
      setValorMinimo(faixa.valor_minimo?.toString() || '');
      setValorMaximo(faixa.valor_maximo?.toString() || '');
      setPercentual(faixa.percentual?.toString() || '');
      setErrors({});
    } else if (open && !faixa) {
      setValorMinimo('');
      setValorMaximo('');
      setPercentual('');
      setErrors({});
    }
  }, [open, faixa]);

  const validateOverlaps = (min, max) => {
    const otherFaixas = faixa ? allFaixas.filter(f => f.id !== faixa.id) : allFaixas;
    
    for (const f of otherFaixas) {
      const fMin = parseFloat(f.valor_minimo);
      const fMax = f.valor_maximo ? parseFloat(f.valor_maximo) : Infinity;
      const cMin = min;
      const cMax = max || Infinity;

      if (Math.max(cMin, fMin) <= Math.min(cMax, fMax)) {
        return true;
      }
    }
    return false;
  };

  const validateForm = () => {
    const newErrors = {};
    const min = parseFloat(valorMinimo);
    const max = valorMaximo ? parseFloat(valorMaximo) : null;
    const perc = parseFloat(percentual);

    if (isNaN(min) || min < 0) {
      newErrors.valorMinimo = 'Valor mínimo deve ser maior ou igual a zero.';
    }
    if (max !== null && (isNaN(max) || max <= min)) {
      newErrors.valorMaximo = 'Valor máximo deve ser maior que o valor mínimo.';
    }
    if (isNaN(perc) || perc <= 0 || perc > 100) {
      newErrors.percentual = 'Percentual deve ser entre 0.01 e 100.';
    }

    if (Object.keys(newErrors).length === 0 && validateOverlaps(min, max)) {
      newErrors.geral = 'Esta faixa conflita com uma faixa existente (sobreposição).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Real-time validation effect
  useEffect(() => {
    if (open) {
      if (valorMinimo === '' && valorMaximo === '' && percentual === '') {
        setErrors({});
      } else {
        validateForm();
      }
    }
  }, [valorMinimo, valorMaximo, percentual, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Corrija os erros antes de salvar.');
      return;
    }

    const dataToSave = {
      id: faixa?.id || Date.now().toString(),
      valor_minimo: parseFloat(valorMinimo),
      valor_maximo: valorMaximo ? parseFloat(valorMaximo) : null,
      percentual: parseFloat(percentual)
    };

    onSave(dataToSave);
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isFormEmpty = valorMinimo === '' || percentual === '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{faixa ? 'Editar Faixa de Desconto' : 'Nova Faixa de Desconto'}</DialogTitle>
          <DialogDescription>
            Configure as regras para o desconto progressivo com base no valor do carrinho.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {errors.geral && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {errors.geral}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor Mínimo (R$)</Label>
              <Input 
                type="number" 
                step="0.01" 
                min="0"
                value={valorMinimo} 
                onChange={(e) => setValorMinimo(e.target.value)} 
                required 
                className={errors.valorMinimo ? 'border-destructive' : ''}
              />
              {errors.valorMinimo && <p className="text-xs text-destructive">{errors.valorMinimo}</p>}
            </div>
            <div className="space-y-2">
              <Label>Valor Máximo (R$)</Label>
              <Input 
                type="number" 
                step="0.01" 
                value={valorMaximo} 
                onChange={(e) => setValorMaximo(e.target.value)} 
                placeholder="Deixe vazio para ∞" 
                className={errors.valorMaximo ? 'border-destructive' : ''}
              />
              {errors.valorMaximo && <p className="text-xs text-destructive">{errors.valorMaximo}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Desconto (%)</Label>
            <Input 
              type="number" 
              step="0.01" 
              min="0" 
              max="100" 
              value={percentual} 
              onChange={(e) => setPercentual(e.target.value)} 
              required 
              className={errors.percentual ? 'border-destructive' : ''}
            />
            {errors.percentual && <p className="text-xs text-destructive">{errors.percentual}</p>}
          </div>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" disabled={hasErrors || isFormEmpty}>Salvar Faixa</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}