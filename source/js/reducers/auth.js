import { Map } from 'immutable';

import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL
} from 'actions/auth';

const initialState = Map({
  isAuthorized: false,
  dialogOpen: false
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
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
