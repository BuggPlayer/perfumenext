'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HeroCarousel from '@/components/home/HeroCarousel';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <Layout>
      <HeroCarousel />
      <FeaturedProducts />
    </Layout>
  );
}
