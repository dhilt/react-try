import { asyncRequest } from '../helpers/request'
import { setAdminReducerAction } from './_admin/common'

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const CHANGE_LOGIN_STRING = 'CHANGE_LOGIN_STRING';
export const CHANGE_PASSWORD_STRING = 'CHANGE_PASSWORD_STRING';
export const VALIDATE_LOGIN_FORM = 'VALIDATE_LOGIN_FORM';
export const LOGIN_ASYNC_START = 'LOGIN_ASYNC_START';
export const LOGIN_ASYNC_END_SUCCESS = 'LOGIN_ASYNC_END_SUCCESS';
export const LOGIN_ASYNC_END_FAIL = 'LOGIN_ASYNC_END_FAIL';
export const AUTHORIZE_BY_TOKEN_ASYNC_START = 'AUTHORIZE_BY_TOKEN_ASYNC_START';
export const AUTHORIZE_BY_TOKEN_ASYNC_END_SUCCESS = 'AUTHORIZE_BY_TOKEN_ASYNC_END_SUCCESS';
export const AUTHORIZE_BY_TOKEN_ASYNC_END_FAIL = 'AUTHORIZE_BY_TOKEN_ASYNC_END_FAIL';
export const DO_LOGOUT = 'DO_LOGOUT';

export function openLoginModal() {
  return {
    type: OPEN_LOGIN_MODAL
  }
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL
  }
}

export function changeLoginString(data) {
  return {
    type: CHANGE_LOGIN_STRING,
    data
  }
}

export function changePasswordString(data) {
  return {
    type: CHANGE_PASSWORD_STRING,
    data
  }
}

export function validateForm(login, password) {
  return function(dispatch) {
    let isLoginValid = true,
      isPasswordValid = true,
      errors = [];

    if (!login) {
      isLoginValid = false;
      errors.push('Login is required.');
    }

    if (!password) {
      isPasswordValid = false;
      errors.push('Password is required.');
    }

    dispatch({
      type: VALIDATE_LOGIN_FORM,
      isLoginValid,
      isPasswordValid,
      errors
    });
  }
}

export function doLoginAsync(login, password) {
  return function(dispatch) {
    dispatch(loginAsyncStart());
    asyncRequest('login', { login, password })
      .then(result => {
        localStorage.setItem('token', result.token);
        dispatch(loginAsyncEndSuccess(result.userInfo));
        dispatch(closeLoginModal());
      })
      .catch(error => dispatch(loginAsyncEndFail(error)));
  };
}

function loginAsyncStart() {
  return {
    type: LOGIN_ASYNC_START
  }
}

function loginAsyncEndSuccess(data) {
  return {
    type: LOGIN_ASYNC_END_SUCCESS,
    data
  }
}

function loginAsyncEndFail(error) {
  return {
    type: LOGIN_ASYNC_END_FAIL,
    error
  }
}

export function authorizeByTokenAsync() {
  return function(dispatch) {
    dispatch(authorizeByTokenAsyncStart());
    asyncRequest('userInfo')
      .then(result => {
        dispatch(authorizeByTokenAsyncEndSuccess(result.userInfo));
        dispatch(setAdminReducerAction());
      })
      .catch(error => dispatch(authorizeByTokenAsyncEndFail(error)));
  }
}

function authorizeByTokenAsyncStart() {
  return {
    type: AUTHORIZE_BY_TOKEN_ASYNC_START
  }
}

function authorizeByTokenAsyncEndSuccess(data) {
  return {
    type: AUTHORIZE_BY_TOKEN_ASYNC_END_SUCCESS,
    data
  }
}

function authorizeByTokenAsyncEndFail(error) {
  return {
    type: AUTHORIZE_BY_TOKEN_ASYNC_END_FAIL,
    error
  }
}

export function doLogout() {
  localStorage.removeItem('token');
  return {
    type: DO_LOGOUT
  }
}
