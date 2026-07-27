import React from 'react';
import { Check } from 'lucide-react';

export default function ColorSwatch({ color, selected = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
        selected ? 'border-primary scale-110' : 'border-border hover:border-muted-foreground'
      }`}
      style={{ backgroundColor: color }}
      aria-label={`Select ${color} color`}
    >
      {selected && (
        <Check className="w-4 h-4 text-white drop-shadow-md" strokeWidth={3} />
      )}
    </button>
  );
}