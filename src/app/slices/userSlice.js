import { createSlice } from '@reduxjs/toolkit';
import { getUserDashboardDataAsync } from '../services/userService';

const initialState = {
  loading: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDashboardDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDashboardDataAsync.fulfilled, (state, action) => {
        state.userStats = action.payload;
        state.loading = false;
      })
      .addCase(getUserDashboardDataAsync.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export default adminSlice.reducer;
