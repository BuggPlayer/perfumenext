'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '@/store/slices/wishlistSlice';
import { Product } from '@/store/slices/productSlice';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import Button from '../ui/Button';
import ProductImage from '../ui/ProductImage';
import Badge from '../ui/Badge';

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector(state => state.wishlist);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const features = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure Payment',
      description: '100% secure checkout'
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="max-w-md mx-auto lg:mx-0">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <ProductImage
              src={product.images[selectedImage] || product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto max-w-md mx-auto lg:mx-0">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                }`}
              >
                <ProductImage
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Brand and Name */}
        <div>
          <p className="text-sm text-gray-500 font-medium mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? 'text-primary-500 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="success" className="text-sm">
                  -{calculateDiscount(product.originalPrice, product.price)}% OFF
                </Badge>
              </>
            )}
          </div>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-sm text-green-600 font-medium">
              You save {formatPrice(product.originalPrice - product.price)}
            </p>
          )}
        </div>

        {/* Size and Stock */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Size:</span>
            <span className="font-medium">{product.size}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Availability:</span>
            <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Fragrance Notes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Fragrance Notes</h3>
          <div className="flex flex-wrap gap-2">
            {product.fragranceNotes.map((note, index) => (
                              <Badge key={index} variant="default" className="text-sm">
                  {note}
                </Badge>
            ))}
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 hover:bg-gray-100 transition-colors"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <Button
              variant={isInWishlist ? 'primary' : 'outline'}
              onClick={handleWishlistToggle}
              size="lg"
              className="px-6"
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="lg" className="px-6">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                  {feature.icon}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
