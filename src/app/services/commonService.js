import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/API';

export const getCurrentUser = createAsyncThunk(
  'common/currentUser',
  async ({ toast }, thunkAPI) => {
    try {
      const response = (await API.get('/user/current')).data;
      if (response.status === 'OK') {
        console.log('Current user:', response);
        return response;
      }
    } catch (error) {
      return toast.error(thunkAPI.rejectWithValue('Oop! Something went wrong'));
    }
  }
);
