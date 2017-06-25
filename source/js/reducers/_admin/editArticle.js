import { Map } from 'immutable';

import {
  EDIT_EXIST_ARTICLE_ASYNC_START,
  EDIT_EXIST_ARTICLE_ASYNC_END_SUCCESS,
  EDIT_EXIST_ARTICLE_ASYNC_END_FAIL
} from 'actions/_admin/editArticle';

const initialState = Map({
  pending: false,
  serverResult: {},
  idArticle: null,
  date: null,
  title: '',
  description: '',
  image: '',
  text: ''
});

const actionsMap = {
  [EDIT_EXIST_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [EDIT_EXIST_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.data
    })
  },
  [EDIT_EXIST_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.error
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
