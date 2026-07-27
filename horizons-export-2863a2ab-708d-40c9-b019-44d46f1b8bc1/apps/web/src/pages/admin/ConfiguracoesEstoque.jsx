import React, { useState, useEffect } from 'react';
import { estoqueService } from '@/services/estoqueService.js';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Button } from '@/components/ui/button.jsx';
import { toast } from 'sonner';
import { Settings, Save, Loader2, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton.jsx';

export default function ConfiguracoesEstoque() {
  const [limite, setLimite] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    console.log('[Teste 4] Página de configurações carregada');
    const fetchConfig = async () => {
      try {
        const config = await estoqueService.buscarConfiguracoes();
        setLimite(config.limite_alerta_global?.toString() || '10');
        console.log(`[Teste 4] Limite atual: ${config.limite_alerta_global || 10}`);
      } catch (err) {
        toast.error('Erro ao carregar configurações de estoque.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!limite || parseInt(limite, 10) < 0) {
      toast.error('Informe um limite válido maior ou igual a 0.');
      return;
    }
    
    setIsSaving(true);
    console.log(`[Teste 4] Salvando configurações: limite_alerta_global=${limite}`);
    try {
      await estoqueService.atualizarConfiguracoes(parseInt(limite, 10));
      console.log('[Teste 4] Configurações atualizadas com sucesso');
      toast.success('Configurações de estoque atualizadas com sucesso.');
      // Dispatch event so AdminLayout can re-evaluate global alerts
      window.dispatchEvent(new Event('inventory_updated'));
      console.log('[Teste 4] Status visual atualizado com novo limite (evento disparado para tabelas/badges)');
    } catch (err) {
      toast.error('Falha ao salvar configurações.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLimiteChange = (e) => {
    const novoValor = e.target.value;
    setLimite(novoValor);
    console.log(`[Teste 4] Limite alterado para: ${novoValor}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          Configurações de Estoque
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie regras de alertas e comportamentos globais de estoque.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8 bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Alertas e Níveis Críticos</h3>
            <div className="bg-muted/40 p-4 rounded-lg flex gap-3 text-sm text-muted-foreground items-start">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p>O limite de alerta global define quando um produto passa a ter status de "Estoque Baixo". Produtos com estoque igual a zero são sempre marcados como "Zerados".</p>
            </div>
            
            <div className="space-y-2 max-w-sm pt-2">
              <Label htmlFor="limite" className="text-base">Limite de Alerta Global (Qtd)</Label>
              <div className="relative">
                <Input 
                  id="limite"
                  type="number"
                  min="0"
                  value={limite}
                  onChange={handleLimiteChange}
                  className="pl-4 text-lg h-12"
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t flex justify-end">
            <Button type="submit" size="lg" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}