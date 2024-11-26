import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import userReducer from './slice/UserSlice';
import adminReducer from './slice/AdminSlice'

const reducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const loadStateFromCookies = () => {
  const savedState = cookies.get('reduxState');
  return savedState ? JSON.parse(savedState) : undefined;
};

const preloadedState = loadStateFromCookies();

const store = configureStore({
  reducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

store.subscribe(() => {
  const state = store.getState();
  cookies.set('reduxState', JSON.stringify(state), { expires: 7 });
});

export default store;
