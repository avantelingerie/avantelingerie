import React, { useState, useEffect } from 'react';
import { Calculator, X, Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

export default function CalculadoraPrecoModal({ isOpen, onClose, onApply }) {
  const [custo, setCusto] = useState('');
  const [margemAtacado, setMargemAtacado] = useState('');
  const [margemVarejo, setMargemVarejo] = useState('');
  
  const anoVigente = new Date().getFullYear();

  // Tabela de Reforma Tributária
  const getImposto = (ano) => {
    if (ano <= 2026) return 1.0;
    if (ano === 2027) return 8.9;
    if (ano === 2028) return 8.9;
    if (ano === 2029) return 10.6;
    if (ano === 2030) return 12.3;
    if (ano === 2031) return 14.1;
    if (ano === 2032) return 15.9;
    return 26.5; // 2033+
  };

  const impostoAno = getImposto(anoVigente);

  const parsedCusto = parseFloat(custo.replace(',', '.')) || 0;
  const parsedAtacado = parseFloat(margemAtacado.replace(',', '.')) || 0;
  const parsedVarejo = parseFloat(margemVarejo.replace(',', '.')) || 0;
  
  // Cálculos Automáticos: Regra Objetiva (Custo + Margem) / (1 - Imposto)
  const impostoDecimal = impostoAno / 100;
  const atacadoDecimal = parsedAtacado / 100;
  const varejoDecimal = parsedVarejo / 100;

  // Divisor fixo baseado apenas no imposto do ano (Ex: 1 - 0.01 = 0.99)
  const divisorImposto = 1 - impostoDecimal;

  // 1º. Achar o preço Atacado Final
  const baseAtacado = parsedCusto + (parsedCusto * atacadoDecimal); // Ex: 10 + 10% = 11
  const precoAtacado = divisorImposto > 0 ? baseAtacado / divisorImposto : 0; // Ex: 11 / 0.99 = 11.11

  // 2º. Achar o preço Varejo Final
  const baseVarejo = precoAtacado + (precoAtacado * varejoDecimal); // Ex: 11.11 + 20% = 13.33
  const precoVarejo = divisorImposto > 0 ? baseVarejo / divisorImposto : 0; // Ex: 13.33 / 0.99 = 13.46

  // Lucro Limpo (Preço Final - Custo Original - Imposto sobre o Preço Final)
  const lucroAtacado = precoAtacado > 0 ? precoAtacado - parsedCusto - (precoAtacado * impostoDecimal) : 0;
  const lucroVarejo = precoVarejo > 0 ? precoVarejo - parsedCusto - (precoVarejo * impostoDecimal) : 0;

  const formatCurrency = (val) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleApply = () => {
    onApply({
      preco_atacado: precoAtacado.toFixed(2),
      preco_varejo: precoVarejo.toFixed(2)
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-[#252525] text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-[#c59b5f]">
            <Calculator className="w-5 h-5" />
            Calculadora Tributária
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Reforma {anoVigente}: Imposto CBS/IBS de <strong className="text-white">{impostoAno}%</strong> (Markup por Dentro).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label>Custo do Produto (R$)</Label>
            <Input 
              type="number" 
              placeholder="Ex: 100.00" 
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
              className="bg-[#1e1e1e] border-zinc-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Margem Atacado (%)</Label>
              <Input 
                type="number" 
                placeholder="Ex: 40" 
                value={margemAtacado}
                onChange={(e) => setMargemAtacado(e.target.value)}
                className="bg-[#1e1e1e] border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label>Margem Varejo (%)</Label>
              <Input 
                type="number" 
                placeholder="Ex: 60" 
                value={margemVarejo}
                onChange={(e) => setMargemVarejo(e.target.value)}
                className="bg-[#1e1e1e] border-zinc-700"
              />
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-4 rounded-lg border border-zinc-800 space-y-3 mt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Preço Atacado Final:</span>
              <div className="text-right">
                <div className="text-[#c59b5f] font-bold text-lg">{formatCurrency(precoAtacado)}</div>
                <div className="text-xs text-zinc-500">Lucro Limpo: {formatCurrency(lucroAtacado)}</div>
              </div>
            </div>
            
            <div className="border-t border-zinc-700/50 my-1"></div>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Preço Varejo Final:</span>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">{formatCurrency(precoVarejo)}</div>
                <div className="text-xs text-zinc-500">Lucro Limpo: {formatCurrency(lucroVarejo)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} className="hover:bg-zinc-800">
            Cancelar
          </Button>
          <Button onClick={handleApply} className="bg-[#c59b5f] hover:bg-[#b08953] text-black font-bold">
            <Save className="w-4 h-4 mr-2" />
            Aplicar Preços
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
