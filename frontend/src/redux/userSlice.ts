import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type requestType = {
  loading?: boolean;
  userInfo?: any;
  error?: any;
  success?: any;
};
type userInitialState = {
  login: requestType;
  register: requestType;
  update: requestType;
};

const InitialUserLoginState: userInitialState = {
  login: {
    loading: false,
    error: null,
    success: false,
  },
  register: {
    loading: false,
    error: null,
    success: false,
  },
  update: {
    loading: false,
    error: null,
    success: false,
  },
};

const UserInfoLoginSlice = createSlice({
  name: 'auth',
  initialState: InitialUserLoginState,
  reducers: {
    setUserLoginLoading: (state) => {
      state.login.loading = true;
    },
    setUserLoginSuccess: (state, action: PayloadAction<any>) => {
      state.login.loading = false;
      state.login.userInfo = action.payload;
    },
    setUserLoginFailed: (state, action: PayloadAction<any>) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },
    setUserLogout: (state, action: PayloadAction<any>) => {},

    setAddUserLoading: (state, action: PayloadAction<any>) => {
      state.register.loading = true;
    },
    setAddUserSuccess: (state, action: PayloadAction<any>) => {
      state.register.loading = false;
      state.register.userInfo = action.payload;
    },
    setAddUserFailed: (state, action: PayloadAction<any>) => {
      state.register.loading = false;
      state.register.error = action.payload;
    },

    setUpdateUserLoading: (state, action: PayloadAction<any>) => {
      state.update.loading = true;
    },
    setUpdateUserSuccess: (state, action: PayloadAction<any>) => {
      state.update.loading = false;
      state.update.userInfo = action.payload;
      state.update.success = true;
    },
    setUpdateUserFailed: (state, action: PayloadAction<any>) => {
      state.update.loading = false;
      state.update.error = action.payload;
      state.update.success = false;
    },
  },
});

export const {
  setUserLoginLoading,
  setUserLoginSuccess,
  setUserLoginFailed,
  setUserLogout,
  setAddUserLoading,
  setAddUserSuccess,
  setAddUserFailed,
  setUpdateUserLoading,
  setUpdateUserSuccess,
  setUpdateUserFailed,
} = UserInfoLoginSlice.actions;

export default UserInfoLoginSlice.reducer;

//https://www.shawndsilva.com/blog/web-development/differences-between-redux-and-redux-toolkit-and-why-should-you-upgrade
