'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories, brands, fragranceNotes } from '@/data/demoData';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';

interface ProductFiltersProps {
  filters: {
    category: string;
    brand: string;
    priceRange: [number, number];
    fragranceNotes: string[];
    inStock: boolean;
    rating: number;
  };
  onFiltersChange: (filters: ProductFiltersProps['filters']) => void;
  onClearFilters: () => void;
  totalProducts: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalProducts
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    fragranceNotes: true,
    other: true
  });

  const priceRanges = [
    { label: 'Under $50', value: [0, 50] },
    { label: '$50 - $100', value: [50, 100] },
    { label: '$100 - $200', value: [100, 200] },
    { label: '$200 - $500', value: [200, 500] },
    { label: 'Over $500', value: [500, 10000] }
  ];

  const ratingOptions = [
    { label: '4+ Stars', value: 4 },
    { label: '3+ Stars', value: 3 },
    { label: '2+ Stars', value: 2 }
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType: keyof ProductFiltersProps['filters'], value: ProductFiltersProps['filters'][typeof filterType]) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({
      ...filters,
      priceRange: range
    });
  };

  const handleFragranceNoteToggle = (note: string) => {
    const currentNotes = filters.fragranceNotes;
    const newNotes = currentNotes.includes(note)
      ? currentNotes.filter(n => n !== note)
      : [...currentNotes, note];
    
    onFiltersChange({
      ...filters,
      fragranceNotes: newNotes
    });
  };

  const hasActiveFilters = () => {
    return (
      filters.category !== 'All' ||
      filters.brand !== 'All' ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 10000 ||
      filters.fragranceNotes.length > 0 ||
      filters.inStock ||
      filters.rating > 0
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden p-4 border-b border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
            {hasActiveFilters() && (
              <span className="bg-primary-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                Active
              </span>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className={cn(
        "lg:block",
        isOpen ? "block" : "hidden"
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <span className="text-sm text-gray-500">{totalProducts} products</span>
          </div>
          {hasActiveFilters() && (
            <Button
              onClick={onClearFilters}
              variant="outline"
              size="sm"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Filter Sections */}
        <div className="p-4 space-y-6">
          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h4 className="font-medium text-gray-900">Category</h4>
              {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h4 className="font-medium text-gray-900">Brand</h4>
              {expandedSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.brand && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="brand"
                      value={brand}
                      checked={filters.brand === brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h4 className="font-medium text-gray-900">Price Range</h4>
              {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.price && (
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]}
                      onChange={() => handlePriceRangeChange([range.value[0], range.value[1]])}
                      className="text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{range.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Fragrance Notes Filter */}
          <div>
            <button
              onClick={() => toggleSection('fragranceNotes')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h4 className="font-medium text-gray-900">Fragrance Notes</h4>
              {expandedSections.fragranceNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.fragranceNotes && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {fragranceNotes.map((note) => (
                  <label key={note} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters?.fragranceNotes?.includes(note)}
                      onChange={() => handleFragranceNoteToggle(note)}
                      className="text-primary-500 focus:ring-primary-500 rounded"
                    />
                    <span className="text-sm text-gray-700">{note}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Other Filters */}
          <div>
            <button
              onClick={() => toggleSection('other')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h4 className="font-medium text-gray-900">Other</h4>
              {expandedSections.other ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.other && (
              <div className="space-y-3">
                {/* In Stock Filter */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="text-primary-500 focus:ring-primary-500 rounded"
                  />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>

                {/* Rating Filter */}
                <div>
                  <p className="text-sm text-gray-700 mb-2">Minimum Rating</p>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={filters.rating === option.value}
                          onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                          className="text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
