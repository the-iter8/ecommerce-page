import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";
import type { ProductsQueryParams } from "@/apis/products";

export interface ProductsState {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  page: 1,
  totalPages: 0,
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    setProducts: (
      state,
      action: PayloadAction<{
        items: Product[];
        total: number;
        page: number;
        totalPages: number;
      }>,
    ) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchProducts: (_state, _action: PayloadAction<ProductsQueryParams>) => {},
  },
});

export const productsActions = productsSlice.actions;
export default productsSlice.reducer;
