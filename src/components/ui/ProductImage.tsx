import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

export interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
  showFallback?: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className,
  fallbackIcon = <ImageIcon className="w-8 h-8 text-gray-400" />,
  showFallback = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (showFallback || imageError) {
    return (
      <div className={cn('bg-gray-100 flex items-center justify-center rounded-lg', className)}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover rounded-lg transition-opacity duration-300',
          imageLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default ProductImage;
