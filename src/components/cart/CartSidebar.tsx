'use client';

import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { formatPrice } from '@/lib/utils';
import Button from '../ui/Button';
import ProductImage from '../ui/ProductImage';

const CartSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { items, totalItems, totalAmount } = useAppSelector(state => state.cart);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    setIsOpen(false);
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
        title="Shopping Cart"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="relative w-full sm:w-96 h-full sm:h-auto bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-4">Add some fragrances to get started!</p>
                  <Button onClick={() => setIsOpen(false)}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <ProductImage
                          src={item.product.images[0] || '/images/placeholder.jpg'}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg"
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.product.brand} • {item.product.size}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button onClick={handleCheckout} className="w-full">
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleClearCart}
                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
