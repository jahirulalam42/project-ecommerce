import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/shop/categorySlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
