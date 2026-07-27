import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Star, GripVertical, FileImage as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageUpload({ imagens = [], imagemPrincipal = '', onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const fileInputRef = useRef(null);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      imagens.forEach(img => {
        if (img.isNew && img.previewUrl) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Medium #21: Rigorous file validation checks for MIME type and 5MB maximum file size
  const handleFiles = (files) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB limit
    const rejectedFiles = [];
    const validImageFiles = [];

    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        rejectedFiles.push({ file, reason: 'Formato inválido. Use apenas PNG, JPG, JPEG ou WEBP.' });
      } else if (file.size > maxSizeBytes) {
        rejectedFiles.push({ file, reason: 'Imagem excede o limite máximo de tamanho de 5MB.' });
      } else {
        validImageFiles.push(file);
      }
    });

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(item => {
        toast.error(`Falha no upload da foto "${item.file.name}": ${item.reason}`);
      });
    }

    if (validImageFiles.length === 0) {
      return;
    }

    if (imagens.length + validImageFiles.length > 10) {
      toast.error('O limite máximo é de 10 imagens por produto.');
      return;
    }

    const newImages = validImageFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file: file,
      previewUrl: URL.createObjectURL(file),
      isNew: true,
      url: '' // Will be populated after upload
    }));

    const updatedImages = [...imagens, ...newImages];
    
    // Set first image as principal if none is set
    let newPrincipal = imagemPrincipal;
    if (!newPrincipal && updatedImages.length > 0) {
      newPrincipal = updatedImages[0].isNew ? updatedImages[0].id : updatedImages[0].url;
    }

    onChange(updatedImages, newPrincipal);
    toast.success(`${validImageFiles.length} foto(s) carregada(s) com sucesso!`);
  };

  // Low #38: Display standard browser confirm modal before deletion
  const removeImage = (idxToRemove) => {
    const imageToRemove = imagens[idxToRemove];
    
    if (!window.confirm('Tem certeza de que deseja remover esta imagem da galeria?')) {
      return;
    }
    
    if (imageToRemove.isNew && imageToRemove.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    const updatedImages = imagens.filter((_, idx) => idx !== idxToRemove);
    
    let newPrincipal = imagemPrincipal;
    const identifierToRemove = imageToRemove.isNew ? imageToRemove.id : imageToRemove.url;
    
    if (imagemPrincipal === identifierToRemove) {
      if (updatedImages.length > 0) {
        newPrincipal = updatedImages[0].isNew ? updatedImages[0].id : updatedImages[0].url;
      } else {
        newPrincipal = '';
      }
    }
    
    onChange(updatedImages, newPrincipal);
    toast.info('Imagem removida do rascunho.');
  };

  const setAsMain = (img) => {
    const identifier = img.isNew ? img.id : img.url;
    onChange(imagens, identifier);
  };

  // Drag and drop reordering handlers
  const handleItemDragStart = (e, idx) => {
    setDraggedIdx(idx);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', idx);
  };

  const handleItemDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleItemDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    
    const newImagens = [...imagens];
    const draggedItem = newImagens[draggedIdx];
    newImagens.splice(draggedIdx, 1);
    newImagens.splice(targetIdx, 0, draggedItem);
    
    onChange(newImagens, imagemPrincipal);
    setDraggedIdx(null);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragActive ? 'border-[#c59b5f] bg-[#c59b5f]/5' : 'border-muted-foreground/20 hover:border-[#c59b5f]/50'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleChange} 
          className="hidden" 
        />
        <div className="flex flex-col items-center justify-center gap-3 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-[#c59b5f]/10 flex items-center justify-center text-[#c59b5f]">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium">Clique ou arraste imagens aqui</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG ou WEBP até 5MB (Máx 10)</p>
          </div>
        </div>
      </div>

      {imagens.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {imagens.map((img, idx) => {
            const isPrincipal = imagemPrincipal === (img.isNew ? img.id : img.url);
            const displayUrl = img.isNew ? img.previewUrl : img.url;

            return (
              <div 
                key={img.isNew ? img.id : img.url} 
                draggable
                onDragStart={(e) => handleItemDragStart(e, idx)}
                onDragOver={handleItemDragOver}
                onDrop={(e) => handleItemDrop(e, idx)}
                className={`relative group aspect-square rounded-lg border overflow-hidden flex flex-col transition-all cursor-move ${draggedIdx === idx ? 'opacity-50 ring-2 ring-[#c59b5f] border-transparent' : 'bg-muted'}`}
              >
                <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-1 rounded">
                  <GripVertical className="w-4 h-4 text-white" />
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  className="absolute top-2 right-2 z-10 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
                
                <div className="flex-1 w-full h-full p-2 flex items-center justify-center overflow-hidden bg-white pointer-events-none">
                   {displayUrl ? (
                      <img src={displayUrl} alt={`Preview ${idx}`} className="w-full h-full object-contain" />
                   ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                   )}
                </div>
                
                <div className="h-8 bg-black/80 flex items-center justify-between px-2 w-full shrink-0">
                  {isPrincipal ? (
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-medium">
                      <Star className="w-3 h-3 fill-current" /> Principal
                    </div>
                  ) : (
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setAsMain(img); }}
                      className="text-xs text-white/70 hover:text-white font-medium cursor-pointer"
                    >
                      Definir principal
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}