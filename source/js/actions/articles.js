import { browserHistory } from 'react-router';
import asyncRequest from '../helpers';

export const GET_ARTICLES_ASYNC_START = 'GET_ARTICLES_ASYNC_START';
export const GET_ARTICLES_ASYNC_END_SUCCESS = 'GET_ARTICLES_ASYNC_END_SUCCESS';
export const GET_ARTICLES_ASYNC_END_FAIL = 'GET_ARTICLES_ASYNC_END_FAIL';
export const SET_ARTICLES_PAGE = 'SET_ARTICLES_PAGE';

export function getArticlesAsync() {
  return (dispatch, getState) => {
    let page = getState().articles.get('page');
    let count = getState().articles.get('count');
    let offset = Number(page * count);
    let query = `&offset=${offset}` + `&count=${count}`;
    dispatch(getArticlesAsyncStart());
    asyncRequest('articles?' + query)
      .then(result => dispatch(getArticlesAsyncEndSuccess({articles: result.articles, total: result.total})))
      .catch(error => dispatch(getArticlesAsyncEndFail(error)));
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

export function setPage(page) {
  return (dispatch) => {
    const location = browserHistory.getCurrentLocation();
    location.query.page = page + 1;
    browserHistory.push(location);

    dispatch({
      type: SET_ARTICLES_PAGE,
      page
    });
    dispatch(getArticlesAsync());
  };
}
