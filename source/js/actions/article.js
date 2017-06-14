import { asyncRequest } from '../helpers';

export const GET_ARTICLE_ASYNC_START = 'GET_ARTICLE_ASYNC_START';
export const GET_ARTICLE_ASYNC_END_SUCCESS = 'GET_ARTICLE_ASYNC_END_SUCCESS';
export const GET_ARTICLE_ASYNC_END_FAIL = 'GET_ARTICLE_ASYNC_END_FAIL';

export function getArticleAsync(id) {
  return (dispatch) => {
    dispatch(getArticleAsyncStart());
    asyncRequest('articles/' + id)
      .then(result => dispatch(getArticleAsyncEndSuccess(result.article)))
      .catch(error => dispatch(getArticleAsyncEndFail(error)));
  }
}

export function getArticleAsyncStart() {
  return {
    type: GET_ARTICLE_ASYNC_START
  }
}

export function getArticleAsyncEndSuccess(data) {
  return {
    type: GET_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function getArticleAsyncEndFail(error) {
  return {
    type: GET_ARTICLE_ASYNC_END_FAIL,
    error
  }
}
