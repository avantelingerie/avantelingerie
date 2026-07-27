import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Copy, Trash2, MoreVertical, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

export default function ProdutosListagem() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProdutos();
  }, [page, searchTerm, filterCategory]);

  const fetchCategorias = async () => {
    try {
      const records = await pb.collection('categorias').getFullList({ sort: 'nome', $autoCancel: false });
      setCategorias(records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const filterRules = [];
      if (searchTerm) filterRules.push(`name ~ "${searchTerm}"`);
      if (filterCategory) filterRules.push(`categoria_id = "${filterCategory}"`);
      
      const filterString = filterRules.length > 0 ? filterRules.join(' && ') : '';

      const result = await pb.collection('products').getList(page, 10, {
        sort: '-created',
        filter: filterString,
        expand: 'categoria_id',
        $autoCancel: false
      });

      setProdutos(result.items);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const getProductImage = (record, filename) => {
    if (!filename) return '';
    if (typeof filename === 'string' && (filename.startsWith('http://') || filename.startsWith('https://') || filename.startsWith('data:'))) {
      return filename;
    }
    try {
      return pb.files.getUrl(record, filename);
    } catch (err) {
      return '';
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    setUpdatingStatusId(id);
    try {
      await pb.collection('products').update(id, { status: currentStatus }, { $autoCancel: false });
      
      setProdutos(prev => prev.map(p => 
        p.id === id ? { ...p, status: currentStatus } : p
      ));
      
      toast.success(`Produto ${currentStatus ? 'ativado' : 'desativado'} com sucesso`);
    } catch (e) {
      console.error('Error updating status:', e);
      toast.error('Erro ao atualizar status do produto');
      fetchProdutos();
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDuplicate = async (produto) => {
    try {
      const copy = { ...produto };
      delete copy.id;
      delete copy.created;
      delete copy.updated;
      copy.name = `${copy.name} (Cópia)`;
      
      await pb.collection('products').create(copy, { $autoCancel: false });
      toast.success('Produto duplicado com sucesso');
      fetchProdutos();
    } catch (e) {
      toast.error('Erro ao duplicar produto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) return;
    
    try {
      // 1. Fetch all variations for this product
      const relatedVariacoes = await pb.collection('variacoes').getFullList({
        filter: `produto_id="${id}"`,
        $autoCancel: false
      });

      // 2. Delete all related stock movements first to avoid key constraint violations
      for (const v of relatedVariacoes) {
        try {
          const movements = await pb.collection('movimentacoes_estoque').getFullList({
            filter: `variacao_id="${v.id}"`,
            $autoCancel: false
          });
          for (const m of movements) {
            await pb.collection('movimentacoes_estoque').delete(m.id, { $autoCancel: false });
          }
        } catch (err) {
          console.error("Error deleting stock movements for variation:", v.id, err);
        }
      }
      
      // 3. Delete all variations
      for (const v of relatedVariacoes) {
        await pb.collection('variacoes').delete(v.id, { $autoCancel: false });
      }
      
      // 4. Delete the product itself
      await pb.collection('products').delete(id, { $autoCancel: false });
      
      toast.success('Produto excluído com sucesso');
      fetchProdutos();
    } catch (e) {
      console.error('Error deleting product:', e);
      toast.error('Erro ao excluir produto. Verifique se há conexões ativas.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground mt-1">Gerencie o catálogo de produtos da loja.</p>
        </div>
        <Button onClick={() => navigate('/admin/produtos/novo')} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>

      <div className="bg-card p-4 rounded-xl border flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome ou SKU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
          <select 
            className="flex h-10 w-full sm:w-[200px] items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Todas Categorias</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b text-muted-foreground uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Produto</th>
                <th className="px-6 py-4 font-medium">Categoria</th>
                <th className="px-6 py-4 font-medium">Preço</th>
                <th className="px-6 py-4 font-medium">Estoque</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="flex gap-3 items-center"><Skeleton className="w-10 h-10 rounded-md" /><Skeleton className="h-4 w-40" /></div></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-12" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-10 rounded-full" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></td>
                  </tr>
                ))
              ) : produtos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p>Nenhum produto encontrado.</p>
                  </td>
                </tr>
              ) : (
                produtos.map((produto) => (
                  <tr key={produto.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                          {produto.imagem_principal || (produto.gallery && produto.gallery[0]) ? (
                            <img src={getProductImage(produto, produto.imagem_principal || produto.gallery[0])} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{produto.name}</p>
                          <p className="text-xs text-muted-foreground font-mono mt-0.5">{produto.reference || produto.id.substring(0,8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-secondary text-secondary-foreground">
                        {produto.expand?.categoria_id?.nome || 'Sem Categoria'}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">{formatPrice(produto.price)}</span>
                        {produto.price_wholesale > 0 && <span className="text-xs text-muted-foreground line-through">{formatPrice(produto.price_wholesale)}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`font-medium ${produto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {produto.stock || 0} un
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={produto.status !== false}
                          onCheckedChange={(c) => handleToggleStatus(produto.id, c)} 
                          disabled={updatingStatusId === produto.id}
                        />
                        {updatingStatusId === produto.id && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem onClick={() => navigate(`/admin/produtos/${produto.id}/editar`)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(produto)}>
                            <Copy className="mr-2 h-4 w-4" /> Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(produto.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between bg-muted/20">
            <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Anterior</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Próxima</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}