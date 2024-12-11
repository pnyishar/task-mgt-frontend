import { combineReducers } from '@reduxjs/toolkit';
import {
  authSlice,
  roleSlice,
  adminSlice,
  userSlice,
  commonSlice,
} from '../slices';

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
  auth: authSlice,
  role: roleSlice,
  user: userSlice,
  common: commonSlice,
  admin: adminSlice,
});
