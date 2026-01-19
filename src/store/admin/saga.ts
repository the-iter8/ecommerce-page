import { takeLatest, put, call } from "redux-saga/effects";
import { adminActions } from ".";
import {
  getAdminConfig,
  generateDiscountCode as generateDiscountCodeAPI,
} from "@/apis/admin";
import type { AdminConfig, GeneratedDiscountCode } from "@/types";

export function* OnFetchStats() {}

export function* OnFetchConfig(): Generator {
  try {
    yield put(adminActions.setIsLoading(true));
    const config = (yield call(getAdminConfig)) as AdminConfig;
    yield put(adminActions.setConfig(config));
    yield put(adminActions.setIsLoading(false));
  } catch (error: unknown) {
    yield put(adminActions.setIsLoading(false));
    console.error(
      "Failed to fetch admin config:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}

export function* OnGenerateDiscountCode(): Generator {
  try {
    yield put(adminActions.setIsGeneratingCode(true));
    const discountCode = (yield call(
      generateDiscountCodeAPI,
    )) as GeneratedDiscountCode;
    yield put(adminActions.setGeneratedCode(discountCode));
    yield put(adminActions.setIsGeneratingCode(false));
    // Refetch config to update eligibility
    yield put(adminActions.fetchConfig());
  } catch (error: unknown) {
    yield put(adminActions.setIsGeneratingCode(false));
    console.error(
      "Failed to generate discount code:",
      error instanceof Error ? error.message : "Unknown error",
    );
    throw error;
  }
}

function* adminSaga() {
  yield takeLatest(adminActions.fetchStats, OnFetchStats);
  yield takeLatest(adminActions.fetchConfig, OnFetchConfig);
  yield takeLatest(adminActions.generateDiscountCode, OnGenerateDiscountCode);
}

export default adminSaga;
