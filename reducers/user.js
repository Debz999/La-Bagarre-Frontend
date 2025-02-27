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
      state.value.address = action. payload.address;  

      console.log('user reducer', action.payload)
    },

  },
});

export const { login, logout, userStore } = userSlice.actions;
export default userSlice.reducer;
