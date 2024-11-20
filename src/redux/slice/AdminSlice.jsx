import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  admin: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin;
    },
    adminLogout: (state) => {
      state.token = null;
      state.admin = null;
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
