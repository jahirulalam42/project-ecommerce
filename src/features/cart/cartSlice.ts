import { getSingleProduct } from "@/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  summaryProducts: any;
  loading: String;
}

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();

    const result = await Promise.all(
      state.cart.items.map(async (product: any) => {
        const res: any = await getSingleProduct(product.productId);

        return {
          ...res.data,
          quantity: product.quantity,
          size: product.size,
        };
      })
    );

    return result;
  }
);

const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItem") || "[]")
      : [],
  subtotal: 0,
  taxtotal: 0,
  ordertotal: 0,
  summaryProducts: [],
  loading: "loading",
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

        // Update summaryProducts if it exists
        const summaryItem = state.summaryProducts?.find(
          (p: any) => p.id === action.payload
        );
        if (summaryItem) {
          summaryItem.quantity += 1;

          // Recalculate subtotal and taxtotal from updated summaryProducts
          state.subtotal = state.summaryProducts.reduce(
            (total: number, product: any) =>
              total + product.discountPrice * product.quantity,
            0
          );
          state.taxtotal = state.summaryProducts.reduce(
            (total: number, product: any) =>
              total + (product.tax || 0) * product.quantity,
            0
          );
          state.ordertotal = state.subtotal + 5 + state.taxtotal;
        }
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((p) => p.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;

        const summaryItem = state.summaryProducts?.find(
          (p: any) => p.id === action.payload
        );
        if (summaryItem) {
          summaryItem.quantity -= 1;

          // Recalculate totals similarly
          state.subtotal = state.summaryProducts.reduce(
            (total: number, product: any) =>
              total + product.discountPrice * product.quantity,
            0
          );
          state.taxtotal = state.summaryProducts.reduce(
            (total: number, product: any) =>
              total + (product.tax || 0) * product.quantity,
            0
          );
          state.ordertotal = state.subtotal + 5 + state.taxtotal;
        }
      }
    },

    makeOrdertotal: (state, action) => {
      state.ordertotal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.summaryProducts = action.payload;
        const products = action.payload;
        state.subtotal =
          products?.reduce((total: number, product: any) => {
            const price = product.discountPrice;
            return total + price * product.quantity;
          }, 0) || 0;
        state.taxtotal = state.taxtotal =
          action.payload?.reduce((total: number, product: any) => {
            const tax = product.tax;
            return total + tax * product.quantity;
          }, 0) || 0;
        state.loading = "succeeded";
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  addCartItem,
  increaseQuantity,
  decreaseQuantity,
  makeOrdertotal,
} = cartSlice.actions;

export default cartSlice.reducer;
