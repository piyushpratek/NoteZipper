import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type requestType = {
  note?: any;
  loading?: boolean;
  error?: any;
  success?: any;
};
type notesType = {
  notes?: any;
};

type noteStateType = {
  list: requestType & notesType;
  add: requestType;
  delete: requestType;
  update: requestType;
};

const InitialUserState: noteStateType = {
  list: {
    loading: false,
    notes: [],
    error: null,
    success: false,
  },
  add: {
    loading: false,
    error: null,
    success: false,
  },
  delete: {
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

const noteSlice = createSlice({
  name: 'note',
  initialState: InitialUserState,
  reducers: {
    setNotesListLoading: (state) => {
      state.list.loading = true;
    },
    setNotesListSuccess: (state, action: PayloadAction<any>) => {
      state.list.loading = false;
      state.list.notes = action.payload;
    },
    setNotesListFailed: (state, action: PayloadAction<any>) => {
      state.list.loading = false;
      state.list.error = action.payload;
    },
    //add
    setAddNoteLoading: (state) => {
      state.add.loading = true;
    },
    setAddNoteSuccess: (state) => {
      state.add.loading = false;
      state.add.success = true;
    },
    setAddNoteFailed: (state, action: PayloadAction<any>) => {
      state.add.loading = false;
      state.add.error = action.payload;
    },
    //delete
    setDeleteNoteLoading: (state) => {
      state.delete.loading = true;
    },
    setDeleteNoteSuccess: (state) => {
      state.delete.loading = false;
      state.delete.success = true;
    },
    setDeleteNoteFailed: (state, action: PayloadAction<any>) => {
      state.delete.loading = false;
      state.delete.error = action.payload;
      state.delete.success = false;
    },
    //update
    setUpdateNoteLoading: (state) => {
      state.update.loading = true;
    },
    setUpdateNoteSuccess: (state) => {
      state.update.loading = false;
      state.update.success = true;
    },
    setUpdateNoteFailed: (state, action: PayloadAction<any>) => {
      state.update.loading = false;
      state.update.error = action.payload;
      state.update.success = false;
    },
  },
});

export const {
  setNotesListLoading,
  setNotesListSuccess,
  setNotesListFailed,

  setAddNoteLoading,
  setAddNoteSuccess,
  setAddNoteFailed,

  setDeleteNoteLoading,
  setDeleteNoteSuccess,
  setDeleteNoteFailed,

  setUpdateNoteLoading,
  setUpdateNoteSuccess,
  setUpdateNoteFailed,
} = noteSlice.actions;

export default noteSlice.reducer;

//https://www.shawndsilva.com/blog/web-development/differences-between-redux-and-redux-toolkit-and-why-should-you-upgrade
