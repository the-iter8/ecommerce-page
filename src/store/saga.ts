import { all, fork } from "redux-saga/effects";
import productsSaga from "./products/saga";
import cartSaga from "./cart/saga";
import adminSaga from "./admin/saga";

export default function* rootSaga() {
  yield all([fork(productsSaga), fork(cartSaga), fork(adminSaga)]);
}
