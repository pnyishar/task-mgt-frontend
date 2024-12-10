import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/API';
import { errorHandler } from '@/utils/constants';

export const getAdminDashboardDataAsync = createAsyncThunk(
  'admin/stats',
  async ({ toast }, thunkAPI) => {
    try {
      const response = (await API.get(`/user/admin/dashboard`)).data;
      if (response.status === 'OK') {
        console.log('Dashboard data: ' + response.data);
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);
