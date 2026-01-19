import { takeLatest, put, call } from "redux-saga/effects";
import { adminActions } from ".";
import { globalActions } from "@/store/global";
import {
  getAdminStats,
  getAdminConfig,
  generateDiscountCode as generateDiscountCodeAPI,
} from "@/apis/admin";
import type { AdminConfig, AdminStats, GeneratedDiscountCode } from "@/types";

export function* OnFetchStats(): Generator {
  try {
    yield put(globalActions.startLoading());
    yield put(adminActions.setIsLoading(true));
    const stats = (yield call(getAdminStats)) as AdminStats;
    yield put(adminActions.setStats(stats));
  } catch (error: unknown) {
    console.error(
      "Failed to fetch admin stats:",
      error instanceof Error ? error.message : "Unknown error",
    );
  } finally {
    yield put(adminActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

export function* OnFetchConfig(): Generator {
  try {
    yield put(globalActions.startLoading());
    yield put(adminActions.setIsLoading(true));
    const config = (yield call(getAdminConfig)) as AdminConfig;
    yield put(adminActions.setConfig(config));
  } catch (error: unknown) {
    console.error(
      "Failed to fetch admin config:",
      error instanceof Error ? error.message : "Unknown error",
    );
  } finally {
    yield put(adminActions.setIsLoading(false));
    yield put(globalActions.stopLoading());
  }
}

export function* OnGenerateDiscountCode(): Generator {
  try {
    yield put(globalActions.startLoading());
    yield put(adminActions.setIsGeneratingCode(true));
    const discountCode = (yield call(
      generateDiscountCodeAPI,
    )) as GeneratedDiscountCode;
    yield put(adminActions.setGeneratedCode(discountCode));
    // Refetch config to update eligibility
    yield put(adminActions.fetchConfig());
  } catch (error: unknown) {
    console.error(
      "Failed to generate discount code:",
      error instanceof Error ? error.message : "Unknown error",
    );
    throw error;
  } finally {
    yield put(adminActions.setIsGeneratingCode(false));
    yield put(globalActions.stopLoading());
  }
}

function* adminSaga() {
  yield takeLatest(adminActions.fetchStats, OnFetchStats);
  yield takeLatest(adminActions.fetchConfig, OnFetchConfig);
  yield takeLatest(adminActions.generateDiscountCode, OnGenerateDiscountCode);
}

export default adminSaga;
