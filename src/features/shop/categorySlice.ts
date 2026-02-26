import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    selectedCategory: <any>[],
    priceValue: [0.3],
    sortValue: "",
  },
  reducers: {
    addSelectedCategory: (state, action: any) => {
      state.selectedCategory.push(action.payload);
    },
    removeSelectedCategory: (state, action: any) => {
      state.selectedCategory = state.selectedCategory.filter(
        (item: any) => item !== action.payload
      );
    },
    setPriceValue: (state, action: any) => {
      state.priceValue = action.payload;
    },
    setSortValue: (state, action: any) => {
      state.sortValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSelectedCategory,
  removeSelectedCategory,
  setPriceValue,
  setSortValue,
} = categorySlice.actions;

export default categorySlice.reducer;
