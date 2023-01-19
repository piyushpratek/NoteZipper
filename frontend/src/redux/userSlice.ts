import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type appType = {
  loading?: boolean;
  userInfo?: any;
  userToken?: any;
  error?: any;
  success?: any;
};
const InitialUserState: appType = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userLoginSlice = createSlice({
  name: 'auth',
  initialState: InitialUserState,
  reducers: {
    setLoginRequest: (state) => {
      alert('set login request');
      state.loading = true;
    },
    setLoginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    setLoginFailed: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserLogout: (state, action: PayloadAction<any>) => {
      state = {};
    },
  },
});

export const {
  setLoginRequest,
  setLoginSuccess,
  setLoginFailed,
  setUserLogout,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;

//https://www.shawndsilva.com/blog/web-development/differences-between-redux-and-redux-toolkit-and-why-should-you-upgrade
