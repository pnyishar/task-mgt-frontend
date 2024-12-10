import { combineReducers } from '@reduxjs/toolkit';
import {
  authSlice,
  roleSlice,
} from '../slices';

// eslint-disable-next-line react-refresh/only-export-components
export default combineReducers({
  auth: authSlice,
  role: roleSlice,
});
