import { asyncRequest } from '../../helpers/request'

export const CREATE_ARTICLE_ASYNC_START = 'CREATE_ARTICLE_ASYNC_START'
export const CREATE_ARTICLE_ASYNC_END_SUCCESS = 'CREATE_ARTICLE_ASYNC_END_SUCCESS'
export const CREATE_ARTICLE_ASYNC_END_FAIL = 'CREATE_ARTICLE_ASYNC_END_FAIL'

export function createArticleAsync() {
  return (dispatch, getState) => {
    const article = getState()._adminForms.newArticleModel.toJS()
    dispatch(createArticleAsyncStart())
    asyncRequest('articles', 'post', { article })
      .then(result => dispatch(createArticleAsyncEndSuccess(result)))
      .catch(error => dispatch(createArticleAsyncEndFail(error)))
  }
}

export function createArticleAsyncStart() {
  return {
    type: CREATE_ARTICLE_ASYNC_START
  }
}

export function createArticleAsyncEndSuccess(data) {
  return {
    type: CREATE_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function createArticleAsyncEndFail(error) {
  return {
    type: CREATE_ARTICLE_ASYNC_END_FAIL,
    error
  }
}
