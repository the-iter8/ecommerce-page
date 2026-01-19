import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cartActions } from ".";
import { globalActions } from "@/store/global";
import type { AddToCartPayload, UpdateCartPayload } from "@/apis/cart";
import * as cartAPI from "@/apis/cart";

export function* OnFetchCart() {
  try {
    yield put(globalActions.startLoading());
    yield put(cartActions.setIsLoading(true));

    const response: cartAPI.CartResponse = yield call(cartAPI.getCart);

    yield put(cartActions.setCartItems(response.items));
    yield put(
      cartActions.setCartTotals({
        subtotal: response.subtotal,
        discount: response.discount,
        total: response.total,
      }),
    );
  } catch (error: unknown) {
    console.error("Failed to fetch cart:", error);
  } finally {
    yield put(cartActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

export function* OnAddToCart(action: PayloadAction<AddToCartPayload>) {
  try {
    yield put(globalActions.startLoading());
    yield put(cartActions.setIsLoading(true));

    const success: boolean = yield call(cartAPI.addToCart, action.payload);

    if (success) {
      yield call(OnFetchCart);
    }
  } catch (error: unknown) {
    console.error("Failed to add to cart:", error);
  } finally {
    yield put(cartActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

export function* OnUpdateCart(action: PayloadAction<UpdateCartPayload>) {
  try {
    yield put(globalActions.startLoading());
    yield put(cartActions.setIsLoading(true));

    const success: boolean = yield call(cartAPI.updateCartItem, action.payload);

    if (success) {
      yield call(OnFetchCart);
    }
  } catch (error: unknown) {
    console.error("Failed to update cart:", error);
  } finally {
    yield put(cartActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

export function* OnRemoveFromCart(action: PayloadAction<string>) {
  try {
    yield put(globalActions.startLoading());
    yield put(cartActions.setIsLoading(true));

    const success: boolean = yield call(cartAPI.removeFromCart, action.payload);

    if (success) {
      yield call(OnFetchCart);
    }
  } catch (error: unknown) {
    console.error("Failed to remove from cart:", error);
  } finally {
    yield put(cartActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

function* cartSaga() {
  yield takeLatest(cartActions.fetchCart, OnFetchCart);
  yield takeLatest(cartActions.addToCart, OnAddToCart);
  yield takeLatest(cartActions.updateCart, OnUpdateCart);
  yield takeLatest(cartActions.removeFromCart, OnRemoveFromCart);
}

export default cartSaga;
