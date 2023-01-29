import axios from 'axios';
import {
  setAddNoteFailed,
  setAddNoteLoading,
  setAddNoteSuccess,
  setDeleteNoteFailed,
  setDeleteNoteLoading,
  setDeleteNoteSuccess,
  setNotesListFailed,
  setNotesListLoading,
  setNotesListSuccess,
  setUpdateNoteLoading,
  setUpdateNoteSuccess,
} from '../redux/noteSlice';
import { getStateType, RootState } from '../redux/store';

export const listNotes =
  () => async (dispatch: any, getState: getStateType) => {
    try {
      dispatch(setNotesListLoading());
      const state = getState();
      console.log('got state?', state);
      console.log('keys of state?', Object.keys(state));

      const {
        user: {
          login: { userInfo },
        },
      } = getState();

      // const userInfo=state.user.login.userInfo

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes`, config);

      dispatch(setNotesListSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setNotesListFailed(message));
    }
  };

export const createNoteAction =
  (title, content, category) => async (dispatch, getState: getStateType) => {
    try {
      dispatch(setAddNoteLoading());

      const {
        user: {
          login: { userInfo },
        },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`,
        { title, content, category },
        config
      );

      dispatch(setAddNoteSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setAddNoteFailed(message));
    }
  };

export const deleteNoteAction =
  (id: any) => async (dispatch: any, getState: getStateType) => {
    try {
      dispatch(setDeleteNoteLoading());

      const {
        user: {
          login: { userInfo },
        },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/notes/${id}`, config);

      dispatch(setDeleteNoteSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setDeleteNoteFailed(message));
    }
  };

export const updateNoteAction =
  (id, title, content, category) =>
  async (dispatch, getState: getStateType) => {
    try {
      dispatch(setUpdateNoteLoading());

      const {
        user: {
          login: { userInfo },
        },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category },
        config
      );

      dispatch(setUpdateNoteSuccess(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(setNotesListFailed(message));
    }
  };
