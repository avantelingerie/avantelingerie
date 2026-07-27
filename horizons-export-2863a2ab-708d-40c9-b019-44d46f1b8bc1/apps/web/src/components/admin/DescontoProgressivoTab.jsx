// Caminho do arquivo no Horizons: componentes/admin/DescontoProgressivoTab.jsx
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs.jsx';
import { descontosService } from '@/services/descontosService.js';
import { Plus, Edit, Trash2, ShieldCheck, UserCheck, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import FaixaDescontoModal from './FaixaDescontoModal.jsx';

export default function DescontoProgressivoTab({ configuracoes, onUpdateConfiguracoes, isLoading }) {
  const [activeSubTab, setActiveSubTab] = useState('varejo');
  const [faixasVarejo, setFaixasVarejo] = useState([]);
  const [faixasRevenda, setFaixasRevenda] = useState([]);
  const [limiteUpgrade, setLimiteUpgrade] = useState('400.00');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaixa, setSelectedFaixa] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (configuracoes) {
      setFaixasVarejo(configuracoes.desconto_progressivo_faixas || []);
      setFaixasRevenda(configuracoes.desconto_progressivo_faixas_revenda || []);
      setLimiteUpgrade(configuracoes.limite_upgrade_revenda?.toString() || '400.00');
    }
  }, [configuracoes]);

  const formatCurrency = (val) => val != null ? `R$ ${parseFloat(val).toFixed(2).replace('.', ',')}` : '∞';

  const handleSaveFaixa = async (faixaToSave) => {
    let newFaixas;
    const currentFaixas = activeSubTab === 'varejo' ? faixasVarejo : faixasRevenda;

    if (selectedFaixa) {
      newFaixas = currentFaixas.map(f => f.id === faixaToSave.id ? faixaToSave : f);
    } else {
      newFaixas = [...currentFaixas, faixaToSave];
    }
    
    newFaixas.sort((a, b) => a.valor_minimo - b.valor_minimo);
    
    // Payload consolidado em lote: envia sempre ambas as listas e o limite do gatilho para evitar desincronização
    const batchPayload = {
      desconto_progressivo_faixas: activeSubTab === 'varejo' ? newFaixas : faixasVarejo,
      desconto_progressivo_faixas_revenda: activeSubTab === 'revenda' ? newFaixas : faixasRevenda,
      limite_upgrade_revenda: parseFloat(limiteUpgrade) || 400.00
    };

    if (activeSubTab === 'varejo') {
      setFaixasVarejo(newFaixas);
    } else {
      setFaixasRevenda(newFaixas);
    }

    await persistConfig(batchPayload, `Faixa de ${activeSubTab === 'varejo' ? 'varejo B2C' : 'atacado B2B'} salva com sucesso!`);
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover esta faixa de desconto?')) return;
    
    const currentFaixas = activeSubTab === 'varejo' ? faixasVarejo : faixasRevenda;
    const newFaixas = currentFaixas.filter(f => f.id !== id);
    
    // Payload consolidado em lote
    const batchPayload = {
      desconto_progressivo_faixas: activeSubTab === 'varejo' ? newFaixas : faixasVarejo,
      desconto_progressivo_faixas_revenda: activeSubTab === 'revenda' ? newFaixas : faixasRevenda,
      limite_upgrade_revenda: parseFloat(limiteUpgrade) || 400.00
    };

    if (activeSubTab === 'varejo') {
      setFaixasVarejo(newFaixas);
    } else {
      setFaixasRevenda(newFaixas);
    }

    await persistConfig(batchPayload, `Faixa de ${activeSubTab === 'varejo' ? 'varejo B2C' : 'atacado B2B'} removida com sucesso!`);
  };

  const handleSaveUpgradeLimit = async (e) => {
    e.preventDefault();
    const limitNum = parseFloat(limiteUpgrade);
    if (isNaN(limitNum) || limitNum <= 0) {
      toast.error('O valor limite do gatilho deve ser um número maior que zero.');
      return;
    }

    const batchPayload = {
      desconto_progressivo_faixas: faixasVarejo,
      desconto_progressivo_faixas_revenda: faixasRevenda,
      limite_upgrade_revenda: limitNum
    };

    await persistConfig(batchPayload, 'Gatilho de ativação atacado B2B atualizado com sucesso!');
  };

  const persistConfig = async (updatedFields, successMessage) => {
    try {
      setIsSaving(true);
      const updated = await descontosService.updateConfiguracoes(updatedFields);
      onUpdateConfiguracoes(updated);
      toast.success(successMessage);
    } catch (err) {
      toast.error('Erro ao atualizar configurações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 bg-zinc-800" />
        <Skeleton className="h-64 w-full rounded-xl bg-zinc-800" />
      </div>
    );
  }

  const currentFaixas = activeSubTab === 'varejo' ? faixasVarejo : faixasRevenda;

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2 text-white font-sans">
          Configuração de Descontos e Atacado B2B
        </h2>
        <p className="text-sm text-zinc-400 font-light mt-1">
          Gerencie as faixas de desconto progressivo para varejo e atacado, além dos parâmetros de upgrade de revendedoras.
        </p>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid grid-cols-3 max-w-xl bg-zinc-900 border border-zinc-850 p-1 rounded-xl">
          <TabsTrigger value="varejo" className="rounded-lg flex items-center justify-center gap-1.5 py-2 font-medium transition-all text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-[#c59b5f] data-[state=active]:font-semibold">
            <UserCheck className="w-4 h-4" /> Varejo (B2C)
          </TabsTrigger>
          <TabsTrigger value="revenda" className="rounded-lg flex items-center justify-center gap-1.5 py-2 font-medium transition-all text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-[#c59b5f] data-[state=active]:font-semibold">
            <ShieldCheck className="w-4 h-4" /> Atacado (B2B)
          </TabsTrigger>
          <TabsTrigger value="parametros" className="rounded-lg flex items-center justify-center gap-1.5 py-2 font-medium transition-all text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-[#c59b5f] data-[state=active]:font-semibold">
            <TrendingUp className="w-4 h-4" /> Gatilho & Regras
          </TabsTrigger>
        </TabsList>

        {/* Guia Varejo B2C */}
        <TabsContent value="varejo" className="space-y-4 mt-6 focus-visible:outline-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">Faixas de Desconto Progressivo - Varejo B2C</h3>
              <p className="text-xs text-zinc-400 mt-1">Configurações para clientes comuns de varejo.</p>
            </div>
            <Button 
              onClick={() => { setSelectedFaixa(null); setModalOpen(true); }} 
              disabled={isSaving}
              className="bg-[#c59b5f] hover:bg-[#c59b5f]/90 text-black font-semibold rounded-lg px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Faixa B2C
            </Button>
          </div>

          <div className="border border-zinc-800 rounded-xl bg-[#121212] overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-900/60 border-b border-zinc-800">
                <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-300 font-medium">Valor Mínimo</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Valor Máximo</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Desconto</TableHead>
                  <TableHead className="text-right text-zinc-300 font-medium">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faixasVarejo.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                      Nenhuma faixa de desconto progressivo configurada para varejo.
                    </TableCell>
                  </TableRow>
                ) : (
                  faixasVarejo.map((f) => (
                    <TableRow key={f.id} className="border-b border-zinc-800 hover:bg-zinc-900/20">
                      <TableCell className="font-semibold text-white">{formatCurrency(f.valor_minimo)}</TableCell>
                      <TableCell className="text-zinc-300">{formatCurrency(f.valor_maximo)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#c59b5f]/15 text-[#c59b5f] border border-[#c59b5f]/20">
                          {f.percentual}% OFF
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => { setSelectedFaixa(f); setModalOpen(true); }}
                          disabled={isSaving}
                          className="hover:bg-zinc-800 hover:text-white"
                        >
                          <Edit className="w-4 h-4 text-zinc-400" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(f.id)}
                          disabled={isSaving}
                          className="hover:bg-red-950/30 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 text-red-500/80" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Guia Atacado B2B */}
        <TabsContent value="revenda" className="space-y-4 mt-6 focus-visible:outline-none">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-white">Faixas de Desconto Progressivo - Atacado B2B</h3>
              <p className="text-xs text-zinc-400 mt-1">Descontos extras cumulativos para revendedoras qualificadas.</p>
            </div>
            <Button 
              onClick={() => { setSelectedFaixa(null); setModalOpen(true); }} 
              disabled={isSaving} 
              className="bg-zinc-800 border border-[#c59b5f]/30 hover:border-[#c59b5f] text-[#c59b5f] hover:bg-[#c59b5f]/10 font-semibold rounded-lg px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Faixa B2B
            </Button>
          </div>

          <div className="border border-zinc-800 rounded-xl bg-[#121212] overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-900/60 border-b border-zinc-800">
                <TableRow className="border-b border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-300 font-medium">Valor Mínimo</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Valor Máximo</TableHead>
                  <TableHead className="text-zinc-300 font-medium">Desconto Extra</TableHead>
                  <TableHead className="text-right text-zinc-300 font-medium">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faixasRevenda.length === 0 ? (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                      Nenhuma faixa de desconto de revenda configurada.
                    </TableCell>
                  </TableRow>
                ) : (
                  faixasRevenda.map((f) => (
                    <TableRow key={f.id} className="border-b border-zinc-800 hover:bg-zinc-900/20">
                      <TableCell className="font-semibold text-white">{formatCurrency(f.valor_minimo)}</TableCell>
                      <TableCell className="text-zinc-300">{formatCurrency(f.valor_maximo)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[#c59b5f]/15 text-[#c59b5f] border border-[#c59b5f]/20">
                          +{f.percentual}% OFF Extra
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => { setSelectedFaixa(f); setModalOpen(true); }}
                          disabled={isSaving}
                          className="hover:bg-zinc-800 hover:text-white"
                        >
                          <Edit className="w-4 h-4 text-zinc-400" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(f.id)}
                          disabled={isSaving}
                          className="hover:bg-red-950/30 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 text-red-500/80" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Guia Gatilho & Regras */}
        <TabsContent value="parametros" className="space-y-4 mt-6 focus-visible:outline-none">
          <div className="max-w-2xl border border-[#c59b5f]/20 rounded-2xl bg-gradient-to-br from-[#161616] to-[#121212] p-6 shadow-md border-l-4 border-l-[#c59b5f]">
            <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-1.5 font-sans">
              Gatilho de Upgrade Automático
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Determine o valor mínimo no carrinho de uma cliente de varejo comum para acionar a conversão automática para o status de Revenda (com preços de atacado direto de fábrica e benefícios exclusivos).
            </p>

            <form onSubmit={handleSaveUpgradeLimit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="limiteUpgrade" className="text-xs font-bold text-zinc-300">
                  Valor Limite para Upgrade (R$)
                </Label>
                <div className="relative max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-550 font-bold text-sm">
                    R$
                  </div>
                  <Input 
                    id="limiteUpgrade"
                    type="number"
                    step="0.01"
                    min="1"
                    value={limiteUpgrade}
                    onChange={(e) => setLimiteUpgrade(e.target.value)}
                    required
                    className="pl-10 font-bold border-zinc-800 bg-zinc-900 text-white focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f]"
                  />
                </div>
                <p className="text-[10px] text-zinc-500 font-light">
                  Configuração recomendada: <strong>R$ 400,00</strong>. Ao atingir esse marco na sacola, a cliente visualiza o brinde Rose Gold de upgrade.
                </p>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={isSaving} 
                  className="bg-[#c59b5f] hover:bg-[#c59b5f]/90 text-black font-bold px-6 py-2.5 rounded-lg transition-colors"
                >
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>

      <FaixaDescontoModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
        faixa={selectedFaixa} 
        onSave={handleSaveFaixa}
        allFaixas={currentFaixas}
      />
    </div>
  );
}