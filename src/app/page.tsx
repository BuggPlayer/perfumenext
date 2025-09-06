'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
    </Layout>
  );
}
