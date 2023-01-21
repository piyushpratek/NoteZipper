import axios from 'axios';
import {
  setAddNoteFailed,
  setAddNoteLoading,
  setAddNoteSuccess,
  setDeleteNoteFailed,
  setDeleteNoteLoading,
  setDeleteNoteSuccess,
  setNoteListFailed,
  setNoteListLoading,
  setNoteListSuccess,
  setUpdateNoteLoading,
  setUpdateNoteSuccess,
} from '../redux/noteSlice';

export const listNotes = () => async (dispatch, getState) => {
  try {
    dispatch(setNoteListLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/notes`, config);

    dispatch(setNoteListSuccess(data));
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setNoteListFailed(message));
  }
};

export const createNoteAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(setAddNoteLoading());

      const {
        userLogin: { userInfo },
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

export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(setDeleteNoteLoading());

    const {
      userLogin: { userInfo },
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
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch(setUpdateNoteLoading());

      const {
        userLogin: { userInfo },
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
      dispatch(setNoteListFailed(message));
    }
  };
