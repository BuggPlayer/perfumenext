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

    const res = await api.get('/api/home/get-products', { params });
    const list = (res?.data?.products ?? []) as any[];

    const mapped: Product[] = list.map((p: any) => ({
      id: String(p._id ?? p.id ?? p.slug ?? Math.random().toString(36).slice(2)),
      name: String(p.name ?? ''),
      brand: String(p.brand ?? p.shopName ?? ''),
      description: String(p.description ?? ''),
      price: Number(p.price ?? 0),
      originalPrice: typeof p.originalPrice !== 'undefined' ? Number(p.originalPrice) : undefined,
      images: Array.isArray(p.images) ? p.images : [],
      category: String(p.category ?? ''),
      fragranceNotes: Array.isArray(p.fragranceNotes) ? p.fragranceNotes : [],
      size: String(p.size ?? '50ml'),
      inStock: typeof p.inStock === 'boolean' ? p.inStock : (typeof p.stock === 'number' ? p.stock > 0 : true),
      rating: Number(p.rating ?? 0),
      reviewCount: Number(p.reviewCount ?? 0),
      featured: Boolean(p.featured ?? false),
      bestSeller: Boolean(p.bestSeller ?? false),
      createdAt: p.createdAt ? String(p.createdAt) : undefined,
    }));

    return mapped;
  },

  async getProductById(id: string): Promise<Product> {
    const res = await api.get(`/api/products/${id}`);
    const p: any = res.data?.data ?? res.data ?? {};
    const mapped: Product = {
      id: String(p._id ?? p.id ?? p.slug ?? id),
      name: String(p.name ?? ''),
      brand: String(p.brand ?? p.shopName ?? ''),
      description: String(p.description ?? ''),
      price: Number(p.price ?? 0),
      originalPrice: typeof p.originalPrice !== 'undefined' ? Number(p.originalPrice) : undefined,
      images: Array.isArray(p.images) ? p.images : [],
      category: String(p.category ?? ''),
      fragranceNotes: Array.isArray(p.fragranceNotes) ? p.fragranceNotes : [],
      size: String(p.size ?? '50ml'),
      inStock: typeof p.inStock === 'boolean' ? p.inStock : (typeof p.stock === 'number' ? p.stock > 0 : true),
      rating: Number(p.rating ?? 0),
      reviewCount: Number(p.reviewCount ?? 0),
      featured: Boolean(p.featured ?? false),
      bestSeller: Boolean(p.bestSeller ?? false),
      createdAt: p.createdAt ? String(p.createdAt) : undefined,
    };
    return mapped;
  },
};
