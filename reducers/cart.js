import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { cartItem: [] },
};
//delete quantity, 
//{isUserLoggedIn, temporaryBasket: []}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.value.cartItem = action.payload;  
      console.log('cart reducer', action.payload)
    },

    
  },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
