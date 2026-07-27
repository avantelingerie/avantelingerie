import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: 1,
    name: "Conjuntos",
    url: "/categorias/conjuntos",
    image: "https://images.unsplash.com/photo-1701017718943-996aa586e955?w=800&q=80",
    alt: "Conjuntos de lingerie"
  },
  {
    id: 2,
    name: "Calcinhas",
    url: "/categorias/calcinhas",
    image: "https://images.unsplash.com/photo-1700243475039-cd422f8d596a?w=800&q=80",
    alt: "Calcinhas e cuecas"
  },
  {
    id: 3,
    name: "Bodys",
    url: "/categorias/bodys",
    image: "https://images.unsplash.com/photo-1660362407454-2b6b2a302a7a?w=800&q=80",
    alt: "Bodys femininos"
  },
  {
    id: 4,
    name: "Fitness",
    url: "/categorias/fitness",
    image: "https://images.unsplash.com/photo-1646909876562-9a00dab98e65?w=800&q=80",
    alt: "Roupas fitness"
  },
  {
    id: 5,
    name: "Croppeds",
    url: "/categorias/croppeds",
    image: "https://images.unsplash.com/photo-1590902939100-037016873ead?w=800&q=80",
    alt: "Croppeds e tops curtos"
  },
  {
    id: 6,
    name: "Camisola",
    url: "/categorias/camisola",
    image: "https://images.unsplash.com/photo-1594632019379-421c5c70bf54?w=800&q=80",
    alt: "Camisolas e pijamas"
  }
];

export default function CategoryCarousel({ className }) {
  return (
    <div className={cn("w-full relative", className)}>
      <Carousel
        opts={{
          align: "start",
          loop: false,
          dragFree: true,
        }}
        className="w-full"
      >
        {/* Increased gap to 24px (pl-6 and -ml-6) */}
        <CarouselContent className="-ml-6">
          {categories.map((category) => (
            <CarouselItem 
              key={category.id} 
              className="pl-6 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <a 
                href={category.url}
                className="group block p-4 md:p-5 rounded-2xl bg-card border border-light shadow-subtle-sm hover:shadow-subtle-md hover:-translate-y-1 transition-smooth"
              >
                <div className="overflow-hidden rounded-xl aspect-[4/5] relative bg-muted">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="pt-5 pb-2">
                  <h3 className="text-foreground group-hover:text-primary text-xl md:text-2xl font-serif text-center transition-smooth">
                    {category.name}
                  </h3>
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Desktop Navigation Arrows - Refined styling */}
        <div className="hidden lg:block">
          <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border border-light text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-subtle-sm w-12 h-12 z-40 transition-smooth" />
          <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm border border-light text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-subtle-sm w-12 h-12 z-40 transition-smooth" />
        </div>
      </Carousel>
    </div>
  );
}