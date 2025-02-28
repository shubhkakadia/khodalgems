import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "./searchSlice";
import stockReducer from "./stockAPI";
import loggedInUser from "./user";
import loggedInAdmin from "./admin";
import cartReducer from "./cart";
import wishlistReducer from "./wishlist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  search: searchReducer,
  stock: stockReducer,
  user: loggedInUser,
  admin: loggedInAdmin,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
