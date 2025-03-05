import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, profile: {} ,address : []},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
    },
    userStore: (state, action) => {
      state.value.profile = action.payload.profile;
      //state.value.address = action. payload.address; 
      console.log('user action payload', action.payload)
    },
    addressStore: (state, action) => {
      state.value.address = action. payload.address; 
    },

  },
});

export const { login, logout, userStore, addressStore } = userSlice.actions;
export default userSlice.reducer;
