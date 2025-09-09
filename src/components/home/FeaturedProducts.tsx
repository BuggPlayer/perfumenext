import React from 'react';
import Link from 'next/link';
import ProductCard from '../products/ProductCard';
import Button from '../ui/Button';
import { Product } from '@/store/slices/productSlice';
// import Carousel from '../ui/Carousel';

interface FeaturedProductsProps {
  products?: Product[];
  isLoading?: boolean;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products = [], isLoading }) => {
  // const featuredProducts = (products?.length ? products : []).filter(p => p.featured).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
                       <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
                 <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                   Discover our most popular and highly-rated fragrances, carefully selected for their exceptional quality and customer satisfaction.
                 </p>
                 <Link href="/products" className="inline-block">
                   <Button variant="outline" size="lg">
                     View All Products
                   </Button>
                 </Link>
               </div>
        
        {/* Carousel removed per request; showing a responsive 8-product grid */}
        {isLoading ? null : (
          <div className="mt-2 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

