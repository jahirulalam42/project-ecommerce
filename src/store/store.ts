import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/shop/categorySlice";

export default configureStore({
  reducer: {
    category: categoryReducer,
  },
});
