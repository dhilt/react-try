import { Map } from 'immutable';

import {
  GET_ARTICLES_ASYNC_START,
  GET_ARTICLES_ASYNC_END_SUCCESS,
  GET_ARTICLES_ASYNC_END_FAIL,
  SET_ARTICLES_PAGE
} from 'actions/articles';

const initialState = Map({
  listArticles: [],
  pending: false,
  error: null,
  total: null,
  page: location.search[location.search.indexOf('page=') + 'page='.length] == -1 ? 0 : Number(location.search.match(`page=[^\d]*`)[0].replace('page=', '') - 1),
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
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
