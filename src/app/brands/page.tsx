'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setProducts, setFilters, applyFilters } from '@/store/slices/productSlice';
import { demoProducts, brands } from '@/data/demoData';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Star, Award, Crown, Gem, Zap, Heart } from 'lucide-react';

const BrandsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts } = useAppSelector(state => state.products);
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  useEffect(() => {
    dispatch(setProducts(demoProducts));
  }, [dispatch]);

  useEffect(() => {
    if (selectedBrand) {
      dispatch(setFilters({ brand: selectedBrand }));
      dispatch(applyFilters());
    } else {
      dispatch(setFilters({ brand: '' }));
      dispatch(applyFilters());
    }
  }, [selectedBrand, dispatch]);

  const brandIcons = {
    'Chanel': <Crown className="w-8 h-8 text-primary-500" />,
    'Dior': <Award className="w-8 h-8 text-blue-500" />,
    'Lancôme': <Heart className="w-8 h-8 text-pink-500" />,
    'Yves Saint Laurent': <Star className="w-8 h-8 text-red-500" />,
    'Giorgio Armani': <Gem className="w-8 h-8 text-gray-500" />,
    'Carolina Herrera': <Zap className="w-8 h-8 text-purple-500" />,
  };

  const getBrandDescription = (brand: string) => {
    const descriptions = {
      'Chanel': 'Luxury fashion house known for timeless elegance and sophistication',
      'Dior': 'French luxury goods company with a rich heritage in haute couture',
      'Lancôme': 'Premium beauty brand specializing in skincare and fragrances',
      'Yves Saint Laurent': 'Revolutionary fashion house that redefined modern luxury',
      'Giorgio Armani': 'Italian fashion empire known for clean lines and understated elegance',
      'Carolina Herrera': 'Venezuelan-American fashion designer with a passion for luxury',
    };
    return descriptions[brand as keyof typeof descriptions] || 'Discover amazing fragrances from this prestigious brand';
  };

  const getBrandCount = (brand: string) => {
    if (brand === 'All') return demoProducts.length;
    return demoProducts.filter(product => product.brand === brand).length;
  };

  const getBrandProducts = (brand: string) => {
    if (brand === 'All') return demoProducts;
    return demoProducts.filter(product => product.brand === brand);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brands</h1>
            <p className="text-gray-600">Explore fragrances from the world\'s most prestigious brands</p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {brands.map((brand) => {
              if (brand === 'All') return null;
              const isSelected = selectedBrand === brand;
              const brandProducts = getBrandProducts(brand);
              const avgRating = brandProducts.length > 0 
                ? (brandProducts.reduce((sum, p) => sum + p.rating, 0) / brandProducts.length).toFixed(1)
                : 0;
              
              return (
                <Card
                  key={brand}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setSelectedBrand(isSelected ? '' : brand)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {brandIcons[brand as keyof typeof brandIcons] || <Star className="w-8 h-8 text-gray-500" />}
                        <div>
                          <CardTitle className="text-lg">{brand}</CardTitle>
                          <p className="text-sm text-gray-500">{getBrandCount(brand)} products</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-3 h-3 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-3">
                      {getBrandDescription(brand)}
                    </p>
                    {brandProducts.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Star className="w-4 h-4 text-primary-400 fill-current" />
                        <span className="text-gray-700">{avgRating} average rating</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Products Section */}
          {selectedBrand && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedBrand} Fragrances
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products from {selectedBrand}
                </p>
              </div>

              <ProductGrid
                products={filteredProducts}
                columns={4}
                emptyMessage={`No products found from ${selectedBrand}`}
              />
            </div>
          )}

          {/* All Products Section */}
          {!selectedBrand && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All Brands</h2>
                <p className="text-gray-600">
                  Browse our complete collection from all prestigious brands
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

export default BrandsPage;
