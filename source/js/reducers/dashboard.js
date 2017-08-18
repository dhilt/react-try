import { Map } from 'immutable';

import {
  GET_DASHBOARD_ARTICLES_ASYNC_START,
  GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS,
  GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL,
  SELECT_HEADER_IMAGE,
  GET_DASHBOARD_GAMES_ASYNC_START,
  GET_DASHBOARD_GAMES_ASYNC_END_SUCCESS,
  GET_DASHBOARD_GAMES_ASYNC_END_FAIL
} from 'actions/dashboard';

const initialState = Map({
  articles: Map({
    pending: false,
    error: '',
    list: []
  }),
  head: Map({
    selectedIndex: -1,
    pending: false,
    error: '',
    games: []
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
  [GET_DASHBOARD_GAMES_ASYNC_START]: (state) => {
    return state.merge({
      head: state.get('head').merge({
        pending: true
      })
    })
  },
  [GET_DASHBOARD_GAMES_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      head: state.get('head').merge({
        pending: false,
        error: '',
        games: action.data,
        selectedIndex: 0
      })
    })
  },
  [GET_DASHBOARD_GAMES_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      head: state.get('head').merge({
        pending: false,
        error: action.error,
        games: [],
        selectedIndex: -1
      })
    })
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
