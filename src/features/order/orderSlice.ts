import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  currentOrder: string;
}

const initialState: OrderState = {
  currentOrder: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<OrderState["currentOrder"]>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = "";
    },
  },
});

export const { setCurrentOrder, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
