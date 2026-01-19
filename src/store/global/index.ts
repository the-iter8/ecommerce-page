import { createSlice } from "@reduxjs/toolkit";

export interface GlobalState {
  isLoading: boolean;
  loadingCount: number;
}

const initialState: GlobalState = {
  isLoading: false,
  loadingCount: 0,
};

export const globalSlice = createSlice({
  name: "Global",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1;
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
      state.isLoading = state.loadingCount > 0;
    },
    resetLoading: (state) => {
      state.loadingCount = 0;
      state.isLoading = false;
    },
  },
});

export const globalActions = globalSlice.actions;
export default globalSlice.reducer;
