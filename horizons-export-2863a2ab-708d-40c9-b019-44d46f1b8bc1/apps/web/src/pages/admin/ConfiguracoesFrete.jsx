import React, { useState, useEffect } from 'react';
import { Truck, Plus, Edit, Trash2, GripVertical, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function ConfiguracoesFrete() {
  const [rules, setRules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    tipo: 'nacional',
    cep_inicio: '',
    cep_fim: '',
    cidade: '',
    estado: '',
    valor_minimo: 0,
    prioridade: 1,
    ativo: true
  });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const res = await apiServerClient.fetch('/configuracoes/frete');
      if (res.ok) {
        const data = await res.json();
        setRules(data || []);
      }
    } catch (error) {
      console.error('Erro ao buscar regras de frete:', error);
      toast.error('Não foi possível carregar as regras de frete.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (rule = null) => {
    if (rule) {
      setEditingId(rule.id);
      setFormData({
        tipo: rule.tipo || 'nacional',
        cep_inicio: rule.cep_inicio || '',
        cep_fim: rule.cep_fim || '',
        cidade: rule.cidade || '',
        estado: rule.estado || '',
        valor_minimo: rule.valor_minimo || 0,
        prioridade: rule.prioridade || 1,
        ativo: rule.ativo !== false
      });
    } else {
      setEditingId(null);
      setFormData({
        tipo: 'nacional',
        cep_inicio: '',
        cep_fim: '',
        cidade: '',
        estado: '',
        valor_minimo: 0,
        prioridade: rules.length + 1,
        ativo: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const url = editingId ? `/configuracoes/frete/${editingId}` : '/configuracoes/frete';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await apiServerClient.fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Falha ao salvar regra');
      
      toast.success(`Regra ${editingId ? 'atualizada' : 'criada'} com sucesso!`);
      setIsModalOpen(false);
      fetchRules();
    } catch (error) {
      toast.error('Erro ao salvar regra de frete.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta regra?')) return;
    try {
      const res = await apiServerClient.fetch(`/configuracoes/frete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao excluir');
      toast.success('Regra excluída com sucesso!');
      fetchRules();
    } catch (error) {
      toast.error('Erro ao excluir regra.');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await apiServerClient.fetch(`/configuracoes/frete/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ativo: !currentStatus })
      });
      if (!res.ok) throw new Error('Falha ao atualizar status');
      fetchRules();
    } catch (error) {
      toast.error('Erro ao atualizar status da regra.');
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const getRegiaoText = (rule) => {
    switch (rule.tipo) {
      case 'nacional': return 'Todo o Brasil';
      case 'estado': return `Estado: ${rule.estado}`;
      case 'cidade': return `Cidade: ${rule.cidade} - ${rule.estado}`;
      case 'cep': return `CEP: ${rule.cep_inicio} até ${rule.cep_fim}`;
      default: return 'Não definido';
    }
  };

  const hasNacional = rules.some(r => r.tipo === 'nacional' && r.ativo);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Truck className="w-8 h-8 text-primary" />
            Regras de Frete Grátis
          </h1>
          <p className="text-muted-foreground mt-2">Configure condições para oferecer frete grátis aos seus clientes.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="shrink-0">
          <Plus className="w-4 h-4 mr-2" /> Nova Regra
        </Button>
      </div>

      {!hasNacional && !isLoading && rules.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-lg text-sm">
          <strong>Aviso:</strong> Você não possui uma regra "Nacional" ativa. Clientes de regiões não cobertas pelas regras específicas não terão opção de frete grátis.
        </div>
      )}

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Região</TableHead>
              <TableHead>Valor Mínimo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" /></TableCell>
              </TableRow>
            ) : rules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">Nenhuma regra de frete configurada.</TableCell>
              </TableRow>
            ) : (
              rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell><GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" /></TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{rule.tipo}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{getRegiaoText(rule)}</TableCell>
                  <TableCell>{formatCurrency(rule.valor_minimo)}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={rule.ativo} 
                      onCheckedChange={() => handleToggleStatus(rule.id, rule.ativo)} 
                    />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenModal(rule)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(rule.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Regra de Frete' : 'Nova Regra de Frete'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Regra</Label>
              <Select value={formData.tipo} onValueChange={v => setFormData({...formData, tipo: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nacional">Nacional (Todo o Brasil)</SelectItem>
                  <SelectItem value="estado">Por Estado (UF)</SelectItem>
                  <SelectItem value="cidade">Por Cidade</SelectItem>
                  <SelectItem value="cep">Por Faixa de CEP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.tipo === 'estado' && (
              <div className="space-y-2">
                <Label>Estado (UF)</Label>
                <Input 
                  value={formData.estado} 
                  onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})} 
                  placeholder="Ex: SP" 
                  maxLength={2}
                  required
                />
              </div>
            )}

            {formData.tipo === 'cidade' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Cidade</Label>
                  <Input 
                    value={formData.cidade} 
                    onChange={e => setFormData({...formData, cidade: e.target.value})} 
                    placeholder="Ex: São Paulo" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado (UF)</Label>
                  <Input 
                    value={formData.estado} 
                    onChange={e => setFormData({...formData, estado: e.target.value.toUpperCase()})} 
                    placeholder="SP" 
                    maxLength={2}
                    required
                  />
                </div>
              </div>
            )}

            {formData.tipo === 'cep' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CEP Inicial</Label>
                  <Input 
                    value={formData.cep_inicio} 
                    onChange={e => setFormData({...formData, cep_inicio: e.target.value})} 
                    placeholder="00000-000" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>CEP Final</Label>
                  <Input 
                    value={formData.cep_fim} 
                    onChange={e => setFormData({...formData, cep_fim: e.target.value})} 
                    placeholder="99999-999" 
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Valor Mínimo do Pedido (R$)</Label>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  value={formData.valor_minimo} 
                  onChange={e => setFormData({...formData, valor_minimo: parseFloat(e.target.value)})} 
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Prioridade (Menor = Mais importante)</Label>
                <Input 
                  type="number" 
                  min="1"
                  value={formData.prioridade} 
                  onChange={e => setFormData({...formData, prioridade: parseInt(e.target.value)})} 
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label className="cursor-pointer">Regra Ativa</Label>
              <Switch 
                checked={formData.ativo} 
                onCheckedChange={c => setFormData({...formData, ativo: c})} 
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Salvar Regra
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}