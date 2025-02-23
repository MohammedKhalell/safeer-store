import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  items: number[];  // Array of product IDs
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '{"items":[]}').items,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const index = state.items.indexOf(action.payload);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 