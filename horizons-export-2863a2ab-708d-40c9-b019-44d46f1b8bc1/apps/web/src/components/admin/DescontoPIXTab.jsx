import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { descontosService } from '@/services/descontosService.js';
import { toast } from 'sonner';
import { Loader2, Save, Percent } from 'lucide-react';

export default function DescontoPIXTab({ configuracoes, onUpdateConfiguracoes, isLoading }) {
  const [ativo, setAtivo] = useState(false);
  const [percentual, setPercentual] = useState('');
  const [valorMinimo, setValorMinimo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (configuracoes) {
      setAtivo(configuracoes.desconto_pix_ativo || false);
      setPercentual(configuracoes.desconto_pix_pct?.toString() || '0');
      setValorMinimo(configuracoes.desconto_pix_valor_minimo?.toString() || '0');
    }
  }, [configuracoes]);

  const validateForm = () => {
    const newErrors = {};
    const p = parseFloat(percentual);
    const v = parseFloat(valorMinimo);

    if (ativo) {
      if (isNaN(p) || p < 0 || p > 100) {
        newErrors.percentual = 'Percentual deve ser entre 0 e 100.';
      }
      if (isNaN(v) || v < 0) {
        newErrors.valorMinimo = 'Valor mínimo deve ser maior ou igual a zero.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [percentual, valorMinimo, ativo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Corrija os erros antes de salvar.');
      return;
    }

    try {
      setIsSaving(true);
      const dataToSave = {
        desconto_pix_ativo: ativo,
        desconto_pix_pct: parseFloat(percentual) || 0,
        desconto_pix_valor_minimo: parseFloat(valorMinimo) || 0
      };

      await descontosService.updateConfiguracoes(dataToSave);
      onUpdateConfiguracoes({ ...configuracoes, ...dataToSave });
      toast.success('Desconto PIX atualizado com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar as configurações de PIX.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold">Desconto PIX</h2>
        <p className="text-sm text-muted-foreground">Ofereça um desconto extra para pagamentos via PIX.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Percent className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Status Atual: {ativo ? 'Ativo' : 'Inativo'}</h3>
          {ativo && (
            <p className="text-sm text-muted-foreground">
              {percentual}% de desconto em pedidos acima de R$ {parseFloat(valorMinimo || 0).toFixed(2).replace('.', ',')}
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <Label className="text-base">Habilitar Desconto PIX</Label>
            <p className="text-sm text-muted-foreground">Ative ou desative o desconto de PIX em toda a loja.</p>
          </div>
          <Switch 
            checked={ativo} 
            onCheckedChange={setAtivo} 
          />
        </div>

        <div className={`space-y-6 transition-opacity duration-300 ${!ativo ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="space-y-2">
            <Label htmlFor="perc">Percentual de Desconto (%)</Label>
            <Input 
              id="perc"
              type="number" 
              step="0.01" 
              min="0" 
              max="100" 
              value={percentual} 
              onChange={(e) => setPercentual(e.target.value)} 
              disabled={!ativo}
              required={ativo}
              className={errors.percentual ? 'border-destructive' : ''}
            />
            {errors.percentual && <p className="text-xs text-destructive">{errors.percentual}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vmin">Valor Mínimo do Pedido (R$)</Label>
            <p className="text-xs text-muted-foreground mb-2">O desconto só será aplicado se o subtotal atingir este valor.</p>
            <Input 
              id="vmin"
              type="number" 
              step="0.01" 
              min="0" 
              value={valorMinimo} 
              onChange={(e) => setValorMinimo(e.target.value)} 
              disabled={!ativo}
              required={ativo}
              className={errors.valorMinimo ? 'border-destructive' : ''}
            />
            {errors.valorMinimo && <p className="text-xs text-destructive">{errors.valorMinimo}</p>}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isSaving || hasErrors}>
            {isSaving ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Salvando...</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Salvar Configurações</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}