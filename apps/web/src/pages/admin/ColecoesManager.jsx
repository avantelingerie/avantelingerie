import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export default function ColecoesManager() {
  const [colecoes, setColecoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nome: '', slug: '', ativo: true, imagem_capa: null });

  useEffect(() => {
    fetchColecoes();
  }, []);

  const fetchColecoes = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('colecoes').getFullList({ sort: '-created', $autoCancel: false });
      setColecoes(records);
    } catch (error) {
      console.error('Error fetching colecoes:', error);
      toast.error('Erro ao carregar colecoes');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text) => {
    return text.toString().toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ç]/g, "c")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };
  const handleFieldChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (field === 'nome' && isAdding) {
      updated.slug = generateSlug(value);
    }
    setFormData(updated);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({ nome: '', slug: '', ativo: true, imagem_capa: null });
    setEditingId(null);
  };

  const handleEditClick = (col) => {
    setEditingId(col.id);
    setFormData({
      nome: col.nome,
      slug: col.slug,
      ativo: col.ativo,
      imagem_capa: null
    });
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.slug) {
      toast.error('Nome e Slug são obrigatórios');
      return;
    }

    const payload = new FormData();
    payload.append('nome', formData.nome);
    payload.append('slug', formData.slug);
    payload.append('ativo', formData.ativo);
    
    if (formData.imagem_capa) {
      payload.append('imagem_capa', formData.imagem_capa);
    }

    try {
      if (isAdding) {
        await pb.collection('colecoes').create(payload);
        toast.success('Coleção criada com sucesso!');
      } else {
        await pb.collection('colecoes').update(editingId, payload);
        toast.success('Coleção atualizada!');
      }
      handleCancel();
      fetchColecoes();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Erro ao salvar. Verifique se o nome/slug já existe.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta Coleção? Os produtos associados a ela não terão mais essa coleção.')) {
      try {
        await pb.collection('colecoes').delete(id);
        toast.success('Coleção excluída');
        fetchColecoes();
      } catch (error) {
        toast.error('Erro ao excluir. Pode haver produtos vinculados.');
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coleções</h1>
          <p className="text-gray-400">Gerencie as coleções de produtos que aparecem na home</p>
        </div>
        <Button onClick={handleAddClick} disabled={isAdding || editingId} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Nova Colecao
        </Button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-[#121212] border border-[#c59b5f]/25 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-white mb-6">
            {isAdding ? 'Criar Nova Coleção' : 'Editar Coleção'}
          </h2>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nome da Coleção</label>
                <Input 
                  value={formData.nome} 
                  onChange={(e) => handleFieldChange('nome', e.target.value)} 
                  placeholder="Ex: Lançamentos de Inverno" 
                  className="bg-[#121212] border border-[#c59b5f]/25 text-white focus:border-[#c59b5f] focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Slug (URL amigável)</label>
                <Input 
                  value={formData.slug} 
                  onChange={(e) => handleFieldChange('slug', e.target.value)} 
                  placeholder="ex-lancamentos-inverno" 
                  className="bg-[#121212] border border-[#c59b5f]/25 text-white focus:border-[#c59b5f] focus-visible:ring-0"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#121212]/50 p-4 rounded-xl border border-[#c59b5f]/25">
              <Switch 
                checked={formData.ativo} 
                onCheckedChange={(val) => handleFieldChange('ativo', val)} 
                className="data-[state=checked]:bg-green-500"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Coleção Ativa</span>
                <span className="text-xs text-gray-500">Se ativo, será exibida na vitrine principal da loja.</span>
              </div>
            </div>

            <div className="space-y-2 bg-[#121212]/50 p-4 rounded-xl border border-[#c59b5f]/25">
              <label className="text-sm font-bold text-white block">Imagem de Capa (Opcional)</label>
              <span className="text-xs text-gray-500 block mb-2">Recomendado formato quadrado (ex: 800x800). Se não enviar, a vitrine exibirá uma imagem premium genérica.</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFieldChange('imagem_capa', e.target.files[0]);
                  }
                }}
                className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#c59b5f]/10 file:text-[#c59b5f] hover:file:bg-[#c59b5f]/20 cursor-pointer"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button onClick={handleCancel} variant="outline" className="border-[#c59b5f]/25 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl">
                Cancelar
              </Button>
              <Button onClick={handleSave} className="bg-[#c59b5f] hover:bg-[#b3864b] text-black font-bold rounded-xl">
                <Check className="w-4 h-4 mr-2" /> Salvar Coleção
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : colecoes.length === 0 ? (
            <div className="text-center py-12 bg-[#121212] rounded-2xl border border-[#c59b5f]/25 text-gray-500">
              Nenhuma coleção cadastrada.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {colecoes.map((col) => (
                <div key={col.id} className="bg-[#121212] border border-[#c59b5f]/25 rounded-2xl p-5 hover:border-[#c59b5f]/50 transition-colors group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#121212] flex items-center justify-center text-[#c59b5f]">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">{col.nome}</h3>
                        <p className="text-gray-500 text-sm">/{col.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditClick(col)} className="p-2 bg-[#121212] rounded-lg text-gray-400 hover:text-[#c59b5f] hover:bg-[#c59b5f]/10 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(col.id)} className="p-2 bg-[#121212] rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${col.ativo ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
                      {col.ativo ? 'ATIVA' : 'INATIVA'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
