import { asyncRequest } from '../helpers/request'

export const GET_ARTICLE_ASYNC_START = 'GET_ARTICLE_ASYNC_START'
export const GET_ARTICLE_ASYNC_END_SUCCESS = 'GET_ARTICLE_ASYNC_END_SUCCESS'
export const GET_ARTICLE_ASYNC_END_FAIL = 'GET_ARTICLE_ASYNC_END_FAIL'
export const VOTE_UP = 'VOTE_UP'
export const VOTE_DOWN = 'VOTE_DOWN'
export const VOTE_ABORT = 'VOTE_ABORT'
export const VOTE_FAIL = 'VOTE_FAIL'
export const CLEAN_VOTE = 'CLEAN_VOTE'

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

export function ratingVote(vote) {
  return (dispatch, getState) => {
    const isVoted = getState().article.get('isVoted'),
          idArticle = getState().article.get('data').get('id')

    if (isVoted) {
      dispatch(voteAbort(idArticle, isVoted))
    } else if (!isVoted && vote == 1) {
      dispatch(voteUp(idArticle))
    } else if (!isVoted && vote == -1) {
      dispatch(voteDown(idArticle))
    }
  }
}

export function voteUp(idArticle) {
  return (dispatch, getState) => {
    asyncRequest(`articles/${idArticle}/rate`, 'put', {vote: 1, isVoted: false})
      .then(result => dispatch({ type: VOTE_UP }))
      .catch(error => dispatch({ type: VOTE_FAIL, error }))
  }
}

export function voteDown(idArticle) {
  return (dispatch, getState) => {
    asyncRequest(`articles/${idArticle}/rate`, 'put', {vote: -1, isVoted: false})
      .then(result => dispatch({ type: VOTE_DOWN }))
      .catch(error => dispatch({ type: VOTE_FAIL, error }))
  }
}

export function voteAbort(idArticle, isVoted) {
  return (dispatch, getState) => {
    asyncRequest(`articles/${idArticle}/rate`, 'put', {vote: isVoted, isVoted: true})
      .then(result => dispatch({ type: VOTE_ABORT, vote: isVoted }))
      .catch(error => dispatch({ type: VOTE_FAIL, error }))
  }
}

export function cleanVote() {
  return {
    type: CLEAN_VOTE
  }
}

