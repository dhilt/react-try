import asyncRequest from '../helpers';

export const GET_ARTICLES_ASYNC_START = 'GET_DASHBOARD_ARTICLES_ASYNC_START';
export const GET_ARTICLES_ASYNC_END_SUCCESS = 'GET_DASHBOARD_ARTICLES_ASYNC_END_SUCCESS';
export const GET_ARTICLES_ASYNC_END_FAIL = 'GET_DASHBOARD_ARTICLES_ASYNC_END_FAIL';

export function getArticlesAsync(offset, count) {
  return (dispatch) => {
    offset = Number(offset);
    count = Number(count);
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
