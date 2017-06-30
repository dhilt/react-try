import { asyncRequest } from '../helpers/request';

export const GET_DASHBOARD_ARTICLES_ASYNC_START = 'GET_DASHBOARD_ARTICLES_ASYNC_START';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL = 'GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL';

export const SELECT_HEADER_IMAGE = 'SELECT_HEADER_IMAGE';
export const CLOSE_HEADER_IMAGE = 'CLOSE_HEADER_IMAGE';

export const GET_DASHBOARD_HEAD_DATA_ASYNC_START = 'GET_DASHBOARD_HEAD_DATA_ASYNC_START';
export const GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS = 'GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS';
export const GET_DASHBOARD_HEAD_DATA_ASYNC_END_FAIL = 'GET_DASHBOARD_HEAD_DATA_ASYNC_END_FAIL';

export function getDashboardArticlesAsync(offset) {
  return (dispatch) => {
    offset = Number(offset);
    let offsetQuery = offset >= 0 ? `&offset=${offset}` : '';
    dispatch(getDashboardArticlesAsyncStart());
    asyncRequest('articles?dashboard' + offsetQuery)
      .then(result => dispatch(getDashboardArticlesAsyncEndSuccess(result.articles)))
      .catch(error => dispatch(getDashboardArticlesAsyncEndFail(error)));
  }
}

export function getDashboardArticlesAsyncStart() {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_START
  }
}

export function getDashboardArticlesAsyncEndSuccess(data) {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS,
    data
  }
}

export function getDashboardArticlesAsyncEndFail(error) {
  return {
    type: GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL,
    error
  }
}

export function selectHeaderImage(data) {
  return {
    type: SELECT_HEADER_IMAGE,
    data
  }
}

export function closeHeaderImage(data) {
  return {
    type: CLOSE_HEADER_IMAGE,
    data
  }
}

export function getDashboardHeadDataAsync() {
  return (dispatch) => {
    dispatch(getDashboardHeadDataAsyncStart());
    asyncRequest('games?dashboard')
      .then(result => dispatch(getDashboardHeadDataAsyncEndSuccess(result.games)))
      .catch(error => dispatch(getDashboardHeadDataAsyncEndFail(error)));
  }
}

export function getDashboardHeadDataAsyncStart() {
  return {
    type: GET_DASHBOARD_HEAD_DATA_ASYNC_START
  }
}

export function getDashboardHeadDataAsyncEndSuccess(data) {
  return {
    type: GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS,
    data
  }
}

export function getDashboardHeadDataAsyncEndFail(error) {
  return {
    type: GET_DASHBOARD_HEAD_DATA_ASYNC_END_FAIL,
    error
  }
}
