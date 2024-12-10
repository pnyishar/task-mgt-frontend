import { createSlice } from '@reduxjs/toolkit';
import {
  getAdminDashboardDataAsync,
  getAllUsersAsync,
  getAllTasksAsync,
} from '../services/adminService';

const initialState = {
  loading: false,
  users: [],
  tasks: [],
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  loading: false,
  error: null,
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
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        const { page, total, entities } = action.payload;
        state.users = entities;
        state.currentPage = page + 1;
        state.totalUsers = total;
        state.totalPages = Math.ceil(total / 10);
        state.loading = false;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getAllTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasksAsync.fulfilled, (state, action) => {
        const { page, total, entities } = action.payload;
        state.taskList = entities;
        state.currentPage = page + 1;
        state.totalUsers = total;
        state.totalPages = Math.ceil(total / 10);
        state.loading = false;
      })
      .addCase(getAllTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default adminSlice.reducer;
