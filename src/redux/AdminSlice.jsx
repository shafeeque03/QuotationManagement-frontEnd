"use client"
import {createSlice} from "@reduxjs/toolkit"
const AdminSlice = createSlice({
  name:"admin",
  initialState:{
    token:"",
    admin:""
  },
  reducers:{
    adminLogin:(state,action) => {
      state.token = action.payload.token
      state.admin = action.payload.admin
    },
    adminLogout:(state) => {
      state.admin = {
        token:"",
        admin:""
      }
    }
  }
})
export const {adminLogin,adminLogout} = AdminSlice.actions
export default AdminSlice.reducer