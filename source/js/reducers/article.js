import { Map } from 'immutable';

import {
  GET_ARTICLE_ASYNC_START,
  GET_ARTICLE_ASYNC_END_SUCCESS,
  GET_ARTICLE_ASYNC_END_FAIL
} from 'actions/article';

const initialState = Map({
  data: null,
  pending: false,
  error: null
});

const actionsMap = {
  [GET_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [GET_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      error: '',
      data: action.data
    })
  },
  [GET_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      error: action.error,
      data: null
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
