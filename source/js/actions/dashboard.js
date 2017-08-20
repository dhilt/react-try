import { asyncRequest } from '../helpers/request'

export const GET_DASHBOARD_ARTICLES_ASYNC_START = 'GET_DASHBOARD_ARTICLES_ASYNC_START';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL = 'GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL';
export const SELECT_HEADER_IMAGE = 'SELECT_HEADER_IMAGE';
export const GET_DASHBOARD_GAMES_ASYNC_START = 'GET_DASHBOARD_HEAD_DATA_ASYNC_START';
export const GET_DASHBOARD_GAMES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_HEAD_DATA_ASYNC_END_SUCCESS';
export const GET_DASHBOARD_GAMES_ASYNC_END_FAIL = 'GET_DASHBOARD_HEAD_DATA_ASYNC_END_FAIL';

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

export function clickOnHeaderImage(index) {
  return {
    type: SELECT_HEADER_IMAGE,
    data: index
  }
}

export function getDashboardGamesAsync() {
  return (dispatch) => {
    dispatch(getDashboardGamesAsyncStart());
    asyncRequest('games?dashboard')
      .then(result => dispatch(getDashboardGamesAsyncEndSuccess(result.games)))
      .catch(error => dispatch(getDashboardGamesAsyncEndFail(error)));
  }
}

export function getDashboardGamesAsyncStart() {
  return {
    type: GET_DASHBOARD_GAMES_ASYNC_START
  }
}

export function getDashboardGamesAsyncEndSuccess(data) {
  return {
    type: GET_DASHBOARD_GAMES_ASYNC_END_SUCCESS,
    data
  }
}

export function getDashboardGamesAsyncEndFail(error) {
  return {
    type: GET_DASHBOARD_GAMES_ASYNC_END_FAIL,
    error
  }
}
