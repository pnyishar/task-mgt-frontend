import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/API';
import { errorHandler } from '@/utils/constants';

export const getUserDashboardDataAsync = createAsyncThunk(
  'user/stats',
  async ({ userId, toast }, thunkAPI) => {
    try {
      const response = (await API.get(`/user/dashboard?userId=${userId}`)).data;
      if (response.status === 'OK') {
        console.log('Dashboard data: ' + response.data);
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const getRecentUserTasksAsync = createAsyncThunk(
  'user/recentTasks',
  async ({ userId, toast }, thunkAPI) => {
    try {
      const response = (await API.get(`/task/user/recent?userId=${userId}`))
        .data;
      if (response.status === 'OK') {
        console.log('Recent Tasks: ' + response.data);
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);
