import { Map } from 'immutable';

import {
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL
} from 'actions/_admin/confirmation';

const initialState = Map({
  isOpenModal: false
});

const actionsMap = {
  [OPEN_CONFIRMATION_MODAL]: (state) => {
    return state.merge({
      isOpenModal: true
    })
  },
  [CLOSE_CONFIRMATION_MODAL]: (state) => {
    return state.merge({
      isOpenModal: false
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
