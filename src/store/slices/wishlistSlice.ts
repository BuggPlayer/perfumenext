import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productSlice';

interface WishlistState {
  items: Product[];
  totalItems: number;
}

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (!state.items.find(item => item.id === product.id)) {
        state.items.push(product);
        state.totalItems += 1;
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === productId);
      
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.totalItems -= 1;
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

