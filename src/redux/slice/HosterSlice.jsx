import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
  token: null,
  hoster: null, // Store hoster data here
};

const hosterSlice = createSlice({
  name: 'hoster',
  initialState,
  reducers: {
    hosterLogin: (state, action) => {
      state.token = action.payload.token;
      state.hoster = action.payload.hoster; // Storing hoster data in Redux
    },
    hosterLogout: (state) => {
      state.token = null;
      state.hoster = null; // Clearing hoster data on logout
      Cookies.remove('hosterToken');
    },
  },
});

export const { hosterLogin, hosterLogout } = hosterSlice.actions;
export default hosterSlice.reducer;
