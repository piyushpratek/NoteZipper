import { configureStore } from '@reduxjs/toolkit';
import UserInfoLoginSlice from '../redux/userSlice';
import noteSlice from './noteSlice';

export const store = configureStore({
  reducer: {
    auth: UserInfoLoginSlice,
    note: noteSlice,
  },
});

export default store;
