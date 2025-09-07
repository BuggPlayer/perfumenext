'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { demoProducts } from '@/data/demoData';
import { Product } from '@/store/slices/productSlice';
import ProductDetails from '@/components/products/ProductDetails';
import ProductGrid from '@/components/products/ProductGrid';
import Layout from '@/components/layout/Layout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundProduct = demoProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        // Get related products (same category or brand)
        const related = demoProducts
          .filter(p => p.id !== productId && (p.category === foundProduct.category || p.brand === foundProduct.brand))
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-primary-600 transition-colors">Products</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary-600 transition-colors">{product.category}</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="mb-16">
          <ProductDetails product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You Might Also Like</h2>
              <p className="text-gray-600">Discover more fragrances from {product.brand} and similar categories</p>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}

        {/* Product Reviews Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h2>
            <p className="text-gray-600">See what others are saying about {product.name}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Reviews */}
            {[
              {
                name: 'Sarah M.',
                rating: 5,
                date: '2 days ago',
                comment: 'Absolutely love this fragrance! It’s become my signature scent. Long-lasting and sophisticated.'
              },
              {
                name: 'Michael R.',
                rating: 4,
                date: '1 week ago',
                comment: 'Great quality perfume. The scent is exactly as described. Would definitely recommend!'
              },
              {
                name: 'Emma L.',
                rating: 5,
                date: '2 weeks ago',
                comment: 'Perfect for special occasions. The packaging is beautiful and the scent is divine.'
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-primary-500 fill-current' : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-primary-500 text-black font-medium rounded-lg hover:bg-primary-600 transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
