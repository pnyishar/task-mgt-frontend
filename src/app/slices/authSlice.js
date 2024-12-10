import { createSlice } from '@reduxjs/toolkit';
import {
  loginAsync,
  signUpUserAsync,
  forgotPasswordAsync,
  googleAuthAsync,
  validatePasswordAsync,
  logoutAsync,
} from '../services/authService';

const initialState = {
  loading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setApplicationId: (state, action) => {
      state.user.applicationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(signUpUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUserAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(validatePasswordAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(validatePasswordAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(validatePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(googleAuthAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleAuthAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(googleAuthAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = undefined;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { setApplicationId } = authSlice.actions;

export default authSlice.reducer;
