export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const CHANGE_LOGIN_STRING = 'CHANGE_LOGIN_STRING';
export const CHANGE_PASSWORD_STRING = 'CHANGE_PASSWORD_STRING';

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
