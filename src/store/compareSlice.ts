import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompareState {
  items: number[];  // Array of product IDs
}

const initialState: CompareState = {
  items: JSON.parse(localStorage.getItem('compare') || '{"items":[]}').items,
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    toggleCompare: (state, action: PayloadAction<number>) => {
      const index = state.items.indexOf(action.payload);
      if (index === -1) {
        state.items.push(action.payload);
      } else {
        state.items.splice(index, 1);
      }
      localStorage.setItem('compare', JSON.stringify(state));
    },
  },
});

export const { toggleCompare } = compareSlice.actions;
export default compareSlice.reducer; 