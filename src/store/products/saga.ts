import { takeLatest } from "redux-saga/effects";
import { productsActions } from ".";

export function* OnFetchProducts() {}

function* productsSaga() {
  yield takeLatest(productsActions.fetchProducts, OnFetchProducts);
}

export default productsSaga;
