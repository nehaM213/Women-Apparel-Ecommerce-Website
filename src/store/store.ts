import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartReducer from "./cartSlice";

// 🧩 1. Create a no-op storage for SSR (so Redux Persist doesn’t break during SSR)
const createNoopStorage = () => ({
  getItem: async (_key: string) => null,
  setItem: async (_key: string, value: any) => value,
  removeItem: async (_key: string) => {},
});

// 🧠 2. Use localStorage only on client side
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// ⚙️ 3. Configure persistence only for cart (add whitelist if you add more slices later)
const persistConfig = {
  key: "cart",
  storage,
  // whitelist: ["cart"],// ✅ persist only cart slice
};

// ✅ 4. Apply persistReducer to cart slice
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// 🏗️ 5. Create store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
    devTools: process.env.NODE_ENV !== "production",// ✅ disable Redux devtools in prod
});

// 🧩 6. Setup persistor for client side only
let persistor: Persistor | undefined;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}

// 🧾 7. Types for useSelector / useDispatch hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export { persistor };
export default store;
