import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/shop/categorySlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
