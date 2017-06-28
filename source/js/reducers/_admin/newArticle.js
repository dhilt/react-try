import { Map } from 'immutable';

import {
  CREATE_ARTICLE_ASYNC_START,
  CREATE_ARTICLE_ASYNC_END_SUCCESS,
  CREATE_ARTICLE_ASYNC_END_FAIL
} from 'actions/_admin/newArticle';

export const initialState = Map({
  pending: false,
  serverResult: {},
  article: Map({
    date: null,
    title: '',
    description: '',
    image: '',
    text: ''
  })
});

const actionsMap = {
  [CREATE_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [CREATE_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.data
    })
  },
  [CREATE_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
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
