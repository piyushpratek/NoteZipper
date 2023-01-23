import axios from 'axios';
import {
  setRegisterUserFailed,
  setRegisterUserLoading,
  setRegisterUserSuccess,
  setUpdateUserFailed,
  setUpdateUserLoading,
  setUpdateUserSuccess,
  setUserLoginFailed,
  setUserLoginLoading,
  setUserLoginSuccess,
  setUserLogout,
} from '../redux/userSlice';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(setUserLoginLoading());

    const { data } = await axios.post('/api/users/login', { email, password });

    dispatch(setUserLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch(
      setUserLoginFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(setUserLogout());
};

export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch(setRegisterUserLoading());

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, pic, email, password },
      config
    );

    dispatch(setRegisterUserSuccess(data));

    dispatch(setUserLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch(
      setRegisterUserFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(setUpdateUserLoading());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/users/profile', user, config);

    dispatch(setUpdateUserSuccess(data));

    dispatch(setUserLoginSuccess(data));

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch(
      setUpdateUserFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
