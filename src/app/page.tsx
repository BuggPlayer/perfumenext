'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts } from '@/store/slices/productSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector(s => s.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);
console.log('products---1', products);
  return (
    <Layout>
      <HeroCarousel />
      <FeaturedProducts products={products} isLoading={isLoading} />
    </Layout>
  );
}
