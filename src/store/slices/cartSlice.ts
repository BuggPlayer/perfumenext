import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productSlice';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      
      state.totalItems += quantity;
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.product.id === productId);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= item.product.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        const quantityDiff = quantity - item.quantity;
        item.quantity = quantity;
        state.totalItems += quantityDiff;
        state.totalAmount = state.items.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = cartSlice.actions;

export default cartSlice.reducer;

