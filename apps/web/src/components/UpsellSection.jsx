import React, { useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import ProductCard from '@/components/ProductCard.jsx';
import { Skeleton } from '@/components/ui/skeleton.jsx';

export default function UpsellSection({ currentCartTotal, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random or highly rated products for upsell
    pb.collection('products').getList(1, 4, { 
      sort: '-created', 
      filter: 'stock > 0',
      $autoCancel: false 
    })
    .then(res => {
      setProducts(res.items);
      setLoading(false);
    })
    .catch(err => {
      console.error('Failed to fetch upsell products', err);
      // Fallback gracefully without breaking layout
      setLoading(false);
    });
  }, [currentCartTotal]);

  if (loading) {
    return (
      <section className="mt-16 pt-12 border-t border-primary/10">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Aproveite e leve junto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[1,2,3,4].map(i => <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />)}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-primary/10">
      <h2 className="text-2xl font-bold text-[#3A2E2A] mb-8 text-center font-heading">
        Aproveite e leve junto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map(p => (
          <ProductCard 
            key={p.id} 
            produto={p} 
            onAddToCart={(produto) => onAddToCart(produto, 1, { color: 'Padrão', size: 'M' })} 
          />
        ))}
      </div>
    </section>
  );
}