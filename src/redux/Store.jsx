import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slice/UserSlice';
import adminReducer from './slice/AdminSlice';
import hosterReducer from './slice/HosterSlice';

// Combine reducers
const reducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  hoster: hosterReducer,
});

// Load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    if (typeof window === 'undefined') return undefined; // Ensure it runs only on the client side
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
    return undefined;
  }
};

// Save state to localStorage
const saveStateToLocalStorage = (state) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    }
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
};

// Load persisted state (only on client side)
const preloadedState = typeof window !== 'undefined' ? loadStateFromLocalStorage() : undefined;

// Create store
const store = configureStore({
  reducer,
  preloadedState, // Load initial state from localStorage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

// Save state to localStorage whenever it changes (only on client side)
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
  });
}

export default store;
