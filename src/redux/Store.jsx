"use client"
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "@reduxjs/toolkit";
import adminReducer from '../redux/AdminSlice.jsx';
import userReducer from '../redux/UserSlice.jsx';

const persistConfig = { key: 'root', storage, version: 1 };
const reducer = combineReducers({
  userReducer,
  adminReducer
})
const persistedReducer = persistReducer(persistConfig,reducer)
const store = configureStore({
  reducer:persistedReducer
})

export {store}
