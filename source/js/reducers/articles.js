import { Map } from 'immutable';

import {
  GET_ARTICLES_ASYNC_START,
  GET_ARTICLES_ASYNC_END_SUCCESS,
  GET_ARTICLES_ASYNC_END_FAIL,
  SET_ARTICLES_PAGE
} from 'actions/articles';

import {
  EDIT_ARTICLE_ASYNC_END_SUCCESS
} from 'actions/_admin/editArticle'

import {
  REMOVE_ARTICLE_ASYNC_END_SUCCESS
} from 'actions/_admin/removeArticle'

import {
  CREATE_ARTICLE_ASYNC_END_SUCCESS
} from 'actions/_admin/newArticle'

const initialState = Map({
  listArticles: [],
  pending: false,
  error: null,
  total: null,
  page: 0,
  count: 20
});

const actionsMap = {
  [GET_ARTICLES_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [GET_ARTICLES_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      error: '',
      listArticles: action.data.articles,
      total: action.data.total
    })
  },
  [GET_ARTICLES_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      error: action.error,
      listArticles: []
    })
  },
  [SET_ARTICLES_PAGE]: (state, action) => {
    return state.merge({
      page: action.page
    })
  },
  [EDIT_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      listArticles: state.get('listArticles').map(a => a.get('id') == action.data.id ? Map(action.data) : a)
    })
  },
  [REMOVE_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      listArticles: state.get('listArticles').toJS().find(item => item.id == action.id) ? [] : state.get('listArticles')
    })
  },
  [CREATE_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      listArticles: []
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
