import { asyncRequest } from '../helpers/request'
import { persistPage } from '../helpers/page'

export const GET_ARTICLES_ASYNC_START = 'GET_ARTICLES_ASYNC_START'
export const GET_ARTICLES_ASYNC_END_SUCCESS = 'GET_ARTICLES_ASYNC_END_SUCCESS'
export const GET_ARTICLES_ASYNC_END_FAIL = 'GET_ARTICLES_ASYNC_END_FAIL'
export const SET_ARTICLES_PAGE = 'SET_ARTICLES_PAGE'
export const SET_FILTER_BEGIN_DATE = 'SET_FILTER_BEGIN_DATE'
export const SET_FILTER_END_DATE = 'SET_FILTER_END_DATE'
export const SET_FILTER_AUTHOR = 'SET_FILTER_AUTHOR'
export const SET_FILTER_TITLE = 'SET_FILTER_TITLE'
export const CLEAN_UP_FILTER = 'CLEAN_UP_FILTER'

export function getArticlesAsync() {
  return (dispatch, getState) => {
    const page = getState().articles.get('page')
    const count = getState().articles.get('count')
    const filter = getState().articles.get('filter').toJS()
    const author = filter.author ? `&author=${filter.author}` : ''
    const title = filter.title ? `&title=${filter.title}` : ''
    const dateFrom = filter.dateFrom ? `&dateFrom=${filter.dateFrom.time}` : ''
    const dateTo = filter.dateTo ? `&dateTo=${filter.dateTo.time}` : ''
    const offset = Number(page * count)
    const query = `&offset=${offset}` + `&count=${count}` + author + title + dateFrom + dateTo
    dispatch(getArticlesAsyncStart())
    asyncRequest('articles?' + query)
      .then(result => dispatch(getArticlesAsyncEndSuccess({articles: result.articles, total: result.total})))
      .catch(error => dispatch(getArticlesAsyncEndFail(error)))
  }
}

export function getArticlesAsyncStart() {
  return {
    type: GET_ARTICLES_ASYNC_START
  }
}

export function getArticlesAsyncEndSuccess(data) {
  return {
    type: GET_ARTICLES_ASYNC_END_SUCCESS,
    data
  }
}

export function getArticlesAsyncEndFail(error) {
  return {
    type: GET_ARTICLES_ASYNC_END_FAIL,
    error
  }
}

export function setPage(page, hystory) {
  return (dispatch) => {
    persistPage(page, hystory)
    dispatch({
      type: SET_ARTICLES_PAGE,
      page
    })
    dispatch(getArticlesAsync())
  }
}

export function setFilterBeginDate(date, history) {
  return (dispatch) => {
    dispatch({
      type: SET_FILTER_BEGIN_DATE,
      date
    })
    dispatch(setPage(0, history))
  }
}

export function setFilterEndDate(date, history) {
  return (dispatch) => {
    dispatch({
      type: SET_FILTER_END_DATE,
      date
    })
    dispatch(setPage(0, history))
  }
}

export function setFilterAuthor(author, history) {
  return (dispatch) => {
    dispatch({
      type: SET_FILTER_AUTHOR,
      author
    })
    dispatch(setPage(0, history))
  }
}

export function setFilterTitle(title, history) {
  return (dispatch) => {
    dispatch({
      type: SET_FILTER_TITLE,
      title
    })
    dispatch(setPage(0, history))
  }
}

export function cleanUpFilter(history) {
  return (dispatch) => {
    dispatch({ type: CLEAN_UP_FILTER })
    dispatch(setPage(0, history))
  }
}
