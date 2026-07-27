import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { toast } from 'sonner';
import { clientesService } from '@/services/clientesService.js';

export default function EnderecoModal({ isOpen, onClose, endereco, usuarioId, onSave }) {
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    principal: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (endereco) {
      setFormData({
        cep: endereco.cep || '',
        logradouro: endereco.logradouro || '',
        numero: endereco.numero || '',
        complemento: endereco.complemento || '',
        bairro: endereco.bairro || '',
        cidade: endereco.cidade || '',
        estado: endereco.estado || '',
        principal: endereco.principal || false
      });
    } else {
      setFormData({
        cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '', principal: false
      });
    }
  }, [endereco, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckedChange = (checked) => {
    setFormData(prev => ({ ...prev, principal: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'];
    const missing = requiredFields.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);
    try {
      if (endereco?.id) {
        await clientesService.updateEndereco(endereco.id, { ...formData, usuario_id: usuarioId });
        toast.success('Endereço atualizado com sucesso!');
      } else {
        await clientesService.createEndereco(usuarioId, formData);
        toast.success('Endereço criado com sucesso!');
      }
      onSave();
      onClose();
    } catch (error) {
      toast.error('Erro ao salvar endereço.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{endereco ? 'Editar Endereço' : 'Novo Endereço'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cep">CEP *</Label>
              <Input id="cep" name="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estado">Estado *</Label>
              <Input id="estado" name="estado" value={formData.estado} onChange={handleChange} placeholder="SP" maxLength={2} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2 col-span-3">
              <Label htmlFor="logradouro">Logradouro *</Label>
              <Input id="logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} placeholder="Rua Exemplo" />
            </div>
            <div className="space-y-2 col-span-1">
              <Label htmlFor="numero">Número *</Label>
              <Input id="numero" name="numero" value={formData.numero} onChange={handleChange} placeholder="123" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento</Label>
              <Input id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto 45" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bairro">Bairro *</Label>
              <Input id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Centro" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade *</Label>
            <Input id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="São Paulo" />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="principal" checked={formData.principal} onCheckedChange={handleCheckedChange} />
            <Label htmlFor="principal" className="cursor-pointer">Definir como endereço principal</Label>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancelar</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}