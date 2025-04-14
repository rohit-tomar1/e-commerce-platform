import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from "../features/auth/authSlice";
import productRecer from "../features/products/productSlice";

const persistConfig = {
  key: "root",
  storage, // storage engine (localStorage by default)
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProductRecer = persistReducer(persistConfig, productRecer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductRecer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
