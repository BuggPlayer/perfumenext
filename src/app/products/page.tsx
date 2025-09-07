'use client';

import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setFilters, applyFilters, fetchProducts } from '@/store/slices/productSlice';
import { categories, brands } from '@/data/demoData';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts, filters } = useAppSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
console.log('filteredProducts', filteredProducts);
  useEffect(() => {
    console.log('fetching products');
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);

  const handleFilterChange = (filterType: string, value: string | number | [number, number] | boolean) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const clearFilters = () => {
    dispatch(setFilters({
      category: '',
      priceRange: [0, 1000],
      brand: '',
      rating: 0
    }));
    setSearchTerm('');
  };

  const filteredBySearch = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
    
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">Discover our complete collection of premium fragrances</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <ProductFilters
              filters={{
                category: filters.category,
                brand: filters.brand,
                priceRange: filters.priceRange,
                fragranceNotes: [],
                inStock: false,
                rating: filters.rating,
              }}
              onFiltersChange={(next) => {
                if ('category' in next) handleFilterChange('category', next.category);
                if ('brand' in next) handleFilterChange('brand', next.brand);
                if ('priceRange' in next) handleFilterChange('priceRange', next.priceRange as [number, number]);
                if ('rating' in next) handleFilterChange('rating', next.rating as number);
                if ('inStock' in next) handleFilterChange('inStock', next.inStock as boolean);
              }}
              onClearFilters={clearFilters}
              totalProducts={filteredBySearch.length}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredBySearch.length} products
                </p>
              </div>

              {/* Products Grid */}
              <ProductGrid
                products={filteredBySearch}
                columns={4}
                emptyMessage="Try adjusting your filters or search terms"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

