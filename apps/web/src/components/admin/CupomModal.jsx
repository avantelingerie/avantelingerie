import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { toast } from 'sonner';
import { descontosService } from '@/services/descontosService.js';
import { Loader2 } from 'lucide-react';

export default function CupomModal({ open, onOpenChange, cupom, onSuccess }) {
  const [codigo, setCodigo] = useState('');
  const [tipo, setTipo] = useState('percentual');
  const [valor, setValor] = useState('');
  const [validade, setValidade] = useState('');
  const [limiteUsos, setLimiteUsos] = useState('');
  const [usoUnico, setUsoUnico] = useState(false);
  const [ativo, setAtivo] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && cupom) {
      setCodigo(cupom.codigo || '');
      setTipo(cupom.tipo || 'percentual');
      setValor(cupom.valor?.toString() || '');
      setValidade(cupom.validade ? cupom.validade.split(' ')[0] : '');
      setLimiteUsos(cupom.limite_usos?.toString() || '');
      setUsoUnico(cupom.uso_unico || false);
      setAtivo(cupom.ativo !== undefined ? cupom.ativo : true);
      setErrors({});
    } else if (open && !cupom) {
      setCodigo('');
      setTipo('percentual');
      setValor('');
      setValidade('');
      setLimiteUsos('');
      setUsoUnico(false);
      setAtivo(true);
      setErrors({});
    }
  }, [open, cupom]);

  const validateForm = () => {
    const newErrors = {};
    const formattedCodigo = codigo.trim().toUpperCase();
    
    if (!formattedCodigo) {
      newErrors.codigo = 'Código é obrigatório.';
    }
    
    const v = parseFloat(valor);
    if (isNaN(v) || v <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero.';
    } else if (tipo === 'percentual' && v > 100) {
      newErrors.valor = 'Percentual não pode ser maior que 100%.';
    }

    if (validade && ativo) {
      const valDate = new Date(validade + 'T23:59:59');
      if (valDate < new Date()) {
        newErrors.validade = 'Data de validade não pode estar no passado para cupons ativos.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (open && (codigo || valor || validade)) {
      validateForm();
    }
  }, [codigo, tipo, valor, validade, ativo, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Corrija os erros antes de salvar.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formattedCodigo = codigo.trim().toUpperCase();
      
      // Check unique constraint
      const isUnique = await descontosService.validateCodigoUnique(formattedCodigo, cupom?.id);
      if (!isUnique) {
        setErrors(prev => ({ ...prev, codigo: 'Este código de cupom já existe.' }));
        throw new Error('Este código de cupom já existe.');
      }

      const payload = {
        codigo: formattedCodigo,
        tipo,
        valor: parseFloat(valor),
        validade: validade ? `${validade} 23:59:59Z` : null,
        limite_usos: limiteUsos ? parseInt(limiteUsos, 10) : null,
        uso_unico: usoUnico,
        ativo
      };

      if (cupom?.id) {
        await descontosService.updateCupom(cupom.id, payload);
        toast.success('Cupom atualizado com sucesso.');
      } else {
        await descontosService.createCupom(payload);
        toast.success('Cupom criado com sucesso.');
      }
      
      onSuccess();
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || 'Erro ao salvar cupom.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{cupom ? 'Editar Cupom' : 'Novo Cupom'}</DialogTitle>
          <DialogDescription>
            Crie códigos promocionais para marketing e retenção.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Código</Label>
              <Input 
                value={codigo} 
                onChange={(e) => setCodigo(e.target.value.toUpperCase())} 
                placeholder="EX: VERAO20" 
                required 
                className={errors.codigo ? 'border-destructive' : ''}
              />
              {errors.codigo && <p className="text-xs text-destructive">{errors.codigo}</p>}
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Tipo de Desconto</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentual">Percentual (%)</SelectItem>
                  <SelectItem value="valor_fixo">Valor Fixo (R$)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor do Desconto</Label>
              <Input 
                type="number" 
                step="0.01" 
                min="0"
                value={valor} 
                onChange={(e) => setValor(e.target.value)} 
                required 
                className={errors.valor ? 'border-destructive' : ''}
              />
              {errors.valor && <p className="text-xs text-destructive">{errors.valor}</p>}
            </div>
            <div className="space-y-2">
              <Label>Validade (Opcional)</Label>
              <Input 
                type="date" 
                value={validade} 
                onChange={(e) => setValidade(e.target.value)} 
                className={errors.validade ? 'border-destructive' : ''}
              />
              {errors.validade && <p className="text-xs text-destructive">{errors.validade}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Limite de Usos Globais (Opcional)</Label>
            <Input 
              type="number" 
              min="1" 
              value={limiteUsos} 
              onChange={(e) => setLimiteUsos(e.target.value)} 
              placeholder="Qtd de vezes que o cupom pode ser usado" 
            />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-0.5">
              <Label>Uso Único por Cliente</Label>
              <p className="text-xs text-muted-foreground">Cada cliente pode usar apenas uma vez.</p>
            </div>
            <Switch checked={usoUnico} onCheckedChange={setUsoUnico} />
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="space-y-0.5">
              <Label>Status Ativo</Label>
              <p className="text-xs text-muted-foreground">O cupom pode ser usado no checkout.</p>
            </div>
            <Switch checked={ativo} onCheckedChange={setAtivo} />
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting || hasErrors}>
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Salvar Cupom
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}