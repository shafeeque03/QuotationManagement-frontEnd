import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userReducer from './slice/UserSlice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

// Persist configuration
const persistConfig = { key: 'root', storage, version: 1 };

// Combine reducers with the correct key
const reducer = combineReducers({
  user: userReducer, // The key is now "user"
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
