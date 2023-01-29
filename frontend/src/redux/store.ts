import { configureStore } from '@reduxjs/toolkit';
import UserInfoLoginSlice from '../redux/userSlice';
import noteSlice from './noteSlice';

export const store = configureStore({
  reducer: {
    user: UserInfoLoginSlice,
    note: noteSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type getStateType=()=>RootState
export default store;
