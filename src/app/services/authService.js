import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '@/utils/API';
import { errorHandler } from '@/utils/constants';

// User login
// params: email/username and password
export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ formData, toast, navigate }, thunkAPI) => {
    try {
      const response = await API.post('/auth/signIn', formData);

      if (response.status === 200) {
        toast.success(`Welcome ${response.data.fullName}!`);
        return response.data;
      } else {
        return navigate('/auth/signin');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

// User registration
// params: *
export const signUpUserAsync = createAsyncThunk(
  'auth/userReg',
  async ({ formData, toast, navigate }, thunkAPI) => {
    try {
      const response = (await API.post('/user/signUp', formData)).data;
      console.log('response data:' + response);
      if (response.success) {
        toast.success(response.message);
        return navigate('/auth/login');
      } else {
        return navigate('/auth/register');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

// Forgot password
// params: callbackurl and email/username
export const forgotPasswordAsync = createAsyncThunk(
  'auth/forgotPassword',
  async ({ formData, toast, navigate }, thunkAPI) => {
    try {
      const response = (await API.post('/users/reset-password', formData)).data;
      if (response.success) {
        toast.success(response.message);
        return response.data;
      } else {
        return navigate('/auth/signup');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

// Reset password
// params: password and token....
export const validatePasswordAsync = createAsyncThunk(
  'auth/validatePassword',
  async ({ formData, toast, navigate }, thunkAPI) => {
    try {
      const response = (
        await API.post('/users/validate-reset-password-token', formData)
      ).data;

      if (response.success) {
        toast.success(response.message);
        return navigate('/auth/signin');
      } else {
        return navigate('/auth/signup');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

// Google authentication
// params: token
export const googleAuthAsync = createAsyncThunk(
  'auth/googleAuth',
  async ({ formData, toast, navigate }) => {
    try {
      const response = (await API.post('/auth/oauth/google', formData)).data;
      if (response.success) {
        toast.success(response.message);
        return response.data;
      } else {
        return navigate('/auth/signup');
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async ({ toast, location }, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      const response = (
        await API.post('/auth/logout', {
          Authorization: `Bearer ${user.token}`,
        })
      ).data;

      if (response.success) {
        sessionStorage.clear();
        toast.success(`Log out successfully!`);
        return;
      } else {
        return location.pathname;
      }
    } catch (err) {
      errorHandler(err, toast, thunkAPI);
    }
  }
);
