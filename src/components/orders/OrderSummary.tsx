import React from 'react';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/store/slices/productSlice';
import ProductImage from '../ui/ProductImage';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  className?: string;
  showImages?: boolean;
  compact?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
  className = '',
  showImages = true,
  compact = false
}) => {
  if (compact) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2 text-primary-600" />
          Order Summary
        </h3>
        
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {showImages && (
                  <ProductImage
                    src={item.product.images[0] || '/images/placeholder.jpg'}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                  <p className="text-gray-500 text-xs">{item.product.brand} • Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium text-gray-900">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-900">{formatPrice(tax)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
            <span>Total</span>
            <span className="text-primary-600">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-3 text-primary-600" />
        Order Summary
      </h3>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            {showImages && (
              <ProductImage
                src={item.product.images[0] || '/images/placeholder.jpg'}
                alt={item.product.name}
                className="w-16 h-16 rounded-md object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.product.name}</h4>
              <p className="text-gray-600 text-sm">{item.product.brand}</p>
              <p className="text-gray-500 text-sm">Size: {item.product.size}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{formatPrice(item.price)}</p>
              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal ({items.length} items)</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">{formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="text-primary-600">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
