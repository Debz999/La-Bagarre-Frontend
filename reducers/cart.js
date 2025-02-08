import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { cartItem: [], quantity: 1 },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.value.cartItem = action.payload;  
      //console.log(action.payload)
    },
    // toggleQuantity: (state, action) => {
    //   state.value.quantity = action.payload;
    // }
    
  },
});

export const { toggleCart, toggleQuantity } = cartSlice.actions;
export default cartSlice.reducer;
