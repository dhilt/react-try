import { Map } from 'immutable';

import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  CHANGE_LOGIN_STRING,
  CHANGE_PASSWORD_STRING,
  VALIDATE_LOGIN_FORM
} from 'actions/auth';

const initialState = Map({
  isAuthorized: false,
  dialogOpen: false,
  isLoginValid: true,
  isPasswordValid: true,
  errors: [],
  login: '',
  password: ''
});

const actionsMap = {
  [OPEN_LOGIN_MODAL]: (state) => {
    return state.merge({
      dialogOpen: true
    });
  },
  [CLOSE_LOGIN_MODAL]: (state) => {
    return state.merge({
      dialogOpen: false
    });
  },
  [CHANGE_LOGIN_STRING]: (state, action) => {
    return state.merge({
      login: action.data
    });
  },
  [CHANGE_PASSWORD_STRING]: (state, action) => {
    return state.merge({
      password: action.data
    });
  },
  [VALIDATE_LOGIN_FORM]: (state, action) => {
    return state.merge({
      isLoginValid: action.isLoginValid,
      isPasswordValid: action.isPasswordValid,
      errors: action.errors
    });
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
