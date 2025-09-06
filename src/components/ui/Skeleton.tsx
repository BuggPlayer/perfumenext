'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  className?: string;
  animate?: boolean;
}

const toSize = (value?: number | string) => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
  animate = true,
}) => {
  const style: React.CSSProperties = {
    width: toSize(width),
    height: toSize(height),
  };

  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'bg-gray-200/70 dark:bg-gray-700/40',
        animate && 'animate-pulse',
        variantClasses[variant],
        className,
      )}
      style={style}
    />
  );
};

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className }) => {
  return (
    <div className={cn('border border-gray-200 rounded-xl p-4 bg-white', className)}>
      <div className="w-full aspect-[4/3] mb-4">
        <Skeleton variant="rounded" className="w-full h-full" />
      </div>
      <Skeleton variant="text" className="w-3/4 h-5 mb-2" />
      <Skeleton variant="text" className="w-1/2 h-4 mb-4" />
      <div className="flex items-center gap-3">
        <Skeleton variant="rectangular" className="h-10 w-24" />
        <Skeleton variant="rectangular" className="h-10 w-10" />
      </div>
    </div>
  );
};

interface SkeletonProductGridProps {
  items?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}

const SkeletonProductGrid: React.FC<SkeletonProductGridProps> = ({ items = 8, columns = 4, className }) => {
  const cols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns];

  return (
    <div className={cn('grid gap-6', cols, className)}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export { Skeleton, SkeletonCard, SkeletonProductGrid };


