import { Map } from 'immutable';

import {
  SET_ADMIN_REDUCERS
} from 'actions/_admin/common';

let initialState = Map({
  initialized: false
});

const actionsMap = {
  [SET_ADMIN_REDUCERS]: (state) => {
    return state.merge({
      initialized: true
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}