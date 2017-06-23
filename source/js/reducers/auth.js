import { Map } from 'immutable';

import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  CHANGE_LOGIN_STRING,
  CHANGE_PASSWORD_STRING,
  VALIDATE_LOGIN_FORM,
  LOGIN_ASYNC_START,
  LOGIN_ASYNC_END_SUCCESS,
  LOGIN_ASYNC_END_FAIL,
  AUTHORIZE_BY_TOKEN_ASYNC_START,
  AUTHORIZE_BY_TOKEN_ASYNC_END_SUCCESS,
  AUTHORIZE_BY_TOKEN_ASYNC_END_FAIL,
  DO_LOGOUT
} from 'actions/auth';

const initialState = Map({
  isAuthorized: false,
  tokenAuthPending: false,
  dialogOpen: false,
  userInfo: Map({
    id: null,
    login: null,
    role: null
  }),
  isLoginValid: true,
  isPasswordValid: true,
  loginPending: false,
  errors: [],
  apiError: '',
  tokenAuthError: '',
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
  },
  [LOGIN_ASYNC_START]: (state) => {
    return state.merge({
      loginPending: true
    })
  },
  [LOGIN_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      loginPending: false,
      isAuthorized: true,
      userInfo: Map(action.data),
      apiError: ''
    })
  },
  [LOGIN_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      loginPending: false,
      isAuthorized: false,
      userInfo: initialState.get('userInfo'),
      apiError: action.error
    })
  },
  [AUTHORIZE_BY_TOKEN_ASYNC_START]: (state) => {
    return state.merge({
      tokenAuthPending: true
    })
  },
  [AUTHORIZE_BY_TOKEN_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      tokenAuthPending: false,
      isAuthorized: true,
      userInfo: Map(action.data),
      tokenAuthError: ''
    })
  },
  [AUTHORIZE_BY_TOKEN_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      tokenAuthPending: false,
      isAuthorized: false,
      userInfo: initialState.get('userInfo'),
      tokenAuthError: action.error
    })
  },
  [DO_LOGOUT]: (state) => {
    return state.merge({
      isAuthorized: false,
      userInfo: initialState.get('userInfo')
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
