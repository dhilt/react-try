import { Map } from 'immutable';

import {
  EDIT_ARTICLE_ASYNC_START,
  EDIT_ARTICLE_ASYNC_END_SUCCESS,
  EDIT_ARTICLE_ASYNC_END_FAIL,
  SET_EDIT_PAGE_SOURCE,
  GET_EXIST_ARTICLE_ASYNC_START,
  GET_EXIST_ARTICLE_ASYNC_END_SUCCESS,
  GET_EXIST_ARTICLE_ASYNC_END_FAIL
} from 'actions/_admin/editArticle';

import { articleModel } from 'helpers/models';

const initialState = Map({
  source: Map(articleModel),
  pending: false,
  pendingInit: false,
  serverResult: {}
})

const actionsMap = {
  [EDIT_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [EDIT_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      serverResult: action.data,
      source: action.data
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
      source: Map(action.data)
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pendingInit: true
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    let article = Map(action.data);
    return state.merge({
      pendingInit: false,
      source: article
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pendingInit: false,
      serverResult: action.error
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
