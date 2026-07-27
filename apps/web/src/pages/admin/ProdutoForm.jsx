import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, X, Plus, Trash2, Loader2, Image as ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from '@/components/ui/dialog.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';
import apiServerClient from '@/lib/apiServerClient.js';
import VariacoesTable from '@/components/admin/VariacoesTable.jsx';

export default function ProdutoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [categorias, setCategorias] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    categoria_id: '',
    status: true,
    price: '',
    price_wholesale: '',
    peso_g: '',
    altura_cm: '',
    largura_cm: '',
    comprimento_cm: '',
    desc_geral: '',
    desc_tecido: '',
    desc_modelagem: '',
    desc_cuidados: '',
    desc_diferenciais: '',
    desc_compra_segura: '',
    reference: '',
    is_novidade: false,
    is_promocao: false,
    is_mais_vendido: false,
    is_favorito: false,
    video_url: ''
  });

  const [images, setImages] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState('');
  const [imagemVerso, setImagemVerso] = useState('');
  const [activeDescTab, setActiveDescTab] = useState('desc_geral');
  const [variacoes, setVariacoes] = useState([]);
  const [originalVariacoes, setOriginalVariacoes] = useState([]);

  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiEstilo, setAiEstilo] = useState('conforto');
  const [aiTecido, setAiTecido] = useState('microfibra');
  const [aiDestaques, setAiDestaques] = useState([]);

  const estilosList = [
    { value: 'conforto', label: 'Conforto / Dia a Dia' },
    { value: 'sensual', label: 'Sensual / Ousado' },
    { value: 'romantico', label: 'Romântico / Delicado' },
    { value: 'luxo', label: 'Luxo / Sofisticado' },
    { value: 'fitness', label: 'Fitness / Esportivo' },
    { value: 'pijama', label: 'Pijama / Loungewear' },
    { value: 'cropped', label: 'Cropped / Outwear' },
    { value: 'modelador', label: 'Modelador / Cinta' }
  ];

  const tecidosList = [
    { value: 'microfibra', label: 'Microfibra' },
    { value: 'renda', label: 'Renda' },
    { value: 'algodao', label: 'Algodão' },
    { value: 'tule', label: 'Tule' },
    { value: 'cetim', label: 'Cetim' },
    { value: 'veludo', label: 'Veludo' }
  ];

  const destaquesList = [
    { value: 'sem-costura', label: 'Sem costura' },
    { value: 'alcas-regulaveis', label: 'Alças reguláveis' },
    { value: 'bojo-removivel', label: 'Bojo removível' },
    { value: 'duplo-forro', label: 'Duplo forro no busto' },
    { value: 'sustentacao-reforcada', label: 'Sustentação reforçada' },
    { value: 'hipoalergenico', label: 'Forro 100% Algodão Hipoalergênico' }
  ];

  useEffect(() => {
    fetchCategorias();
    if (isEdit) {
      fetchProduto();
    }
  }, [id]);

  const fetchCategorias = async () => {
    try {
      const records = await pb.collection('categorias').getFullList({ sort: 'nome', $autoCancel: false });
      setCategorias(records);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Erro ao buscar categorias. Verifique a conexão com o banco.');
    }
  };

  const fetchProduto = async () => {
    try {
      const record = await pb.collection('products').getOne(id, { $autoCancel: false });
      setFormData({
        name: record.name || '',
        categoria_id: record.categoria_id || '',
        status: record.status !== false,
        price: record.price || '',
        price_wholesale: record.price_wholesale || '',
        peso_g: record.peso_g || '',
        altura_cm: record.altura_cm || '',
        largura_cm: record.largura_cm || '',
        comprimento_cm: record.comprimento_cm || '',
        desc_geral: record.desc_geral || '',
        desc_tecido: record.desc_tecido || '',
        desc_modelagem: record.desc_modelagem || '',
        desc_cuidados: record.desc_cuidados || '',
        desc_diferenciais: record.desc_diferenciais || '',
        desc_compra_segura: record.desc_compra_segura || '',
        reference: record.reference || '',
        is_novidade: !!record.is_novidade,
        is_promocao: !!record.is_promocao,
        is_mais_vendido: !!record.is_mais_vendido,
        is_favorito: !!record.is_favorito,
        video_url: record.video_url || ''
      });

      const getFilenameFromUrl = (urlOrFilename) => {
        if (!urlOrFilename) return '';
        if (urlOrFilename.includes('/')) {
          const parts = urlOrFilename.split('/');
          return parts[parts.length - 1];
        }
        return urlOrFilename;
      };

      const existingLabels = record.gallery_labels ? (typeof record.gallery_labels === 'string' ? JSON.parse(record.gallery_labels) : record.gallery_labels) : [];

      const existingImages = (record.gallery || []).map((url, idx) => {
        const filename = getFilenameFromUrl(url);
        const fullUrl = url.startsWith('http') ? url : pb.files.getUrl(record, filename);
        return {
          isNew: false,
          url: fullUrl,
          id: filename,
          filename: filename,
          label: existingLabels[idx] || ''
        };
      });
      
      setImages(existingImages);
      setImagemPrincipal(record.imagem_principal || '');
      setImagemVerso(record.imagem_verso || '');

      const vars = await pb.collection('variacoes').getFullList({ filter: `produto_id="${id}"`, $autoCancel: false });
      setVariacoes(vars);
      setOriginalVariacoes(vars);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !isEdit && !prev.reference) {
        updated.reference = generateReference(value);
      }
      return updated;
    });
  };

  const generateReference = (name) => {
    if (!name) return '';
    const cleanName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, '')
      .trim();
    
    const words = cleanName.split(/\s+/);
    let prefix = 'AVL';
    if (words.length > 0 && words[0].length >= 3) {
      prefix = `AVL-${words[0].substring(0, 3)}`;
    }
    const randNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${randNum}`;
  };

  const triggerAutoReference = () => {
    const newRef = generateReference(formData.name || 'AVL');
    handleInputChange('reference', newRef);
    toast.success(`Nova referência gerada: ${newRef}`);
  };

  const handleGenerateAI = async () => {
    if (!formData.name) {
      toast.error('Insira o nome do produto antes de gerar as descrições.');
      return;
    }

    setAiLoading(true);
    try {
      const selectedCategoryObj = categorias.find(c => c.id === formData.categoria_id);
      const categoryName = selectedCategoryObj ? selectedCategoryObj.nome : 'Lingerie';

      const activeDestaques = destaquesList
        .filter(d => aiDestaques.includes(d.value))
        .map(d => d.label);

      const response = await apiServerClient.fetch('/integracoes/gemini/gerar-descricao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          categoryName,
          estilo: aiEstilo,
          tecido: aiTecido,
          destaques: activeDestaques
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.mensagem || 'Falha ao se conectar com a API do Gemini');
      }

      const resData = await response.json();
      
      if (!resData.sucesso || !resData.dados) {
        throw new Error(resData.mensagem || 'Nenhum dado gerado pelo Gemini');
      }

      const parsedData = resData.dados;

      setFormData(prev => ({
        ...prev,
        desc_geral: parsedData.desc_geral || '',
        desc_tecido: parsedData.desc_tecido || '',
        desc_modelagem: parsedData.desc_modelagem || '',
        desc_cuidados: parsedData.desc_cuidados || '',
        desc_diferenciais: parsedData.desc_diferenciais || '',
        desc_compra_segura: parsedData.desc_compra_segura || ''
      }));

      toast.success('Descrições geradas com sucesso via Gemini AI! ✨');
      setShowAIAssistant(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Erro ao gerar descrições com a IA.');
    } finally {
      setAiLoading(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      // Robustamente identifica vídeos pela extensão ou MIME type (alguns OS enviam MIME vazio)
      const isVideo = (file.type && file.type.startsWith('video/')) || (file.name && file.name.match(/\.(mp4|webm|mov|avi|mkv)$/i));
      
      // Se não for imagem (ex: svg, video) ou tiver tipo desconhecido não-imagem, devolve o original sem travar o navegador tentando converter em Base64 gigante
      if (isVideo || file.type === 'image/svg+xml' || (!file.type.startsWith('image/') && file.type !== '')) {
        resolve(file);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const newFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(newFile);
          }, 'image/jpeg', 0.85); // 85% de qualidade
        };
        img.onerror = () => resolve(file); // se der erro, envia original
      };
      reader.onerror = () => resolve(file);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validação de tamanho: limite de 30MB (30 * 1024 * 1024 bytes)
    const MAX_SIZE = 30 * 1024 * 1024;
    const oversizedFiles = files.filter(f => f.size > MAX_SIZE);
    
    if (oversizedFiles.length > 0) {
      toast.error('O limite de tamanho por arquivo é de 30MB. Alguns arquivos foram ignorados devido ao tamanho excedido.');
    }
    
    const validFiles = files.filter(f => f.size <= MAX_SIZE);
    if (validFiles.length === 0) return;

    // Comprime as imagens antes de subir
    const compressedFiles = await Promise.all(validFiles.map(file => compressImage(file)));


    const newImages = compressedFiles.map((file, i) => {
      const previewUrl = URL.createObjectURL(file);
      return {
        isNew: true,
        file: file,
        id: `new-${Date.now()}-${i}`,
        previewUrl: previewUrl,
        url: previewUrl,
        label: ''
      };
    });

    setImages(prev => {
      const updated = [...prev, ...newImages];
      if (!imagemPrincipal && updated.length > 0) {
        setImagemPrincipal(updated[0].id);
      }
      return updated;
    });
  };

  const handleRemoveImage = (index) => {
    const imgToRemove = images[index];
    const imgKey = imgToRemove.isNew ? imgToRemove.id : imgToRemove.filename;
    setImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      if (imagemPrincipal === imgKey) {
        const firstKey = updated.length > 0
          ? (updated[0].isNew ? updated[0].id : updated[0].filename)
          : '';
        setImagemPrincipal(firstKey);
      }
      if (imagemVerso === imgKey) {
        setImagemVerso('');
      }
      return updated;
    });
  };

  const handleImageLabelChange = (index, value) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, label: value } : img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pb.authStore.isValid) {
      toast.error('Sua sessão expirou. Por favor, atualize a página e faça login novamente.');
      return;
    }

    if (!formData.name) {
      toast.error('O nome do produto é obrigatório.');
      return;
    }
    if (!formData.price) {
      toast.error('O preço de varejo é obrigatório.');
      return;
    }

    const toastId = toast.loading('Iniciando salvamento do produto...');
    setSaving(true);
    try {
      const pbFormData = new FormData();
      
      pbFormData.append('name', formData.name);
      pbFormData.append('categoria_id', formData.categoria_id);
      pbFormData.append('status', formData.status);
      pbFormData.append('price', parseFloat(formData.price));
      
      if (formData.price_wholesale) pbFormData.append('price_wholesale', parseFloat(formData.price_wholesale));
      if (formData.peso_g) pbFormData.append('peso_g', parseFloat(formData.peso_g));
      if (formData.altura_cm) pbFormData.append('altura_cm', parseFloat(formData.altura_cm));
      if (formData.largura_cm) pbFormData.append('largura_cm', parseFloat(formData.largura_cm));
      if (formData.comprimento_cm) pbFormData.append('comprimento_cm', parseFloat(formData.comprimento_cm));
      
      pbFormData.append('desc_geral', formData.desc_geral);
      pbFormData.append('desc_tecido', formData.desc_tecido);
      pbFormData.append('desc_modelagem', formData.desc_modelagem);
      pbFormData.append('desc_cuidados', formData.desc_cuidados);
      pbFormData.append('desc_diferenciais', formData.desc_diferenciais);
      pbFormData.append('desc_compra_segura', formData.desc_compra_segura);
      pbFormData.append('reference', formData.reference);
      
      pbFormData.append('is_novidade', formData.is_novidade);
      pbFormData.append('is_promocao', formData.is_promocao);
      pbFormData.append('is_mais_vendido', formData.is_mais_vendido);
      pbFormData.append('is_favorito', formData.is_favorito);
      pbFormData.append('video_url', formData.video_url);
      
      const totalStock = variacoes.reduce((acc, curr) => acc + (parseInt(curr.estoque) || 0), 0);
      pbFormData.append('stock', totalStock);

      const existingFilenames = [];
      images.forEach(img => {
        if (img.isNew && img.file) {
          pbFormData.append('image', img.file);
        } else if (!img.isNew && img.filename) {
          existingFilenames.push(img.filename);
        }
      });

      toast.loading('Enviando dados e mídias para o servidor (Isso pode levar alguns minutos dependendo do tamanho do vídeo e da sua internet)...', { id: toastId });
      let savedProduct;
      
      const pbController = new AbortController();
      const pbTimeoutId = setTimeout(() => pbController.abort(), 60000); // 60 segundos de timeout para o proxy da hospedagem

      try {
        if (isEdit) {
          savedProduct = await pb.collection('products').update(id, pbFormData, { $autoCancel: false, fetch: (url, config) => fetch(url, { ...config, signal: pbController.signal }) });
        } else {
          savedProduct = await pb.collection('products').create(pbFormData, { $autoCancel: false, fetch: (url, config) => fetch(url, { ...config, signal: pbController.signal }) });
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          throw new Error("O servidor (Proxy/WAF) bloqueou ou interrompeu o upload do vídeo silenciosamente. Verifique as restrições da hospedagem.");
        }
        throw err;
      } finally {
        clearTimeout(pbTimeoutId);
      }

      toast.loading('Processando arquivos salvos...', { id: toastId });
      const currentImageFilenames = Array.isArray(savedProduct.image) 
        ? savedProduct.image 
        : (savedProduct.image ? [savedProduct.image] : []);
      
      const newFilenames = currentImageFilenames.filter(f => !existingFilenames.includes(f));

      let newFileCount = 0;
      const allGalleryFilenames = images.map(img => {
        if (img.isNew) {
          const filename = newFilenames[newFileCount] || '';
          newFileCount++;
          return filename;
        }
        return img.filename;
      }).filter(Boolean);

      const mainImageObj = images.find(img => (img.isNew ? img.id : img.filename) === imagemPrincipal);
      let finalMainImageFilename = '';
      if (mainImageObj) {
        if (mainImageObj.isNew) {
          const newImgIndex = images.filter(img => img.isNew).indexOf(mainImageObj);
          finalMainImageFilename = newFilenames[newImgIndex] || '';
        } else {
          finalMainImageFilename = mainImageObj.filename;
        }
      }

      const versoImageObj = images.find(img => (img.isNew ? img.id : img.filename) === imagemVerso);
      let finalVersoImageFilename = '';
      if (versoImageObj) {
        if (versoImageObj.isNew) {
          const newImgIndex = images.filter(img => img.isNew).indexOf(versoImageObj);
          finalVersoImageFilename = newFilenames[newImgIndex] || '';
        } else {
          finalVersoImageFilename = versoImageObj.filename;
        }
      }

      if (!finalMainImageFilename && allGalleryFilenames.length > 0) {
        finalMainImageFilename = allGalleryFilenames[0];
      }

      if (isEdit) {
        const removedVars = originalVariacoes.filter(orig => !variacoes.some(v => v.id === orig.id));
        for (const rem of removedVars) {
          await pb.collection('variacoes').delete(rem.id, { $autoCancel: false });
        }
      }

      const updatedVariacoes = variacoes.map(v => {
        if (!v.imagem_url) return v;
        const imgIndex = images.findIndex(img => img.url === v.imagem_url || img.filename === v.imagem_url || img.id === v.imagem_url);
        if (imgIndex !== -1 && allGalleryFilenames[imgIndex]) {
          return { ...v, imagem_url: allGalleryFilenames[imgIndex] };
        }
        return v;
      });

      toast.loading('Salvando variações do produto...', { id: toastId });
      for (const v of updatedVariacoes) {
        const varData = {
          produto_id: savedProduct.id,
          cor: v.cor,
          tamanho: v.tamanho,
          sku: v.sku,
          estoque: parseInt(v.estoque) || 0,
          preco: v.preco !== undefined ? parseFloat(v.preco) : 0,
          preco_atacado: v.preco_atacado !== undefined ? parseFloat(v.preco_atacado) : 0,
          imagem_url: v.imagem_url || '',
          status: v.status !== undefined ? v.status : true
        };

        if (v.isNew || v.id.startsWith('bulk-')) {
          await pb.collection('variacoes').create(varData, { $autoCancel: false });
        } else {
          await pb.collection('variacoes').update(v.id, varData, { $autoCancel: false });
        }
      }

      const uniqueColors = [...new Set(variacoes.filter(v => v.cor).map(v => v.cor.trim()))];
      const uniqueSizes = [...new Set(variacoes.filter(v => v.tamanho).map(v => v.tamanho.trim()))];
      const allLabels = images.map(img => img.label || '');

      await pb.collection('products').update(savedProduct.id, {
        image: allGalleryFilenames.filter(f => !f.startsWith('http')),
        gallery: allGalleryFilenames,
        imagem_principal: finalMainImageFilename,
        imagem_verso: finalVersoImageFilename,
        gallery_labels: JSON.stringify(allLabels),
        cores_disponiveis: uniqueColors,
        colors: uniqueColors,
        tamanhos_disponiveis: uniqueSizes,
        sizes: uniqueSizes
      }, { $autoCancel: false });

      // Disparar sincronização com o Bling e aguardar resposta
      toast.loading('Sincronizando produto com o Bling (Isso pode levar alguns segundos)...', { id: toastId });
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 segundos de timeout para o Bling
        
        const syncResponse = await apiServerClient.fetch('/bling/produtos/sincronizar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ produto_id: savedProduct.id }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const syncResult = await syncResponse.json();
        if (!syncResponse.ok || !syncResult.sucesso) {
          toast.error(`Aviso (Bling): ${syncResult.erro || 'Falha na sincronização'}`);
        } else {
          toast.success('Produto sincronizado com o Bling!');
        }
      } catch (err) {
        console.error('Erro ao sincronizar produto com Bling:', err);
        if (err.name === 'AbortError') {
          toast.error('Aviso: O Bling demorou muito para responder (Timeout). O produto foi salvo no sistema, mas pode não estar no Bling.');
        } else {
          toast.error('Erro de conexão ao sincronizar com o Bling.');
        }
      }

      toast.success(`Produto ${isEdit ? 'atualizado' : 'criado'} com sucesso!`, { id: toastId });
      navigate('/admin/produtos');
    } catch (error) {
      console.error('Error saving product:', error);
      let errorMsg = error.message;
      if (error.data && error.data.data) {
        const validationErrors = Object.entries(error.data.data).map(([field, err]) => `${field}: ${err.message}`).join(', ');
        if (validationErrors) errorMsg = validationErrors;
      }
      toast.error(`Erro ao salvar produto: ${errorMsg}`, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-[#c59b5f]/10 shadow-sm sticky top-0 z-30 font-sans">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" onClick={() => navigate('/admin/produtos')} className="text-white hover:bg-[#1a1a1a]">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white font-serif">{isEdit ? 'Editar Produto' : 'Novo Produto'}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/produtos')} disabled={saving} className="bg-[#121212] border-[#c59b5f]/25 text-white">
            <X className="w-4 h-4 mr-2" /> Cancelar
          </Button>
          <Button type="submit" disabled={saving} className="bg-[#c59b5f] hover:bg-[#c59b5f]/90 text-black font-bold">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left font-sans">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card p-6 rounded-xl border border-[#c59b5f]/10 shadow-sm space-y-6">
            <h2 className="text-lg font-bold border-b border-[#c59b5f]/20 pb-2 text-white font-serif">Informações Básicas</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">
                  Nome do Produto *
                </label>
                <Input required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Ex: Conjunto Rendado Paris" className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-gray-300">Categoria *</label>
                  <select required className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={formData.categoria_id} onChange={(e) => handleInputChange('categoria_id', e.target.value)}>
                    <option value="">Selecionar Categoria...</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1.5 block text-gray-300 flex items-center justify-between">
                    <span>Referência / Código Interno *</span>
                    <button type="button" onClick={triggerAutoReference} className="text-[10px] text-[#c59b5f] flex items-center gap-1 hover:underline font-bold bg-[#c59b5f]/5 px-2 py-0.5 rounded border border-[#c59b5f]/20">
                      <RefreshCw className="w-2.5 h-2.5" /> Gerar Automático
                    </button>
                  </label>
                  <Input required value={formData.reference} onChange={(e) => handleInputChange('reference', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white font-mono" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#c59b5f]/20 shadow-sm mt-2">
                <div>
                  <h4 className="font-bold text-xs text-white">Status de Exibição</h4>
                  <p className="text-xs text-gray-400">Deixe inativo para esconder o produto na loja.</p>
                </div>
                <Switch checked={formData.status} onCheckedChange={(c) => handleInputChange('status', c)} className="data-[state=checked]:bg-[#c59b5f]" />
              </div>

              <div className="space-y-4 pt-4 border-t border-[#c59b5f]/20">
                <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest">Destaques e Vitrines na Home</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#c59b5f]/20 hover:border-[#c59b5f]/40 transition-all shadow-sm">
                    <div>
                      <h4 className="font-bold text-xs text-white">Lançamentos Recentes</h4>
                    </div>
                    <Switch checked={formData.is_novidade} onCheckedChange={(c) => handleInputChange('is_novidade', c)} className="data-[state=checked]:bg-[#c59b5f]" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#c59b5f]/20 hover:border-[#c59b5f]/40 transition-all shadow-sm">
                    <div>
                      <h4 className="font-bold text-xs text-white">Ofertas Exclusivas</h4>
                    </div>
                    <Switch checked={formData.is_promocao} onCheckedChange={(c) => handleInputChange('is_promocao', c)} className="data-[state=checked]:bg-[#c59b5f]" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#c59b5f]/20 hover:border-[#c59b5f]/40 transition-all shadow-sm">
                    <div>
                      <h4 className="font-bold text-xs text-white">Mais Vendidos da Avante</h4>
                    </div>
                    <Switch checked={formData.is_mais_vendido} onCheckedChange={(c) => handleInputChange('is_mais_vendido', c)} className="data-[state=checked]:bg-[#c59b5f]" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-xl border border-[#c59b5f]/20 hover:border-[#c59b5f]/40 transition-all shadow-sm">
                    <div>
                      <h4 className="font-bold text-xs text-white">Destaques de Ouro</h4>
                    </div>
                    <Switch checked={formData.is_favorito} onCheckedChange={(c) => handleInputChange('is_favorito', c)} className="data-[state=checked]:bg-[#c59b5f]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card p-6 rounded-xl border border-[#c59b5f]/10 shadow-sm space-y-6">
            <h2 className="text-lg font-bold border-b border-[#c59b5f]/20 pb-2 text-white font-serif">Preço e Logística</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Preço de Venda Varejo (R$) *</label>
                <Input required type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Preço de Atacado B2B (R$)</label>
                <Input type="number" step="0.01" value={formData.price_wholesale} onChange={(e) => handleInputChange('price_wholesale', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Peso (g)</label>
                <Input type="number" value={formData.peso_g} onChange={(e) => handleInputChange('peso_g', e.target.value)} placeholder="Ex: 150" className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Altura (cm)</label>
                <Input type="number" value={formData.altura_cm} onChange={(e) => handleInputChange('altura_cm', e.target.value)} placeholder="Ex: 5" className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Largura (cm)</label>
                <Input type="number" value={formData.largura_cm} onChange={(e) => handleInputChange('largura_cm', e.target.value)} placeholder="Ex: 11" className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Profundidade (cm)</label>
                <Input type="number" value={formData.comprimento_cm} onChange={(e) => handleInputChange('comprimento_cm', e.target.value)} placeholder="Ex: 20" className="bg-[#121212] border-[#c59b5f]/20 text-white" />
              </div>
            </div>
          </section>

          <section className="bg-card p-6 rounded-xl border border-[#c59b5f]/10 shadow-sm">
            <VariacoesTable 
              variacoes={variacoes} 
              onChange={setVariacoes} 
              productName={formData.name} 
              productImages={images}
            />
          </section>

          <section className="bg-card p-6 rounded-xl border border-[#c59b5f]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#c59b5f]/20 pb-2 font-sans">
              <h2 className="text-lg font-bold text-white font-serif">Descrições Detalhadas em Abas</h2>
              <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="h-8 border-[#c59b5f]/40 hover:bg-[#c59b5f]/10 text-[#c59b5f] text-xs font-bold gap-1.5 rounded-lg px-3">
                    <Sparkles className="w-3.5 h-3.5" /> Assistente de Descrições IA
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl rounded-2xl bg-[#1a1a1a] border border-[#c59b5f]/30 text-white shadow-2xl p-6">
                  <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="text-xl font-serif font-bold text-[#c59b5f] flex items-center gap-2">
                       <Sparkles className="w-5 h-5" /> Assistente de Descrições IA
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-2 text-left text-gray-300">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-300">Estilo Principal</label>
                      <select className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={aiEstilo} onChange={e => setAiEstilo(e.target.value)}>
                        {estilosList.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-300">Tecido Principal</label>
                      <select className="flex h-10 w-full rounded-md border border-[#c59b5f]/25 bg-[#121212] px-3 py-2 text-sm text-white focus:outline-none" value={aiTecido} onChange={e => setAiTecido(e.target.value)}>
                        {tecidosList.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-300">Diferenciais e Destaques (Selecione quantos desejar)</label>
                      <div className="grid grid-cols-2 gap-2 bg-[#121212] p-3 rounded-lg border border-[#c59b5f]/15 max-h-36 overflow-y-auto">
                        {destaquesList.map(d => {
                          const isChecked = aiDestaques.includes(d.value);
                          return (
                            <label key={d.value} className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setAiDestaques(aiDestaques.filter(v => v !== d.value));
                                  } else {
                                    setAiDestaques([...aiDestaques, d.value]);
                                  }
                                }}
                                className="accent-[#c59b5f] rounded"
                              />
                              {d.label}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 border-t border-[#c59b5f]/25 pt-4">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="bg-[#121212] border-gray-800 text-white">Cancelar</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleGenerateAI} disabled={aiLoading} className="bg-[#c59b5f] text-black font-bold flex items-center gap-1.5">
                      {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Gerar com Gemini AI
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex border-b border-[#c59b5f]/20 overflow-x-auto scrollbar-hide">
              {[
                { key: 'desc_geral', label: 'Geral' },
                { key: 'desc_tecido', label: 'Tecido' },
                { key: 'desc_modelagem', label: 'Modelagem' },
                { key: 'desc_cuidados', label: 'Cuidados' },
                { key: 'desc_diferenciais', label: 'Diferenciais' },
                { key: 'desc_compra_segura', label: 'Compra Segura' }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveDescTab(tab.key)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${
                    activeDescTab === tab.key 
                      ? 'border-[#c59b5f] text-[#c59b5f]' 
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="pt-2">
              {activeDescTab === 'desc_geral' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Descrição Geral</label>
                  <Textarea value={formData.desc_geral} onChange={(e) => handleInputChange('desc_geral', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
              {activeDescTab === 'desc_tecido' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Tecido & Composição</label>
                  <Textarea value={formData.desc_tecido} onChange={(e) => handleInputChange('desc_tecido', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
              {activeDescTab === 'desc_modelagem' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Modelagem & Caimento</label>
                  <Textarea value={formData.desc_modelagem} onChange={(e) => handleInputChange('desc_modelagem', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
              {activeDescTab === 'desc_cuidados' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Cuidados com a Peça</label>
                  <Textarea value={formData.desc_cuidados} onChange={(e) => handleInputChange('desc_cuidados', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
              {activeDescTab === 'desc_diferenciais' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Diferenciais do Produto</label>
                  <Textarea value={formData.desc_diferenciais} onChange={(e) => handleInputChange('desc_diferenciais', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
              {activeDescTab === 'desc_compra_segura' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">Compra Segura Info</label>
                  <Textarea value={formData.desc_compra_segura} onChange={(e) => handleInputChange('desc_compra_segura', e.target.value)} className="bg-[#121212] border-[#c59b5f]/20 text-white min-h-[120px]" />
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-card p-6 rounded-xl border border-[#c59b5f]/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#c59b5f]/20 pb-2">
              <h2 className="text-lg font-bold text-white font-serif">Mídias e Fotos</h2>
              <label className="text-xs text-[#c59b5f] hover:underline cursor-pointer flex items-center font-bold">
                <Plus className="w-3.5 h-3.5 mr-1" /> Adicionar Fotos/Vídeos
                <input type="file" multiple accept="image/*, video/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {images.length === 0 ? (
              <div className="border-2 border-dashed border-orange-500/40 rounded-2xl p-8 text-center text-gray-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="text-xs text-orange-350 font-medium">Nenhuma imagem adicionada.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => {
                    const imgKey = img.isNew ? img.id : img.filename;
                    const isCapa = imagemPrincipal === imgKey;
                    const isVerso = imagemVerso === imgKey;
                    return (
                      <div key={imgKey || index} className="space-y-2">
                        <div className="flex items-center justify-between px-1 mb-1">
                          <input 
                            type="text" 
                            value={img.label || ''} 
                            onChange={(e) => handleImageLabelChange(index, e.target.value)}
                            placeholder="Nome / Cor da Mídia"
                            className="text-[10px] bg-[#121212] border border-[#c59b5f]/30 text-white focus:outline-none focus:border-[#c59b5f] w-full px-2 py-1 rounded"
                          />
                        </div>
                        <div className={`relative aspect-[3/4] rounded-xl border overflow-hidden bg-[#121212] group ${isCapa ? 'border-[#c59b5f] ring-2 ring-[#c59b5f]/30' : isVerso ? 'border-blue-500' : 'border-gray-800'}`}>
                          {img.url.match(/\.(mp4|webm|mov)$/i) || (img.file && img.file.type && img.file.type.startsWith('video/')) ? (
                            <video src={img.url} className="w-full h-full object-cover" controls={false} autoPlay muted loop playsInline />
                          ) : (
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1">
                            <button type="button" onClick={() => setImagemPrincipal(imgKey)} className="p-1 rounded bg-[#c59b5f] text-black text-[8px] font-bold">Capa</button>
                            <button type="button" onClick={() => setImagemVerso(imgKey)} className="p-1 rounded bg-blue-500 text-white text-[8px] font-bold">Verso</button>
                            <button type="button" onClick={() => handleRemoveImage(index)} className="p-1 rounded bg-red-600 text-white"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-[#c59b5f]/10 pt-6">
              <h3 className="text-sm font-bold text-white font-serif mb-2">Vídeo Externo (YouTube/Vimeo/MP4)</h3>
              <p className="text-xs text-gray-400 mb-3">
                Para evitar lentidão e travamentos, cole o link do seu vídeo hospedado externamente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="url"
                    value={formData.video_url?.replace('#first', '')}
                    onChange={(e) => {
                      const base = e.target.value;
                      const isFirst = formData.video_url?.includes('#first');
                      setFormData({ ...formData, video_url: base ? (isFirst ? base + '#first' : base) : '' });
                    }}
                    placeholder="Ex: https://youtube.com/shorts/... ou link .mp4"
                    className="w-full bg-[#121212] border border-[#c59b5f]/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#c59b5f] focus:ring-1 focus:ring-[#c59b5f]"
                  />
                </div>
                <div className="md:col-span-1">
                  <select
                    value={formData.video_url?.includes('#first') ? 'first' : 'last'}
                    onChange={(e) => {
                      const base = formData.video_url?.replace('#first', '') || '';
                      if (!base) return;
                      setFormData({ ...formData, video_url: e.target.value === 'first' ? base + '#first' : base });
                    }}
                    className="w-full bg-[#121212] border border-[#c59b5f]/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#c59b5f]"
                  >
                    <option value="last">Exibir no Final</option>
                    <option value="first">Exibir como Primeira</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}