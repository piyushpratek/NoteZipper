import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  // isAuthenticated: false,
  user: {},
  isLoading: false,
  error: { isError: false, errMsg: '' },
};
export const loginUser = createAsyncThunk('loginuser', async (body) => {
  const res = await fetch('', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // clearError: (state) => {
    // state.error.isError = false;
    // state.error.errMsg = '';
    // },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { error, errMsg } }) => {
      state.isLoading = false;
      if (error) {
        state.error = error;
      } else {
        state.errMsg = errMsg;
      }
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = true;
    },
  },
});

export default userSlice.reducer;

//https://www.shawndsilva.com/blog/web-development/differences-between-redux-and-redux-toolkit-and-why-should-you-upgrade
