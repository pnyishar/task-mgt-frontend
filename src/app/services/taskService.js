import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/API';
import { errorHandler } from '@/utils/constants';

export const createTaskAsync = createAsyncThunk(
  'task/create',
  async ({ formData, toast, navigate }, thunkAPI) => {
    try {
      const response = (await API.post('/task/new', formData)).data;
      if (response.status === 'OK') {
        console.log('response data:', response.data);
        toast.success(response.message);
        return response.message;
      } else {
        return navigate('/user/task');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const getAllUserTasksAsync = createAsyncThunk(
  'user/allTasks',
  async (
    { userId, toast, limit = 10, page = 0, searchTerm = null },
    thunkAPI
  ) => {
    try {
      const response = (
        await API.get(
          `/task/user/all?userId=${userId}&limit=${limit}&page=${page}&searchTerm=${searchTerm}`
        )
      ).data;
      console.log('All User Tasks:', response.data);
      if (response.status === 'OK') {
        return response.data;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);
