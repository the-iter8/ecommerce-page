import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types";
import type { AddToCartPayload, UpdateCartPayload } from "@/apis/cart";

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
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId,
      );
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.itemId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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
    updateCart: (_state, _action: PayloadAction<UpdateCartPayload>) => {},
    removeFromCart: (_state, _action: PayloadAction<string>) => {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
