import React from 'react';
import { Flame, Package } from 'lucide-react';

export default function MentalTrigger({ type, value }) {
  if (!value || value <= 0) return null;

  const config = {
    sales: {
      icon: Flame,
      text: `Mais de ${value} vendidos essa semana!`,
      color: 'text-orange-600'
    },
    stock: {
      icon: Package,
      text: `Restam apenas ${value} unidades!`,
      color: 'text-primary'
    }
  };

  const { icon: Icon, text, color } = config[type] || {};

  if (!Icon) return null;

  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{text}</span>
    </div>
  );
}