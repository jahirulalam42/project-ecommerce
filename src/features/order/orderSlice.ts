import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  name: string;
  size?: string;
  quantity: number;
  price: number;
  discountPrice?: number;
  image: string;
}

interface OrderState {
  currentOrder: {
    orderId: string;
    date: string;
    contact: { phone: string; email: string };
    shipping: {
      firstName: string;
      lastName: string;
      address1: string;
      address2?: string;
      city: string;
      country: string;
      state: string;
      postal: string;
    };
    payment: { last4: string }; // just last 4 digits for display
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
    estimatedDelivery: string;
  } | null;
}

const initialState: OrderState = {
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<OrderState["currentOrder"]>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
});

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
