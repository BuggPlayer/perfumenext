"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface CarouselProps {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
  autoplayMs?: number;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  showArrows?: boolean;
  itemWidthClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  itemClassName,
  ariaLabel = 'carousel',
  autoplayMs = 0,
  pauseOnHover = true,
  showProgress = true,
  showArrows = true,
  itemWidthClassName,
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  const slides = useMemo(() => React.Children.toArray(children), [children]);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const child = viewport.children.item(index) as HTMLElement | null;
    if (child) child.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const handlePrev = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scrollLeft = viewport.scrollLeft;
    const width = viewport.clientWidth;
    if (scrollLeft <= 0) {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      viewport.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      viewport.scrollTo({ left: Math.max(0, scrollLeft - width), behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scrollLeft = viewport.scrollLeft;
    const width = viewport.clientWidth;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    if (scrollLeft + width >= maxScroll - 8) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      viewport.scrollTo({ left: scrollLeft + width, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScroll = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const value = maxScroll > 0 ? viewport.scrollLeft / maxScroll : 0;
      setProgress(value);
    };
    onScroll();
    viewport.addEventListener('scroll', onScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!autoplayMs || autoplayMs <= 0) return;
    if (pauseOnHover && isHovering) return;

    const id = setInterval(() => {
      handleNext();
    }, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, pauseOnHover, isHovering]);

  return (
    <div className={clsx('relative', className)} aria-label={ariaLabel}>
      <div
        ref={viewportRef}
        className={clsx(
          'no-scrollbar overflow-x-auto overflow-y-hidden',
          'scroll-smooth',
          'snap-x snap-mandatory',
          'flex gap-4 md:gap-6',
          'pb-2 pr-4 md:pr-6'
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
     >
        {slides.map((child, idx) => (
          <div
            key={idx}
            className={clsx(
              'snap-center shrink-0',
              itemWidthClassName ?? 'w-[88%] sm:w-[60%] md:w-[45%] lg:w-[33%] xl:w-[25%]',
              itemClassName
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && (
        <>
          <button
            aria-label="Previous"
            className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white transition"
            onClick={handlePrev}
            type="button"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            aria-label="Next"
            className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg ring-1 ring-black/5 hover:bg-white transition"
            onClick={handleNext}
            type="button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Progress bar */}
      {showProgress && (
        <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-200"
            style={{ width: `${Math.max(5, progress * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;


