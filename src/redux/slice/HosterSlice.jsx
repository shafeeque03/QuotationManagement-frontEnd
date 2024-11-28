import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  hoster: null,
};

const hosterSlice = createSlice({
  name: 'hoster',
  initialState,
  reducers: {
    hosterLogin: (state, action) => {
      state.token = action.payload.token;
      state.hoster = action.payload.hoster;
    },
    hosterLogout: (state) => {
      state.token = null;
      state.hoster = null;
    },
  },
});

export const { hosterLogin, hosterLogout } = hosterSlice.actions;
export default hosterSlice.reducer;
