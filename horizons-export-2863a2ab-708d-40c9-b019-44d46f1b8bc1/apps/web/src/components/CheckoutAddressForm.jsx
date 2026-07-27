import React from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function CheckoutAddressForm({ 
  type, 
  title, 
  data, 
  onChange, 
  onCepBlur, 
  isLoading 
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto format CEP
    if (name === 'cep') {
      const digits = value.replace(/\D/g, '');
      const formatted = digits.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
      onChange(type, name, formatted);
    } else {
      onChange(type, name, value);
    }
  };

  return (
    <div className="checkout-section flex flex-col gap-5">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <MapPin className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 relative">
          <Label htmlFor={`${type}-cep`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            CEP *
          </Label>
          <div className="relative">
            <Input
              id={`${type}-cep`}
              name="cep"
              value={data.cep}
              onChange={handleChange}
              onBlur={() => onCepBlur(type)}
              placeholder="00000-000"
              maxLength={9}
              className="pr-10 border-primary/20 focus-visible:ring-primary"
            />
            {isLoading && (
              <Loader2 className="w-4 h-4 text-primary absolute right-3 top-1/2 -translate-y-1/2 animate-spin" />
            )}
          </div>
        </div>

        <div className="md:col-span-8">
          <Label htmlFor={`${type}-rua`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            Rua / Avenida *
          </Label>
          <Input
            id={`${type}-rua`}
            name="rua"
            value={data.rua}
            onChange={handleChange}
            placeholder="Ex: Av. Paulista"
            className="border-primary/20 focus-visible:ring-primary"
          />
        </div>

        <div className="md:col-span-4">
          <Label htmlFor={`${type}-numero`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            Número *
          </Label>
          <Input
            id={`${type}-numero`}
            name="numero"
            value={data.numero}
            onChange={handleChange}
            placeholder="Ex: 1000"
            className="border-primary/20 focus-visible:ring-primary"
          />
        </div>

        <div className="md:col-span-8">
          <Label htmlFor={`${type}-complemento`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            Complemento (Opcional)
          </Label>
          <Input
            id={`${type}-complemento`}
            name="complemento"
            value={data.complemento}
            onChange={handleChange}
            placeholder="Apto, Bloco, etc."
            className="border-primary/20 focus-visible:ring-primary"
          />
        </div>

        <div className="md:col-span-5">
          <Label htmlFor={`${type}-bairro`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            Bairro *
          </Label>
          <Input
            id={`${type}-bairro`}
            name="bairro"
            value={data.bairro}
            onChange={handleChange}
            className="border-primary/20 focus-visible:ring-primary"
          />
        </div>

        <div className="md:col-span-5">
          <Label htmlFor={`${type}-cidade`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            Cidade *
          </Label>
          <Input
            id={`${type}-cidade`}
            name="cidade"
            value={data.cidade}
            onChange={handleChange}
            className="border-primary/20 focus-visible:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor={`${type}-estado`} className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">
            UF *
          </Label>
          <Input
            id={`${type}-estado`}
            name="estado"
            value={data.estado}
            onChange={handleChange}
            placeholder="SP"
            maxLength={2}
            className="border-primary/20 focus-visible:ring-primary uppercase"
          />
        </div>
      </div>
    </div>
  );
}