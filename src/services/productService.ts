// src/services/productService.ts
import { api } from './apiClient';
import type { Product } from '@/store/slices/productSlice';

export interface ProductQuery {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: { field: string; order: 'asc' | 'desc' };
  page?: number;
  limit?: number;
}

export const productService = {
  async getProducts(query?: ProductQuery): Promise<Product[]> {
    
    const params: Record<string, unknown> = { ...query };
    if (query?.sort) {
      params.sortField = query.sort.field;
      params.sortOrder = query.sort.order;
      delete params.sort;
    }

    const res = await api.get('/api/products', { params });
    // Adjust mapping according to backend shape if needed
    const data = (res.data as { data?: Product[] } | Product[]);
    return Array.isArray(data) ? data as Product[] : (data.data ?? []);
  },

  async getProductById(id: string): Promise<Product> {
    const res = await api.get(`/api/products/${id}`);
    return (res.data?.data || res.data) as Product;
  },
};
