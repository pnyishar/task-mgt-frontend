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

export const getAllUsersAsync = createAsyncThunk(
  'admin/allUsers',
  async ({ toast, limit = 10, page = 0, searchTerm = null }, thunkAPI) => {
    try {
      const response = (
        await API.get(
          `/user/all?limit=${limit}&page=${page}&searchTerm=${searchTerm}`
        )
      ).data;
      console.log('All Users:', response.data);
      if (response.status === 'OK') {
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const getAllTasksAsync = createAsyncThunk(
  'admin/allTasks',
  async ({ toast, limit = 10, page = 0, searchTerm = null }, thunkAPI) => {
    try {
      const response = (
        await API.get(
          `/task/all?limit=${limit}&page=${page}&searchTerm=${searchTerm}`
        )
      ).data;
      console.log('All Tasks:', response.data);
      if (response.status === 'OK') {
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, formData, toast, navigate }, thunkAPI) => {
    try {
      const response = (await API.put(`user/update?userId=${userId}`, formData))
        .data;
      if (response.status === 'OK') {
        toast.success(response.message);
        return response;
      } else {
        return navigate('/admin/user');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'admin/deleteUser',
  async ({ userId, toast, navigate }, thunkAPI) => {
    try {
      const response = (await API.delete(`user/update?userId=${userId}`)).data;
      if (response.status === 'OK') {
        toast.success(response.message);
        return response;
      } else {
        return navigate('/admin/user');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);
