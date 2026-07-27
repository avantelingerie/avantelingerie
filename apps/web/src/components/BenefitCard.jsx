import React from 'react';
import { cn } from '@/lib/utils';

export default function BenefitCard({ icon: Icon, title, description, className }) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center p-8 space-y-5 rounded-3xl transition-all duration-500",
      "bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(197,155,95,0.08)] group",
      className
    )}>
      {/* Sleek luxury shield icon container */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#121212] to-[#1e1e1e] border border-[#c59b5f]/30 flex items-center justify-center text-[#c59b5f] shadow-inner transition-all duration-500 group-hover:from-[#c59b5f] group-hover:to-[#c59b5f] group-hover:text-black group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(197,155,95,0.45)]">
        <Icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#c59b5f] transition-colors duration-300 font-serif">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-500 max-w-[260px] leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-light">
          {description}
        </p>
      )}
    </div>
  );
}