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
      console.log("cart reducer", action.payload);
    },

    emptyCartItem: (state, action) => {
      state.value.cartItem = [];
    },

    addToTemporaryCart: (state, action) => {
      const checkModel = state.value.temporaryCart.some(
        (e) => e.model === action.payload.model
      );

      if (!checkModel) {
        state.value.temporaryCart.push(action.payload);
        console.log("added");
        //console.log('reducer action.payload', action.payload)
      } else {
        const existingModel = state.value.temporaryCart.find(
          (e) => e.model === action.payload.model
        );
        existingModel.quantity = action.payload.quantity;
        console.log("item has already ");
      }
    },

    removeFromTemporaryCart: (state, action) => {
      const checkModel = state.value.temporaryCart.some(
        (e) => e.model === action.payload.model
      );

      if (!checkModel) {
        console.log("");
        //console.log('reducer action.payload', action.payload)
      } else {
        state.value.temporaryCart = state.value.temporaryCart.filter(
          (e) => e.model !== action.payload.model
        );
        console.log("item has already ");
      }
    },
  },
});

export const { toggleCart, emptyCartItem, addToTemporaryCart, removeFromTemporaryCart } =
  cartSlice.actions;
export default cartSlice.reducer;
