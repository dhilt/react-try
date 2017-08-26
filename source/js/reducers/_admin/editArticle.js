import { Map } from 'immutable'

import {
  EDIT_ARTICLE_ASYNC_START,
  EDIT_ARTICLE_ASYNC_END_SUCCESS,
  EDIT_ARTICLE_ASYNC_END_FAIL,
  SET_EDIT_PAGE_SOURCE,
  GET_EXIST_ARTICLE_ASYNC_START,
  GET_EXIST_ARTICLE_ASYNC_END_SUCCESS,
  GET_EXIST_ARTICLE_ASYNC_END_FAIL,
  EDIT_ARTICLE_MODEL_HAS_BEEN_FILLED
} from 'actions/_admin/editArticle'

import { articleModel } from 'helpers/models'

const initialState = Map({
  source: Map(articleModel),
  sourcePending: false,
  sourceAppliedCount: 0,
  pending: false,
  error: null
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
      error: null,
      source: action.data
    })
  },
  [EDIT_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      error: action.error
    })
  },
  [SET_EDIT_PAGE_SOURCE]: (state, action) => {
    return state.merge({
      source: action.data
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      sourcePending: true
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      sourcePending: false,
      error: null,
      source: action.data
    })
  },
  [GET_EXIST_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      sourcePending: false,
      error: action.error
    })
  },
  [EDIT_ARTICLE_MODEL_HAS_BEEN_FILLED]: (state, action) => {
    return state.merge({
      sourceAppliedCount: action.data
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
