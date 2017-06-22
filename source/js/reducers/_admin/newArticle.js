import { Map } from 'immutable';

import {
  SET_TIME_ARTICLE,
  CREATE_NEW_ARTICLE_ASYNC_START,
  CREATE_NEW_ARTICLE_ASYNC_END_SUCCESS,
  CREATE_NEW_ARTICLE_ASYNC_END_FAIL
} from 'actions/_admin/newArticle';

const initialState = Map({
  pending: false,
  serverResult: {},
  date: null,
  title: '',
  description: '',
  image: '',
  text: ''
});

const actionsMap = {
  [SET_TIME_ARTICLE]: (state, action) => {
    return state.merge({
      date: action.date
    })
  },
  [CREATE_NEW_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [CREATE_NEW_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.data
    })
  },
  [CREATE_NEW_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
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
