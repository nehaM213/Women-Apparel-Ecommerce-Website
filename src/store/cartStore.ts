// src/store/cartStore.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const isBrowser = typeof window !== 'undefined';

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

let persistor: Persistor | undefined;
if (isBrowser) {
  persistor = persistStore(store);
}

export { persistor };
export default store;