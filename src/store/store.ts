import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/shop/categorySlice";
import cartReducer from "../features/cart/cartSlice";

export default configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
  },
});
