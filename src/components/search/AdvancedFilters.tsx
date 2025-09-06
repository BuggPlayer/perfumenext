'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedFiltersProps {
  showFilters?: boolean;
  onToggleFilters?: () => void;
  onChange?: (filters: Partial<FiltersState>) => void;
  onClearAll?: () => void;
  categories?: string[];
  brands?: string[];
}

export interface FiltersState {
  category: string;
  brand: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  showFilters = true,
  onToggleFilters,
  onChange,
  onClearAll,
  categories = [],
  brands = [],
}) => {
  const [expanded, setExpanded] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggle = (key: keyof typeof expanded) => setExpanded(s => ({ ...s, [key]: !s[key] }));

  const change = (patch: Partial<FiltersState>) => onChange?.(patch);

  return (
    <div className="w-full lg:w-72">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
        </div>
        {onToggleFilters && (
          <button className="text-sm text-gray-600 hover:text-gray-900 lg:hidden" onClick={onToggleFilters}>
            {showFilters ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {/* Category */}
      <section className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <header className="flex items-center justify-between px-3 py-2 bg-gray-50">
          <span className="text-sm font-medium">Category</span>
          <button className="p-1" onClick={() => toggle('category')} aria-label="Toggle category">
            {expanded.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </header>
        {expanded.category && (
          <div className="p-3 space-y-2">
            <button className="text-sm text-gray-600 hover:text-gray-900" onClick={() => change({ category: '' })}>All</button>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(c => (
                <button key={c} className="text-left text-sm px-2 py-1 rounded hover:bg-gray-50" onClick={() => change({ category: c })}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Brand */}
      <section className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <header className="flex items-center justify-between px-3 py-2 bg-gray-50">
          <span className="text-sm font-medium">Brand</span>
          <button className="p-1" onClick={() => toggle('brand')} aria-label="Toggle brand">
            {expanded.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </header>
        {expanded.brand && (
          <div className="p-3 space-y-2 max-h-44 overflow-auto">
            <button className="text-sm text-gray-600 hover:text-gray-900" onClick={() => change({ brand: '' })}>All</button>
            {brands.map(b => (
              <button key={b} className="block w-full text-left text-sm px-2 py-1 rounded hover:bg-gray-50" onClick={() => change({ brand: b })}>
                {b}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Price */}
      <section className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <header className="flex items-center justify-between px-3 py-2 bg-gray-50">
          <span className="text-sm font-medium">Price</span>
          <button className="p-1" onClick={() => toggle('price')} aria-label="Toggle price">
            {expanded.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </header>
        {expanded.price && (
          <div className="p-3 grid grid-cols-2 gap-2 text-sm">
            {[ [0,50], [50,100], [100,200], [200,500], [500,10000] ].map(([min,max]) => (
              <button key={`${min}-${max}`} className="px-2 py-1 rounded hover:bg-gray-50" onClick={() => change({ priceRange: [min,max] as [number,number] })}>
                {min === 0 ? `Under $${max}` : max === 10000 ? `Over $${min}` : `$${min} - $${max}`}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Rating */}
      <section className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <header className="flex items-center justify-between px-3 py-2 bg-gray-50">
          <span className="text-sm font-medium">Rating</span>
          <button className="p-1" onClick={() => toggle('rating')} aria-label="Toggle rating">
            {expanded.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </header>
        {expanded.rating && (
          <div className="p-3 grid grid-cols-3 gap-2 text-sm">
            {[4,3,2,1].map(r => (
              <button key={r} className="px-2 py-1 rounded hover:bg-gray-50" onClick={() => change({ rating: r })}>
                {r}+★
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Availability */}
      <section className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <header className="flex items-center justify-between px-3 py-2 bg-gray-50">
          <span className="text-sm font-medium">Availability</span>
          <button className="p-1" onClick={() => toggle('availability')} aria-label="Toggle availability">
            {expanded.availability ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </header>
        {expanded.availability && (
          <div className="p-3 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" onChange={(e) => change({ inStock: e.target.checked })} />
              In stock only
            </label>
          </div>
        )}
      </section>

      <div className="flex items-center justify-between mt-4">
        <button className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1" onClick={onClearAll}>
          <X className="w-4 h-4" /> Clear all
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;


