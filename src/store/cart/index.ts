import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import type { AddToCartPayload } from "@/apis/cart";

export interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  discountCode: string | null;
  isLoading: boolean;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
  discountCode: null,
  isLoading: false,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    setCartTotals: (
      state,
      action: PayloadAction<{
        subtotal: number;
        discount: number;
        total: number;
      }>,
    ) => {
      state.subtotal = action.payload.subtotal;
      state.discount = action.payload.discount;
      state.total = action.payload.total;
    },
    setDiscountCode: (state, action: PayloadAction<string | null>) => {
      state.discountCode = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
      state.discountCode = null;
    },
    fetchCart: () => {},
    addToCart: (_state, _action: PayloadAction<AddToCartPayload>) => {},
    removeFromCart: (_state, _action: PayloadAction<string>) => {},
    incrementItem: (_state, _action: PayloadAction<string>) => {},
    decrementItem: (_state, _action: PayloadAction<string>) => {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
