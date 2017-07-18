import { Map } from 'immutable'

import {
  GET_ARTICLE_ASYNC_START,
  GET_ARTICLE_ASYNC_END_SUCCESS,
  GET_ARTICLE_ASYNC_END_FAIL,
  VOTE_UP,
  VOTE_DOWN,
  VOTE_ABORT,
  VOTE_FAIL,
  CLEAN_VOTE
} from 'actions/article'

const initialState = Map({
  data: null,
  pending: false,
  error: null,
  isVoted: 0,  // -1: voted down, 0: not yet voted, 1: voted up,
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
      data: action.data
    })
  },
  [GET_ARTICLE_ASYNC_END_FAIL]: (state, action) => {
    return state.merge({
      pending: false,
      error: action.error,
      data: null
    })
  },
  [VOTE_UP]: (state, action) => {
    return state.merge({
      data: state.get('data').merge({
        rateUp: Number(state.get('data').get('rateUp')) + 1
      }),
      isVoted: 1
    })
  },
  [VOTE_DOWN]: (state, action) => {
    return state.merge({
      data: state.get('data').merge({
        rateDown: Number(state.get('data').get('rateDown')) + 1
      }),
      isVoted: -1
    })
  },
  [VOTE_ABORT]: (state, action) => {
    if (action.vote == 1) {
      return state.merge({
        data: state.get('data').merge({
          rateUp: Number(state.get('data').get('rateUp')) - 1
        }),
        isVoted: 0
      })
    } else if (action.vote == -1) {
      return state.merge({
        data: state.get('data').merge({
          rateDown: Number(state.get('data').get('rateDown')) - 1
        }),
        isVoted: 0
      })
    }
  },
  [VOTE_FAIL]: (state, action) => {
    return state.merge({
      voteError: action.error
    })
  },
  [CLEAN_VOTE]: (state) => {
    return state.merge({
      isVoted: 0
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
