import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { cartItem: [] },
};

export const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value.cartItem.push(action.payload);  
    },
    removeItem: (state, action) => {
      state.value.cartItem = state.value.cartItem.filter(e => e.article !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
