import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AdminStats } from "@/types";

export interface AdminState {
  stats: AdminStats | null;
  isLoading: boolean;
}

const initialState: AdminState = {
  stats: null,
  isLoading: false,
};

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<AdminStats>) => {
      state.stats = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    fetchStats: () => {},
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
