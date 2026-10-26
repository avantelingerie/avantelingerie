import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';
import { Loader2, Save, Calendar } from 'lucide-react';

export default function BoletoConfigTab() {
  const [ativo, setAtivo] = useState(true);
  const [vencimentoDias, setVencimentoDias] = useState(3);
  const [valorMinimo, setValorMinimo] = useState(59.90);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const records = await pb.collection('integracoes_config').getFullList({
        filter: 'chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_ativo" || chave_nome = "boleto_valor_minimo"',
        $autoCancel: false
      });

      const activeRecord = records.find(r => r.chave_nome === 'boleto_ativo');
      const daysRecord = records.find(r => r.chave_nome === 'boleto_vencimento_dias');
      const minRecord = records.find(r => r.chave_nome === 'boleto_valor_minimo');

      if (activeRecord) {
        setAtivo(activeRecord.chave_valor === 'true');
      }
      if (daysRecord && daysRecord.chave_valor) {
        setVencimentoDias(parseInt(daysRecord.chave_valor, 10) || 3);
      }
      if (minRecord && minRecord.chave_valor) {
        setValorMinimo(parseFloat(minRecord.chave_valor) || 59.90);
      }
    } catch (err) {
      console.error('[BoletoConfigTab] Erro ao carregar configurações do Boleto:', err);
      toast.error('Erro ao carregar configurações do Boleto.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const validateForm = (days, minVal) => {
    if (!ativo) {
      setError('');
      return true;
    }
    const d = parseInt(days, 10);
    if (isNaN(d) || d < 1 || d > 120) {
      setError('O prazo de vencimento deve ser entre 1 e 120 dias.');
      return false;
    }
    const m = parseFloat(minVal);
    if (isNaN(m) || m < 0) {
      setError('O valor mínimo deve ser um número maior ou igual a zero.');
      return false;
    }
    setError('');
    return true;
  };

  const handleDaysChange = (e) => {
    const val = e.target.value;
    setVencimentoDias(val);
    validateForm(val, valorMinimo);
  };

  const handleMinValChange = (e) => {
    const val = e.target.value;
    setValorMinimo(val);
    validateForm(vencimentoDias, val);
  };

  useEffect(() => {
    validateForm(vencimentoDias, valorMinimo);
  }, [ativo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(vencimentoDias, valorMinimo)) {
      toast.error('Por favor, corrija os erros antes de salvar.');
      return;
    }

    try {
      setIsSaving(true);
      const existing = await pb.collection('integracoes_config').getFullList({
        filter: 'chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_ativo" || chave_nome = "boleto_valor_minimo"',
        $autoCancel: false
      });

      const activeRecord = existing.find(r => r.chave_nome === 'boleto_ativo');
      const daysRecord = existing.find(r => r.chave_nome === 'boleto_vencimento_dias');
      const minRecord = existing.find(r => r.chave_nome === 'boleto_valor_minimo');

      // Save 'boleto_ativo'
      if (activeRecord) {
        await pb.collection('integracoes_config').update(activeRecord.id, {
          chave_valor: String(ativo)
        }, { $autoCancel: false });
      } else {
        await pb.collection('integracoes_config').create({
          servico: 'mercadopago',
          chave_nome: 'boleto_ativo',
          chave_valor: String(ativo),
          ambiente: 'producao'
        }, { $autoCancel: false });
      }

      // Save 'boleto_vencimento_dias'
      if (daysRecord) {
        await pb.collection('integracoes_config').update(daysRecord.id, {
          chave_valor: String(vencimentoDias)
        }, { $autoCancel: false });
      } else {
        await pb.collection('integracoes_config').create({
          servico: 'mercadopago',
          chave_nome: 'boleto_vencimento_dias',
          chave_valor: String(vencimentoDias),
          ambiente: 'producao'
        }, { $autoCancel: false });
      }

      // Save 'boleto_valor_minimo'
      if (minRecord) {
        await pb.collection('integracoes_config').update(minRecord.id, {
          chave_valor: String(valorMinimo)
        }, { $autoCancel: false });
      } else {
        await pb.collection('integracoes_config').create({
          servico: 'mercadopago',
          chave_nome: 'boleto_valor_minimo',
          chave_valor: String(valorMinimo),
          ambiente: 'producao'
        }, { $autoCancel: false });
      }

      if (ativo) {
        toast.success('Configurações do Boleto atualizadas com sucesso!');
      } else {
        toast.success('Boleto desativado com sucesso!');
      }
    } catch (err) {
      console.error('[BoletoConfigTab] Erro ao salvar:', err);
      toast.error('Erro ao salvar as configurações do Boleto.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-2xl">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold">Configuração do Boleto Bancário</h2>
        <p className="text-sm text-muted-foreground">Ative ou desative a exibição do boleto, defina o prazo de vencimento e o valor mínimo do carrinho.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Calendar className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Status Atual: {ativo ? 'Habilitado' : 'Desabilitado'}</h3>
          {ativo && (
            <p className="text-sm text-muted-foreground">
              O boleto expira em <strong className="text-foreground">{vencimentoDias} {parseInt(vencimentoDias, 10) === 1 ? 'dia' : 'dias'}</strong> após a emissão.
              <span className="block text-xs mt-0.5 text-primary/80">
                Disponível no checkout para pedidos a partir de <strong>R$ {Number(valorMinimo || 0).toFixed(2).replace('.', ',')}</strong>.
              </span>
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <div className="space-y-1">
            <Label className="text-base">Habilitar Boleto Bancário</Label>
            <p className="text-sm text-muted-foreground">Exibe ou oculta a opção de pagamento por Boleto no checkout.</p>
          </div>
          <Switch 
            checked={ativo} 
            onCheckedChange={setAtivo} 
          />
        </div>

        <div className={`space-y-6 transition-opacity duration-300 ${!ativo ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="space-y-2">
            <Label htmlFor="vencimento">Prazo de Vencimento (em dias)</Label>
            <p className="text-xs text-muted-foreground mb-2">Tempo que o cliente terá para efetuar o pagamento do boleto antes de ser cancelado.</p>
            <Input 
              id="vencimento"
              type="number" 
              min="1" 
              max="120" 
              value={vencimentoDias} 
              onChange={handleDaysChange} 
              disabled={!ativo}
              required={ativo}
              className={error && error.includes('prazo') ? 'border-destructive' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valorMinimo">Valor Mínimo do Pedido (R$)</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Valor mínimo no carrinho para exibir a opção de boleto no checkout. Pedidos abaixo deste valor não verão a opção de boleto, protegendo a margem da loja contra taxas fixas.
            </p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">R$</span>
              <Input 
                id="valorMinimo"
                type="number" 
                step="0.01"
                min="0"
                value={valorMinimo} 
                onChange={handleMinValChange} 
                disabled={!ativo}
                required={ativo}
                className={`pl-10 ${error && error.includes('mínimo') ? 'border-destructive' : ''}`}
                placeholder="59,90"
              />
            </div>
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isSaving || !!error}>
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