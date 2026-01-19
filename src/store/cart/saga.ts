import { takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cartActions } from ".";
import type { AddToCartPayload, UpdateCartPayload } from "@/apis/cart";

export function* OnFetchCart() {}

export function* OnAddToCart(_action: PayloadAction<AddToCartPayload>) {}

export function* OnUpdateCart(_action: PayloadAction<UpdateCartPayload>) {}

export function* OnRemoveFromCart(_action: PayloadAction<string>) {}

function* cartSaga() {
  yield takeLatest(cartActions.fetchCart, OnFetchCart);
  yield takeLatest(cartActions.addToCart, OnAddToCart);
  yield takeLatest(cartActions.updateCart, OnUpdateCart);
  yield takeLatest(cartActions.removeFromCart, OnRemoveFromCart);
}

export default cartSaga;
