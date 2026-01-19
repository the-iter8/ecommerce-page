import { takeLatest } from "redux-saga/effects";
import { adminActions } from ".";

export function* OnFetchStats() {}

function* adminSaga() {
  yield takeLatest(adminActions.fetchStats, OnFetchStats);
}

export default adminSaga;
