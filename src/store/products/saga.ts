import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { productsActions } from ".";
import { globalActions } from "@/store/global";
import { getProducts } from "@/apis/products";
import type { ProductsQueryParams, ProductsResponse } from "@/apis/products";

export function* OnFetchProducts(action: PayloadAction<ProductsQueryParams>) {
  try {
    yield put(globalActions.startLoading());
    yield put(productsActions.setIsLoading(true));

    const response: ProductsResponse = yield call(getProducts, action.payload);

    yield put(productsActions.setProducts(response));
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);
  } finally {
    yield put(productsActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

function* productsSaga() {
  yield takeLatest(productsActions.fetchProducts, OnFetchProducts);
}

export default productsSaga;
