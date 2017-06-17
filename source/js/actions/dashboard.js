import { asyncRequest } from '../helpers/request';

export const GET_DASHBOARD_ARTICLES_ASYNC_START = 'GET_DASHBOARD_ARTICLES_ASYNC_START';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS';
export const GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL = 'GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL';

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
