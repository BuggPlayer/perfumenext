'use client';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';
import { cn } from '@/lib/utils';

type LoaderVariant = 'inline' | 'block' | 'overlay';
type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

interface ApiLoaderProps {
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  loadingText?: string;
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  children?: React.ReactNode;
}

const sizeToSpinner: Record<LoaderSize, 'sm' | 'md' | 'lg' | 'xl'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const ApiLoader: React.FC<ApiLoaderProps> = ({
  isLoading,
  error,
  onRetry,
  loadingText = 'Loading...'
  ,
  variant = 'block',
  size = 'md',
  className,
  children,
}) => {
  if (isLoading) {
    const content = (
      <div className={cn('flex items-center justify-center gap-3', variant !== 'inline' && 'py-8')}>
        <LoadingSpinner size={sizeToSpinner[size]} />
        <span className="text-sm text-gray-600">{loadingText}</span>
      </div>
    );

    if (variant === 'overlay') {
      return (
        <div className={cn('relative', className)}>
          {children}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            {content}
          </div>
        </div>
      );
    }

    return <div className={className}>{content}</div>;
  }

  if (error) {
    const errorNode = (
      <div className={cn('flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3', variant !== 'inline' && 'my-2')}>
        <p className="text-sm text-red-800 truncate">{error}</p>
        {onRetry && (
          <Button size="sm" variant="outline" onClick={onRetry} className="border-red-300 text-red-700 hover:bg-red-100">
            Retry
          </Button>
        )}
      </div>
    );

    if (variant === 'overlay') {
      return (
        <div className={cn('relative', className)}>
          {children}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            {errorNode}
          </div>
        </div>
      );
    }

    return <div className={className}>{errorNode}</div>;
  }

  return <div className={className}>{children}</div>;
};

export default ApiLoader;


