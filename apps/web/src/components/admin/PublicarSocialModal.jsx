import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  Loader2, 
  Sparkles, 
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { toast } from 'sonner';
import apiServerClient from '@/lib/apiServerClient.js';

export default function PublicarSocialModal({ produto, open, onOpenChange, onSuccess }) {
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [caption, setCaption] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [publishedResult, setPublishedResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (open && produto?.id) {
      setPublishedResult(null);
      setErrorMsg(null);
      setSelectedImageIndex(0);
      loadPreview(produto.id);
    } else if (!open) {
      setPreviewData(null);
      setCaption('');
      setPublishedResult(null);
      setErrorMsg(null);
    }
  }, [open, produto?.id]);

  const loadPreview = async (productId) => {
    setLoadingPreview(true);
    setErrorMsg(null);
    try {
      const res = await apiServerClient.fetch(`/marketing/social/preview/${productId}`);
      const data = await res.json();
      if (data.success && data.product) {
        setPreviewData(data.product);
        setCaption(data.product.caption || '');
      } else {
        setErrorMsg(data.error || 'Não foi possível carregar os dados do produto.');
      }
    } catch (err) {
      console.error('Erro ao carregar preview social:', err);
      setErrorMsg('Erro de conexão ao carregar pré-visualização.');
    } finally {
      setLoadingPreview(false);
    }
  };

  const handlePublish = async () => {
    if (!produto?.id) return;

    setPublishing(true);
    setErrorMsg(null);

    const toastId = toast.loading('Criando container e publicando no Feed do Instagram...');

    try {
      const selectedImgUrl = previewData?.allImages?.[selectedImageIndex] || previewData?.imageUrl;
      const res = await apiServerClient.fetch('/marketing/social/publish-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: produto.id,
          customCaption: caption,
          imageIndex: selectedImageIndex,
          selectedImageUrl: selectedImgUrl
        })
      });

      const data = await res.json();

      if (data.success) {
        setPublishedResult(data);
        toast.success('Publicado com sucesso no Instagram e Facebook!', { id: toastId });
        if (onSuccess) onSuccess(data);
      } else {
        const err = data.error || 'Falha ao publicar.';
        setErrorMsg(err);
        toast.error(`Erro ao publicar: ${err}`, { id: toastId });
      }
    } catch (err) {
      console.error('Erro ao publicar:', err);
      const msg = err.message || 'Erro inesperado ao conectar com a Meta Graph API.';
      setErrorMsg(msg);
      toast.error(msg, { id: toastId });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121212] text-foreground border border-zinc-200 dark:border-zinc-800">
        <DialogHeader className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">Publicar no Feed do Instagram & Facebook</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Dispare fotos de alta costura diretamente para o feed oficial da <strong className="text-foreground">@avante.lingerie</strong>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {loadingPreview ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#c59b5f]" />
            <p className="text-sm text-muted-foreground">Gerando legenda comercial e preparando imagens...</p>
          </div>
        ) : publishedResult ? (
          <div className="py-6 space-y-6">
            <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/10 flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-green-700 dark:text-green-400">Publicação Concluída com Sucesso!</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  A peça já está disponível na grade do perfil oficial do Instagram e sincronizada com a Página do Facebook.
                </p>
              </div>

              {publishedResult.permalink && (
                <a
                  href={publishedResult.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-medium text-sm hover:opacity-95 transition-opacity shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                  Ver Publicação no Instagram
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              )}
            </div>

            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="font-medium"
              >
                Concluir e Fechar
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-3 space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Não foi possível publicar:</p>
                  <p className="mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Seleção de Imagem */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#c59b5f]" /> Foto que aparecerá no Feed
                </label>
                <span className="text-[11px] text-muted-foreground">
                  {previewData?.allImages?.length || 1} foto(s) disponível(is)
                </span>
              </div>

              {previewData?.allImages && previewData.allImages.length > 0 ? (
                <div className="flex gap-2.5 overflow-x-auto pb-2">
                  {previewData.allImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx 
                          ? 'border-pink-500 ring-2 ring-pink-500/30 shadow-md scale-105' 
                          : 'border-zinc-200 dark:border-zinc-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                      {selectedImageIndex === idx && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg border border-dashed flex items-center justify-center text-xs text-muted-foreground">
                  Sem foto
                </div>
              )}
            </div>

            {/* Edição da Legenda */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b5f]" /> Legenda da Publicação (Editável)
                </label>
                <span className="text-[11px] text-muted-foreground">
                  {caption.length} caracteres
                </span>
              </div>
              <Textarea
                rows={9}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Escreva a legenda com os diferenciais, preços e link da peça..."
                className="font-mono text-xs leading-relaxed resize-none bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              />
            </div>

            {/* Canais de Destino */}
            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white ring-2 ring-white dark:ring-zinc-900 text-xs shadow-sm">
                    <Instagram className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white ring-2 ring-white dark:ring-zinc-900 text-xs shadow-sm">
                    <Share2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Instagram Feed & Facebook Page</p>
                  <p className="text-[11px] text-muted-foreground">@avante.lingerie e Avante Lingerie Oficial</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                Conectado
              </span>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={publishing}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handlePublish}
                disabled={publishing || !caption.trim() || !previewData}
                className="bg-gradient-to-r from-pink-600 via-purple-600 to-[#c59b5f] hover:opacity-90 text-white font-bold transition-all shadow-md"
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publicando no Feed...
                  </>
                ) : (
                  <>
                    <Instagram className="w-4 h-4 mr-2" />
                    Publicar Agora no Feed
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
