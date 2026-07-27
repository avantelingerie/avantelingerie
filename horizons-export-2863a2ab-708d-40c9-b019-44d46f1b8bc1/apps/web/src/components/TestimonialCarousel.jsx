import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';
import { cn } from '@/lib/utils';

export default function TestimonialCarousel({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto px-4 md:px-0"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {testimonials.map((item) => (
          <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="relative bg-white border border-[#c59b5f]/15 hover:border-[#c59b5f] rounded-3xl p-8 shadow-premium-sm hover:shadow-[0_15px_40px_rgba(197,155,95,0.12)] transition-all duration-500 h-full flex flex-col group overflow-hidden">
              {/* Oversized editorial quote watermark */}
              <Quote className="absolute right-6 top-6 w-20 h-20 text-[#c59b5f]/10 pointer-events-none transform translate-x-2 -translate-y-2 group-hover:scale-105 group-hover:text-[#c59b5f]/15 transition-all duration-500" />

              <div className="flex gap-1 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110",
                      i < item.rating
                        ? 'fill-[#c59b5f] text-[#c59b5f]'
                        : 'fill-none text-gray-200'
                    )}
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed flex-grow italic mb-6 text-sm md:text-base relative z-10 font-light">
                "{item.comment}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 group-hover:border-[#c59b5f]/10 transition-colors duration-500 relative z-10">
                {item.avatar_url ? (
                  <img
                    src={item.avatar_url}
                    alt={`Foto de ${item.customer_name}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c59b5f]/30 group-hover:border-[#c59b5f] transition-all duration-300 shadow-sm"
                  />
                ) : item.avatar ? (
                  <img
                    src={pb.files.getUrl(item, item.avatar)}
                    alt={`Foto de ${item.customer_name}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c59b5f]/30 group-hover:border-[#c59b5f] transition-all duration-300 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#c59b5f]/10 text-[#c59b5f] border-2 border-[#c59b5f]/30 flex items-center justify-center font-bold text-lg transition-all duration-300">
                    {item.customer_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#c59b5f] transition-colors duration-300">{item.customer_name}</h4>
                  {item.city && <p className="text-[11px] text-gray-400 font-light tracking-wide mt-0.5">{item.city}</p>}
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Boutique black & gold navigation controls */}
      <div className="flex justify-center gap-4 mt-10">
        <CarouselPrevious className="static transform-none bg-[#121212] hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f]/30 shadow-md transition-all duration-300 w-11 h-11 rounded-full flex items-center justify-center" />
        <CarouselNext className="static transform-none bg-[#121212] hover:bg-[#c59b5f] text-[#c59b5f] hover:text-black border border-[#c59b5f]/30 shadow-md transition-all duration-300 w-11 h-11 rounded-full flex items-center justify-center" />
      </div>
    </Carousel>
  );
}