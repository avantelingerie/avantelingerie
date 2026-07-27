import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value, onChange, min = 1, max }) {
  const handleMinus = () => {
    if (value > min) onChange(value - 1);
  };

  const handlePlus = () => {
    if (max === undefined || value < max) onChange(value + 1);
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    
    if (val < min) {
      onChange(min);
    } else if (max !== undefined && val > max) {
      onChange(max);
    } else {
      onChange(val);
    }
  };

  const handleBlur = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < min) {
      onChange(min);
    } else if (max !== undefined && val > max) {
      onChange(max);
    }
  };

  // Adjust disabled states
  const disableMinus = value <= min;
  const disablePlus = max !== undefined && value >= max;

  return (
    <div className="flex items-center justify-between w-full h-14 md:h-[60px] border-2 border-primary/20 rounded-xl overflow-hidden bg-background focus-within:border-primary/50 transition-colors">
      <button 
        type="button"
        onClick={handleMinus}
        disabled={disableMinus}
        className="w-16 h-full flex items-center justify-center text-foreground hover:bg-muted active:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Diminuir quantidade"
      >
        <Minus className="w-5 h-5" />
      </button>
      
      <input 
        type="number" 
        value={value} 
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full h-full text-center text-lg font-bold bg-transparent border-none focus:outline-none focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none m-0 p-0"
        style={{ MozAppearance: 'textfield' }}
        min={min}
        max={max}
        aria-label="Quantidade do produto"
      />
      
      <button 
        type="button"
        onClick={handlePlus}
        disabled={disablePlus}
        className="w-16 h-full flex items-center justify-center text-foreground hover:bg-muted active:bg-muted/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Aumentar quantidade"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}