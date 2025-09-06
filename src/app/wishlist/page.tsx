'use client';

import React from 'react';
import { useAppSelector } from '@/store/hooks';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Heart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const { items: wishlistItems, totalItems } = useAppSelector(state => state.wishlist);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {totalItems > 0 
                ? `You have ${totalItems} item${totalItems > 1 ? 's' : ''} in your wishlist`
                : 'Your wishlist is empty'
              }
            </p>
          </div>

          {totalItems === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-4">
                Start adding your favorite perfumes to your wishlist
              </p>
              <a
                href="/products"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <ProductGrid
              products={wishlistItems}
              columns={4}
              emptyMessage="No products in your wishlist"
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
