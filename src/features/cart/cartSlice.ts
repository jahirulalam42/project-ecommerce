import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: Number;
  taxtotal: Number;
  ordertotal: Number;
}

const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItem") || "[]")
      : [],
  subtotal: 0,
  taxtotal: 0,
  ordertotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    makeSubtotal: (state, action) => {
      const products = action.payload;
      state.subtotal =
        products?.reduce((total: number, product: any) => {
          const price = product.discountPrice;
          return total + price * product.quantity;
        }, 0) || 0;
    },

    makeTaxtotal: (state, action) => {
      state.taxtotal =
        action.payload?.reduce((total: number, product: any) => {
          const tax = product.tax;
          return total + tax * product.quantity;
        }, 0) || 0;
    },

    makeOrdertotal: (state, action) => {
      state.ordertotal = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addCartItem,
  increaseQuantity,
  decreaseQuantity,
  makeSubtotal,
  makeTaxtotal,
  makeOrdertotal,
} = cartSlice.actions;

export default cartSlice.reducer;
