import { createSlice } from '@reduxjs/toolkit';
import { createTaskAsync, getAllUserTasksAsync } from '../services/taskService';

const initialState = {
  loading: false,
  taskList: [],
  userTasks: {
    entities: [],
    page: 0,
    total: 0,
  },
  errors: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(getAllUserTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(getAllUserTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default taskSlice.reducer;
