import { Map } from 'immutable'
import { actions } from 'react-redux-form/immutable'

import { asyncRequest } from '../../helpers/request'
import { validators, validatorsVal } from 'helpers/validators'

export const EDIT_ARTICLE_ASYNC_START = 'EDIT_ARTICLE_ASYNC_START'
export const EDIT_ARTICLE_ASYNC_END_SUCCESS = 'EDIT_ARTICLE_ASYNC_END_SUCCESS'
export const EDIT_ARTICLE_ASYNC_END_FAIL = 'EDIT_ARTICLE_ASYNC_END_FAIL'
export const GET_EXIST_ARTICLE_ASYNC_START = 'GET_EXIST_ARTICLE_ASYNC_START'
export const GET_EXIST_ARTICLE_ASYNC_END_SUCCESS = 'GET_EXIST_ARTICLE_ASYNC_END_SUCCESS'
export const GET_EXIST_ARTICLE_ASYNC_END_FAIL = 'GET_EXIST_ARTICLE_ASYNC_END_FAIL'
export const EDIT_ARTICLE_MODEL_HAS_BEEN_FILLED = 'EDIT_ARTICLE_MODEL_HAS_BEEN_FILLED'
export const SET_EDIT_PAGE_SOURCE = 'SET_EDIT_PAGE_SOURCE'

export function editArticleAsync() {
  return (dispatch, getState) => {
    let article = getState()._adminForms.editArticleModel.toJS()
    dispatch(editArticleAsyncStart())
    const query = 'articles/' + article.id
    asyncRequest(query, 'put', { article })
      .then(result => dispatch(editArticleAsyncEndSuccess(result.result)))
      .catch(error => dispatch(editArticleAsyncEndFail(error)))
  }
}

export function editArticleAsyncStart() {
  return {
    type: EDIT_ARTICLE_ASYNC_START
  }
}

export function editArticleAsyncEndSuccess(data) {
  return {
    type: EDIT_ARTICLE_ASYNC_END_SUCCESS,
    data
  }
}

export function editArticleAsyncEndFail(error) {
  return {
    type: EDIT_ARTICLE_ASYNC_END_FAIL,
    error
  }
}

export function setEditPageSource() {
  return (dispatch, getState) => {
    const articleMap = getState().article.get('data')
    dispatch({
      type: SET_EDIT_PAGE_SOURCE,
      data: articleMap
    })
    dispatch(resetForm(articleMap))
  }
}

export function getExistArticleAsync(id) {
  return (dispatch) => {
    dispatch(getExistArticleAsyncStart())
    asyncRequest('articles/' + id)
      .then(result => dispatch(getExistArticleAsyncEndSuccess(result.article)))
      .catch(error => dispatch(getExistArticleAsyncEndFail(error)))
  }
}

export function getExistArticleAsyncStart() {
  return {
    type: GET_EXIST_ARTICLE_ASYNC_START
  }
}

export function getExistArticleAsyncEndSuccess(data) {
  return (dispatch) => {
    let articleMap = Map(data)
    dispatch({
      type: GET_EXIST_ARTICLE_ASYNC_END_SUCCESS,
      data: articleMap
    })
    dispatch(resetForm(articleMap))
  }
}

export function getExistArticleAsyncEndFail(error) {
  return {
    type: GET_EXIST_ARTICLE_ASYNC_END_FAIL,
    error
  }
}

export function resetForm(articleMap) {
  return (dispatch, getState) => {
    dispatch(actions.change('editArticleModel', articleMap))
    const sourceAppliedCount = getState()._adminEditArticle.get('sourceAppliedCount')
    setTimeout(() => {
      dispatch({
        type: EDIT_ARTICLE_MODEL_HAS_BEEN_FILLED,
        data: sourceAppliedCount + 1
      })
      Object.keys(validatorsVal).forEach(field => {
        dispatch(actions.validate('editArticleModel.' + field, validatorsVal[field](articleMap.get(field))))
      })
    })
  }
}
