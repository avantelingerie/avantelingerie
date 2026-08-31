import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Check, X, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export default function CategoriasManager() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nome: '', slug: '', ativo: true, ncm: '', video_capa: '' });

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const records = await pb.collection('categorias').getFullList({ sort: '-created', $autoCancel: false });
      setCategorias(records);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Erro ao carregar categorias');
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

  const guessNcm = (nome) => {
    const text = nome.toLowerCase();
    if (text.includes('suti') || text.includes('conjunt') || text.includes('corpet')) return '6212.10.00';
    if (text.includes('calcinha') || text.includes('cinta') || text.includes('fio')) return '6212.20.00';
    if (text.includes('pijama') || text.includes('camisola') || text.includes('baby') || text.includes('robe') || text.includes('short doll')) return '6208.21.00';
    if (text.includes('praia') || text.includes('biquini') || text.includes('maiô') || text.includes('maio')) return '6112.41.00';
    if (text.includes('body')) return '6114.30.00';
    return '6109.90.00'; // Default vestuário íntimo/genérico
  };

  const handleFieldChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    if (field === 'nome' && isAdding) {
      updated.slug = generateSlug(value);
      updated.ncm = guessNcm(value);
    }
    setFormData(updated);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({ nome: '', slug: '', ativo: true, ncm: '', video_capa: '' });
    setEditingId(null);
  };

  const handleEditClick = (cat) => {
    setEditingId(cat.id);
    setFormData({
      nome: cat.nome,
      slug: cat.slug,
      ativo: cat.ativo,
      ncm: cat.ncm || guessNcm(cat.nome)
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

    const payload = { ...formData };
    if (!payload.ncm) {
      payload.ncm = guessNcm(payload.nome);
    }

    try {
      if (isAdding) {
        await pb.collection('categorias').create(payload, { $autoCancel: false });
        toast.success(`Categoria criada com sucesso! NCM: ${payload.ncm}`);
      } else {
        await pb.collection('categorias').update(editingId, payload, { $autoCancel: false });
        toast.success(`Categoria atualizada com sucesso! NCM: ${payload.ncm}`);
      }
      setIsAdding(false);
      setEditingId(null);
      // Pequeno delay para garantir que o PocketBase registrou a alteração antes de buscar
      setTimeout(() => {
        fetchCategorias();
      }, 300);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Erro ao salvar. Verifique se o nome/slug já existe.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta categoria? Certifique-se que não há produtos vinculados.')) return;
    try {
      await pb.collection('categorias').delete(id, { $autoCancel: false });
      toast.success('Categoria excluída com sucesso');
      fetchCategorias();
    } catch (error) {
      toast.error('Erro ao excluir. Pode haver produtos vinculados.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground mt-1">Organize seus produtos por seções.</p>
        </div>
        <Button onClick={handleAddClick} disabled={isAdding || editingId} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Nova Categoria
        </Button>
      </div>

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium w-1/5">Nome da Categoria</th>
                <th className="px-6 py-4 font-medium w-1/5">URL (Slug)</th>
                <th className="px-6 py-4 font-medium w-1/5">URL do Vídeo</th>
                <th className="px-6 py-4 font-medium w-32">NCM (Fiscal)</th>
                <th className="px-6 py-4 font-medium w-24">Status</th>
                <th className="px-6 py-4 font-medium text-right w-24">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && !isAdding && !editingId ? (
                Array(3).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-12 rounded-full" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-16 ml-auto" /></td>
                  </tr>
                ))
              ) : categorias.length === 0 && !isAdding ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
                    <Tag className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p>Nenhuma categoria cadastrada.</p>
                  </td>
                </tr>
              ) : null}

              {isAdding && (
                <tr className="bg-primary/5">
                  <td className="px-4 py-3"><Input value={formData.nome} onChange={(e) => handleFieldChange('nome', e.target.value)} placeholder="Ex: Lingerie Renda" className="h-9" /></td>
                  <td className="px-4 py-3"><Input value={formData.slug} onChange={(e) => handleFieldChange('slug', e.target.value)} placeholder="lingerie-renda" className="h-9" /></td>
                  <td className="px-4 py-3"><Input value={formData.video_capa} onChange={(e) => handleFieldChange('video_capa', e.target.value)} placeholder="URL do MP4" className="h-9" /></td>
                  <td className="px-4 py-3"><Input value={formData.ncm} onChange={(e) => handleFieldChange('ncm', e.target.value)} placeholder="Auto" className="h-9 font-mono" /></td>
                  <td className="px-4 py-3"><Switch checked={formData.ativo} onCheckedChange={(c) => handleFieldChange('ativo', c)} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={handleSave} className="text-green-600 h-8 w-8"><Check className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={handleCancel} className="text-red-600 h-8 w-8"><X className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              )}

              {categorias.map(cat => (
                editingId === cat.id ? (
                  <tr key={cat.id} className="bg-muted/30">
                    <td className="px-4 py-3"><Input value={formData.nome} onChange={(e) => handleFieldChange('nome', e.target.value)} className="h-9" /></td>
                    <td className="px-4 py-3"><Input value={formData.slug} onChange={(e) => handleFieldChange('slug', e.target.value)} className="h-9" /></td>
                    <td className="px-4 py-3"><Input value={formData.video_capa || ''} onChange={(e) => handleFieldChange('video_capa', e.target.value)} placeholder="URL do MP4" className="h-9" /></td>
                    <td className="px-4 py-3"><Input value={formData.ncm} onChange={(e) => handleFieldChange('ncm', e.target.value)} className="h-9 font-mono" /></td>
                    <td className="px-4 py-3"><Switch checked={formData.ativo} onCheckedChange={(c) => handleFieldChange('ativo', c)} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={handleSave} className="text-green-600 h-8 w-8"><Check className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={handleCancel} className="text-red-600 h-8 w-8"><X className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={cat.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 font-medium">{cat.nome}</td>
                    <td className="px-4 py-4 font-mono text-sm text-muted-foreground">{cat.slug}</td>
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground overflow-hidden max-w-[150px] truncate" title={cat.video_capa}>{cat.video_capa ? 'Tem vídeo' : '-'}</td>
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{cat.ncm || <span className="text-orange-400">Pendente</span>}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cat.ativo ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}`}>
                        {cat.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEditClick(cat)} disabled={isAdding || editingId} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(cat.id)} disabled={isAdding || editingId} className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
