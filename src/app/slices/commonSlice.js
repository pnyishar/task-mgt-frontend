import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../services/commonService';

const initialState = {
  loading: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.uErrors = action.payload;
      });
  },
});

export default commonSlice.reducer;
