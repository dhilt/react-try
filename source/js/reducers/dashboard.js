import { Map } from 'immutable';

import {
  GET_DASHBOARD_ARTICLES_ASYNC_START,
  GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS,
  GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL,
  SELECT_HEADER_IMAGE,
  GET_DASHBOARD_HEAD_DATA_ASYNC_START,
  GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS,
  GET_DASHBOARD_HEAD_DATA_ASYNC_END_FAIL
} from 'actions/dashboard';

const initialState = Map({
  articles: Map({
    pending: false,
    error: '',
    list: []
  }),
  head: Map({
    selectedIndex: undefined,
    pending: false,
    error: '',
    data: []
  })
});

const actionsMap = {
  [GET_DASHBOARD_ARTICLES_ASYNC_START]: (state) => {
    return state.merge({
      articles: state.get('articles').merge({
        pending: true
      })
    })
  },
  [GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      articles: state.get('articles').merge({
        pending: false,
        error: '',
        list: [...state.get('articles').get('list'), ...action.data]
      })
    })
  },
  [GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      articles: state.get('articles').merge({
        pending: false,
        error: action.error,
        list: []
      })
    })
  },
  [SELECT_HEADER_IMAGE]: (state, action) => {
    return state.merge({
      head: state.get('head').merge({
        selectedIndex: action.data
      })
    })
  },
  [GET_DASHBOARD_HEAD_DATA_ASYNC_START]: (state) => {
    return state.merge({
      games: state.get('games').merge({
        pending: true
      })
    })
  },
  [GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      games: state.get('games').merge({
        pending: false,
        error: '',
        data: [...state.get('games').get('data'), ...action.data]
      })
    })
  },
  [GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      games: state.merge({
        pending: false,
        error: action.error,
        data: []
      })
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
