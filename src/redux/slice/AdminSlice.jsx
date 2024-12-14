import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

const initialState = {
  token: null,
  admin: null, // Store admin data here
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.admin; // Storing admin data in Redux
    },
    adminLogout: (state) => {
      state.token = null;
      state.admin = null; // Clearing admin data on logout
      Cookies.remove('adminToken');
    },
  },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
