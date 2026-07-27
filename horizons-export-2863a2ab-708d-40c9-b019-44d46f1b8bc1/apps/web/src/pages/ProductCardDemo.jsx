import React from 'react';
import { Helmet } from 'react-helmet';
import ProductCard from '@/components/ProductCard.jsx';
import { toast } from 'sonner';

export default function ProductCardDemo() {
  const handleFavoriteToggle = (id, isFavorite) => {
    toast(isFavorite ? 'Added to favorites' : 'Removed from favorites');
  };

  const handleComprarAgora = (produto) => {
    toast(`Added ${produto.nome_produto} to cart`);
  };

  // Variant 1: Full product with all fields populated
  const fullProduct = {
    id: 1,
    nome_produto: 'Conjunto Sensual Renda Francesa Premium',
    categoria: 'Conjuntos',
    referencia_produto: 'ML2024-001',
    imagem_produto: 'https://images.unsplash.com/photo-1583846112988-f5d129c8e9e5?w=400&h=533&fit=crop',
    badge_desconto: 25,
    favorito: false,
    nota: 4.5,
    quantidade_avaliacoes: 127,
    cores_disponiveis: ['#FF1744', '#000000', '#FFFFFF', '#9C27B0', '#E91E63', '#F06292', '#C2185B'],
    preco_atacado: 45.90,
    preco_antigo: 89.90,
    preco_varejo: 67.43,
    parcelas: 6,
    vendidos_semana: 143,
    estoque_restante: 8
  };

  // Variant 2: Minimal product (no discount, no ratings, no colors)
  const minimalProduct = {
    id: 2,
    nome_produto: 'Camisola Básica Conforto',
    categoria: 'Camisolas',
    referencia_produto: 'ML2024-002',
    imagem_produto: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=533&fit=crop',
    favorito: false,
    cores_disponiveis: [],
    preco_varejo: 39.90,
    parcelas: 3
  };

  // Variant 3: Mobile responsive (same as full but for mobile testing)
  const mobileProduct = {
    id: 3,
    nome_produto: 'Body Rendado Elegante com Detalhes em Cetim',
    categoria: 'Bodies',
    referencia_produto: 'ML2024-003',
    imagem_produto: 'https://images.unsplash.com/photo-1583846112988-f5d129c8e9e5?w=400&h=533&fit=crop',
    badge_desconto: 15,
    favorito: false,
    nota: 5,
    quantidade_avaliacoes: 89,
    cores_disponiveis: ['#000000', '#FFFFFF', '#9B1C3A'],
    preco_atacado: 52.90,
    preco_antigo: 79.90,
    preco_varejo: 67.92,
    parcelas: 4,
    vendidos_semana: 67,
    estoque_restante: 5
  };

  // Variant 4: Favorite toggled state
  const favoriteProduct = {
    id: 4,
    nome_produto: 'Calcinha Fio Dental Renda',
    categoria: 'Calcinhas',
    referencia_produto: 'ML2024-004',
    imagem_produto: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&h=533&fit=crop',
    badge_desconto: 30,
    favorito: true,
    nota: 4,
    quantidade_avaliacoes: 234,
    cores_disponiveis: ['#FF1744', '#000000', '#FFFFFF', '#9C27B0'],
    preco_atacado: 15.90,
    preco_antigo: 29.90,
    preco_varejo: 20.93,
    parcelas: 2,
    vendidos_semana: 289,
    estoque_restante: 3
  };

  // Variant 5: Out of stock state
  const outOfStockProduct = {
    id: 5,
    nome_produto: 'Sutiã Push-Up Renda Floral',
    categoria: 'Sutiãs',
    referencia_produto: 'ML2024-005',
    imagem_produto: 'https://images.unsplash.com/photo-1583846112988-f5d129c8e9e5?w=400&h=533&fit=crop',
    badge_desconto: 20,
    favorito: false,
    nota: 4.8,
    quantidade_avaliacoes: 156,
    cores_disponiveis: ['#9B1C3A', '#000000', '#FFFFFF'],
    preco_atacado: 38.90,
    preco_antigo: 69.90,
    preco_varejo: 55.92,
    parcelas: 5,
    vendidos_semana: 198,
    estoque_restante: 0
  };

  return (
    <>
      <Helmet>
        <title>Product Card Demo - Mimo Lingerie</title>
        <meta name="description" content="Showcase of Mimo Lingerie product card component variants" />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Mimo Lingerie Product Cards
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Demonstração dos componentes de produto com diferentes variações e estados
            </p>
          </div>

          <div className="space-y-16">
            {/* Variant 1: Full Product */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                1. Full product with all fields
              </h2>
              <div className="flex justify-center">
                <ProductCard
                  produto={fullProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
              </div>
            </section>

            {/* Variant 2: Minimal Product */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                2. Minimal product (no discount, ratings, or colors)
              </h2>
              <div className="flex justify-center">
                <ProductCard
                  produto={minimalProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
              </div>
            </section>

            {/* Variant 3: Mobile Responsive */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                3. Mobile responsive view
              </h2>
              <div className="flex justify-center">
                <div className="w-full max-w-[320px]">
                  <ProductCard
                    produto={mobileProduct}
                    onFavoriteToggle={handleFavoriteToggle}
                    onComprarAgora={handleComprarAgora}
                  />
                </div>
              </div>
            </section>

            {/* Variant 4: Favorite Toggled */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                4. Favorite toggled state
              </h2>
              <div className="flex justify-center">
                <ProductCard
                  produto={favoriteProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
              </div>
            </section>

            {/* Variant 5: Out of Stock */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                5. Out of stock state
              </h2>
              <div className="flex justify-center">
                <ProductCard
                  produto={outOfStockProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
              </div>
            </section>

            {/* Grid View */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Grid layout example
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard
                  produto={fullProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
                <ProductCard
                  produto={mobileProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
                <ProductCard
                  produto={favoriteProduct}
                  onFavoriteToggle={handleFavoriteToggle}
                  onComprarAgora={handleComprarAgora}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}