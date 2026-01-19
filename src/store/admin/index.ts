import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AdminStats, AdminConfig, GeneratedDiscountCode } from "@/types";

export interface AdminState {
  stats: AdminStats | null;
  config: AdminConfig | null;
  generatedCode: GeneratedDiscountCode | null;
  isLoading: boolean;
  isGeneratingCode: boolean;
}

const initialState: AdminState = {
  stats: null,
  config: null,
  generatedCode: null,
  isLoading: false,
  isGeneratingCode: false,
};

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<AdminStats>) => {
      state.stats = action.payload;
    },
    setConfig: (state, action: PayloadAction<AdminConfig>) => {
      state.config = action.payload;
    },
    setGeneratedCode: (state, action: PayloadAction<GeneratedDiscountCode>) => {
      state.generatedCode = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsGeneratingCode: (state, action: PayloadAction<boolean>) => {
      state.isGeneratingCode = action.payload;
    },
    fetchStats: () => {},
    fetchConfig: () => {},
    generateDiscountCode: () => {},
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
