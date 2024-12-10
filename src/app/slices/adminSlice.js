import { createSlice } from '@reduxjs/toolkit';
import { getAdminDashboardDataAsync } from '../services/adminService';

const initialState = {
  loading: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminDashboardDataAsync.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(getAdminDashboardDataAsync.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
