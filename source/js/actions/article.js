import { asyncRequest } from '../helpers/request'

export const GET_ARTICLE_ASYNC_START = 'GET_ARTICLE_ASYNC_START'
export const GET_ARTICLE_ASYNC_END_SUCCESS = 'GET_ARTICLE_ASYNC_END_SUCCESS'
export const GET_ARTICLE_ASYNC_END_FAIL = 'GET_ARTICLE_ASYNC_END_FAIL'
export const SET_VOTE_ASYNC_START = 'SET_VOTE_ASYNC_START'
export const SET_VOTE_ASYNC_SUCCESS = 'SET_VOTE_ASYNC_SUCCESS'
export const SET_VOTE_ASYNC_FAIL = 'SET_VOTE_ASYNC_FAIL'
export const VOTE_ARTICLE_ASYNC_START = 'VOTE_ARTICLE_ASYNC_START'
export const VOTE_ARTICLE_ASYNC_SUCCESS = 'VOTE_ARTICLE_ASYNC_SUCCESS'
export const VOTE_ARTICLE_ASYNC_FAIL = 'VOTE_ARTICLE_ASYNC_FAIL'

export function getArticleAsync(id) {
  return (dispatch) => {
    dispatch(getArticleAsyncStart())
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

export function checkUserVote() {
  return (dispatch, getState) => {
    const idArticle = getState().article.get('data').get('id')
    dispatch({ type: SET_VOTE_ASYNC_START })
    asyncRequest(`articles/${idArticle}/rate`)
      .then(result => dispatch({ type: SET_VOTE_ASYNC_SUCCESS, value: result.value }))
      .catch(error => dispatch({ type: SET_VOTE_ASYNC_FAIL, error }))
  }
}

export function voteArticle(vote) {
  return (dispatch, getState) => {
    const idArticle = getState().article.get('data').get('id')
    dispatch(voteArticleAsyncStart())
    asyncRequest(`articles/${idArticle}/rate`, 'put', { vote })
      .then(result => dispatch(voteArticleAsyncSuccess(result.value)))
      .catch(error => dispatch(voteArticleAsyncFail(error)))
  }
}

export function voteArticleAsyncStart() {
  return {
    type: VOTE_ARTICLE_ASYNC_START
  }
}

export function voteArticleAsyncSuccess(vote) {
  return {
    type: VOTE_ARTICLE_ASYNC_SUCCESS,
    vote
  }
}

export function voteArticleAsyncFail(error) {
  return {
    type: VOTE_ARTICLE_ASYNC_FAIL,
    error
  }
}
