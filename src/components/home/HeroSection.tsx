import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-dark)] via-gray-900 to-[var(--color-dark)] text-[var(--color-light)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* subtle primary tinted overlay instead of hardcoded yellow svg */}
        <div className="absolute inset-0 bg-primary-500/5"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[var(--color-light)]">Discover Your</span>
            <br />
            <span className="text-primary-400 bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              Signature Scent
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the world’s finest fragrances from luxury brands. 
            Find your perfect perfume and make every moment unforgettable.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/products">
              <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-black font-bold px-8 py-4 text-lg shadow-2xl">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-black font-bold px-8 py-4 text-lg">
                Explore Categories
              </Button>
            </Link>
            <Link href="/brands">
              <Button variant="outline" size="lg" className="border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-black font-bold px-8 py-4 text-lg">
                View Brands
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400 text-sm">Authentic luxury fragrances</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Free Shipping</h3>
              <p className="text-gray-400 text-sm">On orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400 text-sm">100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;

