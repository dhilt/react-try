import { Map } from 'immutable'

import {
  GET_ARTICLE_ASYNC_START,
  GET_ARTICLE_ASYNC_END_SUCCESS,
  GET_ARTICLE_ASYNC_END_FAIL,
  VOTE_ARTICLE_ASYNC_START,
  VOTE_ARTICLE_ASYNC_SUCCESS,
  VOTE_ARTICLE_ASYNC_FAIL
} from 'actions/article'

const initialState = Map({
  data: null,
  pending: false,
  error: null,
  isVoted: 0,  // -1: voted down, 0: not yet voted, 1: voted up,
  pendingVote: false,
  voteError: null
})

const actionsMap = {
  [GET_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pending: true
    })
  },
  [GET_ARTICLE_ASYNC_END_SUCCESS]: (state, action) => {
    return state.merge({
      pending: false,
      error: '',
      data: action.data.article,
      isVoted: action.data.userVote || 0
    })
  },
  [GET_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      error: action.error,
      data: null
    })
  },
  [VOTE_ARTICLE_ASYNC_START]: (state) => {
    return state.merge({
      pendingVote: true
    })
  },
  [VOTE_ARTICLE_ASYNC_SUCCESS]: (state, action) => {
    let changeLocalRate = +(action.vote - state.get('isVoted'))
    return state.merge({
      pendingVote: false,
      voteError: null,
      isVoted: action.vote,
      data: state.get('data').merge({
        rateUp: Number(state.get('data').get('rateUp') + changeLocalRate)
      })
    })
  },
  [VOTE_ARTICLE_ASYNC_FAIL]: (state, action) => {
    return state.merge({
      pendingVote: false,
      voteError: action.error
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
