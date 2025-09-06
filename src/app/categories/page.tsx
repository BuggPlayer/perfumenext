'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setProducts, setFilters, applyFilters } from '@/store/slices/productSlice';
import { demoProducts, categories } from '@/data/demoData';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Sparkles, Users, Gift, Star, Zap, Crown } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts } = useAppSelector(state => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    dispatch(setProducts(demoProducts));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(setFilters({ category: selectedCategory }));
      dispatch(applyFilters());
    } else {
      dispatch(setFilters({ category: '' }));
      dispatch(applyFilters());
    }
  }, [selectedCategory, dispatch]);

  const categoryIcons = {
    'Women': <Sparkles className="w-8 h-8 text-pink-500" />,
    'Men': <Zap className="w-8 h-8 text-blue-500" />,
    'Unisex': <Users className="w-8 h-8 text-purple-500" />,
    'Niche': <Crown className="w-8 h-8 text-primary-500" />,
    'Limited Edition': <Gift className="w-8 h-8 text-red-500" />,
  };

  const getCategoryDescription = (category: string) => {
    const descriptions = {
      'Women': 'Elegant and sophisticated fragrances designed for the modern woman',
      'Men': 'Bold and masculine scents that embody strength and confidence',
      'Unisex': 'Versatile fragrances that transcend traditional gender boundaries',
      'Niche': 'Exclusive and artisanal perfumes from boutique creators',
      'Limited Edition': 'Rare and collectible fragrances with unique compositions',
    };
    return descriptions[category as keyof typeof descriptions] || 'Discover amazing fragrances in this category';
  };

  const getCategoryCount = (category: string) => {
    if (category === 'All') return demoProducts.length;
    return demoProducts.filter(product => product.category === category).length;
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
            <p className="text-gray-600">Explore our fragrances by category</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              if (category === 'All') return null;
              const isSelected = selectedCategory === category;
              
              return (
                <Card
                  key={category}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setSelectedCategory(isSelected ? '' : category)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {categoryIcons[category as keyof typeof categoryIcons] || <Star className="w-8 h-8 text-gray-500" />}
                        <div>
                          <CardTitle className="text-lg">{category}</CardTitle>
                          <p className="text-sm text-gray-500">{getCategoryCount(category)} products</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      {getCategoryDescription(category)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Products Section */}
          {selectedCategory && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory} Fragrances
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products in {selectedCategory}
                </p>
              </div>

              <ProductGrid
                products={filteredProducts}
                columns={4}
                emptyMessage={`No products found in ${selectedCategory} category`}
              />
            </div>
          )}

          {/* All Products Section */}
          {!selectedCategory && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All Fragrances</h2>
                <p className="text-gray-600">
                  Browse our complete collection of premium perfumes
                </p>
              </div>

              <ProductGrid
                products={demoProducts}
                columns={4}
                emptyMessage="No products available"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
