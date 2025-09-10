import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Carousel from '@/components/ui/Carousel';
import ProductImage from '@/components/ui/ProductImage';

const HeroShowcase: React.FC = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Mobile: horizontally scrollable cards */}
      <div className="lg:hidden">
        <Carousel ariaLabel="Hero showcase" autoplayMs={6000} pauseOnHover showProgress showArrows itemWidthClassName="w-[100vw]">
          {/* Big promo */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-200)] text-[var(--color-dark)] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[var(--primary-600)] text-white text-xs font-semibold">NEWS</span>
              <span className="text-sm font-medium text-[var(--primary-800)]">Free Shipping on Orders Above $50!</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              Scents you'll love.
              <br />
              Prices you'll trust.
            </h2>
            <p className="text-[var(--color-text-muted)] font-semibold mb-6">Starts from <span className="text-2xl text-[var(--color-dark)]">$4.90</span></p>
            <Link href="/products">
              <Button className="bg-[var(--color-dark)] text-[var(--color-light)] hover:bg-[var(--secondary-900)]">Learn more</Button>
            </Link>
            <div className="absolute -bottom-6 right-0 w-40 h-40 sm:w-56 sm:h-56 opacity-80">
              <ProductImage src="/images/placeholder.jpg" alt="Perfume model" className="w-full h-full rounded-none" />
            </div>
          </div>

          {/* Best products */}
          <div className="rounded-3xl bg-[var(--secondary-100)] p-6 sm:p-8 text-[var(--secondary-900)] relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-2">Best
              <br />products
            </h3>
            <Link href="/products?filter=best=true" className="text-[var(--secondary-800)] underline underline-offset-4">View more →</Link>
            <div className="absolute right-4 bottom-4 w-28 h-28 sm:w-32 sm:h-32">
              <ProductImage src="/globe.svg" alt="Best products" className="w-full h-full bg-transparent" showFallback />
            </div>
          </div>

          {/* Discounts */}
          <div className="rounded-3xl bg-[var(--accent-100)] p-6 sm:p-8 text-[var(--accent-900)] relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-2">20%
              <br />discounts
            </h3>
            <Link href="/products?filter=deals=true" className="text-[var(--accent-800)] underline underline-offset-4">View more →</Link>
            <div className="absolute right-4 bottom-4 w-28 h-28 sm:w-32 sm:h-32">
              <ProductImage src="/window.svg" alt="Discounts" className="w-full h-full bg-transparent" showFallback />
            </div>
          </div>
        </Carousel>
      </div>

      {/* Desktop: two-column layout with stacked side cards */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        {/* Left big banner */}
        <div className="col-span-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-200)] text-[var(--color-dark)] px-10 py-12 min-h-[420px] flex items-center">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[var(--primary-600)] text-white text-xs font-semibold">NEWS</span>
                <span className="text-sm font-medium text-[var(--primary-800)]">Free Shipping on Orders Above $50!</span>
              </div>
              <h2 className="text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
                Scents you'll love.
                <br />
                Prices you'll trust.
              </h2>
              <p className="text-[var(--color-text-muted)] font-semibold mb-8">Starts from <span className="text-3xl text-[var(--color-dark)]">$4.90</span></p>
              <Link href="/products">
                <Button className="bg-[var(--color-dark)] text-[var(--color-light)] hover:bg-[var(--secondary-900)] px-8 py-4 text-lg">Learn more</Button>
              </Link>
            </div>
            <div className="absolute bottom-0 right-6 w-[360px] h-[360px]">
              <ProductImage src="/images/placeholder.jpg" alt="Perfume model" className="w-full h-full rounded-none" />
            </div>
          </div>
        </div>

        {/* Right column cards */}
        <div className="col-span-4 grid grid-rows-2 gap-6">
          <div className="relative rounded-3xl bg-[var(--secondary-100)] p-8 text-[var(--secondary-900)] overflow-hidden">
            <h3 className="text-3xl font-bold leading-snug mb-4">Best
              <br />products
            </h3>
            <Link href="/products?filter=best=true" className="text-[var(--secondary-800)] underline underline-offset-4">View more →</Link>
            <div className="absolute right-6 bottom-6 w-36 h-36">
              <ProductImage src="/globe.svg" alt="Best products" className="w-full h-full bg-transparent" showFallback />
            </div>
          </div>

          <div className="relative rounded-3xl bg-[var(--accent-100)] p-8 text-[var(--accent-900)] overflow-hidden">
            <h3 className="text-3xl font-bold leading-snug mb-4">20%
              <br />discounts
            </h3>
            <Link href="/products?filter=deals=true" className="text-[var(--accent-800)] underline underline-offset-4">View more →</Link>
            <div className="absolute right-6 bottom-6 w-36 h-36">
              <ProductImage src="/window.svg" alt="Discounts" className="w-full h-full bg-transparent" showFallback />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcase;


