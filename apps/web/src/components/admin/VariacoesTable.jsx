import React, { useState } from 'react';
import { Trash2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { toast } from 'sonner';

export default function VariacoesTable({ variacoes = [], onChange, productName = "", productImages = [] }) {
  const getVariationImagePreview = (imgUrlOrId) => {
    if (!imgUrlOrId) return '';
    const imgObj = productImages.find(img =>
      img.id === imgUrlOrId ||
      img.filename === imgUrlOrId ||
      img.url === imgUrlOrId
    );
    if (imgObj) {
      return imgObj.previewUrl || imgObj.url || '';
    }
    return imgUrlOrId;
  };

  const isVideoUrl = (urlOrId) => {
    if (!urlOrId) return false;
    if (typeof urlOrId === 'string' && urlOrId.match(/\.(mp4|webm|mov|avi|mkv)$/i)) return true;
    const imgObj = productImages.find(img =>
      img.id === urlOrId ||
      img.filename === urlOrId ||
      img.url === urlOrId
    );
    if (imgObj && imgObj.file && imgObj.file.type && imgObj.file.type.startsWith('video/')) return true;
    return false;
  };

  const normalizeText = (text) => text ? text.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, '') : '';


  // Line creator states
  const [inputTamanhos, setInputTamanhos] = useState('');
  const [inputCores, setInputCores] = useState('');
  const [defaultEstoque, setDefaultEstoque] = useState('');
  const [defaultPreco, setDefaultPreco] = useState('');
  const [defaultPrecoAtacado, setDefaultPrecoAtacado] = useState('');

  const generateSKU = (cor, tamanho) => {
    if (!productName || !cor || !tamanho) return '';
    const baseSlug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 10);
    const corSlug = cor.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tamSlug = tamanho.toUpperCase().replace(/[^A-Z0-9]+/g, '');
    return `${baseSlug}-${corSlug}-${tamSlug}`.toUpperCase();
  };

  const handleGenerateCombinations = () => {
    if (!inputTamanhos.trim()) {
      toast.error('Por favor, informe pelo menos um tamanho.');
      return;
    }
    if (!inputCores.trim()) {
      toast.error('Por favor, informe pelo menos uma cor.');
      return;
    }

    const sizesList = inputTamanhos.split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const colorsList = inputCores.split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (sizesList.length === 0 || colorsList.length === 0) {
      toast.error('Tamanhos ou cores inválidos.');
      return;
    }

    const stockVal = parseInt(defaultEstoque) >= 0 ? parseInt(defaultEstoque) : 0;
    const priceVal = defaultPreco !== '' ? parseFloat(defaultPreco) : 0;
    const priceAtacadoVal = defaultPrecoAtacado !== '' ? parseFloat(defaultPrecoAtacado) : 0;

    const newVariacoes = [...variacoes];
    let createdCount = 0;

    colorsList.forEach(cor => {
      sizesList.forEach(tamanho => {
        const exists = variacoes.some(v =>
          v.cor.trim().toLowerCase() === cor.toLowerCase() &&
          v.tamanho.trim().toLowerCase() === tamanho.toLowerCase()
        );

        if (!exists) {
          const sku = generateSKU(cor, tamanho);
          
          // Associa imagem automaticamente se a label (Mídia) bater com a cor ignorando espaços, hifens e maiúsculas
          const matchingImg = productImages.find(img => img.label && normalizeText(img.label) === normalizeText(cor) && normalizeText(img.label) !== '');
          const imagem_url = matchingImg ? (matchingImg.isNew ? matchingImg.id : (matchingImg.filename || matchingImg.url)) : '';

          newVariacoes.push({
            id: `bulk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            cor,
            tamanho,
            sku,
            estoque: stockVal,
            preco: priceVal,
            preco_atacado: priceAtacadoVal,
            imagem_url,
            status: true,
            isNew: true
          });
          createdCount++;
        }
      });
    });

    if (createdCount > 0) {
      onChange(newVariacoes);
      toast.success(`${createdCount} variações combinadas com sucesso!`);
      setInputCores('');
      setInputTamanhos('');
      setDefaultEstoque('');
      setDefaultPreco('');
      setDefaultPrecoAtacado('');
    } else {
      toast.info('Todas as variações especificadas já existem.');
    }
  };

  const handleInlineChange = (id, field, value) => {
    const updated = variacoes.map(v => {
      if (v.id === id) {
        let cleanedVal = value;
        if (field === 'estoque') cleanedVal = parseInt(value) || 0;
        if (field === 'preco' || field === 'preco_atacado') cleanedVal = value !== '' ? parseFloat(value) : 0;
        return { ...v, [field]: cleanedVal };
      }
      return v;
    });
    onChange(updated);
  };

  const handleRemove = (idToRemove) => {
    if (window.confirm('Remover esta variação?')) {
      onChange(variacoes.filter(v => v.id !== idToRemove));
    }
  };

  const totalEstoque = variacoes.reduce((acc, curr) => acc + (parseInt(curr.estoque) || 0), 0);

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-[#c59b5f]/20 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white font-serif">Variações do Produto</h3>
          <p className="text-xs text-gray-400 font-light mt-0.5">Informe os atributos e valores padrões abaixo para gerar todas as variações.</p>
        </div>
        <span className="text-xs font-bold text-[#c59b5f] bg-[#c59b5f]/10 border border-[#c59b5f]/30 px-4 py-2 rounded-full shadow-sm">
          Estoque Total: {totalEstoque} un
        </span>
      </div>

      {/* 2. Horizontal Row Creator */}
      <div className="bg-[#1a1a1a] border border-[#c59b5f]/20 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Tamanhos (ex: P, M, G, GG)</label>
            <Input
              value={inputTamanhos}
              onChange={(e) => setInputTamanhos(e.target.value)}
              placeholder="Digite os tamanhos separados por vírgula..."
              className="h-10 text-xs bg-[#121212] border-[#c59b5f]/25 text-white placeholder-gray-500 focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Cores (ex: Preto, Romance, Chocolate)</label>
            <Input
              value={inputCores}
              onChange={(e) => setInputCores(e.target.value)}
              placeholder="Digite as cores separadas por vírgula..."
              className="h-10 text-xs bg-[#121212] border-[#c59b5f]/25 text-white placeholder-gray-500 focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-2 border-t border-[#c59b5f]/10">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Estoque Padrão</label>
            <Input
              type="number"
              min="0"
              value={defaultEstoque}
              onChange={(e) => setDefaultEstoque(e.target.value)}
              placeholder="Ex: 25"
              className="h-10 text-xs bg-[#121212] border-[#c59b5f]/25 text-white placeholder-gray-500 focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Preço Varejo Padrão (R$)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={defaultPreco}
              onChange={(e) => setDefaultPreco(e.target.value)}
              placeholder="Ex: 79.90"
              className="h-10 text-xs bg-[#121212] border-[#c59b5f]/25 text-white placeholder-gray-500 focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-wider block">Preço Atacado Padrão (R$)</label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={defaultPrecoAtacado}
              onChange={(e) => setDefaultPrecoAtacado(e.target.value)}
              placeholder="Ex: 65.00"
              className="h-10 text-xs bg-[#121212] border-[#c59b5f]/25 text-white placeholder-gray-500 focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none"
            />
          </div>

          <div>
            <Button
              type="button"
              onClick={handleGenerateCombinations}
              className="w-full h-10 bg-[#c59b5f] hover:bg-[#c59b5f]/80 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-[#c59b5f]/15"
            >
              Gerar Variações
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Spreadsheet Table with Dynamic Inputs */}
      <div className="border border-[#c59b5f]/20 rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#121212] text-gray-300 border-b border-[#c59b5f]/25 text-[10px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-3.5 font-bold">Cor</th>
                <th className="px-4 py-3.5 font-bold">Tamanho</th>
                <th className="px-4 py-3.5 font-bold">SKU</th>
                <th className="px-4 py-3.5 font-bold w-36">Imagem / Foto</th>
                <th className="px-4 py-3.5 font-bold text-center w-24">Estoque</th>
                <th className="px-4 py-3.5 font-bold w-36">Preço Varejo (R$)</th>
                <th className="px-4 py-3.5 font-bold w-36">Preço Atacado (R$)</th>
                <th className="px-4 py-3.5 font-bold text-center w-20">Status</th>
                <th className="px-4 py-3.5 font-bold text-right w-16">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c59b5f]/15 text-xs text-white">
              {variacoes.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-4 py-12 text-center text-gray-400 font-light italic">
                    Nenhuma variação adicionada ainda. Digite tamanhos e cores na linha acima para gerar a lista!
                  </td>
                </tr>
              ) : (
                variacoes.map((variacao) => (
                  <tr key={variacao.id} className="hover:bg-[#121212]/30 transition-colors">
                    <td className="px-4 py-3 font-bold uppercase text-[#c59b5f]">{variacao.cor}</td>
                    <td className="px-4 py-3 font-bold text-white">{variacao.tamanho}</td>
                    <td className="px-4 py-3 font-mono text-gray-400 select-all">{variacao.sku}</td>

                    {/* Imagem / Foto selector inline */}
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-10 rounded border border-[#c59b5f]/30 bg-[#121212] overflow-hidden flex items-center justify-center shrink-0">
                          {variacao.imagem_url ? (
                            isVideoUrl(variacao.imagem_url) ? (
                              <video src={getVariationImagePreview(variacao.imagem_url)} className="w-full h-full object-cover" controls={false} autoPlay muted loop playsInline />
                            ) : (
                              <img src={getVariationImagePreview(variacao.imagem_url)} alt="" className="w-full h-full object-cover" />
                            )
                          ) : (
                            <span className="text-[9px] text-gray-500 font-bold">Sem foto</span>
                          )}
                        </div>
                        <select
                          value={variacao.imagem_url || ''}
                          onChange={(e) => handleInlineChange(variacao.id, 'imagem_url', e.target.value)}
                          className="bg-[#121212] border border-[#c59b5f]/25 rounded text-[10px] text-[#c59b5f] px-1.5 py-1 w-28 focus:border-[#c59b5f] focus:outline-none"
                        >
                          <option value="">Nenhuma</option>
                          {productImages.map((img, idx) => {
                            const imgVal = img.isNew ? img.id : (img.filename || img.url);
                            let displayName = img.label ? img.label : '';
                            if (!displayName) {
                               displayName = img.file?.name || img.filename || `Mídia ${idx + 1}`;
                               // remove extensoes e corta se for muito grande
                               displayName = displayName.replace(/\.(png|jpg|jpeg|webp)$/i, '');
                               if (displayName.length > 15) displayName = displayName.substring(0, 15) + '...';
                            }
                            return (
                              <option key={idx} value={imgVal}>
                                {displayName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </td>

                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        min="0"
                        value={variacao.estoque}
                        onChange={(e) => handleInlineChange(variacao.id, 'estoque', e.target.value)}
                        className="h-8 text-center text-xs bg-[#121212] border-[#c59b5f]/20 text-white focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none w-20 mx-auto"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={variacao.preco || ''}
                        placeholder="Usar base"
                        onChange={(e) => handleInlineChange(variacao.id, 'preco', e.target.value)}
                        className="h-8 text-xs font-mono bg-[#121212] border-[#c59b5f]/20 text-white focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none w-32"
                      />
                    </td>

                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={variacao.preco_atacado || ''}
                        placeholder="Usar base"
                        onChange={(e) => handleInlineChange(variacao.id, 'preco_atacado', e.target.value)}
                        className="h-8 text-xs font-mono bg-[#121212] border-[#c59b5f]/20 text-white focus:border-[#c59b5f] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#c59b5f] focus:outline-none w-32"
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      <Switch
                        checked={variacao.status !== false}
                        onCheckedChange={(c) => handleInlineChange(variacao.id, 'status', c)}
                        className="data-[state=checked]:bg-[#c59b5f]"
                      />
                    </td>

                    <td className="px-4 py-2 text-right">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemove(variacao.id)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-950/30 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}