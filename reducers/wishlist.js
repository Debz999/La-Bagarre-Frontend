import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,
  reducers: {
    toggleLike: (state, action) => {
      //console.log("checking wishlist reducer", action.payload);

      const checkModel = state.value.some(
        (e) => e.model === action.payload.model
      );

      if (!checkModel) {
        state.value.push(action.payload);
        console.log("added");
        //console.log('reducer action.payload', action.payload)
      } else {
        state.value = state.value.filter(
          (e) => e.model !== action.payload.model
        );
        console.log("removed");
      }
    },
  },
});

export const { toggleLike } = wishlistSlice.actions;
export default wishlistSlice.reducer;
