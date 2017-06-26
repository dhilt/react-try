import { Map } from 'immutable';

import {
  EDIT_ARTICLE_ASYNC_START,
  EDIT_ARTICLE_ASYNC_END_SUCCESS,
  EDIT_ARTICLE_ASYNC_END_FAIL,
  SET_EDIT_PAGE_SOURCE
} from 'actions/_admin/editArticle';

const initialState = Map({
  source: null,
  pending: false,
  serverResult: {},
  date: null,
  title: '',
  description: '',
  image: '',
  text: ''
});

const actionsMap = {
  [EDIT_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [EDIT_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.data
    })
  },
  [EDIT_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.error
    })
  },
  [SET_EDIT_PAGE_SOURCE]: (state, action) => {
    return state.merge({
      source: action.data
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
