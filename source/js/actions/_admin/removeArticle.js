import { asyncRequest } from '../../helpers/request'

export const REMOVE_ARTICLE_ASYNC_START = 'REMOVE_ARTICLE_ASYNC_START'
export const REMOVE_ARTICLE_ASYNC_END_SUCCESS = 'REMOVE_ARTICLE_ASYNC_END_SUCCESS'
export const REMOVE_ARTICLE_ASYNC_END_FAIL = 'REMOVE_ARTICLE_ASYNC_END_FAIL'

export function removeArticleAsync(id) {
  return (dispatch) => {
    dispatch(removeArticleAsyncStart());
    asyncRequest('articles/' + id, 'delete')
      .then(result => dispatch(removeArticleAsyncEndSuccess(result)))
      .catch(error => dispatch(removeArticleAsyncEndFail(error)))
  }
}

export function removeArticleAsyncStart() {
  return {
    type: REMOVE_ARTICLE_ASYNC_START
  }
}

export function removeArticleAsyncEndSuccess(result) {
  return {
    type: REMOVE_ARTICLE_ASYNC_END_SUCCESS,
    data: result.msg
  }
}

export function removeArticleAsyncEndFail(error) {
  return {
    type: REMOVE_ARTICLE_ASYNC_END_FAIL,
    error
  }
}
