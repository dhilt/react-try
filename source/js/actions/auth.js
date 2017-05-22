import fetch from 'isomorphic-fetch'

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const CHANGE_LOGIN_STRING = 'CHANGE_LOGIN_STRING';
export const CHANGE_PASSWORD_STRING = 'CHANGE_PASSWORD_STRING';
export const VALIDATE_LOGIN_FORM = 'VALIDATE_LOGIN_FORM';
export const LOGIN_ASYNC_START = 'LOGIN_ASYNC_START';
export const DO_LOGIN_ASYNC = 'DO_LOGIN_ASYNC';
export const LOGIN_ASYNC_END_SUCCESS = 'LOGIN_ASYNC_END_SUCCESS';
export const LOGIN_ASYNC_END_FAIL = 'LOGIN_ASYNC_END_FAIL';

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
    data: data
  }
}

export function changePasswordString(data) {
  return {
    type: CHANGE_PASSWORD_STRING,
    data: data
  }
}

export function validateForm(login, password) {
  return function (dispatch) {
    let isLoginValid = true, isPasswordValid = true;
    let errors = [];

    if (login.length == 0) {
      isLoginValid = false;
      errors.push('Login is required.');
    }

    if (password.length == 0) {
      isPasswordValid = false;
      errors.push('Password is required.');
    }

    dispatch({
      type: VALIDATE_LOGIN_FORM,
      isLoginValid: isLoginValid,
      isPasswordValid: isPasswordValid,
      errors: errors
    });
  }
}

export function doLoginAsync(login, password) {
  return function (dispatch) {
    dispatch(loginAsyncStart());

    const serverQuery = 'api/login?login=' + login + '&password=' + password;
    fetch(serverQuery, {method: 'POST'}).then(function(response) {
      return response.json();
    }).then(function(result) {
      dispatch(loginAsyncEndSuccess(result));
      console.log(result);
    }).catch(function(error) {
      dispatch(loginAsyncEndFail(error));
      console.log("Error!", error);
    });
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
    data: data
  }
}

function loginAsyncEndFail(error) {
  return {
    type: LOGIN_ASYNC_END_FAIL,
    error: error
  }
} 