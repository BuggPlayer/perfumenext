"use client";

import React from 'react';
import Carousel from '@/components/ui/Carousel';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const slides = [
  {
    titleTop: 'Discover Your',
    titleAccent: 'Signature Scent',
    subtitle:
      "Experience the world's finest fragrances from luxury brands. Find your perfect perfume and make every moment unforgettable.",
    ctaPrimary: { href: '/products', label: 'Shop Now' },
    ctaSecondary: { href: '/categories', label: 'Explore Categories' },
    bgClass: 'from-black via-gray-900 to-gray-800',
  },
  {
    titleTop: 'Luxury Fragrances',
    titleAccent: 'For Every Mood',
    subtitle:
      'From fresh and floral to warm and spicy — explore curated collections tailored to your style.',
    ctaPrimary: { href: '/brands', label: 'View Brands' },
    ctaSecondary: { href: '/products?filter=bestSeller=true', label: 'Best Sellers' },
    bgClass: 'from-gray-900 via-black to-gray-900',
  },
  {
    titleTop: 'Exclusive',
    titleAccent: 'Seasonal Offers',
    subtitle:
      'Save on iconic scents with limited-time deals. Elevate your collection today.',
    ctaPrimary: { href: '/products?filter=deals=true', label: 'Shop Deals' },
    ctaSecondary: { href: '/wishlist', label: 'My Wishlist' },
    bgClass: 'from-black via-gray-800 to-black',
  },
];

const HeroCarousel: React.FC = () => {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-primary-500/5"></div>
      </div>

      <div className="relative container mx-auto px-4 py-10 md:py-12 lg:py-16">
        <Carousel
          ariaLabel="Hero carousel"
          autoplayMs={6000}
          pauseOnHover
          showProgress
          showArrows
          className=""
          itemWidthClassName="w-full"
          itemClassName=""
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br ${slide.bgClass}`}
            >
              {/* Decorative blobs */}
              <div className="absolute top-10 -right-8 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-primary-400/10 rounded-full blur-3xl"></div>

              <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-white">{slide.titleTop}</span>
                    <br />
                    <span className="text-primary-400 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                      {slide.titleAccent}
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={slide.ctaPrimary.href}>
                      <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-black font-bold px-8 py-4 text-lg shadow-2xl">
                        {slide.ctaPrimary.label}
                      </Button>
                    </Link>
                    <Link href={slide.ctaSecondary.href}>
                      <Button variant="outline" size="lg" className="border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-black font-bold px-8 py-4 text-lg">
                        {slide.ctaSecondary.label}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HeroCarousel;


