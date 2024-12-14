import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
  token: null,
  user: null, // Store user data here
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // Storing user data in Redux
    },
    userLogout: (state) => {
      state.token = null;
      state.user = null; // Clearing user data on logout
      Cookies.remove('userToken');
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
