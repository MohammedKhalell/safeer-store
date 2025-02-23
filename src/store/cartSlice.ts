import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '{"items":[]}').items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
      if (existingItemIndex === -1) {
        state.items.push({ id: action.payload, quantity: 1 });
      } else {
        state.items.splice(existingItemIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
  },
});

export const { toggleCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer; 