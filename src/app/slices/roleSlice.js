import { createSlice } from '@reduxjs/toolkit';
import { roles } from '@/utils/constants';

const initialState = {
  currentRole: roles.LECTURER,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.currentRole = action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
