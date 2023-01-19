import { configureStore } from '@reduxjs/toolkit';
import userLoginSlice from '../redux/userSlice';

export const store = configureStore({
  reducer: {
    auth: userLoginSlice,
  },
});

export default store;
