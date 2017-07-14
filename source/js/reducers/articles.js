import { Map } from 'immutable';

import {
  GET_ARTICLES_ASYNC_START,
  GET_ARTICLES_ASYNC_END_SUCCESS,
  GET_ARTICLES_ASYNC_END_FAIL,
  SET_ARTICLES_PAGE,
  SET_FILTER_BEGIN_DATE,
  SET_FILTER_END_DATE,
  SET_FILTER_AUTHOR,
  SET_FILTER_TITLE,
  CLEAN_UP_FILTER
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
  count: 20,
  filter: Map({
    title: '',
    author: '',
    dateFrom: '',
    dateTo: ''
  })
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
  [SET_FILTER_BEGIN_DATE]: (state, action) => {
    return state.merge({
      filter: state.get('filter').merge({
        dateFrom: action.date
      })
    })
  },
  [SET_FILTER_END_DATE]: (state, action) => {
    return state.merge({
      filter: state.get('filter').merge({
        dateTo: action.date
      })
    })
  },
  [SET_FILTER_AUTHOR]: (state, action) => {
    return state.merge({
      filter: state.get('filter').merge({
        author: action.author
      })
    })
  },
  [SET_FILTER_TITLE]: (state, action) => {
    return state.merge({
      filter: state.get('filter').merge({
        title: action.title
      })
    })
  },
  [CLEAN_UP_FILTER]: (state) => {
    return state.merge({
      filter: state.get('filter').merge({
        author: '',
        title: '',
        dateFrom: '',
        dateTo: ''
      })
    })
  },
  [EDIT_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      listArticles: state.get('listArticles').map(a => a.get('id') == action.data.id ? Map(action.data) : a)
    })
  },
  [REMOVE_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    if (state.get('listArticles').find(item => item.get('id') == action.id)) {
      return state.merge({
        listArticles: []
      })
    } else {
      return state
    }
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
