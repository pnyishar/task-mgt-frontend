import { createSlice } from '@reduxjs/toolkit';
import {
  getUserDashboardDataAsync,
  getRecentUserTasksAsync,
} from '../services/userService';

const initialState = {
  loading: false,
  recentTasks: [],
};

export const userSlice = createSlice({
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
      })
      .addCase(getRecentUserTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecentUserTasksAsync.fulfilled, (state, action) => {
        state.recentTasks = action.payload;
        state.loading = false;
      })
      .addCase(getRecentUserTasksAsync.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
