import { asyncRequest } from '../../helpers/request'

export const REMOVE_ARTICLE_ASYNC_START = 'REMOVE_ARTICLE_ASYNC_START'
export const REMOVE_ARTICLE_ASYNC_END_SUCCESS = 'REMOVE_ARTICLE_ASYNC_END_SUCCESS'
export const REMOVE_ARTICLE_ASYNC_END_FAIL = 'REMOVE_ARTICLE_ASYNC_END_FAIL'
export const CLOSE_CONFIRMATION_MODAL = 'CLOSE_CONFIRMATION_MODAL'
export const OPEN_CONFIRMATION_MODAL = 'OPEN_CONFIRMATION_MODAL'

export function removeArticleAsync(id, history) {
  return (dispatch) => {
    dispatch(removeArticleAsyncStart())
    asyncRequest('articles/' + id, 'delete')
      .then(result => dispatch(removeArticleAsyncEndSuccess(result, history, id)))
      .catch(error => dispatch(removeArticleAsyncEndFail(error)))
  }
}

export function removeArticleAsyncStart() {
  return {
    type: REMOVE_ARTICLE_ASYNC_START
  }
}

export function removeArticleAsyncEndSuccess(result, history, id) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ARTICLE_ASYNC_END_SUCCESS,
      data: result.msg,
      id: id
    })
    dispatch(closeConfirmationModal())
    history.push('/articles')
  }
}

export function removeArticleAsyncEndFail(error) {
  return {
    type: REMOVE_ARTICLE_ASYNC_END_FAIL,
    error
  }
}

export function openConfirmationModal() {
  return {
    type: OPEN_CONFIRMATION_MODAL
  }
}

export function closeConfirmationModal() {
  return {
    type: CLOSE_CONFIRMATION_MODAL
  }
}
