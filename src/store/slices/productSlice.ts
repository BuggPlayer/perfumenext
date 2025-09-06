import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  fragranceNotes: string[];
  size: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  createdAt?: string;
}

interface ProductState {
  products: Product[];
  featuredProducts: Product[];
  bestSellers: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    priceRange: [number, number];
    brand: string;
    rating: number;
  };
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  bestSellers: [],
  filteredProducts: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 1000],
    brand: '',
    rating: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featuredProducts = action.payload;
    },
    setBestSellers: (state, action: PayloadAction<Product[]>) => {
      state.bestSellers = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    applyFilters: (state) => {
      let filtered = state.products;
      
      if (state.filters.category) {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }
      
      if (state.filters.brand) {
        filtered = filtered.filter(product => product.brand === state.filters.brand);
      }
      
      if (state.filters.rating > 0) {
        filtered = filtered.filter(product => product.rating >= state.filters.rating);
      }
      
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      );
      
      state.filteredProducts = filtered;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setProducts, 
  setFeaturedProducts, 
  setBestSellers, 
  setSelectedProduct, 
  setFilters, 
  applyFilters, 
  setLoading, 
  setError 
} = productSlice.actions;

export default productSlice.reducer;

