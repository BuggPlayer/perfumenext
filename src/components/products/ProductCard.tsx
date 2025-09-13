import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { Product } from '@/store/slices/productSlice';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Button from '../ui/Button';
import ProductImage from '../ui/ProductImage';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className={`group bg-[var(--bg-surface)] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--border-faded)] ${className}`}>
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[var(--bg-surface)]">
        <Link href={`/products/${product.id}`}>
          <ProductImage
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${
            isInWishlist
              ? 'bg-primary-500 text-black shadow-lg'
              : 'bg-[var(--bg-surface)] text-[var(--text-muted)] hover:bg-primary-transparent hover:text-primary-600'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
        
        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-primary-500 text-black text-xs font-bold px-2 py-1 rounded">
            -{calculateDiscount(product.originalPrice, product.price)}%
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-muted text-inverse text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-xs text-[var(--text-muted)] font-medium mb-1">{product.brand}</p>
        
        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors text-sm cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-primary-500 fill-current'
                    : 'text-textColor-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-textColor-muted ml-1">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-base font-bold text-[var(--text-primary)]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Size */}
        <p className="text-xs text-[var(--text-muted)] mb-3">{product.size}</p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full sm:w-auto border border-primary-500"
            size="sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          
          <Link href={`/products/${product.id}`} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              size="sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
