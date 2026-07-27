import React, { useState } from 'react';
import { Truck, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { motion } from 'framer-motion';
import { useCart } from '@/hooks/useCart.js';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';

export default function SmartShipping({ currentTotal, onSelectShipping }) {
  const { cart } = useCart();
  const [cep, setCep] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [freeShippingMin, setFreeShippingMin] = useState(299); // Dynamic threshold from database

  const diff = freeShippingMin - currentTotal;
  const progressPercent = Math.min(100, (currentTotal / freeShippingMin) * 100);

  const formatPrice = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleCalculate = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length < 8) return;

    setLoading(true);
    setError('');
    setCalculated(false);
    setOptions([]);

    try {
      const response = await apiServerClient.fetch('/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toCep: cleanCep,
          items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.erro || 'Erro ao calcular frete.');
      }

      const result = await response.json();
      if (result.sucesso && result.options) {
        setOptions(result.options);
        setFreeShippingMin(result.freeShippingMin || 299);
        setCalculated(true);

        if (result.options.length > 0) {
          // Find if there is a free shipping option, otherwise choose first
          const freeOpt = result.options.find(opt => opt.isFree);
          const defaultOpt = freeOpt || result.options[0];
          setSelectedOption(defaultOpt.id);
          onSelectShipping({ cost: defaultOpt.price, method: `${defaultOpt.company} ${defaultOpt.name}` });
        } else {
          setError('Nenhuma transportadora disponível para esta região.');
        }
      } else {
        throw new Error('Falha ao processar resposta de frete.');
      }
    } catch (err) {
      console.error('[SmartShipping] Error:', err);
      setError(err.message || 'Erro de conexão com o cálculo de frete.');
      toast.error(err.message || 'Erro ao calcular frete.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option.id);
    onSelectShipping({ cost: option.price, method: `${option.company} ${option.name}` });
  };

  return (
    <div className="bg-card border border-primary/10 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Calcular Frete e Prazo</h3>
      </div>

      <div className="flex gap-2 mb-5">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="00000-000" 
            className="pl-9 bg-background border-primary/20 focus-visible:ring-primary h-11"
            value={cep}
            maxLength={9}
            disabled={loading}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              const formatted = val.length > 5 ? val.replace(/^(\d{5})(\d)/, '$1-$2') : val;
              setCep(formatted);
            }}
          />
        </div>
        <Button 
          onClick={handleCalculate} 
          variant="outline" 
          className="border-primary/20 hover:bg-primary/5 h-11 px-6 font-medium text-foreground"
          disabled={loading || cep.replace(/\D/g, '').length < 8}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'OK'}
        </Button>
      </div>

      {/* Free Shipping Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs font-medium mb-1.5">
          <span className="text-muted-foreground">Frete Grátis</span>
          <span className={diff > 0 ? "text-primary" : "text-green-600 font-bold"}>
            {diff > 0 ? `Falta ${formatPrice(diff)}` : 'Desbloqueado!'}
          </span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${diff > 0 ? 'bg-primary' : 'bg-green-500'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl text-xs font-semibold text-center mt-3">
          {error}
        </div>
      )}

      {calculated && options.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-primary/10 pt-4">
          {options.map((opt) => (
            <label 
              key={opt.id} 
              className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${
                selectedOption === opt.id ? 'border-primary bg-primary/5' : 'border-primary/20 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={selectedOption === opt.id}
                  onChange={() => handleOptionChange(opt)}
                  className="text-primary focus:ring-primary" 
                />
                <div>
                  <div className="font-bold text-sm text-foreground">
                    {opt.company} {opt.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Prazo: {opt.delivery_time} {opt.delivery_time === 1 ? 'dia útil' : 'dias úteis'}
                  </div>
                </div>
              </div>
              <div className="font-bold text-sm text-foreground">
                {opt.price === 0 ? <span className="text-green-600">Grátis</span> : formatPrice(opt.price)}
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}