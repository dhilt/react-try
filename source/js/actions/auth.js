export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const CHANGE_LOGIN_STRING = 'CHANGE_LOGIN_STRING';
export const CHANGE_PASSWORD_STRING = 'CHANGE_PASSWORD_STRING';
export const VALIDATE_LOGIN_FORM = 'VALIDATE_LOGIN_FORM';

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

export function validateForm() {
  return function (dispatch, getState) {
    let isLoginValid, isPasswordValid;
    let errors = [];
    console.log(getState().auth);
    if (getState().auth.login.length === 0) {
      isLoginValid = false;
      errors.push('Login is required.');
    } else {
      isLoginValid = true;
    };

    if (getState().auth.password.length === 0) {
      isPasswordValid = false;
      errors.push('Password is required.');
    } else {
      isPasswordValid = true;
    };

    dispatch({
      type: VALIDATE_LOGIN_FORM,
      isLoginValid: isLoginValid,
      isPasswordValid: isPasswordValid,
      errors: errors
    });
  }
}
