import { asyncRequest } from '../helpers/request'
import { persistPage } from '../helpers/page'

export const GET_ARTICLES_ASYNC_START = 'GET_ARTICLES_ASYNC_START'
export const GET_ARTICLES_ASYNC_END_SUCCESS = 'GET_ARTICLES_ASYNC_END_SUCCESS'
export const GET_ARTICLES_ASYNC_END_FAIL = 'GET_ARTICLES_ASYNC_END_FAIL'
export const SET_ARTICLES_PAGE = 'SET_ARTICLES_PAGE'
export const CLEAN_UP_LIST_ARTICLES = 'CLEAN_UP_LIST_ARTICLES'

export function getArticlesAsync() {
  return (dispatch, getState) => {
    let page = getState().articles.get('page')
    let count = getState().articles.get('count')
    let offset = Number(page * count)
    let query = `&offset=${offset}` + `&count=${count}`
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

export function cleanUpListArticles() {
  return {
    type: CLEAN_UP_LIST_ARTICLES
  }
}
