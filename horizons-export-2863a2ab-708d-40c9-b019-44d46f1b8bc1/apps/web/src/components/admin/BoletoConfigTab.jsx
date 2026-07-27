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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const records = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "stripe" && (chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_ativo")',
        $autoCancel: false
      });

      const activeRecord = records.find(r => r.chave_nome === 'boleto_ativo');
      const daysRecord = records.find(r => r.chave_nome === 'boleto_vencimento_dias');

      if (activeRecord) {
        setAtivo(activeRecord.chave_valor === 'true');
      }
      if (daysRecord && daysRecord.chave_valor) {
        setVencimentoDias(parseInt(daysRecord.chave_valor, 10) || 3);
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

  const validateForm = (val) => {
    if (!ativo) {
      setError('');
      return true;
    }
    const d = parseInt(val, 10);
    if (isNaN(d) || d < 1 || d > 120) {
      setError('O prazo de vencimento deve ser entre 1 e 120 dias.');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setVencimentoDias(val);
    validateForm(val);
  };

  useEffect(() => {
    validateForm(vencimentoDias);
  }, [ativo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm(vencimentoDias)) {
      toast.error('Por favor, corrija os erros antes de salvar.');
      return;
    }

    try {
      setIsSaving(true);
      const existing = await pb.collection('integracoes_config').getFullList({
        filter: 'servico = "stripe" && (chave_nome = "boleto_vencimento_dias" || chave_nome = "boleto_ativo")',
        $autoCancel: false
      });

      const activeRecord = existing.find(r => r.chave_nome === 'boleto_ativo');
      const daysRecord = existing.find(r => r.chave_nome === 'boleto_vencimento_dias');

      // Save 'boleto_ativo'
      if (activeRecord) {
        await pb.collection('integracoes_config').update(activeRecord.id, {
          chave_valor: String(ativo)
        }, { $autoCancel: false });
      } else {
        await pb.collection('integracoes_config').create({
          servico: 'stripe',
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
          servico: 'stripe',
          chave_nome: 'boleto_vencimento_dias',
          chave_valor: String(vencimentoDias),
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
        <h2 className="text-xl font-semibold">Configuração do Boleto Bancário (Stripe)</h2>
        <p className="text-sm text-muted-foreground">Ative/desative a exibição do boleto e defina o prazo de vencimento.</p>
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
              onChange={handleInputChange} 
              disabled={!ativo}
              required={ativo}
              className={error ? 'border-destructive' : ''}
            />
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