import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Loader2 } from 'lucide-react';

export default function RevendedorActivationForm({ onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    cpf_cnpj: '',
    cidade_estado: '',
    ja_revende: ''
  });

  const [isValid, setIsValid] = useState(false);

  // Masks
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setFormData({ ...formData, whatsapp: value });
  };

  const handleCpfCnpjChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);

    if (value.length <= 11) {
      // CPF Mask
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ Mask
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setFormData({ ...formData, cpf_cnpj: value });
  };

  // Validation
  useEffect(() => {
    const isNomeValid = formData.nome.trim().length >= 3;
    const isPhoneValid = formData.whatsapp.replace(/\D/g, '').length === 11;
    const isCpfCnpjValid = formData.cpf_cnpj.replace(/\D/g, '').length === 11 || formData.cpf_cnpj.replace(/\D/g, '').length === 14;
    const isCidadeValid = formData.cidade_estado.trim().length >= 3;
    const isRevendeValid = formData.ja_revende !== '';

    setIsValid(isNomeValid && isPhoneValid && isCpfCnpjValid && isCidadeValid && isRevendeValid);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formData);
    }
  };

  const getInputClass = (value, minLength = 1) => {
    if (!value) return "border-primary/20 focus-visible:ring-[#D4AF37]/50";
    if (value.length < minLength) return "border-orange-300 focus-visible:ring-orange-300/50";
    return "border-green-200 focus-visible:ring-green-200/50";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-[#3A2E2A] font-semibold">Nome Completo</Label>
        <Input 
          id="nome" 
          placeholder="Seu nome completo" 
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className={`h-12 bg-white ${getInputClass(formData.nome, 3)}`}
        />
        {formData.nome && formData.nome.length < 3 && (
          <p className="text-xs text-orange-500">Mínimo de 3 caracteres</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="text-[#3A2E2A] font-semibold">WhatsApp</Label>
          <Input 
            id="whatsapp" 
            type="tel"
            placeholder="(00) 00000-0000" 
            value={formData.whatsapp}
            onChange={handlePhoneChange}
            className={`h-12 bg-white ${getInputClass(formData.whatsapp.replace(/\D/g, ''), 11)}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf_cnpj" className="text-[#3A2E2A] font-semibold">CPF ou CNPJ</Label>
          <Input 
            id="cpf_cnpj" 
            placeholder="000.000.000-00" 
            value={formData.cpf_cnpj}
            onChange={handleCpfCnpjChange}
            className={`h-12 bg-white ${getInputClass(formData.cpf_cnpj.replace(/\D/g, ''), 11)}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="cidade_estado" className="text-[#3A2E2A] font-semibold">Cidade / Estado</Label>
          <Input 
            id="cidade_estado" 
            placeholder="Ex: São Paulo / SP" 
            value={formData.cidade_estado}
            onChange={(e) => setFormData({ ...formData, cidade_estado: e.target.value })}
            className={`h-12 bg-white ${getInputClass(formData.cidade_estado, 3)}`}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ja_revende" className="text-[#3A2E2A] font-semibold">Já revende lingerie?</Label>
          <Select value={formData.ja_revende} onValueChange={(val) => setFormData({ ...formData, ja_revende: val })}>
            <SelectTrigger className={`h-12 bg-white ${formData.ja_revende ? 'border-green-200' : 'border-primary/20'}`}>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sim">Sim, já revendo</SelectItem>
              <SelectItem value="não">Não, quero começar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        {!isValid && (
          <p className="text-sm text-center text-orange-600 font-medium bg-orange-50 py-2 rounded-lg">
            Preencha todos os campos para ativar sua condição profissional
          </p>
        )}
        
        <Button 
          type="submit" 
          disabled={!isValid || isLoading}
          className="w-full h-14 bg-[#D4AF37] hover:bg-[#C5A028] text-white font-bold rounded-xl text-lg shadow-md transition-all"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Ativar Condição de Revenda'}
        </Button>
        
        <Button 
          type="button" 
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full h-12 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold rounded-xl transition-all"
        >
          Continuar como Cliente Varejo
        </Button>
      </div>
    </form>
  );
}