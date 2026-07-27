import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CollectionCard({ image, title, className }) {
  return (
    <a 
      href={`/categoria/${title.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl block aspect-[4/5] sm:aspect-square md:aspect-[3/4] border border-[#c59b5f]/15 hover:border-[#c59b5f] transition-all duration-500 shadow-premium-sm hover:shadow-[0_8px_30px_rgba(197,155,95,0.15)]",
        className
      )}
    >
      <div className="absolute inset-0 bg-muted/10">
        <img 
          src={image} 
          alt={`Coleção ${title}`}
          className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
        />
      </div>
      {/* Rich editorial dark gradient overlay for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white group-hover:text-[#c59b5f] mb-2 font-serif transition-colors duration-300 drop-shadow-md">
          {title}
        </h3>
        <div className="flex items-center text-[#c59b5f] text-sm font-bold opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>Ver coleção</span>
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  );
}