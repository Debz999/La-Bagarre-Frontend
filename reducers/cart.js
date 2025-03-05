import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { cartItem: [], temporaryCart: [] },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart: (state, action) => {
      state.value.cartItem = action.payload;
      //console.log("cart reducer", action.payload);
    },

    emptyCartItem: (state, action) => {
      state.value.cartItem = [];
    },

    addToTemporaryCart: (state, action) => {
      //console.log(action.payload)
      const checkModel = state.value.temporaryCart.some(
        (e) => e.model === action.payload.article.model
      );

      if (!checkModel) {
        state.value.temporaryCart.push(action.payload);
        console.log("added");
      } else {
        console.log('quantity change')
      }
    },

    changeQuantityTemporaryCart: (state, action) => {
      const checkModel = state.value.temporaryCart.find(
        (e) => e.article.model === action.payload.model
      );
      if(checkModel) {
        checkModel.quantity = action.payload.quantity;
        console.log('quantity change')
      }
    },

    removeFromTemporaryCart: (state, action) => {
      
      state.value.temporaryCart = state.value.temporaryCart.filter(
        (e) => e.article.model !== action.payload.article.model
      );


      // const checkModel = state.value.temporaryCart.some(
      //   (e) => e.model === action.payload.article.model
      // );

      // if (!checkModel) {
      //   console.log("");
      //   //console.log('reducer action.payload', action.payload)
      // } else {
      // }
    },

    
    emptyTemporaryCart: (state, action) => {
      state.value.temporaryCart = [];
    },
  },
});

export const { toggleCart, emptyCartItem, addToTemporaryCart, changeQuantityTemporaryCart, removeFromTemporaryCart, emptyTemporaryCart } =
  cartSlice.actions;
export default cartSlice.reducer;
