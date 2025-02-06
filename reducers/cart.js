import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { cartItem: [], quantity: 0 },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value.cartItem.push(action.payload);  
    },
    removeItem: (state, action) => {
      state.value.cartItem = state.value.cartItem.filter(e => e.article !== action.payload);
    },
    addQuantity: (state, action) => {
      state.value.quantity += 1;
      console.log('check add', state.value.quantity)
     },
     minusQuantity: (state, action) => {
      if(state.value.quantity > 0) {
          state.value.quantity -= 1;
      } else {
          state.value.quantity;
      }
      
     }
    
  },
});

export const { addItem, removeItem, addQuantity, minusQuantity } = cartSlice.actions;
export default cartSlice.reducer;
